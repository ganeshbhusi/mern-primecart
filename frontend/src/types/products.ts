export interface Product {
  name: string;
  price: string;
  quantity: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartProduct extends Product {
  count: number;
}
