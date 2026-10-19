# DSE错题本 - 拍照上传AI解析

一个专为 DSE（香港中学文凭考试）学生打造的错题本网页应用。拍照上传错题，AI 自动识别题目并给出解析，一键录入错题本，配合间隔复习法帮你高效备考。

---

## 功能列表

- 📷 **拍照上传错题**：直接拍摄或从相册选择错题照片
- 🤖 **AI 对话解析**：DeepSeek AI 识别题目、分析错因、给出详细解答
- 📚 **错题本管理**：按学科分类展示错题，支持搜索
- 📅 **间隔复习**：根据艾宾浩斯遗忘曲线自动安排复习时间
- 📊 **数据分析**：统计各科错题数量、掌握程度，找出薄弱环节
- 💬 **随时提问**：点击任意错题，向 AI 继续追问

---

## 准备工作

部署前，你需要先准备好以下三样东西：

### 1. GitHub 账号（已有则跳过）

- 打开 [https://github.com](https://github.com)
- 点击 "Sign up" 注册一个免费账号
- 按提示完成邮箱验证

### 2. DeepSeek API 密钥

- 打开 [https://platform.deepseek.com/](https://platform.deepseek.com/)
- 注册/登录账号
- 进入「API Keys」页面，点击「创建 API Key」
- 复制生成的密钥（只显示一次，务必保存好！）
- 💡 新用户有免费额度，足够日常使用

### 3. Vercel 账号（免费）

- 打开 [https://vercel.com](https://vercel.com)
- 点击「Sign Up」
- 选择「Continue with GitHub」，用刚才的 GitHub 账号登录即可
- 免费版完全够用，不需要绑信用卡

---

## 部署步骤（跟着做就行）

### 第 1 步：在 GitHub 创建新仓库

1. 登录 GitHub，点击右上角 **"+"** → **"New repository"**
2. **Repository name** 填：`dse-notebook`
3. 选择 **Public** 或 **Private** 都可以
4. **不要**勾选 "Add a README file"（我们已经有自己的文件了）
5. 点击绿色按钮 **"Create repository"**

### 第 2 步：上传项目文件到 GitHub

1. 创建好仓库后，点击 **"uploading an existing file"** 链接
2. 把本项目的所有文件和文件夹拖进去：
   - `index.html`
   - `api/` 文件夹（里面有 `chat.js`）
   - `package.json`
   - `vercel.json`
   - `.gitignore`
   - `README.md`
3. 页面下方点击 **"Commit changes"** 按钮

> 💡 如果拖入整个 `api` 文件夹不方便，可以先打开 `api` 文件夹，单独上传 `chat.js` 到同名目录。

### 第 3 步：登录 Vercel

1. 打开 [https://vercel.com](https://vercel.com)
2. 用 GitHub 账号登录（第一次登录会要求授权，点同意即可）

### 第 4 步：导入 GitHub 项目

1. 点击顶部 **"Add New..."** → **"Project"**
2. 在列表里找到刚才创建的 `dse-notebook` 仓库
3. 点击右边的 **"Import"** 按钮

### 第 5 步：配置部署

1. **Framework Preset**：选择 **"Other"**
2. **Build Command**：留空（不用填）
3. **Output Directory**：留空，或填 `.`（点号）
4. **Root Directory**：保持默认不动

### 第 6 步：添加 API 密钥（重要！）

1. 展开 **"Environment Variables"** 区域
2. 在 **Name** 框里输入：`DEEPSEEK_API_KEY`
3. 在 **Value** 框里粘贴你之前保存的 DeepSeek API 密钥
4. 点击 **"Add"** 确认

### 第 7 步：部署！

1. 点击底部橙色的 **"Deploy"** 按钮
2. 等待 1-2 分钟，页面会显示部署进度
3. 看到 "Congratulations" 就说明成功了！

### 第 8 步：访问你的应用

1. 部署成功后会给你一个网址，类似：`https://dse-notebook-xxx.vercel.app`
2. 点击就能打开你的错题本应用了 🎉

---

## 更新 API 密钥

如果以后需要更换 DeepSeek API 密钥（比如额度用完了、换了新密钥）：

1. 打开 Vercel Dashboard：[https://vercel.com/dashboard](https://vercel.com/dashboard)
2. 点击你的 `dse-notebook` 项目
3. 顶部菜单选 **Settings** → 左边选 **Environment Variables**
4. 找到 `DEEPSEEK_API_KEY`，点击编辑（铅笔图标）
5. 换成新密钥后保存
6. 然后到 **Deployments** 页面，点最新一次部署右边的 "..." → **Redeploy**
7. 等重新部署完成即可

---

## 使用说明

1. 打开你部署后的网址
2. 点击侧边栏的 **「AI助手」**
3. 点击拍照按钮 📷，拍摄一道错题（或从相册选择已有照片）
4. 在输入框写一句说明，比如"帮我分析这道错题"
5. 点击 **发送** 按钮
6. AI 会识别题目并给出详细解析
7. 确认解析无误后，点击 **「录入错题本」**
8. 回到首页或对应学科页面，就能看到新录入的错题了
9. 点击任意错题，可以查看详情、标记复习进度、继续向 AI 提问

---

## 本地开发（可选，高级用户）

如果你想在自己电脑上运行调试：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 进入项目目录
cd dse-notebook-webapp

# 创建环境变量文件
# 在项目根目录新建 .env.local 文件，内容：
# DEEPSEEK_API_KEY=你的密钥

# 启动本地开发服务器
vercel dev
```

然后浏览器打开终端里显示的地址（通常是 `http://localhost:3000`）。

---

## 常见问题

### 🤖 AI 不回复 / 返回错误

- 检查 Vercel 里的 `DEEPSEEK_API_KEY` 是否填写正确
- 登录 DeepSeek 平台看看账户余额是否充足
- 如果刚改了密钥，记得要重新部署（Redeploy）

### 📷 图片上传失败

- 检查图片大小，建议不要超过 5MB
- 确保图片清晰，题目文字可辨认
- 网络不好时可以等一会儿再试

### 💾 数据丢失了怎么办？

- 错题数据存在浏览器的 localStorage 里，清除浏览器数据会丢失
- **建议定期截图备份重要错题**
- 换浏览器/换设备时数据不会自动同步
- 如果想换设备用，需要重新录入

### 🚀 部署失败

- 检查 GitHub 仓库里的文件结构是否正确：
  - `api/chat.js` 必须在 `api` 文件夹下
  - `index.html` 在根目录
  - `vercel.json` 在根目录
- 检查环境变量 `DEEPSEEK_API_KEY` 是否添加成功
- 看 Vercel 部署日志（Build Logs）里的红色报错信息

### ❓ 其他问题

- 去 Vercel 的 Deployments 页面点进去看详细日志
- DeepSeek 官方文档：[https://platform.deepseek.com/docs](https://platform.deepseek.com/docs)

---

## 技术说明

| 项目 | 说明 |
|------|------|
| 前端 | 纯 HTML / CSS / JavaScript，无框架 |
| 数据存储 | 浏览器 localStorage（单机版） |
| 后端 | Vercel Serverless Functions（`api/chat.js`） |
| AI 模型 | DeepSeek `deepseek-flash`（支持图片识别） |
| 部署平台 | Vercel（免费版） |
| 代码托管 | GitHub |

**隐私安全**：DeepSeek API 密钥只存储在 Vercel 服务端的环境变量中，前端浏览器永远看不到密钥，不用担心泄露。

---

祝备考顺利，DSE 加油！💪
