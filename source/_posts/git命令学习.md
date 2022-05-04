---
title: git命令学习
top: false
cover: false
toc: true
mathjax: true
date: 2021-09-21 19:03:54
password:
summary: 距离初次接触git也有一年了,趁着今天遇到git下载分支的问题,就来整理一下git命令的总结
tags: git
categories: 版本控制
---

- 查看本地库状态

```sh
git status
```

- 添加文件到暂存区

```sh
git add <file>
```

- 删除暂存区文件

```sh
git rm --cached <file>
```
- 将暂存区的文件提交到本地库

```sh
# "first commit" 提交信息
git commit -m "first commit" <file>
```
- 提交本地分支到远程库

```sh
git push 仓库别名/仓库地址 分支名
```

- 查看历史版本

```sh
# 查看历史版本日志
git reflog
# 查看历史版本详细日志
git log
```
- 版本穿梭

```sh
# 版本回退
git reflog # 查看回退的版本号
git reset --hard 版本号
```
- 查看分支

```sh
git branch -v
```
- 创建分支

```sh
git branch 分支名
```
- 切换分支

```sh
git checkout 分支名
```
- 合并分支（主分支没修改）

```sh
# 站在主要的的分支上操作要合并的分支
git merge 要合并的分支名
```
- 分支冲突
  - 合并分支时，两个分支在同一个文件的<font color="red">同一个位置</font>有两套完全不同的修改。Git 无法替 我们决定使用哪一个。必须<font color="red">人为决定</font>新代码内容。
  - 冲突产生的表现：后面状态为 ` (master|MERGING)`
- 解决冲突
  - 特殊符号：<font color="red"><<<<<<< HEAD</font> 当前分支的代码 <font color="red">=======</font>合并过来的代码 <font color="red">>>>>>>> hot-fix</font>
  - 手动修改文件
  - 添加到暂存区
  - 执行提交（注意：此时使用` git commit `命令时<font color="red">不能带文件名</font>）

```sh
# 查看状态  (master|MERGING)
git status
# 添加到暂存区
git add <file>
# 执行提交到本地库
git commit -m "merge conflict" 
```
- 查看当前所有远程库地址别名

```sh
git remote -v
```
- 创建远程库别名

```sh
git remote add 别名 远程库https地址
```
- 提交本地分支到远程库

```sh
git push 仓库别名/仓库地址 分支名
```
- 拉取远程库代码到本地

```sh
git pull 仓库别名/仓库地址 分支名
```
- 克隆远程库到本地
- clone会做如下操作
  - 拉取代码
  - 初始化本地库
  - 创建别名

```sh
git clone https仓库地址
```
- 若下载分支的话需要加 <font color="dd0000"> -b </font>  + 分支名称 + 下载地址


```sh
$ git clone -b backup git@github.com:shaoshaossm/shaoshaossm.github.io.git
```

![团队协作](https://img-blog.csdnimg.cn/5908936813444e0b932353e491c98862.png)

![跨团队协作](https://img-blog.csdnimg.cn/9f5acf004ed7404d8dc950edfaaa0cb6.png)

#### 团队协作

![添加团队成员](https://img-blog.csdnimg.cn/2630d8e51f16493da7e83f3fa9753efd.png)

![发送邀请](https://img-blog.csdnimg.cn/d47ddf0111aa43de8f69e673946f6f85.png)

### 跨团队协作

- 非本团队的人fork项目到自己的本地
- 对项目文件进行修改
- 点击`pull request`，单击`new pull request`

![new pull request](https://img-blog.csdnimg.cn/61d61a77f423414590444479d159f5d6.png)

![create pull request](https://img-blog.csdnimg.cn/cedc1a99186540bdac0119ec0a3b9cfb.png)

![create pull request](https://img-blog.csdnimg.cn/cf34378f469e474f9753d03a73b16ec5.png)
![merge pull request](https://img-blog.csdnimg.cn/fac6bce1ea0f414c83d80eadcfe3769c.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c6a3947a72f049f2b39631bfbc0c23c7.png)
![confirm merge](https://img-blog.csdnimg.cn/22c577789ec847d28b1b6ab171d2e518.png)









