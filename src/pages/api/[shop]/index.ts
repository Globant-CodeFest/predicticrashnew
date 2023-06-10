// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../../firebase/admin'
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
  data: FirebaseFirestore.DocumentData
  id: string
} | {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query } = req
  const { shop } = query

  const shops = db.collection('clientes')

  const shopRef = await shops.where('url', '==', shop).get()
  for(let thisShop of shopRef.docs) {
    res.status(200).json({ data: thisShop.data(), id: thisShop.id })
    return
  }
  res.status(404).send({error: 'not valid slug'})
  return
}
