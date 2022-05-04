---
title: Centos7常见问题解决
top: false
cover: false
toc: true
mathjax: false
date: 2022-04-29 15:58:45
password:
img: https://img-blog.csdnimg.cn/a54ba778db9e424287dc1d5153eb2438.png
summary: 总结在使用centos7操作系统中遇到的一些典型问题来解决
tags: centos7
categories: 操作系统
---

> 使用FastDFS上传文件时提示内存空间已满

- 使用命令查看各个分区占用情况：

```sh
df -h
```

-  使用命令查看当前路径下个目录的占用情况：

```sh
du -h -x --max-depth=1
```

![占用情况](https://img-blog.csdnimg.cn/0b77c0f0230e40c0aff0fcce8e9458bd.png)

- 进入占用较大的文件内再次查看

```sh
cd usr/
du -h -x --max-depth=1
```

![继续查看](https://img-blog.csdnimg.cn/9700018c299a4a8c9442d1b17b8e22cd.png)

- 我这里删除了java-zip文件即可成功上传
