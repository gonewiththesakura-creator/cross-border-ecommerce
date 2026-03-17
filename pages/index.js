import Link from 'next/link'
import { ArrowRight, BookOpen, Globe, Server, Smartphone, Sparkles } from 'lucide-react'
import { articles, sections, getSectionArticles } from '@/lib/siteData'

const iconMap = {
  'tiktok-marketing': Smartphone,
  'independent-store': Globe,
  'networking': Server,
}

export default function Home() {
  const featured = articles.slice(0, 3)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,.18),transparent_26%),radial-gradient(circle_at_left,rgba(14,165,233,.15),transparent_22%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]" />

      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-sky-500 text-white shadow-lg shadow-fuchsia-500/20">🦀</div>
            <div>
              <div className="text-base">跨境技术学习</div>
              <div className="text-xs text-slate-400">Cross-border Ecommerce Playbook</div>
            </div>
          </Link>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <Link href="/tiktok-marketing" className="hover:text-white">TikTok 运营</Link>
            <Link href="/independent-store" className="hover:text-white">独立站运营</Link>
            <Link href="/networking" className="hover:text-white">网络搭建</Link>
            <Link href="/search" className="hover:text-white">搜索</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="container grid gap-10 py-16 lg:grid-cols-[1.2fr_.8fr] lg:py-24">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-200">
              <Sparkles className="h-4 w-4" />
              面向跨境电商的技术知识库
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-white md:text-6xl">
              做一个能看、能学、
              <span className="bg-gradient-to-r from-fuchsia-400 to-sky-400 bg-clip-text text-transparent">像成品</span>
              的跨境知识网站
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              聚焦 TikTok 投放、独立站运营和网络基础设施。不是流水账资料站，而是更接近实战手册的内容中心。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/tiktok-marketing" className="btn-primary">先看核心内容 <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/search" className="btn border border-white/15 bg-white/5 text-white hover:bg-white/10">站内搜索</Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="mb-4 text-sm font-medium text-slate-300">精选文章</div>
            <div className="space-y-4">
              {featured.map((article) => {
                const section = sections[article.section]
                return (
                  <Link key={`${article.section}-${article.slug}`} href={`/${article.section}/${article.slug}`} className="block rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:border-white/20 hover:bg-slate-900">
                    <div className="mb-2 text-xs text-slate-400">{section.title}</div>
                    <div className="text-lg font-semibold text-white">{article.title}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-300">{article.excerpt}</div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="container py-8 lg:py-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Sections</div>
              <h2 className="mt-2 text-3xl font-semibold text-white">三大核心板块</h2>
            </div>
            <div className="text-sm text-slate-400">当前已上线 {articles.length} 篇可访问文章</div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {Object.values(sections).map((section) => {
              const Icon = iconMap[section.slug]
              const items = getSectionArticles(section.slug)
              return (
                <div key={section.slug} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-xl shadow-black/10">
                  <img src={section.cover} alt={section.title} className="h-48 w-full object-cover" />
                  <div className="p-6">
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${section.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{section.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{section.description}</p>
                    <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                      {items.map((item) => (
                        <Link key={item.slug} href={`/${section.slug}/${item.slug}`} className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5">
                          <span>{item.title}</span>
                          <span className="text-xs text-slate-400">{item.readTime} min</span>
                        </Link>
                      ))}
                    </div>
                    <Link href={`/${section.slug}`} className="mt-6 inline-flex items-center text-sm font-medium text-sky-300 hover:text-sky-200">
                      查看板块
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
