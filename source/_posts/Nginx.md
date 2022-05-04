---
title: Nginx
top: false
cover: false
toc: true
mathjax: false
date: 2022-05-02 13:33:40
password:
img: https://img-blog.csdnimg.cn/cd8776d3410a4728829ca484022d9915.png
summary: 总结Nginx相关的基本概念、常用命令和基本配置实例
tags: Nginx
categories: 服务器
---

### Nginx简介

> Nginx ("engine x") 是一个高性能的 HTTP 和反向代理服务器,特点是占有内存少，并发能 力强。

#### 正向代理

> Nginx 不仅可以做反向代理，实现负载均衡。还能用作正向代理来进行上网等功能。 
>
> **正向代理**：如果把局域网外的 Internet 想象成一个巨大的资源库，则局域网中的客户端要访 问 Internet，则需要通过代理服务器来访问，这种代理服务就称为正向代理

![正向代理](https://img-blog.csdnimg.cn/151431a8c482413c80f651fb4c72d30d.png)

#### 反向代理

> **反向代理**：其实客户端对代理是无感知的，因为<font color="orange">客户端不需要任何配置就可以访问，我们只需要将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，在返 回给客户端</font>，此时反向代理服务器和目标服务器对外就是一个服务器，<font color="orange">暴露的是代理服务器 地址，隐藏了真实服务器 IP 地址</font>。

![反向代理](https://img-blog.csdnimg.cn/5d45501538e849338646256797a685c5.png)

#### 负载均衡

> <font color="orange">单个服务器解 决不了，我们增加服务器的数量，然后将请求分发到各个服务器上，将原先请求集中到单个服务器上的情况改为将请求分发到多个服务器上，将负载分发到不同的服务器，也就是我们 所说的负载均衡</font>

![负载均衡](https://img-blog.csdnimg.cn/42d624b438aa4af0891ad7dce4931fa2.png)

#### 动静分离

![动静分离](https://img-blog.csdnimg.cn/f8a1bc49396f44d2805f63c36389263a.png)

### Nginx安装

#### 前提准备

- Nginx的安装需要确定Linux安装相关的几个库，否则配置和编译会出现错误

```sh
yum install gcc openssl openssl-devel pcre pcre-devel zlib zlib-devel -y
```

#### 正式安装

- 解压下载下来的nginx文件，执行命令：`tar -zxvf nginx-1.14.2.tar.gz`
- 切换至解压后的nginx主目录，执行命令：`cd nginx-1.14.2`
- 在nginx主目录nginx-1.14.2下执行命令：`./configure --prefix=/usr/local/nginx `
- （其中--prefix是指定nginx安装路径） 注意:等号左右不要有空格
- 执行命令进行编译：`make`
- 执行命令进行安装：`make install`

安装成功后，可以切换到`/usr/local/nginx`目录下，查看内容

> 我的centos7是在`/usr/java/nginx`目录下（不知道当时为什么改的路径）

![pwd](https://img-blog.csdnimg.cn/af507165e2ab4fe1bdf32c57ae3f837f.png)

> centos7已安装成功，详情请参考尚硅谷或动力节点（上面步骤参考动力节点）nginx视频或文档，文档阿里云盘有

#### 启动

```sh
cd usr/java/nginx/sbin/
# 启动
./nginx -c /usr/java/nginx/conf/nginx.conf
```

![aaa](https://img-blog.csdnimg.cn/03bcb38e2cb94676ac445510c382acde.png)

![启动成功](https://img-blog.csdnimg.cn/786015dd22054117b843f0a62c43bbe9.png)

#### 关闭

```sh
# 命令
cd usr/java/nginx/sbin/
./nginx -s stop
# 处理完请求后关闭
ps -ef | grep nginx
kill -QUIT 主pid
# 暴力关闭
ps -ef | grep nginx
kill -TERM 主pid
```

#### 重启

```sh
cd usr/java/nginx/sbin/
./nginx -s reload
```

#### 其他命令

- 当修改Nginx配置文件后，可以使用Nginx命令进行配置文件语法检查，用于检查Nginx配置文件是否正确

```sh
[root@localhost sbin]# /usr/java/nginx/sbin/nginx -c /usr/java/nginx/conf/nginx.conf -t
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/aff76f14af014d7b901fef5e34a8a95c.png)

- 查看版本号

```sh
# -v （小写的v）显示 nginx 的版本
./nginx -v
# -V （大写的V）显示 nginx 的版本、编译器版本和配置参数
./nginx -V
```

![查看版本号](https://img-blog.csdnimg.cn/5e699438efa446dd8c1bf6397d821379.png)

### Nginx配置文件说明及Nginx主要应用

![核心配置文件](https://img-blog.csdnimg.cn/dcbaa83b64fe47b0adeec75dddfc4f08.png)

#### nginx.conf文件详解

```sh
#配置worker进程运行用户 nobody也是一个linux用户，一般用于启动程序，没有密码
user  nobody;  
#配置工作进程数目，根据硬件调整，通常等于CPU数量或者2倍于CPU数量
worker_processes  1;  

#配置全局错误日志及类型，[debug | info | notice | warn | error | crit]，默认是error
error_log  logs/error.log;  
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

pid        logs/nginx.pid;  #配置进程pid文件 


###====================================================


#配置工作模式和连接数
events {
    worker_connections  1024;  #配置每个worker进程连接数上限，nginx支持的总连接数就等于worker_processes * worker_connections
}

###===================================================


#配置http服务器,利用它的反向代理功能提供负载均衡支持
http {
    #配置nginx支持哪些多媒体类型，可以在conf/mime.types查看支持哪些多媒体类型
    include       mime.types;  
    #默认文件类型 流类型，可以理解为支持任意类型
    default_type  application/octet-stream;  
    #配置日志格式 
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #配置access.log日志及存放路径，并使用上面定义的main日志格式
    #access_log  logs/access.log  main;

    sendfile        on;  #开启高效文件传输模式
    #tcp_nopush     on;  #防止网络阻塞

    #keepalive_timeout  0;
    keepalive_timeout  65;  #长连接超时时间，单位是秒

    #gzip  on;  #开启gzip压缩输出
	
	###-----------------------------------------------
	

    #配置虚拟主机
    server {
        listen       80;  #配置监听端口
        server_name  localhost;  #配置服务名

        #charset koi8-r;  #配置字符集

        #access_log  logs/host.access.log  main;  #配置本虚拟主机的访问日志

	#默认的匹配斜杠/的请求，当访问路径中有斜杠/，会被该location匹配到并进行处理
        location / {
	    #root是配置服务器的默认网站根目录位置，默认为nginx安装主目录下的html目录
            root   html;  
	    #配置首页文件的名称
            index  index.html index.htm;  
        }		

        #error_page  404              /404.html;  #配置404页面
        # redirect server error pages to the static page /50x.html
        #error_page   500 502 503 504  /50x.html;  #配置50x错误页面
        
	#精确匹配
	location = /50x.html {
            root   html;
        }

		#PHP 脚本请求全部转发到Apache处理
        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

		#PHP 脚本请求全部转发到FastCGI处理
        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

		#禁止访问 .htaccess 文件
        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }

	
	#配置另一个虚拟主机
    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

	
	#配置https服务，安全的网络传输协议，加密传输，端口443，运维来配置
	#
    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}

```

> nginx.conf 配置文件分为三部分： 

####  全局块

> 从配置文件开始到 events 块之间的内容，主要会设置一些影响 nginx 服务器整体运行的配置指令，主要包括配 置运行 Nginx 服务器的用户（组）、允许生成的 worker process 数，进程 PID 存放路径、日志存放路径和类型以 及配置文件的引入等。

```json
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;
```

> <font color="orange">比如上面第一行配置的： 这是 Nginx 服务器并发处理服务的关键配置，`worker_processes` 值越大，可以支持的并发处理量也越多，但是会受到硬件、软件等设备的制约。</font>

#### events 块 

> events 块涉及的指令主要影响 Nginx 服务器与用户的网络连接，常用的设置包括是否开启对多 work process  下的网络连接进行序列化，是否允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个 word  process 可以同时支持的最大连接数等。 

```json
events {
    worker_connections  1024;
}
```

> <font color="orange">上述例子就表示每个 `work process `支持的最大连接数为 1024. 这部分的配置对 Nginx 的性能影响较大，在实际中应该灵活配置。</font>

#### http 块

>  这算是 Nginx 服务器配置中最频繁的部分，代理、缓存和日志定义等绝大多数功能和第三方模块的配置都在这里。 需要注意的是：http 块也可以包括 `http `全局块、`server` 块。

**http 全局块**

> http 全局块配置的指令包括文件引入、MIME-TYPE 定义、日志自定义、连接超时时间、单链接请求数上限等

**server 块**

> 这块和虚拟主机有密切关系，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了 节省互联网服务器硬件成本。 每个 http 块可以包括多个 server 块，而每个 server 块就相当于一个虚拟主机。 而每个 server 块也分为全局 server 块，以及可以同时包含多个 locaton 块。
>
>  1、**全局 server 块** 最常见的配置是本虚拟机主机的监听配置和本虚拟主机的名称或 IP 配置。
>
>  2、**location 块** 一个 server 块可以配置多个 location 块。 这块的主要作用是基于 Nginx 服务器接收到的请求字符串（例如 server_name/uri-string），对虚拟主机名称 （也可以是 IP 别名）之外的字符串（例如 前面的 /uri-string）进行匹配，对特定的请求进行处理。地址定向、数据缓 存和应答控制等功能，还有许多第三方模块的配置也在这里进行。

### Nginx配置实例

#### 反向代理（实例一）

> <font color="blue">实现效果：使用 nginx 反向代理，访问 www.123.com 直接跳转到 127.0.0.1:8080</font>

- 启动tomcat
- 通过修改本地 host 文件，将 www.123.com 映射到 127.0.0.1

![host](https://img-blog.csdnimg.cn/281fdceeafc24275927db49ef9c781e7.png)

-  <font color="red">在 nginx.conf 配置文件中增加如下配置</font>

![配置如下](https://img-blog.csdnimg.cn/67ab6962b0214ce39dd0f8e9c7605bab.png)

- 启动Nginx

- 访问成功

![访问成功](https://img-blog.csdnimg.cn/115ad1903027488d9726dbad954bf537.png)

#### 反向代理（实例二）

> 实现效果：使用 nginx 反向代理，根据访问的路径跳转到不同端口的服务中
>
> - nginx 监听端口为 9001， 
>
> - 访问 http://127.0.0.1:9001/edu/ 直接跳转到 127.0.0.1:8081
>
> - 访问 http://127.0.0.1:9001/vod/ 直接跳转到 127.0.0.1:8082

**前提准备**

- 准备两个 tomcat，一个 8001 端口，一个 8002 端口，并准备好测试的页面

**核心配置文件**

- 修改 nginx 的配置文件 在 http 块中添加 server{}

![核心配置](https://img-blog.csdnimg.cn/c32fe97ccea6480a90488de3bfa649db.png)

> 都是老手了，就不再次配置了，<font color="orange">核心在于location后面加路径嘛</font>




