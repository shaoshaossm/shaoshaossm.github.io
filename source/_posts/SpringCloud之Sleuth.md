---
title: SpringCloud之Sleuth
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-23 17:32:15
password:
img: https://img-blog.csdnimg.cn/8684333b93a54da58a593fbc20db9c62.png
summary: 总结SpringCloud中Sleuth的使用方法--------------------------------
tags: [SpringCloud,Sleuth]
categories: 框架
---

### 下载运行

- SpringCloud从F版起已不需要自己构建Zipkin Server了，只需调用jar包即可

下载地址：`https://repo1.maven.org/maven2/io/zipkin/java/zipkin-server/2.9.4/`

![选择此版本](https://img-blog.csdnimg.cn/0ce1de24a10945119eb39f58cfbc0806.png)

运行：`java -jar zipkin-server-2.9.4-exec.jar`

![运行成功](https://img-blog.csdnimg.cn/9f35e61e277f49b9b435cde817f6c5a7.png)

**运行控制台**

地址：`http://localhost:9411/zipkin/`

![运行界面](https://img-blog.csdnimg.cn/c1bc7491cf5d42fdb36d64e1e9d862bc.png)

**术语**

完整的调用链路

表示一请求链路，一条链路通过Trace ld唯一标识，Span标识发起的请求信息，各span通过parent id关联起来![图解](https://img-blog.csdnimg.cn/1239df473aeb4b009278957f18c1c03d.png)

—条链路通过Trace ld唯一标识，Span标识发起的请求信息，各span通过parent id关联起来。

![图解](https://img-blog.csdnimg.cn/e3928df77dca4345be9c34afd3844cd7.png)

整个链路的依赖关系如下：

![依赖关系](https://img-blog.csdnimg.cn/668a77db4d9846aba92521dfec7251b1.png)

名词解释

- Trace：类似于树结构的Span集合，表示一条调用链路，存在唯一标识
- span：表示调用链路来源，通俗的理解span就是一次请求信息

### Sleuth链路监控展现

**服务提供者cloud-provider-payment8001**

POM

```xml
<!--包含了sleuth+zipkin-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>

```

application.yml

```yml
server:
  port: 8001

spring:
  application:
    name: cloud-payment-service
  zipkin: #<-------------------------------------关键
    base-url: http://localhost:9411
  sleuth: #<-------------------------------------关键
    sampler:
    #采样率值介于 0 到 1 之间，1 则表示全部采集
    probability: 1


  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/springcloud?useSSL=false&serverTimezone=GMT%2B8&allowPublicKeyRetrieval=true
    username: root
    password: 密码
mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.ssm.springcloud.entities

eureka:
  client:
    #表示是否将自己注册进EurekaServer默认为true。
    register-with-eureka: true
    #是否从EurekaServer抓取已有的注册信息，默认为true。单节点无所谓，集群必须设置为true才能配合ribbon使用负载均衡
    fetchRegistry: true
    service-url:
      # 单机版
#      defaultZone: http://localhost:7001/eureka
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka  # 集群版

  instance:
      instance-id: payment8001
      prefer-ip-address: true
      #Eureka客户端向服务端发送心跳的时间间隔，单位为秒(默认是30秒)
      lease-renewal-interval-in-seconds: 1
      #Eureka服务端在收到最后一次心跳后等待时间上限，单位为秒(默认是90秒)，超时将剔除服务
      lease-expiration-duration-in-seconds: 2
```

业务类PaymentController

```java
@RestController
@Slf4j
public class PaymentController {
...

@GetMapping("/payment/zipkin")
public String paymentZipkin() {
    return "hi ,i'am paymentzipkin server fall back，welcome to here, O(∩_∩)O哈哈~";
}   
}
```
3.服务消费者(调用方)

cloue-consumer-order80

POM

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```


YML

```yaml
server:
  port: 80

spring:
  application:
    name: cloud-order-service
  zipkin:
    base-url: http://localhost:9411
  sleuth:
    sampler:
      probability: 1

eureka:
  client:
    #表示是否将自己注册进EurekaServer默认为true。
    register-with-eureka: true
    #是否从EurekaServer抓取已有的注册信息，默认为true。单节点无所谓，集群必须设置为true才能配合ribbon使用负载均衡
    fetchRegistry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka  # 集群版
```

业务类OrderController

```java
// ====================> zipkin+sleuth
@GetMapping("/consumer/payment/zipkin")
public String paymentZipkin()
{
    String result = restTemplate.getForObject("http://localhost:8001"+"/payment/zipkin/", String.class);
    return result;
}
}
```
- 依次启动eureka7001/8001/80 - 80调用8001几次测试下

- 打开浏览器访问: http://localhost:9411

![效果演示](https://img-blog.csdnimg.cn/88af1021876245989e74be685ac628fd.png)


![效果演示](https://img-blog.csdnimg.cn/15ba504ed8a947bfa7825ad9a70c822c.png)
