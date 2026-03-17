import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { getSectionArticles, sections } from '@/lib/siteData'

export async function getServerSideProps({ params }) {
  return { props: { slug: params?.slug || null } }
}

export default function SectionPage({ slug }) {
  const section = sections[slug]
  const items = section ? getSectionArticles(slug) : []
  if (!section) return <div className="min-h-screen grid place-items-center"><Link href="/">返回首页</Link></div>

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#f5f5f7]/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-950"><ArrowLeft className="h-4 w-4" /> 首页</Link>
          <Link href="/search" className="text-sm text-slate-600 hover:text-slate-950">搜索</Link>
        </div>
      </header>

      <main className="container py-14">
        <section className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <div className="pill">{section.icon} {section.title}</div>
            <h1 className="mt-5 text-5xl font-semibold leading-tight">{section.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{section.description}</p>
            <div className="mt-6 text-sm text-slate-500">本板块当前可读文章 {items.length} 篇</div>
          </div>
          <img src={section.cover} alt={section.title} className="w-full rounded-[30px] border border-black/[0.06] object-cover shadow-[0_18px_40px_rgba(15,23,42,0.06)]" />
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <Link key={item.slug} href={`/${slug}/${item.slug}`} className="soft-card p-6 transition hover:-translate-y-0.5">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span className="pill">{item.difficulty}</span>
                <span className="inline-flex items-center"><Clock className="mr-1 h-3.5 w-3.5" /> {item.readTime} min</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => <span key={tag} className="pill">#{tag}</span>)}
              </div>
              <div className="mt-6 inline-flex items-center text-sm font-medium text-slate-900">阅读全文 <ArrowRight className="ml-2 h-4 w-4" /></div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
