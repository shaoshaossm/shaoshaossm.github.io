---
title: SpringCloud之整体聚合父工程
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-13 10:48:52
password:
summary: 整理springcloud父工程所需的创建 配置等等------------------------
tags: [SpringBoot,SpringCloud]
categories: 框架
---

### SpringCloud简介

>springcloud官方文档（Hoxton SR5）：https://cloud.spring.io/spring-cloud-static/Hoxton.SR5/reference/htmlsingle/
>springcloud中文文档：https://www.springcloud.cc/
>springcloud中国社区文档：http://docs.springcloud.cn/
>https://www.bookstack.cn/read/spring-cloud-docs/docs-index.md

![微服务架构](https://img-blog.csdnimg.cn/eee91c9b39d74970b6901df3773afc05.png)

![技术大纲](https://img-blog.csdnimg.cn/8bf73078ef9542238369472727c029fd.png)

[spring githubt](https://github.com/spring-projects)

[springboot2.0新特性](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Release-Notes)

[springboot](https://docs.spring.io/spring-boot/docs/2.2.2.RELEASE/reference/htmlsingle/)

[springcloud](https://cloud.spring.io/spring-cloud-static/Hoxton.SR1/reference/htmlsingle/)

[springcloud中文文档](https://www.bookstack.cn/read/spring-cloud-docs/docs-index.md)

### 创建父项目

#### new Project

![New Project](https://img-blog.csdnimg.cn/924e8c187e45423baf8b43c58f71476f.png)

#### 聚合总父工程名字

![聚合总父工程](https://img-blog.csdnimg.cn/7dd7c1d778e64e9399117bf379fb0e44.png)

#### Maven版本

![Maven版本](https://img-blog.csdnimg.cn/530c38f4aa3c48ac90b46902d20e6758.png)

#### UTF-8

![UTF-8](https://img-blog.csdnimg.cn/b866417de40d45058c0a66d203e9a01b.png)

#### 注解生效激活

![注解生效激活](https://img-blog.csdnimg.cn/98627ba52f8847edab68300ccdf05e3f.png)

#### File Type文件过滤

- 

![File Type文件过滤](https://img-blog.csdnimg.cn/99484db1e56340b599d188bf2090d63a.png)

### 构建支付模块

#### New Module

![New Module](https://img-blog.csdnimg.cn/a1ec226c1f5c448383eafe94ee9863d9.png)

#### Finish

![Finish](https://img-blog.csdnimg.cn/ae90dbcaaaf44ca1a9d61626765060d0.png)

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.ssm.springcloud</groupId>
  <artifactId>springloud2022</artifactId>
  <version>1.0-SNAPSHOT</version>
  <modules>
    <module>cloud-provider-payment8001</module>
      <module>cloud-consumer-order80</module>
  </modules>
  <packaging>pom</packaging>
  <!-- packaging pom 总工程-->
  <!--统一管理jar包版本-->
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>12</maven.compiler.source>
    <maven.compiler.target>12</maven.compiler.target>
    <junit.version>4.12</junit.version>
    <lombok.version>1.18.10</lombok.version>
    <log4j.version>1.2.17</log4j.version>
    <mysql.version>8.0.17</mysql.version>
    <druid.version>1.1.16</druid.version>
    <mybatis.spring.boot.version>2.0.0</mybatis.spring.boot.version>
  </properties>

  <!--子模块继承之后，提供作用：锁定版本+子module不用写groupId和version-->
  <dependencyManagement><!--定义规范，但不导入-->
    <dependencies>
<!--      <dependency>-->
<!--        <groupId>org.apache.maven.plugins</groupId>-->
<!--        <artifactId>maven-project-info-reports-plugin</artifactId>-->
<!--        <version>3.0.0</version>-->
<!--      </dependency>-->
      <!--spring boot 2.2.2-->
      <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-dependencies</artifactId>
        <version>2.2.2.RELEASE</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
      <!--spring cloud Hoxton.SR1-->
      <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies</artifactId>
        <version>Hoxton.SR1</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
      <!--spring cloud 阿里巴巴-->
      <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-alibaba-dependencies</artifactId>
        <version>2.1.0.RELEASE</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
      <!--mysql-->
      <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>${mysql.version}</version>
        <scope>runtime</scope>
      </dependency>
      <!-- druid-->
      <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>${druid.version}</version>
      </dependency>
      <!--mybatis-->
      <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>${mybatis.spring.boot.version}</version>
      </dependency>
      <!--junit-->
      <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>${junit.version}</version>
      </dependency>
      <!--log4j-->
      <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>${log4j.version}</version>
      </dependency>
    </dependencies>
  </dependencyManagement>

</project>

```

