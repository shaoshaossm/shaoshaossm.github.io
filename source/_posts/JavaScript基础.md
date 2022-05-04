---
title: JavaScript基础
top: false
cover: false
toc: true
mathjax: false
date: 2022-04-24 14:24:17
password:
img: https://img-blog.csdnimg.cn/73b0a3b1ec8349e594f53f3495bcd81c.png
summary: 总结JavaScript的基础知识点------------------------------
tags: JavaScript
categories: 前端
---

[TOC]



### 基础

#### JS代码编写的三个位置：

> 编写到标签的指定属性中

```html
<button onclick="alert('hello');">我是按钮</button>  
<a href="javascript:alert('aaa');">超链接</a>
```

> 可以编写到script标签中

```html
<script type="text/javascript">  
//编写js代码  
</script>
<script>  
//编写js代码  
</script>
```

> 将代码编写到外部的js文件中，然后通过标签将其引入
>
> <font color="orange">script标签一旦用于引入外部文件了，就不能在编写代码了，即使编写了浏览器也会忽略 ,如果需要则可以在创建一个新的script标签用于编写内部代码</font>

```html
<script type="text/javascript" src="文件路径"></script>
```

#### 输出语句

> 浏览器弹窗

```js
alert("输出")
```

> 页面输入

```js
document.write("输出")
```

> 控制台输出

```js
console.log("输出")
```

#### 基本语法

#### 注释

```js
//单行注释
/*
 多行注释
 */
/*
 * 多行注释
 */
```

##### typeof运算符

> 用来检查一个变量的数据类型
> 语法：typeof 变量
> 它会返回一个用于描述类型的字符串作为结果

```js
var num = 3;
var str = '3'
console.log(typeof num) // number
console.log(typeof str) // string
```

##### 代码块

> 代码块中的代码要么都执行，要么都不执行
>
> <font color="orange">仅仅具有分组的作用</font>

```js
{
    ...
}
```

##### prompt()

> prompt()：弹出一个提示框，提示框中带有一个文本框

### 对象

> 常用创建对象的方式

```js
var obj = new Object()
obj.name="zs"
obj.age=18
console.log(obj.name)
console.log(obj.age)
// 判断 obj 里面是否有 "name"
console.log("name" in obj) // trues
// 遍历
var obj4 = {'0':'a','1':'b','2':'c'};

for(var i in obj4) {
    console.log(i,":",obj4[i]);
}
```

> 使用字面量创建对象
>
> 里面还可以再次创建对象：类似二维数组

```js
var obj2 = {}
var obj3 = {name:"ww",age:25,sex:true}
```

#### 函数

> 函数返回值也可以是一个函数
>
> 函数的参数也可以是一个函数

```js
function fun2(a,b,o) {
    console.log("函数2")
    console.log(a+b)
    console.log(o.name)
    var c = a+b;
    return c;
}
var objo = {
    name:"aa"
}

var result =  fun2(2,3,objo)
console.log(result)
```

##### 立即执行函数

> 立即执行函数往往只会执行一次
>
> > 给前一个函数加上分号，不然会报错

```js
(function (a, b) {
    console.log("a = " + a);
    console.log("b = " + b);
})(123, 456);
```

#### 方法

> 函数也可以作为对象的属性，即<font color="red">方法</font>

```js
var obj5 = new Object();
obj5.name = "ssm"
obj5.sayName = function () {
    console.log(obj5.name)
}
obj5.sayName()
```

#### 作用域

> 全局作用域：
>
> - 创建的变量都会作为window对象的属性保存
> - 创建的函数都会作为window对象的方法保存

> 使用var关键字声明的变量，会在所有代码执行之前被声明

```js
var d = 10
console.log(window.d)
```

> 函数作用域：
>
> - 调用函数时创建函数作用域，函数执行完毕后，函数作用域销毁
> - 每调用一次就会创建一个新的函数作用域，他们之间相互独立

```js
function fungobal() {
    var as  = 45;
    console.log(a)
}
fungobal()
```

> call()
> apply()
> **这两个方法都是函数对象的方法需要通过函数对象来调用**
> 通过两个方法可以直接调用函数，并且**可以通过第一个实参来指定函数中this**
> 不同的是call是直接传递函数的实参而apply需要将实参封装到一个数组中传递

