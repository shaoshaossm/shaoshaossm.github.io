---
title: SpringCloud之OpenFeign
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-18 13:12:36
password:
img: https://img-blog.csdnimg.cn/1bf5ea7d7af04fdca544e9c9c599275b.png
summary: 总结springcloud中使用openfeign--------------------------------------
tags: [SpringCloud,OpenFeign]
categories: 框架
---

### 简介

[GitHub](https://github.com/spring-cloud/spring-cloud-openfeign)

- Feign是一个声明式的web服务客户端，让编写web服务客户端变得非常容易，**只需创建一个接口并在接口上添加注解即可**

![image-20220318131601183](C:\Users\shaoshao\AppData\Roaming\Typora\typora-user-images\image-20220318131601183.png)

- <font color="blue">Feign旨在使编写Java Http客户端变得更容易。</font>
  
  - 前面在使用Ribbon+RestTemplate时，利用RestTemplate对http请求的封装处理，形成了一套模版化的调用方法。但是在实际开发中，由于对服务依赖的调用可能不止一处，<font color="red">往往一个接口会被多处调用，所以通常都会针对每个微服务自行封装一些客户端类来包装这些依赖服务的调用。</font>所以，Feign在此基础上做了进一步封装，由他来帮助我们定义和实现依赖服务接口的定义。在Feign的实现下，<font color="red">我们只需创建一个接口并使用注解的方式来配置它(以前是Dao接口上面标注Mapper注解,现在是一个微服务接口上面标注一个Feign注解即可)，</font>即可完成对服务提供方的接口绑定，简化了使用Spring cloud Ribbon时，自动封装服务调用客户端的开发量。
  
- <font color="blue">Feign集成了Ribbon</font>
  
  - 利用Ribbon维护了Payment的服务列表信息，并且通过轮询实现了客户端的负载均衡。而与Ribbon不同的是，<font color="red">通过feign只需要定义服务绑定接口且以声明式的方法，</font>优雅而简单的实现了服务调用。
  
- <font color="blue">Feign和OpenFeign两者区别</font>
  
  - `Feign`是Spring Cloud组件中的一个轻量级RESTful的HTTP服务客户端Feign内置了Ribbon，用来做客户端负载均衡，去调用服务注册中心的服务。Feign的使用方式是:使用Feign的注解定义接口，调用这个接口，就可以调用服务注册中心的服务
  

 ```xml
 <dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-feign</artifactId>
 </dependency>
 ```

  - `OpenFeign`是Spring Cloud在Feign的基础上支持了SpringMVC的注解，如@RequesMapping等等。OpenFeign的@Feignclient可以解析SpringMVc的@RequestMapping注解下的接口，并通过动态代理的方式产生实现类，实现类中做负载均衡并调用其他服务。

  ```xml
  <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-openfeign</artifactId>
  </dependency>
  ```

![Feign vs OpenFeign](https://img-blog.csdnimg.cn/f4b5bd0ef6b84a8f83da9bc01b31a9be.png)

  - 用在于消费端


### 项目搭建（消费端）

- 微服务调用接口+@FeignClient

![目录结构](https://img-blog.csdnimg.cn/95368b1f9a254d6b9808c04c76be0621.png)


#### new Module

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
  
      <artifactId>cloud-consumer-feign-order80</artifactId>
  
      <!--openfeign-->
      <dependencies>
          <dependency>
              <groupId>org.springframework.cloud</groupId>
              <artifactId>spring-cloud-starter-openfeign</artifactId>
          </dependency>
          <dependency>
              <groupId>org.springframework.cloud</groupId>
              <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
          </dependency>
          <dependency><!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
              <groupId>com.ssm.springcloud</groupId>
              <artifactId>cloud-api-commons</artifactId>
              <version>${project.version}</version>
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

application.yml

  ```yaml
  server:
    port: 80
  eureka:
    client:
      register-with-eureka: false
      service-url:
        defaultZone: http://eureka7001.com:7001/eureka, http://eureka7002.com:7002/eureka
  ```

PaymentService

  ```java
  @Component
  @FeignClient(value = "Cloud-PAYMENT-SERVICE")
  public interface PaymentService {
  
      @GetMapping(value = "/payment/get/{id}")
      public CommonResult getPaymentById(@PathVariable("id") Long id);
  }
  ```

OderFeignController

```java
@RestController
public class OderFeignController {

    @Resource
    private PaymentService paymentService;

    @GetMapping(value = "/consumer/payment/get/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id){
        return paymentService.getPaymentById(id);
    }
}
```

![运行结果](https://img-blog.csdnimg.cn/3fa851f5bc7a440595d2191be167070e.png)
![运行结果](https://img-blog.csdnimg.cn/253159a116b942c1a24b89a6f0f05b68.png)

- <font color="red">Feign自带负载均衡功能</font>

### Feign超时控制

#### 代码编写

PaymentController 8001 上添加超时方法

```java
@GetMapping(value = "/payment/feign/timeout")
public String paymentFeignTimeout(){
    try { TimeUnit.SECONDS.sleep(3); }catch (Exception e) {e.printStackTrace();}
    return serverPort;
}
```

服务消费方80添加超时方法PaymentFeignService

```java
@GetMapping(value = "/payment/feign/timeout")
public String paymentFeignTimeout();
```

服务消费方80添加超时方法OrderFeignController

```java
@GetMapping(value = "/consumer/payment/feign/timeout")
public String paymentFeignTimeout(){
            // openfeign-ribbon 客户端默认3s
   return paymentFeignService.paymentFeignTimeout();
}
 

```

![错误页面](https://img-blog.csdnimg.cn/27cf3bc914e14f6eb87c2afe430bf56d.png)

- OpenFeign默认等待一秒钟，超过后报错

**YML文件里需要开启OpenFeign客户端超时控制即可**

```yaml
# 设置feign客户端超时时间,(OpenFeign默认支持Ribbon)
ribbon:
  # 指的是建立连接后从服务器读取到可用资源所用的时间
  ReadTimeout:  5000
  # 指的是连接所用的时间，适用于网络状况正常的情况下，两端连接所用的时间
  ConnectTimeout: 5000
```

### OpenFeign日志打印

#### 日志打印功能

Feign提供了日志打印功能，我们可以通过配置来调整日恙级别，从而了解Feign 中 Http请求的细节。

说白了就是对Feign接口的调用情况进行监控和输出

#### 日志级别

- NONE：默认的，不显示任何日志;
- BASIC：仅记录请求方法、URL、响应状态码及执行时间;
- HEADERS：除了BASIC中定义的信息之外，还有请求和响应的头信息;
- FULL：除了HEADERS中定义的信息之外，还有请求和响应的正文及元数据。

#### 代码编写

FeignConfig

```java
@Configuration
public class FeignConfig
{
    @Bean
    Logger.Level feignLoggerLevel()
    {
        return Logger.Level.FULL;
    }
}


```

application.yml

```yaml
logging:
  level:
    # feign日志以什么级别监控哪个接口
    com.ssm.springcloud.service.PaymentService: debug

```

![日志打印](https://img-blog.csdnimg.cn/461058045d264d1990cb1a5192721ff6.png)

