// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../../../firebase/admin'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Product {
    id: string
    data: FirebaseFirestore.DocumentData | undefined
}

type Data = {
    product: Product
} | {
    error: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { query } = req

    const { shop, productId } = query

    const shops = db.collection('clientes')

    
    if(typeof shop === 'string' && typeof productId === 'string') {
        const shopsRef = await shops.where('url', '==', shop).get()
        for(let singleShop of shopsRef.docs) {
            const productDoc = await shops.doc(singleShop.id).collection('productos').doc(productId).get()
            const hasOptions1 = productDoc.data()?.opciones.opcion1.habilitado
            const hasOptions2 = productDoc.data()?.opciones.opcion2.habilitado
            let options1 = []
            let options2 = []
            if(hasOptions1) {
                const options1Ref = await shops.doc(singleShop.id).collection('productos').doc(productId).collection('opciones1').get()
                for(let option of options1Ref.docs) {
                    options1.push({id: option.id, data: option.data()})
                }
            }
            if(hasOptions2) {
                const options1Ref = await shops.doc(singleShop.id).collection('productos').doc(productId).collection('opciones2').get()
                for(let option of options1Ref.docs) {
                    options2.push({id: option.id, data: option.data()})
                }
            }
            const product = { id: productDoc.id, data: productDoc.data(), options1, options2}
            res.status(200).json({ product })
            return
        }
    }
    res.status(400).json({ error: 'error' })
    return
       
}
