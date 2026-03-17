import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const sections = [
    {
      title: 'TikTok 运营',
      slug: 'tiktok-marketing',
      description: '从零开始学习 TikTok 广告投放、内容创作、账号运营与数据分析',
      icon: '📱',
      topics: ['入门指南', '广告投放', '内容创作', '数据分析', '算法解析']
    },
    {
      title: '独立站运营',
      slug: 'independent-store',
      description: 'Shopify/WooCommerce 搭建、选品策略、SEO 优化、支付物流',
      icon: '🏪',
      topics: ['平台选择', '店铺搭建', '选品策略', '流量获取', '转化优化']
    },
    {
      title: '网络搭建',
      slug: 'networking',
      description: 'VPS 选择、CDN 配置、安全防护、性能优化加速',
      icon: '🌐',
      topics: ['VPS 入门', '域名解析', 'SSL 证书', 'CDN 加速', '安全配置']
    }
  ]

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>跨境技术学习</h1>
          <p>专业的跨境电商知识平台</p>
        </div>
      </header>

      <main>
        <section className={styles.banner}>
          <h2>掌握跨境电商核心技术</h2>
          <p>TikTok 运营 · 独立站建设 · 网络架构</p>
        </section>

        <section className={styles.grid}>
          {sections.map((section) => (
            <div key={section.slug} className={styles.card}>
              <div className={styles.icon}>{section.icon}</div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <ul className={styles.topics}>
                {section.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              <Link href={`/${section.slug}`} className={styles.btn}>
                进入学习 →
              </Link>
            </div>
          ))}
        </section>

        <section className={styles.about}>
          <h2>关于本站</h2>
          <p>
            本站专注于跨境电商技术知识分享，涵盖 TikTok 运营、
            独立站搭建、网络基础设施等核心领域。所有内容均为实战经验总结，
            帮助你快速掌握跨境技术要点，少走弯路。
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 跨境技术学习 | 持续更新中</p>
      </footer>
    </div>
  )
}