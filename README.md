# 📚 跨境技术学习平台

专业的跨境电商技术知识库,涵盖 TikTok 运营、独立站建设、网络架构等核心领域。

## 🏠 首页预览

```
✓ 响应式设计
✓ 三大板块导航
✓ 现代化 UI
```

## 📂 项目结构

```
cross-border-ecommerce/
├── pages/              # Next.js 页面
│   ├── index.js        # 首页
│   ├── [slug].js       # 板块页
│   └── [slug]/[article].js  # 文章页
├── styles/             # CSS 样式
├── content/            # Markdown 文章
│   ├── tiktok-marketing/
│   ├── independent-store/
│   └── networking/
├── package.json
└── next.config.js
```

## 🚀 快速开始

### 本地运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev
# 打开 http://localhost:3000

# 构建生产版本
npm run build
npm start
```

### 内容管理

在 `content/` 目录下创建 Markdown 文件:

```markdown
---
title: "文章标题"
date: "2024-01-15"
difficulty: "beginner"
readTime: 10
tags: ["标签1", "标签2"]
---

## 文章内容

支持 **Markdown** 语法...
```

## 🌐 部署

### Vercel (推荐)

```bash
# 导入项目
vercel --prod
```

### 其他平台

- Netlify
- Cloudflare Pages
- 自托管 VPS

## 📝 现有内容

### TikTok 运营
- [入门指南](content/tiktok-marketing/getting-started.md)
- [广告投放基础](content/tiktok-marketing/ads-basics.md)

### 独立站运营
- [平台对比](content/independent-store/platform-comparison.md)
- [SEO 优化](content/independent-store/seo-guide.md)

### 网络搭建
- [VPS 选购](content/networking/vps-selection.md)
- [SSL 证书](content/networking/ssl-certificate.md)

## 🛠️ 技术栈

- **Framework**: Next.js 14
- **Styling**: CSS Modules
- **Content**: Markdown + gray-matter
- **Deploy**: Vercel (推荐)

## 📄 License

MIT

---

🎯 **计划**: 持续更新跨境电商实战内容