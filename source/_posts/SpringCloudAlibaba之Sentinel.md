---
title: SpringCloudAlibaba之Sentinel
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-25 07:54:19
password:
summary: 总结在SpringCloudAlibaba中使用Sentinel----------------------------------
tags: [SpringCloudAlibaba,Sentinel]
categories: 框架
---

### 概述

[官方Github](https://github.com/alibaba/Sentinel)

[官方文档](https://sentinelguard.io/zh-cn/docs/introduction.html)

**Sentinel 是什么？**

随着微服务的流行，服务和服务之间的稳定性变得越来越重要。Sentinel 以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。

**Sentinel 具有以下特征:**

<font color="orange">丰富的应用场景</font>：Sentinel 承接了阿里巴巴近 10 年的双十一大促流量的核心场景，例如秒杀（即突发流量控制在系统容量可以承受的范围）、消息削峰填谷、集群流量控制、实时熔断下游不可用应用等。
<font color="orange">完备的实时监控</font>：Sentinel 同时提供实时的监控功能。您可以在控制台中看到接入应用的单台机器秒级数据，甚至 500 台以下规模的集群的汇总运行情况。
<font color="orange">广泛的开源生态</font>：Sentinel 提供开箱即用的与其它开源框架/库的整合模块，例如与 Spring Cloud、Dubbo、gRPC 的整合。您只需要引入相应的依赖并进行简单的配置即可快速地接入 Sentinel。
<font color="orange">完善的 SPI 扩展点</font>：Sentinel 提供简单易用、完善的 SPI 扩展接口。您可以通过实现扩展接口来快速地定制逻辑。例如定制规则管理、适配动态数据源等。

**Sentinel 的主要特性：**

![特性](https://img-blog.csdnimg.cn/b56d7d063c1141d78619be406357ee3a.png)

### Sentinel下载安装运行

[官方文档](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring_cloud_alibaba_sentinel)

服务使用中的各种问题：

- 服务雪崩
- 服务降级
- 服务熔断
- 服务限流


Sentinel 分为两个部分：

- 核心库（Java 客户端）不依赖任何框架/库，能够运行于所有 Java 运行时环境，同时对 Dubbo / Spring Cloud 等框架也有较好的支持。
- 控制台（Dashboard）基于 Spring Boot 开发，打包后可以直接运行，不需要额外的 Tomcat 等应用容器。
  安装步骤：

- [下载](https://github.com/alibaba/Sentinel/releases)
  - 下载到本地sentinel-dashboard-1.7.0.jar
  - 运行命令`java -jar sentinel-dashboard-1.7.0.jar`

![下载jar包](https://img-blog.csdnimg.cn/4f32ea89dab3426ca67ac9ae1abb7a02.png)

![运行命令](https://img-blog.csdnimg.cn/ae984180ae8846dc8945b99542d91dae.png)

- 前提
  - Java 8 环境
  - 8080端口不能被占用

- 访问Sentinel管理界面
  - localhost:8080
  - 登录账号密码均为sentinel

![登录成功](https://img-blog.csdnimg.cn/3412465960914e179f99c39ad07df4d2.png)

### 初始化工程

**启动Nacos8848成功**

**新建工程 - cloudalibaba-sentinel-service8401**

![目录结构](https://img-blog.csdnimg.cn/af06f738efda437786fe616b6f936fce.png)

POM

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

    <artifactId>cloudalibaba-sentinel-service8401</artifactId>

    <dependencies>
        <dependency><!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
            <groupId>com.ssm.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel-datasource-nacos 后续做持久化用到-->
        <dependency>
            <groupId>com.alibaba.csp</groupId>
            <artifactId>sentinel-datasource-nacos</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>
        <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!-- SpringBoot整合Web组件+actuator -->
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
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>4.6.3</version>
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

YML

```yaml
server:
  port: 8401

spring:
  application:
    name: cloudalibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
    sentinel:
      transport:
        dashboard: localhost:8080 #配置Sentinel dashboard地址
        port: 8719

management:
  endpoints:
    web:
      exposure:
        include: '*'

feign:
  sentinel:
    enabled: true # 激活Sentinel对Feign的支持
```

FlowLimitController

```java
@RestController
@Slf4j
public class FlowLimitController {
    @GetMapping("/testA")
    public String testA()
    {
        return "------testA";
    }

    @GetMapping("/testB")
    public String testB()
    {
        log.info(Thread.currentThread().getName()+"\t"+"...testB");
        return "------testB";
    }
}
```

MainApp8401

```java
@EnableDiscoveryClient
@SpringBootApplication
public class MainApp8401 {
    public static void main(String[] args) {
        SpringApplication.run(MainApp8401.class, args);
    }
}
```

**启动Sentinel8080 - `java -jar sentinel-dashboard-1.7.0.jar`**

**启动微服务8401**

 ![注册成功](https://img-blog.csdnimg.cn/bbb54ae58a854cff81bd9e9762d2b545.png)

- Sentinel采用的懒加载说明

  - 执行一次访问即可
    - http://localhost:8401/testA
    - http://localhost:8401/testB

![访问成功](https://img-blog.csdnimg.cn/0f249c2bafdf4b938b9455278eb06f27.png)


  - 效果 - sentinel8080正在监控微服务8401

![实时监控](https://img-blog.csdnimg.cn/2aa14bff8aa0485e94253c1f2b020573.png)

### Sentinel流控规则简介

进一步解释说明：

- 资源名：唯一名称，默认请求路径。
- 针对来源：Sentinel可以针对调用者进行限流，填写微服务名，默认default（不区分来源）。
- 阈值类型/单机阈值：
  - QPS(每秒钟的请求数量)︰<font color="palegoldenrod">当调用该API的QPS达到阈值的时候，进行限流</font>。
  - 线程数：<font color="palegoldenrod">当调用该API的线程数达到阈值的时候，进行限流</font>。
- 是否集群：不需要集群。
- 流控模式：
  - 直接：API达到限流条件时，直接限流。
  - 关联：当关联的资源达到阈值时，就限流自己。
  - 链路：只记录指定链路上的流量（指定资源从入口资源进来的流量，如果达到阈值，就进行限流)【API级别的针对来源】。
- 流控效果：
  - 快速失败：直接失败，抛异常。
  - Warm up：根据Code Factor（冷加载因子，默认3）的值，从阈值/codeFactor，经过预热时长，才达到设置的QPS阈值。
  - 排队等待：匀速排队，让请求以匀速的速度通过，阈值类型必须设置为QPS，否则无效。

#### QPS直接失败

![QPS](https://img-blog.csdnimg.cn/1df08cbf784b4b719e225c88bcc4780a.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/7f2d78728da74e50a61032082b5b3542.png)

> 验证：一秒刷新次数超过一次直接快速失败

#### 线程数直接失败

testA等待0.8s

```java
@GetMapping("/testA")
    public String testA() throws InterruptedException {
        TimeUnit.MILLISECONDS.sleep(800);
        return "------testA";
    }
```

![并发线程数](https://img-blog.csdnimg.cn/be4fe0947bc94425b2fb89e71845099a.png)

>开启两个浏览器测试

### 关联

**是什么？**

- 当自己关联的资源达到阈值时，就限流自己
- 当与A关联的资源B达到阀值后，就限流A自己（B惹事，A挂了）

![关联](https://img-blog.csdnimg.cn/71cd1030b71d488095f0b59a1c516e37.png)



![新建集合并输入地址](https://img-blog.csdnimg.cn/c567b58744844c3192ac52f2a5c1916d.png)

![选择Run](https://img-blog.csdnimg.cn/3ec2e7e0d70d409bb0aec013c880e2d1.png)

![输入线程和时间](https://img-blog.csdnimg.cn/773cd633e44d498bad9e2f3c93106f16.png)

![运行测试](https://img-blog.csdnimg.cn/0763f715eee147688b5015cb2aa999fc.png)

![再次测试A服务挂了](https://img-blog.csdnimg.cn/608383d2352747ab8f2ef473a89ad035.png)

**链路：只记录指定链路上的流量（指定资源从入口资源进来的流量，如果达到阈值，就进行限流)【API级别的针对来源】**

### Sentinel流控-预热

>**Warm Up**
>
>Warm Up（`RuleConstant.CONTROL_BEHAVIOR_WARM_UP`）方式，即预热/冷启动方式。当系统长期处于低水位的情况下，当流量突然增加时，直接把系统拉升到高水位可能瞬间把系统压垮。通过"冷启动"，让通过的流量缓慢增加，在一定时间内逐渐增加到阈值上限，给冷系统一个预热的时间，避免冷系统被压垮。详细文档可以参考 [流量控制 - Warm Up 文档](https://github.com/alibaba/Sentinel/wiki/限流---冷启动)，具体的例子可以参见 [WarmUpFlowDemo](https://github.com/alibaba/Sentinel/blob/master/sentinel-demo/sentinel-demo-basic/src/main/java/com/alibaba/csp/sentinel/demo/flow/WarmUpFlowDemo.java)。
>
>通常冷启动的过程系统允许通过的 QPS 曲线如下图所示：[link](https://github.com/alibaba/Sentinel/wiki/流量控制#warm-up)
>
>![](https://img-blog.csdnimg.cn/068c6dde8bb64bb0ae7066e660647408.png)
>
>默认coldFactor为3，即请求QPS 从 threshold / 3开始，经预热时长逐渐升至设定的QPS阈值。[link](https://github.com/alibaba/Sentinel/wiki/流量控制#warm-up)

**WarmUp配置**

案例，阀值为10+预热时长设置5秒。

<font color="red">系统初始化的阀值为10/ 3约等于3,即阀值刚开始为3;然后过了5秒后阀值才慢慢升高恢复到10</font>

![Warm Up](https://img-blog.csdnimg.cn/6aa6b6db779c4376a33db44faa3401f6.png)

**测试**

多次快速点击http://localhost:8401/testB - 刚开始5s不行，后续慢慢OK

**应用场景**

如：秒杀系统在开启的瞬间，会有很多流量上来，很有可能把系统打死，预热方式就是把为了保护系统，可慢慢的把流量放进来,慢慢的把阀值增长到设置的阀值。

### Sentinel流控-排队等待

匀速排队，让请求以均匀的速度通过，阀值类型必须设成QPS，否则无效。

设置：/testB每秒1次请求，超过的话就排队等待，等待的超时时间为20000毫秒

![排队等待](https://img-blog.csdnimg.cn/18957633292c4ef29ff4541342e5f662.png)

![设置时间及线程数](https://img-blog.csdnimg.cn/3387f46c8a6747808e1ef438f0202b10.png)

![1s一次](https://img-blog.csdnimg.cn/0313d5e9c838447da9c13ff12ba2caf7.png)

### 降级规则

[官方文档](https://github.com/alibaba/Sentinel/wiki/熔断降级)

**熔断降级概述**

​		除了流量控制以外，对调用链路中不稳定的资源进行熔断降级也是保障高可用的重要措施之一。一个服务常常会调用别的模块，可能是另外的一个远程服务、数据库，或者第三方 API 等。例如，支付的时候，可能需要远程调用银联提供的 API；查询某个商品的价格，可能需要进行数据库查询。然而，这个被依赖服务的稳定性是不能保证的。如果依赖的服务出现了不稳定的情况，请求的响应时间变长，那么调用服务的方法的响应时间也会变长，线程会产生堆积，最终可能耗尽业务自身的线程池，服务本身也变得不可用。

​		现代微服务架构都是分布式的，由非常多的服务组成。不同服务之间相互调用，组成复杂的调用链路。以上的问题在链路调用中会产生放大的效果。复杂链路上的某一环不稳定，就可能会层层级联，最终导致整个链路都不可用。因此我们需要对不稳定的弱依赖服务调用进行熔断降级，暂时切断不稳定调用，避免局部不稳定因素导致整体的雪崩。熔断降级作为保护自身的手段，通常在客户端（调用端）进行配置。

[link](https://github.com/alibaba/Sentinel/wiki/熔断降级#概述)

- RT（平均响应时间，秒级）
  - 平均响应时间 超出阈值 且 在时间窗口内通过的请求>=5，两个条件同时满足后触发降级。
    窗口期过后关闭断路器。
  - RT最大4900（更大的需要通过-Dcsp.sentinel.statistic.max.rt=XXXX才能生效）。
- 异常比列（秒级）
  - QPS >= 5且异常比例（秒级统计）超过阈值时，触发降级;时间窗口结束后，关闭降级 。
- 异常数(分钟级)
  - 异常数(分钟统计）超过阈值时，触发降级;时间窗口结束后，关闭降级

- Sentinel熔断降级会在调用链路中某个资源出现不稳定状态时（例如调用超时或异常比例升高)，对这个资源的调用进行限制，让请求快速失败，避免影响到其它的资源而导致级联错误。
- 当资源被降级后，在接下来的降级时间窗口之内，对该资源的调用都自动熔断（默认行为是抛出 DegradeException）。
- Sentinei的断路器是没有类似Hystrix半开状态的。(Sentinei 1.8.0 已有半开状态)
- 半开的状态系统自动去检测是否请求有异常，没有异常就关闭断路器恢复使用，有异常则继续打开断路器不可用。

#### Sentinel降级-RT

>平均响应时间(`DEGRADE_GRADE_RT`)：当1s内持续进入5个请求，对应时刻的平均响应时间（秒级）均超过阈值（ `count`，以ms为单位），那么在接下的时间窗口（`DegradeRule中的timeWindow`，以s为单位）之内，对这个方法的调用都会自动地熔断(抛出`DegradeException` )。注意Sentinel 默认统计的RT上限是4900 ms，超出此阈值的都会算作4900ms，若需要变更此上限可以通过启动配置项-`Dcsp.sentinel.statistic.max.rt=xxx`来配置。

**注意**：Sentinel 1.7.0才有**平均响应时间**（`DEGRADE_GRADE_RT`），Sentinel 1.8.0的没有这项，取而代之的是**慢调用比例** (`SLOW_REQUEST_RATIO`)。

>慢调用比例 (`SLOW_REQUEST_RATIO`)：选择以慢调用比例作为阈值，需要设置允许的慢调用 RT（即最大的响应时间），请求的响应时间大于该值则统计为慢调用。当单位统计时长（`statIntervalMs`）内请求数目大于设置的最小请求数目，并且慢调用的比例大于阈值，则接下来的熔断时长内请求会自动被熔断。经过熔断时长后熔断器会进入探测恢复状态（`HALF-OPEN 状态`），若接下来的一个请求响应时间小于设置的慢调用 RT 则结束熔断，若大于设置的慢调用 RT 则会再次被熔断。link

**测试**

```java
@RestController
@Slf4j
public class FlowLimitController {
	...
@GetMapping("/testD")
public String testD() {
        try { 
            TimeUnit.SECONDS.sleep(1); 
        } catch (InterruptedException e) { 
            e.printStackTrace(); 
        }
        log.info("testD 测试RT");
    }
}
```
![增加熔断规则-慢调用比例](https://img-blog.csdnimg.cn/1a8dca229c0a44b78ae607176dc1951c.png)

启动bin/jemter/jmeter.bat

![第一步](https://img-blog.csdnimg.cn/c1b649662fb648febed959d96b16c15c.png)

![第二步](https://img-blog.csdnimg.cn/ebf8cb8cfd104a27982a25f0a5f5903e.png)
![测试成功](https://img-blog.csdnimg.cn/5a7dbc238fe247f08afd2b45ed9426a9.png)

> 停止运行即可正常访问testD

#### Sentinel降级-异常比例

**是什么？**

>异常比例(`DEGRADE_GRADE_EXCEPTION_RATIO`)：当资源的每秒请求量 >= 5，并且每秒异常总数占通过量的比值超过阈值（ `DegradeRule中的 count`）之后，资源进入降级状态，即在接下的时间窗口( DegradeRule中的timeWindow，以s为单位）之内，对这个方法的调用都会自动地返回。异常比率的阈值范围是[0.0, 1.0]，代表0% -100%。
**注意**，与Sentinel 1.8.0相比，有些不同（Sentinel 1.8.0才有的半开状态），Sentinel 1.8.0的如下：

> 异常比例 (`ERROR_RATIO`)：当单位统计时长（`statIntervalMs`）内请求数目大于设置的最小请求数目，并且异常的比例大于阈值，则接下来的熔断时长内请求会自动被熔断。经过熔断时长后熔断器会进入探测恢复状态（`HALF-OPEN 状态`），若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。异常比率的阈值范围是 [0.0, 1.0]，代表 0% - 100%。[link](https://github.com/alibaba/Sentinel/wiki/熔断降级#熔断策略)

**测试**

```java
@RestController
@Slf4j
public class FlowLimitController {
    ...
        @GetMapping("/testE")
        public String testE()
    {
        log.info("testE 测试异常数");
        int age = 10/0;
        return "------testE 测试异常数";
    }
}
```

![熔断熔断规则-异常比例 ](https://img-blog.csdnimg.cn/2a2b7049c40f4dbaac1295e4f78e7b7c.png)

![压力测试](https://img-blog.csdnimg.cn/521baf4365d2423fb4bc2c50106d4fd0.png)
![关闭压力测试](https://img-blog.csdnimg.cn/d3ce4a279be14ddca6ae18e6024622df.png)

#### Sentinel降级-异常数

是什么？

> 异常数( `DEGRADE_GRADF_EXCEPTION_COUNT` )：当资源近1分钟的异常数目超过阈值之后会进行熔断。注意由于统计时间窗口是分钟级别的，若timeWindow小于60s，则结束熔断状态后码可能再进入熔断状态。

注意，与Sentinel 1.8.0相比，有些不同（Sentinel 1.8.0才有的半开状态），Sentinel 1.8.0的如下：

> 异常数 (`ERROR_COUNT`)：当单位统计时长内的异常数目超过阈值之后会自动进行熔断。经过熔断时长后熔断器会进入探测恢复状态（`HALF-OPEN 状态`），若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。

**测试**

```java
@RestController
@Slf4j
public class FlowLimitController{
	...

@GetMapping("/testC")
    public String testC()
    {
        log.info("testC 测试异常数");
        int age = 10/0;
        return "------testC 测试异常数";
    }
}
```

![新增熔断规则-异常数](https://img-blog.csdnimg.cn/6361e9c9771d4b779ca383b38329000c.png)

![前五次访问](https://img-blog.csdnimg.cn/a5d72db8ff8f4d5eb79377efa4b714db.png)![五次访问之后](https://img-blog.csdnimg.cn/a5fb6865bf314a73b81b2387ff52d7ee.png)

### Sentinel热点

#### key

[官方文档](https://github.com/alibaba/Sentinel/wiki/热点参数限流)

>何为热点？热点即经常访问的数据。很多时候我们希望统计某个热点数据中访问频次最高的 Top K 数据，并对其访问进行限制。比如：
>
>- 商品 ID 为参数，统计一段时间内最常购买的商品 ID 并进行限制
>
>- 用户 ID 为参数，针对一段时间内频繁访问的用户 ID 进行限制
>
热点参数限流会统计传入参数中的热点参数，并根据配置的限流阈值与模式，对包含热点参数的资源调用进行限流。热点参数限流可以看做是一种特殊的流量控制，仅对包含热点参数的资源调用生效。

>兜底方法，分为系统默认和客户自定义，两种
>
>之前的case，限流出问题后，都是用sentinel系统默认的提示: Blocked by Sentinel (flow limiting)
>
>我们能不能自定？类似hystrix，某个方法出问题了，就找对应的兜底降级方法?
>
>结论 - 从HystrixCommand到@SentinelResource

```java
@RestController
@Slf4j
public class FlowLimitController
{

    ...

    @GetMapping("/testHotKey")
    @SentinelResource(value = "testHotKey",blockHandler/*兜底方法*/ = "deal_testHotKey")
    public String testHotKey(@RequestParam(value = "p1",required = false) String p1,
                             @RequestParam(value = "p2",required = false) String p2) {
        //int age = 10/0;
        return "------testHotKey";
    }
    
    /*兜底方法*/
    public String deal_testHotKey (String p1, String p2, BlockException exception) {
        return "------deal_testHotKey,o(╥﹏╥)o";  //sentinel系统默认的提示：Blocked by Sentinel (flow limiting)
    }

}
```

>`@SentinelResource(value = "testHotKey")`
>异常打到了前台用户界面看到，不友好
>
>`@SentinelResource(value = "testHotKey", blockHandler = "dealHandler_testHotKey")`
>方法testHotKey里面第一个参数只要QPS超过每秒1次，马上降级处理,异常用了我们自己定义的兜底方法

![热点规则](https://img-blog.csdnimg.cn/d51f49f7433044f3a8674a2cca2f0273.png)

> 参数 索引 0 指的是第0个参数即p1，跟p2没有关系。

![访问1s超过1次](https://img-blog.csdnimg.cn/d5db6b629c2742b6ba4de2511ed651b6.png)

#### 参数例外项

**参数例外项**

- 普通 - 超过1秒钟一个后，达到阈值1后马上被限流
- **我们期望p1参数当它是某个特殊值时，它的限流值和平时不一样**
- 特例 - 假如当p1的值等于5时，它的阈值可以达到200

![参数例外项](https://img-blog.csdnimg.cn/933e0a28ed37484a92e26d4861357bae.png)
![多次刷新并无限流](https://img-blog.csdnimg.cn/b0189747f3134af3baf3ff4eecb0e703.png)

在方法体抛异常，将会抛出Spring Boot 2的默认异常页面，而不是兜底方法。

`@SentinelResource` - 处理的是sentinel控制台配置的违规情况，有blockHandler方法配置的兜底处理;

`RuntimeException int age = 10/0`，这个是java运行时报出的运行时异常`RunTimeException`，`@SentinelResource`不管

总结 - `@SentinelResource`主管配置出错，运行出错该走异常走异常

### Sentinel系统规则

[官方文档](https://github.com/alibaba/Sentinel/wiki/系统自适应限流)

> Sentinel 系统自适应限流从整体维度对应用入口流量进行控制，结合应用的 Load、CPU 使用率、总体平均 RT、入口 QPS 和并发线程数等几个维度的监控指标，通过自适应的流控策略，让系统的入口流量和系统的负载达到一个平衡，让系统尽可能跑在最大吞吐量的同时保证系统整体的稳定性。[link](https://github.com/alibaba/Sentinel/wiki/系统自适应限流)

> 系统规则
>
> 系统保护规则是从应用级别的入口流量进行控制，从单台机器的 load、CPU 使用率、平均 RT、入口 QPS 和并发线程数等几个维度监控应用指标，让系统尽可能跑在最大吞吐量的同时保证系统整体的稳定性。
>
> 系统保护规则是应用整体维度的，而不是资源维度的，并且仅对入口流量生效。入口流量指的是进入应用的流量（`EntryType.IN`），比如 Web 服务或 Dubbo 服务端接收的请求，都属于入口流量。
>
> 系统规则支持以下的模式：
>
> - Load 自适应（仅对 Linux/Unix-like 机器生效）：系统的 load1 作为启发指标，进行自适应系统保护。当系统 load1 超过设定的启发值，且系统当前的并发线程数超过估算的系统容量时才会触发系统保护（BBR 阶段）。系统容量由系统的 `maxQps * minRt` 估算得出。设定参考值一般是 `CPU cores * 2.5`。
> - CPU usage（1.5.0+ 版本）：当系统 CPU 使用率超过阈值即触发系统保护（取值范围 0.0-1.0），比较灵敏。
> - 平均 RT：当单台机器上所有入口流量的平均 RT 达到阈值即触发系统保护，单位是毫秒。
> - 并发线程数：当单台机器上所有入口流量的并发线程数达到阈值即触发系统保护。
> - 入口 QPS：当单台机器上所有入口流量的 QPS 达到阈值即触发系统保护。
>
> [link](https://github.com/alibaba/Sentinel/wiki/系统自适应限流#系统规则)

![入口QPS](https://img-blog.csdnimg.cn/9cc6dc49016e49d48d0354e74b24585c.png)

![任何端口刷新1s超过1次](https://img-blog.csdnimg.cn/3bea4ec4d4ff441ba98dbf55a74e5752.png)

### @SentinelResource

**启动Nacos成功**

**启动Sentinel成功**

**Module - cloudalibaba-sentinel-service8401**

RateLimitController

```java
@RestController
public class RateLimitController {
    /**
     * value:资源名
     * blockHandler ： 指定兜底方法
     * @return
     */
    @GetMapping("/byResource")
    @SentinelResource(value = "byResource", blockHandler = "handleException")
    public CommonResult byResource() {
        return new CommonResult(200, "按资源名称限流测试OK", new Payment(2020L, "serial001"));
    }

    /**
     * 兜底方法
     * @param exception
     * @return
     */
    public CommonResult handleException(BlockException exception) {
        return new CommonResult(444, exception.getClass().getCanonicalName() + "\t 服务不可用");
    }

    /**
     * 未指定兜底方法，使用官方默认兜底方法，目前版本报500错误
     * @return
     */
    @GetMapping("/rateLimit/byUrl")
    @SentinelResource(value = "byUrl")
    public CommonResult byUrl()
    {
        return new CommonResult(200,"按url限流测试OK",new Payment(2020L,"serial002"));
    }

    /**
     * value:资源名
     * blockHandlerClass：指定兜底的类
     * blockHandler：指定兜底类中的指定方法
     * @return
     */
    @GetMapping("/rateLimit/customerBlockHandler")
    @SentinelResource(value = "customerBlockHandler",
            blockHandlerClass = CustomerBlockHandler.class,//<-------- 自定义限流处理类
            blockHandler = "handlerException2")//<-----------
    public CommonResult customerBlockHandler()
    {
        return new CommonResult(200,"按客戶自定义",new Payment(2020L,"serial003"));
    }
}
```

CustomerBlockHandler

```java
public class CustomerBlockHandler {
    /**
     * 兜底方法1
     * @param exception
     * @return
     */
    public static CommonResult handlerException(BlockException exception) {
        return new CommonResult(4444,"按客戶自定义,global handlerException----1");
    }

    /**
     * 兜底方法2
     * @param exception
     * @return
     */
    public static CommonResult handlerException2(BlockException exception) {
        return new CommonResult(4444,"按客戶自定义,global handlerException----2");
    }
}
```

> 演示自定义限流类处理，其余看注释同理

![流控规则配置](https://img-blog.csdnimg.cn/523cb13aedb24ce6bd854b75bcc9082d.png)

![1s刷新超过一次](https://img-blog.csdnimg.cn/5085e1a856854066a448c21129edb507.png)


> `@SentinelResource` 注解
>
> 注意：注解方式埋点不支持 `private` 方法。
>
> - `@SentinelResource `用于定义资源，并提供可选的异常处理和 fallback 配置项。` @SentinelResource `注解包含以下属性：
>   - `value`：资源名称，必需项（不能为空）
>   - `entryType`：entry 类型，可选项（默认为 EntryType.OUT）
>   - `blockHandler / blockHandlerClass`: `blockHandler` 对应处理 `BlockException `的函数名称，可选项。`blockHandler `函数访问范围需要是 `public`，返回类型需要与原方法相匹配，参数类型需要和原方法相匹配并且最后加一个额外的参数，类型为 `BlockException`。`blockHandler `函数默认需要和原方法在同一个类中。若希望使用其他类的函数，则可以指定 `blockHandlerClass`为对应的类的 `Class `对象，注意对应的函数必需为` static `函数，否则无法解析。
>   - `fallback /fallbackClass`：`fallback` 函数名称，可选项，用于在抛出异常的时候提供` fallback `处理逻辑。fallback 函数可以针对所有类型的异常（除了`exceptionsToIgnore`里面排除掉的异常类型）进行处理。`fallback` 函数签名和位置要求：
>     - 返回值类型必须与原函数返回值类型一致；
>     - 方法参数列表需要和原函数一致，或者可以额外多一个 `Throwable `类型的参数用于接收对应的异常。
>     - `fallback` 函数默认需要和原方法在同一个类中。若希望使用其他类的函数，则可以指定 `fallbackClass `为对应的类的 `Class `对象，注意对应的函数必需为 static 函数，否则无法解析。
>   - `defaultFallback（since 1.6.0）`：默认的 `fallback` 函数名称，可选项，通常用于通用的` fallback` 逻辑（即可以用于很多服务或方法）。默认` fallback` 函数可以针对所有类型的异常（除了`exceptionsToIgnore`里面排除掉的异常类型）进行处理。若同时配置了` fallback `和 `defaultFallback`，则只有 `fallback `会生效。`defaultFallback` 函数签名要求：
>     - 返回值类型必须与原函数返回值类型一致；
>     - 方法参数列表需要为空，或者可以额外多一个 Throwable 类型的参数用于接收对应的异常。
>     - `defaultFallback `函数默认需要和原方法在同一个类中。若希望使用其他类的函数，则可以指定 `fallbackClass` 为对应的类的 `Class` 对象，注意对应的函数必需为 static 函数，否则无法解析。
>   - `exceptionsToIgnore（since 1.6.0）`：用于指定哪些异常被排除掉，不会计入异常统计中，也不会进入` fallback `逻辑中，而是会原样抛出。
>   [link](https://github.com/alibaba/Sentinel/wiki/注解支持#sentinelresource-注解)

### Sentinel服务熔断

sentinel整合ribbon+openFeign+fallback

Ribbon系列

- 启动nacos和sentinel
- 提供者9003/9004
- 消费者84

**提供者9003/9004**

新建cloudalibaba-provider-payment9003/9004

![目录结构](https://img-blog.csdnimg.cn/2d017049f1d4468babd0a3300442b69a.png)

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

    <artifactId>cloudalibaba-provider-payment9003</artifactId>
    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <dependency><!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
            <groupId>com.ssm.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
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
  port: 9003

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

PaymentMain9003

```java
@SpringBootApplication
@EnableDiscoveryClient
public class PaymentMain9003 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain9003.class, args);
    }
}
```

PaymentController

```java
@RestController
public class PaymentController {
    @Value("${server.port}")
    private String serverPort;

    //模拟数据库
    public static HashMap<Long, Payment> hashMap = new HashMap<>();
    static
    {
        hashMap.put(1L,new Payment(1L,"28a8c1e3bc2742d8848569891fb42181"));
        hashMap.put(2L,new Payment(2L,"bba8c1e3bc2742d8848569891ac32182"));
        hashMap.put(3L,new Payment(3L,"6ua8c1e3bc2742d8848569891xt92183"));
    }

    @GetMapping(value = "/paymentSQL/{id}")
    public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id)
    {
        Payment payment = hashMap.get(id);
        CommonResult<Payment> result = new CommonResult(200,"from mysql,serverPort:  "+serverPort,payment);
        return result;
    }

}
```

> 9004同理

**消费者cloudalibaba-consumer-nacos-order84** 

![目录结构](https://img-blog.csdnimg.cn/05c3d675f3ec4978ac9e7d3f56bd63bd.png)

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

    <artifactId>cloudalibaba-consumer-nacos-order84</artifactId>
    <dependencies>
        <!--SpringCloud openfeign -->

<!--        <dependency>-->
<!--            <groupId>org.springframework.cloud</groupId>-->
<!--            <artifactId>spring-cloud-starter-openfeign</artifactId>-->
<!--        </dependency>-->

        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.ssm.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
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
  port: 84

spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
    sentinel:
      transport:
        #配置Sentinel dashboard地址
        dashboard: localhost:8080
        #默认8719端口，假如被占用会自动从8719开始依次+1扫描,直至找到未被占用的端口
        port: 8719

#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者)
service-url:
  nacos-user-service: http://nacos-payment-provider

# 激活Sentinel对Feign的支持
#feign:
#  sentinel:
#    enabled: false
```

ApplicationContextConfig

```java
@Configuration
public class ApplicationContextConfig {

    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
```

CircleBreakerController

```java
@RestController
@Slf4j
public class CircleBreakerController {
    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
    @SentinelResource(value = "fallback")//没有配置
    public CommonResult<Payment> fallback(@PathVariable Long id)
    {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/"+id, CommonResult.class,id);

        if (id == 4) {
            throw new IllegalArgumentException ("IllegalArgumentException,非法参数异常....");
        }else if (result.getData() == null) {
            throw new NullPointerException ("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }

}
```

OrderNacosMain84

```java
@EnableDiscoveryClient
@SpringBootApplication
//@EnableFeignClients
public class OrderNacosMain84 {
    public static void main(String[] args) {
        SpringApplication.run(OrderNacosMain84.class, args);
    }
}
```

**测试**

http://localhost:9003/paymentSQL/3

http://localhost:84/consumer/fallback/1

![测试通过9003&9004轮询](https://img-blog.csdnimg.cn/173a968448c54abe894bd8acd4f9f8cb.png)
### Sentinel服务熔断

#### Sentinel服务熔断无配置

![页面不友好](https://img-blog.csdnimg.cn/5dd2cdbaa5b344b0a49fc2d78acefef3.png)

#### Sentinel服务熔断只配置fallback

<font color="orange">fallback**只负责业务异常**</font>

```java
@RestController
@Slf4j
public class CircleBreakerController {
    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
//    @SentinelResource(value = "fallback")//没有配置
    @SentinelResource(value = "fallback", fallback = "handlerFallback") //fallback只负责业务异常
    public CommonResult<Payment> fallback(@PathVariable Long id)
    {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/"+id, CommonResult.class,id);

        if (id == 4) {
            throw new IllegalArgumentException ("IllegalArgumentException,非法参数异常....");
        }else if (result.getData() == null) {
            throw new NullPointerException ("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }
    //本例是fallback
    public CommonResult handlerFallback(@PathVariable  Long id,Throwable e) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(444,"兜底异常handlerFallback,exception内容  "+e.getMessage(),payment);
    }
}

```

![有好提示](https://img-blog.csdnimg.cn/2915124cd7d64c08a4ec557aefd9b8ee.png)

#### Sentinel服务熔断只配置blockHandler

<font color="orange">blockHandler只负责**sentinel控制台配置违规**</font>

```java

@RestController
@Slf4j
public class CircleBreakerController {
    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
//    @SentinelResource(value = "fallback")//没有配置
//    @SentinelResource(value = "fallback", fallback = "handlerFallback") //fallback只负责业务异常
    @SentinelResource(value = "fallback",blockHandler = "blockHandler") //blockHandler只负责sentinel控制台配置违规
    public CommonResult<Payment> fallback(@PathVariable Long id)
    {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/"+id, CommonResult.class,id);

        if (id == 4) {
            throw new IllegalArgumentException ("IllegalArgumentException,非法参数异常....");
        }else if (result.getData() == null) {
            throw new NullPointerException ("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }
    //本例是fallback
//    public CommonResult handlerFallback(@PathVariable  Long id,Throwable e) {
//        Payment payment = new Payment(id,"null");
//        return new CommonResult<>(444,"兜底异常handlerFallback,exception内容  "+e.getMessage(),payment);
//    }
    //本例是blockHandler
    public CommonResult blockHandler(@PathVariable  Long id, BlockException blockException) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(445,"blockHandler-sentinel限流,无此流水: blockException  "+blockException.getMessage(),payment);
    }
}

```

![编辑熔断规则](https://img-blog.csdnimg.cn/538a57bc86bb4a22b5d3ab36e71c4dc4.png)

![多次刷新](https://img-blog.csdnimg.cn/e315052b67784b37b8c156d84905a338.png)

#### Sentinel服务熔断fallback和blockHandler都配置

<font color="orange">若blockHandler和fallback 都进行了配置，则被限流降级而抛出BlockException时只会进入blockHandler处理逻辑。</font>

```java

@RestController
@Slf4j
public class CircleBreakerController {
    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
//    @SentinelResource(value = "fallback")//没有配置
//    @SentinelResource(value = "fallback", fallback = "handlerFallback") //fallback只负责业务异常
//    @SentinelResource(value = "fallback",blockHandler = "blockHandler") //blockHandler只负责sentinel控制台配置违规
    @SentinelResource(value = "fallback",fallback = "handlerFallback",blockHandler = "blockHandler")
    public CommonResult<Payment> fallback(@PathVariable Long id)
    {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/"+id, CommonResult.class,id);

        if (id == 4) {
            throw new IllegalArgumentException ("IllegalArgumentException,非法参数异常....");
        }else if (result.getData() == null) {
            throw new NullPointerException ("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }
//    本例是fallback
    public CommonResult handlerFallback(@PathVariable  Long id,Throwable e) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(444,"兜底异常handlerFallback,exception内容  "+e.getMessage(),payment);
    }
    //本例是blockHandler
    public CommonResult blockHandler(@PathVariable  Long id, BlockException blockException) {
        Payment payment = new Payment(id,"null");
        return new CommonResult<>(445,"blockHandler-sentinel限流,无此流水: blockException  "+blockException.getMessage(),payment);
    }
}
```

![编辑熔断规则](https://img-blog.csdnimg.cn/74e86a4be5744948ae9001a476815a20.png)

![刷新1次](https://img-blog.csdnimg.cn/d2c19465cb8043d2a053cb07286fdf7e.png)![刷新次数超过1次](https://img-blog.csdnimg.cn/c12f37373f864272aa991468d27af984.png)

#### Sentinel服务熔断exceptionsToIgnore

<font color="orange">exceptionsToIgnore，忽略指定异常，即这些异常不用兜底方法处理。</font>

```java
@RestController
@Slf4j
public class CircleBreakerController {
    public static final String SERVICE_URL = "http://nacos-payment-provider";

    @Resource
    private RestTemplate restTemplate;

    @RequestMapping("/consumer/fallback/{id}")
//    @SentinelResource(value = "fallback")//没有配置
//    @SentinelResource(value = "fallback", fallback = "handlerFallback") //fallback只负责业务异常
//    @SentinelResource(value = "fallback",blockHandler = "blockHandler") //blockHandler只负责sentinel控制台配置违规
    @SentinelResource(value = "fallback", fallback = "handlerFallback", blockHandler = "blockHandler", exceptionsToIgnore = {IllegalArgumentException.class})
    public CommonResult<Payment> fallback(@PathVariable Long id) {
        CommonResult<Payment> result = restTemplate.getForObject(SERVICE_URL + "/paymentSQL/" + id, CommonResult.class, id);

        if (id == 4) {
            throw new IllegalArgumentException("IllegalArgumentException,非法参数异常....");
        } else if (result.getData() == null) {
            throw new NullPointerException("NullPointerException,该ID没有对应记录,空指针异常");
        }

        return result;
    }

    //    本例是fallback
    public CommonResult handlerFallback(@PathVariable Long id, Throwable e) {
        Payment payment = new Payment(id, "null");
        return new CommonResult<>(444, "兜底异常handlerFallback,exception内容  " + e.getMessage(), payment);
    }

    //本例是blockHandler
    public CommonResult blockHandler(@PathVariable Long id, BlockException blockException) {
        Payment payment = new Payment(id, "null");
        return new CommonResult<>(445, "blockHandler-sentinel限流,无此流水: blockException  " + blockException.getMessage(), payment);
    }
}
```

![忽略异常](https://img-blog.csdnimg.cn/d56aa9cbb6ea45e990e8882cae501ff1.png)

### Sentinel服务熔断OpenFeign

**修改84模块**

POM

```xml
<!--SpringCloud openfeign -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

YML

```yaml
# 激活Sentinel对Feign的支持
feign:
  sentinel:
    enabled: true
```

OrderNacosMain84

```java
@EnableDiscoveryClient
@SpringBootApplication
@EnableFeignClients
public class OrderNacosMain84 {
    public static void main(String[] args) {
        SpringApplication.run(OrderNacosMain84.class, args);
    }
}
```

PaymentService

```java
@FeignClient(value = "nacos-payment-provider", fallback = PaymentFallbackService.class)
public interface PaymentService {
    @GetMapping(value = "/paymentSQL/{id}")
    public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id);
}
```

PaymentFallbackService

```java
package com.ssm.springcloud.service.impl;

import com.ssm.springcloud.entities.CommonResult;
import com.ssm.springcloud.entities.Payment;
import com.ssm.springcloud.service.PaymentService;
import org.springframework.stereotype.Component;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2022/3/26 16:25
 */
@Component
public class PaymentFallbackService implements PaymentService {
    @Override
    public CommonResult<Payment> paymentSQL(Long id)
    {
        return new CommonResult<>(44444,"服务降级返回,---PaymentFallbackService",new Payment(id,"errorSerial"));
    }
}
```

CircleBreakerController

```java
@RestController
@Slf4j
public class CircleBreakerController {
	...

    //OpenFeign
    @Resource
    private PaymentService paymentService;

    @GetMapping(value = "/consumer/paymentSQL/{id}")
    public CommonResult<Payment> paymentSQL(@PathVariable("id") Long id) {
        return paymentService.paymentSQL(id);
    }
}
```

**测试**

http://localhost:84/consumer/paymentSQL/1

<font color="orange">测试84调用9003，此时故意关闭9003微服务提供者，**84消费侧自动降级**，不会被耗死。</font>

![服务熔断](https://img-blog.csdnimg.cn/64d2063cee654b05a6e507bc55007728.png)

### Sentinel持久化规则

- <font color="orange">一旦我们重启应用，sentinel规则将消失，生产环境需要将配置规则进行持久化。</font>

- 将限流配置规则持久化进Nacos保存，只要刷新8401某个rest地址，sentinel控制台的流控规则就能看到，只要Nacos里面的配置不删除，针对8401上sentinel上的流控规则持续有效。

**步骤**

修改cloudalibaba-sentinel-service840

POM

```xml
<!--SpringCloud ailibaba sentinel-datasource-nacos 后续做持久化用到-->
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-nacos</artifactId>
</dependency>
```

YML

```yaml
server:
  port: 8401

spring:
  application:
    name: cloudalibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
    sentinel:
      transport:
        dashboard: localhost:8080 #配置Sentinel dashboard地址
        port: 8719
      datasource: #<---------------------------关注点，添加Nacos数据源配置
        ds1:
          nacos:
            server-addr: localhost:8848
            dataId: cloudalibaba-sentinel-service
            groupId: DEFAULT_GROUP
            data-type: json
            rule-type: flow

management:
  endpoints:
    web:
      exposure:
        include: '*'

feign:
  sentinel:
    enabled: true # 激活Sentinel对Feign的支持

```

添加Nacos业务规则配置

```json
[
    {
    "resource": "/rateLimit/byUrl",
    "limitApp":"default",
    "grade":1,
    "count":1,
    "strategy":0,
    "controlBehavior":0,
    "clusterMode":false
    }
]
```

![业务规则配置](https://img-blog.csdnimg.cn/74af55fa768a41a088f7ef274128438c.png)

> `resource`：资源名称；
> `limitApp`：来源应用；
> `grade`：阈值类型，0表示线程数, 1表示QPS；
> `count`：单机阈值；
> `strategy`：流控模式，0表示直接，1表示关联，2表示链路；
> `controlBehavior`：流控效果，0表示快速失败，1表示Warm Up，2表示排队等待；
> `clusterMode`：是否集群。

启动8401后访问一次`http://localhost:8401/testA`刷新sentinel发现业务规则有了

![生成业务规则](https://img-blog.csdnimg.cn/cd4a960d6e4a483d85804f0673e0d87f.png)

快速访问测试接口 - http://localhost:8401/rateLimit/byUrl - 页面返回`Blocked by Sentinel (flow limiting)`

![测试成功](https://img-blog.csdnimg.cn/c28025309700489db93f56fac64e92a8.png)

