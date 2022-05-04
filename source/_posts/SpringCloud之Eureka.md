---
title: SpringCloud之Eureka
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-14 18:54:23
password:
img: https://img-blog.csdnimg.cn/002ba6e9c5944b95a27693ce517e451a.png
summary: 总结使用Eureka的使用方法--------------------------------------
tags: [SpringCloud,Eureka]
categories: 框架
---

### 基本知识

#### 服务治理

Spring Cloud 封装了 Netflix 公司开发的 Eureka 模块来实现服务治理。

​		在传统的rpc远程调用框架中，管理每个服务与服务之间依赖关系比较复杂，管理比较复杂，所以需要使用服务治理，管理服务于服务之间依赖关系，可以实现服务调用、负载均衡、容错等，实现服务发现与注册。

#### 服务注册

​		Eureka采用了CS的设计架构，Eureka Server 作为服务注册功能的服务器，它是服务注册中心。而系统中的其他微服务，使用 Eureka的客户端连接到 Eureka Server并维持心跳连接。这样系统的维护人员就可以通过 Eureka Server 来监控系统中各个微服务是否正常运行。

​		在服务注册与发现中，有一个注册中心。当服务器启动的时候，会把当前自己服务器的信息 比如 服务地址通讯地址等以别名方式注册到注册中心上。另一方（消费者|服务提供者），以该别名的方式去注册中心上获取到实际的服务通讯地址，然后再实现本地RPC调用RPC远程调用框架核心设计思想：在于注册中心，因为使用注册中心管理每个服务与服务之间的一个依赖关系(服务治理概念)。在任何rpc远程框架中，都会有一个注册中心(存放服务地址相关信息(接口地址))

