#!/usr/bin/env node

/**
 * Baidu URL 主动推送脚本
 * 用法:
 *   BAIDU_TOKEN=your_token node scripts/baidu-push.mjs
 *   BAIDU_TOKEN=your_token BING_KEY=your_key node scripts/baidu-push.mjs
 *
 * 获取 Baidu Token: https://ziyuan.baidu.com/linksubmit/
 * 获取 Bing API Key: https://www.bing.com/webmasters/
 */

const BASE_URL = process.env.SITE_URL || 'https://calcmasters.org'

// 所有页面路径
const routes = [
  // 首页
  '',
  '/privacy',
  // 换算器
  ...['length', 'weight', 'temperature', 'area', 'data', 'currency', 'time']
    .map((c) => `/converters/${c}`),
  // 计算器
  ...['mortgage', 'bmi', 'discount', 'tip', 'compound', 'date', 'due-date', 'baby-growth', 'percentage', 'age', 'random-number']
    .map((c) => `/calculators/${c}`),
  // 开发者工具
  ...['json-formatter', 'timestamp-converter', 'base64-encoder', 'url-encoder', 'regex-tester', 'code-formatter', 'text-diff', 'qr-generator', 'password-generator', 'color-converter']
    .map((t) => `/dev-tools/${t}`),
]

const urls = routes.map((r) => `${BASE_URL}${r}`)

async function pushToBaidu(token) {
  const api = `http://data.zz.baidu.com/urls?site=${new URL(BASE_URL).hostname}&token=${token}`
  console.log(`\n📤 推送 ${urls.length} 个 URL 到 Baidu...`)
  try {
    const res = await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: urls.join('\n'),
    })
    const data = await res.json()
    console.log('✅ Baidu 响应:', JSON.stringify(data, null, 2))
    if (data.success) {
      console.log(`   成功: ${data.success}, 今日剩余: ${data.remain}`)
    }
  } catch (e) {
    console.error('❌ Baidu 推送失败:', e.message)
  }
}

async function pushToBing(apiKey) {
  const api = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${apiKey}`
  console.log(`\n📤 推送 ${urls.length} 个 URL 到 Bing...`)
  try {
    const res = await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siteUrl: BASE_URL,
        urlList: urls,
      }),
    })
    const data = await res.json()
    console.log('✅ Bing 响应:', JSON.stringify(data, null, 2))
  } catch (e) {
    console.error('❌ Bing 推送失败:', e.message)
  }
}

async function pushToGoogleIndexing() {
  // Google 不支持主动推送 API（需要 Google Indexing API + OAuth，较复杂）
  // 替代方案：确保 sitemap.xml 在 Search Console 中已提交
  console.log(`\n💡 Google: 请在 Search Console 中提交 sitemap: ${BASE_URL}/sitemap.xml`)
}

// Main
async function main() {
  console.log(`🔗 站点: ${BASE_URL}`)
  console.log(`📄 共 ${urls.length} 个页面`)

  const baiduToken = process.env.BAIDU_TOKEN
  const bingKey = process.env.BING_KEY

  if (baiduToken) await pushToBaidu(baiduToken)
  else console.log('⚠️  跳过 Baidu: 未设置 BAIDU_TOKEN')

  if (bingKey) await pushToBing(bingKey)
  else console.log('⚠️  跳过 Bing: 未设置 BING_KEY')

  await pushToGoogleIndexing()
  console.log('\n✨ 完成!')
}

main()
