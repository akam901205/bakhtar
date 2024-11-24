import prisma from './prisma'
import bcryptjs from 'bcrypt'
import crypto from 'crypto'

const userAuth = {
  async login(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        console.log('Login failed: User not found');
        return null;
      }
      const match = await bcryptjs.compare(password, user.password);
      console.log('Login attempt result:', match ? 'successful' : 'failed');
      if (match) {
        const { id, email, isAdmin } = user;
        return {
          id,
          email,
          isAdmin: isAdmin || false
        };
      }
      return null;
    } catch (error) {
      console.error('Error in userAuth.login:', error);
      throw error;
    }
  },

  async register(email: string, password: string, firstName: string, lastName: string) {
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          isAdmin: false,
        },
      });

      console.log('User registered successfully:', newUser.id);
      return newUser.id;
    } catch (error) {
      console.error('Error in userAuth.register:', error);
      throw error;
    }
  },

  async createSession(userId: number, remember: boolean = false) {
    try {
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + (remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000));
      const session = await prisma.userSession.create({
        data: {
          userId,
          token,
          expiresAt,
        },
      });
      console.log('Session created successfully for user:', userId);
      return session.token;
    } catch (error) {
      console.error('Error in userAuth.createSession:', error);
      throw error;
    }
  },

  async getSessionUser(token: string) {
    try {
      const session = await prisma.userSession.findUnique({
        where: { token },
        include: { user: true },
      });
      if (!session || session.expiresAt < new Date()) {
        if (session) {
          await prisma.userSession.delete({ where: { id: session.id } });
          console.log('Expired session deleted');
        }
        return null;
      }
      console.log('Session user retrieved:', session.user.id);
      return session.user;
    } catch (error) {
      console.error('Error in userAuth.getSessionUser:', error);
      throw error;
    }
  },

  async removeSession(token: string) {
    try {
      await prisma.userSession.delete({ where: { token } });
      console.log('Session removed successfully');
    } catch (error) {
      console.error('Error in userAuth.removeSession:', error);
      throw error;
    }
  },

  async createPasswordResetToken(userId: number) {
    try {
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now
      await prisma.passwordResetToken.create({
        data: {
          userId,
          token,
          expiresAt,
        },
      });
      console.log('Password reset token created for user:', userId);
      return token;
    } catch (error) {
      console.error('Error in userAuth.createPasswordResetToken:', error);
      throw error;
    }
  },

  async verifyPasswordResetToken(token: string) {
    try {
      const resetToken = await prisma.passwordResetToken.findFirst({
        where: {
          token,
          expiresAt: { gt: new Date() },
        },
      });
      console.log('Password reset token verification result:', resetToken ? 'valid' : 'invalid');
      return resetToken?.userId || null;
    } catch (error) {
      console.error('Error in userAuth.verifyPasswordResetToken:', error);
      throw error;
    }
  },

  async resetPassword(userId: number, newPassword: string) {
    try {
      const hashedPassword = await bcryptjs.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
      await prisma.passwordResetToken.deleteMany({ where: { userId } });
      console.log('Password reset successfully for user:', userId);
    } catch (error) {
      console.error('Error in userAuth.resetPassword:', error);
      throw error;
    }
  },

  async cleanupExpiredSessions() {
    try {
      const result = await prisma.userSession.deleteMany({
        where: {
          expiresAt: { lt: new Date() },
        },
      });
      console.log('Expired sessions cleaned up:', result.count);
    } catch (error) {
      console.error('Error in userAuth.cleanupExpiredSessions:', error);
      throw error;
    }
  },

  async getUserData(userId: number) {
    try {
      const unansweredRequests = await prisma.request.count({
        where: { userId, status: 'unanswered' },
      });
      const connectedBusinesses = await prisma.business.count({
        where: { adminId: userId },
      });
      return { unansweredRequests, connectedBusinesses };
    } catch (error) {
      console.error('Error in userAuth.getUserData:', error);
      throw error;
    }
  },
};

export default userAuth;