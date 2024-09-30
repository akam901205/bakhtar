import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const users = await prisma.user.findMany({
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            isAdmin: true,
          },
        });
        res.status(200).json(users);
        break;

      case 'POST':
        const { email, firstName, lastName, password } = req.body;
        const newUser = await prisma.user.create({
          data: { email, firstName, lastName, password },
        });
        res.status(201).json(newUser);
        break;

      case 'PUT':
        const { id, ...updateData } = req.body;
        const updatedUser = await prisma.user.update({
          where: { id: Number(id) },
          data: updateData,
        });
        res.status(200).json(updatedUser);
        break;

      case 'DELETE':
        const { id: deleteId } = req.query;
        await prisma.user.delete({
          where: { id: Number(deleteId) },
        });
        res.status(204).end();
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in user API route:', error);
    res.status(500).json({ error: 'Error processing request' });
  } finally {
    await prisma.$disconnect();
  }
}