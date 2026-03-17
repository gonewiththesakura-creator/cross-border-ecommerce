import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Analytics from '@/components/Analytics'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Analytics />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}