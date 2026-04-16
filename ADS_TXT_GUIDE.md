# Ads.txt 配置指南

## 什么是 Ads.txt？

Ads.txt (Authorized Digital Sellers) 是一个 IAB (Interactive Advertising Bureau) 技术规范，用于帮助广告发布商声明谁被授权销售他们的数字广告库存。这可以防止广告欺诈。

## 如何获取你的 Ads.txt 代码

### Google AdSense

1. 登录你的 [Google AdSense 账户](https://ads.google.com/home/)
2. 进入 **站点** → **Ads.txt**
3. 复制提供的代码片段
4. 粘贴到 `public/Ads.txt` 文件中

### 其他广告平台

如果你使用其他广告平台（如 Media.net、Ezoic、Amazon Associates 等）：
1. 登录相应的广告平台账户
2. 查找 Ads.txt 设置页面
3. 复制他们提供的代码
4. 添加到 `public/Ads.txt` 文件中

## Ads.txt 文件格式

每行的标准格式：
```
<广告平台域名>, <发布商ID>, <关系类型>, <认证ID>
```

### Google AdSense 示例
```
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
```

### 多个广告平台示例
```
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
media.net, 1234567890, DIRECT, 5d0d3e5c8c1f2f3a
```

## 配置步骤

### 1. 获取你的广告代码
- 登录你的广告平台账户
- 找到 Ads.txt 设置
- 复制提供的代码

### 2. 编辑 Ads.txt 文件

**方法一：在本地编辑（推荐）**
```bash
# 在你的本地项目目录
cd /path/to/calc-master

# 使用文本编辑器打开
notepad public\Ads.txt
# 或者
code public\Ads.txt
```

**方法二：在服务器上编辑**
```bash
# 连接到服务器
ssh root@104.244.88.186

# 进入项目目录
cd /opt/projects/calc-master

# 编辑文件
sudo nano public/Ads.txt
# 或者
sudo vim public/Ads.txt
```

### 3. 粘贴你的广告代码
1. 删除文件中的所有示例内容和注释
2. 粘贴你从广告平台复制的实际代码
3. 保存文件

### 4. 重新部署（如果需要）

如果你是在本地编辑并使用 Git 部署：
```bash
# 提交更改
git add public/Ads.txt
git commit -m "Update ads.txt with my ad code"
git push

# 在服务器上拉取更新
ssh root@104.244.88.186
cd /opt/projects/calc-master
sudo git pull

# 重启容器（如果需要）
sudo docker compose restart
```

## 验证 Ads.txt 是否工作

### 1. 浏览器访问测试
在浏览器中访问：
```
http://calcmasters.org/Ads.txt
```
或者
```
https://calcmasters.org/Ads.txt
```

你应该能看到你配置的广告代码。

### 2. Google AdSense 验证
1. 登录 Google AdSense
2. 进入 **站点** → **Ads.txt**
3. 检查状态，应该显示"已找到"或"已验证"

## 常见问题

### Q: Ads.txt 文件放在哪里？
A: 必须放在网站根目录，即 `public/Ads.txt`，这样访问 `http://你的域名/Ads.txt` 就能找到。

### Q: 我的广告代码格式不对怎么办？
A: 确保完全按照广告平台提供的格式复制，不要修改任何内容。

### Q: 可以同时使用多个广告平台吗？
A: 可以！每行放一个广告平台的代码。

### Q: 修改 Ads.txt 后多久生效？
A: 通常立即生效，但 Google AdSense 可能需要最多 24 小时来验证。

### Q: 我的 Ads.txt 显示 404 错误？
A: 检查文件位置是否正确，应该在 `public/Ads.txt`，并且文件名大小写正确（Ads.txt，不是 ads.txt）。

## 安全提示

- 不要在 Ads.txt 文件中添加任何个人敏感信息
- 只添加你实际使用的广告平台代码
- 定期检查并更新 Ads.txt 文件
- 不要删除广告平台提供的任何认证ID

## 更多资源

- [IAB Ads.txt 规范](https://iabtechlab.com/ads-txt/)
- [Google AdSense Ads.txt 帮助](https://support.google.com/adsense/answer/3467250)
- [Google Ads.txt 验证工具](https://ads.google.com/intl/en_US/home/tools/ads-txt/)
