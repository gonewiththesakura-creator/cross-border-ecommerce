import { useState } from 'react'
import Link from 'next/link'
import { Search, X, ExternalLink } from 'lucide-react'

const hotSearches = ['TikTok 广告', 'Shopify', 'SEO', 'VPS', 'SSL', '独立站']

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [localResults, setLocalResults] = useState([])
  const [webResults, setWebResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (value) => {
    const q = value.trim()
    setQuery(q)
    if (!q) {
      setLocalResults([])
      setWebResults([])
      return
    }
    setLoading(true)
    try {
      const [localRes, webRes] = await Promise.all([
        fetch(`/api/search/local?q=${encodeURIComponent(q)}`),
        fetch(`/api/search?q=${encodeURIComponent(q)}`),
      ])
      const localData = await localRes.json()
      setLocalResults(localData.results || [])
      const webData = webRes.ok ? await webRes.json() : { results: [] }
      setWebResults(webData.results || [])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.16),transparent_24%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]" />
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold">跨境技术学习</Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-white">返回首页</Link>
        </div>
      </header>

      <main className="container py-14">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-semibold">站内搜索</h1>
          <p className="mt-4 text-slate-300">先搜站内内容，再补充 Tavily 网络结果。</p>

          <div className="relative mt-8">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e.currentTarget.value)}
              placeholder="输入关键词后回车…"
              className="w-full rounded-full border border-white/10 bg-white/5 py-4 pl-14 pr-14 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-sky-400/40"
            />
            {query && <button onClick={() => handleSearch('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"><X className="h-5 w-5" /></button>}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {hotSearches.map((item) => <button key={item} onClick={() => handleSearch(item)} className="rounded-full bg-white/5 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10">{item}</button>)}
          </div>

          {loading && <div className="mt-8 text-slate-400">搜索中…</div>}

          {!!localResults.length && (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-semibold">站内内容</h2>
              <div className="space-y-4">
                {localResults.map((item) => (
                  <Link key={`${item.section}-${item.slug}`} href={`/${item.section}/${item.slug}`} className="block rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:border-white/20">
                    <div className="text-sm text-sky-300">{item.sectionTitle}</div>
                    <div className="mt-1 text-xl font-medium">{item.title}</div>
                    <div className="mt-2 text-sm leading-7 text-slate-300">{item.excerpt}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {!!webResults.length && (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-semibold">网络结果</h2>
              <div className="space-y-4">
                {webResults.slice(0, 5).map((item, idx) => (
                  <a key={idx} href={item.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:border-white/20">
                    <div className="flex items-center gap-2 text-lg font-medium text-white">{item.title} <ExternalLink className="h-4 w-4 text-slate-400" /></div>
                    <div className="mt-2 text-sm leading-7 text-slate-300">{item.snippet}</div>
                    <div className="mt-2 text-xs text-slate-500">{item.url}</div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
