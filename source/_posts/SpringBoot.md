---
title: SpringBoot
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-01 15:54:27
password:
summary: 对SpringBoot的再次学习,总结SpringBoot知识点-----------------------------
tags: SpringBoot
categories: 框架
---

[TOC]

### Spring Boot入门

#### Spring Boot 简介

Spring Boot 用来简化 Spring 应用程序的创建和 开发过程，采用 Spring Boot 可以非常容易和快速地创建基于 Spring 框架的应用程序，它让编 码变简单了，配置变简单了，部署变简单了，监控变简单了。正因为 Spring Boot 它化繁为简，让开发变得极其简单和快速，所以在业界备受关注。

#### Spring Boot 的特性

 ➢ 能够快速创建基于 Spring 的应用程序

 ➢ 能够直接使用 java main 方法启动内嵌的 Tomcat 服务器运行 Spring Boot 程序，不需 要部署 war 包文件

 ➢ 提供约定的 starter POM 来简化 Maven 配置，让 Maven 的配置变得简单

 ➢ 自动化配置，根据项目的 Maven 依赖配置，Spring boot 自动配置 Spring、Spring mvc 等 

➢ 提供了程序的健康检查等功能 ➢ 基本可以完全不使用 XML 配置文件，采用注解配置

#### Spring Boot 四大核心

- 自动配置
- 起步依赖
- Actuator
- 命令行界面

