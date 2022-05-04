---
title: 自动化部署Jenkins
top: false
cover: false
toc: true
mathjax: false
date: 2022-04-13 13:46:04
password:
img: https://img-blog.csdnimg.cn/60993392df7341889e1366463ec03117.png
summary: 总结从自动化部署Jenkins从环境配置到项目的开发
tags: jekins
categories: 自动化
---

### 安装

[下载地址](https://www.jenkins.io/download/thank-you-downloading-windows-installer-stable/)

> 安装过程中会测试8080端口号是否被占用，提示java8在未来不在支持，建议选择java11

- 进入网站localhost：8080
- 输入管理员密码（在系统提示的位置）：cc1518c3ac944782b903204c9d37ca2a
- 跳过插件安装
- 创建用户admin

> 版本2.33.23

![创建用户](https://img-blog.csdnimg.cn/735c418ac2aa489bb4fc642fcc4e678d.png)

![登录成功](https://img-blog.csdnimg.cn/8b808898e1e643e59230b626fd7bb18a.png)

![全局配置](https://img-blog.csdnimg.cn/c927f25741ef44f2b518e402bc35dbcd.png)

#### 修改工作空间

在F盘新建文件夹JenkinsWorkspace

![修改jekins.xml](https://img-blog.csdnimg.cn/c77b91926e5b4c709c132d0090e4fb2b.png)

![F:\JekinsWorkspace](https://img-blog.csdnimg.cn/25a54f550aea4966a51d5df392aea9e4.png)

- 重新登录localhost：8080输入密码：298550ec7420427ca4675e5aa531b184
- 然后和上面安装操作一样即可

![更改成功](https://img-blog.csdnimg.cn/de96ceabc3f2491bb1832a00e4f5aefe.png)

#### 更改jekins插件为国内地址

1. [清华源地址](http://mirror.esuni.jp/jenkins/updates/update-center.json)

Manage Jenkins->Plugin Manager->Advanced->Update Site

![更改地址](https://img-blog.csdnimg.cn/923329ea04dd4a3daad57574d4ee38a6.png)

2. 修改jenkins/updetes/default.json文件
   ①把：“http://www.google.com/”全部替换成“http://www.baidu.com/”
   ②把：“https://updates.jenkins.io/download”全部替换成 “http://mirrors.tuna.tsinghua.edu.cn/jenkins”

3. 重启jenkins服务即可
4. 搜索要安装的插件instal without restart

![测试安装git](https://img-blog.csdnimg.cn/6f89225d65a94342b912a00b374b1d3f.png)

#### war包形式安装jekins

[war包下载地址](https://www.jenkins.io/download/)

> 在war包下载目录命令行输入`java -jar  jenkins.war --httpPort=端口号`
>
> centos7同理
>
> 用户名：admin
>
> 密码：

> <font color="orange">如果忘记密码并且里面没有重要的东西的话：删除目录：rm -rf /root/.jenkins/ 重新启动jenkins即可</font>

![运行成功](https://img-blog.csdnimg.cn/e5e97cd4190d432fa8a3057c2ac5fb5d.png)

![启动](https://img-blog.csdnimg.cn/afe38eda51384db1bc68236b9c4cafc8.png)



### jenkins中创建job并下载git代码

![New Item](https://img-blog.csdnimg.cn/0a63797c34074de1b014c3f1c07b7427.png)

> 下一步输入名称并选择创建方式，这里选择的是free style

![General](https://img-blog.csdnimg.cn/73fb26f0a4084446a5fbbefbd975638b.png)
![git仓库](https://img-blog.csdnimg.cn/49bf0e144dc54ed682bbbd72bbaca9f0.png)
![Build Now](https://img-blog.csdnimg.cn/769ac8a1918f4b5db72f4f800f2e6144.png)
![查看控制台Succsee](https://img-blog.csdnimg.cn/3a7fe549660848ec96166d73ef60b6b6.png)

### 配置定时任务

 ![进入Configure](https://img-blog.csdnimg.cn/dbd9d60591f34e1292273eebcb52158f.png)

![制定任务](https://img-blog.csdnimg.cn/2fccacd9df7e4781861fb4bfadbd70f3.png)

### 运行脚本

![输入cmd命令脚本执行文件](https://img-blog.csdnimg.cn/200cca62145744128d77f34b0466ba1a.png)

### 展示html测试报告

安装插件 HTML Publisher

> **执行能够生成html文件的shell脚本**

![add](https://img-blog.csdnimg.cn/d869f144477c436e91ef6932a5b31dbb.png)

- HTML directory to archive 是上面生成html报告的文件夹地址：report
- Index page[s] 报告的名称：result.html
- Report title 显示在jenkins左侧的名称，默认：HTML Report

再次Build Now

![生成报告](https://img-blog.csdnimg.cn/1d8fe191097346adafb9a4d39d65e62f.png)

查看报告显示丢失了css样式

![执行脚本](https://img-blog.csdnimg.cn/cb24f98aa84f4e6381d2b81482db9933.png)

`System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")`

> 执行完成后，需要重新构建下job才会生效。但是这种办法只是一个临时解决方案，重启jenkins后，这个问题又会出现

**Groovy 插件**

要解决上面的问题，需要安装 `Startup Trigger` 和 `Groovy` 插件

> 本地需要有groovy执行环境

- 在Job配置页面， 在构建触发器的时候勾选：Build when job nodes start

![构建触发器](https://img-blog.csdnimg.cn/8ee444a515bb43ce86ee57769b640cd1.png)

- 在Job配置页面，增加构建步骤Execute system Groovy script

![Execute](https://img-blog.csdnimg.cn/67ed1988f3b344638bf193b6071be418.png)

### 邮件配置和发送

**默认配置**

![默认配置](https://img-blog.csdnimg.cn/6641796dda464ace8cd2a00a188ab85e.png)

**安装插件Email Extension配置**

#### 系统配置

进入configure system

![发件人邮箱](https://img-blog.csdnimg.cn/ddc8fab0c8fa4297a203bdfe8b9853c4.png)

![Extend E-mail Nofification](https://img-blog.csdnimg.cn/b1b16d21d89f4e6aaae51b8334def6ee.png)

> 点击高级，add-Jenkins

![username && password](https://img-blog.csdnimg.cn/076e835794af484c80deeaa80110e7cd.png)

![获取密码](https://img-blog.csdnimg.cn/b6b9f3730d794517b82199a46bcb2758.png)

> 密码：mtfzrkdyojgwhccc


![add](https://img-blog.csdnimg.cn/cd75fbedbebd4b96aa6521b0076c8090.png)

> 删除Jenkins默认邮件中的所有配置

![Editable Email Notification](https://img-blog.csdnimg.cn/5904aca7af834b7b8f43d27d3b27a92e.png)

![清空默认配置](https://img-blog.csdnimg.cn/2e2bb1155cdc45009ccaf7d2cb1ef516.png)

#### job任务配置邮件通知

![输入内容](https://img-blog.csdnimg.cn/79e7eb799f3f4c8d9234c3263b339185.png)

> 翻到最下面点击高级设置

![advance settings](https://img-blog.csdnimg.cn/b79a8821a31e4d65987213e7621b35b3.png)

![Always](https://img-blog.csdnimg.cn/632feafd63524d4d957ce41c0070d788.png)

![无需任何配置](https://img-blog.csdnimg.cn/5d5faaf120364f649749526016dc7440.png)

![build now success](https://img-blog.csdnimg.cn/b8f35f94fe1e4824b5eb5294fc813d4f.png)

#### 参考文章

[参考文章](https://blog.csdn.net/gongwei1121355014/article/details/121720234)

TODO
