# 📚 跨境技术学习平台 (Cross-Border Ecommerce Learning Platform)

专业的跨境电商技术知识库，涵盖 **TikTok 运营**、**独立站建设**、**网络架构**三大核心板块。

## ✨ 特性

- 🎨 **精美 UI** - 现代化设计，支持暗黑模式，响应式布局
- 🔍 **智能搜索** - 基于 Tavily API 的全文搜索
- 📱 **移动友好** - 完美适配手机、平板、桌面
- 📊 **Google Analytics** - 内置流量追踪
- 🏷️ **难度标签** - 入门/进阶/高级分类
- ⏱️ **阅读时间** - 预估每篇文章阅读时长
- 🔗 **相关推荐** - 文章底部智能推荐相关内容
- 🌐 **国际化准备** - 多语言支持架构

## 🚀 快速开始

### 克隆仓库
```bash
git clone https://github.com/gonewiththesakura-creator/cross-border-ecommerce.git
cd cross-border-ecommerce
```

### 安装依赖
```bash
npm install
```

### 本地开发
```bash
npm run dev
```
打开 http://localhost:3000

### 构建生产版本
```bash
npm run build
npm start
```

## 🔧 配置

### 环境变量

复制 `.env.example` 到 `.env.local` 并填写：

```bash
cp .env.example .env.local
```

必需变量：
- `NEXT_PUBLIC_GA_ID` - Google Analytics 4 的测量 ID (可选)
- `TAVILY_API_KEY` - Tavily 搜索 API key (可从 https://tavily.com 获取)

### Google Analytics

1. 访问 https://analytics.google.com
2. 创建 GA4 媒体资源
3. 获取测量 ID (格式: `G-XXXXXXXXXX`)
4. 填入 `.env.local` 中的 `NEXT_PUBLIC_GA_ID`

### Tavily Search API

1. 注册 https://tavily.com
2. 获取 API key
3. 填入 `.env.local` 中的 `TAVILY_API_KEY`

## 📁 项目结构

```
cross-border-ecommerce/
├── pages/
│   ├── index.js              # 首页
│   ├── [slug].js             # 板块页 (tiktok-marketing, independent-store, networking)
│   ├── [slug]/[article].js  # 文章详情页
│   ├── search.js            # 搜索页面
│   └── api/
│       └── search/
│           ├── index.js     # Tavily API 代理
│           └── local.js     # 本地内容搜索
├── components/
│   ├── ArticleContent.js    # Markdown 内容渲染组件
│   └── Analytics.js         # Google Analytics 组件
├── styles/
│   ├── globals.css          # 全局样式 + Tailwind 配置
│   ├── Home.module.css      # 首页样式
│   ├── Section.module.css   # 板块页样式
│   └── Article.module.css   # 文章页样式
├── content/                  # Markdown 文章目录
│   ├── tiktok-marketing/
│   ├── independent-store/
│   └── networking/
├── public/                   # 静态资源
├── package.json
├── tailwind.config.js        # Tailwind CSS 配置
├── next.config.js           # Next.js 配置
└── .env.example            # 环境变量示例

## 📖 内容板块

### 1. TikTok 运营 📱
- [入门指南](content/tiktok-marketing/getting-started.md)
- [广告投放基础](content/tiktok-marketing/ads-basics.md)
- 内容创作
- 数据分析
- 算法机制
- 高级投放技巧

### 2. 独立站运营 🏪
- [平台选择对比](content/independent-store/platform-comparison.md)
- [SEO 优化指南](content/independent-store/seo-guide.md)
- Shopify/WooCommerce 搭建
- 选品策略
- 支付物流
- 转化优化

### 3. 网络搭建 🌐
- [VPS 选购指南](content/networking/vps-selection.md)
- [SSL 证书安装](content/networking/ssl-certificate.md)
- 域名解析
- CDN 加速
- 安全配置
- 性能优化

## 🎨 UI 设计

- **渐变色彩**: 使用 Tailwind 渐变功能
- **卡片设计**: 圆角 + 阴影 + 悬停效果
- **排版**: Inter (UI) + Merriweather (文章)
- **图标**: Lucide React
- **暗黑模式**: 完整支持

## 🔍 搜索功能

- **本地搜索**: 快速搜索站内文章标题、标签、摘要
- **网络搜索**: 通过 Tavily API 搜索全网相关内容
- **热门搜索**: 一键搜索常见关键词
- **实时结果**: 毫秒级响应

## 📊 分析与监控

- **Google Analytics 4**: 页面浏览、用户行为追踪
- **性能监控**: Next.js 内置性能指标
- **错误追踪**: 生产环境错误报告

## 🚀 部署

### Vercel (推荐)
```bash
# 连接 GitHub 仓库
# 自动部署，支持 Preview URLs

vercel --prod
```

### Netlify
```bash
netlify deploy --prod --dir=.next
```

### 自托管
```bash
npm run build
npm start
# 访问 http://your-server:3000
```

## 🔮 后续计划

- [ ] 添加评论系统 (Giscus)
- [ ] RSS 订阅支持
- [ ] 多语言国际化
- [ ] 用户登录与进度追踪
- [ ] 邮件订阅更新通知
- [ ] 更多实战课程内容

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT

---

💡 **提示**: 本项目为跨境电商技术学习平台，所有内容基于实战经验总结，持续更新中。