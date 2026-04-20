# Cloudflare 521 错误排查指南

## 什么是 521 错误？
- Cloudflare 521 = "Web server is down"
- 意思：Cloudflare 能工作，但**无法连接到你的源服务器**（104.244.88.186）

## 排查步骤（按顺序执行）

---

### 第一步：确认服务器是否在线

```bash
# 1. 尝试 SSH 连接到服务器
ssh root@104.244.88.186

# 如果 SSH 连接失败，说明服务器可能挂了
# 登录搬瓦工控制面板重启服务器
```

---

### 第二步：检查 Docker 容器状态

如果能 SSH 连接：

```bash
# 进入项目目录
cd /opt/projects/calc-master

# 检查容器状态
sudo docker compose ps

# 应该看到两个容器在运行：
# - calc-master
# - nginx-proxy
```

**如果容器没有运行**：
```bash
# 启动容器
sudo docker compose up -d

# 查看日志
sudo docker compose logs -f
```

---

### 第三步：检查容器日志

```bash
# 查看所有服务日志
sudo docker compose logs

# 单独查看应用日志
sudo docker compose logs calc-master

# 单独查看 Nginx 日志
sudo docker compose logs nginx-proxy
```

---

### 第四步：直接测试源服务器（绕过 Cloudflare）

在服务器上执行：

```bash
# 1. 测试 Next.js 应用是否响应
curl http://localhost:3000

# 2. 测试 Nginx 是否响应
curl http://localhost:80

# 3. 测试 ads.txt
curl http://localhost:3000/ads.txt
curl http://localhost/ads.txt
```

如果这些测试都能正常返回内容，说明源服务器没问题，问题在 Cloudflare 配置。

---

### 第五步：检查防火墙

```bash
# 检查 firewalld 状态
sudo systemctl status firewalld

# 如果正在运行，检查规则
sudo firewall-cmd --list-all

# 确保 80 和 443 端口开放
# 如果没有，添加：
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

---

### 第六步：检查 Cloudflare DNS 配置

1. 登录 [Cloudflare 控制面板](https://dash.cloudflare.com/)
2. 进入你的域名 → **DNS**
3. 检查 A 记录：
   - 名称：`@` 或 `calcmasters.org`
   - 内容：`104.244.88.186`
   - 代理状态：🟠 橙色云朵（已代理）或 ⚪ 灰色云朵（仅 DNS）

**临时测试方法**：
- 将代理状态改为 ⚪ 灰色云朵（仅 DNS）
- 等待几分钟，直接访问 `http://calcmasters.org`
- 如果能访问，说明 Cloudflare 代理有问题

---

### 第七步：检查 Cloudflare SSL/TLS 设置

1. Cloudflare → **SSL/TLS**
2. 确保加密模式是：**"Full"** 或 **"Flexible"**
3. 不要选择 "Strict"（除非你服务器上有有效的 SSL 证书）

---

### 快速修复方案

#### 方案一：重启所有服务

```bash
cd /opt/projects/calc-master

# 停止所有容器
sudo docker compose down

# 重新启动
sudo docker compose up -d

# 查看日志
sudo docker compose logs -f
```

#### 方案二：临时关闭 Cloudflare 代理（测试用）

1. Cloudflare DNS 设置
2. 将 `@` 记录改为 ⚪ 灰色云朵（DNS Only）
3. 等待 2-5 分钟
4. 访问 `http://calcmasters.org`
5. 如果能访问，再改回 🟠 橙色云朵

#### 方案三：检查并修复 ads.txt 部署问题

如果是因为重新部署导致的问题：

```bash
# 确认文件在服务器上存在
ls -la /opt/projects/calc-master/public/

# 重新构建容器
sudo docker compose down
sudo docker compose up -d --build

# 验证容器内文件
sudo docker compose exec calc-master ls -la public/
sudo docker compose exec calc-master cat public/ads.txt
```

---

## 常见问题

### Q: SSH 连接不上服务器？
A: 登录搬瓦工控制面板，检查服务器状态，可能需要重启 VPS。

### Q: 容器启动后又停止？
A: 查看 `sudo docker compose logs calc-master` 看具体错误信息。

### Q: 防火墙看起来没问题，但还是连不上？
A: 检查搬瓦工后台的 "Security" 设置，可能有道防火墙在拦截。

### Q: 直接访问服务器 IP 可以，但域名不行？
A: 问题在 Cloudflare 设置，检查 DNS 记录和 SSL/TLS 配置。

---

## 如果以上都不行

收集以下信息：
1. `sudo docker compose ps` 输出
2. `sudo docker compose logs` 输出
3. `curl http://localhost:3000` 输出
4. Cloudflare DNS 设置截图

然后进一步排查！
