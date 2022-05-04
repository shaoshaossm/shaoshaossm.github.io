---
title: java实用小功能案例
top: false
cover: false
toc: true
mathjax: true
date: 2022-02-22 15:03:12
password:
img: https://img-blog.csdnimg.cn/9d3caa9f8b99496bb61e8a8cd953be4d.png
summary: 记录java中常用、实用的小功能案例------------------------------
tags: java
categories: 后端
---

### 随机数

```java
// 生成20-30之间的随机数
Random rand = new Random();
int num = rand.nextInt(11)+21;
// Math 类中的 random 方法返回一个 [0.0, 1.0) 区间的 double 值。下面这段代码能得到一个 min 和 max 之间的随机数：
int randomWithMathRandom = (int) ((Math.random() * (max - min)) + min);
// [3-1)
int randomWithMathRandom = (int) ((Math.random() * (3 - 1)) + 1);
```

### 验证码

```java
String ZiMu = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGJKLZXCVBNM1234567890";
    String result = "";
    Random random = new Random();
    for (int i = 0; i < 4; i++) {
        int index = random.nextInt(ZiMu.length());
        char c = ZiMu.charAt(index);
        result += c;
    }
    System.out.print(result);
```

### 日期

```java
Date dNow = new Date( );
SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
System.out.println("当前时间为: " + ft.format(dNow));
```

### 时区

```java
public class test {
    public static void main(String[] args) {
        ZonedDateTime zonedDateTime = ZonedDateTime.now();
        System.out.println(zonedDateTime);
    }
}
```

### 工具类

[hutool官网](https://www.hutool.cn/)

