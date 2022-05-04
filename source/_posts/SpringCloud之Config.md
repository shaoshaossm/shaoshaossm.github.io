---
title: SpringCloud之Config
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-21 16:28:37
password:
img: https://img-blog.csdnimg.cn/63fb5c4aae2046ac83048dbe180622f1.png
summary: 总结在springcloud中使用config---------------------------------------
tags: [SpringCloud,Config]
categories: 框架
---

### 概述

**分布式系统面临的配置问题**

微服务意味着要将单体应用中的业务拆分成一个个子服务，每个服务的粒度相对较小，因此系统中会出现大量的服务。由于每个服务都需要必要的配置信息才能运行，所以一套集中式的、动态的配置管理设施是必不可少的。

SpringCloud提供了ConfigServer来解决这个问题，我们每一个微服务自己带着一个application.yml，上百个配置文件的管理.……

SpringCloud Config为微服务架构中的微服务提供集中化的外部配置支持，配置服务器为<font color="orange">各个不同微服务应用</font>的所有环境提供了一个<font color="orange">中心化的外部配置</font>。

![图解](https://img-blog.csdnimg.cn/bb3496cd42ac49d3b158a5d624283eb3.png)

**怎么玩**

- SpringCloud Config分为<font color="orange">服务端和客户端两部分</font>。
  - 服务端也称为<font color="orange">分布式配置中心，它是一个独立的微服务应用</font>，用来连接配置服务器并为客户端提供获取配置信息，加密/解密信息等访问接口。
  - 客户端则是通过指定的配置中心来管理应用资源，以及与业务相关的配置内容，并在启动的时候从配置中心获取和加载配置信息配置服务器默认采用git来存储配置信息，这样就有助于对环境配置进行版本管理，并且可以通过git客户端工具来方便的管理和访问配置内容。

**能干嘛**

- 集中管理配置文件
- 不同环境不同配置，动态化的配置更新，分环境部署比如dev/test/prod/beta/release
- 运行期间动态调整配置，不再需要在每个服务部署的机器上编写配置文件，服务会向配置中心统一拉取配置自己的信息
- 当配置发生变动时，服务不需要重启即可感知到配置的变化并应用新的配置
- 将配置信息以REST接口的形式暴露 - post/crul访问刷新即可…
  **与GitHub整合配置**

由于SpringCloud Config默认使用Git来存储配置文件(也有其它方式,比如支持SVN和本地文件)，但最推荐的还是Git，而且使用的是http/https访问的形式。

[官网](https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.1.RELEASE/reference/html/)

### Config配置总控中心搭建(服务端)

在自己的github上新建一个名为springcloud-config的新Repository,选择readm.md。

clone配置文件` git clone git@github.com:zzyybs/springcloud-config.git`

![git clone](https://img-blog.csdnimg.cn/372be261195a4b4684bdf1b1628b3d4f.png)

上传文件到自己的仓库中

![springcloud-config](https://img-blog.csdnimg.cn/001e623c4f384b5284547f1aeaa45835.png)

- config-dev.yml

```yaml
config:
  info: "master branch,springcloud-config/config-dev.yml version=7"
```

- config-prod.yml

```yaml
config:
  info: "master branch,springcloud-config/config-prod.yml version=1"
```

- config-test.yml

```yaml
config:
  info: "master branch,springcloud-config/config-test.yml version=1" 
```

#### new module

![目录结构](https://img-blog.csdnimg.cn/97c770af31db46849d1dcab60a21f810.png)

pom.xml

```xml
 <dependencies>
        <!--添加消息总线RabbitMQ支持-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-bus-amqp</artifactId>
        </dependency>
                         <!--config-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-config-server</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

```

application.yml

```yaml
server:
  port: 3344

spring:
  application:
    name:  cloud-config-center #注册进Eureka服务器的微服务名
  cloud:
    config:
      server:
        git:
          uri: git@github.com:shaoshaossm/springcloud-config.git #GitHub上面的git仓库名字
          ####搜索目录
          search-paths:
            - springcloud-config
      ####读取分支
      label: main

#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka

```

ConfigCenterMain3344

```java
@SpringBootApplication
@EnableConfigServer
public class ConfigCenterMain3344 {
    public static void main(String[] args) {
        SpringApplication.run(ConfigCenterMain3344.class, args);
    }
}

```

windows下修改hosts文件，增加映射 `C:\Windows\System32\drivers\etc` (不修改的话用localhost也行)

```sh
127.0.0.1 config-3344.com
```

浏览器访问 http://config-3344.com:3344/main/config-dev.yml

![测试成功](https://img-blog.csdnimg.cn/f67ce1d506ac43a0b072a732d09a16a1.png)

- [官方文档](https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.1.RELEASE/reference/html/#_quick_start)
- /{label}/{application}-{profile}.yml（推荐）
  - label：分支(branch)
  - name：服务名
  - profiles：环境(dev/test/prod)

成功实现了用SpringCloud Config通过GitHub获取配置信息

### Config客户端配置与测试

#### new module

![目录结构](https://img-blog.csdnimg.cn/6c145d42a4374769a07f151ad67a0ada.png)

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springcloud2022</artifactId>
        <groupId>com.ssm.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-config-center-3344</artifactId>
    <dependencies>
        <!--添加消息总线RabbitMQ支持-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-bus-amqp</artifactId>
        </dependency>
        <!--config-->
        <dependency>

            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-config-server</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>


</project>
```

**bootstrap.yml**

- applicaiton.yml是用户级的资源配置项。

- bootstrap.yml是系统级的，<font color="red">优先级更加高</font>。

- Spring Cloud会创建一个Bootstrap Context，作为Spring应用的Application Context的<font color="red">父上下文</font>。

- 初始化的时候，BootstrapContext负责从外部源加载配置属性并解析配置。这两个上下文共享一个从外部获取的Environment。

- Bootstrap属性有高优先级，默认情况下，它们不会被本地配置覆盖。Bootstrap context和Application Context有着不同的约定，所以新增了一个bootstrap.yml文件，保证Bootstrap Context和Application Context配置的分离。

- <font color="red">要将Client模块下的application.yml文件改为bootstrap.yml,这是很关键的</font>，因为bootstrap.yml是比application.yml先加载的。bootstrap.yml优先级高于application.yml。

```yaml
server:
  port: 3355

spring:
  application:
    name: config-client
  cloud:
    #Config客户端配置
    config:
      label: main #分支名称
      name: config #配置文件名称
      profile: dev #读取后缀名称   上述3个综合：master分支上config-dev.yml的配置文件被读取http://config-3344.com:3344/master/config-dev.yml
      uri: http://localhost:3344 #配置中心地址k


#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka
```

ConfigClientController

```java
@RestController
@RefreshScope
public class ConfigClientController
{
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/configInfo")
    public String getConfigInfo()
    {
        return configInfo;
    }
}
```

ConfigClientMain3355

```java
@EnableEurekaClient
@SpringBootApplication
public class ConfigClientMain3355
{
    public static void main(String[] args) {
        SpringApplication.run(ConfigClientMain3355.class, args);
    }
}
```

#### 测试

- http://config-3344.com:3344/main/config-dev.yml
- http://localhost:3355/configInfo

![http://config-3344.com:3344/main/config-dev.yml](https://img-blog.csdnimg.cn/2ed43028332847899b7c7ebcbd5fab6c.png)

![http://localhost:3355/configInfo](https://img-blog.csdnimg.cn/92fdaaa745d84ab1a2cb062ee5cea508.png)

成功实现了客户端3355访问SpringCloud Config3344通过GitHub获取配置信息可题随时而来

- 分布式配置的动态刷新问题
  - Linux运维修改GitHub上的配置文件内容做调整
  - 刷新3344，发现ConfigServer配置中心立刻响应
  - 刷新3355，发现ConfigClient客户端没有任何响应
  - 3355没有变化除非自己重启或者重新加载

### Config动态刷新之手动版

**动态刷新步骤**：

修改YML，添加暴露监控端口配置：

```yaml
# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"

```

添加 @RefreshScope业务类Controller修改

```java
import org.springframework.cloud.context.config.annotation.RefreshScope;
...
@RestController
@RefreshScope//<-----
public class ConfigClientController
{
...
}

```

刷新一下3355配置中心服务端 `curl -X POST "http://localhost:3355/actuator/refresh" `

![刷新](https://img-blog.csdnimg.cn/9ca8436d5e68455f833e82682d94ed11.png)

#### 测试

![测试成功](https://img-blog.csdnimg.cn/04384509adf844e6a144e2ae2f4aa31b.png)

> 避免了服务重启
