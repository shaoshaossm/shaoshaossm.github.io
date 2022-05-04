---

title: SpringCloud之Stream
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-23 14:15:23
password:
img: https://img-blog.csdnimg.cn/2ef05ed8fec84dd19c72b01d1185cc4a.png
summary: 总结在springcloud中使用stream------------------------------------------
tags: [SpringCloud,Stream]
categories: 框架
---

### Stream是什么及Binder介绍

[官方文档1](https://spring.io/projects/spring-cloud-stream#overview)

[官方文档2](https://cloud.spring.io/spring-tloud-static/spring-cloud-stream/3.0.1.RELEASE/reference/html/Spring)

[Cloud Stream中文指导手册](https://m.wang1314.com/doc/webapp/topic/20971999.html)

**什么是Spring Cloud Stream？**

- 官方定义Spring Cloud Stream是一个<font color="orange">构建消息驱动微服务的框架</font>。
- <font color="orange">屏蔽底层消息中间件的差异，降低切换版本，统一消息的编程模型</font>
- 应用程序通过inputs或者 outputs 来与Spring Cloud Stream中binder对象交互。
- 通过我们配置来binding(绑定)，而Spring Cloud Stream 的binder对象负责与消息中间件交互。所以，我们只需要搞清楚如何与Spring Cloud Stream交互就可以方便使用消息驱动的方式。
- 通过使用Spring Integration来连接消息代理中间件以实现消息事件驱动。
  Spring Cloud Stream为一些供应商的消息中间件产品提供了个性化的自动化配置实现，引用了发布-订阅、消费组、分区的三个核心概念。

> <font color="orange">目前仅支持RabbitMQ、 Kafka。</font>

### Stream的设计思想

**标准MQ**

![标准MQ](https://img-blog.csdnimg.cn/fd1072bb8c6c4a478d7f389f64db61a9.png)

- 生产者/消费者之间靠消息媒介传递信息内容
- 消息必须走特定的通道 - 消息通道 Message Channel
- 消息通道里的消息如何被消费呢，谁负责收发处理 - 消息通道MessageChannel的子接口SubscribableChannel，由MessageHandler消息处理器所订阅。

**为什么用Cloud Stream？**

比方说我们用到了RabbitMQ和Kafka，由于这两个消息中间件的架构上的不同，像RabbitMQ有exchange，kafka有Topic和Partitions分区。

![设计思想](https://img-blog.csdnimg.cn/1f4fee05aa3d406286e0063ca42205fe.png)

这些中间件的差异性导致我们实际项目开发给我们造成了一定的困扰，我们如果用了两个消息队列的其中一种，后面的业务需求，我想往另外一种消息队列进行迁移，这时候无疑就是一个灾难性的，一大堆东西都要重新推倒重新做，因为它跟我们的系统耦合了，这时候Spring Cloud Stream给我们提供了—种解耦合的方式。

**Stream凭什么可以统一底层差异？**

在没有绑定器这个概念的情况下，我们的SpringBoot应用要直接与消息中间件进行信息交互的时候，由于各消息中间件构建的初衷不同，它们的实现细节上会有较大的差异性通过定义绑定器作为中间层，完美地实现了<font color="orange">应用程序与消息中间件细节之间的隔离</font>。通过向应用程序暴露统一的Channel通道，使得应用程序不需要再考虑各种不同的消息中间件实现。

> <font color="orange">通过定义绑定器Binder作为中间层，实现了应用程序与消息中间件细节之间的隔离。</font>

Binder：

- `INPUT`对应于消费者

- `OUTPUT`对应于生产者

![处理架构](https://img-blog.csdnimg.cn/cc7e41d72aa544c996188c18e5d94513.png)

**Stream中的消息通信方式遵循了发布-订阅模式**

Topic主题进行广播

- 在RabbitMQ就是Exchange
- 在Kakfa中就是Topic

### Stream编码常用注解简介

**Spring Cloud Stream标准流程套路**

![标准流程套路](https://img-blog.csdnimg.cn/39fe7b00a2414e7b9215e6616809b008.png)

`Binder` - 很方便的连接中间件，屏蔽差异。

`Channel `- 通道，是队列Queue的一种抽象，在消息通讯系统中就是实现存储和转发的媒介，通过Channel对队列进行配置。

`Source和Sink` - 简单的可理解为参照对象是Spring Cloud Stream自身，从Stream发布消息就是输出，接受消息就是输入。

**编码API和常用注解**

![常用注解](https://img-blog.csdnimg.cn/22b4dcb2deae4a38aa0da586b6b2dc48.png)

### 案例

- 准备RabbitMQ环境（79_Bus之RabbitMQ环境配置有提及）

- 工程中新建三个子模块
  - cloud-stream-rabbitmq-provider8801，作为生产者进行发消息模块
  - cloud-stream-rabbitmq-consumer8802，作为消息接收模块
  - cloud-stream-rabbitmq-consumer8803，作为消息接收模块

#### Stream消息驱动之生产者

**new module**![目录结构](https://img-blog.csdnimg.cn/570d8edc6f004480bb40395559404a7e.png)

POM.xml

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

    <artifactId>cloud-stream-rabbitmq-provider8801</artifactId>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
        </dependency>
        <!--基础配置-->
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
  port: 8801

spring:
  application:
    name: cloud-stream-provider
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: 192.168.174.131
                port: 5672
                username: admin
                password: 密码
      bindings: # 服务的整合处理
        output: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为json，文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置

eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://localhost:7001/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: send-8801.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址
```

IMessageProvider

```java
public interface IMessageProvider {
    public String send();
}
```

MessageProviderImpl

```java
@EnableBinding(Source.class) //定义消息的推送管道
public class MessageProviderImpl implements IMessageProvider
{
    @Resource
    private MessageChannel output; // 消息发送管道

    @Override
    public String send()
    {
        String serial = UUID.randomUUID().toString();
        output.send(MessageBuilder.withPayload(serial).build());
        System.out.println("*****serial: "+serial);
        return null;
    }
}
```

SendMessageController

```java
@RestController
public class SendMessageController
{
    @Resource
    private IMessageProvider messageProvider;

    @GetMapping(value = "/sendMessage")
    public String sendMessage() {
        return messageProvider.send();
    }

}
```

**测试**

- 启动 7001eureka
- 启动 RabpitMQ
- http://localhost:15672/
- 启动 8801
- 访问 - `http://localhost:8801/sendMessage`
  - 后台将打印`serial: UUID`字符串

![测试成功](https://img-blog.csdnimg.cn/ec98fc0015314ead950a9d09e7afc8fd.png)

#### Stream消息驱动之消费者

**new module**

![目录结构](https://img-blog.csdnimg.cn/43b38cf4623f4559aa7e1be8d7006046.png)

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

    <artifactId>cloud-stream-rabbitmq-consumer8802</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--基础配置-->
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
  port: 8802

spring:
  application:
    name: cloud-stream-consumer
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: 192.168.174.131
                port: 5672
                username: admin
                password: 密码
      bindings: # 服务的整合处理
        input: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为对象json，如果是文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置

eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://localhost:7001/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: receive-8802.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址
```

ReceiveMessageListenerController

```java
@Component
@EnableBinding(Sink.class)
public class ReceiveMessageListenerController
{
    @Value("${server.port}")
    private String serverPort;


    @StreamListener(Sink.INPUT)
    public void input(Message<String> message)
    {
        System.out.println("消费者1号,----->接受到的消息: "+message.getPayload()+"\t  port: "+serverPort);
    }
}
```

StreamMQMain8802

```java
@SpringBootApplication
public class StreamMQMain8802 {
    public static void main(String[] args) {
        SpringApplication.run(StreamMQMain8802.class,args);
    }
}
```

**测试**

- 启动EurekaMain7001
- 启动StreamMQMain8801
- 启动StreamMQMain8802
- 8801发送8802接收消息

![接收成功](https://img-blog.csdnimg.cn/4d0a662c075848849ff1985dc0e50528.png)

### Stream之消息重复消费

依照8802，克隆出来一份运行 8803 - cloud-stream-rabbitmq-consumer8803。

**启动**

- RabbitMQ
- 服务注册 - 7001
- 消息生产 - 8801
- 消息消费 - 8802
- 消息消费 - 8803

**运行后有两个问题**

1. 有重复消费问题
2. 消息持久化问题

> 默认分配到两个不同的组

**生产实际案例**

比如在如下场景中，订单系统我们做集群部署，都会从RabbitMQ中获取订单信息，那<font color="orange">如果一个订单同时被两个服务获取到</font>，那么就会造成数据错误，我们得避免这种情况。这时我们就可以<font color="orange">使用Stream中的消息分组来解决</font>。

![图解](https://img-blog.csdnimg.cn/60dccd3b52f94f2da08728b13153fb86.png)

> 注意在Stream中处于同一个group中的多个消费者是竞争关系，就能够保证消息只会被其中一个应用消费一次。<font color="red">不同组是可以全面消费的(重复消费)。</font>
>
> <font color="red">同一组内会发生竞争关系，只有其中一个可以消费</font>

### Stream之group解决消息重复消费

**原理**

<font color =“red">微服务应用放置于同一个group中，就能够保证消息只会被其中一个应用消费一次。</font>

<font color =“red">**不同的组**是可以重复消费的，**同一个组**内会发生竞争关系，只有其中一个可以消费。</font>

**8802/8803都变成不同组，group两个不同**

group: ssmA、ssmB

8802、8803修改YML(分别增加`group：ssmA`、`group：ssmA`)

```yaml
server:
  port: 8803

spring:
  application:
    name: cloud-stream-consumer
  cloud:
    stream:
      binders: # 在此处配置要绑定的rabbitmq的服务信息；
        defaultRabbit: # 表示定义的名称，用于于binding整合
          type: rabbit # 消息组件类型
          environment: # 设置rabbitmq的相关的环境配置
            spring:
              rabbitmq:
                host: 192.168.174.131
                port: 5672
                username: admin
                password: 密码
      bindings: # 服务的整合处理
        input: # 这个名字是一个通道的名称
          destination: studyExchange # 表示要使用的Exchange名称定义
          content-type: application/json # 设置消息类型，本次为对象json，如果是文本则设置“text/plain”
          binder: defaultRabbit # 设置要绑定的消息服务的具体设置
          group: ssmA
eureka:
  client: # 客户端进行Eureka注册的配置
    service-url:
      defaultZone: http://localhost:7001/eureka
  instance:
    lease-renewal-interval-in-seconds: 2 # 设置心跳的时间间隔（默认是30秒）
    lease-expiration-duration-in-seconds: 5 # 如果现在超过了5秒的间隔（默认是90秒）
    instance-id: receive-8802.com  # 在信息列表时显示主机名称
    prefer-ip-address: true     # 访问的路径变为IP地址
```

结论：**还是重复消费**

>还是处在两个不同A、B组

![测试group](https://img-blog.csdnimg.cn/c1a48a8cb2fc4704b61ce4249b3db9ea.png)

**8802/8803都变成相同组，group两个相同**

- 8802修改YML`group: ssmA`

- 8803修改YML`group: ssmA`

**测试**

- 8001发送两次消息
- 8002和8003分别收到一次

![8002](https://img-blog.csdnimg.cn/2031fe1e52ae4946abe73cec1572a961.png)
![8003](https://img-blog.csdnimg.cn/fc39b2c090564b9e8ff7b2445f3ddb00.png)

![测试成功](https://img-blog.csdnimg.cn/f3cbc83beab2462c844ab94be8aaece0.png)

### Stream之消息持久化

- 停止8802/8803并去除掉8802的分组group: ssmA，8803的分组group: A_Group没有去掉。

- 8801先发送4条消息到RabbitMq。

- 先启动8802，无分组属性配置，后台<font color="red">没有打出来消息</font>。

- 再启动8803，有分组属性配置，后台<font color="red">打出来了MQ上的4消息</font>。(消息持久化体现)

![消息持久化](https://img-blog.csdnimg.cn/7486f0be480544ac8d6a65da95aa9007.png)









































