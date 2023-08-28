// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Prisma from '@prisma/client'

const { PrismaClient } = Prisma
const prisma = new PrismaClient()



export default async function handler(req, res) {
  return res.status(200).json({ count: await prisma.account.count() })
}