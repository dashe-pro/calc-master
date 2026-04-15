# 部署指南

## 项目部署到搬瓦工服务器 (104.244.88.186)

### 前置准备

1. **服务器信息**
   - IP: 104.244.88.186
   - 系统: AlmaLinux (搬瓦工默认)
   - 域名: 已在Cloudflare配置DNS

2. **本地准备**
   - 确保项目代码已提交到Git
   - 拥有服务器SSH访问权限

---

## 第一步：服务器环境准备

### 1. 连接到服务器

```bash
ssh root@104.244.88.186
```

### 2. AlmaLinux 专用：安装Docker和Docker Compose

由于搬瓦工使用 AlmaLinux 系统，请按以下步骤安装：

```bash
# 更新系统
sudo dnf update -y

# 安装必要的依赖
sudo dnf install -y dnf-plugins-core git vim

# 添加 Docker CE 仓库
sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo

# 安装 Docker Engine
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动 Docker 并设置开机自启
sudo systemctl start docker
sudo systemctl enable docker

# 验证 Docker 安装
sudo docker --version

# 验证 Docker Compose
sudo docker compose version

# （可选）将当前用户添加到 docker 组，避免每次使用 sudo
sudo usermod -aG docker $USER
newgrp docker
```

> **注意**：搬瓦工使用AlmaLinux，不要使用 `curl -fsSL https://get.docker.com -o get-docker.sh`，这个脚本不支持AlmaLinux。
> 详细的AlmaLinux Docker安装指南请查看 `INSTALL_DOCKER_ALMALINUX.md`

### 3. 配置防火墙 (AlmaLinux使用firewalld)

```bash
# 检查防火墙状态
sudo firewall-cmd --state

# 如果 firewalld 正在运行，允许必要的端口
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-port=22/tcp
sudo firewall-cmd --reload

# 或者，如果你更喜欢使用 ufw（需要先安装）
# sudo dnf install -y ufw
# sudo ufw allow 22/tcp
# sudo ufw allow 80/tcp
# sudo ufw allow 443/tcp
# sudo ufw enable
```

---

## 第二步：项目部署

### 方案一：在服务器上直接构建（推荐）

#### 1. 在服务器上克隆项目

```bash
# 创建项目目录
sudo mkdir -p /opt/projects
cd /opt/projects

# 克隆项目（替换为你的Git仓库地址）
sudo git clone <your-git-repo-url> calc-master
cd calc-master

# 设置目录权限（如果需要）
sudo chown -R $USER:$USER /opt/projects/calc-master
```

#### 2. 配置Nginx

编辑 `nginx/conf.d/calc-master.conf`，将域名替换为你的实际域名：

```bash
sudo vim nginx/conf.d/calc-master.conf
```

将 `your-domain.com` 替换为你的实际域名，例如：
```nginx
server_name example.com www.example.com;
```

#### 3. 构建并启动容器

```bash
# 构建并启动（AlmaLinux上需要使用sudo，除非你已将用户添加到docker组）
sudo docker compose up -d --build

# 查看日志
sudo docker compose logs -f

# 查看容器状态
sudo docker compose ps
```

### 方案二：本地构建后上传（节省服务器资源）

#### 1. 在本地构建镜像

```bash
# 在本地项目目录
cd /path/to/calc-master

# 构建镜像
docker build -t calc-master:latest .

# 导出镜像
docker save -o calc-master.tar calc-master:latest
```

#### 2. 上传到服务器

```bash
# 上传镜像文件
scp calc-master.tar root@104.244.88.186:/opt/projects/

# 上传docker-compose.prod.yml和nginx配置
scp docker-compose.prod.yml root@104.244.88.186:/opt/projects/calc-master/
scp -r nginx root@104.244.88.186:/opt/projects/calc-master/
```

#### 3. 在服务器上导入并启动

```bash
ssh root@104.244.88.186
cd /opt/projects/calc-master

# 导入镜像
docker load -i calc-master.tar

# 修改docker-compose.prod.yml中的镜像名（如果需要）
# 然后启动
docker compose -f docker-compose.prod.yml up -d
```

---

## 第三步：配置SSL证书（使用Cloudflare）

由于你已经使用Cloudflare配置了DNS，可以使用Cloudflare的SSL：

### 1. 在Cloudflare中启用SSL

1. 登录Cloudflare控制台
2. 选择你的域名
3. 进入 SSL/TLS → Overview
4. 选择 "Full" 或 "Strict" 模式

### 2. 配置Cloudflare DNS

