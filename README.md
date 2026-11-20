# 众里寻熙 / Enlight

This folder is the complete static website for Enlight (众里寻熙). Open `index.html` to view it, or publish the folder as a GitHub Pages site.

本文件夹是众里寻熙英文网站的完整静态文件，已按 GitHub 仓库的方式整理，可直接用来发布 [GitHub Pages](https://pages.github.com/) 页面。

## 本地预览

用 Chrome 或 Edge 打开 `index.html` 即可浏览。部分地图和视频在以本地文件方式打开时可能不完整，更稳妥的做法是在本文件夹打开终端，运行：

```bash
python -m http.server 8000
```

然后访问 http://127.0.0.1:8000/

## 作为 GitHub 仓库并发布为 GitHub Pages

1. 在 GitHub 新建一个空仓库，不要勾选 “Add a README”。
2. 在本文件夹打开终端（已安装 Git），执行：

```bash
git init -b main
git add .
git commit -m "Initial commit: Enlight website"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

请把上面的 `YOUR_USERNAME` 和 `YOUR_REPO` 换成你的 GitHub 用户名和仓库名。若本机尚未设置 Git 用户名和邮箱，先运行 `git config --global user.name` 与 `git config --global user.email`。

3. 打开该仓库的 Settings → Pages。在 Build and deployment 中，Source 选择 “Deploy from a branch”，Branch 选择 `main`，文件夹选择 `/ (root)`，保存。
4. 几分钟后即可访问：
   - 若仓库名是 `YOUR_USERNAME.github.io`，地址是 `https://YOUR_USERNAME.github.io/`
   - 否则地址是 `https://YOUR_USERNAME.github.io/YOUR_REPO/`

本目录已包含空文件 `.nojekyll`，避免 GitHub 用 Jekyll 处理这些静态文件。

## 大视频文件说明

`videos/narada-promo.mp4` 约 131 MB，超过 GitHub 单文件 100 MB 的限制，所以它留在本文件夹里供本地浏览，但默认不会被 `git add` 进仓库。君澜页面上的这段影片，发布到 GitHub Pages 后需要二选一：

- 用 [Git LFS](https://git-lfs.com/) 跟踪该文件后再推送（免费版 GitHub Pages 对 LFS 文件的支持有限，页面里有时无法播放）；或
- 把该视频放到对象存储或其他可公开访问的地址，再改网页里的链接。

## 说明

GitHub Pages 的服务器在海外。若主要是给国内、尤其是微信里转发打开，仍可能遇到打不开或安全提示，那时需要已备案的国内域名和国内服务器。
