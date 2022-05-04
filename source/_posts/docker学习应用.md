---
title: docker学习应用
top: false
cover: false
toc: true
mathjax: true
date: 2021-10-18 22:47:54
password:
summary: 对docker的初步了解及常用命令学习(为了把centos7的运行环境打包出去)
tags: docker
categories: 容器
---

- docker启动命令

```bash
systemctl start docker
```

- 使容器处于后台运行状态

```bash
ctrl p + q
```

- 查看内存状态

```bash
docker stats
```

- 查看本地浏览器运行地址页面

```bash
curl localhost:8080
```

- docker启动容器命令

```bash
# ( --name ssm ) 给容器命名
# -d 后台运行 -p 宿主机端口
docker run -it centos ( --name ssm )/bin/bash
```

- docker启动特定容器命令并进入容器

```bash
docker start c65e128bc615
docker attach c65e128bc615
```

- docker查看进程

```bash
docker ps
```

- docker设置容器和宿主机文件共享

```bash
docker run -it -v /myDataVolume:/dataVolumeContainer centos
```

- docker 检查容器

```bash
docker inspect c65e128bc615
```

- docker 启动tomcat (指定映射端口号)

```bash
docker run -it -p 7777:8080 tomcat02:1.0
```

- docker 关闭正在运行中的容器

```bash
docker stop c65e128bc615 
docker kill c65e128bc615 
```

- docker 批量关闭正在运行中的容器

```bash
docker rm -f $(docker ps -qa)
```

- 下载镜像源

```bash
docker pull centos
```

- 建立一个ssm/centos数据卷 Dockerfile

```bash
# 建立一个文件 Dockerfile 
mkdir Docker 
# 编写内容
FROM centos
VOLUME ["/dataVolumeContainer1","/dataVolumeContainer2"]
CMD echo "finished,------------successful"
CMD /bin/bash
# 构建容器
docker build -f /mydocker/Dockerfile -t ssm/centos .
# 运行容器
docker run -it ssm/centos 
# 进入 dataVolumeContainer1 并创建文件container01.txt
cd dataVolumeContainer1
touch container01.txt
# 另开一个终端
docker ps 
docker inspect 容器id
找到dataVolumeContainer1: /var/lib/docker/volumes/60f8b0b4209fc59b92c2e36f40b7f1c5ccea3032344bcf9a17951ce08cacd423/_data
# 另开一个终端,查看共享文件,并创建container02.txt 测试dataVolumecontainer1中是否有container02.txt
cd /var/lib/docker/volumes/60f8b0b4209fc59b92c2e36f40b7f1c5ccea3032344bcf9a17951ce08cacd423/_data
touch container02.txt
```

- 容器数据卷传递共享

```bash
# 启动 dc01容器
docker run -it --name dc01 ssm/centos
# 创建 dc01_add.txt
cd dataVolumeContainer2
touch dc01_add.txt
# 复制dc01 到 dc02
docker run -it --name dc02 --volumes-from dc01 ssm/centos
touch dc02_add.txt
# 复制dc01 到 dc02
docker run -it --name dc03 --volumes-from dc01 ssm/centos
touch dc03_add.txt
# 回到dc01验证即可
docker attach dc01
# 即使删除dc01,dc02和dc03也数据共享
```

![容器数据卷间传递共享](https://img-blog.csdnimg.cn/fb9c63317cd34ad092dd093eb789166b.png)

- docker运行mysql

```bash
# 第一步 运行mysql容器
docker run -p 12345:3306 --name mysql02 -v /ssmuse/mysql/conf:/etc/mysql/conf.d -v /ssmuse/mysql/logs:/logs -v /ssmuse/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.0.17
# 第二部  进入容器
docker ps
docker exec -it feec4e661b7d /bin/bash
# 第三步 进入mysql
mysql -uroot -p123456
```

- 数据备份

```bash
docker exec mysql 容器id sh -c 'exec mysqldump --all-databases -uroot -p"123456" ' > /ssmuse/all-databases.sql
```

- docker运行redis

```bash
# 第一步 运行redis容器
docker run -p 6379:6379 -v /ssmuse/redis/data:/data -v /ssmuse/myredis/conf/redis.conf:/usr/local/etc/redis/redis.conf -d redis redis-server /usr/local/etc/redis/redis.conf --appendonly yes
# 第二部  进入容器
docker ps
docker exec -it 600e8af12e4a redis-cli

```

- docker 运行redis

```bash
docker run -d --name elasticsearch02 -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx512m" elasticsearch:7.6.2

```

- 登录docker

```bash
# 本地登录
docker login -u19858165529
# 阿里云登录
docker login --username=秋水墨色染ssm registry.cn-hangzhou.aliyuncs.com
```

- 发布镜像到dockerHub

```bash
# 修改镜像标签 (必须为dockerHub用户名+...)
docker tag ssm/centos 19858165529/centos:1.0
# 发布即可
docker push 19858165529/centos
```

- 发布镜像到阿里云 ( [ ]  一定要去掉 )

```bash
$ docker login --username=秋水墨色染ssm registry.cn-hangzhou.aliyuncs.com
$ docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/shaoshaossm/ssm:[镜像版本号]
$ docker push registry.cn-hangzhou.aliyuncs.com/shaoshaossm/ssm:[镜像版本号]

# 本地删除发布的镜像并从阿里云上下载回来
docker rmi -f registry.cn-hangzhou.aliyuncs.com/shaoshaossm/ssm:1.1.0
docker pull  registry.cn-hangzhou.aliyuncs.com/shaoshaossm/ssm:1.1.0
```

- springboot微服务打包Docker

```bash
# 将springboot jar 包和Dockerfile 传到 centos 上 
# Dockerfile内容如下:
FROM java:8
    ADD *.jar app.jar
    EXPOSE 8081
    ENTRYPOINT ["java","-jar","app.jar"]
    
# 构建镜像
docker  build -t ssm777 .
# 启动镜像
docker run -d --name demo -p 8081:8081 ssm777
# 运行测试
curl localhost:8081/say
# 运行结果
Hello SpringBoot!
```

---

- 若出现这种报错,需删除此容器

```bash
# 错误信息
Error response from daemon: Conflict. The container name "/mysql" is already in use by container "19ee5d825ff210ace68011ba7ab6bd6c1cc634e75f0a25a9934c720eab9367a1". You have to remove (or rename) that container to be able to reuse that name.
# 解决办法
docker rm -f 19ee5d825ff210ace68011ba7ab6bd6c1cc634e75f0a25a9934c720eab9367a1
```

- 输入docker命令报错

```shell
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. ...
```

- 原因可能是上一次没有正常退出docker，所以docker没有正常启动，在相应的/var/run/路径下找不到docker进程。解决办法:

```bash
sudo service docker restart
```