#### this

> this的不同的情况：
>
> - 以函数的形式调用时，this是window
> - 以方法的形式调用时，this就是调用方法的对象
> - 以构造函数的形式调用时，this就是新创建的对象

#### arguments

> arguments和this类似，都是函数中的隐含的参数
> arguments是一个类数组元素，它用来封装函数执行过程中的实参
> 所以即使不定义形参，也可以通过arguments来使用实参
> **arguments中有一个属性callee表示当前执行的函数对象**

```js
var name = "全局this";
function funthis() {
    console.log(this.name)
};

var objthis1 = {
    name:"this1",
    sayName:funthis
};
var objthis2 = {
    name:"this2",
    sayName:funthis
};
funthis();
objthis1.sayName();
objthis2.sayName();
--------------------------
全局this
this1
this2
```

#### 构造函数

> - **一个构造函数我们也可以称为一个类**
>
> - 构造函数和普通函数的区别就是调用方式不同
>   - 如果直接调用，它就是一个普通函数
>   - 如果使用new来调用，则它就是一个构造函数

```js
function Person(name , age , gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayName = fungouzao;
}
function fungouzao() {
    alert(this.name)
}
var obbPerson = new Person("ssm",13,"男");
obbPerson.sayName()
```

#### 原型（prototype）

> 创建一个函数以后，**解析器都会默认在函数中添加一个数prototype**
>
> 当函数作为构造函数使用，**它所创建的对象中都会有一个隐含的属性执行该原型对象。**
>
> > 这个隐含的属性可以通过对象.__proto__来访问。
>
> `hasOwnProperty()`：这个方法可以用来检查**对象自身中**是否含有某个属性

```js

<script>
    // prototype
    function Person() {

    }
    function Dog() {

    }
    console.log(Person.prototype)
    Person.prototype.name = "我是原型中的名字"
    var mc= new Person();
    console.log(mc.name)
    console.log("name" in mc)
    console.log(mc.hasOwnProperty("name"))
    console.log(mc.__proto__.hasOwnProperty("hasOwnProperty"))
    console.log(mc.__proto__.__proto__.hasOwnProperty("hasOwnProperty"))
    console.log(mc.__proto__.__proto__.__proto__)
</script>
------------------
Object
我是原型中的名字
true
false
false
true
null
```

#### toString方法

```js
//修改Person原型的toString
Person.prototype.toString = function(){
    return "Person[name="+this.name+",age="+this.age+",gender="+this.gender+"]";
};
```

### 数组

```js
var array = new Array();
var arr2 = [1,2,3];
var array3 = new Array(1,2,3,4);
// 数组长度：10
var array4 = new Array(10);
array[0] = 10;
array[1] = 20;
array[2] = 30;
array[array.length] = 40
console.log(array[array.length-1])
console.log(array.length)
console.log(arr2.length)
console.log(array3.length)
console.log(array4.length)
```

#### 数组的方法

| functionName | function                                                     | usage                                   |
| :----------- | :----------------------------------------------------------- | :-------------------------------------- |
| push()       | 用来向数组的末尾添加一个或多个元素，并返回数组新的长度       | 语法：数组.push(元素1,元素2,元素N)pop() |
| pop()        | 用来删除数组的最后一个元素，并返回被删除的元素               |                                         |
| unshift()    | 向数组的开头添加一个或多个元素，并返回数组的新的长度         |                                         |
| shift()      | 删除数组的开头的一个元素，并返回被删除的元素                 |                                         |
| reverse()    | 可以用来反转一个数组，它会对原数组产生影响                   |                                         |
| concat()     | 可以连接两个或多个数组，它不会影响原数组，而是新数组作为返回值返回 |                                         |

#### 数组遍历

> - forEach()方法需要一个回调函数作为参数，
> - 数组中有几个元素，回调函数就会被调用几次，
> - 每次调用时，都会将遍历到的信息以实参的形式传递进来，
> - 我们可以定义形参来获取这些信息。
>   - `value`:正在遍历的元素
>   - `index`:正在遍历元素的索引
>   - `obj`:被遍历对象

```js
数组.forEach(function(value , index , obj){  
  
});
```

```js
for(var i=0 ; i<数组.length ; i++){  
    //数组[i]  
}
```

