---
title: SpringMVC
top: false
cover: false
toc: true
mathjax: true
date: 2022-02-27 14:39:24
password:
summary: SpringMVC框架的再次学习------------------------------------------ 
tags: SpringMVC
categories: 框架
---

### hello-springmvc

接收请求参数，使用的处理器方法的形参

- HttpServletRequest

- HttpServletResponse

- HttpSession

- 用户提交的数据
  - 逐个接收
    - 处理器方法的形参和请求参数名必须一致，同名的请求参数赋值给同名的形参
  - 对象接收

```java
@RequestMapping(value = "/first.do")
public ModelAndView doFirst(HttpServletRequest request, HttpServletResponse response, HttpSession session){
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.addObject("msg","欢迎使用springmvc做web开发"+request.getParameter("name"));
    modelAndView.addObject("fun","fun执行的是doOther方法");
    modelAndView.setViewName("other");
    return modelAndView;
}
```

```java
@RequestMapping(value = "/receiveproperty.do")
public ModelAndView doSome(String name,Integer age){

    ModelAndView modelAndView = new ModelAndView();
   modelAndView.addObject("myname",name);
   modelAndView.addObject("myage",age);

    modelAndView.setViewName("show");
    return modelAndView;
}
```

```java
@RequestMapping(value = "/receiveobject.do")
public ModelAndView receiveParam(Student student){
    System.out.println(student.getName()+"  "+student.getAge());
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.addObject("myname",student.getName());
    modelAndView.addObject("myage",student.getAge());
    modelAndView.addObject("mystudent",student);
    modelAndView.setViewName("show");
    return modelAndView;
}
```

- 在提交post请求参数时，中文有乱码，需使用过滤器处理乱码问题

```xml
<!--注册声明过滤器，解决post请求乱码的问题-->
    <filter>
        <filter-name>characterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <!--设置项目中使用的字符编码-->
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
        <!--强制请求对象（HttpServletRequest）使用encoding编码的值-->
        <init-param>
            <param-name>forceRequestEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
        <!--强制应答对象（HttpServletResponse）使用encoding编码的值-->
        <init-param>
            <param-name>forceResponseEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>characterEncodingFilter</filter-name>
        <!--
           /*:表示强制所有的请求先通过过滤器处理。
        -->
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```

### 处理静态资源的两种方式

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
         https://www.springframework.org/schema/context/spring-context.xsd
         http://www.springframework.org/schema/mvc
          https://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <!--声明组件扫描器-->
    <context:component-scan base-package="com.bjpowernode.controller"></context:component-scan>
    <!--声明springmvc中的视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/view/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
    <!--第一种方式-->
    <!--<mvc:annotation-driven/>
    <mvc:default-servlet-handler/>-->
    <!--第二种方式-->
    <mvc:resources mapping="/images/**" location="/images/"/>
    <mvc:resources mapping="/html/**" location="/html/"/>
    <mvc:resources mapping="/js/**" location="/js/"/>
    <mvc:resources mapping="/static/ **" location="/static/"/>
    <mvc:annotation-driven/>

</beans>
```



