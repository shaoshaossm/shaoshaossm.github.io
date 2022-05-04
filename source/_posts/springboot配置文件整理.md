---
title: springboot配置文件整理
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-04 14:01:26
password:
summary: 整理一下springboot所用到的配置文件-------------------------
tags: properties
categories: 配置文件
---

```properties
# 内嵌tomcat端口号
server.port=8081
server.servlet.context-path=/

# 数据库配置
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/guli?useSSL=false&serverTimezone=GMT%2B8&allowPublicKeyRetrieval=true
spring.datasource.url=jdbc:mysql://192.168.174.131:3306/springboot?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=密码

# dubbo配置
spring.application.name=024-springboot-dubbo-ssm-provider
spring.dubbo.server=true

# 指定注册中心
spring.dubbo.registry=zookeeper://192.168.174.131:2181

#配置视图解析器
spring.mvc.view.prefix=/
spring.mvc.view.suffix=.jsp

#自定义配置
school.name=bjpowernode
school.websit=http://www.baidu.com

#设置内嵌Tomcat端口号
server.port=8080
server.servlet.context-path=/

#设置dubbo配置
spring.application.name=025-springboot-dubbo-ssm-consumer
spring.dubbo.registry=zookeeper://192.168.174.131:2181

#配置视图解析器
spring.mvc.view.prefix=/
spring.mvc.view.suffix=.jsp

#关闭sspringboot字符编码支持
spring.http.encoding.enabled=false

# 设置thymeleaf模板引擎的前/后缀（可选项）
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html
# 关闭页面缓存
spring.thymeleaf.cache=false
# 自定义错误页处理
spring.mvc.locale-resolver=fixed

# 开启自动配置报告
debug=true

# 应用名称
#Redis服务器地址
spring.redis.host=127.0.0.1
#Redis服务器连接端口
spring.redis.port=6379
#Redis数据库索引（默认为0）
spring.redis.database= 0
#连接超时时间（毫秒）
spring.redis.timeout=1800000
#连接池最大连接数（使用负值表示没有限制）
spring.redis.lettuce.pool.max-active=20
#最大阻塞等待时间(负数表示没限制)
spring.redis.lettuce.pool.max-wait=-1
#连接池中的最大空闲连接
spring.redis.lettuce.pool.max-idle=5
#连接池中的最小空闲连接
spring.redis.lettuce.pool.min-idle=0

# redis配置
spring.redis.host=192.168.174.131
spring.redis.port=6379
spring.redis.password=123456

# 静态资源
# 设置静态资源访问路径
spring.resources.static-locations=classpath:/haha/
# 设置静态资源访问前缀
spring.mvc.static-path-pattern=/res/**
# 缓存配置
spring.resources.cache.period=11000

# 文件上传
# 设置单个文件上传大小
spring.servlet.multipart.max-request-size=10MB
# 设置多个个文件集体上传大小
spring.servlet.multipart.max-file-size=10MB

```

```yaml
eureka:
  instance:
    hostname: localhost #eureka服务端的实例名称
  client:
    #false表示不向注册中心注册自己。默认true
    register-with-eureka: false
    #false表示自己端就是注册中心，我的职责就是维护服务实例，并不需要去检索服务
    #是否从EurekaServer抓取已有的注册信息，默认为true。单节点无所谓，集群必须设置为true才能配合ribbon使用负载均衡
    fetch-registry: false
    service-url:
    #设置与Eureka Server交互的地址查询服务和注册服务都需要依赖这个地址。
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
  instance: 
      instance-id: payment8001 # 增加服务别名
      prefer-ip-address: true # 访问路径显示IP地址
   server:
    #关闭自我保护机制，保证不可用服务被及时踢除
    enable-self-preservation: false
    eviction-interval-timer-in-ms: 2000 # 默认90s 改成2s
    
 # 服务提供者   
  instance:
      instance-id: payment8001
      prefer-ip-address: true
      #Eureka客户端向服务端发送心跳的时间间隔，单位为秒(默认是30秒)
      lease-renewal-interval-in-seconds: 1
      #Eureka服务端在收到最后一次心跳后等待时间上限，单位为秒(默认是90秒)，超时将剔除服务
      lease-expiration-duration-in-seconds: 2    

#服务别名----注册zookeeper到注册中心名称
spring:
  application:
    name: cloud-provider-payment
  cloud:
    zookeeper:
      connect-string: 192.168.174.131:2181     
      
#consul注册中心  
spring:
  application:
    name: consul-provider-payment
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
        
# 设置feign客户端超时时间,(OpenFeign默认支持Ribbon)
ribbon:
  # 指的是建立连接后从服务器读取到可用资源所用的时间
  ReadTimeout:  5000
  # 指的是连接所用的时间，适用于网络状况正常的情况下，两端连接所用的时间
  ConnectTimeout: 5000     
  

# feign日志
logging:
  level:
    # feign日志以什么级别监控哪个接口
    com.ssm.springcloud.service.PaymentService: debug
feign:
 hystrix:
   enabled: true #如果处理自身的容错就开启。开启方式与生产端不一样。 
   
# hystrix超时设置    
hystrix:
  command:
    default:
      execution:
        isolation:
          thread:
            timeoutInMilliseconds: 3000    
# gateway    
spring:
  application:
    name: cloud-gateway
  #############################新增网关配置###########################
  cloud:
    gateway:
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          uri: http://localhost:8001          #匹配后提供服务的路由地址
          #uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          uri: http://localhost:8001          #匹配后提供服务的路由地址
          #uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由    
            
# config服务端   
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

# config客户端
spring:
  application:
    name: config-client
  cloud:
    #Config客户端配置
    config:
      label: master #分支名称
      name: config #配置文件名称
      profile: dev #读取后缀名称   上述3个综合：master分支上config-dev.yml的配置文件被读取http://config-3344.com:3344/master/config-dev.yml
      uri: http://localhost:3344 #配置中心地址k
# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"

#rabbitmq相关配置<--------------------------
rabbitmq:
  host: 192.168.174.131
  port: 15672
  username: admin
  password: 密码
##rabbitmq相关配置,暴露bus刷新配置的端点<--------------------------
management:
  endpoints: #暴露bus刷新配置的端点
    web:
      exposure:
        include: 'bus-refresh'
```

