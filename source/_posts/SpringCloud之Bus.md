---
title: SpringCloud之Bus
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-22 11:52:47
password:
img: https://img-blog.csdnimg.cn/02cc733f1f9145fa8542c30bebdf903c.png
summary: 总结springcloud中使用bus（RabbitMQ & Kafka）
tags: [SpringCloud,Bus]
categories: 框架 
---

### 概述

- <font color="blue">Spring Cloud Bus配合Spring Cloud Config使用可以实现配置的动态刷新</font>。

- Spring Cloud Bus是用来将分布式系统的节点与轻量级消息系统链接起来的框架，<font color="red">它整合了Java的事件处理机制和消息中间件的功能</font>。Spring Clud Bus目前支持RabbitMQ和Kafka。

  ![图解](https://img-blog.csdnimg.cn/461d0c86eb3b49f99a8ca0f8902a8ecc.png)

  

- Spring Cloud Bus能管理和传播分布式系统间的消息，就像一个分布式执行器，可用于广播状态更改、事件推送等，也可以当作微服务间的通信通道。

![设计思想](https://img-blog.csdnimg.cn/f23e1aae4fcd4163a1d4d2b34d3da2cb.png)

**什么是总线**

​		在微服务架构的系统中，通常会使用轻量级的消息代理来构建一个共用的消息主题，并让系统中所有微服务实例都连接上来。由于该主题中产生的消息会被所有实例监听和消费，所以称它为消息总线。在总线上的各个实例，都可以方便地广播一些需要让其他连接在该主题上的实例都知道的消息。

**基本原理**

​		ConfigClient实例都监听MQ中同一个topic(默认是Spring Cloud Bus)。当一个服务刷新数据的时候，它会把这个信息放入到Topic中，这样其它监听同一Topic的服务就能得到通知，然后去更新自身的配置。

### Bus之RabbitMQ环境配置

- 启动RabbitMQ `[root@localhost java]# rabbitmq-server start &`
- 登录账号：admin 密码：****你懂得
- 输入地址 `http://192.168.174.131:15672/#/`

![登录成功](https://img-blog.csdnimg.cn/c14bd2b22256411c9b7a384d59da43e1.png)

### Bus动态刷新全局广播的设计思想和选型

- 演示广播效果，增加复杂度，再以3355为模板再制作一个3366

#### new module

![目录结构](https://img-blog.csdnimg.cn/ae13fd211385403b957108f07a6a580c.png)

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

    <artifactId>cloud-config-client-3366</artifactId>
    <dependencies>
        <!--添加消息总线RabbitMQ支持-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-bus-amqp</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-config</artifactId>
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

bootstrap.yml

```yml
server:
  port: 3366

spring:
  application:
    name: config-client
  cloud:
    #Config客户端配置
    config:
      label: main #分支名称
      name: config #配置文件名称
      profile: dev #读取后缀名称   上述3个综合：master分支上config-dev.yml的配置文件被读取http://config-3344.com:3344/master/config-dev.yml
      uri: http://localhost:3344 #配置中心地址

  #rabbitmq相关配置 15672是Web管理界面的端口；5672是MQ访问的端口
#  rabbitmq:
#    host: 192.168.174.131
#    port: 15672
#    username: admin
#    password: 密码

#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka

# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

ConfigClientController

```java
@RestController
@RefreshScope
public class ConfigClientController
{
    @Value("${server.port}")
    private String serverPort;

    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/configInfo")
    public String configInfo()
    {
        return "serverPort: "+serverPort+"\t\n\n configInfo: "+configInfo;
    }

}
```

ConfigClientMain3366

```java
@EnableEurekaClient
@SpringBootApplication
public class ConfigClientMain3366
{
    public static void main(String[] args)
    {
        SpringApplication.run(ConfigClientMain3366.class,args);
    }
}
```

### Bus动态刷新全局广播配置实现

**给cloud-config-center-3344配置中心服务端添加消息总线支持**

pom.xml

```xml
<!--添加消息总线RabbitNQ支持-->
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-bus-amap</artifactId>
</dependency>
<dependency>
	<groupId>org-springframework.boot</groupId>
	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

```

bootstrap.yml

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
          uri: git@github.com:zzyybs/springcloud-config.git #GitHub上面的git仓库名字
        ####搜索目录
          search-paths:
            - springcloud-config
      ####读取分支
      label: master
#rabbitmq相关配置<--------------------------
rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest

#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka

##rabbitmq相关配置,暴露bus刷新配置的端点<--------------------------
management:
  endpoints: #暴露bus刷新配置的端点
    web:
      exposure:
        include: 'bus-refresh'

```

#### 设计思想

1.利用消息总线触发一个客户端/bus/refresh,而刷新所有客户端的配置

![设计思想1](https://img-blog.csdnimg.cn/94684fd352564593b0427dfcab91fe1a.png)

2.利用消息总线触发一个服务端ConfigServer的/bus/refresh端点，而刷新所有客户端的配置

![设计思想2](https://img-blog.csdnimg.cn/fdd0d6bb82104d869a7426e61c0e9fa9.png)

图二的架构显然更加适合，图—不适合的原因如下：

打破了微服务的职责单一性，因为微服务本身是业务模块，它本不应该承担配置刷新的职责。

破坏了微服务各节点的对等性。

有一定的局限性。例如，微服务在迁移时，它的网络地址常常会发生变化，此时如果想要做到自动刷新，那就会增加更多的修改。

### Bus动态刷新全局广播配置实现

**给cloud-config-center-3344配置中心服务端添加消息总线支持**

pom.xml

```xml
<!--添加消息总线RabbitNQ支持-->
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-bus-amap</artifactId>
</dependency>
<dependency>
	<groupId>org-springframework.boot</groupId>
	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

```

application.yml

```yaml
server:
  port: 3344

eureka:
  client:
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka
spring:
  application:
    name: cloud-config-center
  cloud:
    config:
      server:
        git:
          uri: git@github.com:shaoshaossm/springcloud-config.git
          search-paths:
            - springcloud-config
      label: main
    #    切记这个一定要开，要不然报405
    bus:
      refresh:
        enabled: true

  rabbitmq:
    host: 192.168.174.131
    port: 5672
    username: admin
    password: 密码
#暴露端点
management:
  endpoints:
    web:
      exposure:
        include: 'bus-refresh'
```

**给cloud-config-client-3355客户端添加消息总线支持**

pom.xml

```xml
<!--添加消息总线RabbitNQ支持-->
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-bus-amap</artifactId>
</dependency>
<dependency>
	<groupId>org-springframework.boot</groupId>
	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

```

bootstrap.yml

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
    bus:
      refresh:
        enabled: true
  #rabbitmq相关配置 15672是Web管理界面的端口；5672是MQ访问的端口<----------------------
  rabbitmq:
    host: 192.168.174.131
    port: 5672
    username: admin
    password: 密码

#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka

# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"

```

**给cloud-config-client-3366客户端添加消息总线支持**

pom.xml

```xml
<!--添加消息总线RabbitNQ支持-->
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-bus-amap</artifactId>
</dependency>
<dependency>
	<groupId>org-springframework.boot</groupId>
	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

```

bootstrap.yml

```yaml
server:
  port: 3366

spring:
  application:
    name: config-client
  cloud:
    #Config客户端配置
    config:
      label: main #分支名称
      name: config #配置文件名称
      profile: dev #读取后缀名称   上述3个综合：master分支上config-dev.yml的配置文件被读取http://config-3344.com:3344/master/config-dev.yml
      uri: http://localhost:3344 #配置中心地址
    bus:
      refresh:
        enabled: true
  #rabbitmq相关配置 15672是Web管理界面的端口；5672是MQ访问的端口<-----------------------
  rabbitmq:
    host: 192.168.174.131
    port: 5672
    username: admin
    password: 密码

#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://localhost:7001/eureka

# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

**测试**

- 启动
  - EurekaMain7001
  - ConfigcenterMain3344
  - ConfigclientMain3355
  - ConfigclicntMain3366

- 修改Github上配置文件内容，增加版本号
- 发送POST请求
  - `curl -X POST "http://localhost:3344/actuator/bus-refresh"`
  - **—次发送，处处生效**

![刷新](https://img-blog.csdnimg.cn/77cc5cad168a40459a38b5cb96101303.png)

- 配置中心
  - http://config-3344.com:3344/config-dev.yml
- 客户端
  - http://localhost:3355/configlnfo
  - http://localhost:3366/configInfo
  - 获取配置信息，发现都已经刷新了

**—次修改，广播通知，处处生效**

![运行成功](https://img-blog.csdnimg.cn/8ccb9d1603b648278d0e517d048e2412.png)

### Bus动态刷新定点通知

- 不想全部通知，只想定点通知
  - 只通知3355
  - 不通知3366

**指定具体某一个实例生效而不是全部**

公式：http://localhost:3344/actuator/bus-refresh/{destination}

/bus/refresh请求不再发送到具体的服务实例上，而是发给config server通过destination参数类指定需要更新配置的服务或实例

**案例**

我们这里以刷新运行在3355端口上的config-client（配置文件中设定的应用名称）为例，只通知3355，不通知3366
`curl -X POST "http://localhost:3344/actuator/bus-refresh/config-client:3355`

![刷新](https://img-blog.csdnimg.cn/5acb19423776424ca0560f9bd40ec694.png)![测试成功](https://img-blog.csdnimg.cn/66e824d7774146a48f223fd23e9bec5b.png)

![通知总结](https://img-blog.csdnimg.cn/0c96205e4c634b4590ecc54c3d9c787b.png)

