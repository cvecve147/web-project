export type ProductCategory = '手工餅乾' | '手工蛋糕'
export type ProductStatus = 'active' | 'inquiry'

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number
  size: string
  category: ProductCategory
  image: string
  width: number
  height: number
  status: ProductStatus
}

export const brand = {
  name: '芳嚮桿手作坊',
  siteName: '芳嚮桿手作坊',
  siteDescription: '手作糕點、餅乾與節慶禮盒，提供預訂與客製服務。',
  heroTitle: '堅持手工製作，讓每一分溫暖傳遞到你心中',
  heroImage: 'images/products/17.jpg',
  heroWidth: 1440,
  heroHeight: 1080,
  facebookUrl:
    'https://www.facebook.com/%E8%8A%B3%E5%9A%AE%E6%A1%BF%E6%89%8B%E4%BD%9C%E5%9D%8A-113563920277515',
  instagramUrl: 'https://www.instagram.com/handmade_0319/?hl=zh-tw',
  lineId: 'dt0319',
  updatedAt: '2026-03-15'
}

export const products: Product[] = [
  {
    id: 'p-001',
    slug: 'mothers-day-cake',
    name: '客製化蛋糕',
    description:
      '蛋糕體為原味，內餡包含手工熬製草莓醬與蜜桃水果，附一組盤叉，支援客製需求。',
    price: 1200,
    size: '6吋',
    category: '手工蛋糕',
    image: 'images/products/mothers-day-cake.jpg',
    width: 1179,
    height: 1473,
    status: 'active'
  },
  {
    id: 'p-002',
    slug: 'butter-cookie',
    name: '奶油酥餅',
    description: '經典奶香、酥鬆口感，適合日常茶點。',
    price: 60,
    size: '包',
    category: '手工餅乾',
    image: 'images/products/12.jpg',
    width: 1440,
    height: 1080,
    status: 'active'
  },
  {
    id: 'p-003',
    slug: 'diamond-cookie',
    name: '鑽石餅乾',
    description: '加入核桃堅果，口感更有層次。',
    price: 70,
    size: '包',
    category: '手工餅乾',
    image: 'images/products/13.jpg',
    width: 1440,
    height: 1080,
    status: 'active'
  },
  {
    id: 'p-004',
    slug: 'coconut-cookie',
    name: '椰子餅乾',
    description: '椰香風味手工餅乾，香氣清爽。',
    price: 70,
    size: '包',
    category: '手工餅乾',
    image: 'images/products/14.jpg',
    width: 1440,
    height: 1080,
    status: 'active'
  },
  {
    id: 'p-005',
    slug: 'peanut-cookie',
    name: '花生餅乾',
    description: '吃得到花生顆粒，帶有濃郁堅果香。',
    price: 70,
    size: '包',
    category: '手工餅乾',
    image: 'images/products/15.jpg',
    width: 1440,
    height: 1080,
    status: 'active'
  },
  {
    id: 'p-006',
    slug: 'snowball-cookie',
    name: '雪球餅',
    description: '原味、迷迭香、抹茶等口味可選。',
    price: 70,
    size: '包',
    category: '手工餅乾',
    image: 'images/products/16.jpg',
    width: 1440,
    height: 1080,
    status: 'active'
  },
  {
    id: 'p-007',
    slug: 'nougat-cracker',
    name: '雪Q餅',
    description: '蔓越莓與抹茶風味的節慶人氣款。',
    price: 150,
    size: '包',
    category: '手工餅乾',
    image: 'images/products/18.jpg',
    width: 1440,
    height: 1080,
    status: 'active'
  },
  {
    id: 'p-011',
    slug: 'pineapple-upside-down-cake',
    name: '鳳梨翻轉蛋糕',
    description: '新鮮鳳梨製作，酸甜平衡。',
    price: 180,
    size: '5吋',
    category: '手工蛋糕',
    image: 'images/products/17.jpg',
    width: 1440,
    height: 1080,
    status: 'active'
  }
]

export const activeProducts = products.filter((product) => product.status === 'active')
export const inquiryProducts = products.filter((product) => product.status === 'inquiry')

export const productCategories = Array.from(
  new Set(activeProducts.map((product) => product.category))
)

export const getProductBySlug = (slug: string) =>
  activeProducts.find((product) => product.slug === slug)
