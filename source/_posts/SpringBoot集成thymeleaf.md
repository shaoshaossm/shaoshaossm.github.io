---
title: SpringBoot集成thymeleaf
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-06 14:10:54
password:
summary: SpringBoot 集成 Thymeleaf 模板的学习总结-------------------------------------
tags: [SpringBoot,Thymeleaf]
categories: 前端
---

**导入依赖**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

### 基本语法

#### 1、表达式

| 表达式名字 | 语法   | 用途                               |
| ---------- | ------ | ---------------------------------- |
| 变量取值   | ${...} | 获取请求域、session域、对象等值    |
| 选择变量   | *{...} | 获取上下文对象值                   |
| 消息       | #{...} | 获取国际化等值                     |
| 链接       | @{...} | 生成链接                           |
| 片段表达式 | ~{...} | jsp:include 作用，引入公共页面片段 |

#### 2、字面量

文本值: **'one text'** **,** **'Another one!'** **,…**数字: **0** **,** **34** **,** **3.0** **,** **12.3** **,…**布尔值: **true** **,** **false**

空值: **null**

变量： one，two，.... 变量不能有空格

#### 3、文本操作

字符串拼接: **+**

变量替换: **|The name is ${name}|** 

#### 4、数学运算

运算符: + , - , * , / , %

#### 5、布尔运算

运算符:  **and** **,** **or**

一元运算: **!** **,** **not** 

#### 6、比较运算

比较: **>** **,** **<** **,** **>=** **,** **<=** **(** **gt** **,** **lt** **,** **ge** **,** **le** **)**等式: **==** **,** **!=** **(** **eq** **,** **ne** **)** 

#### 7、条件运算

```html
If-then: **(if) ? (then)**

If-then-else: **(if) ? (then) : (else)**

Default: (value) **?: (defaultvalue)** 
```

#### 8、特殊操作

无操作： _

### 3、设置属性值-th:attr

设置单个值

```html
<form action="subscribe.html" th:attr="action=@{/subscribe}">
  <fieldset>
    <input type="text" name="email" />
    <input type="submit" value="Subscribe!" th:attr="value=#{subscribe.submit}"/>
  </fieldset>
</form>
```

设置多个值

```html
<img src="../../images/gtvglogo.png"  th:attr="src=@{/images/gtvglogo.png},title=#{logo},alt=#{logo}" />
```

以上两个的代替写法 th:xxxx

```html
<input type="submit" value="Subscribe!" th:value="#{subscribe.submit}"/>
<form action="subscribe.html" th:action="@{/subscribe}">
```

所有h5兼容的标签写法

https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#setting-value-to-specific-attributes

### 4、迭代

```html
<tr th:each="prod : ${prods}">
        <td th:text="${prod.name}">Onions</td>
        <td th:text="${prod.price}">2.41</td>
        <td th:text="${prod.inStock}? #{true} : #{false}">yes</td>
</tr>
```

```html
<tr th:each="prod,iterStat : ${prods}" th:class="${iterStat.odd}? 'odd'">
  <td th:text="${prod.name}">Onions</td>
  <td th:text="${prod.price}">2.41</td>
  <td th:text="${prod.inStock}? #{true} : #{false}">yes</td>
</tr>
```

### 5、条件运算

```html
<a href="comments.html"
th:href="@{/product/comments(prodId=${prod.id})}"
th:if="${not #lists.isEmpty(prod.comments)}">view</a>
```

```html
<div th:switch="${user.role}">
  <p th:case="'admin'">User is an administrator</p>
  <p th:case="#{roles.manager}">User is a manager</p>
  <p th:case="*">User is some other thing</p>
</div>
```

### 6、属性优先级


#### 关闭页面缓存

```properties
spring.thymeleaf.cache=false
```

