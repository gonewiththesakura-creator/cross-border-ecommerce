import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Analytics() {
  const router = useRouter()

  useEffect(() => {
    // Google Analytics 4
    const gaId = 'G-XXXXXXXXXX' // 替换为你的 GA4 测量 ID

    // Load GA script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    script.async = true
    document.head.appendChild(script)

    // Initialize GA
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', gaId, {
      page_path: router.asPath,
    })

    return () => {
      // Cleanup if needed
      document.head.removeChild(script)
    }
  }, [router.asPath])

  return null
}