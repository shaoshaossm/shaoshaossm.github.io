---
title: SpringCloudAlibaba之Nacos
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-24 09:22:58
password:
summary: 总结在SpringCloudAlibaba中使用Nacos----------------------------------
tags: [SpringCloudAlibaba,Nacos]
categories: 框架
---

### SpringCloud Alibaba简介

[官网](https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md)

Spring Cloud Alibaba 致力于提供微服务开发的一站式解决方案。此项目包含开发分布式应用微服务的必需组件，方便开发者通过 Spring Cloud 编程模型轻松使用这些组件来开发分布式应用服务。

依托 Spring Cloud Alibaba，您只需要添加一些注解和少量配置，就可以将 Spring Cloud 应用接入阿里微服务解决方案，通过阿里中间件来迅速搭建分布式应用系统。

**能干嘛**

- <font color="purple">服务限流降级</font>：默认支持 WebServlet、WebFlux, OpenFeign、RestTemplate、Spring Cloud Gateway, Zuul, Dubbo 和 RocketMQ
- <font color="purple">限流降级功能的接入</font>：可以在运行时通过控制台实时修改限流降级规则，还支持查看限流降级 Metrics 监控。
- <font color="purple">服务注册与发现</font>：适配 Spring Cloud 服务注册与发现标准，默认集成了 Ribbon 的支持。
- <font color="purple">分布式配置管理</font>：支持分布式系统中的外部化配置，配置更改时自动刷新。
- <font color="purple">消息驱动能力</font>：基于 Spring Cloud Stream 为微服务应用构建消息驱动能力。
- <font color="purple">分布式事务</font>：使用 @GlobalTransactional 注解， 高效并且对业务零侵入地解决分布式事务问题。
- <font color="purple">阿里云对象存储</font>：阿里云提供的海量、安全、低成本、高可靠的云存储服务。支持在任何应用、任何时间、任何地点存储和访问任意类型的数据。
- <font color="purple">分布式任务调度</font>：提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。同时提供分布式的任务执行模型，如网格任务。网格任务支持海量子任务均匀分配到所有 Worker（schedulerx-client）上执行。
- <font color="purple">阿里云短信服务</font>：覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。

如果需要使用已发布的版本，在 `dependencyManagement` 中添加如下配置。

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.2.5.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

**怎么玩**

