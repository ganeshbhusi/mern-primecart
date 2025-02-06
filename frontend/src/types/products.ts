export interface Product {
  name: string;
  price: string;
  quantity: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  imageUrl?: string;
}

export interface CartProduct extends Product {
  count: number;
}
