const getGtag = () => {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  return typeof gtag === 'function' ? gtag : null
}

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const gtagId = runtimeConfig.public.gtagId

  if (!gtagId) {
    return
  }

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gtagId)}`,
        async: true
      },
      {
        key: 'ga4-init',
        innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}window.gtag=window.gtag||gtag;window.gtag('js', new Date());window.gtag('config', '${gtagId}', { send_page_view: false });`
      }
    ]
  })

  const sendPageView = () => {
    const gtag = getGtag()
    if (!gtag) {
      return
    }

    gtag('event', 'page_view', {
      page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
      page_location: window.location.href,
      page_title: document.title
    })
  }

  onNuxtReady(() => {
    const router = useRouter()
    sendPageView()
    router.afterEach(() => {
      sendPageView()
    })
  })
})
