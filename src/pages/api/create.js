// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Prisma from '@prisma/client'

const { PrismaClient } = Prisma
const prisma = new PrismaClient()


export default async function handler(req, res) {
    
    if (req.method === 'POST'){
        const { email, codigo, monto, tipo } = req.body

        const existing = await prisma.account.findUnique({
            where: {
                email: email,
            },
        })
        
        if (existing){
            res.status(400).json({ error: 'el mail ya existe'})
        }else{
            const result = await prisma.account.create({
                data: {
                    tipo,
                    monto,
                    codigo,
                    email,
                },
            })
            res.status(201).json(result);
        }
    } else {
        res.status(405).end(); // Método no permitido
    }
}