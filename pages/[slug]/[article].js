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
  if (!section || !article) return <div className="min-h-screen grid place-items-center"><Link href="/">返回首页</Link></div>

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#f5f5f7]/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href={`/${slug}`} className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-950"><ArrowLeft className="h-4 w-4" /> 返回 {section.title}</Link>
          <Link href="/search" className="text-sm text-slate-600 hover:text-slate-950">搜索</Link>
        </div>
      </header>

      <main className="container py-12">
        <div className="mx-auto max-w-6xl">
          <img src={section.cover} alt={section.title} className="h-64 w-full rounded-[32px] border border-black/[0.06] object-cover shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:h-96" />

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article className="soft-card p-8 md:p-12">
              <div className="text-sm uppercase tracking-[0.18em] text-slate-500">{section.title}</div>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] md:text-6xl">{article.title}</h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-600">{article.excerpt}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> {article.date}</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {article.readTime} 分钟阅读</span>
                <span className="pill">{article.difficulty}</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => <span key={tag} className="pill">#{tag}</span>)}
              </div>

              <div className="mt-12 rounded-[32px] border border-black/[0.06] bg-[#fbfbfd] px-7 py-8 md:px-12 md:py-12">
                <ArticleContent content={getArticleContent(slug, articleSlug)} />
              </div>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="soft-card p-6">
                <div className="text-sm uppercase tracking-[0.16em] text-slate-500">About</div>
                <div className="mt-3 text-2xl font-semibold">{section.title}</div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{section.description}</p>
              </div>
              <div className="soft-card p-6">
                <div className="text-sm uppercase tracking-[0.16em] text-slate-500">Related</div>
                <div className="mt-4 space-y-4">
                  {related.length ? related.map((item) => (
                    <Link key={`${item.section}-${item.slug}`} href={`/${item.section}/${item.slug}`} className="block rounded-[20px] border border-black/[0.06] bg-[#fbfbfd] p-4 transition hover:bg-white hover:shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                      <div className="text-xs text-slate-500">{sections[item.section].title}</div>
                      <div className="mt-2 text-[15px] font-medium leading-6 text-slate-900">{item.title}</div>
                      <div className="mt-2 text-xs text-slate-500">{item.readTime} min</div>
                    </Link>
                  )) : <div className="text-sm text-slate-500">暂时没有更相关的文章。</div>}
                </div>
              </div>
            </aside>
          </div>
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

TikTok Ads 是 TikTok 官方广告平台，最适合做的不是“幻想一夜爆单”，而是让你在较短时间内验证素材、验证市场和验证转化链路。对跨境业务来说，它最大的价值在于：流量规模足够大、内容形式原生、前期测试速度快。

### 你先要搞清楚的三件事
- 账户是拿来投放的，不是拿来“养神号”的
- Pixel 和事件追踪必须尽早接，否则后期根本没法优化
- 前期目标不是追神级 ROAS，而是先跑出可复制的正反馈

![TikTok 投放漏斗示意](/article/tiktok-funnel.svg)

## 为什么很多新手一开始就投崩

新手最容易犯的错误，不是不会点按钮，而是对投放预期完全错误。很多人一开广告就想第一条素材就出单、第一天就把 CPA 压很低、第二天没转化就立刻大改预算和定向。这样做的结果往往是学习期被打断，账户信号越来越乱。

### 正确的起步心态
#### 1. 把账户当测试系统
广告账户的职责，是帮你判断什么素材能抓住注意力、什么受众更容易点击、什么落地页能承接转化，以及什么客单和毛利结构撑得住投放。

#### 2. 把前期预算当买数据
前期花的钱，本质上不是在“买利润”，而是在买判断依据。点击率、加购率、转化率和素材疲劳速度，这些都是后面优化最重要的基础数据。

## 账户类型怎么选

### 个人账户
适合小规模测试，但在权限、稳定性、协作和风控层面通常不如商业账户。对于长期做跨境业务的人来说，个人账户更像临时方案。

### 商业账户
更适合持续运营。它更方便你配置企业信息、管理成员、做归因分析，也更利于后期处理申诉和资料补充。

## 基础起步流程
1. 注册 TikTok Ads 账户
2. 完成企业资料与支付方式绑定
3. 接入 Pixel 与关键事件
4. 先从单一目标出发，例如 View Content / Add To Cart / Purchase
5. 建立简单账户结构，不要一上来就几十个广告组

## Pixel 为什么这么关键

