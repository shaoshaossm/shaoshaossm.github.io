---
title: bug问题总结
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-02 19:17:26
password:
summary: 记录学习过程中遇到的bug---------------------------------------------
tags: [SpringBoot,bug]
categories: 错误&bug
---

- Mybatis逆向工程生成代码报错 `Public Key Retrieval is not allowed` 

```properties
# 在配置文件和逆向工程url链接中加入
allowPublicKeyRetrieval=true
```

- SpringBoot引用Eureka导致返回结果由json变为xml解决方案

![问题演示](https://img-blog.csdnimg.cn/4af1c26a13e84a40844af71e8d755c6f.png)

在@GetMapping 后加入produces = MediaType.APPLICATION_JSON_UTF8_VALUE 即可

```java
@GetMapping(value = "/consumer/payment/get/{id}",produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
```

![完美解决](https://img-blog.csdnimg.cn/f222bc57c16842288de8be79df942b07.png)