### 常用类和方法

#### Date

```js
var d = new Date();
var d = new Date("月/日/年 时:分:秒");
```

| name              | 解释                                                         |
| :---------------- | :----------------------------------------------------------- |
| getDate()         | 当前日期对象是几日（1-31）                                   |
| getDay()          | 返回当前日期对象时周几（0-6） 0 周日 1 周一 。。。           |
| getMonth()        | 返回当前日期对象的月份（0-11） 0 一月 1 二月 。。。          |
| getFullYear()     | 从 Date 对象以四位数字返回年份。                             |
| getHours()        | 返回 Date 对象的小时 (0 ~ 23)。                              |
| getMinutes()      | 返回 Date 对象的分钟 (0 ~ 59)。                              |
| getSeconds()      | 返回 Date 对象的秒数 (0 ~ 59)。                              |
| getMilliseconds() | 返回 Date 对象的毫秒(0 ~ 999)。                              |
| getTime()         | 返回当前日期对象的时间戳 时间戳，指的是从1970年月1日 0时0分0秒，**到现在时间的毫秒数** 计算机底层保存时间都是以时间戳的形式保存的。 |
| Date.now()        | 可以获取当前代码执行时的时间戳                               |
| setHours()        | 设置 Date 对象中的小时 (0 ~ 23)                              |

#### Math

```js
// 1-6之间的随机数
for (var i = 0; i < 10; i++) {
    console.log(Math.random()*5.+1)
}
```

| 方法                   | 解释                               |
| ---------------------- | ---------------------------------- |
| Math.PI                | 常量，圆周率                       |
| Math.abs()             | 绝对值运算                         |
| Math.ceil()            | 向上取整                           |
| Math.floor()           | 向下取整                           |
| Math.round()           | 四舍五入取整                       |
| Math.random()          | 生成一个01之间的随机数             |
| 生成一个xy之间的随机数 | Math.round(Math.random()*(y-x)+x); |
| Math.pow(x,y)          | 求x的y次幂                         |
| Math.max()             | 求多个数中最大值                   |
| Math.min()             | 求多个数中的最小值                 |
| Math.sqrt()            | 对一个数进行开方                   |

### DOM

- 页面加载

```js
window.onload = function () {
}
```

- `getElementById()`：返回带有指定ID 的元素。

```js
<button id="btn1" name="anniu">按钮</button>
var btn =  document.getElementById("btn1");
// 获取btn下的bs元素
var btnlist =  btn.getElementById("bs");
```

- `getElementsByTagName()`：返回包含带有指定**标签名称**的所有元素的节点列表(集合/节点数组)。

```js
<button class="btn3">按钮</button>
var btns = document.getElementsByTagName("button");
// 取出第1个Tag
var btns = document.getElementsByTagName("button")[0];
```

- `getElementsByClassName()`：返回包含带有指定类名的所有元素的节点列表。

```js
<button class="btn3">按钮</button>
var btn2 = document.getElementsByClassName("btn2");
```

- `getElementsByName('gender')`：通过name属性获取一组元素节点对象

```js
<input type="radio" name="gender" value="male" />male
<input type="radio" name="gender" value="female" />female
var btn3 = document.getElementsByName("gender");
```

> **html代码**
>
> ```html
> <input type="radio" name="gender" value="male" />male
> <input type="radio" name="gender" value="female" />female
> <ul id="city">
>  <li id = "shanxi">山西</li><li id="zhejiang">浙江 </li>
> </ul>
> ```

- `childNodes`获取当前元素的**所有子节点**

> <font color="orange">会获取到空白的文本子节点</font>,<font color="red">推荐使用下面方式</font>

```js
var city = document.getElementById("city");
var childNodes = city.childNodes;
console.log(parentNode.innerHTML)
```

- `children`获取当前元素的**所有子元素**

    ```js
    var city = document.getElementById("city");
    var childrens = city.children;
    console.log(childrens.length)
    ```

> <font color="red">推荐使用这种方式</font>

- `firstChild`获取当前元素的**第一个子节点**，会获取到空白的文本子节点

```js
var firstChild = city.firstChild;
```

- `lastChild`获取当前元素的**最后一个子节点**

```js
var lastChild = city.lastChild;
```

