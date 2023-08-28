// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Prisma from '@prisma/client'

const { PrismaClient } = Prisma
const prisma = new PrismaClient()


export default async function handler(req, res) {
    const result = await prisma.account.create({
        data: {
            name: 'Alice',
            email: 'kk@gmail.com',
            codigo: '123456789',
        },
    })
    res.json(result)
}