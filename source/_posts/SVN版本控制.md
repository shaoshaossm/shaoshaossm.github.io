---
title: SVN版本控制
top: false
cover: false
toc: true
mathjax: false
date: 2022-04-11 22:13:26
password:
img: https://img-blog.csdnimg.cn/b50eff1d604d471a9f014899d2528f79.png
summary: 总结使用SVN版本控制------------------------------------------
tags: SVN
categories: 版本控制
---

### 简介

#### 是什么

- SVN是代码版本管理工具
- 他能记住你每次的修改
- 查看所有的修改记录
- 恢复到任何历史版本
- 恢复已经删除的文件

#### 优势

- 目录权限控制
- 子目录Checkout，减少不必要的文件检出

#### 主要应用

- 代码的版本管理
- 存储重要的文件
- 内部文件共享，并能按目录划分权限

### 基本操作

1. 创建项目

![创建项目](https://img-blog.csdnimg.cn/1e09a1498d704b19a3dc5bb2e555c2d3.png)

> 可不用勾选自动创建

2. 复制项目地址
3. 新建工作文件夹，右键SVN Checkout

![ok](https://img-blog.csdnimg.cn/a44ef2bacbbe407999a1cd8c3aa52882.png)

4. 输入账号密码即可

![OK](https://img-blog.csdnimg.cn/d683e18cfd6c4e8d925eee07e14c963e.png)

5. 放入一些文件，右键SVN Commit

![在这里插入图片描述](https://img-blog.csdnimg.cn/952cf33d6a784299a2301db62da9cfb2.png)

![提交成功](https://img-blog.csdnimg.cn/0e9d2493e84843659bd1e99932e115be.png)

6. 测试修改提交

![修改提交](https://img-blog.csdnimg.cn/4e741a283c07423c95500132e5ae8990.png)

![修改成功](https://img-blog.csdnimg.cn/687e8c3add594ec58fbed2033037abbb.png)

### 撤销和恢复

#### 撤销本地修改

![Revert](https://img-blog.csdnimg.cn/230d8548b89844639df87ec201da5426.png)
![ok](https://img-blog.csdnimg.cn/bdb759b270874aa9b8486496fb730b7a.png)

#### 撤销已提交的内容

> <font color="orange">在文件中修改完毕后，及时`SVN Update`</font>

![show log](https://img-blog.csdnimg.cn/e8b86030ef114b47aec0a66a9bb491e0.png)

![Revert changes from this revision](https://img-blog.csdnimg.cn/29457f3f88fa41dca647de58bfeba884.png)

> 恢复完后提交即可

#### 恢复到指定版本

![show log](https://img-blog.csdnimg.cn/e8b86030ef114b47aec0a66a9bb491e0.png)

![Revert to this revision](https://img-blog.csdnimg.cn/74e01a80b01848efb3c67a657f3c4519.png)

> 恢复完后提交即可

### 添加忽略

![忽略文件](https://img-blog.csdnimg.cn/881337e16bd64334a9f6652baf6cc24c.png)

![忽略index.md](https://img-blog.csdnimg.cn/d46b2ed09fdc4b2a86bbc125aad043f1.png)
![成功](https://img-blog.csdnimg.cn/9b3a7595d92742348be3b1a0a2332171.png)

### 解决冲突

- 什么情况容易发生冲突
  - 多个人修改了同个文件的同一行
  - 无法进行合并的二进制文件
- 如何避免冲突
  - 经常update同步下他人的代码
  - 二进制文件不要多个人同时操作

![解决冲突](https://img-blog.csdnimg.cn/32ee7c7618ba48d397df9b998397a67e.png)

### 分支

- SVN经典目录结构
  - trunk
  - branches
  - tags

#### 第一种方式

![Branch/tag](https://img-blog.csdnimg.cn/7709cf3cbecc44a79a070652ff78ba48.png)

![v1.0](https://img-blog.csdnimg.cn/288f598e459f4693948701d5a1aa98ae.png)

#### 第二种方式

![检出](https://img-blog.csdnimg.cn/0c1faaf15dd04cdca22d8c3f90cd49bb.png)
![复制](https://img-blog.csdnimg.cn/9273ef3f0d0f4c5387c5c4160b5ca4d0.png)

### 合并

![选择主目录即可](https://img-blog.csdnimg.cn/5acdac8528b844f7869bd70ec81b896f.png)

> 记得提交哦

### 切换分支

> 创建一个online2.0分支
>
> commit 哦

![Switch](https://img-blog.csdnimg.cn/98f1146bed654c47802146cf7e163be5.png)

![切换分支](https://img-blog.csdnimg.cn/2dc391b09e764a2fb5ad027fc7b58188.png)

![切换成功](https://img-blog.csdnimg.cn/2b2aab516f304b1c96efe7f289f508ab.png)

### 代码暂存和取出

![在这里插入图片描述](https://img-blog.csdnimg.cn/62b3fe6443d84b95b27e27e1c655677b.png)

![ok](https://img-blog.csdnimg.cn/a68d3a0c40144991aa903646a627e00a.png)

### 复杂代码合并

用软件BCompare，老朋友了🎈🎈