![Eureka vs Dubbo](https://img-blog.csdnimg.cn/77494e9fb5194dd681157120d5d2ca26.png)

#### Eureka包含两个组件

Eureka Server和Eureka Client

Eureka Server提供服务注册服务

​		各个微服务节点通过配置启动后，会在EurekaServer中进行注册，这样EurekaServer中的服务注册表中将会存储所有可用服务节点的信息，服务节点的信息可以在界面中直观看到。

EurekaClient通过注册中心进行访问

​		是一个Java客户端，用于简化Eureka Server的交互，客户端同时也具备一个内置的、使用轮询(round-robin)负载算法的负载均衡器。在应用启动后，将会向Eureka Server发送心跳(默认周期为30秒)。如果Eureka Server在多个心跳周期内没有接收到某个节点的心跳，EurekaServer将会从服务注册表中把这个服务节点移除（默认90秒）

### 服务提供者

#### 8001目录结构

![8001服务提供者目录结构](https://img-blog.csdnimg.cn/d5911d65a1034b3fa85026c66bc16611.png)

#### 代码编写

PaymentController

```java
@RestController
@Slf4j
public class PaymentController {
    @Resource
    private PaymentService paymentService;

    @Value("${server.port}")
    private String serverPort;
    @PostMapping(value = "/payment/create")
    public CommonResult create(@RequestBody Payment payment){
        int result = paymentService.create(payment);
        log.info("插入结果: "+result);
        if (result > 0){
            return new CommonResult(200,"插入数据操作成功"+serverPort,result);
        } else {
            return new CommonResult(444,"插入数据操作失败",null);
        }
    }

    @GetMapping(value = "/payment/get/{id}")
    public CommonResult getPaymentById(@PathVariable("id") Long id){
        Payment payment = paymentService.getPaymentById(id);
        log.info("获取结果: "+payment);
        if (payment != null){
            return new CommonResult(200,"查询成功"+serverPort,payment);
        } else {
            return new CommonResult(444,"查询失败，查询ID:",id);
        }
    }

}
```

PaymentDao

```
@Mapper
public interface PaymentDao {
    public int create(Payment payment);
    public Payment getPaymentById(@Param("id") Long id);
}
```

PaymentServiceImpl

```java
@Service
public class PaymentServiceImpl implements PaymentService {
    @Resource
    private PaymentDao paymentDao;

    @Override
    public int create(Payment payment) {
        return paymentDao.create(payment);
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentDao.getPaymentById(id);
    }
}
```

PaymentService

```java
public interface PaymentService {
    public int create(Payment payment);
    public Payment getPaymentById(@Param("id") Long id);
}
```

PaymentMain8001

```java
@SpringBootApplication
@EnableEurekaClient
public class PaymentMain8001 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain8001.class,args);
    }
}
```

PaymentDao.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.ssm.springcloud.dao.PaymentDao">

    <resultMap id="BaseResultMap" type="com.ssm.springcloud.entities.Payment">
        <id column="id" property="id" jdbcType="BIGINT"/>
        <result column="serial" property="serial" jdbcType="VARCHAR"/>
    </resultMap>

    <insert id="create" parameterType="Payment" useGeneratedKeys="true" keyProperty="id">
        INSERT INTO payment(SERIAL) VALUES(#{serial});
    </insert>

    <select id="getPaymentById" parameterType="Long" resultMap="BaseResultMap" >
        SELECT * FROM payment WHERE id=#{id};
    </select>

</mapper>
```

application.yml

```yaml
server:
  port: 8001

spring:
  application:
    name: cloud-payment-service

  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/springcloud?useSSL=false&serverTimezone=GMT%2B8&allowPublicKeyRetrieval=true
    username: root
    password: 密码
mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.ssm.springcloud.entities
```

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

    <artifactId>cloud-consumer-order80</artifactId>

    <dependencies>
        <!--eureka-server-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
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

### 服务消费者

#### 80目录结构

![80服务消费者目录结构](https://img-blog.csdnimg.cn/6cf0ac12ef734b02bd8f61c56c06d9cd.png)

#### 代码编写

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

OrderController

```java
@RestController
@Slf4j
public class OrderController {
//    public static final String PAYMENT_URL = "http://localhost:8001";
    public static final String PAYMENT_URL = "http://CLOUD-PAYMENT-SERVICE"; //服务名称
    @Resource
    private RestTemplate restTemplate;

    @GetMapping("/consumer/payment/create")
    public ResponseEntity<CommonResult> create(Payment payment) {
        return restTemplate.postForEntity(PAYMENT_URL + "/payment/create", payment, CommonResult.class);
    }

    @GetMapping(value = "/consumer/payment/get/{id}",produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public CommonResult getPayment(@PathVariable("id") Long id) {
        return restTemplate.getForObject(PAYMENT_URL+"/payment/get/"+id,CommonResult.class);
    }


}

```

OrderMain80

```java
@SpringBootApplication
@EnableEurekaClient
public class OrderMain80 {
    public static void main(String[] args) {
        SpringApplication.run(OrderMain80.class,args);
    }
}
```

### 公共模块 cloud-api-commons

![公共模块目录结构](https://img-blog.csdnimg.cn/14eae84ecd9341959ce5156bcc4a8a13.png)

- 将实体类的公共模块提取出来
-  在服务提供者和消费者模块中引入依赖

```xml
<dependency><!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
    <groupId>com.ssm.springcloud</groupId>
    <artifactId>cloud-api-commons</artifactId>
    <version>${project.version}</version>
</dependency>
```

### Eureka项目基本构建

- 建立 7001module

![New Module](https://img-blog.csdnimg.cn/715171efae9d4bd8a7a0c57e1fdfff4f.png)

- pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springloud2022</artifactId>
        <groupId>com.ssm.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-eureka-server7001</artifactId>

    <dependencies>
        <!--eureka-server-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.ssm.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--boot web actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--一般通用配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>
    </dependencies>

</project>
```

application.yml

```yaml
server:
  port: 7001

eureka:
  instance:
    hostname: localhost #eureka服务端的实例名称
  client:
    #false表示不向注册中心注册自己。
    register-with-eureka: false
    #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    fetch-registry: false
    service-url:
      #设置与Eureka Server交互的地址查询服务和注册服务都需要依赖这个地址。
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
```

EurekaMain7001

```java
package com.ssm.springcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class EurekaMain7001 {
    public static void main(String[] args) {
        SpringApplication.run(EurekaMain7001.class,args);
    }
}

```

![运行结果](https://img-blog.csdnimg.cn/224c56a5022b45afa96d9b113697231c.png)

#### EurekaSever-provider

将注册EurekaSever成为服务提供者provider

pom.xml

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

application.yml

```yaml
eureka:
  client:
    #表示是否将自己注册进EurekaServer默认为true。
    register-with-eureka: true
    #是否从EurekaServer抓取已有的注册信息，默认为true。单节点无所谓，集群必须设置为true才能配合ribbon使用负载均衡
    fetchRegistry: true
    service-url:
      defaultZone: http://localhost:7001/eureka
```

PaymentMain8001启动类

```java
@SpringBootApplication
@EnableEurekaClient
public class PaymentMain8001
{
    public static void main(String[] args)
    {
        SpringApplication.run(PaymentMain8001.class,args);
    }
}
```

![注册名称匹配](https://img-blog.csdnimg.cn/51b54c15d4ea4f159eb87c0877536c18.png)

![自我保护](https://img-blog.csdnimg.cn/4008c7ac9aec45f5aa1fa2203bed89a8.png)

![单机status输入health查看状态](https://img-blog.csdnimg.cn/f4bdc3dfa8074e4c8ae9c6eaa4d8bdaa.png)

### Eureka集群构建

![Eureka集群原理](https://img-blog.csdnimg.cn/64170c42d1bc4834bd1c04685bd54ffa.png)

微服务RPC远程服务调用最核心的是<font color="red">高可用</font>，所以搭建Eureka注册中心集群 ，实现负载均衡+故障容错，相互注册，相互守望。

#### 两个集群互相注册

- 再新建一个 7002Module
- 找到 C:\Windows\System32\drivers\etc 修改映射配置文件添加进host文件 

```properties
127.0.0.1 eureka7001.com
127.0.0.1 eureka7002.com
```

- application.yml

```yaml
server:
  port: 7001

eureka:
  instance:
    hostname: eureka7001.com 
  client:
    register-with-eureka: false
    fetch-registry: false
    service-url:
      defaultZone: http://eureka7002.com:7002/eureka/
```

```yaml
server:
  port: 7002

eureka:
  instance:
    hostname: eureka7002.com
  client:
    register-with-eureka: false
    fetch-registry: false
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka/
```

![7001注册7002](https://img-blog.csdnimg.cn/20719090e0c04538b01ddc1c7686e0ec.png)
![7002注册7001](https://img-blog.csdnimg.cn/ad41446f247147cbb97d9b63c60d040d.png)

##### 将其他模块注册进7001和7002Eureka集群

```yaml
eureka:
  client:
    register-with-eureka: true
    fetchRegistry: true
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka  # 集群版
```

##### 创建两个服务提供者8001&8002

和创建8001一样，修改端口号即可

##### 修改8001和8002controller 加入

```java
@Value("${server.port}")
private String serverPort;
```

```java
@RestController
@Slf4j
public class PaymentController {
    @Resource
    private PaymentService paymentService;

    @Value("${server.port}")
    private String serverPort;
    @PostMapping(value = "/payment/create")
    public CommonResult create(@RequestBody Payment payment){
        int result = paymentService.create(payment);
        log.info("插入结果: "+result);
        if (result > 0){
            return new CommonResult(200,"插入数据操作成功"+serverPort,result);
        } else {
            return new CommonResult(444,"插入数据操作失败",null);
        }
    }

    @GetMapping(value = "/payment/get/{id}")
    public CommonResult getPaymentById(@PathVariable("id") Long id){
        Payment payment = paymentService.getPaymentById(id);
        log.info("获取结果: "+payment);
        if (payment != null){
            return new CommonResult(200,"查询成功"+serverPort,payment);
        } else {
            return new CommonResult(444,"查询失败，查询ID:",id);
        }
    }

}

```

##### 使用@LoadBalanced注解赋予RestTemplate负载均衡的能力

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

##### 修改PAYMENT_URL为服务名称

```java
@RestController
@Slf4j
public class OrderController {
//    public static final String PAYMENT_URL = "http://localhost:8001";
    public static final String PAYMENT_URL = "http://CLOUD-PAYMENT-SERVICE"; //服务名称
    @Resource
    private RestTemplate restTemplate;

    @GetMapping("/consumer/payment/create")
    public ResponseEntity<CommonResult> create(Payment payment) {
        return restTemplate.postForEntity(PAYMENT_URL + "/payment/create", payment, CommonResult.class);
    }

    @GetMapping(value = "/consumer/payment/get/{id}",produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public CommonResult getPayment(@PathVariable("id") Long id) {
        return restTemplate.getForObject(PAYMENT_URL+"/payment/get/"+id,CommonResult.class);
    }


}
```

##### 最终结果

![7001](https://img-blog.csdnimg.cn/87e6c5e895e74f828d2accd67944a48b.png)

![7002](https://img-blog.csdnimg.cn/5ccaf120008a4b96962de5362288bac5.png)

![8001服务提供者](https://img-blog.csdnimg.cn/3194b208cc604fa9b723d6272531f786.png)
![8002服务提供者](https://img-blog.csdnimg.cn/e5f5b83e047147e889211ba4bba8f510.png)

### actuator信息完善

修改服务名和增加访问信息显示ip地址

```yaml
eureka:
  client:
    #表示是否将自己注册进EurekaServer默认为true。
    register-with-eureka: true
    #是否从EurekaServer抓取已有的注册信息，默认为true。单节点无所谓，集群必须设置为true才能配合ribbon使用负载均衡
    fetchRegistry: true
    service-url:
      #defaultZone: http://localhost:7001/eureka
      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka  # 集群版
  instance:
    instance-id: payment8002 # 增加服务别名
    prefer-ip-address: true # 访问路径显示IP地址
```

![增加别名&IP](https://img-blog.csdnimg.cn/487d5a46d78d49019984eec350648bbb.png)

### 服务发现Discovery

编写controller类

```java
 @GetMapping(value = "/payment/discovery")
    public Object discovery(){
        List<String> services = discoveryClient.getServices();
        for (String element:services
             ) {
            log.info("element"+element);
        }
        List<ServiceInstance> instances = discoveryClient.getInstances("CLOUD-PAYMENT-SERVICE");
        for (ServiceInstance instance:instances
             ) {
        log.info(instance.getServiceId()+"\t"+instance.getHost()+"\t"+instance.getPort()+"\t"+instance.getUri());
        }
        return this.discoveryClient;
    }
```

增加启动注解

```java
@SpringBootApplication
@EnableEurekaClient
@EnableDiscoveryClient
public class PaymentMain8001 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain8001.class,args);
    }
}
```

![测试结果](https://img-blog.csdnimg.cn/3ad8e191dfcb4b9293151d3fb527dbd7.png)

![端口测试](https://img-blog.csdnimg.cn/a534ea0279a741aeb9efa55c7e30638d.png)

### Eureka自我保护

- 自我保护机制默认是开启的

- 保护模式主要用于一组客户端和Eureka Server之间存在网络分区场景下的保护。一旦进入保护模式，

  Eureka Server将会尝试保护其服务注册表中的信息，不再删除服务注册表中的数据，也就是不会注销任何微服务。

#### 关闭自我保护机制

##### 7001

```yaml
eureka:
  instance:
    hostname: eureka7001.com #eureka服务端的实例名称
  client:
    #false表示不向注册中心注册自己。
    register-with-eureka: false
    #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    fetch-registry: false
    service-url:
      #设置与Eureka Server交互的地址查询服务和注册服务都需要依赖这个地址。
#      defaultZone: http://eureka7002.com:7002/eureka/
      # 单机指向自己
      defaultZone: http://eureka7001.com:7001/eureka/
  server:
    #关闭自我保护机制，保证不可用服务被及时踢除
    enable-self-preservation: false
    eviction-interval-timer-in-ms: 2000 # 默认90s 改成2s
```

![关闭自我保护机制](https://img-blog.csdnimg.cn/bd889250f70d43148a188e1fddcf2363.png)

##### 8001生产者EurekaClient客户端

```yaml
server:
  port: 8001

spring:
  application:
    name: cloud-payment-service

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
      defaultZone: http://localhost:7001/eureka
#      defaultZone: http://eureka7001.com:7001/eureka,http://eureka7002.com:7002/eureka  # 集群版

  instance:
      instance-id: payment8001
      prefer-ip-address: true
      #Eureka客户端向服务端发送心跳的时间间隔，单位为秒(默认是30秒)
      lease-renewal-interval-in-seconds: 1
      #Eureka服务端在收到最后一次心跳后等待时间上限，单位为秒(默认是90秒)，超时将剔除服务
      lease-expiration-duration-in-seconds: 2

```

#### 测试

![目前服务状态](https://img-blog.csdnimg.cn/b3acaf7d5b74408b946cfaf23cb1ba85.png)
![8001服务关闭，过2s直接剔除](https://img-blog.csdnimg.cn/1edc94c5946b4a4385f3bd8113fbc9f0.png)

