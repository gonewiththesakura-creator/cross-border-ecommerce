import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { articles, sections, getSectionArticles } from '@/lib/siteData'

const featured = articles.slice(0, 3)

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#f5f5f7]/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">跨境技术学习</Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <Link href="/tiktok-marketing" className="hover:text-slate-950">TikTok 运营</Link>
            <Link href="/independent-store" className="hover:text-slate-950">独立站运营</Link>
            <Link href="/networking" className="hover:text-slate-950">网络搭建</Link>
            <Link href="/search" className="hover:text-slate-950">搜索</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="container py-20 md:py-28">
          <div className="mx-auto max-w-5xl text-center">
            <div className="pill mb-6">跨境电商知识库 · 高完成度内容产品</div>
            <h1 className="text-5xl font-semibold leading-[1.02] md:text-7xl">
              让内容像产品，
              <br />
              而不是像资料堆。
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
              围绕 TikTok 运营、独立站运营与网络搭建，建立一套更清晰、更耐读、更有完成度的跨境知识体系。
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/tiktok-marketing" className="btn-primary">开始阅读</Link>
              <Link href="/search" className="btn border border-black/10 bg-white text-slate-900 hover:bg-slate-50">搜索内容</Link>
            </div>
          </div>
        </section>

        <section className="container pb-12">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
            <div className="soft-card p-8 md:p-10">
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Featured</div>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">本周重点阅读</h2>
              <div className="mt-8 space-y-5">
                {featured.map((item, index) => (
                  <Link key={`${item.section}-${item.slug}`} href={`/${item.section}/${item.slug}`} className="block rounded-[24px] border border-black/[0.06] bg-[#fbfbfd] p-5 transition hover:bg-white hover:shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.15em] text-slate-400">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span>{sections[item.section].title}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.excerpt}</p>
                    <div className="mt-4 text-sm text-slate-400">{item.readTime} min read</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="soft-card p-8 md:p-10">
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Overview</div>
              <h2 className="mt-3 text-3xl font-semibold">三大板块</h2>
              <div className="mt-8 space-y-4">
                {Object.values(sections).map((section) => {
                  const items = getSectionArticles(section.slug)
                  return (
                    <Link key={section.slug} href={`/${section.slug}`} className="block rounded-[24px] border border-black/[0.06] bg-[#fbfbfd] p-5 transition hover:bg-white hover:shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-500">{section.icon} {section.title}</div>
                        <div className="text-xs text-slate-400">{items.length} 篇</div>
                      </div>
                      <div className="mt-3 text-lg font-medium">{section.description}</div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="container pb-16">
          <div className="soft-card p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Sections</div>
                <h2 className="mt-2 text-3xl font-semibold">按专题进入</h2>
              </div>
              <div className="text-sm text-slate-500">当前已上线 {articles.length} 篇文章</div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {Object.values(sections).map((section) => {
                const items = getSectionArticles(section.slug)
                return (
                  <div key={section.slug} className="rounded-[24px] border border-black/[0.06] bg-[#fbfbfd] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                    <img src={section.cover} alt={section.title} className="h-44 w-full rounded-[18px] object-cover" />
                    <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                      <span>{section.icon}</span>
                      <span>{section.title}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold">{section.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{section.description}</p>
                    <div className="mt-5 space-y-2 border-t border-black/[0.06] pt-4">
                      {items.map((item) => (
                        <Link key={item.slug} href={`/${section.slug}/${item.slug}`} className="flex items-center justify-between rounded-xl px-2 py-2 text-sm text-slate-700 hover:bg-white">
                          <span>{item.title}</span>
                          <span className="text-xs text-slate-400">{item.readTime} min</span>
                        </Link>
                      ))}
                    </div>
                    <Link href={`/${section.slug}`} className="mt-5 inline-flex items-center text-sm font-medium text-slate-900">
                      查看板块 <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
