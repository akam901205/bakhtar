import prisma from './prisma'
import bcryptjs from 'bcrypt'
import crypto from 'crypto'

const userAuth = {
  async login(email: string, password: string) {
    try {
      console.log('Attempting to find user with email:', email);
      const user = await prisma.user.findUnique({ 
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          isAdmin: true
        }
      });
      console.log('Raw user data from database:', JSON.stringify(user, null, 2));
      console.log('isAdmin from database - type:', typeof user?.isAdmin, 'value:', user?.isAdmin);

      if (!user) {
        console.log('Login failed: User not found');
        return null;
      }

      const match = await bcryptjs.compare(password, user.password);
      console.log('Password match result:', match);

      if (match) {
        const userData = {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin
        };
        console.log('User data being returned from userAuth.login:', JSON.stringify(userData, null, 2));
        console.log('Returned isAdmin - type:', typeof userData.isAdmin, 'value:', userData.isAdmin);
        return userData;
      }
      return null;
    } catch (error) {
      console.error('Error in userAuth.login:', error);
      throw error;
    }
  },

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
        const { password, ...userWithoutPassword } = user;
        return {
          ...userWithoutPassword,
          isAdmin: user.isAdmin || false // Assuming there's an isAdmin field in your User model
        };
      }
      return null;
    } catch (error) {
      console.error('Error in userAuth.login:', error);
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
}

export default userAuth