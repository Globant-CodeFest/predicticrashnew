// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../firebase/admin'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Product {
    id: string
    data: FirebaseFirestore.DocumentData
}

type Data = {
    products: Array<Product>
} | {
    error: string | unknown
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { query } = req

    const { shopId } = query

    try {
        const shops = db.collection('clientes')
        if(typeof shopId === 'string') {
            const productsRef = await shops.doc(shopId).collection('productos').where('disponible', '==', true).orderBy('orden').get()
            let products = []
            let i = 1
            for(let product of productsRef.docs) {
                products.push({id: product.id, data: product.data()})
                if(i === productsRef.size)
                {   
                    const jsonproducts = JSON.stringify({ products })
                    res.status(200).json({ products })
                    return
                }
                i++
            }
            res.status(200).json({ products })
            return
        }
    } catch (error) {
        res.status(400).json({ error })
        return
    }
    res.status(400).json({ error: 'error' })
    return
}
