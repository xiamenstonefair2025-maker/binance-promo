# 币安推广合作网站

币安官方推广合作伙伴网站，HTML + Tailwind CSS 构建，部署于 GitHub Pages。

## 在线预览

🌐 **网站地址**: `https://你的用户名.github.io/binance-promo`

## 功能特点

- ✅ 响应式设计，支持移动端
- ✅ 自动同步币安最新公告
- ✅ 40%高额返佣推广
- ✅ 多页面导航（首页、新闻、活动、返佣说明）
- ✅ GitHub Pages 免费托管
- ✅ 自动部署

## 快速开始

### 1. 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 仓库名称填：`binance-promo`
4. 选择 "Public"（公开）
5. 点击 "Create repository"

### 2. 上传代码

**方式一：命令行（推荐）**

```bash
# 克隆仓库到本地
git clone https://github.com/你的用户名/binance-promo.git
cd binance-promo

# 复制所有网站文件到该目录
# 然后提交

git add .
git commit -m "Initial commit"
git push origin main
```

**方式二：网页上传**

1. 进入新创建的仓库页面
2. 点击 "uploading an existing file"
3. 拖拽或选择所有网站文件
4. 点击 "Commit changes"

### 3. 启用 GitHub Pages

1. 进入仓库的 **Settings**（设置）
2. 左侧菜单点击 **Pages**
3. **Source** 选择 "Deploy from a branch"
4. **Branch** 选择 "main" / "(root)"
5. 点击 **Save**
6. 等待几分钟，访问 `https://你的用户名.github.io/binance-promo`

### 4. 配置推广链接

修改 `js/config.js` 文件：

```javascript
// 替换为你的币安推广链接
BINANCE_REGISTER_URL: 'https://www.binance.com/zh-CN/join?ref=你的推荐码',

// 替换为你的Telegram群链接
TELEGRAM_URL: 'https://t.me/你的群组',
```

修改后提交到 GitHub，网站会自动更新。

## 项目结构

```
binance-promo/
├── index.html          # 首页
├── news.html           # 新闻中心
├── activities.html     # 活动动态
├── commission.html     # 返佣说明
├── js/
│   ├── config.js       # 配置文件（修改推广链接）
│   ├── main.js         # 主要交互
│   └── binance-news.js # 币安新闻同步
└── .github/
    └── workflows/
        └── deploy.yml  # 自动部署配置
```

## 自定义域名（可选）

如果你想用自己的域名（如 `yourdomain.com`）：

1. 在仓库根目录创建 `CNAME` 文件，内容为：
   ```
   yourdomain.com
   ```

2. 在你的域名 DNS 设置中添加：
   - 类型：CNAME
   - 主机：www
   - 值：你的用户名.github.io

3. 在 GitHub Pages 设置中填入你的域名

## 更新网站

每次修改代码并推送到 GitHub，网站会自动重新部署（约1-2分钟）。

```bash
git add .
git commit -m "更新内容"
git push origin main
```

## 注意事项

1. **推广链接**: 务必在 `js/config.js` 中设置正确的币安推广链接
2. **缓存**: 币安公告有30分钟缓存，如需立即更新请清除浏览器缓存
3. **CORS**: 币安API可能有跨域限制，如无法获取公告会显示备用数据

## 技术栈

- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript
- GitHub Pages
- GitHub Actions

## 免责声明

本项目仅供学习交流使用。加密货币交易有风险，投资需谨慎。