如果你不尽早接 Pixel，你的广告只是在“烧展示和点击”，而不是在为转化学习。TikTok 的系统优化依赖信号，而 Pixel 就是你给平台提供的训练样本。

### 至少先埋哪些事件
- PageView
- ViewContent
- AddToCart
- InitiateCheckout
- Purchase

### 如果没有完整事件会怎样
平台会更难判断：什么人更可能转化、什么素材更适合放量、什么广告组该继续给流量。所以你会发现点击不差，但就是越投越飘。

## 新手起步建议

### 建议一：结构要简单
最开始不要做得太复杂。一个较干净的起步结构通常就够：1 个 Campaign、2~3 个 Ad Group、每组 2~3 条素材。

### 建议二：预算不要太碎
如果预算小到每组都跑不动，系统根本学不到足够信号。你宁愿少开几个组，也不要到处撒一点点预算。

### 建议三：不要频繁乱改
同一个广告组当天大改预算、改定向、改素材、改出价，你最后根本不知道到底是什么导致了结果变化。

## 观察哪些基础指标

### 点击前的指标
- CPM：看流量成本环境
- CTR：看素材和前 3 秒吸引力
- CPC：看点击获取成本

### 点击后的指标
- LPV / ViewContent：看落地页是否承接住
- AddToCart：看产品兴趣是否成立
- Purchase：看真实转化是否形成

### 一个常见判断逻辑
如果 CTR 很低，优先看素材；如果 CTR 不差但加购低，优先看产品页和价格感知；如果加购有但支付低，优先看支付链路、运费和结算体验。

## 小结
把账户、事件和基础结构搭好，后面优化才有意义。对新手来说，最重要的不是“找到神技巧”，而是尽快建立一套能稳定拿到数据、能读懂数据、也能持续迭代的投放起步流程。`,
      'ads-basics': `
## 广告投放基础全流程

TikTok 广告不是拍脑袋烧钱，核心是 **结构、素材、定向、出价、复盘**。如果这五个环节里任何一个是乱的，结果通常不会稳定。真正成熟的投放，不是单次跑出爆量，而是你知道为什么会出结果，也知道怎样复制它。

![TikTok 投放漏斗示意](/article/tiktok-funnel.svg)

## 先把账户结构搭对

### Campaign 层
Campaign 决定的是目标。尽量保持一个 Campaign 只承载一个明确目的：测素材、跑转化、扩量、再营销。

### Ad Group 层
Ad Group 负责定义预算、定向、版位、优化事件和出价方式。这层是最容易搞乱的，很多人一开十几个组，最后根本没法复盘。

### Ad 层
Ad 就是素材本身。你应该把它当作“注意力入口”，不是简单的视频载体。前 3 秒、标题、字幕、开场动作和镜头节奏，都会直接影响 CTR 和后续成本。

## 定向怎么做更合理

### 前期不要定太死
如果你还没积累到足够信号，过窄的定向会带来两个问题：系统可学习的人群太少，以及结果波动大、复盘失真。

### 可以怎么起步
比较稳妥的方法通常是：先做 1 个较宽受众组，再做 1 个兴趣组；如果有站内数据，再加 1 个再营销组。

### 什么情况下该收窄
当你已经知道某个年龄段点击更高、某个地区转化更强、某类兴趣标签确实更有效，这时候再去收窄，才是带着证据优化。

## 出价与预算的基本逻辑

### 不要一天改三次预算
TikTok 的投放系统需要时间学习，你频繁改预算，很容易把学习期打断。更稳的做法是：先让广告跑出一个完整观察周期，再判断是否加预算或停掉。

### 新手阶段适合什么思路
- 预算不要碎片化
- 出价先按平台推荐走
- 以素材和点击表现为第一层筛选
- 以加购与购买为第二层筛选

## 素材为什么决定上限

用户刷 TikTok 时，本质是在娱乐，不是在研究广告。你的视频必须先赢得停留，再谈点击，最后才有可能谈转化。

### 好素材通常具备什么特征
- 前 3 秒有钩子
- 画面主体明确
- 不需要观众花脑力理解
- 卖点直接，不绕
- 有明确场景感

## 复盘时该看什么

### 先看素材层面
如果 CTR 很低，说明用户根本不愿意停下来。那问题通常优先在素材，而不是定向或支付。

### 再看承接层面
如果点击有了，但 ViewContent 或加购低，说明落地页承接出了问题，例如加载慢、价格冲击大、产品信息不清晰。