> [spring生态](https://spring.io/projects/spring-boot)
>
> 查看版本新特性:
>
> https://github.com/spring-projects/spring-boot/wiki#release-notes

### 入门案例

#### 创建Spring Boot 项目

##### (1) 创建一个 Module，选择类型为 Spring Initializr 快速构建

![Spring Initializr](https://img-blog.csdnimg.cn/57b7bd14405e41b2883aa4c8c9ec38a4.png)

##### 设置 GAV 坐标及 pom 配置信息

![GAV&pom](https://img-blog.csdnimg.cn/a2ee19e2e0874eccbf43fdea411b3ce1.png)

##### 选择 Spring Boot 版本及依赖

![版本号和依赖](https://img-blog.csdnimg.cn/a7c48bef10aa4745a509bb7b19a1e97a.png)

#####  设置模块名称、Content Root 路径及模块文件的目录

![名称及目录](https://img-blog.csdnimg.cn/a411abcc8a12421c9b88129c80418ae5.png)

##### 点击finish完成创建

![项目结构](https://img-blog.csdnimg.cn/26b8c7a8034d4c48a01b99a25e32a4af.png)

#### 核心配置文件

- 若两种配置文件同时存在,优先读取application.properties文件

application.properties

```properties
# 设置端口号
server.port=8080
# 设置上下文根
server.servlet.context-path=/
```

application.yaml

```yml
server:
  port: 8081
  servlet:
    context-path: /
```

> **基本语法**
>
> - key: value；kv之间有空格
> - 大小写敏感
> - 使用缩进表示层级关系
> - 缩进不允许使用tab，只允许空格
> - 缩进的空格数不重要，只要相同层级的元素左对齐即可
> - '#'表示注释
> - 字符串无需加引号，如果要加，''与""表示字符串内容 会被 转义/不转义

- 字面量：单个的、不可再分的值。date、boolean、string、number、null

```yaml
k: v
```

- 对象：键值对的集合。map、hash、set、object 

```yaml
行内写法：  k: {k1:v1,k2:v2,k3:v3}
#或
k: 
	k1: v1
  k2: v2
  k3: v3
```

- 数组：一组按次序排列的值。array、list、queue

```yaml
行内写法：  k: [v1,v2,v3]
#或者
k:
 - v1
 - v2
 - v3
```

**yaml示例**

```yaml
# yaml表示以上对象
person:
  userName: zhangsan
  boss: false
  birth: 2019/12/12 20:12:33
  age: 18
  pet: 
    name: tomcat
    weight: 23.4
  interests: [篮球,游泳]
  animal: 
    - jerry
    - mario
  score:
    english: 
      first: 30
      second: 40
      third: 50
    math: [131,140,148]
    chinese: {first: 128,second: 136}
  salarys: [3999,4999.98,5999.99]
  allPets:
    sick:
      - {name: tom}
      - {name: jerry,weight: 47}
    health: [{name: mario,weight: 47}]
```

**自定义类绑定配置**

> 自定义的类和配置文件绑定一般没有提示。

加入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
<!-- 打包的时候排除自定义类绑定配置-->
 <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-configuration-processor</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

Person

```java
@ConfigurationProperties(prefix = "person")
@Component
@ToString
@Data
public class Person {

    private String userName;
    private Boolean boss;
    private Date birth;
    private Integer age;
    private Pet pet;
    private String[] interests;
    private List<String> animal;
    private Map<String, Object> score;
    private Set<Double> salarys;
    private Map<String, List<Pet>> allPets;
}
```

![person](https://img-blog.csdnimg.cn/7eb7fbc1a2cc49d494add83218c51179.png)

#### 环境配置

> - 默认配置文件  `application.yaml`；任何时候都会加载
> - 指定环境配置文件  `application-{env}.yaml`
> - 激活指定环境
>
> - - 配置文件激活
>   - 命令行激活：`java -jar xxx.jar --pring.profiles.active=prod  --person.name=haha`
>
> - - - **修改配置文件的任意值，命令行优先**
>
> - 默认配置与环境配置同时生效
> - 同名配置项，`profile`配置优先

##### application.properties

```properties
# springboot核心主配置文件
# 激活使用的配置文件
spring.profiles.active=test
```

```yaml
spring:
  profiles:
    active: test
```

##### application-dev.properties

```properties
# 开发环境配置文件
server.port=8080
server.servlet.context-path=/dev
```

```yaml
server:
  port: 8080
  servlet:
    context-path: /dev
```

##### application-product.properties

```properties
# 生产环境配置文件
server.port=9090
server.servlet.context-path=/product
```

```yaml
server:
  port: 9090
  servlet:
    context-path: /product
```

##### application-ready.properties

```properties
# 准生产环境配置文件
server.port=8082
server.servlet.context-path=/ready
```

```yaml
server:
  port: 8082
  servlet:
    context-path: /test
```

##### application-test.properties

```properties
#测试环境配置文件
server.port=8081
server.servlet.context-path=/test
```

```yaml
server:
  port: 8081
  servlet:
    context-path: /test
```

##### 获取自定义配置

```properties
school.name=bjpowernode
websit=http://www.baidu.com
```

```java
@Value("${school.name}")
private String schooName;

@Value("${websit}")
private String websit;
```

#### 多个自定义配置区分

- @ConfigurationProperties(prefix = "abc") 注解设置前缀

```properties
school.name=bjpowernode
school.websit=http://www.baidu.com
abc.name=abc
abc.websit=http:www.abc.com
```

```java
@Component
@ConfigurationProperties(prefix = "abc")
public class Abc {
    private String name;
    private String websit;
}
```

#### @Profile条件装配功能

> 类、方法上，不同的位置作用域不同

```java
@Profile("prod")
@Configuration
public class MyConfig {
	...
}
----------------------------
@Configuration
public class MyConfig {
	@Profile("test")
    @Bean
    public Color green(){
        return new Color();
    }
}
class Color {
}
```

#### profile分组

> 批量加载配置文件

```properties
spring.profiles.group.production[0]=proddb
spring.profiles.group.production[1]=prodmq

使用：--spring.profiles.active=production  激活
```

#### 外部化配置

> https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config

##### 外部配置源

> 常用：**Java属性文件**、**YAML文件**、**环境变量**、**命令行参数**；

##### 配置文件查找位置

-  classpath 根路径

- classpath 根路径下config目录

- jar包当前目录

- jar包当前目录的config目录

- /config子目录的直接子目录

##### 配置文件加载顺序

1. 　当前jar包内部的`application.properties`和`application.yml`
2. 　当前jar包内部的`application-{profile}.properties` 和 `application-{profile}.yml`
3. 　引用的外部jar包的`application.properties`和`application.yml`
4. 　引用的外部jar包的`application-{profile}.properties` 和 `application-{profile}.yml`

> <font color="red">指定环境优先，外部优先，后面的可以覆盖前面的同名配置项</font>
>
> ![config](https://img-blog.csdnimg.cn/83f99ed2c58d4e57b4d357648d13ec20.png)

<div style="position: relative; padding: 30% 45%;">
    <iframe style="
        position: absolute; 
        width: 100%; 
        height: 100%; 
        left: 0; top: 0;" 
        src="//player.bilibili.com/player.html?aid=885722084&bvid=BV19K4y1L7MT&cid=269296149&page=82&high_quality=1" 
        scrolling="no" 
        border="0" 
        frameborder="no" 
        framespacing="0" 
        allowfullscreen="true">
    </iframe>
</div>

#### 自定义starter

> TODO

#### SpringBoot继承JSP

- 建立webapp文件夹

![webapp设置步骤](https://img-blog.csdnimg.cn/c3d822d1ea9d4ff4980b3afa348b486d.png)

- 加入依赖

```xml
<dependency>
    <groupId>org.apache.tomcat.embed</groupId>
    <artifactId>tomcat-embed-jasper</artifactId>
</dependency>
```

- 手动置顶jsp编译位置

```xml
<resource>
    <directory>src/main/webapp</directory>
    <targetPath>META-INF/resources</targetPath>
    <includes>
        <include>*.*</include>
    </includes>
</resource>
```

- 配置视图解析器

```properties
spring.mvc.view.prefix=/
spring.mvc.view.suffix=.jsp
```

IndexController

```java
@Controller
public class IndexController {
    @RequestMapping(value = "/say")
    public ModelAndView say(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("message","Hello Springboot jsp");
        modelAndView.setViewName("say");
        return modelAndView;

    }
    @RequestMapping(value = "/index")
    public String index(Model model){
        model.addAttribute("message","HelloWorld");
        return "say";
    }
}
```

say.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

<head>
    <title>Title</title>
</head>

<body>

<h3>${message}</h3>

</body>
</html>
```

### 自动配置原理

#### 依赖管理

- 父项目做依赖管理

```xml
依赖管理    
<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.4.RELEASE</version>
</parent>

他的父项目
 <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.3.4.RELEASE</version>
  </parent>

几乎声明了所有开发中常用的依赖的版本号,自动版本仲裁机制
```

- 开发导入starter场景启动器
  - 见到很多 spring-boot-starter-* ： *就某种场景
  - 只要引入starter，这个场景的所有常规需要的依赖我们都自动引入
  - SpringBoot所有支持的场景https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html#using-boot-starter
  - 见到的  *-spring-boot-starter： 第三方为我们提供的简化开发的场景启动器。
  - 所有场景启动器最底层的依赖

- 无需关注版本号，自动版本仲裁
  - 引入依赖默认都可以不写版本
  - 引入非版本仲裁的jar，要写版本号。

- 可以修改默认版本号
  - 查看spring-boot-dependencies里面规定当前依赖的版本 用的 key。
  - 在当前项目里面重写配置

```xml
- <properties>
          <mysql.version>8.0.17</mysql.version>
      </properties>
```

#### 自动配置

- 自动配好Tomcat

- - 引入Tomcat依赖。
  - 配置Tomcat

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <version>2.3.4.RELEASE</version>
    <scope>compile</scope>
</dependency>
```

- 自动配好SpringMVC

  - 引入SpringMVC全套组件
  - 自动配好SpringMVC常用组件（功能）

- 自动配好Web常见功能，如：字符编码问题

  - SpringBoot帮我们配置好了所有web开发的常见场景

- 默认的包结构

  - <font color="red">主程序所在包及其下面的所有子包里面的组件都会被默认扫描进来</font>

  > 这个真的很重要

  - 无需以前的包扫描配置
  - 想要改变扫描路径，@SpringBootApplication(scanBasePackages=**"com.ssm"**)
  - 或者@ComponentScan 指定扫描路径

> - SpringBoot先加载所有的自动配置类  `xxxxxAutoConfiguration`
> - 每个自动配置类按照条件进行生效，默认都会绑定配置文件指定的值。`xxxxProperties`里面拿。`xxxProperties`和配置文件进行了绑定
> - 生效的配置类就会给容器中装配很多组件
> - 只要容器中有这些组件，相当于这些功能就有了
> - 定制化配置
>   - 用户直接自己`@Bean`替换底层的组件
>   - 用户去看这个组件是获取的配置文件什么值就去修改。
>
> <font color="orange">**xxxxxAutoConfiguration ---> 组件  --->** **xxxxProperties里面拿值  ----> application.properties**</font>

```java
@SpringBootApplication
等同于
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan("com.ssm.boot")
```

- 各种配置拥有默认值

- - 默认配置最终都是映射到某个类上，如：MultipartProperties
  - 配置文件的值最终会绑定每个类上，这个类会在容器中创建对象

- 按需加载所有自动配置项

- - 非常多的starter
  - 引入了哪些场景这个场景的自动配置才会开启
  - SpringBoot所有的自动配置功能都在 spring-boot-autoconfigure 包里面

- ......

> 详情请参考：https://www.yuque.com/atguigu/springboot/qb7hy2
>
> - 引入场景依赖：
>   - https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html#using-boot-starter
>
> - 照文档修改配置项：
>   - https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html#common-application-properties

### Spring Boot 框架 Web 开发

#### 静态资源规则与定制化

> 只要静态资源放在类路径下： called /`static` (or /`public` or /`resources `or /`META-INF/resources`
> 访问 ： 当前项目根路径/ + 静态资源名
> 原理： 静态映射/**。
> 请求进来，先去找Controller看能不能处理。不能处理的所有请求又都交给静态资源处理器。静态资源也找不到则响应404页面。
> <font color="orange">不行的记得clean项目即可</font>

![源码分析](https://img-blog.csdnimg.cn/1bf2ca9a6bfb4b2eb75bc4bbd98bbe04.png)

![访问静态资源](https://img-blog.csdnimg.cn/b42220c75c124c3d875264c11dd193fe.png)

> 改变默认的静态资源路径，/`static`，/`public`,/`resources`, /`META-INF/resources`失效

```yaml
resources:
  static-locations: [classpath:/haha/]
```

![改变默认资源路径](https://img-blog.csdnimg.cn/d8c7ff1eb04b411790a4888e966ea488.png)

**静态资源返回前缀**

```yaml
spring:
  mvc:
    static-path-pattern: /res/**
```

![加前缀访问静态资源](https://img-blog.csdnimg.cn/37bcde66c387446aa9884c7de7db3124.png)

> 当前项目 + static-path-pattern + 静态资源名 = 静态资源文件夹下找

**webjar**

自动映射 /[webjars](http://localhost:8080/webjars/jquery/3.5.1/jquery.js)/**https://www.webjars.org/

```xml
<dependency>
    <groupId>org.webjars</groupId>
    <artifactId>jquery</artifactId>
    <version>3.5.1</version>
</dependency>
```

> 访问地址：[http://localhost:8080/webjars/**jquery/3.5.1/jquery.js**](http://localhost:8080/webjars/jquery/3.5.1/jquery.js)   后面地址要按照依赖里面的包路径

![webjar](https://img-blog.csdnimg.cn/e1377c161859433297178b7bf9d0ff00.png)

**欢迎页支持**

- 静态资源路径下  index.html

- - 可以配置静态资源路径
  - 但是不可以配置静态资源的访问前缀。否则导致 index.html不能被默认访问

![源码分析](https://img-blog.csdnimg.cn/f9a6b8ee6ef645f2aec511b0498cc963.png)

![欢迎页](https://img-blog.csdnimg.cn/db12146e2bb1419f91af788614049e2b.png)

> - controller能处理/index

**自定义Favicon**

> favicon.ico 放在静态资源目录下即可。
>
> 文件名必须是:  favicon.ico

```properties
# 这个会导致 Favicon 功能失效
spring.mvc.static-path-pattern=/res/** 
```

![Favicon](https://img-blog.csdnimg.cn/26b5a1a8de0040899262ff516aa37cf4.png)

> 不行记得重启浏览器和清理缓存

#### Spring Boot 集成 MyBatis

![目录结构](https://img-blog.csdnimg.cn/4a513ca475974120a7f49c0dc85250ff.png)

- 添加mybatis依赖,MySQL驱动

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.0.0</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <mysql.version>8.0.17</mysql.version>
</dependency>
```

- GeneratorMapper.xml(Mybatis逆向工程)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!-- 指定连接数据库的 JDBC 驱动包所在位置，指定到你本机的完整路径 -->
    <classPathEntry location="F:\javabook\mysql-connector-java-8.0.17.jar"/>
    <!-- 配置 table 表信息内容体，targetRuntime 指定采用 MyBatis3 的版本 -->
    <context id="tables" targetRuntime="MyBatis3">
        <!-- 抑制生成注释，由于生成的注释都是英文的，可以不让它生成 -->
        <commentGenerator>
            <property name="suppressAllComments" value="true"/>
        </commentGenerator>
        <!-- 配置数据库连接信息 -->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/springboot?useSSL=false&amp;serverTimezone=UTC"
                        userId="root"
                        password="">
        </jdbcConnection>
        <!-- 生成 model 类，targetPackage 指定 model 类的包名， targetProject 指定
        生成的 model 放在 eclipse 的哪个工程下面-->
        <javaModelGenerator targetPackage="com.bjpowernode.springboot.model"
                            targetProject="src/main/java">
            <property name="enableSubPackages" value="false"/>
            <property name="trimStrings" value="false"/>
        </javaModelGenerator>
        <!-- 生成 MyBatis 的 Mapper.xml 文件，targetPackage 指定 mapper.xml 文件的
        包名， targetProject 指定生成的 mapper.xml 放在 eclipse 的哪个工程下面 -->
        <sqlMapGenerator targetPackage="com.bjpowernode.springboot.mapper"
                         targetProject="src/main/java">
            <property name="enableSubPackages" value="false"/>
        </sqlMapGenerator>
        <!-- 生成 MyBatis 的 Mapper 接口类文件,targetPackage 指定 Mapper 接口类的包
        名， targetProject 指定生成的 Mapper 接口放在 eclipse 的哪个工程下面 -->
        <javaClientGenerator type="XMLMAPPER"
                             targetPackage="com.bjpowernode.springboot.mapper" targetProject="src/main/java">
            <property name="enableSubPackages" value="false"/>
        </javaClientGenerator>

        <!-- 数据库表名及对应的 Java 模型类名 -->
        <table tableName="t_student" domainObjectName="Student"
               enableCountByExample="false"
               enableUpdateByExample="false"
               enableDeleteByExample="false"
               enableSelectByExample="false"
               selectByExampleQueryId="false"/>
    </context>
</generatorConfiguration>
```

![generator](https://img-blog.csdnimg.cn/25c560efe2cc4e13bc84c07d56cb1847.png)

- 设置连接数据库配置

```properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/springboot?useSSL=false&serverTimezone=UTCallowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=
```

- springboot手动指定资源文件夹为resources

```xml
<resource>
    <directory>src/main/java</directory>
    <includes>
        <include>**/*.xml</include>
    </includes>
</resource>
```

- 启动数据库`./mysqld_safe &`

##### Mapper映射文件存放位置第二种方式

![目录结构](https://img-blog.csdnimg.cn/61ed1f053b054eaf81aa205540527490.png)

- 指定mybatis映射文件的路径

```properties
mybatis.mapper-locations=classpath:mapper/*.xml
```

-  指定后不用在pom文件中手动指定资源文件夹为resources

#### 注解模式

> 在Mapper方法上些sql，就不用在Mapper.xml上写

```java
@Mapper
public interface StudentMapper {

    @Select("select * from t_student where id=#{id}")
    public City getById(Long id);
    @Insert("insert into t_student(`name`) values(#{name})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    public void insert(City city);

}
```

> 这种方式用的不多唉，适用于简单数据库操作

#### SpringBoot使用Druid数据源

druid官方github地址：https://github.com/alibaba/druid

**引入依赖**

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.17</version>
</dependency>
```

**配置示例**

```yaml
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

> SpringBoot配置示例
>
> https://github.com/alibaba/druid/tree/master/druid-spring-boot-starter
>
> 配置项列表[https://github.com/alibaba/druid/wiki/DruidDataSource%E9%85%8D%E7%BD%AE%E5%B1%9E%E6%80%A7%E5%88%97%E8%A1%A8](https://github.com/alibaba/druid/wiki/DruidDataSource配置属性列表)

#### SpringBoot集成Mybatis-plus

> 详情请参考博客：https://shaoshaossm.github.io/2022-03-28-springboot-ji-cheng-mybatis-plus.html

#### SpringBoot 事务支持

Spring Boot 使用事务非常简单，底层依然采用的是 Spring 本身提供的事务管理

 ➢ 在入口类中使用注解 @EnableTransactionManagement 开启事务支持

 ➢ 在访问数据库的 Service 方法上添加注解 @Transactional 即可

```java
@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentMapper studentMapper;
    @Transactional
    @Override
    public int updateStudentById(Student student) {
        int i = studentMapper.updateByPrimaryKeySelective(student);
        return i;
    }
}
```

#### Spring Boot 下的 Spring MVC

- 不同的请求方式

```java
package com.bjpowernode.springboot.web;

import com.bjpowernode.springboot.model.Student;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;

//@Controller
@RestController //相当于   @Controller 加 @ResponseBody, 意味着控制层类中的所有方法返回单都是JSON对象
public class StudentController {
    @RequestMapping(value = "/student")
    public Object student(){
        Student student = new Student();
        student.setId(1001);
        student.setName("zhangsan");
        return student;
    }
    @RequestMapping(value = "/queryStudentById",method = {RequestMethod.GET,RequestMethod.POST})
    public Object queryStudentById(Integer id){
        Student student = new Student();
        student.setId(id);
        return student;

    }

    //@RequestMapping(value = "/queryStudentById2",method = RequestMethod.GET)
    @GetMapping(value = "/queryStudentById2") //相当于上句代码
    public Object queryStudentById2(){

        return "Only GET Method";

    }
    //@RequestMapping(value = "/insert",method = RequestMethod.POST)
    @PostMapping(value = "/insert") //相当于上句代码
    public Object insert(){

        return "Insert Success";

    }
    //@RequestMapping(value = "/delete",method = RequestMethod.DELETE)
    @DeleteMapping(value = "/delete") //相当于上句代码
    public Object delete(){

        return "Delete Success";

    }
    //@RequestMapping(value = "/update",method = RequestMethod.PUT)
  @PutMapping(value = "/update") //相当于上句代码
    public Object update(){

        return "Update Success";

    }
}

```

> 源码分析：<font color="orange">各是各的,不影响案例</font>
>
> ![源码分析](https://img-blog.csdnimg.cn/c09831b5f8834696bdcf09fd4ef1e16d.png)
>
> ![源码分析](https://img-blog.csdnimg.cn/48cb7e47e3014c27bade7fb955ac453a.png)

#### Spring Boot实现RESTful

- 比如我们要访问一个 http 接口：http://localhost:8080/boot/order?id=1021&status=1

- 采用 RESTFul 风格则 http 地址为：http://localhost:8080/boot/order/1021/1

##### 请求冲突的问题

➢ 改路径 (请求参数的位置换位置)

➢ 改请求方式 (GET,POST,DELETE,POST)

#####  RESTful 原则

➢ 增 post 请求、删 delete 请求、改 put 请求、查 get 请求

➢ 请求路径不要出现动词

- 例如：查询订单接口 /boot/order/1021/1（推荐）
-  /boot/queryOrder/1021/1（不推荐） 

➢ 分页、排序等操作，不需要使用斜杠传参数

- 例如：订单列表接口 /boot/orders?page=1&sort=desc
-  一般传的参数不是数据库表的字段，可以不采用斜杠

```java
@RestController
public class StudentController {
    @RequestMapping(value = "/student")
    public Object student(Integer id,Integer age){
        Student student = new Student();
        student.setId(id);
        student.setAge(age);
        return student;
    }
@GetMapping(value = "/student/Detail/{id}/{age}")
    public Object student1(@PathVariable("id") Integer id,
                           @PathVariable("age") Integer age){
        Map<String, Object> retMap = new HashMap<>();
        retMap.put("id" ,id);
        retMap.put("age" ,age);
        return retMap;
    }
@DeleteMapping(value = "/student/Detail/{id}/{status}")
public Object student2(@PathVariable("id") Integer id,
                       @PathVariable("status") Integer status){
    Map<String, Object> retMap = new HashMap<>();
    retMap.put("id" ,id);
    retMap.put("status" ,status);
    return retMap;
}

@DeleteMapping(value = "/student/{id}/Detail/{city}")
public Object student3(@PathVariable("id") Integer id,
                       @PathVariable("city") Integer city){
    Map<String, Object> retMap = new HashMap<>();
    retMap.put("id" ,id);
    retMap.put("city" ,city);
    return retMap;
}
@PostMapping(value = "/student/{id}")
    public Object addStudent(@PathVariable("id") Integer id){
        return "add Student ID" + id;
 }
@PutMapping(value = "/student/{id}")
public Object updateStudent(@PathVariable("id") Integer id){
    return "update Student ID" + id;
}
}
```

> 详细注解请参考注解使用合集

#### Spring Boot 集成 Redis

- 添加springboot继承redis依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

- 设置redis配置信息

```properties
#设置redis配置信息
spring.redis.host=192.168.174.131
spring.redis.port=6379
spring.redis.password=123456
```

```java
@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private RedisTemplate<Object,Object> redisTemplate;
    @Override
    public void put(String key, String value) {
        redisTemplate.opsForValue().set(key,value);
    }

    @Override
    public String getkey(String key) {
        String count = (String) redisTemplate.opsForValue().get(key);
        return count;

    }

    @Override
    public String getkeyplus(String key) {
        String valueplus = (String) redisTemplate.opsForValue().get(key);
        return valueplus;
    }
}

```

- 启动Redis`./redis-server ../redis.conf &
  ./redis-cli -a 123456 -h 192.168.174.131`

> 详情请查看文章Redis

#### SpringBoot集成dubbo

- 接口工程:存放实体bean和业务接口
- 服务提供者: 业务接口的实现类并将服务暴露且注册到注册中心,调用数据持久层
  - 添加依赖(dubbo,注册中心,接口工程)
  - 配置服务提供者核心配置文件
  - 服务消费者:处理浏览器客户端发送的请求,从注册中心调用服务提供者所提供的服务
    - 添加依赖(dubbo,注册中心,接口工程)
    - 配置服务消费者核心配置文件

![interface+provider](https://img-blog.csdnimg.cn/d291ba993c7e424e81722d7c8ce04a94.png)

![consumer](https://img-blog.csdnimg.cn/139618e7b3784c82b7115bc4ab6e24e3.png)

##### 020-springboot-dubbo-interface

StudentService

```java
public interface StudentService {
    /**
     * 获取学生总人数
     * @return
     */
    Integer queryAllStudentCount();
}
```

pom.xml

```xml
<groupId>com.bjpowernode.springboot</groupId>
<artifactId>020-springboot-dubbo-interface</artifactId>
<version>1.0.0</version>
```

##### 021-springboot-dubbo-provider

pom.xml

```xml
<dependencies>
        <!--SpringBoot框架web项目起步依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!--Dubbo集成SpringBoot框架起步依赖-->
        <dependency>
            <groupId>com.alibaba.spring.boot</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
            <version>2.0.0</version>
        </dependency>

        <!--注册中心-->
        <dependency>
            <groupId>com.101tec</groupId>
            <artifactId>zkclient</artifactId>
            <version>0.10</version>
        </dependency>

        <!--接口工程-->
        <dependency>
            <groupId>com.bjpowernode.springboot</groupId>
            <artifactId>020-springboot-dubbo-interface</artifactId>
            <version>1.0.0</version>
        </dependency>

    </dependencies>
```

StudentServiceImpl

```java
import com.alibaba.dubbo.config.annotation.Service;//(dubbo的@service)
@Component
@Service(interfaceClass = StudentService.class,version = "1.0.0",timeout = 15000)
public class StudentServiceImpl implements StudentService {
    @Override
    public Integer queryAllStudentCount() {
        return 1250;
    }
}

```

application.properties

```properties
#设置内嵌Tomcat端口号
server.port=8081
#设置上下文根
server.servlet.context-path=/

#设置dubbo的配置
spring.application.name=021-springboot-dubbo-provider
#当前工程是一个服务提供者
spring.dubbo.server=true
#设置注册中心
spring.dubbo.registry=zookeeper://192.168.174.131:2181
```

##### 022-springboot-dubbo-consumer

pom.xml

```xml
<dependencies>
        <!--SpringBoot框架web项目起步依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!--Dubbo集成SpringBoot框架起步依赖-->
        <dependency>
            <groupId>com.alibaba.spring.boot</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
            <version>2.0.0</version>
        </dependency>

        <!--注册中心-->
        <dependency>
            <groupId>com.101tec</groupId>
            <artifactId>zkclient</artifactId>
            <version>0.10</version>
        </dependency>

        <!--接口工程-->
        <dependency>
            <groupId>com.bjpowernode.springboot</groupId>
            <artifactId>020-springboot-dubbo-interface</artifactId>
            <version>1.0.0</version>
        </dependency>

    </dependencies>
```

StudentController

```java
@Controller
public class StudentController {
    @Reference(interfaceClass = StudentService.class,version = "1.0.0",check = false)
    private StudentService studentService;
    @RequestMapping(value = "/student/count")
    public @ResponseBody Object studentCount() {
        Integer allStudentCount = studentService.queryAllStudentCount();
        return "学生总人数为:"+allStudentCount;
    }
}
```

application.properties

```properties
#设置内嵌Tomcat端口号
server.port=8080
server.servlet.context-path=/

#设置dubbo配置
spring.application.name=022-springboot-dubbo-consumer
#指定注册中心
spring.dubbo.registry=zookeeper://192.168.174.131:2181
```

启动zookeeper服务`./zkServer.sh start`

### SpringBoot创建非web工程(了解)

StudentService

```java
public interface StudentService {
    String sayHello();
}
```

StudentServiceImpl

```java
@Service
public class StudentServiceImpl implements StudentService {
    @Override
    public String sayHello() {
        return "Say Hello";
    }
}
```

Application

```java
// 第一种方式
@SpringBootApplication
public class Application implements CommandLineRunner {

	@Autowired
	private StudentService studentService;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		String world = studentService.sayHello("world");
		System.out.println(world);
	}
}
// 第二种方式
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		ConfigurableApplicationContext applicationContext = SpringApplication.run(Application.class, args);
		StudentService studentService = (StudentService) applicationContext.getBean("studentServiceImpl");
		String sayHello = studentService.sayHello();
		System.out.println(sayHello);
	}

}

```

### SpringBoot使用拦截器(了解)

- 定义一个拦截器,实现`HandlerInterceptor`接口
- 创建一个配置类

![目录结构](https://img-blog.csdnimg.cn/25ed2bd63d2e470980ed2e4263c27280.png)

InterceptorConfig

```java

@Configuration //定义此类为配置类(相当于xml文件)
public class InterceptorConfig implements WebMvcConfigurer {


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //拦截user下的所有请求
        String [] addPathPatterns = {
            "/user/**"
        };
        //要排除的路径
        String [] excludePathPatterns = {
            "user/out","/user/error","/user/login"
        };
        registry.addInterceptor(new UserInterceptor()).addPathPatterns(addPathPatterns).excludePathPatterns(excludePathPatterns);

    }
}
```

UserInterceptor

```java

public class UserInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("------------进入拦截器--------------");
        User user = (User) request.getSession().getAttribute("user");
        if (null == user){
            response.sendRedirect(request.getContextPath()+"/user/error");
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}

```

User

```java

public class User {
    private Integer id;
    private String username;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
```

UserController

```java

@Controller
@RequestMapping(value = "/user")
public class UserController {
    //用户登录的请求
    @RequestMapping(value = "/login")
    public @ResponseBody Object login(HttpServletRequest request){
        //将用户信息存放到session中
        User user = new User();
        user.setId(1001);
        user.setUsername("zhangsan");
        request.getSession().setAttribute("user",user);
        return  "login Success";
    }
    //该请求用户登录后才可以访问
    @RequestMapping(value = "center")
    @ResponseBody
    public  Object center(){
        return "See Center Message";

    }
    //该请求不登录也可以访问
    @RequestMapping(value = "/out")
    public @ResponseBody Object out(){
        return "out see anytime";
    }

    //如果用户未登录访问了需要登录才可访问的请求,之后会跳转到该页面
    @RequestMapping(value = "/error")
    @ResponseBody
    public Object erroe(){
        return "error";
    }
}

```

### SpringBoot文件上传

#### 页面表单

```html
<form method="post" action="/upload" enctype="multipart/form-data">
    <input type="file" name="file"><br>
    <input type="submit" value="提交">
</form>
```

#### 文件上传代码

```java
    /**
     * MultipartFile 自动封装上传过来的文件
     * @param email
     * @param username
     * @param headerImg
     * @param photos
     * @return
     */
    @PostMapping("/upload")
    public String upload(@RequestParam("email") String email,
                         @RequestParam("username") String username,
                         @RequestPart("headerImg") MultipartFile headerImg,
                         @RequestPart("photos") MultipartFile[] photos) throws IOException {

        log.info("上传的信息：email={}，username={}，headerImg={}，photos={}",
                email,username,headerImg.getSize(),photos.length);

        if(!headerImg.isEmpty()){
            //保存到文件服务器，OSS服务器
            String originalFilename = headerImg.getOriginalFilename();
            headerImg.transferTo(new File("H:\\cache\\"+originalFilename));
        }

        if(photos.length > 0){
            for (MultipartFile photo : photos) {
                if(!photo.isEmpty()){
                    String originalFilename = photo.getOriginalFilename();
                    photo.transferTo(new File("H:\\cache\\"+originalFilename));
                }
            }
        }

        return "main";
    }
```

### Spring Boot 默认错误处理机制

- 默认情况下，Spring Boot提供`/error`处理所有错误的映射
- 机器客户端，它将生成JSON响应，其中包含错误，HTTP状态和异常消息的详细信息。对于浏览器客户端，响应一个“ whitelabel”错误视图，以HTML格式呈现相同的数据

- 要对其进行自定义，添加`View`解析为`error`

- 要完全替换默认行为，可以实现` ErrorController`并注册该类型的Bean定义，或添加`ErrorAttributes类型的组件`以使用现有机制但替换其内容。

- `/templates/error/`下的4xx，5xx页面会被自动解析

![error](https://img-blog.csdnimg.cn/60f6d3ee5de1468ebb5b4b09e4425426.png)

> <font color="red">在2.x版本我们需要在配置文件（application.properties）中配置 `spring.mvc.locale-resolver=fixed`</font>

> 记得加入thymeleaf模板引擎依赖

### Spring Boot 中使用 Servlet（了解）

- 创建一个Servlet他要继承HttpServlet
- 在web.xml配置文件中使用servlet,servlet-mapping(注解)

#### 第一种方式:注解

```java
@WebServlet(urlPatterns = "/myServlet")
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().println("MySpringBoot Servlet-1");
        resp.getWriter().flush();
        resp.getWriter().close();
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
```

```java
@SpringBootApplication
@ServletComponentScan(basePackages = "com.bjpowernode.springboot.servlet")
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}

```

#### 第二种方式(配置类)

```java
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().println("My SpringBoot Servlet -2");
        resp.getWriter().flush();
        resp.getWriter().close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
```

```java
@Configuration
public class ServletConfig {
    @Bean
    public ServletRegistrationBean myServletRegistrationBean(){
        ServletRegistrationBean<Servlet> servletServletRegistrationBean = new ServletRegistrationBean<>(new MyServlet(),"/myServlet");
        return servletServletRegistrationBean;
    }

}
```

### Spring Boot 中使用 Filter（了解）

#### 第一种方式(注解)

```java
@WebFilter(urlPatterns = "/myfilter")
public class MyFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("--------------过滤器---------------");
        filterChain.doFilter(servletRequest, servletResponse);

    }
}
```

```java
@SpringBootApplication
@ServletComponentScan(basePackages = "com.bjpowernode.springboot.filter")
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
```

#### 第二种方式(注册组件)

```java
@Configuration 
public class FilterConfig {
    @Bean
    public FilterRegistrationBean myFilterRegistrationBean(){
        //注册过滤器
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(new MyFilter());
        //添加过滤路径
        filterRegistrationBean.addUrlPatterns("/user/*"); // **不生效
        return  filterRegistrationBean;
    }

}
```

```java
public class MyFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("-----------------filter----------------");
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
```

```java
@Controller
public class UserController {
    @RequestMapping(value = "/user/detail")
    @ResponseBody
    public String userDetail(){

        return "/user/detail";
    }
    @RequestMapping(value = "/center")
    @ResponseBody
    public String center(){

        return "center";
    }
}
```

### Spring Boot 中使用 Listener（了解）

#### 第一种方式(注解)

```java
@Slf4j
@WebListener
public class MyServletContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("监听到项目初始化");
        log.info("监听到项目初始化");
    }
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("监听到项目销毁");
        log.info("监听到项目销毁");
    }

}
```

```java
@SpringBootApplication
@ServletComponentScan(basePackages = "com.bjpowernode.springboot.filter")
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
```

![Listenter](https://img-blog.csdnimg.cn/b817f013ad4844d2b50585e59366d231.png)

#### 第二种方式(注册组件)

```java
@Configuration
public class MyRegisterConfig {
    @Bean
    public ServletListenerRegistrationBean myListenter() {
        MyServletContextListener myServletContextListener = new MyServletContextListener();
        return new ServletListenerRegistrationBean(myServletContextListener);
    }

}
```

```java
@Slf4j
public class MyServletContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        log.info("监听到项目初始化");
    }
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        log.info("监听到项目销毁");
    }

}
```

### 单元测试

> **Spring Boot 2.2.0 版本开始引入 JUnit 5 作为单元测试默认库**

#### SpringBoot集成JUnit5

**引入依赖**

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-test</artifactId>
  <scope>test</scope>
</dependency>
```