```yaml
# Springcloud Stream
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
                password: 
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
    
# nacos     
spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
# sentinel        
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
      datasource: #<---------------------------关注点，添加Nacos数据源配置 持久化
        ds1:
          nacos:
            server-addr: localhost:8848
            dataId: cloudalibaba-sentinel-service
            groupId: DEFAULT_GROUP
            data-type: json
            rule-type: flow  
feign:
  sentinel:
    enabled: true # 激活Sentinel对Feign的支持            
```

```yaml
spring:
  datasource:
    # 配置数据源信息 datasource:
    dynamic:
      # 设置默认的数据源或者数据源组,默认值即为master
      primary: master
      # 严格匹配数据源,默认false.true未匹配到指定数据源时抛异常,false使用默认数据源
      strict: false
      datasource:
        master:
          url: jdbc:mysql://localhost:3306/mybatis_plus?useSSL=false&serverTimezone=GMT%2B8&allowPublicKeyRetrieval=true
          driver-class-name: com.mysql.cj.jdbc.Driver
          username: root
          password: '密码'
        slave_1:
          # 我的数据库是8.0.27 5版本的可以使用jdbc:mysql://localhost:3306/mybatis_plus?characterEncoding=utf-8&useSSL=false
          url: jdbc:mysql://localhost:3306/mybatis_plus_1?useSSL=false&serverTimezone=GMT%2B8&allowPublicKeyRetrieval=true
          driver-class-name: com.mysql.cj.jdbc.Driver
          username: root
          password: '密码'
mybatis-plus:
  mapper-locations: /mapper/**
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
# 设置mybatis-plus全局配置
#  global-config:
#    db-config:
      # 设置数据库表名
#      table-prefix: t_
      # 设置主键生成策略
#      id-type: auto
  # 配置类型别名所对应的包
  type-aliases-package: com.ssm.mybatis_plus.pojo
#      logic-delete-field: flag # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
#      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
#      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
  # 扫描枚举的包
  type-enums-package: com.ssm.mybatis_plus.enums
```

```yaml
# druid数据源
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db_account
    username: root
    password: 123456
    driver-class-name: com.mysql.jdbc.Driver

    druid:
      aop-patterns: com.atguigu.admin.*  #监控SpringBean
      filters: stat,wall     # 底层开启功能，stat（sql监控），wall（防火墙）

      stat-view-servlet:   # 配置监控页功能
        enabled: true
        login-username: admin
        login-password: admin
        resetEnable: false

      web-stat-filter:  # 监控web
        enabled: true
        urlPattern: /*
        exclusions: '*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*'


      filter:
        stat:    # 对上面filters里面的stat的详细配置
          slow-sql-millis: 1000
          logSlowSql: true
          enabled: true
        wall:
          enabled: true
          config:
            drop-table-allow: false
```

```yaml

management:
  endpoints:
    enabled-by-default: false #不暴露所有端点信息
    web:
      exposure:
        include: '*'  #以web方式暴露
  endpoint:
    health:
      show-details: always
      enabled: true
    info:
      enabled: true
    beans:
      enabled: true
    metrics:
      enabled: true
```

