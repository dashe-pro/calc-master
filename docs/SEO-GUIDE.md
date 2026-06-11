# SEO 提交流程指南

## 一、Google Search Console

1. 访问 https://search.google.com/search-console
2. 用 Google 账号登录
3. 添加资源 → 网址前缀 → 输入 `https://calcmasters.org`
4. 验证方式：HTML 标签（已配置在 layout.tsx 的 `metadata.verification.google` 中）
5. 验证通过后 → **提交 Sitemap**: `https://calcmasters.org/sitemap.xml`

## 二、Baidu 站长平台（国内流量关键）

### 1. 注册验证
1. 访问 https://ziyuan.baidu.com/
2. 注册/登录百度账号
3. 添加站点 → `calcmasters.org`
4. 验证方式选择 "HTML 标签验证"
5. 把百度给的验证码填入 `src/app/layout.tsx` 的 `verification` 中：
   ```ts
   verification: {
     google: 'ca-pub-3329053918048012',
     baidu: '你的百度验证码',  // ← 加这一行
   },
   ```
6. 部署后点击"完成验证"

### 2. 提交 Sitemap
1. 百度站长 → 数据引入 → 链接提交
2. Sitemap 地址: `https://calcmasters.org/sitemap.xml`

### 3. 主动推送（自动收录）
```bash
# 在项目目录运行
BAIDU_TOKEN=你的百度Token node scripts/baidu-push.mjs

# Token 获取: 百度站长 → 数据引入 → 链接提交 → 自动推送
```

### 4. 设置定时推送 (crontab)
```bash
# 在服务器上设置每天推送一次
0 3 * * * cd /opt/projects/calc-master && BAIDU_TOKEN=xxx node scripts/baidu-push.mjs
```

## 三、Bing Webmaster（微软搜索）

1. 访问 https://www.bing.com/webmasters/
2. 用 Microsoft/GitHub/Google 账号登录
3. 添加站点 → `https://calcmasters.org`
4. 验证后提交 Sitemap
5. API 推送:
```bash
BING_KEY=你的BingAPIKey node scripts/baidu-push.mjs
```

## 四、其他搜索引擎

### 搜狗 (Sogou)
- https://zhanzhang.sogou.com/
- 提交站点 + Sitemap

### 360 搜索
- https://zhanzhang.so.com/
- 提交站点

### 神马 (UC/阿里)
- https://zhanzhang.sm.cn/
- 移动端搜索流量

## 五、提升收录速度的技巧

1. **页面内容质量**：每个工具页加 200+ 文字说明（目前过于简洁）
2. **内链优化**：相关工具互相链接（底部加"相关推荐"区域）
3. **更新频率**：GitHub 有更新时自动推送
4. **结构化数据**：已配置 JSON-LD，有助于展示富文本结果
5. **加载速度**：保持页面加载 < 3 秒

## 六、外链建设

短期快速见效：
- 在 GitHub README 中加链接
- 在知乎/CSDN/掘金发一篇工具介绍文章
- Reddit / Twitter / ProductHunt 发布
- 回答 Quora/知乎上相关问题

## 七、检查网站是否被收录

```
# Google
site:calcmasters.org

# Baidu  （国内）
site:calcmasters.org

# Bing
site:calcmasters.org
```

在浏览器搜索框输入上述命令即可查看收录情况。
