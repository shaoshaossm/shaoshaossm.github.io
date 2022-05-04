---
title: SpringCloud之Consul
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-17 08:45:06
password:
img: https://img-blog.csdnimg.cn/d5a77e59770d49848be4c7c84cccbf7b.png
summary: 总结SpringCloud中使用Consul-------------------------------------
tags: [SpringCloud,Consul]
categories: 框架
---

### 简介

[Consul官网](https://www.consul.io/)

​		Consul是一个服务网格解决方案，它提供了一个功能齐全的控制平面，具有服务发现、配置和分段功能。这些特性中的每一个都可以根据需要单独使用，也可以一起用于构建全服务网格。Consul需要一个数据平面，并支持代理和本机集成模型。Consul船与一个简单的内置代理，使一切工作的开箱即用，但也支持第三方代理集成，如Envoy。

- 服务发现 - 提供HTTP和DNS两种发现方式。
- 健康监测 - 支持多种方式，HTTP、TCP、Docker、Shell脚本定制化
- KV存储 - Key、Value的存储方式
- 多数据中心 - Consul支持多数据中心
- 可视化Web界面

### 安装

[Consul下载地址](https://www.consul.io/downloads)

#### centos7

```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
sudo yum -y install consul
# 启动
consul agent -dev    只能127.0.0.1可以访问
consul agent -dev  -client 0.0.0.0 -ui  指定ip可以访问
```

![安装完成](https://img-blog.csdnimg.cn/397e1b86a38041a1b02f21720564cb90.png)

![Centos7启动](https://img-blog.csdnimg.cn/937e91a6b4dc49cbbd6ced1b2ddbba37.png)

![运行结果](https://img-blog.csdnimg.cn/fb04c57fe10a4a518bda4f336c320826.png)

#### Windows

![Wiondows启动](https://img-blog.csdnimg.cn/a03a0ab8a3ce4df58075eb4407c313aa.png)

- 运行地址：http://localhost:8500/ui/dc1/services

![运行结果](https://img-blog.csdnimg.cn/ff5874220dbe4061b59638205dab7115.png)

### 项目构建（服务提供者）

![目录结构](https://img-blog.csdnimg.cn/66c6071687324da1b9d11cf72604144b.png)

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

    <artifactId>cloud-providerconsul-payment8006</artifactId>

    <dependencies>

        <!--SpringCloud consul-server -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
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
###consul服务端口号
server:
  port: 8006

spring:
  application:
    name: consul-provider-payment
  ####consul注册中心地址
  cloud:
    consul:
      host: 192.168.174.131
      port: 8500
      discovery:
        #hostname: 192.168.174.131
        service-name: ${spring.application.name}
        heartbeat:
          enabled: true
        prefer-ip-address: true
```

PaymentController

```java
@RestController
@Slf4j
public class PaymentController
{
    @Value("${server.port}")
    private String serverPort;

    @RequestMapping(value = "/payment/consul")
    public String paymentconsul()
    {
        return "springcloud with consul: "+serverPort+"\t"+ UUID.randomUUID().toString();
    }
}
```

PaymentMain8006

```java
@SpringBootApplication
@EnableDiscoveryClient
public class PaymentMain8006 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain8006.class,args);
    }
}
```

![地址验证](https://img-blog.csdnimg.cn/1d1c14cad2c44c0aa05164500790d962.png)

- http://192.168.174.131:8500/ui/dc1/services

![服务注册](https://img-blog.csdnimg.cn/272ace8fead445709028b30b359a7fb3.png)

### 项目搭建 （服务消费者）

![目录结构](https://img-blog.csdnimg.cn/d0cc9c550c9f41c58906f131d4ba9aac.png)

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

    <artifactId>cloud-consumerconsul-order80</artifactId>
    <dependencies>

        <!--SpringCloud consul-server -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
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
#consul服务端口号
server:
  port: 80

spring:
  application:
    name: cloud-consumer-order
  ####consul注册中心地址
  cloud:
    consul:
      host: 192.168.174.131
      port: 8500
      discovery:
        #hostname: 192.168.174.131
        service-name: ${spring.application.name}
        heartbeat:
          enabled: true
        prefer-ip-address: true
```

ApplicationContextConfig

```java
@Configuration
public class ApplicationContextConfig {
    @Bean
    @LoadBalanced
    public RestTemplate getResTemplate() {
        return new RestTemplate();
    }

}
```

OrderConsulController

```java
@RestController
public class OrderConsulController
{
    public static final String INVOKE_URL = "http://consul-provider-payment";

    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping(value = "/consumer/payment/consul")
    public String paymentInfo()
    {
        String result = restTemplate.getForObject(INVOKE_URL+"/payment/consul", String.class);
        System.out.println("消费者调用支付服务(consul)--->result:" + result);
        return result;
    }

}
```

OrderConsulMain80

```java
@SpringBootApplication
public class OrderConsulMain80 {
    public static void main(String[] args) {
        SpringApplication.run(OrderConsulMain80.class,args);
    }
}
```

![地址测试](https://img-blog.csdnimg.cn/0b8ebdd7e83b47e3beafb7a9ff0c05a6.png)

![运行结果](https://img-blog.csdnimg.cn/a38210b0293a49e3a237eb872249dab0.png)

### 三个注册中心异同点

| 组件名    | 语言CAP | 服务健康检查 | 对外暴露接口 | Spring Cloud集成 |
| --------- | ------- | ------------ | ------------ | ---------------- |
| Eureka    | Java    | AP           | 可配支持     | HTTP             |
| Consul    | Go      | CP           | 支持         | HTTP/DNS         |
| Zookeeper | Java    | CP           | 支持客户端   | 已集成           |

CAP：

C：Consistency (强一致性)

A：Availability (可用性)

P：Partition tolerance （分区容错性)

**最多只能同时较好的满足两个**。

CAP理论的核心是：<font color="red">一个分布式系统不可能同时很好的满足一致性，可用性和分区容错性这三个需求。</font>

因此，根据CAP原理将NoSQL数据库分成了满足CA原则、满足CP原则和满足AP原则三大类:

CA - 单点集群，满足—致性，可用性的系统，通常在可扩展性上不太强大。
CP - 满足一致性，分区容忍必的系统，通常性能不是特别高。
AP - 满足可用性，分区容忍性的系统，通常可能对一致性要求低一些。

---

- AP架构（Eureka）

当网络分区出现后，为了保证可用性，系统B可以返回旧值，保证系统的可用性。

结论：违背了一致性C的要求，只满足可用性和分区容错，即AP

- CP架构（ZooKeeper/Consul）

当网络分区出现后，为了保证一致性，就必须拒接请求，否则无法保证一致性。

结论：违背了可用性A的要求，只满足一致性和分区容错，即CP。

CP 与 AP 对立同一的矛盾关系。

