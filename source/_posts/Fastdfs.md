---
title: FastDFS
top: false
cover: false
toc: true
mathjax: false
date: 2022-04-29 09:49:56
password:
img: https://img-blog.csdnimg.cn/f2b710a784e44bca88dac1cd22fbd089.png
summary: 总结对分布式文件系统FastDFS的基本功能和应用
tags: FastDFS
categories: 框架
---

**分布式文件系统**

![分布式文件系统](https://img-blog.csdnimg.cn/03ce2c7c6952434b9d4aeed3fdbc2b4d.png)

> **优点**：<font color="orange">解决传统方式的单点故障问题，如果某一个节点出现故障还有其他节点可以用来读取和写入文件，可以提供数据的备份避免因磁盘损坏导致的文件丢失，还可以提供扩容的机制，无限增加文件存放的空间上限。</font>

### FastDFS简介

#### FastDFS整体架构

- `FastDFS`文件系统由两大部分构成，一个是客户端，一个是服务端
  - `客户端`通常指我们的程序，比如我们的Java程序去连接FastDFS、操作FastDFS，那我们的Java程序就是一个客户端，FastDFS提供专有API访问，目前提供了C、Java和PHP几种编程语言的API，用来访问FastDFS文件系统。
  - `服务端`由两个部分构成：一个是跟踪器（tracker），一个是存储节点（storage）
    - `跟踪器（tracker）`主要做调度工作，在内存中记录集群中存储节点storage的状态信息，是前端Client和后端存储节点storage的枢纽。因为相关信息全部在内存中，Tracker server的性能非常高，一个较大的集群（比如上百个group）中有3台就足够了。
    - `存储节点（storage）`用于存储文件，包括文件和文件属性（meta data）都保存到存储服务器磁盘上，完成文件管理的所有功能：文件存储、文件同步和提供文件访问等。

#### 安装配置

> 之前centos7中已安装好，这里不再赘述，详情请参考动力节点fastdfs视频或文档，（文档阿里云盘有）

#### 启动关闭

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
# 关闭tracker执行命令
在任意目录下执行：fdfs_trackerd /etc/fdfs/tracker.conf stop
# 关闭storage执行命令
在任意目录下执行：fdfs_storaged /etc/fdfs/storage.conf stop
# 查看FastDFS进程
ps -ef|grep fdfs
```

![查看创建的文件](https://img-blog.csdnimg.cn/dd35296d22e643479998a4ec2947107b.png)

### 分布式文件系统FastDFS的HTTP访问

> 测试之前，需要修改client.conf配置文件，修改两个配置

```sh
cd /etc/fdfs/
vim client.conf
base_path=/opt/fastdfs/client
tracker_server=192.168.174.131:22122
mkdir client
```

![切换目录](https://img-blog.csdnimg.cn/4462ae70cd254b29a0fdf258222eb9ce.png)
![增加代码](https://img-blog.csdnimg.cn/b5ecff3322f74de2b53bd158a3b2d80d.png)

![新建client目录](https://img-blog.csdnimg.cn/499a4ebb36d04090bba30ae129c27fe5.png)

> 我们如何在浏览器中访问呢？
>
> FastDFS提供了一个Nginx扩展模块，利用该模块，我们可以通过Nginx访问已经上传到FastDFS上的文件
>
> <font color="red">Nginx的准备工作详情请参考动力节点fastdfs视频或文档，（文档阿里云盘有）</font>

#### 文件上传

> root目录下新建文件 aaa.txt
>
> 输入上传命令`fdfs_test /etc/fdfs/client.conf upload /root/aaa.txt`

**上传成功详细信息**

![上传信息](https://img-blog.csdnimg.cn/8b2cf8f7c1554a44bac9fc8e3cc40d63.png)

```bash
[root@localhost ~]cd root/
[root@localhost ~]# fdfs_test /etc/fdfs/client.conf upload /root/aaa.txt
This is FastDFS client test program v5.11

Copyright (C) 2008, Happy Fish / YuQing

FastDFS may be copied only under the terms of the GNU General
Public License V3, which may be found in the FastDFS source kit.
Please visit the FastDFS Home Page http://www.csource.org/ 
for more detail.

[2022-04-29 16:02:34] DEBUG - base_path=/opt/fastdfs/client, connect_timeout=30, network_timeout=60, tracker_server_count=1, anti_steal_token=0, anti_steal_secret_key length=0, use_connection_pool=0, g_connection_pool_max_idle_time=3600s, use_storage_id=0, storage server id count: 0

tracker_query_storage_store_list_without_group: 
	server 1. group_name=, ip_addr=192.168.174.131, port=23000

group_name=group1, ip_addr=192.168.174.131, port=23000
storage_upload_by_filename
group_name=group1, remote_filename=M00/00/00/wKiug2Jrm5qASYMgAAAAB-aoIIQ455.txt
source ip address: 192.168.174.131
file timestamp=2022-04-29 16:02:34
file size=7
file crc32=3869778052
example file url: http://192.168.174.131/group1/M00/00/00/wKiug2Jrm5qASYMgAAAAB-aoIIQ455.txt
storage_upload_slave_by_filename
group_name=group1, remote_filename=M00/00/00/wKiug2Jrm5qASYMgAAAAB-aoIIQ455_big.txt
source ip address: 192.168.174.131
file timestamp=2022-04-29 16:02:34
file size=7
file crc32=3869778052
example file url: http://192.168.174.131/group1/M00/00/00/wKiug2Jrm5qASYMgAAAAB-aoIIQ455_big.txt
```

![访问成功](https://img-blog.csdnimg.cn/3a1664e10f5141ef9bdf53130194f8a9.png)

**进入目录查看文件**

```sh
cd /opt/fastdfs/storage/files/data/00/00
```

![查看](https://img-blog.csdnimg.cn/a836464992364ace8a41c2487e74cb49.png)

#### 文件下载

```sh
[root@localhost /]# fdfs_test /etc/fdfs/client.conf download group1 M00/00/00/wKiug2Jrm5qASYMgAAAAB-aoIIQ455.txt
```

![下载成功](https://img-blog.csdnimg.cn/f00fd3cbfd424aa6921937b2d140d07e.png)

#### 文件删除

![删除成功](https://img-blog.csdnimg.cn/ba67e05bc8744440af331d7b2415230e.png)

###  Java操作FastDFS

#### 准备工作

- 从 https://codeload.github.com/happyfish100/fastdfs-client-java/zip/master 上下载FastDFS源代码到本地
- 解压压缩包
- 在目录中cmd，采用maven命令编译成jar安装到本地maven库

#### 上传文件

```java
package com.ssm.fastdf.utils;

import org.csource.common.MyException;
import org.csource.fastdfs.*;

import java.io.IOException;

public class FastDFSUtil {


    /**
     * 文件上传
     */
    public static String [] upload(byte[] buffFile,String fileExtName) {
        TrackerServer ts=null;
        StorageServer ss=null;
        try {
            //读取FastDFS的配置文件用于将所有的tracker的地址读取到内存中
            ClientGlobal.init("fastdfs.conf");
            TrackerClient tc=new TrackerClient();
            ts=tc.getConnection();
            ss=tc.getStoreStorage(ts);
            //定义Storage的客户端对象，需要使用这个对象来完成具体的文件上传 下载和删除操作
            StorageClient sc=new StorageClient(ts,ss);
            /**
             * 文件上传
             * 参数 1 为需要上传的文件的字节数组
             * 参数 2 为需要上传的文件的扩展名
             * 参数 3 为文件的属性文件通常不上传
             * 返回一个String数组 这个数据对我们非常总要必须妥善保管建议存入数据库
             * 数组中的第一个元素为文件所在的组名
             * 数组中的第二个元素为文件所在远程路径名
             */
            String[] result= sc.upload_file(buffFile,fileExtName,null);

            return result;
        } catch (IOException e) {
            e.printStackTrace();
        } catch (MyException e) {
            e.printStackTrace();
        } finally {
            if(ss!=null){
                try {
                    ss.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if(ts!=null){
                try {
                    ts.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return null;
    }

}
```

#### 下载文件

```java
/**
 * 下载文件
 */
public static byte [] download(String groupName,String remoteFilename) {
    TrackerServer ts=null;
    StorageServer ss=null;
    try {
        //读取FastDFS的配置文件用于将所有的tracker的地址读取到内存中
        ClientGlobal.init("fastdfs.conf");
        TrackerClient tc=new TrackerClient();
        ts=tc.getConnection();
        ss=tc.getStoreStorage(ts);
        //定义Storage的客户端对象，需要使用这个对象来完成具体的文件上传 下载和删除操作
        StorageClient sc=new StorageClient(ts,ss);
        /**
         * 文件下载
         * 参数1 需要下载的文件的组名
         * 参数2 需要下载文件的远程文件名
         * 参数3 需要保存的本地文件名
         * 返回一个int类型的数据 返回0 表示文件下载成功其它值表示文件在下载失败
         */

        byte [] buffFile=sc.download_file(groupName,remoteFilename);
        return buffFile;
    } catch (IOException e) {
        e.printStackTrace();
    } catch (MyException e) {
        e.printStackTrace();
    } finally {
        if(ss!=null){
            try {
                ss.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        if(ts!=null){
            try {
                ts.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    return null;
}
```

#### 文件删除

```java
/**
 * 文件删除
 */
public static void delete(String groupName,String remoteFilename) {
    TrackerServer ts=null;
    StorageServer ss=null;
    try {
        //读取FastDFS的配置文件用于将所有的tracker的地址读取到内存中
        ClientGlobal.init("fastdfs.conf");
        TrackerClient tc=new TrackerClient();
        ts=tc.getConnection();
        ss=tc.getStoreStorage(ts);
        //定义Storage的客户端对象，需要使用这个对象来完成具体的文件上传 下载和删除操作
        StorageClient sc=new StorageClient(ts,ss);
        /**
         * 文件删除
         * 参数1 需要删除的文件的组名
         * 参数2 需要删除文件的远程文件名
         * 返回一个int类型的数据 返回0 表示文件删除成功其它值表示文件在删除失败
         */
        int result=sc.delete_file(groupName,remoteFilename);
        System.out.println(result);
    } catch (IOException e) {
        e.printStackTrace();
    } catch (MyException e) {
        e.printStackTrace();
    } finally {
        if(ss!=null){
            try {
                ss.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        if(ts!=null){
            try {
                ts.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }


}
```

### SpringBoot整合FastDFS

#### 目录结构

![目录结构](https://img-blog.csdnimg.cn/9ea880523c4d4b82bb7004a68f39c506.png)

> 创建数据库fastdfs和表

```sql

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for creditor_info
-- ----------------------------
DROP TABLE IF EXISTS `creditor_info`;
CREATE TABLE `creditor_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `real_name` varchar(35) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '债权借款人姓名',
  `id_card` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '债权借款人身份证',
  `address` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '债权借款人地址',
  `sex` int(1) NULL DEFAULT NULL COMMENT '1男2女',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '债权借款人电话',
  `money` decimal(10, 2) NULL DEFAULT NULL COMMENT '债权借款人借款金额',
  `group_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '债权合同所在组',
  `remote_file_path` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '债权合同所在路径',
  `old_filename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件上传前的名字',
  `file_size` bigint(20) NULL DEFAULT NULL COMMENT '文件大小，用于下载文件时提供下载进度',
  `file_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件类型',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

```

![creditor_info](https://img-blog.csdnimg.cn/5162b6576506417f96dbf92d8d88a072.png)

> 新建一个springboot工程

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.7</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.ssm</groupId>
    <artifactId>fastdfsweb</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>03-fastdfs-web</name>
    <description>03-fastdfs-web</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.2.2</version>
        </dependency>
        <dependency>
            <groupId>org.csource</groupId>
            <artifactId>fastdfs-client-java</artifactId>
            <version>1.27-SNAPSHOT</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
            <version>8.0.17</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.mybatis.generator</groupId>
                <artifactId>mybatis-generator-maven-plugin</artifactId>
                <version>1.3.6</version>
                <configuration>
                    <!--配置文件的位置-->
                    <configurationFile>GeneratorMapper.xml</configurationFile>
                    <verbose>true</verbose>
                    <overwrite>true</overwrite>
                </configuration>
            </plugin>
        </plugins>
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
            </resource>
        </resources>
    </build>

</project>
```

- 创建文件`fastdfs.conf`文件内容是fastdfs的tracker地址：`tracker_server=192.168.174.131:22122`

application.properties

```properties
server.port=8008

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/fastdfs?useSSL=false&serverTimezone=GMT%2B8&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=hxl158120

spring.thymeleaf.cache=false
#去掉HTML5语法验证
spring.thymeleaf.mode=LEGACYHTML5
#设置springmvc允许上传的单个文件大小 默认值: 1M
#spring.servlet.multipart.max-file-size=100M
#设置springmvc允许的表单请求中允许上传文件的总大小 默认值:10M
#spring.servlet.multipart.max-request-size=10M
```

- 添加mybatis逆向工程文件`GeneratorMapper.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!-- 指定连接数据库的 JDBC 驱动包所在位置，指定到你本机的完整路径 -->
    <classPathEntry location="F:\javabook\mysql-connector-java-8.0.17.jar"/>
    <!-- 配置 table 表信息内容体，targetRuntime 指定采用 MyBatis3 的版本 -->
    <context id="tables" targetRuntime="MyBatis3">
        <!-- 抑制生成注释，由于生成的注释都是英文的，可以不让它生成 -->
        <commentGenerator>
            <property name="suppressAllComments" value="true"/>
        </commentGenerator>
        <!-- 配置数据库连接信息 -->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/fastdfs?useSSL=false&amp;serverTimezone=UTC"
                        userId="root"
                        password="密码">
        </jdbcConnection>
        <!-- 生成 model 类，targetPackage 指定 model 类的包名， targetProject 指定
        生成的 model 放在 eclipse 的哪个工程下面-->
        <javaModelGenerator targetPackage="com.ssm.fastdf.model"
                            targetProject="src/main/java">
            <property name="enableSubPackages" value="false"/>
            <property name="trimStrings" value="false"/>
        </javaModelGenerator>
        <!-- 生成 MyBatis 的 Mapper.xml 文件，targetPackage 指定 mapper.xml 文件的
        包名， targetProject 指定生成的 mapper.xml 放在 eclipse 的哪个工程下面 -->
        <sqlMapGenerator targetPackage="com.ssm.fastdf.mapper"
                         targetProject="src/main/java">
            <property name="enableSubPackages" value="false"/>
        </sqlMapGenerator>
        <!-- 生成 MyBatis 的 Mapper 接口类文件,targetPackage 指定 Mapper 接口类的包
        名， targetProject 指定生成的 Mapper 接口放在 eclipse 的哪个工程下面 -->
        <javaClientGenerator type="XMLMAPPER"
                             targetPackage="com.ssm.fastdf.mapper" targetProject="src/main/java">
            <property name="enableSubPackages" value="false"/>
        </javaClientGenerator>

        <!-- 数据库表名及对应的 Java 模型类名 -->
        <table tableName="creditor_info" domainObjectName="CreditorInfo"
               enableCountByExample="false"
               enableUpdateByExample="false"
               enableDeleteByExample="false"
               enableSelectByExample="false"
               selectByExampleQueryId="false"/>
    </context>
</generatorConfiguration>
```

![双击生成](https://img-blog.csdnimg.cn/b06c2735a73544d39c42b477e01e8ad4.png)

> 创建`CreditorInfoService`接口
>
> 创建`CreditorInfoServiceImpl`实现类

> 代码实现请参考github：https://github.com/shaoshaossm/fastdfs.git

### FastDFS分布式文件系统集群

TODO