- `parentNode`：获取当前元素的父元素

```js
var shanxi = document.getElementById("shanxi");
var parentNode = shanxi.parentNode;
console.log(parentNode)
```

- `previousSibling`：获取当前元素的前一个兄弟节点 <font color ="green">能获取到空白的文本</font>

```js
var shanxi = document.getElementById("shanxi");
var zhejiang = document.getElementById("zhejiang");
var previousSibling = zhejiang.previousSibling;
console.log(previousSibling)
```

- `previousElementSibling`：获取前一个兄弟元素，IE8及以下不支持

```js
var shanxi = document.getElementById("shanxi");
var zhejiang = document.getElementById("zhejiang");
var previousElementSibling = zhejiang.previousElementSibling;
console.log(previousElementSibling)
```

- `document.body`：获取页面中的body元素

```js
var elementsByTagName = document.body;
console.log(elementsByTagName)
```

- `document.documentElement`：获取页面中html根元素

```js
var documentElement = document.documentElement;
console.log(documentElement)
```

- `document.all`：获取页面中的所有元素，相当于document.getElementsByTagName(“*”);

```js
var all = document.all;
for (var i = 0; i < all.length; i++) {
    console.log(all[i])
}
```

- `document.querySelector('#a') `通过CSS选择器来获取一个元素节点对象，如果匹配到的元素有多个，则它会返回查询到的第一个元素

```js
<div class="box1">
    <div>box1中的div</div>
</div>
var element = document.querySelector(".box1 div");
console.log(element.innerHTML) // box1中的div
```

- `document.querySelectorAll()`：根据CSS选择器去页面中查询一组元素，会将匹配到所有元素封装到一个数组中返回，即使只匹配到一个

```js
<div class="box1">
    <div>box1中的div</div>
</div>
<div class="box1">
    <div>box1中的div</div>
</div>
var elementNodeListOf = document.querySelectorAll(".box1");
console.log(elementNodeListOf.length) // 2
```

- `innerHTML`：获取元素内容
- `innerText`：获取元素内部文本内容

```js
var shanxi = document.getElementById("shanxi");
var parentNode = shanxi.parentNode;
// 获取元素内容
console.log(parentNode.innerHTML)
// 获取元素内部文本内容
console.log(parentNode.innerText)
```

- `createElement()`：创建元素节点。
- `createTextNode() `  ：创建文本节点。
- `appendChild()`：把新的子节点添加到指定节点。
- `removeChild()`：删除子节点。
- `replaceChild()`：替换子节点。
- `insertBefore()`：在指定的子节点前面插入新的子节点。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dom</title>
</head>
<body>
<ul id="city">
    <li id="shanxi">山西</li>
    <li id="zhejiang">浙江</li>
</ul>
<button id="btn">按钮</button>
    <script>
        window.onload = function () {

            var btn = document.getElementById("btn");
            var shanxi = document.getElementById("shanxi");
            btn.onclick=function () {
                var city = document.getElementById("city");
                var li = document.createElement('li');
                var text = document.createTextNode("北京");
                li.appendChild(text)
                // 把新的子节点添加到指定节点。
                // city.appendChild(li)
                // 在指定的子节点前面插入新的子节点。
                city.insertBefore(li,shanxi)
                city.replaceChild(li,shanxi)
                city.removeChild(li)
                // innerHTML也可以增删改查节点
                city.innerHTML +="<li>广州</li>"
                // 两种方式结合使用
                var htmlliElement = document.createElement("li");
                htmlliElement.innerHTML = "深圳"
                city.appendChild(htmlliElement)
                
            }
        }
    </script>
</body>
</html>
```

> - `createAttribute() `：  创建属性节点。
> - `getAttribute()`  ：返回指定的属性值。
> - ` setAttribute()`：把指定属性设置或修改为指定的值。

> #### 操作内联样式

```html

<div id="box2"></div>
<button id="btn2">点击我</button>

<style>
    #box2{
        width: 200px;
        height: 200px;
        background: red;
    }

