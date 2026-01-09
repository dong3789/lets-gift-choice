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
  | '한우/육류'
  | '수산물'
  | '과일'
  | '건강식품'
  | '참기름/들기름'
  | '주류'
  | '과자/간식'
  | '화장품';

export const CATEGORIES: Category[] = [
  '한우/육류',
  '수산물',
  '과일',
  '건강식품',
  '참기름/들기름',
  '주류',
  '과자/간식',
  '화장품',
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
  phone: string;
  address: string;
  message: string;
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
