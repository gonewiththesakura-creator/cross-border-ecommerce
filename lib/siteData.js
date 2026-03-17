export const sections = {
  'tiktok-marketing': {
    title: 'TikTok 运营',
    slug: 'tiktok-marketing',
    icon: '📱',
    color: 'from-pink-500 to-rose-500',
    accent: 'pink',
    description: '聚焦 TikTok 广告投放、内容创作和数据优化，适合跨境电商增长。',
    cover: '/covers/tiktok.svg'
  },
  'independent-store': {
    title: '独立站运营',
    slug: 'independent-store',
    icon: '🛍️',
    color: 'from-sky-500 to-cyan-500',
    accent: 'sky',
    description: '围绕 Shopify / WooCommerce 建站、SEO、转化率优化与增长策略。',
    cover: '/covers/store.svg'
  },
  'networking': {
    title: '网络搭建',
    slug: 'networking',
    icon: '🌐',
    color: 'from-emerald-500 to-teal-500',
    accent: 'emerald',
    description: '涵盖 VPS、SSL、域名解析与基础运维，为跨境业务提供稳定底座。',
    cover: '/covers/network.svg'
  }
}

export const articles = [
  {
    slug: 'getting-started',
    section: 'tiktok-marketing',
    title: 'TikTok Ads 入门指南',
    date: '2024-01-15',
    difficulty: 'beginner',
    readTime: 16,
    tags: ['TikTok', '广告', '入门'],
    excerpt: '从账户类型、开户步骤到 Pixel 安装，带你建立第一套 TikTok 广告基础认知，并避开新手最常见的投放误区。'
  },
  {
    slug: 'ads-basics',
    section: 'tiktok-marketing',
    title: 'TikTok 广告投放基础全流程',
    date: '2024-01-22',
    difficulty: 'intermediate',
    readTime: 18,
    tags: ['TikTok', '广告', 'OCPM', '投放'],
    excerpt: '系统梳理 Campaign / Ad Group / Ad 架构、定向方式、出价逻辑、素材优化与复盘方法。'
  },
  {
    slug: 'platform-comparison',
    section: 'independent-store',
    title: 'Shopify vs WooCommerce：如何选择',
    date: '2024-01-18',
    difficulty: 'intermediate',
    readTime: 17,
    tags: ['独立站', 'Shopify', 'WooCommerce'],
    excerpt: '从成本、自由度、可维护性和增长阶段四个维度，对比两套主流独立站方案，并给出适用场景判断。'
  },
  {
    slug: 'seo-guide',
    section: 'independent-store',
    title: 'WooCommerce SEO 完整优化指南',
    date: '2024-01-25',
    difficulty: 'intermediate',
    readTime: 19,
    tags: ['SEO', 'WooCommerce', 'WordPress'],
    excerpt: '从技术 SEO 到内容策略，整理一套适合跨境独立站的搜索优化实践，兼顾可执行性与长期收益。'
  },
  {
    slug: 'vps-selection',
    section: 'networking',
    title: 'VPS 选购指南：从入门到精通',
    date: '2024-01-20',
    difficulty: 'beginner',
    readTime: 15,
    tags: ['VPS', '服务器', '建站'],
    excerpt: '对比主流 VPS 厂商、配置规格与适用场景，帮你少踩坑地选到合适机器，并理解稳定性背后的关键指标。'
  },
  {
    slug: 'ssl-certificate',
    section: 'networking',
    title: 'Let’s Encrypt 免费 SSL 证书安装指南',
    date: '2024-01-28',
    difficulty: 'intermediate',
    readTime: 16,
    tags: ['SSL', 'HTTPS', 'Nginx'],
    excerpt: '从 Certbot 安装、Nginx 配置到自动续期，快速完成 HTTPS 上线，并检查常见的混合内容和续期问题。'
  }
]

export function getSectionArticles(sectionSlug) {
  return articles.filter((a) => a.section === sectionSlug)
}

export function getArticle(sectionSlug, articleSlug) {
  return articles.find((a) => a.section === sectionSlug && a.slug === articleSlug)
}

export function getRelatedArticles(sectionSlug, articleSlug, tags = []) {
  return articles
    .filter((a) => !(a.section === sectionSlug && a.slug === articleSlug))
    .map((a) => ({ ...a, score: a.tags.filter((t) => tags.includes(t)).length }))
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}
