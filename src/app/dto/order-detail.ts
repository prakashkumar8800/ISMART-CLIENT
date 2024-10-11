export interface OrderDetail {
    id: number
    pre_order_id: any
    user_id: number
    invoice_number: string
    address_id: number
    razorpay_id: string
    total_items: number
    coupon_id: any
    voucher_id: any
    coupon_discount: any
    sc_used: number
    total_amount: number
    total_price: number
    total_delivery_charges: number
    total_tax: number
    order_status: number
    outlet_id: number
    payment_type: number
    payment_done: number
    driver_id: any
    collection_id: any
    delivery_otp: any
    delivery_otp_valid: any
    not_delivered_reason: any
    delivery_time: any
    order_type: number
    status: number
    driver_lat: any
    driver_lng: any
    created_at: string
    updated_at: any
    order_address: OrderAddress
    order_constant: OrderConstant
    order_items: OrderItem[]
    outlet_detail: OutletDetail
    user_detail: UserDetail
    driver_detail: any
    status_detail: StatusDetail
    order_rating: any
    cancel: any
}

export interface OrderAddress {
    id: number
    user_id: number
    order_id: number
    address: string
    landmark: string
    formatted_address: string
    place_id: string
    lat: string
    lng: string
    address_type: string
    contact_person_name: string
    contact_person_phone: string
    address_id: number
}

export interface OrderConstant {
    id: number
    order_id: number
    base_delivery_charge: number
    delivery_charge_pk: number
    gst: number
    delivery_gst: number
}

export interface OrderItem {
    id: number
    item_id: number
    trans_code: any
    offer_id: any
    freebie_id: any
    discount_type: any
    discount_value: any
    discount_amount: number
    item_price: number
    base_price: number
    size_price: number
    crust_price: number
    topping_price: number
    total_price: number
    selected_size: SelectedSize
    selected_crust: SelectedCrust
    selected_toppings: any[]
    quantity: number
    user_id: number
    order_id: number
    created_at: string
    item_detail: ItemDetail
    offerDetail: any
    toppings: string
}

export interface SelectedSize {
    id: number
    item_id: number
    size_id: number
    price: number
    code: string
    base_size: number
    name: string
    serving: number
    extra_cheese: ExtraCheese
    default: boolean
    selected: boolean
    crusts: Crust[]
    toppings: Topping[]
}

export interface ExtraCheese {
    id: number
    size_id: number
    item_id: number
    code: string
    selected: boolean
}

export interface Crust {
    crust_id: number
    name: string
    price: number
    description: string
    code: string
    base_crust: number
    image: string
    selected: boolean
}

export interface Topping {
    topping_id: number
    name: string
    type: number
    price: number
    image: string
    selected: boolean
    code: string
}

export interface SelectedCrust {
    crust_id: number
    name: string
    price: number
    description: string
    code: string
    base_crust: number
    image: string
    selected: boolean
}

export interface ItemDetail {
    id: number
    name: string
    base_price: number
    item_code: string
    description: string
    extra_cheese: number
    item_type: number
    food_type: number
    brand: number
    category: number
    image: string
    cover: string
    status: number
    gst_valid: number
    exclude_min_order: number
    created_on: string
    updated_on: string
}

export interface OutletDetail {
    id: number
    name: string
    address: string
    landmark: string
    lat: string
    lng: string
    place_id: string
    rc_id: string
    radius: number
    open_status: number
    open_timing: string
    closed_timing: string
    formatted_address: string
    contact_phone: string
}

export interface UserDetail {
    id: number
    name: string
    email: string
    phone: string
    password: string
    type: number
    login_otp: string
    login_otp_valid: string
    dob: string
    phone_change_otp: any
    phone_change_otp_valid: any
    status: number
    deleted: number
    socket_id: string
    created_on: string
    updated_on: string
}

export interface StatusDetail {
    id: number
    status: string
}