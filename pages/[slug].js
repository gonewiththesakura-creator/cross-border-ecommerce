import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { getSectionArticles, sections } from '@/lib/siteData'

export async function getServerSideProps({ params }) {
  return { props: { slug: params?.slug || null } }
}

const accentMap = {
  pink: 'text-pink-300 border-pink-400/20 bg-pink-500/10',
  sky: 'text-sky-300 border-sky-400/20 bg-sky-500/10',
  emerald: 'text-emerald-300 border-emerald-400/20 bg-emerald-500/10',
}

export default function SectionPage({ slug }) {
  const section = sections[slug]
  const items = section ? getSectionArticles(slug) : []

  if (!section) {
    return <div className="min-h-screen grid place-items-center bg-slate-950 text-white"><Link href="/">返回首页</Link></div>
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,.18),transparent_25%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]" />
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"><ArrowLeft className="h-4 w-4" /> 返回首页</Link>
          <Link href="/search" className="text-sm text-slate-400 hover:text-white">搜索</Link>
        </div>
      </header>

      <main className="container py-12 lg:py-16">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <div className={`inline-flex rounded-full border px-4 py-2 text-sm ${accentMap[section.accent]}`}>{section.icon} {section.title}</div>
            <h1 className="mt-5 text-4xl font-semibold text-white md:text-5xl">{section.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{section.description}</p>
            <div className="mt-8 text-sm text-slate-400">当前可读文章 {items.length} 篇</div>
          </div>
          <img src={section.cover} alt={section.title} className="w-full rounded-[28px] border border-white/10 object-cover shadow-2xl shadow-black/20" />
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <Link key={item.slug} href={`/${slug}/${item.slug}`} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className={`rounded-full border px-3 py-1 text-xs ${accentMap[section.accent]}`}>{item.difficulty}</span>
                <span className="inline-flex items-center text-xs text-slate-400"><Clock className="mr-1 h-3.5 w-3.5" /> {item.readTime} min</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">#{tag}</span>)}
              </div>
              <div className="mt-6 inline-flex items-center text-sm font-medium text-sky-300">阅读全文 <ArrowRight className="ml-2 h-4 w-4" /></div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
