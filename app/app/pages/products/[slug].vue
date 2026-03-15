<script setup lang="ts">
import { activeProducts, brand, getProductBySlug } from '~~/data/catalog'

prerenderRoutes(activeProducts.map((product) => `/products/${product.slug}`))

const route = useRoute()
const siteConfig = useSiteConfig()
const siteUrl = computed(() => siteConfig.url || 'https://example.com/')

const slug = computed(() => String(route.params.slug || ''))
const product = computed(() => getProductBySlug(slug.value))

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const pageTitle = computed(() => `${product.value!.name} | ${brand.name}`)
const normalizedDescription = computed(() =>
  product.value!.description.replace(/[。.!?]+$/u, '')
)
const pageDescription = computed(
  () => `${normalizedDescription.value}。價格 NT$ ${product.value!.price} / ${product.value!.size}`
)
const canonicalUrl = computed(() =>
  new URL(route.path.replace(/^\//, ''), siteUrl.value).toString()
)
const imageUrl = computed(() =>
  new URL(product.value!.image, siteUrl.value).toString()
)
const { trackContactClick } = useAnalytics()
const onSocialClick = (channel: 'facebook' | 'instagram', placement: string) => {
  trackContactClick(channel, placement)
}

useSeoMeta({
  title: pageTitle.value,
  description: pageDescription.value,
  ogTitle: pageTitle.value,
  ogDescription: pageDescription.value,
  ogType: 'website',
  ogImage: imageUrl.value,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.value!.name,
        description: product.value!.description,
        image: [imageUrl.value],
        category: product.value!.category,
        brand: { '@type': 'Brand', name: brand.name },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'TWD',
          price: product.value!.price,
          availability: 'https://schema.org/InStock',
          url: canonicalUrl.value
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '首頁',
            item: siteUrl.value
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: '商品列表',
            item: new URL('products', siteUrl.value).toString()
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.value!.name,
            item: canonicalUrl.value
          }
        ]
      })
    }
  ]
})
</script>

<template>
  <main class="page">
    <div class="container">
      <nav class="breadcrumb">
        <NuxtLink to="/">首頁</NuxtLink>
        <span>/</span>
        <NuxtLink to="/products">商品列表</NuxtLink>
        <span>/</span>
        <strong>{{ product?.name }}</strong>
      </nav>

      <section class="product">
        <div class="image-box">
          <ResponsiveImage
            :src="product!.image"
            :alt="product!.name"
            :width="product!.width"
            :height="product!.height"
            loading="eager"
          />
        </div>
        <div class="info">
          <p class="category">{{ product?.category }}</p>
          <h1>{{ product?.name }}</h1>
          <p class="desc">{{ product?.description }}</p>
          <p class="price">NT$ {{ product?.price }}</p>
          <p class="meta">規格：{{ product?.size }}</p>
          <div class="contact">
            <a :href="brand.facebookUrl" target="_blank" rel="noopener noreferrer"
              @click="onSocialClick('facebook', 'product_detail')"
              >Facebook 私訊訂購</a
            >
            <a :href="brand.instagramUrl" target="_blank" rel="noopener noreferrer"
              @click="onSocialClick('instagram', 'product_detail')"
              >Instagram 私訊</a
            >
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.page {
  min-height: 100dvh;
  background: #f7f3ed;
  padding: 20px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 14px;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  color: #6a5b4d;
  font-size: 0.92rem;
}

.breadcrumb a {
  text-decoration: none;
  color: #6a5b4d;
}

.product {
  background: #fff;
  border: 1px solid #e7dfd5;
  border-radius: 18px;
  padding: 18px;
  display: grid;
  gap: 20px;
}

.image-box :deep(img) {
  width: 100%;
  border-radius: 14px;
  object-fit: cover;
  max-height: 560px;
}

.category {
  margin: 0;
  color: #735640;
  font-size: 0.84rem;
}

h1 {
  margin: 8px 0 10px;
  font-size: clamp(1.8rem, 3.8vw, 2.8rem);
}

.desc {
  margin: 0;
  color: #4f463f;
  line-height: 1.7;
}

.price {
  margin: 18px 0 0;
  font-size: 1.35rem;
  font-weight: 700;
}

.meta {
  margin: 8px 0 0;
  color: #66594d;
}

.contact {
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.contact a {
  text-decoration: none;
  color: #734d31;
  font-weight: 600;
}

@media (min-width: 900px) {
  .product {
    grid-template-columns: 1.2fr 1fr;
    align-items: start;
  }
}
</style>
