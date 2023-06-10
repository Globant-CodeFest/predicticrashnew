// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../firebase/admin'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Category {
    id: string
    data: FirebaseFirestore.DocumentData
}

type Data = {
    categories: Array<Category>
} | {
    error: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { query } = req

    const { shopId } = query

    const shops = db.collection('clientes')

    if(typeof shopId === 'string') {
        const categoriesRef = await shops.doc(shopId).collection('categorias').orderBy('orden', 'asc').get()
        let categories = []
        let i = 1
        for(let category of categoriesRef.docs) {
            categories.push({id: category.id, data: category.data()})
            if(i === categoriesRef.size)
            {
                res.status(200).json({ categories })
                return
            }
            i++
        }
        res.status(400).json({ categories})
        return
    }
    res.status(400).json({ error: 'error' })
    return
}
