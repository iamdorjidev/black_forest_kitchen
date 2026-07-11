export interface Cake {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  featured?: boolean;
}

export interface CartItem {
  cake: Cake;
  quantity: number;
  note?: string;
}

export interface Review {
  id: string;
  name: string;
  meta: string;
  timeAgo: string;
  text: string;
  reply?: string;
}
