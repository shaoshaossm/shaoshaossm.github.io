---
title: SpringCloud之Ribbon
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-17 10:34:07
password:
img: https://img-blog.csdnimg.cn/2383992cfccd435b9684cae1a36682db.png
summary: 总结springcloud中Ribbon的使用方法-----------------------------------
tags: [SpringCloud,Ribbon]
categories: 框架 
---

### 简介

Spring Cloud Ribbon是基于Netflix Ribbon实现的一套客户端负载均衡的工具。

​		简单的说，Ribbon是Netflix发布的开源项目，主要功能是提供客户端的软件负载均衡算法和服务调用。Ribbon客户端组件提供一系列完善的配置项如连接超时，重试等。

​		简单的说，就是在配置文件中列出Load Balancer(简称LB)后面所有的机器，Ribbon会自动的帮助你基于某种规则(如简单轮询，随机连接等）去连接这些机器。我们很容易使用Ribbon实现自定义的负载均衡算法。

[Github - Ribbon](https://github.com/Netflix/ribbon/wiki/Getting-Started)

- LB负载均衡(Load Balance)是什么？

简单的说就是将用户的请求平摊的分配到多个服务上，从而达到系统的HA (高可用)。

- 常见的负载均衡有软件Nginx，LVS，硬件F5等。

- Ribbon本地负载均衡客户端VS Nginx服务端负载均衡区别
  - Nginx是服务器负载均衡，客户端所有请求都会交给nginx，然后由nginx实现转发请求。即负载均衡是由服务端实现的。
  - Ribbon本地负载均衡，在调用微服务接口时候，会在注册中心上获取注册信息服务列表之后缓存到JVM本地，从而在本地实现RPC远程服务调用技术。

- 集中式LB
  - 即在服务的消费方和提供方之间使用独立的LB设施(可以是硬件，如F5, 也可以是软件，如nginx)，由该设施负责把访问请求通过某种策略转发至服务的提供方;

- 进程内LB
  - 将LB逻辑集成到消费方，消费方从服务注册中心获知有哪些地址可用，然后自己再从这些地址中选择出一个合适的服务器。
  - Ribbon就属于进程内LB，它只是一个类库，集成于消费方进程，消费方通过它来获取到服务提供方的地址。

负载均衡 + RestTemplate调用

**Ribbon其实就是一个软负载均衡的客户端组件，它可以和其他所需请求的客户端结合使用，和Eureka结合只是其中的一个实例**

Ribbon在工作时分成两步：

- 第一步先选择EurekaServer ,它优先选择在同一个区域内负载较少的server。
- 第二步再根据用户指定的策略，在从server取到的服务注册列表中选择一个地址。

- 其中Ribbon提供了多种策略：比如**轮询**（默认）、随机和根据响应时间加权。

### Ribbon的负载均衡和Rest调用

![依赖](https://img-blog.csdnimg.cn/f971aad9aa8344e49a1e13f40b3ddcd9.png)

```xml
<dependency>
    <groupld>org.springframework.cloud</groupld>
    <artifactld>spring-cloud-starter-netflix-ribbon</artifactid>
</dependency>
```

>spring-cloud-starter-netflix-eureka-client自带了spring-cloud-starter-ribbon引用。

#### RestTemplate的再次使用

`getForObject() / getForEntity() `- GET请求方法

`postForObject() / postForEntity()` - POST请求方法

`getForObject()`：返回对象为响应体中数据转化成的对象，基本上可以理解为Json。

`getForEntity()`：返回对象为ResponseEntity对象，包含了响应中的一些重要信息，比如响应头、响应状态码、响应体等。

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
    // 再次使用
    @GetMapping(value = "/consumer/payment/getForEntity/{id}",produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public CommonResult<Payment> getPayment2(@PathVariable("id") Long id){
        ResponseEntity<CommonResult> forEntity = restTemplate.getForEntity(PAYMENT_URL + "/payment/get/" + id, CommonResult.class);
        if (forEntity.getStatusCode().is2xxSuccessful()){
            return forEntity.getBody();
        } else {
            return new CommonResult<>(444,"操作失败");
        }
    }
}
```
### Ribbon核心组件IRule

![IRule](https://img-blog.csdnimg.cn/5cfe5238df50401ba986cadfa648cb89.png)

- `IRule`:根据特定算法从服务列表中选取一个要访问的服务
  - `com.netflix.loadbalancer.RoundRobinRule` 轮询
  - `com.netflix.loadbalancer.RandomRule` 随机
  - `com.netflix.loadbalancer.RetryRule`   先按照RoundRobinRule的策略获取服务，如果获取服务失败则在指定时间内会进行重试
  - `WeightedResponseTimeRule`  对RoundRobinRule的扩展，响应速度越快的实例选择权重越大，越容易被选择
  - `BestAvailableRule`  会先过滤掉由于多次访问故障而处于断路器跳闸状态的服务，然后选择一个并发量最小的服务
  - `AvailabilityFilteringRule`   先过滤掉故障实例，再选择并发较小的实例
  - `ZoneAvoidanceRule`  默认规则，复合判断server所在区域的性能和server的可用性选择服务器

### 修改Ribbon默认负载均衡规则

![警告](https://img-blog.csdnimg.cn/23c30ef2fb8c4d6794cdc4eee840356f.png)

#### 项目搭建

- 在原有的eureka项目上稍作修改即可

![目录结构](https://img-blog.csdnimg.cn/8de3d6663b614eaa9d847b20a8882e84.png)

OrderMain80

```java
@SpringBootApplication
@EnableEurekaClient
// CLOUD-PAYMENT-SERVICE 服务明大写
@RibbonClient(name = "CLOUD-PAYMENT-SERVICE",configuration = MySelfRule.class)
public class OrderMain80 {
    public static void main(String[] args) {
        SpringApplication.run(OrderMain80.class,args);
    }
}
```

MySelfRule

```java
@Configuration
public class MySelfRule {

    @Bean
    public IRule myRule(){
        return new RandomRule();//定义为随机
    }
}
```

![测试运行为随机访问](https://img-blog.csdnimg.cn/8db8da6de5ae4a9eb1e100978418d69c.png)

> 其余规则同理修改配置类即可

### Ribbon负载均衡算法

负载均衡算法：<font color="red">rest接口第几次请求数 % 服务器集群总数量 = 实际调用服务器位置下标 ，每次服务重启动后rest接口计数从1开始。</font>

<font color="blue">List<ServiceInstance> instances = discoveryClient.getInstances("CLOUD-PAYMENT-SERVICE");</font>

- List [0] instances = 127.0.0.1:8002

- List [1] instances = 127.0.0.1:8001

8001+ 8002 组合成为集群，它们共计2台机器，集群总数为2， 按照轮询算法原理：

当总请求数为1时： 1 % 2 =1 对应下标位置为1 ，则获得服务地址为127.0.0.1:8001

当总请求数位2时： 2 % 2 =0 对应下标位置为0 ，则获得服务地址为127.0.0.1:8002

当总请求数位3时： 3 % 2 =1 对应下标位置为1 ，则获得服务地址为127.0.0.1:8001

当总请求数位4时： 4 % 2 =0 对应下标位置为0 ，则获得服务地址为127.0.0.1:8002

以此类推......