**模板**

```java
@SpringBootTest
class Boot05WebAdminApplicationTests {
    @Test
    void contextLoads() {

    }
}

```

#### 常用注解

> JUnit5的注解与JUnit4的注解有所变化
>
> https://junit.org/junit5/docs/current/user-guide/#writing-tests-annotations
>
> - **@Test :**表示方法是测试方法。但是与JUnit4的@Test不同，他的职责非常单一不能声明任何属性，拓展的测试将会由Jupiter提供额外测试
> - **@ParameterizedTest :**表示方法是参数化测试，下方会有详细介绍
> - **@RepeatedTest :**表示方法可重复执行，下方会有详细介绍
> - **@DisplayName :**为测试类或者测试方法设置展示名称
> - **@BeforeEach :**表示在每个单元测试之前执行
> - **@AfterEach :**表示在每个单元测试之后执行
> - **@BeforeAll :**表示在所有单元测试之前执行
> - **@AfterAll :**表示在所有单元测试之后执行
> - **@Tag :**表示单元测试类别，类似于JUnit4中的@Categories
> - **@Disabled :**表示测试类或测试方法不执行，类似于JUnit4中的@Ignore
> - **@Timeout :**表示测试方法运行如果超过了指定时间将会返回错误
> - **@ExtendWith :**为测试类或测试方法提供扩展类引用

