import { NextApiRequest, NextApiResponse } from 'next'

const allContent = [
  {
    slug: 'tiktok-marketing/getting-started',
    title: 'TikTok Ads 入门指南',
    section: 'tiktok-marketing',
    sectionTitle: 'TikTok 运营',
    excerpt: '了解 TikTok Ads 的基本概念、账户类型、开通步骤和首次设置。',
    tags: ['TikTok', '广告', '入门'],
    difficulty: 'beginner',
    readTime: 8,
    color: 'from-pink-500 to-rose-500'
  },
  {
    slug: 'tiktok-marketing/ads-basics',
    title: 'TikTok 广告投放基础全流程',
    section: 'tiktok-marketing',
    sectionTitle: 'TikTok 运营',
    excerpt: '深入理解 TikTok 广告账户架构、定向策略、出价方式和创意素材最佳实践。',
    tags: ['TikTok', '广告', '投放', 'OCPM', 'CPA'],
    difficulty: 'intermediate',
    readTime: 15,
    color: 'from-pink-500 to-rose-500'
  },
  {
    slug: 'independent-store/platform-comparison',
    title: 'Shopify vs WooCommerce: 如何选择',
    section: 'independent-store',
    sectionTitle: '独立站运营',
    excerpt: '全面对比两大独立站平台的优缺点、成本和适用场景，帮你做出明智选择。',
    tags: ['独立站', 'Shopify', 'WooCommerce', '平台对比'],
    difficulty: 'intermediate',
    readTime: 12,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    slug: 'independent-store/seo-guide',
    title: 'WooCommerce SEO 完整优化指南',
    section: 'independent-store',
    sectionTitle: '独立站运营',
    excerpt: '从技术 SEO 到内容策略，全方位提升 WooCommerce 独立站的搜索排名。',
    tags: ['SEO', 'WooCommerce', '独立站', 'WordPress'],
    difficulty: 'intermediate',
    readTime: 14,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    slug: 'networking/vps-selection',
    title: 'VPS 选购指南：从入门到精通',
    section: 'networking',
    sectionTitle: '网络搭建',
    excerpt: '对比主流 VPS 厂商，详解配置参数，手把手教你购买和 SSH 连接。',
    tags: ['VPS', '服务器', '建站', 'Linode', 'Vultr', 'DigitalOcean'],
    difficulty: 'beginner',
    readTime: 10,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    slug: 'networking/ssl-certificate',
    title: "Let's Encrypt 免费 SSL 证书安装指南",
    section: 'networking',
    sectionTitle: '网络搭建',
    excerpt: '使用 Certbot 工具自动申请和安装免费 SSL 证书，配置 HTTPS 自动续期。',
    tags: ['SSL', 'HTTPS', "Let's Encrypt", '安全', 'Nginx'],
    difficulty: 'intermediate',
    readTime: 12,
    color: 'from-emerald-500 to-teal-500'
  }
]

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { q } = req.query

  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Query parameter q is required' })
  }

  const query = q.toLowerCase().trim()
  
  const results = allContent.filter(item => 
    item.title.toLowerCase().includes(query) ||
    item.excerpt.toLowerCase().include(query) ||
    item.tags.some(tag => tag.toLowerCase().includes(query)) ||
    item.sectionTitle.toLowerCase().includes(query)
  )

  res.status(200).json({
    query: q,
    total: results.length,
    results
  })
}