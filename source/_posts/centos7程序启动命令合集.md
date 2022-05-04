---
title: centos7程序启动命令合集
top: false
cover: false
toc: true
mathjax: true
date: 2021-12-20 22:34:10
password:
summary: 记录centos7一些服务的启动命令合集--------------------------
tags: [centos7,java]
categories: 系统配置
---

```bash

systemctl start docker
docker run -it centos /bin/bash

F:\elasticsearch\elasticsearch-head-master>cnpm install
F:\elasticsearch\elasticsearch-head-master>npm run start
canal  ./startup.sh
清理浏览器缓存 ctrl shift del
下载文件到桌面 sz 文件名
上传文件 rz -y(覆盖)
git@github.com:1600767556/mybatis.git

```

[TOC]

```bash
# 关闭防火墙
systemctl stop firewalld
```

### 通用关闭服务命令

```sh
# 查看pid
ps -ef|grep 服务名
# 关闭服务
kill -9 pid
```

### tomcat9.0.0

```sh
# 切换目录
cd /usr/java/apache-tomcat-9.0.0.M26/bin
# 启动
./startup.sh 
# 查看日志
cd ..
cd logs/
tail -f catalina.out
```

![启动成功](https://img-blog.csdnimg.cn/5a5a3f6f24aa4a36aba1030f9ecb9a6c.png)

![访问页面](https://img-blog.csdnimg.cn/c93a2aba29dd442b907d406d45810e5a.png)

### zookeeper3.4.8

```bash
cd ..
cd usr/java/zookeeper-3.4.8/bin/
# 启动
./zkServer.sh start
./zkCli.sh
```

![启动命令](https://img-blog.csdnimg.cn/da03b1bf0060417a8fd8850e1e8dd2dd.png)

### MySQL8.0.17

```bash
cd usr/java/mysql/bin/
# 启动
./mysqld_safe &
```

![启动结果](https://img-blog.csdnimg.cn/c40d5874cf594c6a85babaaa58336099.png)

### Redis3.2.9

```bash
cd usr/java/redis-3.2.9/src/
# 启动
./redis-server ../redis.conf &
# 指定连接客户端
./redis-cli -a 123456 -h 192.168.174.131
# 关闭
redis-cli -a 123456 -h 192.168.174.131 shutdown
```

![启动结果](https://img-blog.csdnimg.cn/b3bd6fd80b16464e932f276b6976e36b.png)

### Consul1.11.4

```bash
# 启动
consul agent -dev    只能127.0.0.1可以访问
consul agent -dev  -client 0.0.0.0 -ui  指定ip可以访问
```

![Centos7启动](https://img-blog.csdnimg.cn/937e91a6b4dc49cbbd6ced1b2ddbba37.png)

![运行结果](https://img-blog.csdnimg.cn/fb04c57fe10a4a518bda4f336c320826.png)

### rabbitMQ

```sh
cd usr/java/
# 添加用户
[root@rabbitmq1 ebin]# rabbitmqctl add_user admin 111111
Adding user "admin" ...
[root@rabbitmq1 ebin]# rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
Setting permissions for user "admin" in vhost "/" ...
[root@rabbitmq1 ebin]# rabbitmqctl set_user_tags admin administrator
Setting tags for user "admin" to [administrator] ...
# 赋予权限
[root@localhost java]# rabbitmqctl set_permissions -p / admin ".*" ".*" ".*" 
# 启动
[root@localhost java]# rabbitmq-server start &
# 停止服务
rabbitmqctl stop
```

**账号密码**

localhost：guest guest

外部：admin  密码：你懂得

![登录成功](https://img-blog.csdnimg.cn/190ef8096ab14a96ae6541aadec01bfb.png)

![赋予admin权限成功](https://img-blog.csdnimg.cn/3442bcfc01364e8f8c999b1fdc68be91.png)

### zipkin2.9.4

```sh
cd /usr/java/zipbin/
# 启动
java -jar zipkin-server-2.9.4-exec.jar
```

![启动成功](https://img-blog.csdnimg.cn/73878a956bcf490784c3af78506e9e28.png)

![运行界面](https://img-blog.csdnimg.cn/47ca8bee19444d6082197c71c4cfc9b1.png)

### nginx1.18.0

```sh
cd /usr/java/nginx_fdfs/sbin
# 启动 指定配置文件启动
./nginx -c /usr/java/nginx-1.18.0_nacos/conf/nginx.conf
# 处理完请求后关闭
ps -ef | grep nginx
kill -QUIT 主pid
# 暴力关闭
ps -ef | grep nginx
kill -TERM 主pid
# 重启
./nginx -s reload
# 登录地址
http://192.168.174.131/
# nginx Windows版
启动 nginx.exe 关闭:nginx.exe -s stop
```

![aaa](https://img-blog.csdnimg.cn/03bcb38e2cb94676ac445510c382acde.png)

![启动成功](https://img-blog.csdnimg.cn/f164901ae5d04211b08c25aa86b8cb6e.png)

### Sentinel1.8.3

```sh
cd /usr/java/Sentinel-dashboard/
# 启动
java -jar sentinel-dashboard-1.8.3.jar 
# 登录地址
http://192.168.174.131:8080/
```

![登录成功](https://img-blog.csdnimg.cn/c7f3af4c0698452d9dc9b23b9f5242a9.png)

### Nacos1.4.3

```sh
cd /usr/java/nacos/bin TODO
# 三个端口号启动
startup.sh - p 3333
startup.sh - p 4444
startup.sh - p 5555
# 登录地址
http://192.168.174.131:1111/nacos/#/login
```

![启动成功](https://img-blog.csdnimg.cn/c658a6056c654e9fb73fa69b7ed9107c.png)

![登录成功](https://img-blog.csdnimg.cn/5ee0b5df80934a38ab477c664fa17fca.png)

### FastDFS

```sh
# 启动带有Fastdfs模块的Nginx
/usr/java/nginx_fdfs/sbin/nginx -c /usr/java/nginx_fdfs/conf/nginx.conf -t
/usr/java/nginx_fdfs/sbin/nginx -c /usr/java/nginx_fdfs/conf/nginx.conf
# 启动FastDFS的tracker服务
在任意目录下执行：fdfs_trackerd /etc/fdfs/tracker.conf
# 启动FastDFS的storage服务
在任意目录下执行：fdfs_storaged /etc/fdfs/storage.conf
# 重启tracker
fdfs_trackerd /etc/fdfs/tracker.conf restart
# 重启storage
fdfs_storaged /etc/fdfs/storage.conf restart
# 2.5.1	关闭tracker执行命令
在任意目录下执行：fdfs_trackerd /etc/fdfs/tracker.conf stop
# 闭storage执行命令
在任意目录下执行：fdfs_storaged /etc/fdfs/storage.conf stop
# 查看FastDFS进程
ps -ef|grep fdfs
```

![启动](https://img-blog.csdnimg.cn/4592d5bfd68b433db13a704ed114d713.png)

### Jekins

```sh
cd /usr/java/Jekins
# 第一次启动会提示密码
java -jar  jenkins.war --httpPort=8090
# 查看密码的地址
This may also be found at: /root/.jenkins/secrets/initialAdminPassword
# 后台运行
[root@localhost ~]# nohup java -jar  /usr/java/jenkins/jenkins.war >/usr/java/jenkins/jenkins.out &
[root@localhost ~]# cat /root/.jenkins/secrets/initialAdminPassword
```

![启动](https://img-blog.csdnimg.cn/afe38eda51384db1bc68236b9c4cafc8.png)
