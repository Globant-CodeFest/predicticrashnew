// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../../firebase/admin'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Order {
    id: string
    data: FirebaseFirestore.DocumentData | undefined
}

type Data = {
    order: Order
} | {
    error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { query } = req

    const { shopId, orderId } = query
    
    const shops = db.collection('clientes')

    if(typeof shopId === 'string' && typeof orderId === 'string') {
        const orderDoc = await shops.doc(shopId).collection('pedidos').doc(orderId).get()
        res.status(200).json({ order: { id: orderDoc.id, data: orderDoc.data()} })
        return
    }
    res.status(400).json({ error: 'error' })
    return
}
