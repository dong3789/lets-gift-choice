import { Gift } from '@/types';

export const gifts: Gift[] = [
  {
    id: 'beef-1',
    name: '한우 1++ 등급 선물세트',
    description: '최고급 한우 1++ 등급 프리미엄',
    price: 0,
    originalPrice: 200000,
    category: '한우/육류',
    image: '🥩',
    tags: ['프리미엄', '명절선물', '인기'],
    rating: 4.9,
    reviewCount: 1250,
    stock: 50,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'seafood-1',
    name: '참굴비 선물세트',
    description: '영광 법성포 참굴비 20마리',
    price: 0,
    originalPrice: 120000,
    category: '수산물',
    image: '🐟',
    tags: ['굴비', '전통', '영광'],
    rating: 4.7,
    reviewCount: 650,
    stock: 40,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'fruit-1',
    name: '명품 사과 선물세트',
    description: '경북 청송 꿀사과 12과',
    price: 0,
    originalPrice: 80000,
    category: '과일',
    image: '🍎',
    tags: ['사과', '청송', '프리미엄'],
    rating: 4.8,
    reviewCount: 1100,
    stock: 60,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'fruit-3',
    name: '나주 배 선물세트',
    description: '나주 신고배 특대 6과',
    price: 0,
    originalPrice: 85000,
    category: '과일',
    image: '🍐',
    tags: ['배', '나주', '신고배'],
    rating: 4.9,
    reviewCount: 920,
    stock: 40,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'health-1',
    name: '6년근 홍삼 세트',
    description: '국내산 6년근 홍삼 정과',
    price: 0,
    originalPrice: 130000,
    category: '건강식품',
    image: '🧧',
    tags: ['홍삼', '건강', '6년근'],
    rating: 4.9,
    reviewCount: 2100,
    stock: 80,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'oil-1',
    name: '프리미엄 참기름 세트',
    description: '국산 참깨 100% 압착',
    price: 0,
    originalPrice: 55000,
    category: '참기름/들기름',
    image: '🫒',
    tags: ['참기름', '국산', '압착'],
    rating: 4.8,
    reviewCount: 890,
    stock: 60,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'snack-2',
    name: '프리미엄 견과류 세트',
    description: '아몬드, 캐슈넛, 호두, 마카다미아',
    price: 0,
    originalPrice: 65000,
    category: '과자/간식',
    image: '🥜',
    tags: ['견과류', '건강간식', '프리미엄'],
    rating: 4.7,
    reviewCount: 890,
    stock: 55,
    isPopular: true,
    isNew: false,
  },
];

export const getGiftById = (id: string): Gift | undefined => {
  return gifts.find((gift) => gift.id === id);
};

export const getGiftsByCategory = (category: string): Gift[] => {
  if (category === 'all') return gifts;
  return gifts.filter((gift) => gift.category === category);
};

export const getPopularGifts = (): Gift[] => {
  return gifts.filter((gift) => gift.isPopular);
};

export const getNewGifts = (): Gift[] => {
  return gifts.filter((gift) => gift.isNew);
};

export const searchGifts = (query: string): Gift[] => {
  const lowerQuery = query.toLowerCase();
  return gifts.filter(
    (gift) =>
      gift.name.toLowerCase().includes(lowerQuery) ||
      gift.description.toLowerCase().includes(lowerQuery) ||
      gift.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};