</style>
```

```js
window.onload = function () {
// 操作内联样式
var btn2 = document.getElementById("btn2");
var box2 = document.getElementById("box2");
btn2.onclick = function () {
    // 语法：元素.style.样式名=样式值
    box2.style.width="300px";
    box2.style.height="300px";
    box2.style.backgroundColor="orange";
    // 仅IE浏览器支持
    // console.log(box2.currentStyle.backgroundColor)
     // 在其他浏览器中可以使用
    var computedStyle = getComputedStyle(box2,null);
    console.log(computedStyle.backgroundColor)
	}
}
```

> #### 其他样式相关的属性

| 属性                                   | 解释                                                         |
| :------------------------------------- | :----------------------------------------------------------- |
| clientHeight                           | 元素的可见高度，包括元素的内容区和内边距的高度               |
| clientWidth                            | 元素的可见宽度，包括元素的内容区和内边距的宽度               |
| offsetHeight                           | 整个元素的高度，包括内容区、内边距、边框                     |
| offfsetWidth                           | 整个元素的宽度，包括内容区、内边距、边框                     |
| offsetParent                           | 当前元素的定位父元素，离他最近的开启了定位的祖先元素，如果所有的元素都没有开启定位，则返回body |
| offsetLeft<br />offsetTop              | 当前元素和定位父元素之间的偏移量<br />`offsetLeft`水平偏移量 `offsetTop`垂直偏移量 |
| scrollHeight<br />scrollWidth          | 获取元素滚动区域的高度和宽度                                 |
| scrollTop<br/>scrollLeft               | 获取元素垂直和水平滚动条滚动的距离                           |
| scrollWidth -scrollLeft = clientWidth  | 水平滚动                                                     |
| scrollHeight -scrollTop = clientHeight | 判断滚动条是否滚动到底<br/>垂直滚动条                        |

**元素的属性**

> 读取元素的属性：
>
> > 语法：元素.属性名
> > ele.name
> > ele.id
> > ele.value
> > ele.className
>
> 修改元素的属性：
>
> > 语法：元素.属性名 = 属性值
> >
> > innerHTML
> > 使用该属性可以获取或设置元素内部的HTML代码

### 事件

> 可以在响应函数中定义一个形参，来使用事件对象，但是在IE8以下浏览器中事件对象没有做完实参传递，而是作为window对象的属性保存

```js
元素.事件 = function(event){  
    event = event || window.event;  
};  
  
元素.事件 = function(e){  
	e = e || event;  
	  
};
```

> `clientX`和`clientY`用于获取鼠标在当前的可见窗口的坐标div的偏移量，是相对于整个页面的

**案例**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>事件</title>
</head>
<body>
<div id="areaDiv"></div>
<div id="showMsg"></div>
    <script>
        window.onload = function () {
            var areaDiv = document.getElementById("areaDiv");
            var showMsg = document.getElementById("showMsg");
            areaDiv.onmousemove = function (event) {
                var x = event.clientX
                var y = event.clientY
                showMsg.innerHTML = "X = "+x+",Y = "+y
            }
        }
    </script>
</body>
<style>
    div{
        width: 200px;
        height: 200px;
        border: solid 1px ;
    }
</style>
</html>
```

