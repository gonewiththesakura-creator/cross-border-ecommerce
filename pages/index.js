import { useState } from 'react'
import Link from 'next/link'
import { Search, X, ArrowRight, BookOpen, TrendingUp, Globe, Smartphone, Server } from 'lucide-react'
import { useTheme } from 'next-themes'

const sections = {
  'tiktok-marketing': {
    title: 'TikTok 运营',
    slug: 'tiktok-marketing',
    description: '从零开始学习 TikTok 广告投放、内容创作、账号运营与数据分析，掌握短视频营销核心技能',
    icon: Smartphone,
    color: 'from-pink-500 to-rose-500',
    topics: [
      { slug: 'getting-started', title: '入门指南', desc: 'TikTok 账号注册、基础设置、养号技巧', duration: 8, difficulty: 'beginner' },
      { slug: 'ads-basics', title: '广告投放基础', desc: '广告账户开通、预算设置、受众定位、OCPM 出价', duration: 15, difficulty: 'intermediate' },
      { slug: 'content-creation', title: '内容创作', desc: '短视频脚本撰写、拍摄剪辑、热门话题跟进、CTA 设计', duration: 12, difficulty: 'intermediate' },
      { slug: 'advanced-ads', title: '高级投放技巧', desc: 'A/B 测试、ROI 优化、再营销、Lookalike 受众', duration: 20, difficulty: 'advanced' },
      { slug: 'analytics', title: '数据分析', desc: 'TikTok Ads Manager、转化追踪、报表解读、问题诊断', duration: 10, difficulty: 'intermediate' },
      { slug: 'algorithm', title: '算法机制', desc: '推荐逻辑、流量池规则、权重因素、破圈策略', duration: 15, difficulty: 'advanced' }
    ]
  },
  'independent-store': {
    title: '独立站运营',
    slug: 'independent-store',
    description: 'Shopify/WooCommerce 搭建、选品策略、SEO 优化、支付物流、转化率提升全流程',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    topics: [
      { slug: 'platform-comparison', title: '平台选择', desc: 'Shopify vs WooCommerce vs BigCommerce 深度对比', duration: 12, difficulty: 'intermediate' },
      { slug: 'store-setup', title: '店铺搭建', desc: '域名选择、主题安装、基础配置、支付设置', duration: 18, difficulty: 'beginner' },
      { slug: 'product-selection', title: '选品策略', desc: '市场调研、利润计算、供应链管理、爆款挖掘', duration: 15, difficulty: 'intermediate' },
      { slug: 'seo-guide', title: 'SEO 优化', desc: '关键词研究、页面优化、Schema 标记、外链建设', duration: 14, difficulty: 'intermediate' },
      { slug: 'payment-logistics', title: '支付与物流', desc: '支付网关对接、物流渠道选择、关税处理、退换货流程', duration: 12, difficulty: 'intermediate' },
      { slug: 'conversion-rate', title: '转化优化', desc: 'Landing Page 设计、AB 测试、购物车优化、复购策略', duration: 16, difficulty: 'advanced' }
    ]
  },
  'networking': {
    title: '网络搭建',
    slug: 'networking',
    description: 'VPS 选择、CDN 配置、SSL 证书、安全防护、性能优化，构建稳定高效的服务器架构',
    icon: Server,
    color: 'from-emerald-500 to-teal-500',
    topics: [
      { slug: 'vps-selection', title: 'VPS 入门', desc: '主流服务商对比、套餐选择、购买流程、SSH 连接', duration: 10, difficulty: 'beginner' },
      { slug: 'dns-setup', title: '域名解析', desc: 'DNS 配置、A/CNAME/AAAA 记录、CDN 接入', duration: 8, difficulty: 'beginner' },
      { slug: 'ssl-certificate', title: 'SSL 证书', desc: 'Let\'s Encrypt 免费证书申请、Nginx 配置、自动续期', duration: 12, difficulty: 'intermediate' },
      { slug: 'cdn-acceleration', title: 'CDN 加速', desc: 'Cloudflare/阿里云 CDN 配置、缓存策略、性能优化', duration: 14, difficulty: 'intermediate' },
      { slug: 'security-config', title: '安全配置', desc: '防火墙、Fail2ban、SSH 加固、入侵检测', duration: 18, difficulty: 'advanced' },
      { slug: 'performance-tuning', title: '性能优化', desc: 'Nginx 调优、数据库优化、Redis 缓存、负载均衡', duration: 20, difficulty: 'advanced' }
    ]
  }
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const { theme, setTheme } = useTheme()

  const sectionList = Object.values(sections)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">跨境技术学习</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">专业的跨境电商知识库</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Search className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索文章、主题、关键词..."
                className="w-full pl-12 pr-12 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-purple/5 dark:from-gray-900 dark:via-gray-900 dark:to-accent-purple/10 -z-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary-400 to-accent-purple rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float -z-10" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-accent-pink to-accent-purple rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float -z-10" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              持续更新跨境电商实战内容
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gray-900 dark:text-white">掌握跨境电商</span>
              <br />
              <span className="text-gradient">核心技术</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              专业的 TikTok 运营、独立站建设、网络架构知识平台。
              所有内容均为实战经验总结，帮助你快速掌握跨境技术要点，少走弯路。
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#sections" className="btn-primary">
                开始学习
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/tiktok-marketing" className="px-8 py-3 rounded-full border-2 border-gray-300 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                浏览课程
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">核心板块</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">10+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">精选教程</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">30k+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">预计月访问</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">免费</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">永久开放</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section id="sections" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              学习路径 <span className="text-gradient">从零到精通</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              三个核心板块，覆盖跨境电商全链路技术。从入门到进阶，循序渐进。
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectionList.map((section) => {
              const IconComponent = section.icon
              return (
                <div key={section.slug} className="section-card group">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${section.color} mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {section.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                    {section.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {section.topics.slice(0, 4).map((topic) => (
                      <Link
                        key={topic.slug}
                        href={`/${section.slug}/${topic.slug}`}
                        className="flex items-center justify-between group/topic"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary-400 group-hover/topic:bg-primary-600 transition-colors" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover/topic:text-primary-600 dark:group-hover/topic:text-primary-400 transition-colors">
                            {topic.title}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {topic.duration}min
                        </span>
                      </Link>
                    ))}
                  </div>
                  
                  <Link
                    href={`/${section.slug}`}
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium group/btn hover:gap-3 transition-all"
                  >
                    查看全部
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-purple text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            开始你的跨境电商技术之旅
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            无论你是刚入门的新手，还是寻求突破的运营老手，这里都有你需要的实战知识
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tiktok-marketing" className="btn bg-white text-primary-700 hover:bg-gray-100">
              <Smartphone className="w-5 h-5 mr-2" />
              学习 TikTok 运营
            </Link>
            <Link href="/independent-store" className="btn bg-primary-700 text-white hover:bg-primary-800">
              <Globe className="w-5 h-5 mr-2" />
              搭建独立站
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">跨境技术学习</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 持续更新</p>
              </div>
            </div>
            
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                首页
              </Link>
              <Link href="/tiktok-marketing" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                TikTok 运营
              </Link>
              <Link href="/independent-store" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                独立站
              </Link>
              <Link href="/networking" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                网络搭建
              </Link>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            基于 Next.js 构建 | 使用 Tavily 智能搜索 | Google Analytics 追踪
          </div>
        </div>
      </footer>
    </div>
  )
}