![关闭缓存](https://img-blog.csdnimg.cn/cac435e160a9441e90687d60ea2dcef5.png)

UserController

```java
@Controller
public class UserController {
    @RequestMapping(value = "/user/detail")
    public String message(Model model){
        model.addAttribute("data","springboot继承thtmeleaf模板引擎!");
        return "message";
    }
}
```

message.html

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h2 th:text="${data}">展示要显示的内容</h2>
</body>
</html>
```

### 常用属性

```html
用户名称:<input type="text" th:name="username" th:id="username"/>
<a th:href="@{/test1(id=${id},username=${username},age=${age})}">相对路径多个参数(强烈推荐)</a>
<a th:href="@{'/test3/'+${id}+'/'+${username}}">请求路径为RESTful风格</a>
<script type="text/javascript" th:src="@{/js/jQuery.js}"></script>
<img th:src="@{/img/005XKz6xgy1g5c1bt9q9nj31hc0u0n17.jpg}">
<h1>标准变量表达式${}</h1>
<span th:text="${user.username}"></span>
<h1>选择变量表达式:*{}</h1>
<span th:text="*{id}"></span>
<h1>混合使用</h1>
<span th:text="*{user.username}"></span>
```

### 循环遍历l集合

#### list集合

```html
<!--user 当前循环的对象变量名（随意）-->
<!--userStat 当前循环对象状态的变量 可选 默认就有-->
<!--${userList} 当前循环的集合-->
<div th:each="user,userStat:${userList}">
<span th:text="${userStat.count}"></span>
<span th:text="${user.id}"></span>
<span th:text="${user.nick}"></span>
<span th:text="${user.phone}"></span>
<span th:text="${user.address}"></span>
</div>
```

#### map集合

```html
<div th:each="userMap,userMapStat:${userMaps}">
    <span th:text="${userMapStat.count}"></span>
    <span th:text="${userMapStat.index}"></span>
    <span th:text="${userMap.key}"></span>
    <span th:text="${userMap.value}"></span>
    <span th:text="${userMap.value.id}"></span>
</div>
```

#### 数组

```html
<div th:each="user,userStat:${userArray}">
    <span th:text="${userStat.index}"></span>
    <span th:text="${userStat.count}"></span>
    <span th:text="${user.id}"></span>
    <span th:text="${user.nick}"></span>
    <span th:text="${user.phone}"></span>
    <span th:text="${user.address}"></span>
</div>
```

#### 复杂集合

```java
@RequestMapping(value = "/each/all")
    public String eachAll(Model model){
        List<Map<Integer, List<User>>> myList = new ArrayList<>();
        for (int i = 0; i <2 ; i++) {
            Map<Integer, List<User>> myMap = new HashMap<>();
            for (int j = 0; j <2 ; j++) {
                List<User> myUserList = new ArrayList<>();
                for (int k = 0; k <3 ; k++) {
                    User user = new User();
                    user.setId(k);
                    user.setNick("zs"+i);
                    user.setPhone("111111"+i);
                    user.setAddress("运城"+i);
                    myUserList.add(user);

                }
                myMap.put(j,myUserList);

            }
            myList.add(myMap);

        }
        model.addAttribute("myList",myList);
        return "eachAll";

    }
```

```html
<div th:each="myListMap:${myList}">
    <div th:each="myListMapObj:${myListMap}">
        Map集合的key:<span th:text="${myListMapObj.key}"></span>
            <div th:each="myListMapObjList:${myListMapObj.value}">
                <span th:text="${myListMapObjList.id}"></span>
                <span th:text="${myListMapObjList.nick}"></span>
                <span th:text="${myListMapObjList.address}"></span>
                <span th:text="${myListMapObjList.phone}"></span>
            </div>
    </div>
```

### 条件判断

```html
<div th:if="${sex eq 1}">
    男
</div>
<div th:if="${sex eq 0}">
    女
</div>
<!-- th:unless 与if相反-->
<div th:unless="${sex ne 1}">
    女
</div>

<div th:switch="${productType}">
    <span th:case="0">产品0</span>
    <span th:case="1">产品1</span>
    <span th:case="*">无产品</span>
</div>
```

### 内敛表达式

```html
<h3>内敛文本</h3>
<div th:inline="text">
    数据：[[${data}]]
</div>

数据：[[${data}]]

<h3>内敛脚本</h3>
    <script type="text/javascript" th:inline="javascript">
        function showData() {
            alert("-------")
            alert([[${data}]])
        }
    </script>
<button th:onclick="showData()">展示数据</button>
```

### 字面量

```html
<h1>文本字面量，用单引号引起来的就是字面量''</h1>
<a th:href="@{'/user/detail?sex='+${sex}}">a</a>
<span th:text="Hello"></span>
<h3>数字字面量</h3>
今年是<span th:text="2020">1949</span>年
20年后是<h5 th:text="2020+20">1969</h5>年

<h3>boolean字面量</h3>
<div th:if="${flag}">
    执行成功
</div>
<div th:if="${!flag}">
    执行失败
</div>
<div th:unless="${!flag}">
    执行成功
</div>
<h3>null字面量</h3>
<span th:text="${user.id}"></span>
<span th:unless="${userDetail eq null}">对象已创建,地址不为空</span>
<div th:if="${userDetail.id eq null}">空</div>
```

### 字符串拼接

```html
<span th:text="'共'+${totalRows}+'条记录'+${totalPage}+'页,当前第'+${currentPage}+'页'+' 尾页'"></span>
<h3>使用更优雅的方式</h3>
<span th:text="|共${totalRows}条${totalPage}页,当前第${currentPage}页,首页,尾页|">共120条12页,当前第一页,首页,尾页</span>
```

### 运算符

```html
<h3>三元运算符</h3>
<div th:text="${sex eq 1 ? '男':'女'}"></div>
<div th:text="${sex == 1 ? '男':'女'}"></div>
20+2=<span th:text="20+2"></span>
5>2为<span th:if="5  gt 2">真</span>
5<2<span th:unless="5 lt 2">假</span>
1>=1<span th:if="1 ge 1">真</span>
1<=1<span th:if="1 le 1">真</span>
<span th:if="${sex eq 1}">男</span>
<span th:unless="${sex ne 1}">女</span>
```

### 表达式内置对象

```html
<h1>送session中获取值</h1>
<span th:text="${#session.getAttribute('data')}"></span><br>
<span th:text="${#httpSession.getAttribute('data')}"></span><br>
<span th:text="${session.data}"></span>
<span th:text="${username}"></span>

<script type="text/javascript" th:inline="javascript">
    var scheme = [[${#request.getScheme()}]];
    alert([[${#request.getScheme()}]])

    alert([[${#request.getServerName()}]])

    alert([[${#request.getServerPort()}]])

    alert([[${#request.getContextPath()}]])

    var requestURL = [[${#httpServletRequest.requestURL}]];
    var requestString = [[${#httpServletRequest.queryString}]];
    var  requestAddress = requestURL + "?" + requestString;
    alert(requestURL)
    alert(requestString)
    alert(requestAddress)
</script>

<div th:text="${time}"></div>
<div th:text="${#dates.format(time,'yyyy-MM-dd HH-mm-ss-SSS')}"></div>
<div th:text="${data}"></div>
<div th:text="${#strings.substring(data,3,5)}"></div>
```
