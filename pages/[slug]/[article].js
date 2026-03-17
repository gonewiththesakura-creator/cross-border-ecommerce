'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  Clock, 
  Tag, 
  Calendar, 
  ArrowLeft, 
  Share2, 
  BookOpen, 
  ChevronRight,
  Search
} from 'lucide-react'
import ArticleContent from '@/components/ArticleContent'

const allArticles = {
  'tiktok-marketing': [
    {
      slug: 'getting-started',
      title: 'TikTok Ads 入门指南',
      date: '2024-01-15',
      difficulty: 'beginner',
      readTime: 8,
      tags: ['TikTok', '广告', '入门'],
      excerpt: '了解 TikTok Ads 的基本概念、账户类型、开通步骤和首设置。'
    },
    {
      slug: 'ads-basics',
      title: 'TikTok 广告投放基础全流程',
      date: '2024-01-22',
      difficulty: 'intermediate',
      readTime: 15,
      tags: ['TikTok', '广告', '投放', 'OCPM', 'CPA'],
      excerpt: '深入理解 TikTok 广告账户架构、定向策略、出价方式和创意素材最佳实践。'
    }
  ],
  'independent-store': [
    {
      slug: 'platform-comparison',
      title: 'Shopify vs WooCommerce: 如何选择',
      date: '2024-01-18',
      difficulty: 'intermediate',
      readTime: 12,
      tags: ['独立站', 'Shopify', 'WooCommerce', '平台对比'],
      excerpt: '全面对比两大独立站平台的优缺点、成本和适用场景，帮你做出明智选择。'
    },
    {
      slug: 'seo-guide',
      title: 'WooCommerce SEO 完整优化指南',
      date: '2024-01-25',
      difficulty: 'intermediate',
      readTime: 14,
      tags: ['SEO', 'WooCommerce', '独立站', 'WordPress'],
      excerpt: '从技术 SEO 到内容策略，全方位提升 WooCommerce 独立站的搜索排名。'
    }
  ],
  'networking': [
    {
      slug: 'vps-selection',
      title: 'VPS 选购指南：从入门到精通',
      date: '2024-01-20',
      difficulty: 'beginner',
      readTime: 10,
      tags: ['VPS', '服务器', '建站', 'Linode', 'Vultr', 'DigitalOcean'],
      excerpt: '对比主流 VPS 厂商，详解配置参数，手把手教你购买和 SSH 连接。'
    },
    {
      slug: 'ssl-certificate',
      title: "Let's Encrypt 免费 SSL 证书安装指南",
      date: '2024-01-28',
      difficulty: 'intermediate',
      readTime: 12,
      tags: ['SSL', 'HTTPS', 'Nginx', "Let's Encrypt", '安全'],
      excerpt: '使用 Certbot 工具自动申请和安装免费 SSL 证书，配置 HTTPS 自动续期。'
    }
  ]
}

