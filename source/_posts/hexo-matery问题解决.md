---
title: hexo-matery问题解决
top: false
cover: false
toc: true
mathjax: true
date: 2021-09-21 22:34:32
password:
summary: 经过几天的配置,hexo终于像个样了 记录一下遇到的一些问题
tags: matery
categories: hexo
---

```bash
# 提交文件
hexo g -d
# 本地调试
hexo s
hexo backup
```

问: hexo g -d 突然无缘无故提交不上去,但本地 hexo server 是可以正常显示的?

答: 删除public文件夹重新跑命令hexo clean hexo g -d ,不行就跑两次,等待成功.(就是这么不靠谱O(∩_∩)O)

问: 代码块中花括号被转义,不能正常显示?

答: 删除代码高亮插件,升级hexo版本到5.0以上，并启动自带高亮插件

```bash
删除插件:
- npm uninstall hexo-prism-plugin 
升级版本:
- cnpm install -g npm-upgrade         # 升级系统中的插件
- cnpm update                         # 更新 hexo 及所有插件
- hexo -v                             # 确认 hexo 已经更新
系统自带高亮插件：
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false
prismjs:
  enable: true
  preprocess: true
  line_number: true
  tab_replace: ''
```

问: 文章密码的加密方式是什么？

答: SHA256 加密方式 [在线加密](https://crypot.51strive.com/sha256.html)



