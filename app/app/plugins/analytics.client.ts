export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const gtagId = runtimeConfig.public.gtagId || 'G-HBTXC8NW8N'

  if (!gtagId) {
    return
  }

  const analyticsWindow = window as Window & {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }

  analyticsWindow.dataLayer = analyticsWindow.dataLayer || []
  analyticsWindow.gtag =
    analyticsWindow.gtag ||
    ((...args: unknown[]) => {
      analyticsWindow.dataLayer!.push(args)
    })

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gtagId)}`,
        async: true
      }
    ]
  })

  analyticsWindow.gtag('js', new Date())
  analyticsWindow.gtag('config', gtagId, { send_page_view: false })

  const sendPageView = () => {
    analyticsWindow.gtag?.('event', 'page_view', {
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
