import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import ArticleContent from '@/components/ArticleContent'
import { getArticle, getRelatedArticles, sections } from '@/lib/siteData'

export async function getServerSideProps({ params }) {
  return { props: { slug: params?.slug || null, articleSlug: params?.article || null } }
}

export default function ArticlePage({ slug, articleSlug }) {
  const section = sections[slug]
  const article = getArticle(slug, articleSlug)
  const related = useMemo(() => (article ? getRelatedArticles(slug, articleSlug, article.tags) : []), [slug, articleSlug, article])

  if (!section || !article) {
    return <div className="min-h-screen grid place-items-center bg-slate-950 text-white"><Link href="/">返回首页</Link></div>
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,.16),transparent_22%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]" />

      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href={`/${slug}`} className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"><ArrowLeft className="h-4 w-4" /> 返回 {section.title}</Link>
          <Link href="/search" className="text-sm text-slate-400 hover:text-white">搜索</Link>
        </div>
      </header>

      <main className="container py-10 lg:py-14">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <img src={section.cover} alt={section.title} className="h-64 w-full rounded-[28px] border border-white/10 object-cover shadow-2xl shadow-black/20 md:h-80" />

            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 md:p-10">
              <div className="text-sm text-sky-300">{section.title}</div>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl">{article.title}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{article.excerpt}</p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> {article.date}</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {article.readTime} 分钟阅读</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{article.difficulty}</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">#{tag}</span>)}
              </div>

              <div className="article-shell mt-10 rounded-[24px] bg-slate-950/70 p-6 md:p-8">
                <ArticleContent content={getArticleContent(slug, articleSlug)} />
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
              <div className="text-sm text-slate-400">栏目</div>
              <div className="mt-2 text-2xl font-semibold text-white">{section.title}</div>
              <p className="mt-3 text-sm leading-7 text-slate-300">{section.description}</p>
              <Link href={`/${slug}`} className="mt-5 inline-flex text-sm font-medium text-sky-300 hover:text-sky-200">查看全部文章</Link>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
              <div className="text-sm font-medium text-white">相关文章</div>
              <div className="mt-4 space-y-4">
                {related.length ? related.map((item) => (
                  <Link key={`${item.section}-${item.slug}`} href={`/${item.section}/${item.slug}`} className="block rounded-2xl border border-white/10 bg-black/10 p-4 hover:border-white/20">
                    <div className="text-xs text-slate-400">{sections[item.section].title}</div>
                    <div className="mt-1 text-sm font-medium text-white">{item.title}</div>
                    <div className="mt-2 text-xs text-slate-400">{item.readTime} min</div>
                  </Link>
                )) : <div className="text-sm text-slate-400">暂时没有更相关的文章。</div>}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function getArticleContent(section, articleSlug) {
  const contentMap = {
    'tiktok-marketing': {
      'getting-started': `
## 什么是 TikTok Ads？

TikTok Ads 是 TikTok 官方广告平台，适合跨境品牌做冷启动、测品和规模化投放。

### 你先要搞清楚的三件事
- 账户是拿来投放，不是拿来“养神号”
- Pixel / 事件追踪必须尽早接
- 前期不是追 ROAS 神话，而是先跑出稳定信号

### 账户类型
#### 1. 个人账户
适合测试，但权限和稳定性通常不如商业账户。

#### 2. 商业账户
更适合长期做跨境业务，便于团队协作与数据追踪。

### 基础起步流程
1. 注册 TikTok Ads 账户
2. 绑定企业信息与支付方式
3. 安装 Pixel
4. 先从简单转化目标开始

### 初学者建议
- 不要一开始就开太多广告组
- 不要素材一条都没跑明白就急着扩量
- 每次改动只改一个变量，方便判断因果

## 小结
把账户、事件和基础结构搭好，后面优化才有意义。`,
      'ads-basics': `
## 广告投放基础全流程

TikTok 广告不是拍脑袋烧钱，核心是 **结构、素材、定向、出价、复盘**。

### 投放结构
- Campaign：定义目标
- Ad Group：定义受众、预算、版位
- Ad：定义素材和文案

### 受众建议
前期不要定太窄，尤其在数据还没积累时。你要先让系统有学习空间。

### 出价建议
- 新手优先使用平台推荐策略
- 不要频繁大幅调价
- 观察周期至少 24~48 小时

### 素材建议
前 3 秒必须抓人。用户不是在“学习”，而是在刷内容。

### 复盘重点
- CTR 是否过低
- CPC 是否异常
- 落地页是否掉转化
- 素材是否疲劳

## 小结
稳定的投放流程，比偶发的一次爆单更重要。`
    },
    'independent-store': {
      'platform-comparison': `
## Shopify vs WooCommerce

这不是“谁更强”，而是“谁更适合你当前阶段”。

### Shopify 适合谁
- 希望快速上线
- 不想碰服务器和维护
- 更在意效率而不是绝对控制权

### WooCommerce 适合谁
- 有技术能力
- 想要更强可定制性
- 愿意自己维护站点性能与安全

### 决策逻辑
如果你还在验证产品和市场，Shopify 往往更合适；如果你已经有明确业务形态并需要更深定制，WooCommerce 更灵活。

## 小结
先按阶段选，不要一开始就追求“终极方案”。`,
      'seo-guide': `
## WooCommerce SEO 完整优化指南

独立站 SEO 的核心，不是堆关键词，而是把 **技术底座、页面结构、内容质量** 做扎实。

### 技术层
- 保证速度
- 保证移动端体验
- 保证 HTTPS 与规范化 URL

### 页面层
- 类目页别空着
- 产品页要有独特描述
- 标题和描述要带明确购买意图

### 内容层
- 用博客做长尾流量
- 把购买指南、对比、常见问题做成内容资产

## 小结
SEO 是慢变量，但对独立站是最值钱的长期资产之一。`
    },
    'networking': {
      'vps-selection': `
## VPS 选购指南

跨境业务不一定要买最贵的机器，但一定要买对。

### 看什么
- 机房位置
- 网络质量
- CPU 与内存配置
- 稳定性和售后

### 常见选择
- DigitalOcean：文档友好
- Vultr：节点多，适合灵活测试
- Linode：老牌稳定

### 实用建议
如果只是起步，先买小规格，把监控和备份做好，比一开始堆配置更重要。

## 小结
先够用，再升级。`,
      'ssl-certificate': `
## Let’s Encrypt 免费 SSL 证书安装

对独立站来说，HTTPS 不是加分项，是基础项。

### 标准流程
1. 域名先解析到服务器
2. 安装 certbot
3. 申请证书
4. 配置 Nginx
5. 设置自动续期

### 你真正要检查的
- 浏览器是否完整绿锁
- 是否有混合内容警告
- 续期是否可用

## 小结
SSL 装完不等于结束，续期和站点资源引用也要一起检查。`
    }
  }

  return contentMap[section]?.[articleSlug] || '内容整理中。'
}