- `Sentinel`：把流量作为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。
- `Nacos`：一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。
- `RocketMQ`：一款开源的分布式消息系统，基于高可用分布式集群技术，提供低延时的、高可靠的消息发布与订阅服务。
- `Dubbo`：Apache Dubbo™ 是一款高性能 Java RPC 框架。
- `Seata`：阿里巴巴开源产品，一个易于使用的高性能微服务分布式事务解决方案。
- `Alibaba Cloud OSS`: 阿里云对象存储服务（Object Storage Service，简称 OSS），是阿里云提供的海量、安全、低成本、高可靠的云存储服务。您可以在任何应用、任何时间、任何地点存储和访问任意类型的数据。
- `Alibaba Cloud SchedulerX`: 阿里中间件团队开发的一款分布式任务调度产品，提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。
- `Alibaba Cloud SMS`: 覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。Spring Cloud **Alibaba学习资料获取**
  - [官网](https://spring.io/projects/spring-cloud-alibaba#overview)
  - [英文](https://github.com/alibaba/spring-cloud-alibaba)&nbsp;[英文](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html)
  - [中文](https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md)

### Nacos简介和下载

**是什么**

- 一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。
- Nacos: Dynamic Naming and Configuration Service
- Nacos就是注册中心＋配置中心的组合 -> Nacos = Eureka+Config+Bus

**能干嘛**

- 替代Eureka做服务注册中心
- 替代Config做服务配置中心

[官网文档](https://github.com/alibaba/nacos/releases)

### _Nacos安装

- 本地Java8+Maven环境已经OK先
- 从[官网](https://github.com/alibaba/nacos/releases)下载Nacos
- 解压安装包，直接运行bin目录下的startup.cmd
- 命令运行成功后直接访问http://localhost:8848/nacos，默认账号密码都是nacos
- 结果页面

![命令执行](https://img-blog.csdnimg.cn/b9d2f26c0d514f2a83a0fb99a4d1f0f3.png)
![运行界面](https://img-blog.csdnimg.cn/be4ef51330a34ee7bba65834b7b09e3c.png)

### Nacos之服务提供者注册

[官方文档](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring_cloud_alibaba_nacos_discovery)

**new Module - cloudalibaba-provider-payment9001  - cloudalibaba-provider-payment9002**

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

    <artifactId>cloudalibaba-provider-payment9002</artifactId>
    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
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

application.yml

```yaml
server:
  port: 9002

spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #配置Nacos地址

management:
  endpoints:
    web:
      exposure:
        include: '*'
```

PaymentController

```java
@RestController
public class PaymentController {
    @Value("${server.port}")
    private String serverPort;

    @GetMapping(value = "/payment/nacos/{id}")
    public String getPayment(@PathVariable("id") Integer id) {
        return "nacos registry, serverPort: "+ serverPort+"\t id"+id;
    }
}
```

PaymentMain9002

```java
@EnableDiscoveryClient
@SpringBootApplication
public class PaymentMain9002 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain9002.class, args);
    }
}
```

**9001同理仅修改端口号和启动类名称即可**

![注册成功](https://img-blog.csdnimg.cn/ae27595c23b0405d990cc97b29c7b756.png)

**New Module - cloudalibaba-consumer-nacos-order83**

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

    <artifactId>cloudalibaba-consumer-nacos-order83</artifactId>
    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.lun.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0.0-SNAPSHOT</version>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
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

application.yml

```yaml
server:
  port: 83

spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848

#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者)
service-url:
  nacos-user-service: http://nacos-payment-provider
```

ApplicationContextConfig

```java
@Configuration
public class ApplicationContextConfig
{
    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate()
    {
        return new RestTemplate();
    }
}
```

OrderNacosController

```java
@RestController
@Slf4j
public class OrderNacosController {

    @Resource
    private RestTemplate restTemplate;

    @Value("${service-url.nacos-user-service}")
    private String serverURL;

    @GetMapping(value = "/consumer/payment/nacos/{id}")
    public String paymentInfo(@PathVariable("id") Long id)
    {
        return restTemplate.getForObject(serverURL+"/payment/nacos/"+id,String.class);
    }

}
```

OrderNacosMain83

```java
@EnableDiscoveryClient
@SpringBootApplication
public class OrderNacosMain83
{
    public static void main(String[] args)
    {
        SpringApplication.run(OrderNacosMain83.class,args);
    }
}
```

![注册成功](https://img-blog.csdnimg.cn/d3f0f3d1dbef4eef882975a585416ecd.png)

![自带负载均衡](https://img-blog.csdnimg.cn/bde6491f0c1448bea2719fc6268d29a3.png)

### Nacos服务注册中心对比提升

**Nacos全景图**

![Nacos全景图](https://img-blog.csdnimg.cn/50adfc608ebe4af58b43af8293a3b1b0.png)

**Nacos和CAP**

![对比](https://img-blog.csdnimg.cn/b48879acb8a34da2806f829c4ed4276a.png)

**Nacos服务发现实例模型**

![实例模型](https://img-blog.csdnimg.cn/033718a3366c4762b4dc43ac456f2ea2.png)

<font color="red">Nacos支持AP和CP模式的切换</font>

<font color="orange">C是所有节点在同一时间看到的数据是一致的;而A的定义是所有的请求都会收到响应</font>。

何时选择使用何种模式?

—般来说，如果不需要存储服务级别的信息且服务实例是通过nacos-client注册，并能够保持心跳上报，那么就可以选择AP模式。当前主流的服务如Spring cloud和Dubbo服务，都适用于AP模式，AP模式为了服务的可能性而减弱了一致性，因此AP模式下只支持注册临时实例。

如果需要在服务级别编辑或者存储配置信息，那么CP是必须，K8S服务和DNS服务则适用于CP模式。CP模式下则支持注册持久化实例，此时则是以Raft协议为集群运行模式，该模式下注册实例之前必须先注册服务，如果服务不存在，则会返回错误。

切换命令：`curl -X PUT '$NACOS_SERVER:8848/nacos/v1/ns/operator/switches?entry=serverMode&value=CP`

### Nacos之服务配置中心(DataID、Group、Namespace)

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

    <artifactId>cloudalibaba-config-nacos-client3377</artifactId>
    <dependencies>
        <!--nacos-config-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>
        <!--nacos-discovery-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--web + actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--一般基础配置-->
<!--        <dependency>-->
<!--            <groupId>org.springframework.boot</groupId>-->
<!--            <artifactId>spring-boot-devtools</artifactId>-->
<!--            <scope>runtime</scope>-->
<!--            <optional>true</optional>-->
<!--        </dependency>-->
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

YML

Nacos同springcloud-config一样，在项目初始化时，要保证先从配置中心进行配置拉取，拉取配置之后，才能保证项目的正常启动。

springboot中配置文件的加载是存在优先级顺序的，bootstrap优先级高于application

bootstrap.yml

```yaml
# nacos配置
server:
  port: 3377

spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
      config:
        server-addr: localhost:8848 #Nacos作为配置中心地址
        file-extension: yaml #指定yaml格式的配置
        group: DEV_GROUP
        namespace: ba744ac8-8113-47d8-912c-c57781b07c66


# ${spring.application.name}-${spring.profile.active}.${spring.cloud.nacos.config.file-extension}
# nacos-config-client-dev.yaml

# nacos-config-client-test.yaml   ----> config.info
```

application.yml

```yaml
spring:
  profiles:
    active: dev # 表示开发环境
#    active: test # 表示测试环境
    #active: info
```

ConfigClientController

```java
@RestController
@RefreshScope //支持Nacos的动态刷新功能。
public class ConfigClientController
{
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/config/info")
    public String getConfigInfo() {
        return configInfo;
    }

}
```

NacosConfigClientMain3377

```java
@EnableDiscoveryClient
@SpringBootApplication
public class NacosConfigClientMain3377
{
    public static void main(String[] args) {
        SpringApplication.run(NacosConfigClientMain3377.class, args);
    }
}
```

**在Nacos中添加配置信息**

[官方文档](https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html)

说明：之所以需要配置spring.application.name，是因为它是构成Nacos配置管理dataId 字段的一部分。

在 Nacos Spring Cloud中,dataId的完整格式如下：

```sh
${prefix}-${spring-profile.active}.${file-extension}
```

- prefix默认为spring.application.name的值，也可以通过配置项spring.cloud.nacos.config.prefix来配置。
- spring.profile.active即为当前环境对应的 profile，详情可以参考 Spring Boot文档。注意：当spring.profile.active为空时，对应的连接符 - 也将不存在，datald 的拼接格式变成${prefix}.${file-extension}
- file-exetension为配置内容的数据格式，可以通过配置项spring .cloud.nacos.config.file-extension来配置。目前只支持properties和yaml类型。
- 通过Spring Cloud 原生注解@RefreshScope实现配置自动更新。

最后公式：

```sh
${spring.application.name)}-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}
```

![配置信息](https://img-blog.csdnimg.cn/f122913e34174be99acf9cdc8c6fe83f.png)

编辑信息

```yaml
config:
    info: ba744ac8-8113-47d8-912c-c57781b07c66 dev namespace dev group
```

![配置详情](https://img-blog.csdnimg.cn/4b49ef21f0044c71b59e07ba66fff3d8.png)
![配置详情](https://img-blog.csdnimg.cn/de4a3aa6664b43d4b0d5f5f58eb19505.png)
![配置详情](https://img-blog.csdnimg.cn/ffe42525c8e5400baea41f59f18fb24b.png)

**自带动态刷新**

修改下Nacos中的yaml配置文件，再次调用查看配置的接口，就会发现配置已经刷新。

### Nacos集群_架构说明

[官方文档](https://nacos.io/zh-cn/docs/cluster-mode-quick-start.html)

![集群部署架构图](https://img-blog.csdnimg.cn/247bf239428f4843bf74ac8e829fdb54.png)

按照上述，**我们需要mysql数据库**。

- 默认Nacos使用嵌入式数据库实现数据的存储。所以，如果启动多个默认配置下的Nacos节点，数据存储是存在一致性问题的。为了解决这个问题，Nacos采用了集中式存储的方式来支持集群化部署，目前只支持MySQL的存储。

- Nacos支持三种部署模式
  - 单机模式-用于测试和单机试用。
  - 集群模式-用于生产环境，确保高可用。
  - 多集群模式-用于多数据中心场景。

### Nacos持久化切换配置

**Windows**

下载最新版nacos1.4.3

初始化mysq数据库，数据库初始化文件: conf/nacos-mysql.sql

- 新建数据库nacos_config执行acos-mysql.sql文件

修改conf/application.properties文件，增加支持mysql数据源配置（目前只支持mysql)，添加mysql数据源的url、用户名和密码

```properties
spring.datasource.platform=mysql

db.num=1
db.url.0=jdbc:mysql://localhost:3306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useSSL=false&serverTimezone=UTC
db.user=root
db.password=密码
```

启动即可

![测试成功](https://img-blog.csdnimg.cn/1e53e6e3125149ed9a6788225b1a83ff.png)

### Nacos之Linux版本安装

预计需要，1个Nginx+3个nacos注册中心+1个mysql

**Linux服务器上mysql数据库配置**

<font color="orange">和上面的Windows一样</font>

**Linux服务器上nacos的集群配置cluster.conf**

- 在conf文件夹下编辑cluster.conf.example文件

内容

```sh
192.168.111.144:3333
192.168.111.144:4444
192.168.111.144:5555
```

> **注意**，这个IP不能写127.0.0.1，必须是Linux命令`hostname -I`能够识别的IP

**编辑Nacos的启动脚本startup.sh，使它能够接受不同的启动端口**

集群启动，我们希望可以类似其它软件的shell命令，传递不同的端口号启动不同的nacos实例。
命令: ./startup.sh -p 3333表示启动端口号为3333的nacos服务器实例，和上一步的cluster.conf配置的一致。

修改内容

![第一二步](https://img-blog.csdnimg.cn/c36f5beae6bd49efa2e6832504a2fdcd.png)

![第三步](https://img-blog.csdnimg.cn/2bfe3d8b27bf45aaa8e18f2311bb3b72.png)

执行命令`startup.sh - p 端口号`

![启动成功](https://img-blog.csdnimg.cn/c658a6056c654e9fb73fa69b7ed9107c.png)

**Nginx的配置，由它作为负载均衡器**

修改nginx_nacos的配置文件 - nginx.conf

![修改三个地方](https://img-blog.csdnimg.cn/062b54e34d8444aa84e41cb6c23da82d.png)

执行启动命令`./nginx -c /usr/java/nginx-1.18.0_nacos/conf/nginx.conf`

![启动成功](https://img-blog.csdnimg.cn/f48320b6881b4c67a6b76c8fae967e40.png)

登录地址`http://192.168.174.131:1111/nacos/#/login`

![登录成功](https://img-blog.csdnimg.cn/5ee0b5df80934a38ab477c664fa17fca.png)

将9002服务提供者注册进nacos

![注册成功 ](https://img-blog.csdnimg.cn/925801ebe10a4fecaa6ead1acba3639b.png)

**高可用小总结**

![总结](https://img-blog.csdnimg.cn/695310c1771c4cff90fe9d01812e3b19.png)

