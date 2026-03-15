<script setup lang="ts">
import {
  isExternalImage,
  resolveImagePath,
  resolveLocalVariantPath
} from '~/utils/image'

const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    width: number
    height: number
    loading?: 'lazy' | 'eager'
    fetchpriority?: 'high' | 'low' | 'auto'
  }>(),
  {
    loading: 'lazy',
    fetchpriority: 'auto'
  }
)

const runtimeConfig = useRuntimeConfig()
const resolvedSrc = computed(() =>
  resolveImagePath(props.src, runtimeConfig.app.baseURL)
)
const useOptimizedSources = computed(
  () => !isExternalImage(props.src) && /\.(jpe?g|png)$/i.test(props.src)
)
const webpSrc = computed(() =>
  resolveImagePath(resolveLocalVariantPath(props.src, 'webp'), runtimeConfig.app.baseURL)
)
const avifSrc = computed(() =>
  resolveImagePath(resolveLocalVariantPath(props.src, 'avif'), runtimeConfig.app.baseURL)
)
</script>

<template>
  <picture>
    <source v-if="useOptimizedSources" :srcset="avifSrc" type="image/avif" />
    <source v-if="useOptimizedSources" :srcset="webpSrc" type="image/webp" />
    <img
      :src="resolvedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      :fetchpriority="fetchpriority"
      decoding="async"
    />
  </picture>
</template>
