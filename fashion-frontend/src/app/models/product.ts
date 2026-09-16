export interface Product {
  _id?: string;

  name: string;

  description: string;

  price: number;

  category:
    | 'dresses'
    | 'shirts'
    | 'pants'
    | 'shoes'
    | 'accessories';

  size:
    | 'XS'
    | 'S'
    | 'M'
    | 'L'
    | 'XL'
    | '36'
    | '37'
    | '38'
    | '39'
    | '40'
    | '41'
    | '42'
    | 'No Size';

  stock: number;

  imageUrl?: string;
}