![鼠标移入显示坐标](https://img-blog.csdnimg.cn/935a0e30e5f648fe8e4957f151eeeba2.png)

> **事件的冒泡**指的是事件向上传导，当后代元素上的事件被触发时，将会<font color="orange">导致其祖先元素上的同类事件也会触发</font>。
> 事件的冒泡大部分情况下都是有益的，如果需要取消冒泡，则<font color="orange">需要使用事件对象来取消</font>

```js
元素.事件 = function(event){  
    event = event || window.event;  
    event.cancelBubble = true;  
};
```

> **事件的委派**：指将事件统一绑定给元素的<font color="orange">共同的祖先元素</font>，这样<font color="orange">当后代元素上的事件触发时，会一直冒泡到祖先元素，从而通过祖先元素的响应函数来处理事件</font>。
>
> 事件委派是利用了冒泡，通过委派可以减少事件绑定的次数，提高程序的性能
>
> 我们希望，只绑定一次事件，即可应用到多个的元素上，即使元素是后添加的我们可以尝试将其绑定给元素的共同的祖先元素
>
> **target** : event中的target表示的触发事件的对象

> **事件的绑定**：addEventListener()通过这个方法也可以为元素绑定响应函数
>
> - 参数：
>   - 事件的字符串，不要on
>   - 回调函数，当事件触发时该函数会被调用
>   - 是否在捕获阶段触发事件，需要一个布尔值，一般都传false
>
> > 使用addEventListener()可以同时为一个元素的相同事件同时绑定多个响应函数，这样当事件被触发时，响应函数将会按照函数的绑定顺序执行
>
> 这个方法不支持IE8及以下的浏览器

```js
btn.addEventListener("click", function () {
    console.log(1)
},false);
btn.addEventListener("click", function () {
    console.log(2)
},false);
```

> 在IE8中可以使用attachEvent()来绑定事件
>
> - 参数：
>   - 事件的字符串，要on
>   - 回调函数
>
> > 这个方法也可以同时为一个事件绑定多个处理函数，不同的是它是后绑定先执行，执行顺序和addEventListener()相反



> **事件的传播**
>
> - 捕获阶段
>   - 在捕获阶段时从最外层的祖先元素，向目标元素进行事件的捕获，但是默认此时不会触发事件
> - 目标阶段
>   - 事件捕获到目标元素，捕获结束开始在目标元素上触发事件
> - 冒泡阶段
>   - 事件从目标元素向他的祖先元素传递，依次触发祖先元素上的事件
>
> - 如果希望在捕获阶段就触发事件，可以将addEventListener()的第三个参数设置为true一般情况下我们不会希望在捕获阶段触发事件，所以这个参数一般都是false

- 鼠标单击事件

```js
btn.onclick = function () {
	...
}
```

- 鼠标按下事件

```js
btn.onmousedown = function () {
	...
}

```

- 鼠标移动事件

```js
btn.onmousemove = function () {
	...
}
```

- 鼠标松开事件

```js
btn.onmouseup = function () {
	...
}
```

- 鼠标滚轮事件

```js
btn.onmouseup = function () {
	...
}
```

**案例**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">

        #box1{
            width: 100px;
            height: 100px;
            background-color: red;
        }

    </style>
    <script type="text/javascript">

        window.onload = function(){


            //获取id为box1的div
            var box1 = document.getElementById("box1");

            //为box1绑定一个鼠标滚轮滚动的事件
            /*
                         * onmousewheel鼠标滚轮滚动的事件，会在滚轮滚动时触发，
                         *     但是火狐不支持该属性
                         *
                         * 在火狐中需要使用 DOMMouseScroll 来绑定滚动事件
                         *     注意该事件需要通过addEventListener()函数来绑定
                         */


            box1.onmousewheel = function(event){
                console.log('aa')
                event = event || window.event;


                //event.wheelDelta 可以获取鼠标滚轮滚动的方向
                //向上滚 120   向下滚 -120
                //wheelDelta这个值我们不看大小，只看正负

                //alert(event.wheelDelta);

                //wheelDelta这个属性火狐中不支持
                //在火狐中使用event.detail来获取滚动的方向
                //向上滚 -3  向下滚 3
                //alert(event.detail);


                /*
                             * 当鼠标滚轮向下滚动时，box1变长
                             *     当滚轮向上滚动时，box1变短
                             */
                //判断鼠标滚轮滚动的方向
                if(event.wheelDelta > 0 || event.detail < 0){
                    //向上滚，box1变短
                    box1.style.height = box1.clientHeight - 10 + "px";

                }else{
                    //向下滚，box1变长
                    box1.style.height = box1.clientHeight + 10 + "px";
                }

                /*
                             * 使用addEventListener()方法绑定响应函数，取消默认行为时不能使用return false
                             * 需要使用event来取消默认行为event.preventDefault();
                             * 但是IE8不支持event.preventDefault();这个玩意，如果直接调用会报错
                             */
                event.preventDefault && event.preventDefault();


                /*
                             * 当滚轮滚动时，如果浏览器有滚动条，滚动条会随之滚动，
                             * 这是浏览器的默认行为，如果不希望发生，则可以取消默认行为
                             */
                return false;




            };

            //为火狐绑定滚轮事件
            bind(box1,"DOMMouseScroll",box1.onmousewheel);


        };


        function bind(obj , eventStr , callback){
            if(obj.addEventListener){
                //大部分浏览器兼容的方式
                obj.addEventListener(eventStr , callback , false);
            }else{
                /*
                             * this是谁由调用方式决定
                             * callback.call(obj)
                             */
                //IE8及以下
                obj.attachEvent("on"+eventStr , function(){
                    //在匿名函数中调用回调函数
                    callback.call(obj);
                });
            }
        }

    </script>
