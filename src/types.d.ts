export interface Date {
    _seconds: number
    _nanoseconds: number
}

export interface Shipping {
    texto_envio: string
    a_convenir: boolean,
    a_domicilio: {
        habilitado: boolean
        costo: number
    }
    take_away: boolean
}

export interface Branch {
    nombre: string
    whatsapp: string
}

export interface Branches {
    sucursal5: Branch,
    sucursal1: Branch,
    sucursal2: Branch,
    sucursal4: Branch,
    sucursal3: Branch
}


export interface Tienda {
    envio: Shipping
    sucursales: Branches,
    tiene_sucursales: boolean,
    pagos: {
        mercado_pago: true,
        tarjeta_de_debito: false
        transferencia: false
        efectivo: true
        tarjeta_de_credito: false
    },
    pedido_minimo: {
        habilitado: false
        costo_minimo: null
    },
    horario_atencion: string
    tiene_sucursales: boolean
}

export interface DataShop {
    facebook: string
    instagram: string
    whatsapp: string
    fecha_registro: Date
    tienda: Tienda
    logo: string
    url: string
    nombre: string
    plan: string
    primer_ingreso: boolean
    access_token: string
    activa?: boolean,
    last_order?: number
    features?: {
        coupons?: boolean
        twilio?: boolean
    }
}

export type Shop = {
    data: DataShop
    id: string
}

export interface Category {
    id: string
    data: {
        nombre_categoria: string
        orden: number
    }
}

export interface Options {
    id: string
    data: {
        costo_adicional: number
        habilitado: boolean
        nombre: string
        orden: number
    }
}

export interface Product {
    id: string
    data: {
        descripcion: string
        nombre: string
        precio: number
        disponible: boolean
        stock: boolean
        destacado: boolean
        precio_rebaja: string
        opciones: {
            opcion2: {
                nombre: string
                habilitado: boolean
                obligatoria: false
            },
            opcion1: {
                obligatoria: boolean
                nombre: string
                habilitado: false
            }
        },
        orden: number
        imagenURL: string
        categoria: string
    }
    options1: Array<options>
    options2: Array<options>
}

export interface Line {
    productId: string
    image: string
    name: string
    price: number
    quantity: number
    options?: {
        option1?: {
            id: string
            title: string
            name: string
        } | null | undefined
        option2?: {
            id: string
            title: string
            name: string
        } | null | undefined
    } | null
}

export interface Cart {
    cart: Array<Line> | []
}

interface Form {
    form: {
        name: string
        direction: string
        area: string
        phone: string
        notes: string
        delivery: string
        payment: string
        delivery_cost: number
    }
}

export interface Order {
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
        delivery_cost?: number
        total: number
        merchant_order_id: string
        estado_pago_mp: string
        link_mercadopago: string
        lines?: Cart
        detail_for_whatsapp?: string
        subtotal?: number
        descuento?: number
        cupon: string | null
    } | null
  }

  export interface Coupon {
    id: string
    code: string
    monetary_value?: number
    percentage_value?: number
    minimum_purchase_amount: number
    uses_per_client: number
    maximum_redeemable_value: number
  }

  export type Error = {
    error: string
    value?: number
  }

  export type redeemableCoupon = {
    code: string
    quantity: number
  }

  export type LocalShop = {
    shop: string
  }

  export type LocalProducts = {
    products: Array<Product>
  }

  export type LocalCategories = {
    categories: Array<Category>
  }

  export type LocalExpiresProducts = {
    date: number
  }
  export type LocalExpiresCategories = {
    date: number
  }
  export type LocalExpiresDataShop = {
    date: number
  }