```java

@SpringBootTest
@DisplayName("junit5功能测试类")
public class JUnit5Test {
    @Tag(value = "aa")
    @DisplayName("junit5功能测试类")
    @Test
    void testDisplayName() {
        System.out.println(1);
    }
    @Disabled
    @DisplayName("junit5功能测试类2")
    @Test
    void testDisplayName2() {
        System.out.println(2);
    }
    @RepeatedTest(5)
    @Test
    public void testRepeat(){
        System.out.println(1);
    }
    @BeforeEach
    void testBeforeEach() {
        System.out.println("测试方法要开始了");
    }
    @AfterEach
    void testAfterEach() {
        System.out.println("测试方法要结束了");
    }
    @BeforeAll
    static void testBeforeAll() {
        System.out.println("所有测试方法要开始了");
    }
    @Tag(value = "aa")
    @AfterAll
    static void testAfterAll() {
        System.out.println("所有测试方法要结束了");
    }
    @Test
    @Timeout(value = 5)
    void testTimeout() throws InterruptedException {
        Thread.sleep(6000);
    }
}
```

> 注解详情请参考：[注解使用合集](https://shaoshaossm.github.io/2022-02-23-zhu-jie-de-shi-yong-he-ji.html#toc-heading-54)

#### 断言

> 断言（assertions）是测试方法中的核心部分，用来对测试需要满足的条件进行验证。**这些断言方法都是 org.junit.jupiter.api.Assertions 的静态方法**。JUnit 5 内置的断言可以分成如下几个类别：
>
> - **检查业务逻辑返回的数据是否合理。**
> - **所有的测试运行结束以后，会有一个详细的测试报告**

> <font color="orange">前面断言失败，后面的代码不会执行</font>

##### 简单断言

> 用来对单个值进行简单的验证。如：

| 方法            | 说明                                 |
| --------------- | ------------------------------------ |
| assertEquals    | 判断两个对象或两个原始类型是否相等   |
| assertNotEquals | 判断两个对象或两个原始类型是否不相等 |
| assertSame      | 判断两个对象引用是否指向同一个对象   |
| assertNotSame   | 判断两个对象引用是否指向不同的对象   |
| assertTrue      | 判断给定的布尔值是否为 true          |
| assertFalse     | 判断给定的布尔值是否为 false         |
| assertNull      | 判断给定的对象引用是否为 null        |
| assertNotNull   | 判断给定的对象引用是否不为 null      |

> import static org.junit.jupiter.api.Assertions.*;
```java
@Test
@DisplayName("simple assertion")
public void simple() {
     assertEquals(3, 1 + 2, "simple math");
     assertNotEquals(3, 1 + 1);

     assertNotSame(new Object(), new Object());
     Object obj = new Object();
     assertSame(obj, obj);

     assertFalse(1 > 2);
     assertTrue(1 < 2);

     assertNull(null);
     assertNotNull(new Object());
}
```

##### 数组断言

> 通过 assertArrayEquals 方法来判断两个对象或原始类型的数组是否相等

```java
@Test
@DisplayName("array assertion")
public void array() {
 assertArrayEquals(new int[]{1, 2}, new int[] {1, 2});
}
```

##### 组合断言

> `assertAll` 方法接受多个 `org.junit.jupiter.api.Executable` 函数式接口的实例作为要验证的断言，可以通过` lambda` 表达式很容易的提供这些断言

```java
@Test
@DisplayName("assert all")
public void all() {
 assertAll("Math",
    () -> assertEquals(2, 1 + 1),
    () -> assertTrue(1 > 0)
 );
}
```

##### 异常断言

> 在JUnit4时期，想要测试方法的异常情况时，需要用**@Rule**注解的ExpectedException变量还是比较麻烦的。而JUnit5提供了一种新的断言方式**Assertions.assertThrows()** ,配合函数式编程就可以进行使用。

```java
@Test
@DisplayName("异常测试")
public void exceptionTest() {
    ArithmeticException exception = Assertions.assertThrows(
           //扔出断言异常
            ArithmeticException.class, () -> System.out.println(1 % 0));

}
```

##### 超时断言

> Junit5还提供了**Assertions.assertTimeout()** 为测试方法设置了超时时间

```java
@Test
@DisplayName("超时测试")
public void timeoutTest() {
    //如果测试方法时间超过1s将会异常
    Assertions.assertTimeout(Duration.ofMillis(1000), () -> Thread.sleep(500));
}
```

#### 快速失败

> 通过 fail 方法直接使得测试失败

```java
@Test
@DisplayName("fail")
public void shouldFail() {
 fail("This should fail");
}
```

![生成测试报告](https://img-blog.csdnimg.cn/eefa203ec5ab48fea2373993279a9a9e.png)

#### 前置条件（assumptions）

> JUnit 5 中的前置条件（**assumptions【假设】**）类似于断言，不同之处在于**不满足的断言会使得测试方法失败**，而不满足的**前置条件只会使得测试方法的执行终止**。前置条件可以看成是测试方法执行的前提，当该前提不满足时，就没有继续执行的必要。

```java

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.Objects;

import static org.junit.jupiter.api.Assumptions.*;

@DisplayName("前置条件")
public class AssumptionsTest {
    private final String environment = "DEV";

    @Test
    @DisplayName("simple")
    public void simpleAssume() {
        assumeTrue(Objects.equals(this.environment, "DEV"));
        assumeFalse(() -> Objects.equals(this.environment, "PROD"));
    }

    @Test
    @DisplayName("assume then do")
    public void assumeThenDo() {
        assumingThat(
                Objects.equals(this.environment, "DEV"),
                () -> System.out.println("In DEV")
        );
    }
}

```

> - `assumeTrue `和` assumFalse`确保给定的条件为 true 或 false，不满足条件会使得测试执行终止。
>
> - `assumingThat `的参数是表示条件的布尔值和对应的 Executable 接口的实现对象。只有条件满足时，Executable 对象才会被执行；当条件不满足时，测试执行并不会终止。

#### 嵌套测试

> JUnit 5 可以通过 Java 中的内部类和@Nested 注解实现嵌套测试，从而可以更好的把相关的测试方法组织在一起。在内部类中可以使用@BeforeEach 和@AfterEach 注解，而且嵌套的层次没有限制。

```java

import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;

import java.util.EmptyStackException;
import java.util.Stack;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("嵌套测试")
public class TestingAStackDemo {
    Stack<Object> stack;

    @Test
    @DisplayName("is instantiated with new Stack()")
    void isInstantiatedWithNew() {
        new Stack<>();
    }

    @Nested
    @DisplayName("when new")
    class WhenNew {

        @BeforeEach
        void createNewStack() {
            stack = new Stack<>();
        }

        @Test
        @DisplayName("is empty")
        void isEmpty() {
            assertTrue(stack.isEmpty());
        }

        @Test
        @DisplayName("throws EmptyStackException when popped")
        void throwsExceptionWhenPopped() {
            assertThrows(EmptyStackException.class, stack::pop);
        }

        @Test
        @DisplayName("throws EmptyStackException when peeked")
        void throwsExceptionWhenPeeked() {
            assertThrows(EmptyStackException.class, stack::peek);
        }

        @Nested
        @DisplayName("after pushing an element")
        class AfterPushing {

            String anElement = "an element";

            @BeforeEach
            void pushAnElement() {
                stack.push(anElement);
            }

            @Test
            @DisplayName("it is no longer empty")
            void isNotEmpty() {
                assertFalse(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when popped and is empty")
            void returnElementWhenPopped() {
                assertEquals(anElement, stack.pop());
                assertTrue(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when peeked but remains not empty")
            void returnElementWhenPeeked() {
                assertEquals(anElement, stack.peek());
                assertFalse(stack.isEmpty());
            }
        }
    }
}

```

#### 参数化测试

> 参数化测试是JUnit5很重要的一个新特性，它使得用不同的参数多次运行测试成为了可能，也为我们的单元测试带来许多便利。
>
> 利用**@ValueSource**等注解，指定入参，我们将可以使用不同的参数进行多次单元测试，而不需要每新增一个参数就新增一个单元测试，省去了很多冗余代码。

- `@ValueSource`: 为参数化测试指定入参来源，支持八大基础类以及String类型,Class类型

- `@NullSource`: 表示为参数化测试提供一个null的入参

- `@EnumSource`: 表示为参数化测试提供一个枚举入参

- `@MethodSource`：表示读取指定方法的返回值作为参数化测试入参(注意方法返回需要是一个流)

> 当然如果参数化测试仅仅只能做到指定普通的入参还达不到让我觉得惊艳的地步。它真正的强大之处的地方在于它可以支持外部的各类入参。如:CSV,YML,JSON 文件甚至方法的返回值也可以作为入参。只需要去实现**ArgumentsProvider**接口，任何外部文件都可以作为它的入参。

```java
package com.ssm;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.platform.commons.util.StringUtils;

import java.util.stream.Stream;

public class ParameterizedTest01 {

    @ParameterizedTest
    @ValueSource(strings = {"one", "two", "three"})
    @DisplayName("参数化测试1")
    public void parameterizedTest1(String string) {
        System.out.println(string);
        Assertions.assertTrue(StringUtils.isNotBlank(string));
    }

    @ParameterizedTest
    @NullSource
    @DisplayName("参数化测试1")
    public void parameterizedTest2(String a) {
        if (a == null) {
            System.out.println("aaa");
        } else {
            System.out.println("bbb");
        }
    }
    @ParameterizedTest
    @EnumSource
    @DisplayName("参数化测试1")
    public void parameterizedTest3(Season season) {
        Season chu = Season.SPRING;
        System.out.println(chu.toString());
        System.out.println(season.getSeasonName());
        System.out.println(season.getSeasonDesc());
    }


    @ParameterizedTest
    @MethodSource("method")    //指定方法名
    @DisplayName("方法来源参数")
    public void testWithExplicitLocalMethodSource(String name) {
        System.out.println(name);
        Assertions.assertNotNull(name);
    }

    static Stream<String> method() {
        return Stream.of("apple", "banana");
    }
}

```

Season

```java
package com.ssm;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2022/4/22 12:47
 */
public enum Season {
    SPRING("春天","春暖花开"),
    SUMMER("夏天","夏日炎炎"),
    AUTUMN("秋天","秋高气爽"),
    WINTER("冬天","白雪皑皑");
    
    private final String seasonName;
    private final String seasonDesc;

    private Season(String seasonName, String seasonDesc) {
        this.seasonName = seasonName;
        this.seasonDesc = seasonDesc;
    }
    
    public String getSeasonName() {
        return seasonName;
    }

    public String getSeasonDesc() {
        return seasonDesc;
    }

    @Override
    public String toString() {
        return "Season{" +
                "seasonName='" + seasonName + '\'' +
                ", seasonDesc='" + seasonDesc + '\'' +
                '}';
    }
}
```

- `@CsvFileSource`：表示读取指定CSV文件内容作为参数化测试入参

Insurance

```java


public class Insurance {
    private static final int Basic_PREMIUM_RATE = 1000;
    private static final int[][] SETTING = {{0,0,0},{28,11,50},{18,9,100},{10,7,150},{8,5,200},{15,7,250}};
    public static int[] calcSetting(int age){
        if (age < 16 || age >80){
            return SETTING[0];
        }else if(age < 25){
            return SETTING[1];
        }else if(age < 35){
            return SETTING[2];
        }else if (age <45){
            return SETTING[3];
        }else if (age < 60){
            return SETTING[4];
        }else {
            return SETTING[5];
        }
    }

    public int calcInsurance(int age,int score){
        int insuranceMoney = -1;
        if(score > 0 && score<13){
            int[] setting = calcSetting(age);
            if (setting!=SETTING[0]){
                int safeDrivingDiscount = 0;
                int ageCoeffcient = setting[0];
                int scoreThreshold = setting[1];
                if (score>scoreThreshold){
                    safeDrivingDiscount = setting[2];
                }
                insuranceMoney = (int)(Basic_PREMIUM_RATE/10*ageCoeffcient)-safeDrivingDiscount;
            }
        }
        return insuranceMoney;
    }
}
```

> 按住ctrl + shift + T,自动生成测试类如下：
>
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/4677b4893eb246258ac12536a3e452f8.png)

InsuranceTest

```java
package com.ssm;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;

import static org.junit.jupiter.api.Assertions.*;

class InsuranceTest {

    Insurance insurance = new Insurance();

    @ParameterizedTest
    @CsvFileSource(resources = "/test.csv")
    void calcInsurance(int age,int score,int money) {
        assertEquals(money,insurance.calcInsurance(age,score));
    }
}
```

resources-test.csv

```csv
20,12,2750
20,6,2800
30,11,1700
30,5,1800
40,10,850
40,4,1000
52,9,600
52,3,800
70,10,1250
70,4,1500
```

![测试结构](https://img-blog.csdnimg.cn/3598deef8a354482a10a67502d59284c.png)

> 参考文章：https://blog.csdn.net/Zheng_lan/article/details/115223343

> - 注解在 org.junit.jupiter.api 包中
> - 断言在 org.junit.jupiter.api.Assertions 类中
> - 前置条件在 org.junit.jupiter.api.Assumptions 类中。

### 指标监控

**引入依赖**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

> - 访问 http://localhost:8080/actuator/

**暴露所有监控信息为HTTP**

```yaml
management:
  endpoints:
    enabled-by-default: true #暴露所有端点信息
    web:
      exposure:
        include: '*'  #以web方式暴露
```

**测试**

> http://localhost:8080/actuator/beans
>
> http://localhost:8080/actuator/configprops
>
> http://localhost:8080/actuator/metrics
>
> http://localhost:8080/actuator/metrics/jvm.gc.pause
>
> [http://localhost:8080/actuator/](http://localhost:8080/actuator/metrics)endpointName/detailPath
> 。。。。。。

#### Actuator Endpoint

**最常使用的端点**

| ID                 | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| `auditevents`      | 暴露当前应用程序的审核事件信息。需要一个`AuditEventRepository组件`。 |
| `beans`            | 显示应用程序中所有Spring Bean的完整列表。                    |
| `caches`           | 暴露可用的缓存。                                             |
| `conditions`       | 显示自动配置的所有条件信息，包括匹配或不匹配的原因。         |
| `configprops`      | 显示所有`@ConfigurationProperties`。                         |
| `env`              | 暴露Spring的属性`ConfigurableEnvironment`                    |
| `flyway`           | 显示已应用的所有Flyway数据库迁移。 需要一个或多个`Flyway`组件。 |
| `health`           | 显示应用程序运行状况信息。                                   |
| `httptrace`        | 显示HTTP跟踪信息（默认情况下，最近100个HTTP请求-响应）。需要一个`HttpTraceRepository`组件。 |
| `info`             | 显示应用程序信息。                                           |
| `integrationgraph` | 显示Spring `integrationgraph` 。需要依赖`spring-integration-core`。 |
| `loggers`          | 显示和修改应用程序中日志的配置。                             |
| `liquibase`        | 显示已应用的所有Liquibase数据库迁移。需要一个或多个`Liquibase`组件。 |
| `metrics`          | 显示当前应用程序的“指标”信息。                               |
| `mappings`         | 显示所有`@RequestMapping`路径列表。                          |
| `scheduledtasks`   | 显示应用程序中的计划任务。                                   |
| `sessions`         | 允许从Spring Session支持的会话存储中检索和删除用户会话。需要使用Spring Session的基于Servlet的Web应用程序。 |
| `shutdown`         | 使应用程序正常关闭。默认禁用。                               |
| `startup`          | 显示由`ApplicationStartup`收集的启动步骤数据。需要使用`SpringApplication`进行配置`BufferingApplicationStartup`。 |
| `threaddump`       | 执行线程转储。                                               |

如果您的应用程序是Web应用程序（Spring MVC，Spring WebFlux或Jersey），则可以使用以下附加端点：

| ID           | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `heapdump`   | 返回`hprof`堆转储文件。                                      |
| `jolokia`    | 通过HTTP暴露JMX bean（需要引入Jolokia，不适用于WebFlux）。需要引入依赖`jolokia-core`。 |
| `logfile`    | 返回日志文件的内容（如果已设置`logging.file.name`或`logging.file.path`属性）。支持使用HTTP`Range`标头来检索部分日志文件的内容。 |
| `prometheus` | 以Prometheus服务器可以抓取的格式公开指标。需要依赖`micrometer-registry-prometheus`。 |

最常用的Endpoint

- **Health：监控状况**

> 健康检查端点，我们一般用于在云平台，平台会定时的检查应用的健康状况，我们就需要Health Endpoint可以为平台返回当前应用的一系列组件健康状况的集合。
>
> 重要的几点：
>
> - health endpoint返回的结果，应该是一系列健康检查后的一个汇总报告
> - 很多的健康检查默认已经自动配置好了，比如：数据库、redis等
> - 可以很容易的添加自定义的健康检查机制
>
> ![health](https://img-blog.csdnimg.cn/9752459d90e2401189760279af76a11f.png)

- **Metrics：运行时指标**

> 提供详细的、层级的、空间指标信息，这些信息可以被pull（主动推送）或者push（被动获取）方式得到；
>
> - 通过Metrics对接多种监控系统
> - 简化核心Metrics开发
> - 添加自定义Metrics或者扩展已有Metrics
>
> ![metrics](https://img-blog.csdnimg.cn/4401cecbd0a44d5ab9dff9ecb8291d9d.png)

- **Loggers：日志记录**

![loggers](https://img-blog.csdnimg.cn/c9cdb32376ed43928f21a4fee0bc6987.png)

#### 管理Endpoints

**开启与禁用Endpoints**

> - 默认所有的Endpoint除过shutdown都是开启的。
> - 需要开启或者禁用某个Endpoint。配置模式为  **management.endpoint.****<endpointName>****.enabled = tru**

```yaml
management:
  endpoint:
    beans:
      enabled: true
```

> - 或者禁用所有的Endpoint然后手动开启指定的Endpoint

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

#### 定制 Endpoint

##### 定制 Health 信息

> 自定义的Health类名必须叫xxxHealthIndicator.xxx则是组件名字

```java
@Component
public class MyComHealthIndicator extends AbstractHealthIndicator {

    /**
     * 真实的检查方法
     * @param builder
     * @throws Exception
     */
    @Override
    protected void doHealthCheck(Health.Builder builder) throws Exception {
        //mongodb。  获取连接进行测试
        Map<String,Object> map = new HashMap<>();
        // 检查完成
        if(1 == 2){
//            builder.up(); //健康
            builder.status(Status.UP);
            map.put("count",1);
            map.put("ms",100);
        }else {
//            builder.down();
            builder.status(Status.OUT_OF_SERVICE);
            map.put("err","连接超时");
            map.put("ms",3000);
        }


        builder.withDetail("code",100)
                .withDetails(map);

    }
}
```

![mycom](https://img-blog.csdnimg.cn/cf5ca314972e47c8a871c6ae968d49cc.png)

##### 定制info信息

> 两种方式

**1.编写配置文件**

```yaml
info:
  appName: boot-admin
  version: 2.0.1
  mavenProjectName: @project.artifactId@  #使用@@可以获取maven的pom文件值
  mavenProjectVersion: @project.version@
```

**2.编写InfoContributor**

```java
@Component
public class ExampleInfoContributor implements InfoContributor {

    @Override
    public void contribute(Info.Builder builder) {
        builder.withDetail("example",
                Collections.singletonMap("key", "value"));
    }

}

```

![info](https://img-blog.csdnimg.cn/a3f04608c73a48e4a6d5b1a20f1099d5.png)

```yaml
info:
  appName: boot-admin
  version: 2.0.1
  mavenProjectName: @project.artifactId@  #使用@@可以获取maven的pom文件值
  mavenProjectVersion: @project.version@
```

> 推荐使用编写InfoContributor，配置文件在高版本好像不再适用

##### 定制Metrics信息

**增加定制Metrics**

```java
class MyService{
    Counter counter;
    public MyService(MeterRegistry meterRegistry){
         counter = meterRegistry.counter("myservice.method.running.counter");
    }

    public void hello() {
        counter.increment();
    }
}


//也可以使用下面的方式
@Bean
MeterBinder queueSize(Queue queue) {
    return (registry) -> Gauge.builder("queueSize", queue::size).register(registry);
}
```

#### 定制Endpoint

```java
@Component
@Endpoint(id = "container")
public class DockerEndpoint {


    @ReadOperation
    public Map getDockerInfo(){
        return Collections.singletonMap("info","docker started...");
    }

    @WriteOperation
    private void restartDocker(){
        System.out.println("docker restarted....");
    }

}
```

![定制Endpoint](https://img-blog.csdnimg.cn/1259569f325d43cea3c5774d823b83c1.png)

> 场景：开发**ReadinessEndpoint**来管理程序是否就绪，或者**Liveness****Endpoint**来管理程序是否存活；
>
> 当然，这个也可以直接使用 https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-kubernetes-probes

### 可视化

#### 创建一个服务提供端

> 导入依赖

```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-server</artifactId>
    <version>2.3.1</version>
</dependency>
```

> 启动类上加上注解

```java
@EnableAdminServer
@SpringBootApplication
public class BootAdminserverApplication {

    public static void main(String[] args) {
        SpringApplication.run(BootAdminserverApplication.class, args);
    }

}
```

> 配置文件

```properties
# 应用名称
spring.application.name=boot-adminserver

# 应用服务 WEB 访问端口
server.port=8888
```

#### 服务调用端

> 导入依赖

```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-client</artifactId>
    <version>2.3.1</version>
</dependency>
```

> 指定服务提供端

```yaml
spring:
  boot:
    admin:
      client:
        url: http://localhost:8888
  application:
    name: demo02static
```

> 启动应用
>
> 访问：http://localhost:8888/applications

![http://localhost:8888/applications](https://img-blog.csdnimg.cn/63597be2f40b4cfc8b050a987b6414ef.png)

### Spring Boot 项目配置字符编码

#### 第一种方式

```java
@Configuration
public class SystemConfig {
    @Bean
    public FilterRegistrationBean characterEncodingFilterRegistrationBean(){
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setForceEncoding(true);
        characterEncodingFilter.setEncoding("utf-8");

        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(characterEncodingFilter);
        filterRegistrationBean.addUrlPatterns("/");

        return filterRegistrationBean;
    }
}
```

```java
@WebServlet(urlPatterns = "/myServlet")
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().println("世界你好 Hello World!");
        //统一设置浏览器 编码格式
        resp.setContentType("text/html;character=tuf-8");
        resp.getWriter().flush();
        resp.getWriter().close();
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
```

```properties
#关闭sspringboot字符编码支持
spring.http.encoding.enabled=false
```

```java
@SpringBootApplication
@ServletComponentScan(basePackages = "com.bjpowernode.springboot.servlet")
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
```

#### 第二种方式

```java
@WebServlet(urlPatterns = "/myServlet")
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charaset=utf-8");
        resp.getWriter().println("世界你好 Hello World");
        resp.getWriter().flush();
        resp.getWriter().close();
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
```

```properties
server.servlet.encoding.enabled=true
server.servlet.encoding.force=true
server.servlet.encoding.charset=utf-8
```

### Spring Boot 打包与部署

#### Spring Boot 程序 war 包部署

- 指定打包方式war

```xml
<finalName>SpringbootWar</finalName>
```

![打包war](https://img-blog.csdnimg.cn/3088e131b3064c98a8f53cda5b83a58a.png)

- 将打包好的war包放入tomcat-webapps下
- 启动tomcat

![运行结果](https://img-blog.csdnimg.cn/47100783d469444bbab71163fd53c58c.png)

#### Spring Boot 程序 jar 包部署

- 修改版本号

```
<plugin>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-maven-plugin</artifactId>
   <version>1.4.2.RELEASE</version>
</plugin>
```

- 打包静态资源文件、配置文件

```xml
<resource>
    <directory>src/main/webapp</directory>
    <targetPath>META-INF/resources</targetPath>
    <includes>
        <include>*.*</include>
    </includes>
</resource>
<resource>
    <directory>src/main/resources</directory>
    <includes>
        <include>
            **/*.*
        </include>
    </includes>
</resource>
```

![打包步骤](https://img-blog.csdnimg.cn/c227220c4bc24192894c44770d0f05dc.png)

- 输入命令`java -jar springboot.jar`

![运行结果](https://img-blog.csdnimg.cn/7004dbf3dfde4d2f8cfb98e7625cd1e4.png)

> - 取消掉cmd的快速编辑模式

---

#### springboot项目整体打包

```xml
<plugins>
    <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
            <!-- 指定该Main Class为全局的唯一入口 -->
            <mainClass>com.ssm.msmservice.MsmApplication</mainClass>
            <layout>ZIP</layout>
        </configuration>
        <executions>
            <execution>
                <goals>
                    <goal>repackage</goal><!--可以把依赖的包都打包到生成的Jar包中-->
                </goals>
            </execution>
        </executions>
    </plugin>
</plugins>
```

### SpringBoot 集成 logback 日志

logback-spring.xml

```xml
<?xml version="1.0" encoding="UTF-8"?> <!-- 日志级别从低到高分为 TRACE < DEBUG < INFO < WARN < ERROR < FATAL，如果 设置为 WARN，则低于 WARN 的信息都不会输出 --> <!-- scan:当此属性设置为 true 时，配置文件如果发生改变，将会被重新加载，默认值为 true --> <!-- scanPeriod:设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认 单位是毫秒。当 scan 为 true 时，此属性生效。默认的时间间隔为 1 分钟。 --> <!-- debug:当此属性设置为 true 时，将打印出 logback 内部日志信息，实时查看 logback 运行状态。默认值为 false。通常不打印 -->
<configuration scan="true" scanPeriod="10 seconds">

    <!--输出到控制台-->
    <appender name="CONSOLE"
              class="ch.qos.logback.core.ConsoleAppender">         <!--此日志 appender 是为开发使用，只配置最底级别，控制台输出的日志级别是大 于或等于此级别的日志信息-->
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>debug</level>

        </filter>
        <encoder>
            <Pattern>%date [%-5p] [%thread] %logger{60} [%file : %line] %msg%n</Pattern>             <!-- 设置字符集 -->
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <appender name="FILE"
              class="ch.qos.logback.core.rolling.RollingFileAppender">         <!--<File>/home/log/stdout.log</File>-->
        <File>F:/log/stdout.log</File>
        <encoder>
            <pattern>%date [%-5p] %thread %logger{60} [%file : %line] %msg%n</pattern>
        </encoder>
        <rollingPolicy
                class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">             <!-- 添加.gz 历史日志会启用压缩 大大缩小日志文件所占空间 -->             <!--<fileNamePattern>/home/log/stdout.log.%d{yyyy-MM-dd}.log</fileNam ePattern>-->
            <fileNamePattern>F:/log/stdout.log.%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory><!--  保留 30 天日志 -->
        </rollingPolicy>
    </appender>

    <logger name="com.abc.springboot.mapper" level="DEBUG"/>

    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="FILE"/>
    </root>
</configuration>
```

```java
@Controller
@Slf4j
public class StudentController {

    @Autowired
    private StudentService studentService;

    @RequestMapping(value = "/student/count")
    @ResponseBody
    public String studentCount(){

        log.info("查询当前学生的总人数!");
       Integer count =  studentService.queryStudentCount();
        return "学生总人数为："+ count;
    }
}

```

### 小TIP

#### 关闭logo

```java
@SpringBootApplication
public class Application {
	public static void main(String[] args) {
		SpringApplication springApplication = new SpringApplication(Application.class);
		springApplication.setBannerMode(Banner.Mode.OFF);
		springApplication.run(args);
	}
}
```

#### 修改logo

- 在 src/main/resources 放入 banner.txt 文件，该文件名字不能随意，文件中的内容就是要输出 的 logo ；

- 可以利用网站生成图标： 
  - https://www.bootschool.net/ascii 
  - http://patorjk.com/software/taag/

- 将生成好的图标文字粘贴到 banner.txt 文件中，然后将关 闭 logo 输出的语句注释，启动看效果

