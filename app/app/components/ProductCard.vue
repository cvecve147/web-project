<script setup lang="ts">
import type { Product } from '~~/data/catalog'

defineProps<{
  product: Product
}>()
</script>

<template>
  <article class="card">
    <NuxtLink
      :to="`/products/${product.slug}`"
      class="image-link"
      :aria-label="`${product.name} 商品頁`"
    >
      <ResponsiveImage
        :src="product.image"
        :alt="product.name"
        :width="product.width"
        :height="product.height"
        loading="lazy"
      />
    </NuxtLink>
    <div class="content">
      <p class="category">{{ product.category }}</p>
      <h3>
        <NuxtLink :to="`/products/${product.slug}`">{{ product.name }}</NuxtLink>
      </h3>
      <p class="description">{{ product.description }}</p>
      <div class="row">
        <p class="price">NT$ {{ product.price }}</p>
        <p class="size">{{ product.size }}</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e7e1d7;
  display: grid;
  grid-template-rows: 220px 1fr;
  min-height: 100%;
}

.image-link {
  display: block;
}

.image-link :deep(picture) {
  width: 100%;
  height: 100%;
}

.image-link :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category {
  margin: 0;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: #795548;
}

h3 {
  margin: 0;
  font-size: 1.15rem;
}

h3 a {
  color: #1f1a16;
  text-decoration: none;
}

.description {
  margin: 0;
  color: #4f463f;
  line-height: 1.6;
}

.row {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: baseline;
}

.price {
  margin: 0;
  font-weight: 700;
}

.size {
  margin: 0;
  color: #6b6259;
}
</style>
