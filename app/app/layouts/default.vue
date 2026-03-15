<script setup lang="ts">
import { brand } from '~~/data/catalog'
</script>

<template>
  <div class="layout">
    <header class="header">
      <div class="inner">
        <NuxtLink to="/" class="brand">{{ brand.name }}</NuxtLink>
        <nav>
          <NuxtLink to="/">首頁</NuxtLink>
          <NuxtLink to="/products">商品</NuxtLink>
        </nav>
      </div>
    </header>

    <div class="body">
      <slot />
    </div>

    <footer class="footer">
      <div class="inner">
        <p>{{ brand.name }} © {{ new Date().getFullYear() }}</p>
        <p>Line: {{ brand.lineId }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow-x: clip;
}

.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(250, 246, 240, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e6ddcf;
}

.inner {
  max-width: 1180px;
  margin: 0 auto;
  width: 100%;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.brand {
  text-decoration: none;
  color: #221a14;
  font-weight: 700;
  min-width: 0;
}

nav {
  display: flex;
  gap: 14px;
}

nav a {
  text-decoration: none;
  color: #4f4338;
}

.body {
  flex: 1;
}

.footer {
  border-top: 1px solid #e6ddcf;
  background: #f8f4ef;
}

.footer p {
  margin: 0;
  color: #5a4d40;
}

.footer .inner {
  padding-top: 16px;
  padding-bottom: 16px;
}

@media (max-width: 640px) {
  .header .inner {
    padding: 10px 14px;
    flex-wrap: wrap;
    row-gap: 8px;
  }

  .brand {
    font-size: 0.98rem;
  }

  nav {
    width: 100%;
    justify-content: flex-start;
    gap: 12px;
  }

  nav a {
    font-size: 0.94rem;
  }

  .footer .inner {
    padding: 12px 14px;
  }
}
</style>