</head>
<body style="height: 2000px;">

<div id="box1"></div>

</body>
</html>
```

- `confirm`：弹出一个确认和取消的提示框

```js
alert(confirm("确认删除吗"))
```

#### 键盘事件

```js
document.onkeydown = function (event) {
    event = event || window.event;
    if (event.keyCode === 89 && event.ctrlKey){
        console.log('Y is press')
    }

}
document.onkeyup = function () {
    console.log('up')
}
```

### BOM

| 属性      | 解释                                                         |
| --------- | ------------------------------------------------------------ |
| Window    | 代表的是整个浏览器的窗口，同时window也是网页中的全局对象     |
| Navigator | 代表的当前浏览器的信息，通过该对象可以来识别不同的浏览器     |
| Location  | 代表当前浏览器的地址栏信息，通过Location可以获取地址栏信息，或者操作浏览器跳转页面 |
| History   | 代表浏览器的历史记录，可以通过该对象来操作浏览器的历史记录，由于隐私原因，该对象不能获取到具体的历史记录，只能操作浏览器向前或向后翻页，而且该操作只在当次访问时有效 |
| Screen    | 代表用户的屏幕的信息，通过该对象可以获取到用户的显示器的相关的信息 |

> 这些BOM对象在浏览器中都是作为window对象的属性保存的，可以通过window对象来使用，也可以直接使用

**Navigator**

```js
<script>
    console.log(navigator.appCodeName);
    console.log(navigator.userAgent);
    console.log(location);
    console.log(history);
    if (/firefox/i.test(navigator.userAgent)){
        console.log('火狐')
    } else if (/chrome/i.test(navigator.userAgent)){
        console.log('谷歌')
    }
</script>
```

> 一般我们只会使用userAgent来判断浏览器的信息

**History**

>  对象可以用来操作浏览器向前或向后翻页

| 属性      | 解释                                                         |
| --------- | ------------------------------------------------------------ |
| length    | 可以获取到当成访问的链接数量                                 |
| back()    | 可以用来回退到上一个页面，作用和浏览器的回退按钮一样         |
| forward() | 可以跳转下一个页面，作用和浏览器的前进按钮一样               |
| go()      | 可以用来跳转到指定的页面<br>它需要一个整数作为参数<br/>1.表示向前跳转一个页面 相当于forward()<br/>2:表示向前跳转两个页面<br/>-1:表示向后跳转一个页面<br/>-2:表示向后跳转两个页面 |

**Location**

> 该对象中封装了浏览器的地址栏的信息如果直接打印`location`，则可以获取到地址栏的信息（当前页面的完整路径）
> `alert(location);`
>
> `location = "http:[www.baidu.com"](http://www.baidu.com"/);`
> `location = "01.BOM.html";`

| 属性      | 解释                                                         |
| --------- | ------------------------------------------------------------ |
| assign()  | 用来跳转到其他的页面，作用和直接修改location一样             |
| reload()  | 用于重新加载当前页面，作用和刷新按钮一样,如果在方法中传递一个true，作为参数，则会强制清空缓存刷新页面 |
| replace() | 可以使用一个新的页面替换当前页面，调用完毕也会跳转页面不会生成历史记录，不能使用回退按钮回退 |

**定时器**

```html
<script>
window.onload = function () {
    var box = document.getElementById("box");
    var num = 1;
    // 定时器
    var timer = setInterval(function () {
        box.innerHTML = num++;
        if (num == 11) {
            // 关闭定时器
            clearInterval(timer)
        }
    }, 1000)
}
</script>
<div id="box"></div>
```

**延时调用**

> 延时调用一个函数不马上执行，而是隔一段时间以后在执行，而且只会执行一次

```js
window.onload = function () {
    var timer = setTimeout(function () {
        console.log(num++)
    },3000)
    // 关闭延时调用
    clearTimeout(timer)
}
```





> 延时调用和定时调用的区别，定时调用会执行多次，而延时调用只会执行一次





