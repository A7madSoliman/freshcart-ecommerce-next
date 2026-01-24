export type ApiCartProduct = {
  _id: string;
  title?: string;
  imageCover?: string;
  price?: number;
};

export type ApiCartItem = {
  _id?: string;
  product: ApiCartProduct | string;
  count: number;
  price: number;
};
export type ApiCartData = {
  _id: string;
  cartOwner: string;
  products: ApiCartItem[];
  totalCartPrice: number;
};

export type CartResponse = {
  status: string;
  numOfCartItems: number;
  data: ApiCartData;
};
