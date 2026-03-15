<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
#__nuxt {
  margin: 0;
  padding: 0;
  min-height: 100%;
  overflow-x: hidden;
}

body {
  background: #f8f4ef;
}
</style>
