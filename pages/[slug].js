import Link from 'next/link'
import { ArrowRight, Clock, Tag, Search, Filter } from 'lucide-react'

export default function SectionPage({ params }) {
  const sections = {
    'tiktok-marketing': {
      title: 'TikTok 运营',
      slug: 'tiktok-marketing',
      description: '从零开始学习 TikTok 广告投放、内容创作、账号运营与数据分析',
      icon: '📱',
      color: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10',
      topics: [
        { slug: 'getting-started', title: '入门指南', difficulty: 'beginner', duration: 8, tags: ['TikTok', '广告', '入门'] },
        { slug: 'ads-basics', title: '广告投放基础', difficulty: 'intermediate', duration: 15, tags: ['TikTok', '广告', '投放', 'OCPM', 'CPA'] },
        { slug: 'content-creation', title: '内容创作', difficulty: 'intermediate', duration: 12, tags: ['TikTok', '内容', '脚本', '短视频'] },
        { slug: 'advanced-ads', title: '高级投放技巧', difficulty: 'advanced', duration: 20, tags: ['TikTok', '高级', 'ROI', 'A/B测试'] },
        { slug: 'analytics', title: '数据分析', difficulty: 'intermediate', duration: 10, tags: ['TikTok', '数据', '分析', '报表'] },
        { slug: 'algorithm', title: '算法机制', difficulty: 'advanced', duration: 15, tags: ['TikTok', '算法', '推荐', '流量池'] }
      ]
    },
    'independent-store': {
      title: '独立站运营',
      slug: 'independent-store',
      description: 'Shopify/WooCommerce 搭建、选品策略、SEO 优化、支付物流、转化率提升全流程',
      icon: '🏪',
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10',
      topics: [
        { slug: 'platform-comparison', title: '平台选择', difficulty: 'intermediate', duration: 12, tags: ['独立站', 'Shopify', 'WooCommerce', '对比'] },
        { slug: 'store-setup', title: '店铺搭建', difficulty: 'beginner', duration: 18, tags: ['独立站', '搭建', '配置'] },
        { slug: 'product-selection', title: '选品策略', difficulty: 'intermediate', duration: 15, tags: ['选品', '供应链', '市场调研'] },
        { slug: 'seo-guide', title: 'SEO 优化', difficulty: 'intermediate', duration: 14, tags: ['SEO', '独立站', '优化', '关键词'] },
        { slug: 'payment-logistics', title: '支付与物流', difficulty: 'intermediate', duration: 12, tags: ['支付', '物流', '跨境'] },
        { slug: 'conversion-rate', title: '转化优化', difficulty: 'advanced', duration: 16, tags: ['转化率', '优化', 'AB测试'] }
      ]
    },
    'networking': {
      title: '网络搭建',
      slug: 'networking',
      description: 'VPS 选择、CDN 配置、SSL 证书、安全防护、性能优化，构建稳定高效的服务器架构',
      icon: '🌐',
      color: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10',
      topics: [
        { slug: 'vps-selection', title: 'VPS 入门', difficulty: 'beginner', duration: 10, tags: ['VPS', '服务器', '选购'] },
        { slug: 'dns-setup', title: '域名解析', difficulty: 'beginner', duration: 8, tags: ['DNS', '域名', '解析'] },
        { slug: 'ssl-certificate', title: 'SSL 证书', difficulty: 'intermediate', duration: 12, tags: ['SSL', 'HTTPS', '安全'] },
        { slug: 'cdn-acceleration', title: 'CDN 加速', difficulty: 'intermediate', duration: 14, tags: ['CDN', '加速', 'Cloudflare'] },
        { slug: 'security-config', title: '安全配置', difficulty: 'advanced', duration: 18, tags: ['安全', '防火墙', 'SSH'] },
        { slug: 'performance-tuning', title: '性能优化', difficulty: 'advanced', duration: 20, tags: ['性能', '优化', 'Nginx', '缓存'] }
      ]
    }
  }

  const section = sections[params.slug]

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">404</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">板块不存在</p>
          <Link href="/" className="btn-primary">
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      beginner: { text: '入门', class: 'badge-beginner' },
      intermediate: { text: '进阶', class: 'badge-intermediate' },
      advanced: { text: '高级', class: 'badge-advanced' }
    }
    return badges[difficulty] || badges.beginner
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                <span className="text-white text-xl font-bold">🦀</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">跨境技术学习</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">跨境电商知识库</p>
              </div>
            </Link>

            <nav className="flex items-center space-x-4">
              <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                首页
              </Link>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{section.title}</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className={`relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br ${section.bgGradient}`}>
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className={`absolute top-10 right-10 w-96 h-96 bg-gradient-to-br ${section.color} rounded-full mix-blend-multiply filter blur-3xl`} />
          <div className={`absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-accent-pink to-accent-purple rounded-full mix-blend-multiply filter blur-3xl opacity-30`} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur text-gray-700 dark:text-gray-300 text-sm font-medium mb-6 shadow-sm">
              <Tag className="w-4 h-4 mr-2" />
              {section.topics.length} 个课程 · 持续更新中
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              {section.icon} {section.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              {section.description}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {section.topics.slice(0, 3).map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/${params.slug}/${topic.slug}`}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all group"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {topic.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              全部课程 ({section.topics.length})
            </h2>
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Filter className="w-4 h-4 mr-2" />
                筛选
              </button>
              <button className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Search className="w-4 h-4 mr-2" />
                搜索
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.topics.map((topic) => {
              const difficulty = getDifficultyBadge(topic.difficulty)
              return (
                <Link
                  key={topic.slug}
                  href={`/${params.slug}/${topic.slug}`}
                  className="group card p-6 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <span className={`${difficulty.class} text-xs font-medium`}>
                      {difficulty.text}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {topic.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow text-sm line-clamp-2">
                    {topic.desc}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {topic.duration} 分钟
                      </span>
                    </div>
                    <span className="inline-flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      开始学习
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </div>

                  {topic.tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {topic.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              还有更多课程正在制作中...
            </p>
            <Link href="/" className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:underline">
              ← 返回首页
            </Link>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2024 跨境技术学习 | 基于 Next.js 构建</p>
          </div>
        </div>
      </footer>
    </div>
  )
}