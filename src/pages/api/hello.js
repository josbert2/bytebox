// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Prisma from '@prisma/client'

const { PrismaClient } = Prisma
const prisma = new PrismaClient()



export default async function handler(req, res) {
  const users = await prisma.account.findMany()
  res.json(users)
}