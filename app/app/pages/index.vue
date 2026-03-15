<script setup lang="ts">
import { activeProducts, brand } from '~~/data/catalog'

const route = useRoute()
const siteConfig = useSiteConfig()

const siteUrl = computed(() => siteConfig.url || 'https://example.com/')

const canonicalUrl = computed(() =>
  new URL(route.path.replace(/^\//, ''), siteUrl.value).toString()
)
const heroOgImage = computed(() =>
  new URL(brand.heroImage, siteUrl.value).toString()
)

const productListSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: activeProducts.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: new URL(`products/${product.slug}`, siteUrl.value).toString(),
    name: product.name
  }))
}))

const faqSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '如何訂購芳嚮桿手作坊商品？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '可透過 Facebook、Instagram 私訊，或 Line（dt0319）聯繫訂購。'
      }
    },
    {
      '@type': 'Question',
      name: '是否可以客製蛋糕或禮盒？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '可提供客製蛋糕、節慶禮盒與季節限定品項，請私訊詢問需求與交期。'
      }
    },
    {
      '@type': 'Question',
      name: '商品頁價格是否為最新資訊？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '網站顯示目前在架商品價格；特殊客製需求請私訊確認最終報價。'
      }
    }
  ]
}))
const homeProducts = computed(() => activeProducts)
const { trackContactClick } = useAnalytics()
const onSocialClick = (channel: 'facebook' | 'instagram', placement: string) => {
  trackContactClick(channel, placement)
}

useSeoMeta({
  title: `${brand.name} | 手作糕點與餅乾`,
  description: brand.siteDescription,
  ogTitle: `${brand.name} | 手作糕點與餅乾`,
  ogDescription: brand.siteDescription,
  ogType: 'website',
  ogLocale: 'zh_TW',
  ogImage: heroOgImage.value,
  twitterCard: 'summary_large_image'
})

useHead({
  htmlAttrs: { lang: 'zh-Hant' },
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: brand.name,
        url: siteUrl.value,
        sameAs: [brand.facebookUrl, brand.instagramUrl]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(productListSchema.value)
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqSchema.value)
    }
  ]
})
</script>

<template>
  <main class="page">
    <section class="hero">
      <ResponsiveImage
        :src="brand.heroImage"
        :alt="brand.name"
        :width="brand.heroWidth"
        :height="brand.heroHeight"
        loading="eager"
        fetchpriority="high"
      />
      <div class="overlay">
        <p class="eyebrow">Handmade Bakery</p>
        <h1>{{ brand.name }}</h1>
        <p>{{ brand.heroTitle }}</p>
        <div class="hero-actions">
          <NuxtLink to="/products">查看商品</NuxtLink>
          <a
            :href="brand.facebookUrl"
            target="_blank"
            rel="noopener noreferrer"
            @click="onSocialClick('facebook', 'home_hero')"
            >Facebook 聯絡</a
          >
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>在架商品（{{ homeProducts.length }}）</h2>
        <NuxtLink to="/products">全部商品</NuxtLink>
      </div>
      <div class="grid">
        <ProductCard v-for="product in homeProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <section class="section inquiry">
      <div class="section-head">
        <h2>更多商品可私訊詢問</h2>
      </div>
      <p class="inquiry-text">可詢問客製蛋糕、節慶禮盒與季節限定品項，請透過 Facebook 或 Instagram 私訊。</p>
      <div class="inquiry-actions">
        <a
          :href="brand.facebookUrl"
          target="_blank"
          rel="noopener noreferrer"
          @click="onSocialClick('facebook', 'home_inquiry')"
          >Facebook 詢問</a
        >
        <a
          :href="brand.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          @click="onSocialClick('instagram', 'home_inquiry')"
          >Instagram 詢問</a
        >
      </div>
    </section>

    <section class="section contact">
      <h2>訂購方式</h2>
      <p>可透過 Facebook、Instagram 私訊，或 Line（{{ brand.lineId }}）聯繫。</p>
      <div class="links">
        <a
          :href="brand.facebookUrl"
          target="_blank"
          rel="noopener noreferrer"
          @click="onSocialClick('facebook', 'home_contact')"
          >Facebook</a
        >
        <a
          :href="brand.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          @click="onSocialClick('instagram', 'home_contact')"
          >Instagram</a
        >
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100dvh;
  background: #f8f4ef;
  padding: 20px;
  display: grid;
  gap: 28px;
}

.hero {
  position: relative;
  max-width: 1180px;
  margin: 0 auto;
  border-radius: 26px;
  overflow: hidden;
  background: #221d17;
}

.hero :deep(picture) {
  width: 100%;
  height: min(72dvh, 680px);
}

.hero :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.86;
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 12px;
  padding: clamp(24px, 5vw, 56px);
  color: #fff;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.74));
}

.eyebrow {
  margin: 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.84rem;
}

h1 {
  margin: 0;
  font-size: clamp(2.1rem, 5vw, 4rem);
  line-height: 1.1;
}

.overlay p {
  margin: 0;
  max-width: 620px;
  line-height: 1.6;
}

.hero-actions {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-actions a {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  padding: 8px 14px;
}

.section {
  max-width: 1180px;
  margin: 0 auto;
  width: 100%;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}

.section-head h2,
.contact h2 {
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 2rem);
}

.section-head a {
  color: #623b26;
  text-decoration: none;
  font-weight: 600;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 16px;
}

.contact {
  background: #fff;
  border: 1px solid #e7dfd5;
  border-radius: 20px;
  padding: 18px;
}

.inquiry {
  background: #fff;
  border: 1px solid #e7dfd5;
  border-radius: 20px;
  padding: 18px;
}

.inquiry-text {
  margin: 0 0 14px;
  color: #4b423a;
}

.inquiry-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.inquiry-actions a {
  text-decoration: none;
  color: #734d31;
  border: 1px solid #d8c6b4;
  background: #fff;
  border-radius: 999px;
  padding: 8px 14px;
  font-weight: 600;
}

.contact p {
  margin: 12px 0 0;
  color: #3f352d;
}

.links {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.links a {
  color: #744f35;
  text-decoration: none;
  font-weight: 600;
}

@media (max-width: 640px) {
  .page {
    padding: 14px;
    gap: 20px;
  }

  .hero {
    border-radius: 18px;
  }

  .hero :deep(picture) {
    height: min(58dvh, 520px);
  }

  .overlay {
    padding: 18px;
    gap: 10px;
  }

  .section-head {
    margin-bottom: 10px;
  }

  .section-head a {
    font-size: 0.95rem;
  }

  .contact,
  .inquiry {
    border-radius: 16px;
    padding: 14px;
  }
}
</style>
