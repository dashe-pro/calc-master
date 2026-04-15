# AlmaLinux 上安装 Docker 和 Docker Compose

由于搬瓦工使用 AlmaLinux 系统，官方的 `get-docker.sh` 脚本不支持，我们需要用 AlmaLinux 的专用方法安装。

## 方法一：使用官方 Docker 仓库（推荐）

### 1. 更新系统并安装必要的包

```bash
# 更新系统
sudo dnf update -y

# 安装必要的依赖
sudo dnf install -y dnf-plugins-core
```

### 2. 添加 Docker 官方仓库

```bash
# 添加 Docker CE 仓库
sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
```

### 3. 安装 Docker Engine

```bash
# 安装 Docker
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 4. 启动 Docker 并设置开机自启

```bash
# 启动 Docker
sudo systemctl start docker

# 设置开机自启
sudo systemctl enable docker

# 验证 Docker 安装
sudo docker --version

# 验证 Docker Compose
sudo docker compose version
```

### 5. 将当前用户添加到 docker 组（可选，避免每次使用 sudo）

```bash
# 添加当前用户到 docker 组
sudo usermod -aG docker $USER

# 重新登录或执行以下命令使组更改生效
newgrp docker

# 验证是否可以不使用 sudo 运行 docker
docker ps
```

---

## 方法二：使用 AlmaLinux 自带的 Podman（可选）

如果你不想安装 Docker，AlmaLinux 自带了 Podman，它是 Docker 的兼容替代品：

```bash
# 检查 Podman 是否已安装
podman --version

# 如果没有安装，安装它
sudo dnf install -y podman podman-compose

# 启动 Podman 服务
sudo systemctl start podman
sudo systemctl enable podman
```

注意：Podman 使用 `podman-compose` 替代 `docker-compose`，命令语法类似。

---

## 验证安装

### 运行测试容器

```bash
# 运行 hello-world 容器测试
sudo docker run hello-world

# 或者使用 Podman
sudo podman run hello-world
```

### 检查 Docker 服务状态

```bash
# 查看 Docker 状态
sudo systemctl status docker

# 查看 Docker Compose 版本
sudo docker compose version
```

---

## 部署项目

安装好 Docker 后，按照以下步骤部署项目：

### 1. 创建项目目录并克隆代码

```bash
# 创建项目目录
sudo mkdir -p /opt/projects
cd /opt/projects

# 克隆你的项目（替换为你的Git仓库地址）
sudo git clone <your-git-repo-url> calc-master
cd calc-master
```

### 2. 配置 Nginx

编辑 `nginx/conf.d/calc-master.conf`，将域名替换为你的实际域名：

```bash
sudo vim nginx/conf.d/calc-master.conf
```

### 3. 构建并启动容器

```bash
# 构建并启动（如果没有将用户添加到docker组，需要使用sudo）
sudo docker compose up -d --build

# 查看日志
sudo docker compose logs -f

# 查看容器状态
sudo docker compose ps
```

---

## 常见问题

### 1. 权限被拒绝

如果遇到权限问题：

```bash
# 确保使用 sudo 运行，或者将用户添加到 docker 组
sudo usermod -aG docker $USER
newgrp docker
```

### 2. 防火墙配置

```bash
# 检查防火墙状态
sudo firewall-cmd --state

# 如果 firewalld 正在运行，允许必要的端口
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-port=22/tcp
sudo firewall-cmd --reload

# 或者使用 ufw（如果已安装）
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 3. SELinux 问题

如果遇到 SELinux 相关问题：

```bash
# 临时设置 SELinux 为 permissive 模式
sudo setenforce 0

# 永久禁用 SELinux（不推荐，建议仅用于调试）
sudo vim /etc/selinux/config
# 将 SELINUX=enforcing 改为 SELINUX=permissive
```

---

## 相关链接

- Docker 官方文档：https://docs.docker.com/engine/install/centos/
- AlmaLinux 文档：https://wiki.almalinux.org/
