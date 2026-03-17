import Link from 'next/link'
import styles from '@/styles/Section.module.css'

const sections = {
  'tiktok-marketing': {
    title: 'TikTok 运营',
    icon: '📱',
    description: '从零开始学习 TikTok 广告投放、内容创作、账号运营与数据分析',
    topics: [
      { slug: 'getting-started', title: '入门指南', desc: 'TikTok 账号注册、基础设置、养号技巧' },
      { slug: 'ads-basics', title: '广告投放基础', desc: '广告账户开通、预算设置、受众定位' },
      { slug: 'content-creation', title: '内容创作', desc: '短视频制作、脚本撰写、热门话题跟进' },
      { slug: 'advanced-ads', title: '高级投放技巧', desc: 'OCPM 算法、A/B 测试、ROI 优化' },
      { slug: 'analytics', title: '数据分析', desc: '数据指标解读、报表分析、问题诊断' },
      { slug: 'algorithm', title: '算法机制', desc: '推荐逻辑、流量池规则、权重因素' }
    ]
  },
  'independent-store': {
    title: '独立站运营',
    icon: '🏪',
    description: 'Shopify/WooCommerce 搭建、选品策略、SEO 优化、支付物流',
    topics: [
      { slug: 'platform-comparison', title: '平台选择', desc: 'Shopify vs WooCommerce vs BigCommerce' },
      { slug: 'store-setup', title: '店铺搭建', desc: '域名选择、主题安装、基础配置' },
      { slug: 'product-selection', title: '选品策略', desc: '市场调研、利润计算、供应链管理' },
      { slug: 'seo-guide', title: 'SEO 优化', desc: '关键词研究、页面优化、外链建设' },
      { slug: 'payment-logistics', title: '支付与物流', desc: '支付网关、物流渠道、退换货处理' },
      { slug: 'conversion-rate', title: '转化优化', desc: 'Landing Page、AB 测试、购物车优化' }
    ]
  },
  'networking': {
    title: '网络搭建',
    icon: '🌐',
    description: 'VPS 选择、CDN 配置、安全防护、性能优化加速',
    topics: [
      { slug: 'vps-selection', title: 'VPS 入门', desc: '主流服务商对比、套餐选择、购买流程' },
      { slug: 'dns-setup', title: '域名解析', desc: 'DNS 配置、CNAME/AAAA 记录' },
      { slug: 'ssl-certificate', title: 'SSL 证书', desc: 'Let's Encrypt 免费证书申请与安装' },
      { slug: 'cdn-acceleration', title: 'CDN 加速', desc: 'Cloudflare/阿里云 CDN 配置' },
      { slug: 'security-config', title: '安全配置', desc: '防火墙、Fail2ban、SSH 加固' },
      { slug: 'performance-tuning', title: '性能优化', desc: 'Nginx 调优、缓存策略、数据库优化' }
    ]
  }
}

export default function SectionPage({ params }) {
  const section = sections[params.slug]

  if (!section) {
    return <div>Section not found</div>
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">← 返回首页</Link>
      </header>

      <main>
        <section className={styles.banner}>
          <span className={styles.icon}>{section.icon}</span>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
        </section>

        <section className={styles.grid}>
          {section.topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/${params.slug}/${topic.slug}`}
              className={styles.card}
            >
              <h3>{topic.title}</h3>
              <p>{topic.desc}</p>
              <span className={styles.readMore}>阅读全文 →</span>
            </Link>
          ))}
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 跨境技术学习 | 持续更新</p>
      </footer>
    </div>
  )
}