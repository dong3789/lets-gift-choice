export interface Gift {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  image: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isPopular: boolean;
  isNew: boolean;
}

export type Category =
  | '한우'
  | '수산물'
  | '과일'
  | '건강식품'
  | '건강용품'
  | '건강간식'
  | '디저트'
  | '전통식품';

export const CATEGORIES: Category[] = [
  '한우',
  '수산물',
  '과일',
  '건강식품',
  '건강용품',
  '건강간식',
  '디저트',
  '전통식품',
];

export interface CartItem {
  gift: Gift;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  recipient: RecipientInfo;
  totalAmount: number;
  createdAt: Date;
}

export interface RecipientInfo {
  name: string;
}

export type TrackingEventType = 'view' | 'addToCart' | 'removeFromCart' | 'purchase' | 'search';

export interface TrackingEvent {
  id: string;
  type: TrackingEventType;
  giftId?: string;
  giftName?: string;
  category?: Category;
  searchQuery?: string;
  quantity?: number;
  timestamp: Date;
}