### 最后看转化层面
如果加购有但购买差，重点要查结账流程、运费税费、支付稳定性和信任组件。

## 小结
稳定的投放流程，比偶发的一次爆单更重要。真正的“基础全流程”，不是学会把广告发出去，而是学会让数据帮助你做判断，然后用判断指导下一轮素材、受众和预算。`
    },
    'independent-store': {
      'platform-comparison': `
## Shopify vs WooCommerce

这不是“谁更强”，而是“谁更适合你当前阶段”。很多人一开始就想选一个“终极平台”，但平台选择本质上是业务阶段选择，而不是信仰选择。

![独立站运营栈](/article/store-stack.svg)

## 先看最本质的区别

### Shopify 的核心优势
Shopify 最大的优势是省心。你不需要花太多精力在服务器、插件兼容、升级风险这些问题上，更适合把时间放在上架商品、跑广告和优化转化上。

### WooCommerce 的核心优势
WooCommerce 的优势是自由度和可控性。你能决定服务器架构、插件组合、SEO 细节、功能扩展方式和数据归属路径。

## 从成本看怎么选

### Shopify 成本结构
表面看简单：订阅费 + 插件费 + 支付费率。优点是好估算，缺点是长期叠加下来往往不低。

### WooCommerce 成本结构
表面看更便宜，但它的成本更分散：主机、域名、主题、插件、运维时间以及可能的开发投入。它不一定绝对更省钱，只是成本形式不同。

## 从运营效率看怎么选

### 你想更快上线
那 Shopify 往往更合适，因为你可以更快完成模板搭建、商品上架、支付物流配置和基础营销工具接入。

### 你想更深度定制
那 WooCommerce 更有优势，尤其是在 SEO 架构、内容营销、多语言深度控制和非标准业务流程方面。

## 从业务阶段判断更靠谱

### 阶段一：快速验证期
如果你还在测产品、测市场、测广告，Shopify 更适合。你需要的是速度，而不是完美控制。

### 阶段二：稳定放量期
如果已经有明确产品线和持续订单，这时就要看你是否开始受到平台限制。若功能、SEO、内容和数据需求越来越复杂，WooCommerce 可能更值得考虑。

### 阶段三：品牌长期经营期
如果目标是长期品牌资产、内容资产和更深的私域沉淀，那么 WooCommerce 的优势会慢慢变大，因为它更适合内容与商城深度结合。

## 小结
先按阶段选，而不是按情绪选。平台只是你当前业务的工具，选对阶段、选对成本结构、选对维护方式，比追求“最强平台”重要得多。`,
      'seo-guide': `
## WooCommerce SEO 完整优化指南

独立站 SEO 的核心，不是堆关键词，而是把 **技术底座、页面结构、内容质量** 做扎实。SEO 看起来慢，但它是少数真正能让独立站长期积累复利的流量资产。

![独立站运营栈](/article/store-stack.svg)

## 技术 SEO 是起点

### 先把速度做对
无论你内容写得多好，如果页面慢，搜索和用户体验都会受损。对 WooCommerce 来说，速度问题常见来源包括：图像太大、插件太多、主题臃肿、缓存没配好、主机太差。

### 移动端优先
跨境独立站很多流量都来自手机。SEO 不只是为了搜索引擎，也是为了让用户点进来以后不立刻退出。

### HTTPS 和规范 URL
HTTPS 不是“可选项”，而是基础配置。URL 也要尽量清晰，避免一串没意义参数影响可读性和分享体验。

## 页面层优化怎么做

### 类目页不能空
很多站点的问题是：类目页只有商品列表，没有描述、没有搜索意图承接。这样的页面很难排名。

### 产品页要有独特内容
不要全部复制供应商文案。产品页要至少讲清楚卖点、使用场景、差异点、常见问题和购买顾虑怎么解决。

### 标题与描述要有购买意图
标题和描述应该帮助用户快速判断：这页是不是他要找的东西，为什么值得点进来。

## 内容策略决定上限

### 博客不是装饰
博客最大的作用，不是“显得你有内容”，而是承接长尾词、问题词、对比词、教程词和购买前研究词。

### 什么内容值得写
- 购买指南
- 产品对比
- 使用教程
- 常见问题
- 场景型内容

### 内容之间要有关联
一篇文章不是孤岛。你要把博客、类目页、产品页连起来，让用户和搜索引擎都能理解你的内容结构。

