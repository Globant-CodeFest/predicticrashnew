// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../../firebase/admin'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  sizePedidos?: number
  data?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const shops = db.collection('clientes')

  const shopsRef = await shops.get()

  for(let shop of shopsRef.docs) {
      const pedidosref = await shops.doc(shop.id).collection('pedidos').get()
      const sizePedidos = pedidosref.size
      const updateSizePedidos = await shops.doc(shop.id).update({
        last_order: sizePedidos
      })
      updateSizePedidos
  }



  
  

  res.status(200).json({data: 'ok'})

  
}
