---
title: "TikTok Ads 入门指南"
date: "2024-01-15"
difficulty: "beginner"
readTime: 8
tags: ["TikTok", "广告", "入门"]
---

## 什么是 TikTok Ads？

TikTok Ads 是 TikTok 官方提供的广告投放平台，让你可以在 TikTok 应用中展示广告，触达全球数亿用户。

## 广告账户类型

### 1. 个人账户
- 适合：个人创业者、小规模测试
- 限制：预算较低，功能受限
- 费用：免费开通

### 2. 商业账户
- 适合：企业、品牌、代理商
- 功能：完整广告工具、多用户管理
- 费用：免费开通，需要企业资质

## 开通步骤

1. **访问 TikTok Ads 官网**
   打开 https://ads.tiktok.com

2. **选择注册类型**
   - Business Account (推荐)
   - Personal Account

3. **填写基本信息**
   - 邮箱地址
   - 国家/地区
   - 账户名称

4. **实名认证**
   - 个人账户：身份证/护照
   - 企业账户：营业执照

5. **绑定支付方式**
   - 信用卡/借记卡
   - 预付充值

## 首次设置

### 创建广告账户
- 填写企业信息
- 设置时区/货币
- 添加用户权限（如需团队协作）

### 安装 TikTok Pixel
```html
<!-- 在 website 的 <head> 添加 -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}},ttq.instance=function(t){for(var e=0;e<ttq.methods.length;e++){var i=ttq.methods[e];ttq.setAndDefer(ttq,i)}},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('YOUR_PIXEL_ID');
  ttq.page();
}(window, document, 'ttq');
</script>
```

## 常见问题

### Q: 个人账户与商业账户有什么区别？
A: 商业账户支持更多功能，如多用户管理、广告创建工具、更详细的报告等。

### Q: 最低预算是多少？
A: TikTok Ads 没有最低日预算限制，但建议至少 $50/天 以获取足够数据。

### Q: 如何选择国家投放？
A: 根据你的产品定价和目标用户群体选择。英语国家单价较高，东南亚国家流量大成本低。

---
💡 **提示**: 更多高级功能将在后续章节详细讲解。