import { Gift } from '@/types';

export const gifts: Gift[] = [
  {
    id: 'hanwoo-1',
    name: '직경매 암소 한우 세트',
    description: '1++ 등급 등심/채끝 400g',
    price: 0,
    originalPrice: 99000,
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
    id: 'massage-1',
    name: '무선 종아리 마사지기',
    description: '온열+공기압 3단계 조절',
    price: 0,
    originalPrice: 89000,
    category: '건강용품',
    image: '🦵',
    tags: ['마사지기', '종아리', '온열', '무선'],
    rating: 4.8,
    reviewCount: 5600,
    stock: 40,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'hongsam-1',
    name: '6년근 홍삼 스틱',
    description: '휴대간편 30포 선물세트',
    price: 0,
    originalPrice: 75000,
    category: '건강식품',
    image: '🧧',
    tags: ['홍삼', '6년근', '스틱', '휴대용'],
    rating: 4.9,
    reviewCount: 4100,
    stock: 60,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'strawberry-1',
    name: '프리미엄 딸기 선물세트',
    description: '논산 설향딸기 특대 1kg',
    price: 0,
    originalPrice: 45000,
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
    id: 'eyemassage-1',
    name: '온열 눈 마사지기',
    description: '진동+온열+압박 블루투스',
    price: 0,
    originalPrice: 69000,
    category: '건강용품',
    image: '👁️',
    tags: ['눈마사지기', '온열', '안구피로', '효도'],
    rating: 4.8,
    reviewCount: 7200,
    stock: 35,
    isPopular: true,
    isNew: true,
  },
  {
    id: 'dujjonku-1',
    name: '두바이 쫀득쿠키 세트',
    description: '피스타치오 카다이프 8개입',
    price: 0,
    originalPrice: 48000,
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
    id: 'nuts-1',
    name: '하루견과 선물세트',
    description: '매일 한봉지 60일분',
    price: 0,
    originalPrice: 52000,
    category: '건강간식',
    image: '🥜',
    tags: ['견과류', '하루견과', '건강', '간식'],
    rating: 4.7,
    reviewCount: 3400,
    stock: 55,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'oil-1',
    name: '국산 참기름 들기름 세트',
    description: '100% 압착 참기름+들기름',
    price: 0,
    originalPrice: 58000,
    category: '전통식품',
    image: '🫒',
    tags: ['참기름', '들기름', '국산', '압착'],
    rating: 4.9,
    reviewCount: 4500,
    stock: 45,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'honey-1',
    name: '천연 벌꿀 세트',
    description: '국내산 아카시아꿀 1kg',
    price: 0,
    originalPrice: 65000,
    category: '건강식품',
    image: '🍯',
    tags: ['꿀', '아카시아', '국내산', '천연'],
    rating: 4.8,
    reviewCount: 2800,
    stock: 40,
    isPopular: true,
    isNew: false,
  },
  {
    id: 'gulbi-1',
    name: '영광 참굴비 세트',
    description: '법성포 참굴비 10미',
    price: 0,
    originalPrice: 79000,
    category: '수산물',
    image: '🐟',
    tags: ['굴비', '영광', '법성포', '전통'],
    rating: 4.8,
    reviewCount: 1890,
    stock: 30,
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
