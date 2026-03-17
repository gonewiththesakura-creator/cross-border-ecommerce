---
title: "Let's Encrypt 免费 SSL 证书安装指南"
date: "2024-01-28"
difficulty: "intermediate"
readTime: 12
tags: ["SSL", "HTTPS", "Nginx", "Let's Encrypt", "安全"]
---

## 为什么需要 SSL？

1. **SEO**: Google 将 HTTPS 作为排名因素
2. **用户信任**: 浏览器显示"不安全"警告会流失 30%+ 用户
3. **功能必备**: Payment Gateway, Progressive Web App 等现代 API 要求 HTTPS
4. **成本**: Let's Encrypt 完全免费，自动化续期

## Let's Encrypt 简介

- CA: 非营利组织，由 Mozilla、Google、Facebook 等赞助
- 证书类型: Domain Validation (DV)，90 天有效期
- 自动化: Certbot 工具自动申请和续期
- 支持: Nginx, Apache, Caddy 等主流 Web Server

## 准备条件

1. **已安装 Web Server** (Nginx/Apache)
2. **域名已解析** 到服务器 IP
   ```
   A 记录: yourdomain.com → 12.34.56.78
   ```
3. **VPS 拥有 root/sudo 权限**
4. **22 端口开放** (SSH) + **80/443 端口开放** (HTTP/HTTPS)

## 安装 Certbot

### Ubuntu/Debian (Nginx)
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

### CentOS/RHEL (Nginx)
```bash
sudo yum install epel-release -y
sudo yum install certbot python3-certbot-nginx -y
```

### 仅手动获取 (不使用 Web Server 插件)
```bash
sudo apt install certbot
```

## 自动化安装 (推荐)

Certbot 可以自动修改 Nginx 配置:

```bash
# 交互式安装
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 多域名
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

**步骤**:
1. 输入邮箱 (用于提醒续期)
2. 同意服务条款
3. 是否订阅邮件 (可选)
4. 选择要自动重定向 HTTP → HTTPS 的域名

安装完成后:
- Nginx 配置自动更新，SSL 已启用
- 自动定时任务 (cron) 每日检查并续期
- 测试: https://yourdomain.com 应显示 🔒

## 手动安装 (理解原理)

如果自动插件不可用，可用 webroot 模式:

```bash
# 1. 确保 Web Server 已启动
sudo systemctl start nginx

# 2. 申请证书
sudo certbot certonly --webroot -w /var/www/html -d yourdomain.com

# 3. 证书文件位置
# 私钥: /etc/letsencrypt/live/yourdomain.com/privkey.pem
# 证书: /etc/letsencrypt/live/yourdomain.com/fullchain.pem
```

## 配置 Nginx

如果 Certbot 未自动修改配置或需要自定义:

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL 证书路径
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL 优化配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # HSTS (可选但推荐)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # 其他配置...
    root /var/www/html;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }
}

# HTTP → HTTPS 强制跳转
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

**重载 Nginx**:
```bash
sudo nginx -t  # 测试配置语法
sudo systemctl reload nginx
```

## 自动续期

Let's Encrypt 证书 90 天过期，Certbot 已自动配置续期。

**手动测试续期**:
```bash
sudo certbot renew --dry-run
```

**查看现有证书**:
```bash
sudo certbot certificates
```

**定时检查** (通常 certbot 安装时已添加):
```bash
# crontab -e
0 0 * * * /usr/bin/certbot renew --quiet
```

## 常见问题

### Q: 申请失败 "Connection refused"
- 80 端口未开放或未监听
- 检查: `sudo ufw status` / `firewall-cmd --list-all`
- 临时关闭防火墙测试: `sudo ufw disable`

### Q: 申请失败 "Domain validation error"
- 域名 A 记录未生效 (等待 DNS 传播)
- Cloudflare 等 CDN 未暂停 proxied 状态
- 使用: `dig yourdomain.com` 确认 IP 正确

### Q: Nginx 重启后 SSL 失效
- 证书文件路径不对
- 再次运行 `sudo certbot --nginx` 修复配置

### Q: 多域名/通配符证书
```bash
# SAN 证书 (多域名)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# 通配符 (需要 DNS 验证)
sudo certbot certonly --manual --preferred-challenges dns -d '*.yourdomain.com'
```

## 安全加固建议

1. **禁用旧协议** (已配置)
2. **使用强密码套件** (已配置)
3. **OCSP Stapling**:
   ```nginx
   ssl_stapling on;
   ssl_stapling_verify on;
   resolver 8.8.8.8;
   ```
4. **TLS 1.3** (已默认)

## 成本对比

| 类型 | 价格/年 | 自动化 | 浏览器信任 |
|------|---------|--------|-----------|
| Let's Encrypt | $0 | ✅ 全自动 | ✅ 所有主流浏览器 |
| 付费 DV SSL | $10-50 | ✅ | ✅ |
| 付费 EV SSL | $100-500 | ✅ | ✅ (显示公司名) |

**对跨境电商独立站**: Let's Encrypt 完全够用，无需付费。

---
🔐 **下一步**: 配置 **Nginx + PHP-FPM + MySQL** 完整 LNMP 环境，为 WooCommerce 做准备。