<script setup lang="ts">
import { activeProducts, brand, productCategories } from '~~/data/catalog'

const route = useRoute()
const siteConfig = useSiteConfig()
const siteUrl = computed(() => siteConfig.url || 'https://example.com/')
const canonicalUrl = computed(() =>
  new URL(route.path.replace(/^\//, ''), siteUrl.value).toString()
)

const groupedProducts = computed(() =>
  productCategories.map((category) => ({
    category,
    items: activeProducts.filter((product) => product.category === category)
  }))
)
const { trackContactClick } = useAnalytics()
const onSocialClick = (channel: 'facebook' | 'instagram', placement: string) => {
  trackContactClick(channel, placement)
}

useSeoMeta({
  title: `全部商品 | ${brand.name}`,
  description: `${brand.name} 商品列表：手工餅乾、手工蛋糕、節慶禮盒。`,
  ogTitle: `全部商品 | ${brand.name}`,
  ogDescription: `${brand.name} 商品列表：手工餅乾、手工蛋糕、節慶禮盒。`,
  ogType: 'website'
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl.value }]
})
</script>

<template>
  <main class="page">
    <header class="header">
      <p class="eyebrow">Product List</p>
      <h1>全部商品</h1>
      <p>{{ brand.siteDescription }}（目前在架 {{ activeProducts.length }} 項）</p>
    </header>

    <section v-for="group in groupedProducts" :key="group.category" class="section">
      <h2>{{ group.category }}</h2>
      <div class="grid">
        <ProductCard v-for="product in group.items" :key="product.id" :product="product" />
      </div>
    </section>

    <section class="section inquiry">
      <h2>更多商品可私訊詢問</h2>
      <p>可詢問客製蛋糕、節慶禮盒與季節限定品項，請透過 Facebook / Instagram 私訊。</p>
      <div class="inquiry-actions">
        <a
          :href="brand.facebookUrl"
          target="_blank"
          rel="noopener noreferrer"
          @click="onSocialClick('facebook', 'products_inquiry')"
          >Facebook 詢問</a
        >
        <a
          :href="brand.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          @click="onSocialClick('instagram', 'products_inquiry')"
          >Instagram 詢問</a
        >
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100dvh;
  background: #f7f3ed;
  padding: 20px;
  display: grid;
  gap: 24px;
}

.header,
.section {
  max-width: 1180px;
  width: 100%;
  margin: 0 auto;
}

.header {
  background: #fff;
  border: 1px solid #e8dfd3;
  border-radius: 18px;
  padding: 20px;
}

.eyebrow {
  margin: 0;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6d5d4f;
}

h1 {
  margin: 8px 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.header p {
  margin: 0;
  color: #4f463f;
  line-height: 1.6;
}

h2 {
  margin: 0 0 12px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 16px;
}

.inquiry {
  background: #fff;
  border: 1px solid #e8dfd3;
  border-radius: 18px;
  padding: 20px;
}

.inquiry p {
  margin: 8px 0 14px;
  color: #4f463f;
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

@media (max-width: 640px) {
  .page {
    padding: 14px;
    gap: 18px;
  }

  .header {
    border-radius: 16px;
    padding: 14px;
  }

  .inquiry {
    border-radius: 16px;
    padding: 14px;
  }

  h2 {
    margin-bottom: 10px;
  }

  .inquiry-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .inquiry-actions a {
    width: 100%;
    text-align: center;
    padding: 10px 12px;
  }
}
</style>
