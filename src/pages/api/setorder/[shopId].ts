// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../../firebase/admin'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Cart, Form } from '@/types';
import getTotalCart from '@/services/gettotalcart';
import formatNumber from '@/services/formatnumber';

type Data = {
    order?: {
        id: string,
        data: {
            pedido: number
            fecha_total: Date
            fecha: string
            hora: string
            sucursal: string
            nombre: string
            detalle: string
            nota: string
            direccion: string
            telefono: string
            envio: string
            estado: string
            pago: string
            total: number
            merchant_order_id: string
            estado_pago_mp: string
            link_mercadopago: string
        } | {}
      },
    error?: string
}

interface OrderParsed {
    pedido: number
    fecha_total: Date
    fecha: string
    hora: string
    sucursal: string
    nombre: string
    detalle: string
    nota: string
    direccion: string
    telefono: string
    envio: string
    estado: string
    pago: string
    cupon: string | null
    delivery_cost: number
    subtotal: number
    descuento: number
    total: number
    merchant_order_id: string
    estado_pago_mp: string
    link_mercadopago: string
  }

const detailText = async (cart: Cart) => {
    let text = ''
    await Promise.all(cart.cart.map((line, index) => {
        index < cart.cart.length - 1 ?
        text = text + `${line.quantity} x ${line.name}` + (line.options ? (line.options.option1 && line.options.option2) ? ` (${line.options?.option1?.title}: ${line.options?.option1?.name}, ${line.options?.option2?.title}: ${line.options?.option2?.name}) - $ ${formatNumber(line.price * line.quantity)}   |    ` : (line.options.option1 && !line.options.option2) ? ` (${line.options?.option1?.title}: ${line.options?.option1?.name}) - $ ${formatNumber(line.price * line.quantity)}   |    ` : (!line.options.option1 && line.options.option2) ? ` (${line.options?.option2?.title}: ${line.options?.option2?.name}) - $ ${formatNumber(line.price * line.quantity)}   |    ` : ` - $ ${formatNumber(line.price * line.quantity)}   |    ` : ` - $ ${formatNumber(line.price * line.quantity)}   |    `) :
        text = text + `${line.quantity} x ${line.name}` + (line.options ? (line.options.option1 && line.options.option2) ? ` (${line.options?.option1?.title}: ${line.options?.option1?.name}, ${line.options?.option2?.title}: ${line.options?.option2?.name})` : (line.options.option1 && !line.options.option2) ? ` (${line.options?.option1?.title}: ${line.options?.option1?.name})` : (!line.options.option1 && line.options.option2) ? ` (${line.options?.option2?.title}: ${line.options?.option2?.name}) ` : '' : '') + ` - $ ${formatNumber(line.price * line.quantity)}`
    }))
    return text
}
const detailTextForWhatsapp = async (cart: Cart) => {
    let text = ''
    await Promise.all(cart.cart.map((line, index) => {
        index < cart.cart.length - 1 ?
        text = text + `*${line.quantity} x ${line.name}*` + (line.options ? (line.options.option1 && line.options.option2) ? ` (${line.options?.option1?.title}: ${line.options?.option1?.name}, ${line.options?.option2?.title}: ${line.options?.option2?.name}) - $ ${formatNumber(line.price * line.quantity)}   |    ` : (line.options.option1 && !line.options.option2) ? ` (${line.options?.option1?.title}: ${line.options?.option1?.name}) - $ ${formatNumber(line.price * line.quantity)}   |    ` : (!line.options.option1 && line.options.option2) ? ` (${line.options?.option2?.title}: ${line.options?.option2?.name}) - $ ${formatNumber(line.price * line.quantity)}   |    ` : ` - $ ${formatNumber(line.price * line.quantity)}   |    ` : ` - $ ${formatNumber(line.price * line.quantity)}   |    `) :
        text = text + `*${line.quantity} x ${line.name}*` + (line.options ? (line.options.option1 && line.options.option2) ? ` (${line.options?.option1?.title}: ${line.options?.option1?.name}, ${line.options?.option2?.title}: ${line.options?.option2?.name})` : (line.options.option1 && !line.options.option2) ? ` (${line.options?.option1?.title}: ${line.options?.option1?.name})` : (!line.options.option1 && line.options.option2) ? ` (${line.options?.option2?.title}: ${line.options?.option2?.name}) ` : '' : '') + ` - $ ${formatNumber(line.price * line.quantity)}`
    }))
    return text
}

const parseOrder = (cart: Cart,detail: string, form: Form, total: number, last_order: number, branch: string, coupon: string | null, discount: number) => {
    const fecha = new Date()
    return {
        pedido: last_order ? last_order + 1 : 1,
        fecha_total: fecha,
        fecha: fecha.getDate() + "/" + (fecha.getMonth() +1),
        hora: fecha.getHours() + ":" + (fecha.getMinutes()),    
        sucursal: branch,
        nombre: form.form.name,
        detalle: detail,
        nota: form.form.notes,
        direccion: form.form.direction + (form.form.area !== '' ? ' | ' : '') + form.form.area,
        telefono: form.form.phone,
        envio: form.form.delivery,
        estado: 'nuevo',
        pago: form.form.payment,
        delivery_cost: form.form.delivery_cost,
        subtotal: total,
        descuento: discount,
        cupon: coupon,
        total: total + form.form.delivery_cost - discount,
        merchant_order_id: '',
        estado_pago_mp: '',
        link_mercadopago: '',
        lines: cart
      }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { query, body } = req

    const { shopId } = query
    
    const { cart, form, branch, coupon, discount } = JSON.parse(body)
    const detail= await detailText(cart)
    const detailForWhatsapp= await detailTextForWhatsapp(cart)
    const subtotal = await getTotalCart(cart)
    const shops = db.collection('clientes')
    if(typeof shopId ==='string') {
        const shopDoc = await shops.doc(shopId).get()
        const order: OrderParsed = parseOrder(cart, detail, form, subtotal, shopDoc?.data()?.last_order || null, branch, coupon ? coupon.code : null, discount)
        const setOrder = await shops.doc(shopId).collection('pedidos').add({...order, detail_for_whatsapp: detailForWhatsapp})
        try {
            setOrder
            const updateLastOrder = await shops.doc(shopId).update({
                last_order: shopDoc?.data()?.last_order ? shopDoc?.data()?.last_order + 1 : 1
            })
            updateLastOrder
            const orderDoc = await shops.doc(shopId).collection('pedidos').doc(setOrder.id).get()
            if(coupon) {
                const couponDoc = await shops.doc(shopId).collection('coupons').doc(coupon.id).get()
                if(couponDoc?.data()?.available_uses) {
                    const reedemCoupon = await shops.doc(shopId).collection('coupons').doc(coupon.id).update({
                        available_uses: couponDoc?.data()?.available_uses - 1
                    })
                    reedemCoupon
                }
            }
            res.status(200).json({ order: { id: setOrder.id, data: orderDoc.data() || {}}})
            return
        } catch (error) {
            res.status(200).json({ error: 'setorder_error' })
            return
        }
    }
    return
}
