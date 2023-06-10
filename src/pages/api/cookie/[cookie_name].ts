// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Coupon, Form, Line, redeemableCoupon } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message?: string
    cart?: string | Array<Line>
    form?: Form | {},
    shop?: string
    coupon?: Coupon | {}
    redeemable_coupons?: Array<redeemableCoupon> | []
} | null

interface Cookies {
    [key: string]: string;
}


const INITIAL_STATE = {
  takepedido_form: {
    form: {
      name: '',
      direction: '',
      area: '',
      phone: '',
      notes: '',
      delivery: '',
      payment: '',
      delivery_cost: 0
    }
  },
  takepedido_cart: {
    cart: []
  },
  takepedido_shop: {
    shop: ''
  },
  takepedido_branch: null,
  takepedido_coupon: null,
  takepedido_redeemable_coupons: null
}

export default async function handler(
  req: NextApiRequest & { cookies: Cookies | null },
  res: NextApiResponse<Data>
) {
    const { body, method, query, cookies} = req
    const cookie_name = query.cookie_name as keyof typeof INITIAL_STATE;

    if(method === 'GET') {
        cookies[cookie_name] ?
        res.json(JSON.parse(decodeURIComponent(cookies[cookie_name]))) :
        res.json(INITIAL_STATE[cookie_name])
    }
    if(method === 'POST') {
        const { cookie_value } = JSON.parse(body)
        const encodedValue = encodeURIComponent(JSON.stringify(cookie_value))
        res.setHeader('Set-Cookie', [
            `${cookie_name}=${encodedValue}; HttpOnly; SameSite=Lax; Path=${'/'}`,
          ]);
        res.status(200).json({message: 'cookie_updated'})
    }
    return
}
