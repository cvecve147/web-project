type AnalyticsParams = Record<string, string | number | boolean | null | undefined>

const getGtag = () => {
  if (!import.meta.client) {
    return null
  }

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  return typeof gtag === 'function' ? gtag : null
}

export const useAnalytics = () => {
  const trackEvent = (name: string, params: AnalyticsParams = {}) => {
    const gtag = getGtag()
    if (!gtag) {
      return
    }

    gtag('event', name, params)
  }

  const trackContactClick = (
    channel: 'facebook' | 'instagram' | 'line',
    placement: string
  ) => {
    trackEvent('contact_click', {
      contact_channel: channel,
      link_location: placement
    })
  }

  return {
    trackEvent,
    trackContactClick
  }
}
