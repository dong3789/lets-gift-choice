import { Gift } from '@/types';

export const gifts: Gift[] = [
  {
    id: 'hanwoo-1',
    name: '직경매 암소 한우 세트',
    description: '1++ 등급 직경매 암소 프리미엄',
    price: 0,
    originalPrice: 250000,
    category: '한우',
    image: '🥩',
    tags: ['한우', '암소', '직경매', '프리미엄'],
    rating: 4.9,
    reviewCount: 2840,
    stock: 50,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'dujjonku-1',
    name: '두바이 쫀득쿠키 세트',
    description: '피스타치오 카다이프 12개입',
    price: 0,
    originalPrice: 68000,
    category: '디저트',
    image: '🍪',
    tags: ['두쫀쿠', '두바이', '쫀득쿠키', '트렌드'],
    rating: 4.9,
    reviewCount: 8900,
    stock: 20,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'strawberry-1',
    name: '프리미엄 딸기 선물세트',
    description: '논산 설향딸기 특대 2kg',
    price: 0,
    originalPrice: 75000,
    category: '과일',
    image: '🍓',
    tags: ['딸기', '설향', '논산', '제철'],
    rating: 4.9,
    reviewCount: 3200,
    stock: 40,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'hongsam-1',
    name: '6년근 홍삼 정과 세트',
    description: '국내산 6년근 홍삼 프리미엄',
    price: 0,
    originalPrice: 150000,
    category: '건강식품',
    image: '🧧',
    tags: ['홍삼', '6년근', '건강', '영양제'],
    rating: 4.9,
    reviewCount: 4100,
    stock: 60,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'gulbi-1',
    name: '영광 참굴비 세트',
    description: '법성포 참굴비 특대 20미',
    price: 0,
    originalPrice: 130000,
    category: '수산물',
    image: '🐟',
    tags: ['굴비', '영광', '법성포', '전통'],
    rating: 4.8,
    reviewCount: 1890,
    stock: 35,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'olive-1',
    name: '스페인 올리브유 세트',
    description: '엑스트라 버진 올리브유 500ml x 2',
    price: 0,
    originalPrice: 65000,
    category: '오일',
    image: '🫒',
    tags: ['올리브유', '스페인', '엑스트라버진'],
    rating: 4.7,
    reviewCount: 980,
    stock: 50,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'jeju-1',
    name: '제주 천혜향 선물세트',
    description: '제주산 프리미엄 천혜향 3kg',
    price: 0,
    originalPrice: 58000,
    category: '과일',
    image: '🍊',
    tags: ['천혜향', '제주', '감귤', '비타민'],
    rating: 4.8,
    reviewCount: 2150,
    stock: 45,
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
