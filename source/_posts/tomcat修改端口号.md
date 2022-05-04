---
title: tomcat修改端口号
top: false
cover: false
toc: true
mathjax: false
date: 2022-05-02 20:26:42
password:
img: https://img-blog.csdnimg.cn/8a4095c490094c95b8236d6159023b73.png
summary: 总结tomcat修改端口号，实现在同一台服务器上开启不同的tomcat
tags: tomcat
categories: 服务器
---

- 进入tomcat配置文件server.xml

```sh
cd /usr/java/apache-tomcat-9.0.13_3/conf
```

- 编辑server.xml

```
vim server.xml
```

- 修改三个地方即可

```xml
<Server port="8007" shutdown="SHUTDOWN">
<Connector port="8082" protocol="HTTP/1.1"
<Connector port="8011" protocol="AJP/1.3" redirectPort="8443" />           
```

![两个tomcat配置文件对比](https://img-blog.csdnimg.cn/9ee3c2b1d50a4ca29be5043682427129.png)
