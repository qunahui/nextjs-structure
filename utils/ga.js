// log the pageview with their URL
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.GOOGLE_ANALYTICS_ID, {
      page_path: url,
    })
  }
}

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag('event', action, params)
}
