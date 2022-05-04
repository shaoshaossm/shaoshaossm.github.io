---
title: SpringBoot集成Swagger
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-28 11:14:56
password:
summary: 总结SpringBoot集成Swagger的使用方式---------------------
tags: [SpringBoot,Swagger]
categories: 接口测试
---

### 概述

[github地址](https://github.com/moxingwang/swagger)

**Swagger**

- 号称世界上最流行的API框架
- Restful Api 文档在线自动生成器 => **API 文档 与API 定义同步更新**
- 直接运行，在线测试API
- 支持多种语言 （如：Java，PHP等）
- 官网：https://swagger.io/

### SpringBoot集成Swagger

**新建一个SpringBoot-web项目**

![目录结构](https://img-blog.csdnimg.cn/bf2e8ca99ae4422a8d8f9fdb50c7301c.png)

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.4.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.kuang</groupId>
    <artifactId>swagger-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>swagger-demo</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger2 -->
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <version>2.9.2</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui -->
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger-ui</artifactId>
            <version>2.9.2</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

application.properties

```properties
spring.profiles.active=dev
swagger2.enable=true
```

application-dev.properties

```properties
swagger2.enable=true
server.port=8081
```

application-pro.properties

```properties
swagger2.enable=true
server.port=8082
```

SwaggerConfig

- 配置扫描接口

- 配置Swagger开关

- 配置API分组

```java

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    //配置了swagger的Docket的bean实例
    @Bean
    public Docket docket(Environment environment) {

        //设置要显示的Swagger环境
        Profiles profiles = Profiles.of("dev", "pro");


        //获取项目环境
        boolean flag = environment.acceptsProfiles(profiles);


        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .groupName("少司命")
                .enable(flag) //是否启用swagger
                .select()
//        any() // 扫描所有，项目中的所有接口都会被扫描到
//        none() // 不扫描接口
//// 通过方法上的注解扫描，如withMethodAnnotation(GetMapping.class)只扫描get请求
//        withMethodAnnotation(final Class<? extends Annotation> annotation)
//// 通过类上的注解扫描，如.withClassAnnotation(Controller.class)只扫描有controller注解的类中的接口
//        withClassAnnotation(final Class<? extends Annotation> annotation)
//        basePackage(final String basePackage) // 根据包路径扫描接口
                .apis(RequestHandlerSelectors.basePackage("com.kuang.swagger.controller"))
                //.paths(PathSelectors.ant("/kuang/**")) //过滤什么路径
                .build();
    }

    @Bean
    public Docket docket1() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("A");
    }

    @Bean
    public Docket docket2() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("B");
    }

    @Bean
    public Docket docket3() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("C");
    }
    // 配置Swagger信息=apiInfo
    private ApiInfo apiInfo() {
        //作者信息
        Contact contact = new Contact("少司命", "shaoshaossm.github.io", "1600767556@qq.com");

        return new ApiInfo(
                "少司命的SwaggerApi文档"
                , "待厉兵秣马后,就是要逆天而行"
                , "v1.0"
                , "shaoshaossm.github.io"
                , contact
                , "Apach2.0"
                , "http://www.apache.org/licences/LICENSE-2.0"
                , new ArrayList()
        );
    }


}
```

![配置AP分组](https://img-blog.csdnimg.cn/d0508d072ae54bbaa97f4b12ab8b0319.png)

HelloSwagger

```java
@Api(description = "helloSwagger类")
@RestController
public class HelloSwagger {

    @GetMapping(value = "/hello")
    public String hello() {
        return "hello";
    }
    @ApiOperation("注解应用")
    @GetMapping(value = "/api")
    public User api(@ApiParam("用户") User user) {
        return user;
    }
    //只要我们的接口中,返回值存在实体类,他就会扫描到Swagger中
    @PostMapping(value = "/user")
    public User user() {
        return new User();
    }

    @ApiOperation("Hello控制类")
    @GetMapping(value = "/hello2")
    public String hello2(@ApiParam("用户名") String username) {
        return "hello" + username;
    }

    @PostMapping(value = "/postt")
    public User postt(@ApiParam("用户") User user) {
        return user;
    }
}

```

![配置扫描接口](https://img-blog.csdnimg.cn/310c9c2a4ffd4abea2c79e0574e9dba4.png)

User

```java
@ApiModel("用户实体类")
public class User {
    @ApiModelProperty("用户名")
    private String username;
    @ApiModelProperty("密码")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
```

![用户实体类](https://img-blog.csdnimg.cn/ae41cc9093144d75be45ad07a579bd10.png)

SwaggerDemoApplication

```java
@SpringBootApplication
public class SwaggerDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(SwaggerDemoApplication.class, args);
    }

}
```

### 测试

![首页信息](https://img-blog.csdnimg.cn/33f0515105594ac0829774fa468a0383.png)
![功能测试](https://img-blog.csdnimg.cn/b7e6fd6484b948ceab98328387102f67.png)

### 注解解释

| Swagger注解                                            | 简单说明                                             |
| ------------------------------------------------------ | ---------------------------------------------------- |
| @Api(tags = "xxx模块说明")                             | 作用在模块类上                                       |
| @ApiOperation("xxx接口说明")                           | 作用在接口、方法上                                   |
| @ApiModel("xxxPOJO说明")                               | 作用在模型类上：如VO、BO                             |
| @ApiModelProperty(value = "xxx属性说明",hidden = true) | 作用在类方法和属性上，hidden设置为true可以隐藏该属性 |
| @ApiParam("xxx参数说明")                               | 作用在参数、方法和字段上，类似@ApiModelProperty      |

![注解效果](https://img-blog.csdnimg.cn/9619b0431a514e0698c25f4d922e7d87.png)
![注解效果](https://img-blog.csdnimg.cn/26c4715367d44e73adc86d958947e793.png)

### 其他皮肤

bootstrap-ui  **访问 http://localhost:8081/doc.html**

```xml
<!-- 引入swagger-bootstrap-ui包 /doc.html-->
<dependency>
   <groupId>com.github.xiaoymin</groupId>
   <artifactId>swagger-bootstrap-ui</artifactId>
   <version>1.9.1</version>
</dependency>
```

![效果展示](https://img-blog.csdnimg.cn/12e84675c488448894c301d685c13153.png)

mg-ui  **访问 http://localhost:8081/document.html**

```xml
<!-- 引入swagger-ui-layer包 /document.html-->
<dependency>
   <groupId>com.zyplayer</groupId>
   <artifactId>swagger-mg-ui</artifactId>
   <version>1.0.6</version>
</dependency>
```

![效果展示](https://img-blog.csdnimg.cn/527aeefd74054c878753f93120c9ec86.png)