## 小结
SEO 是慢变量，但对独立站是最值钱的长期资产之一。它不是“写几篇博客就完事”，而是一整套技术、内容和结构协同起来之后，慢慢形成的流量护城河。`
    },
    'networking': {
      'vps-selection': `
## VPS 选购指南

跨境业务不一定要买最贵的机器，但一定要买对。很多网络问题、速度问题和稳定性问题，源头都不是代码，而是基础设施一开始就选错了。

![基础设施检查清单](/article/network-checklist.svg)

## 先理解 VPS 适合干什么

VPS 不是万能药，但它适合承担轻量站点托管、自动化任务、API 服务、中间层部署和基础运维实验环境等职责。

## 选 VPS 时重点看什么

### 1. 机房位置
如果你的用户主要在美国，机器在亚洲可能就会有明显延迟。如果你的业务强依赖某些地区访问速度，机房位置通常比单纯 CPU 型号更重要。

### 2. 网络质量
有些厂商价格便宜，但线路波动大。对跨境业务来说，稳定性比极限跑分更重要。

### 3. CPU 与内存配置
刚起步时不要盲目买大。关键是看你的业务类型：纯内容站更吃 I/O，WooCommerce 更看内存和数据库，自动化脚本更看 CPU 和并发。

### 4. 售后与快照能力
当你误操作、站点崩掉或需要迁移时，快照和恢复能力会非常值钱。

## 常见厂商判断逻辑

### DigitalOcean
文档和生态友好，适合新手，部署体验相对顺滑。

### Vultr
节点多，灵活性高，适合测试不同地区和线路。

### Linode
偏稳定、老牌，适合不想频繁折腾的人。

## 新手怎么买更稳妥

### 不要一开始就追高配
业务没起来之前，很多资源都浪费。比起多买几核 CPU，更重要的是把监控、备份、登录安全和防火墙配好。

### 优先考虑可升级
你真正需要的是一条平滑升级路径，而不是一开始就把预算压在一个可能用不满的套餐上。

## 小结
先够用，再升级。基础设施的正确思路不是“上来就堆最强”，而是让你当前业务稳定、可维护、可扩展。`,
      'ssl-certificate': `
## Let’s Encrypt 免费 SSL 证书安装

对独立站来说，HTTPS 不是加分项，而是基础项。它不仅影响浏览器安全提示，也会影响 SEO、支付、用户信任和整体专业感。

![基础设施检查清单](/article/network-checklist.svg)

## 为什么一定要配 HTTPS

### 用户层面
如果浏览器显示“不安全”，很多用户在还没看内容前就会先失去信任。尤其是跨境电商，支付和表单页面对安全感极其敏感。

### SEO 层面
HTTPS 虽然不是唯一决定排名的因素，但它是基础信号。你不配，往往就先输在最低门槛上。

### 技术层面
很多新浏览器特性、支付能力和第三方服务，都默认要求 HTTPS 环境。

## Let’s Encrypt 为什么够用

它最大的优点是免费、签发快、主流浏览器信任、支持自动续期。对绝大多数内容站和中小型独立站来说完全够用。

## 标准安装流程
1. 域名先解析到服务器
2. 安装 certbot
3. 申请证书
4. 把证书路径接入 Nginx
5. 配置自动续期
6. 最后检查是否真的全站都走 HTTPS

## 最常见的问题不是申请失败，而是配置不完整

### 问题 1：混合内容
你页面已经是 HTTPS，但某些图片、脚本或字体还是 HTTP 地址。这样浏览器依然会警告。

### 问题 2：只配置了主域名
很多人只给 `example.com` 配了证书，忘了 `www.example.com`，结果部分访问路径仍报错。

### 问题 3：续期没有验证
你以为 certbot 装好了就会自动续期，但实际计划任务没跑、权限不对、端口被占，都可能导致证书过期。

## 安装后要检查什么

### 浏览器层面
- 是否显示安全锁
- 是否还有警告
- 是否有资源被阻止

### 服务器层面
- Nginx 配置是否引用了正确证书路径
- 续期脚本是否能正常执行
- 自动续期后是否会 reload 服务

### 页面层面
- 图片、JS、CSS 是否都走 HTTPS
- 跳转规则是否统一
- 是否存在裸域和 www 域混乱情况

## 小结
SSL 装完不等于结束，续期和站点资源引用也要一起检查。对内容站和独立站来说，真正专业的不是“我装了证书”，而是“我能保证它长期稳定地工作”。`
    }
  }
  return contentMap[section]?.[articleSlug] || '内容整理中。'
}
