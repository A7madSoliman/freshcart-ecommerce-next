export type ShippingAddress = {
  details: string;
  phone: string;
  city: string;
};

export type OrderUser = {
  _id: string;
  name?: string;
  email?: string;
};

export type OrderProduct = {
  _id: string;
  title?: string;
  imageCover?: string;
  price?: number;
};

export type OrderCartItem = {
  _id?: string;
  product: OrderProduct | string;
  count: number;
  price: number;
};

export type ApiOrder = {
  _id: string;
  user?: OrderUser | string;
  cartItems?: OrderCartItem[];
  totalOrderPrice?: number;
  paymentMethodType?: "cash" | "card" | string;
  isPaid?: boolean;
  paidAt?: string;
  isDelivered?: boolean;
  deliveredAt?: string;
  createdAt?: string;
};

export type CreateCashOrderResponse = {
  status?: string;
  data?: ApiOrder;
};

export type CheckoutSessionResponse = {
  status?: string;
  session?: {
    url?: string;
    id?: string;
  };
};

export type OrdersListResponse = {
  status?: string;
  results?: number;
  data?: ApiOrder[];
};