const sectionConfig = {
  'tiktok-marketing': { title: 'TikTok 运营', icon: '📱', color: 'from-pink-500 to-rose-500', bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10' },
  'independent-store': { title: '独立站运营', icon: '🏪', color: 'from-blue-500 to-cyan-500', bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10' },
  'networking': { title: '网络搭建', icon: '🌐', color: 'from-emerald-500 to-teal-500', bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10' }
}

export async function generateStaticParams() {
  const params = []
  for (const section of Object.keys(allArticles)) {
    for (const article of allArticles[section]) {
      params.push({
        slug: section,
        article: article.slug
      })
    }
  }
  return params
}

export default function ArticlePage({ params }) {
  const router = useRouter()
  const section = sectionConfig[params.slug]
  const articles = allArticles[params.slug] || []
  const currentArticle = articles.find(a => a.slug === params.article)
  
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [relatedArticles, setRelatedArticles] = useState([])

  useEffect(() => {
    // Find related articles based on tags
    if (currentArticle) {
      const related = []
      for (const [sec, arts] of Object.entries(allArticles)) {
        for (const art of arts) {
          if (art.slug !== params.article && sec !== params.slug) {
            const sharedTags = art.tags.filter(tag => currentArticle.tags.includes(tag))
            if (sharedTags.length > 0) {
              related.push({ ...art, section: sec, sectionTitle: sectionConfig[sec].title })
            }
          }
        }
      }
      setRelatedArticles(related.slice(0, 3))
    }
  }, [currentArticle, params])

  if (!currentArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-accent-purple bg-clip-text text-transparent">404</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">文章不存在或已被移除</p>
          <Link href="/" className="btn-primary">
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      beginner: { text: '入门', class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800' },
      intermediate: { text: '进阶', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800' },
      advanced: { text: '高级', class: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800' }
    }
    return badges[difficulty] || badges.beginner
  }

  const shareOptions = [
    { name: 'Twitter', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentArticle.title)}&url=${encodeURIComponent(`https://你的域名/${params.slug}/${params.article}`)}` },
    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://你的域名/${params.slug}/${params.article}`)}` },
    { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://你的域名/${params.slug}/${params.article}`)}` },
    { name: 'Copy Link', action: () => { navigator.clipboard.writeText(`https://你的域名/${params.slug}/${params.article}`); setIsShareOpen(false) } }
  ]

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
                <p className="text-xs text-gray-500 dark:text-gray-400">跨境电商知识库</p>
              </div>
            </Link>

            <div className="flex items-center space-x-3">
              <Link 
                href={`/${params.slug}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回 {section.title}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Article Header */}
      <section className={`relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br ${section.bgGradient}`}>
        <div className="absolute inset-0 -z-10">
          <div className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl ${section.color} opacity-5`} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">首页</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/${params.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400">{section.title}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 dark:text-white">{currentArticle.title}</span>
            </nav>

            <div className="text-center mb-8">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getDifficultyBadge(currentArticle.difficulty).class}`}>
                {getDifficultyBadge(currentArticle.difficulty).text}
              </span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                {currentArticle.title}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {currentArticle.excerpt}
              </p>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(currentArticle.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {currentArticle.readTime} 分钟阅读
                </div>
                <div className="flex items-center space-x-2">
                  {currentArticle.tags.map(tag => (
                    <span key={tag} className="tag text-xs">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-10">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <ArticleContent content={getArticleContent(params.slug, params.article)} />
                  </div>
                </article>

                {/* Share & Next */}
                <div className="mt-8 flex items-center justify-between">
                  <div className="relative">
                    <button
                      onClick={() => setIsShareOpen(!isShareOpen)}
                      className="inline-flex items-center px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      分享文章
                    </button>
                    
                    {isShareOpen && (
                      <div className="absolute top-12 left-0 z-20 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                        {shareOptions.map(option => (
                          <a
                            key={option.name}
                            href={option.url || '#'}
                            onClick={(e) => option.action && (e.preventDefault(), option.action())}
                            target={option.url ? '_blank' : undefined}
                            rel={option.url ? 'noopener noreferrer' : undefined}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {option.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Link
                    href={`/${params.slug}`}
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:underline"
                  >
                    查看 {section.title} 其他课程
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Table of Contents */}
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-primary-500" />
                      目录
                    </h3>
                    <nav className="space-y-2 text-sm">
                      <a href="#introduction" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 py-1">
                        简介
                      </a>
                      <a href="#main-content" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 py-1">
                        主要内容
                      </a>
                      <a href="#summary" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 py-1">
                        总结
                      </a>
                    </nav>
                  </div>

                  {/* Related Articles */}
                  {relatedArticles.length > 0 && (
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Search className="w-5 h-5 mr-2 text-primary-500" />
                        相关文章
                      </h3>
                      <div className="space-y-4">
                        {relatedArticles.map(article => (
                          <Link
                            key={article.slug}
                            href={`/${article.section}/${article.slug}`}
                            className="block group"
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${sectionConfig[article.section].color} flex items-center justify-center flex-shrink-0`}>
                                <span className="text-white text-sm font-bold">
                                  {sectionConfig[article.section].icon}
                                </span>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
                                  {article.title}
                                </h4>
                                <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                  <span>{article.sectionTitle}</span>
                                  <span>·</span>
                                  <span>{article.readTime} min</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="bg-gradient-to-br from-primary-500 to-accent-purple rounded-xl p-6 text-white">
                    <h3 className="font-bold mb-3">继续学习</h3>
                    <p className="text-sm text-primary-100 mb-4">
                      系统的学习路径，掌握跨境电商全链路技术
                    </p>
                    <Link
                      href="/"
                      className="block w-full text-center py-2.5 bg-white/20 backdrop-blur rounded-lg font-medium hover:bg-white/30 transition-colors"
                    >
                      查看完整课程表
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                首页
              </Link>
              <Link href={`/${params.slug}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                {section.title}
              </Link>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                关于我们
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function getArticleContent(section, articleSlug) {
  const contentMap = {
    'tiktok-marketing': {
      'getting-started': `
## 什么是 TikTok Ads？

TikTok Ads 是 TikTok 官方提供的广告投放平台，让你可以在 TikTok 应用中展示广告，触达全球数亿用户。

### 广告账户类型

#### 1. 个人账户
- 适合：个人创业者、小规模测试
- 限制：预算较低，功能受限
- 费用：免费开通

#### 2. 商业账户
- 适合：企业、品牌、代理商
- 功能：完整广告工具、多用户管理
- 费用：免费开通，需要企业资质

### 开通步骤

1. **访问 TikTok Ads 官网**

   打开 https://ads.tiktok.com

2. **选择注册类型**
   - Business Account (推荐)
   - Personal Account

3. **填写基本信息**
   - 邮箱地址
   - 国家/地区
   - 账户名称

### 首次设置

#### 创建广告账户
- 填写企业信息
- 设置时区/货币
- 添加用户权限（如需团队协作）

#### 安装 TikTok Pixel

\`\`\`html
<!-- 在 website 的 <head> 添加 -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}},ttq.instance=function(t){for(var e=0;e<ttq.methods.length;e++){var i=ttq.methods[e];ttq.setAndDefer(ttq,i)}},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('YOUR_PIXEL_ID');
  ttq.page();
}(window, document, 'ttq');
</script>
\`\`\`

### 常见问题

**Q: 个人账户与商业账户有什么区别？**

A: 商业账户支持更多功能，如多用户管理、广告创建工具、更详细的报告等。

**Q: 最低预算是多少？**

A: TikTok Ads 没有最低日预算限制，但建议至少 $50/天 以获取足够数据。

## 总结

完成以上步骤后，你的 TikTok Ads 账户就开通了。接下来可以开始创建第一个广告活动！
      `
    },
    'independent-store': {
      'platform-comparison': `
## 独立站平台概览

选择独立站平台是跨境电商的第一步。主流选择有 Shopify 和 WooCommerce，各有优缺点。

### Shopify 全面评测

**优点：**
- 上手极快，无需技术背景
- 托管式服务，不担心服务器维护
- 应用生态超过 6000 个插件
- 24/7 客服支持

**缺点：**
- 月费较高 ($29-$299/月)
- 交易手续费 0.5%-2%
- 深度定制需要 Liquid 知识
- 数据迁移困难

### WooCommerce 深度解析

**优点：**
- 完全免费，仅支付主机费用
- 完全控制数据和代码
- 无限定制可能性
- SEO 友好度高

**缺点：**
- 需要技术能力维护
- 安全备份需自行负责
- 插件质量参差不齐

## 对比表格

| 特性 | Shopify | WooCommerce |
|------|---------|-------------|
| 月费 | $29+ | 主机 $10-50 |
| 上手难度 | ⭐ 简单 | ⭐⭐⭐ 需要技术 |
| 定制自由 | ⭐⭐ 中等 | ⭐⭐⭐⭐⭐ 完全控制 |
| 安全性 | 托管负责 | 自行负责 |

## 推荐决策路径

**选 Shopify 如果：**
- 你是新手，想快速测试市场
- 不想处理技术问题
- 月预算 $30+ 可以接受

**选 WooCommerce 如果：**
- 有开发能力
- 需要高度定制
- 长期成本控制重要

---
🎯 **行动建议**: 先用 Shopify 14 天免费试用快速上线 MVP。
      `,
      'seo-guide': `
## WooCommerce SEO 为什么重要？

独立站的 70% 以上流量来自搜索引擎。做好 SEO 可以持续带来免费精准流量。

### 技术 SEO 基础

#### 1. 站点速度优化
目标：首屏加载 < 3 秒，Google PageSpeed Score > 80

关键优化：
- 启用缓存插件 (WP Rocket)
- 图片压缩为 WebP
- CDN 加速 (Cloudflare)
- 数据库定期优化
- PHP 升级到 8.0+

#### 2. HTTPS 强制
SSL 证书现在是标配。

#### 3. 结构化数据 (Schema)
WooCommerce 自带 Product Schema，还需补充：
- BreadcrumbList
- Organization

### 页面级优化

#### 产品页
- Title: "{product_name} - 购买 {product_name} | {site_name}"
- Meta Description: "购买 {product_name}，价格 ${price}，{excerpt}，免运费"
- H1 = 产品名(唯一)
- 图片 ALT 包含产品+属性
- 描述≥300字

#### 分类页
- 添加特色图片
- 写 150-300 字符描述
- 分页添加 rel=next/prev

### 内容策略

博客内容是 SEO 的核心：

1. **购买指南** - 评测、对比
2. **解决方案** - 如何做、常见问题
3. **行业资讯** - 趋势分析
4. **使用教程** - 教程、技巧

**关键词研究：**
- 工具：Google Keyword Planner, Ubersuggest
- 选商业意图词，长尾词优先

### 30 天优化清单

- [ ] 安装 Yoast SEO / Rank Math
- [ ] 配置 robots.txt 和 sitemap.xml
- [ ] 添加 Google Search Console
- [ ] 压缩所有图片至 WebP
- [ ] 创建 3 篇支柱内容 (1500+ 词)
- [ ] 检查移动端友好性
- [ ] 修复所有 404 链接
      `
    },
    'networking': {
      'vps-selection': `
## 什么是 VPS？

VPS (Virtual Private Server) 虚拟专用服务器，是将一台物理服务器分割成多个虚拟独立服务器的技术。

### 为什么跨境电商需要 VPS？

1. 独立站主机托管
2. 代理服务器访问海外网站
3. 运行 SEO 工具
4. 自动化脚本执行
5. 高速稳定连接

### 主流 VPS 厂商对比

#### DigitalOcean
- **起步价**: $6/月
- **特点**: 界面极简，文档超详细
- **机房**: 全球 15+ 区域

#### Linode
- **起步价**: $5/月
- **特点**: 老牌稳定，支持 IPv6
- **适合**: 长期项目

#### Vultr
- **起步价**: $2.5/月
- **特点**: 价格最低，按小时计费
- **机房**: 全球 30+ 城市

### 核心配置参数

**CPU (vCPU)**
- 1 vCPU: 轻度使用
- 2 vCPU: 中小型电商
- 4+ vCPU: 大型站、高并发

**内存 (RAM)**
- 1-2GB: WordPress 小站
- 4GB: 中型独立站
- 8GB+: 大型数据库

### SSG 推荐

**初学者**: DigitalOcean $6/月
**稳定项目**: Linode $5-10/月
**预算极低**: Vultr $2.5/月

---
🔧 **下一步**: 创建 VPS 后的 LNMP 环境搭建教程
      `,
      'ssl-certificate': `
## 为什么需要 SSL？

1. **SEO**: Google 将 HTTPS 作为排名因素
2. **用户信任**: 浏览器"不安全"警告会流失 30%+ 用户
3. **功能必备**: 支付网关等现代 API 要求 HTTPS
4. **成本**: Let's Encrypt 完全免费

## Let's Encrypt 简介

- CA: 非营利组织，Mozilla、Google 赞助
- 证书: DV 类型，90 天有效期
- 自动化: Certbot 工具
- 支持: Nginx, Apache, Caddy

## 准备条件

1. 已安装 Web Server (Nginx/Apache)
2. 域名已解析到服务器 IP
3. VPS 拥有 root/sudo 权限
4. 80/443 端口开放

## 安装 Certbot

### Ubuntu/Debian
\`\`\`bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
\`\`\`

### 自动化安装
\`\`\`bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
\`\`\`

Certbot 会：
1. 自动修改 Nginx 配置
2. 设置 SSL 证书
3. 配置 HTTP → HTTPS 跳转
4. 添加自动续期定时任务

## 配置 Nginx

\`\`\`nginx
server {
    listen 443 ssl http2;
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    add_header Strict-Transport-Security "max-age=31536000" always;
}
\`\`\`

## 自动续期测试

\`\`\`bash
sudo certbot renew --dry-run
\`\`\`

---
🔐 **建议**: 同时配置 OCSP Stapling 和 HSTS 增强安全
      `
    }
  }

  return contentMap[params.slug]?.[params.article] || '<!-- 内容加载中 -->'
}