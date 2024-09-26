import prisma from '../lib/prisma'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const userAuth = {
  async register(email: string, password: string, firstName: string, lastName: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    })
    return user.id
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return null
    const match = await bcrypt.compare(password, user.password)
    return match ? user : null
  },

  async createSession(userId: number, remember: boolean = false) {
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + (remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)) // 30 days or 24 hours
    const session = await prisma.userSession.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    })
    return session.token
  },

  async getSessionUser(token: string) {
    const session = await prisma.userSession.findUnique({
      where: { token },
      include: { user: true },
    })
    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await prisma.userSession.delete({ where: { id: session.id } })
      }
      return null
    }
    return session.user
  },

  async removeSession(token: string) {
    await prisma.userSession.delete({ where: { token } })
  },

  async createPasswordResetToken(userId: number) {
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 3600000) // 1 hour from now
    await prisma.passwordResetToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    })
    return token
  },

  async verifyPasswordResetToken(token: string) {
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
        expiresAt: { gt: new Date() },
      },
    })
    return resetToken?.userId || null
  },

  async resetPassword(userId: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })
    await prisma.passwordResetToken.deleteMany({ where: { userId } })
  },

  async cleanupExpiredSessions() {
    await prisma.userSession.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    })
  },
}

export default userAuth