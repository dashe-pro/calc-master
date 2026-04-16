# 修复 ads.txt 404 问题

## 问题分析
本地能访问 `/ads.txt`，但上线后 404，通常原因：
1. 文件没有正确提交到 Git
2. 服务器上的代码没有更新
3. Docker 容器没有重新构建
4. Nginx 配置问题（已修复）

## 完整修复步骤

### 第一步：本地确认文件存在

```bash
# 检查当前目录
cd C:\Users\707829851\Desktop\calc-master

# 确认文件存在
dir public\
# 应该能看到 ads.txt 和 Ads.txt
```

### 第二步：提交到 Git

```bash
# 检查 git 状态
git status

# 如果文件没有被追踪，添加它们
git add public/ads.txt public/Ads.txt nginx/conf.d/calc-master.conf

# 提交更改
git commit -m "Fix: Add ads.txt files and update nginx config"

# 推送到远程仓库
git push
```

### 第三步：在服务器上更新代码

```bash
# 连接到服务器
ssh root@104.244.88.186

# 进入项目目录
cd /opt/projects/calc-master

# 检查当前状态
sudo git status

# 拉取最新代码
sudo git pull

# 确认文件已更新
ls -la public/
# 应该能看到 ads.txt 和 Ads.txt
```

### 第四步：重新构建并启动容器

**重要：必须重新构建，因为 public 目录文件在构建时被复制到 Docker 镜像中**

```bash
# 停止并删除旧容器
sudo docker compose down

# 重新构建并启动（必须加 --build）
sudo docker compose up -d --build

# 查看构建日志，确保没有错误
sudo docker compose logs -f
```

### 第五步：验证容器内文件

```bash
# 进入应用容器检查
sudo docker compose exec calc-master ls -la public/

# 或者直接查看
sudo docker compose exec calc-master cat public/ads.txt
sudo docker compose exec calc-master cat public/Ads.txt
```

### 第六步：验证 Nginx 配置

```bash
# 检查 Nginx 配置是否正确
sudo docker compose exec nginx-proxy nginx -t

# 如果没问题，重启 Nginx
sudo docker compose restart nginx-proxy
```

### 第七步：测试访问

在浏览器中测试：
- http://calcmasters.org/ads.txt
- http://calcmasters.org/Ads.txt

## 快速诊断命令

如果还是 404，按顺序执行：

```bash
# 1. 检查容器是否运行
sudo docker compose ps

# 2. 查看应用日志
sudo docker compose logs calc-master

# 3. 查看 Nginx 日志
sudo docker compose logs nginx-proxy

# 4. 直接测试 Next.js 应用（绕过 Nginx）
# 在服务器上执行
curl http://localhost:3000/ads.txt

# 5. 检查文件权限
sudo docker compose exec calc-master ls -la public/
```

## 常见问题

### Q: 为什么需要重新构建？
A: 因为 Dockerfile 在构建时将 `public` 目录复制到镜像中，所以每次修改 public 目录的文件都需要重新构建镜像。

### Q: 可以不重新构建吗？
A: 可以，但是需要将 public 目录挂载为 volume。不过对于生产环境，重新构建更安全。

### Q: 如何临时测试？
A: 可以直接复制文件到运行中的容器：
```bash
# 先确保文件在服务器上存在
ls -la /opt/projects/calc-master/public/

# 复制到容器
sudo docker cp /opt/projects/calc-master/public/ads.txt calc-master_calc-master_1:/app/public/
sudo docker cp /opt/projects/calc-master/public/Ads.txt calc-master_calc-master_1:/app/public/

# 验证
sudo docker compose exec calc-master ls -la public/
```
（注意：容器名称可能不同，用 `sudo docker ps` 查看）
