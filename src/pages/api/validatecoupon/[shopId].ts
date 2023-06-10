// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../../firebase/admin'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Coupon } from '@/types'

type Data = Coupon | {
    error: string
    value?: number
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { body, query } = req

    const { coupon, total_cart } = JSON.parse(body)
    const { shopId } = query

    const shops = db.collection('clientes')

    const today = new Date(Date.now())

    if(typeof shopId === 'string') {
        const couponsRef = await shops.doc(shopId).collection('coupons').where('code', '==', coupon).get()
        if(couponsRef.size > 0) {
            for(let singleCoupon of couponsRef.docs) {
                if(singleCoupon.data().redeemable_from && today < new Date(singleCoupon.data().redeemable_from.seconds * 1000)) {
                    res.status(400).json({ error: 'coupon_not_active' })
                    return
                }
                if(singleCoupon.data().redeemable_up_to && today > new Date(singleCoupon.data().redeemable_up_to._seconds * 1000)) {
                    res.status(400).json({ error: 'coupon_defeated' })
                    return
                }
                if(singleCoupon.data().available_uses === 0) {
                    res.status(400).json({ error: 'coupon_without_stock' })
                    return
                }
                if(total_cart < singleCoupon.data().minimum_purchase_amount) {
                    res.status(400).json({ error: 'coupon_not_minimum_amount', value: singleCoupon.data().minimum_purchase_amount })
                    return
                }
                res.status(200).json({ id: singleCoupon.id, code: singleCoupon.data().code, monetary_value: singleCoupon.data().monetary_value, percentage_value: singleCoupon.data().percentage_value, minimum_purchase_amount: singleCoupon.data().minimum_purchase_amount, uses_per_client: singleCoupon.data().uses_per_client, maximum_redeemable_value: singleCoupon.data().maximum_redeemable_value })
                return
            }
        } else {
            res.status(400).json({ error: 'coupon_not_found' })
            return
        }
    }
    res.status(400).json({ error: 'error' })
    return
}