确保DNS记录已正确配置：
- A记录: `@` → 104.244.88.186
- A记录: `www` → 104.244.88.186
- 代理状态: 橙色云朵（已代理）

### 3. （可选）使用Let's Encrypt证书

如果你想在服务器上也配置SSL证书：

```bash
# 安装Certbot
apt install -y certbot python3-certbot-nginx

# 获取证书
certbot --nginx -d your-domain.com -d www.your-domain.com

# 证书会自动续期
```

---

## 第四步：添加更多项目

由于我们使用了Nginx反向代理，添加新项目很简单：

### 1. 为新项目创建Docker Compose配置

假设你有一个新项目 `blog`，创建 `blog/docker-compose.yml`：

```yaml
version: '3.8'

services:
  blog:
    image: blog:latest
    container_name: blog
    restart: unless-stopped
    ports:
      - "3001:3000"
    networks:
      - web-network

networks:
  web-network:
    external: true
```

### 2. 在Nginx中添加新站点配置

创建 `nginx/conf.d/blog.conf`：

```nginx
server {
    listen 80;
    server_name blog.your-domain.com;

    access_log /var/log/nginx/blog-access.log;
    error_log /var/log/nginx/blog-error.log;

    location / {
        proxy_pass http://blog:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. 重启Nginx

```bash
cd /opt/projects/calc-master
docker compose restart nginx-proxy
```

---

## 常用管理命令

> **注意**：在AlmaLinux上，如果没有将用户添加到docker组，所有docker命令都需要使用sudo

### 查看日志

```bash
# 查看所有服务日志
sudo docker compose logs -f

# 查看特定服务日志
sudo docker compose logs -f calc-master
sudo docker compose logs -f nginx-proxy
```

### 重启服务

```bash
# 重启所有服务
sudo docker compose restart

# 重启特定服务
sudo docker compose restart calc-master
```

### 更新项目

```bash
# 拉取最新代码
sudo git pull

# 重新构建并启动
sudo docker compose up -d --build
```

### 停止服务

```bash
# 停止所有服务
sudo docker compose down

# 停止并删除卷
sudo docker compose down -v
```

### 进入容器

```bash
# 进入应用容器
sudo docker compose exec calc-master sh

# 进入Nginx容器
sudo docker compose exec nginx-proxy sh
```

---

## 故障排查

### 容器无法启动

```bash
# 查看容器状态
sudo docker compose ps

# 查看详细日志
sudo docker compose logs calc-master
```

### Nginx 502错误

```bash
# 检查应用容器是否运行
sudo docker compose ps

# 检查Nginx配置
sudo docker compose exec nginx-proxy nginx -t

# 重启Nginx
sudo docker compose restart nginx-proxy
```

### 端口被占用

```bash
# 查看端口占用
sudo netstat -tlnp

# 或使用ss
sudo ss -tlnp
```

---

## 备份策略

### 1. 定期备份Docker镜像

```bash
# 创建备份脚本
cat > /opt/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/backups"
mkdir -p $BACKUP_DIR

# 备份镜像
docker save -o $BACKUP_DIR/calc-master-$DATE.tar calc-master:latest

# 压缩
gzip $BACKUP_DIR/calc-master-$DATE.tar

# 删除7天前的备份
find $BACKUP_DIR -name "calc-master-*.tar.gz" -mtime +7 -delete
EOF

chmod +x /opt/backup.sh

# 添加到crontab，每天凌晨2点备份
crontab -e
# 添加行：0 2 * * * /opt/backup.sh
```

### 2. 备份Nginx配置和日志

```bash
# 备份nginx目录
tar -czf /opt/backups/nginx-$(date +%Y%m%d).tar.gz /opt/projects/calc-master/nginx
```

---

## 安全建议

1. **定期更新系统和Docker镜像**
   ```bash
   apt update && apt upgrade -y
   docker pull node:20-alpine
   docker pull nginx:alpine
   ```

2. **使用非root用户运行容器**（已在Dockerfile中配置）

3. **限制容器资源**（可选）
   在docker-compose.yml中添加：
   ```yaml
   services:
     calc-master:
       deploy:
         resources:
           limits:
             cpus: '0.5'
             memory: 512M
   ```

4. **监控服务器状态**
   - 使用 `htop` 查看资源使用
   - 使用 `docker stats` 查看容器资源使用

---

## 联系支持

如有问题，请检查：
1. Docker容器日志
2. Nginx错误日志
3. 服务器系统日志 `/var/log/syslog`
