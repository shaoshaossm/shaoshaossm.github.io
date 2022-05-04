---
title: Python基础
top: false
cover: false
toc: true
mathjax: true
date: 2021-11-02 11:46:15
password:
img: https://img-blog.csdnimg.cn/c3cf15ea0c2b4f758b5c2d10ae8e54a9.png
summary: 重新回顾之前学习一半的Python,将Python作为自己的第二语言.
tags: Python
categories: 后端
---

### Python基础

```python
# 向控制台输出内容结束后,不换行
print("*",end="")
# 自带换行
print("")
%d 以十进制输出数字
%x 以十六进制输出数字 
```


#### 列表

* `List`（列表） 用 `[]` 定义，**数据** 之间使用 `,` 分隔 也叫作数组**数组**

```python
name_list = ["zhangsan", "lisi", "wangwu"]
# API
In [1]: name_list.
name_list.append   name_list.count    name_list.insert   name_list.reverse
name_list.clear    name_list.extend   name_list.pop      name_list.sort
name_list.copy     name_list.index    name_list.remove 
```

| 序号 | 分类 | 关键字 / 函数 / 方法 | 说明 |
| --- | --- | --- | --- |
| 1 | 增加 | 列表.insert(索引, 数据) | 在指定位置插入数据 |
|  |  | 列表.append(数据) | 在末尾追加数据
|  |  | 列表.extend(列表2) | 将列表2 的数据追加到列表 | 
| 2 | 修改 | 列表[索引] = 数据 | 修改指定索引的数据 |
| 3 | 删除 | del 列表[索引] | 删除指定索引的数据 |
|  |  | 列表.remove[数据] | 删除第一个出现的指定数据 |
|  |  | 列表.pop | 删除末尾数据 |
|  |  | 列表.pop(索引) | 删除指定索引数据 |
|  |  | 列表.clear | 清空列表 |
| 4 | 统计 | len(列表) | 列表长度 |
|  |  | 列表.count(数据) | 数据在列表中出现的次数 |
| 5 | 排序 | 列表.sort() | 升序排序 |
|  |  | 列表.sort(reverse=True) | 降序排序 |
|  |  | 列表.reverse() | 逆序、反转 |

#### 元组

- `Tuple`（元组）与列表类似，不同之处在于元组的 **元素不能修改**

```python
info_tuple = ("zhangsan", 18, 1.75)
info_tuple = ()
# 元组中 只包含一个元素时，需要在元素后面添加逗号
info_tuple = (50, )  # 不加,类型为int
# API
info.count  info.index
```

#### 元组和列表之间的转换

* 使用 `list` 函数可以把元组转换成列表

```python
list(元组) 
```

* 使用 `tuple` 函数可以把列表转换成元组

```python
tuple(列表)
```

* 使用`len`函数可以计算元组、列表等长度

```python
len(列表)
```

#### 字典

- `dictionary`（字典） 是 **除列表以外** `Python` 之中 **最灵活** 的数据类型
- 和列表的区别
  * **列表** 是 **有序** 的对象集合
  * **字典** 是 **无序** 的对象集合
- 字典使用 **键值对** 存储数据，键值对之间使用 `,` 分隔
  * **键** `key` 是索引
  * **值** `value` 是数据
  * **键** 和 **值** 之间使用 `:` 分隔
  * **键必须是唯一的**
  * **值** 可以取任何数据类型，但 **键** 只能使用 **字符串**、**数字**或 **元组**

```python
# API
In [1]: xiaoming.
xiaoming.clear       xiaoming.items       xiaoming.setdefault
xiaoming.copy        xiaoming.keys        xiaoming.update
xiaoming.fromkeys    xiaoming.pop         xiaoming.values
xiaoming.get         xiaoming.popitem    
# 字典的遍历
for k in xiaoming:
    print("%s - %s" % (k, xiaoming[k]))
```

- 字典与列表组合使用

```python
card = [{"name": "小胡",
         "age": 18},
        {"name": "小张",
         "age": 19}]
for ren in card:
    print(ren)
```



### 字符串

* 在 Python 中可以使用 **一对双引号** `"` 或者 **一对单引号** `'` 定义一个字符串
    * 虽然可以使用 `\"` 或者 `\'` 做字符串的转义，但是在实际开发中：
        * 如果字符串内部需要使用 `"`，可以使用 `'` 定义字符串
        * 如果字符串内部需要使用 `'`，可以使用 `"` 定义字符串

#### 1) 判断类型 - 9

| 方法               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| string.isspace()   | 如果 string 中只包含空格，则返回 True                        |
| string.isalnum()   | 如果 string 至少有一个字符并且所有字符都是字母或数字则返回 True |
| string.isalpha()   | 如果 string 至少有一个字符并且所有字符都是字母则返回 True    |
| string.isdecimal() | 如果 string 只包含数字则返回 True，`全角数字`                |
| string.isdigit()   | 如果 string 只包含数字则返回 True，`全角数字`、`⑴`、`\u00b2` |
| string.isnumeric() | 如果 string 只包含数字则返回 True，`全角数字`，`汉字数字`    |
| string.istitle()   | 如果 string 是标题化的(每个单词的首字母大写)则返回 True      |
| string.islower()   | 如果 string 中包含至少一个区分大小写的字符，并且所有这些(区分大小写的)字符都是小写，则返回 True |
| string.isupper()   | 如果 string 中包含至少一个区分大小写的字符，并且所有这些(区分大小写的)字符都是大写，则返回 True |

#### 2) 查找和替换 - 7

| 方法                                                    | 说明                                                         |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| string.startswith(str)                                  | 检查字符串是否是以 str 开头，是则返回 True                   |
| string.endswith(str)                                    | 检查字符串是否是以 str 结束，是则返回 True                   |
| string.find(str, start=0, end=len(string))              | 检测 str 是否包含在 string 中，如果 start 和 end 指定范围，则检查是否包含在指定范围内，如果是返回开始的索引值，否则返回 `-1` |
| string.rfind(str, start=0, end=len(string))             | 类似于 find()，不过是从右边开始查找                          |
| string.index(str, start=0, end=len(string))             | 跟 find() 方法类似，不过如果 str 不在 string 会报错          |
| string.rindex(str, start=0, end=len(string))            | 类似于 index()，不过是从右边开始                             |
| string.replace(old_str, new_str, num=string.count(old)) | 把 string 中的 old_str 替换成 new_str，如果 num 指定，则替换不超过 num 次 |

#### 3) 大小写转换 - 5

| 方法                | 说明                             |
| ------------------- | -------------------------------- |
| string.capitalize() | 把字符串的第一个字符大写         |
| string.title()      | 把字符串的每个单词首字母大写     |
| string.lower()      | 转换 string 中所有大写字符为小写 |
| string.upper()      | 转换 string 中的小写字母为大写   |
| string.swapcase()   | 翻转 string 中的大小写           |

#### 4) 文本对齐 - 3

| 方法                 | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| string.ljust(width)  | 返回一个原字符串左对齐，并使用空格填充至长度 width 的新字符串 |
| string.rjust(width)  | 返回一个原字符串右对齐，并使用空格填充至长度 width 的新字符串 |
| string.center(width) | 返回一个原字符串居中，并使用空格填充至长度 width 的新字符串  |

#### 5) 去除空白字符 - 3

| 方法            | 说明                               |
| --------------- | ---------------------------------- |
| string.lstrip() | 截掉 string 左边（开始）的空白字符 |
| string.rstrip() | 截掉 string 右边（末尾）的空白字符 |
| string.strip()  | 截掉 string 左右两边的空白字符     |

#### 6) 拆分和连接 - 5

| 方法                      | 说明                                                         |
| ------------------------- | ------------------------------------------------------------ |
| string.partition(str)     | 把字符串 string 分成一个 3 元素的元组 (str前面, str, str后面) |
| string.rpartition(str)    | 类似于 partition() 方法，不过是从右边开始查找                |
| string.split(str="", num) | 以 str 为分隔符拆分 string，如果 num 有指定值，则仅分隔 num + 1 个子字符串，str 默认包含 '\r', '\t', '\n' 和空格 |
| string.splitlines()       | 按照行('\r', '\n', '\r\n')分隔，返回一个包含各行作为元素的列表 |
| string.join(seq)          | 以 string 作为分隔符，将 seq 中所有的元素（的字符串表示）合并为一个新的字符串 |

### 字符串的切片

* **切片** 方法适用于 **字符串**、**列表**、**元组**
    * **切片** 使用 **索引值** 来限定范围，从一个大的 **字符串** 中 **切出** 小的 **字符串**
    * **列表** 和 **元组** 都是 **有序** 的集合，都能够 **通过索引值** 获取到对应的数据
    * **字典** 是一个 **无序** 的集合，是使用 **键值对** 保存数据
    * 字符串[开始索引:结束索引:步长]

![字符串索引](https://img-blog.csdnimg.cn/00cdef8c52504340befc0849cbed95df.png)

**注意**：

1. 指定的区间属于 **左闭右开** 型 `[开始索引,  结束索引)` => `开始索引 >= 范围 < 结束索引`
   * 从 `起始` 位开始，到 **`结束`位的前一位** 结束（**不包含结束位本身**)
2. 从头开始，**开始索引** **数字可以省略，冒号不能省略**
3. 到末尾结束，**结束索引** **数字可以省略，冒号不能省略**
4. 步长默认为 `1`，如果连续切片，**数字和冒号都可以省略**

#### 索引的顺序和倒序

* 在 Python 中不仅支持 **顺序索引**，同时还支持 **倒序索引**
* 所谓倒序索引就是 **从右向左** 计算索引
    * 最右边的索引值是 **-1**，依次递减

```python
num_str = "0123456789"

# 1. 截取从 2 ~ 5 位置 的字符串
print(num_str[2:6])

# 2. 截取从 2 ~ `末尾` 的字符串
print(num_str[2:])

# 3. 截取从 `开始` ~ 5 位置 的字符串
print(num_str[:6])

# 4. 截取完整的字符串
print(num_str[:])

# 5. 从开始位置，每隔一个字符截取字符串
print(num_str[::2])

# 6. 从索引 1 开始，每隔一个取一个
print(num_str[1::2])

# 倒序切片
# -1 表示倒数第一个字符
print(num_str[-1])

# 7. 截取从 2 ~ `末尾 - 1` 的字符串
print(num_str[2:-1])

# 8. 截取字符串末尾两个字符
print(num_str[-2:])

# 9. 字符串的逆序（面试题）
print(num_str[::-1])
print(num_str[-1::-1])

```



### 公共方法

Python 包含了以下内置函数：

| 函数              | 描述                              | 备注                        |
| ----------------- | --------------------------------- | --------------------------- |
| len(item)         | 计算容器中元素个数                |                             |
| del(item)         | 删除变量                          | del 有两种方式              |
| max(item)         | 返回容器中元素最大值              | 如果是字典，只针对 key 比较 |
| min(item)         | 返回容器中元素最小值              | 如果是字典，只针对 key 比较 |
| cmp(item1, item2) | 比较两个值，-1 小于/0 相等/1 大于 | Python 3.x 取消了 cmp 函数  |
| id(item)          | 变量中保存数据所在的 **内存地址** |                             |
| hash(item)        | 经hash算法后返回一个整数          | 接收一个不可变类型作为参数  |
| global(item)      | 在函数中修改全局变量              |                             |

**注意**

* **字符串** 比较符合以下规则： "0" < "A" < "a"
* 如果变量已经被定义，当给一个变量赋值的时候，本质上是 **修改了数据的引用**

  * 变量 **不再** 对之前的数据引用
  * 变量 **改为** 对新赋值的数据引用

###  切片

| 描述 | Python 表达式      | 结果    | 支持的数据类型     |
| :--: | ------------------ | ------- | ------------------ |
| 切片 | "0123456789"[::-2] | "97531" | 字符串、列表、元组 |

* **切片** 使用 **索引值** 来限定范围，从一个大的 **字符串** 中 **切出** 小的 **字符串**
* **列表** 和 **元组** 都是 **有序** 的集合，都能够 **通过索引值** 获取到对应的数据
* **字典** 是一个 **无序** 的集合，是使用 **键值对** 保存数据

### 运算符

|    运算符    | Python 表达式         | 结果                         | 描述           | 支持的数据类型           |
| :----------: | --------------------- | ---------------------------- | -------------- | ------------------------ |
|      +       | [1, 2] + [3, 4]       | [1, 2, 3, 4]                 | 合并           | 字符串、列表、元组       |
|      *       | ["Hi!"] * 4           | ['Hi!', 'Hi!', 'Hi!', 'Hi!'] | 重复           | 字符串、列表、元组       |
|      in      | 3 in (1, 2, 3)        | True                         | 元素是否存在   | 字符串、列表、元组、字典 |
|    not in    | 4 not in (1, 2, 3)    | True                         | 元素是否不存在 | 字符串、列表、元组、字典 |
| > >= == < <= | (1, 2, 3) < (2, 2, 3) | True                         | 元素比较       | 字符串、列表、元组       |

**注意**

* `in` 在对 **字典** 操作时，判断的是 **字典的键**
* `in` 和 `not in` 被称为 **成员运算符**

#### 成员运算符

成员运算符用于 **测试** 序列中是否包含指定的 **成员**

| 运算符 | 描述                                                  | 实例                              |
| ------ | ----------------------------------------------------- | --------------------------------- |
| in     | 如果在指定的序列中找到值返回 True，否则返回 False     | `3 in (1, 2, 3)` 返回 `True`      |
| not in | 如果在指定的序列中没有找到值返回 True，否则返回 False | `3 not in (1, 2, 3)` 返回 `False` |

注意：在对 **字典** 操作时，判断的是 **字典的键**

### 完整的 for 循环语法

* 在 `Python` 中完整的 `for 循环` 的语法如下：

```python
for 变量 in 集合:
    
    循环体代码
else:
    没有通过 break 退出循环，循环结束后，会执行的代码
```

#### 应用场景

* 在 **迭代遍历** 嵌套的数据类型时，例如 **一个列表包含了多个字典**
* 需求：要判断 某一个字典中 是否存在 指定的 值 
    * 如果 **存在**，提示并且退出循环
    * 如果 **不存在**，在 **循环整体结束** 后，希望 **得到一个统一的提示**

```python
students = [
    {"name": "阿土",
     "age": 20,
     "gender": True,
     "height": 1.7,
     "weight": 75.0},
    {"name": "小美",
     "age": 19,
     "gender": False,
     "height": 1.6,
     "weight": 45.0},
]

find_name = "阿土"

for stu_dict in students:

    print(stu_dict)

    # 判断当前遍历的字典中姓名是否为find_name
    if stu_dict["name"] == find_name:
        print("找到了")

        # 如果已经找到，直接退出循环，就不需要再对后续的数据进行比较
        break

else:
    print("没有找到")

print("循环结束")

```

### 多值参数（知道）

* 有时可能需要 **一个函数** 能够处理的参数 **个数** 是不确定的，这个时候，就可以使用 **多值参数**
* `python` 中有 **两种** 多值参数：
  * 参数名前增加 **一个** `*` 可以接收 **元组**
  * 参数名前增加 **两个** `*` 可以接收 **字典**
* 一般在给多值参数命名时，**习惯**使用以下两个名字
  * `*args` —— 存放 **元组** 参数，前面有一个 `*`
  * `**kwargs` —— 存放 **字典** 参数，前面有两个 `*`

```python
def demo(num, *args, **kwargs):

    print(num)
    print(args)
    print(kwargs)

demo(1, 2, 3, 4, 5, name="小明", age=18, gender=True)
```

#### 元组和字典的拆包（知道）

* 在调用带有多值参数的函数时，如果希望：
  * 将一个 **元组变量**，直接传递给 `args`
  * 将一个 **字典变量**，直接传递给 `kwargs`
* 就可以使用 **拆包**，简化参数的传递，**拆包** 的方式是：
  * 在 **元组变量前**，增加 **一个** `*`
  * 在 **字典变量前**，增加 **两个** `*`

```python
def demo(*args, **kwargs):

    print(args)
    print(kwargs)


# 需要将一个元组变量/字典变量传递给函数对应的参数
gl_nums = (1, 2, 3)
gl_xiaoming = {"name": "小明", "age": 18}

# 会把 num_tuple 和 xiaoming 作为元组传递个 args
# demo(gl_nums, gl_xiaoming)
demo(*gl_nums, **gl_xiaoming)
```

























### 案例

- 返回值如果有多个并需要单独处理变量的话,可以使用多个变量来接收

```python
def measure():
    a11 = 1031
    a22 = 11
    return a11, a22
s, d = measure()
print(s)
print(d)
print(measure())
```

- 交换数字

```python
a = 6
b = 100
# 解法一
c = a
a = b 
b = c
# 解法二
a = a + b
b = a - b
a = a - b
# 解法三 元祖()可以省略
a , b = (b, a)
a , b = b, a

```

- 如果传递的参数是**不可变类型**,在函数内部,使用<font color="red">方法</font>修改了数据的内容,**不会影响到外部的数据**
- 如果传递的参数是**可变类型**,在函数内部,使用<font color="red">方法</font>修改了数据的内容,**同样会影响到外部的数据**
- 列表变量使用 += 不会做相加在赋值的操作,本质上是调用列表的 extend 方法

```python
def demo(num_list):
    num_list.append(9)
    print(num_list)
num_list = [1, 2, 3]
demo(num_list)
print(num_list)
# 运行结果
[1, 2, 3, 9]
[1, 2, 3, 9]
```

- 在参数后使用**赋值语句**,可以**指定参数的缺省值**
- 必须保证带有默认值的缺省参数在参数列表的**末尾**
- 在调用函数时,如果有**多个缺省参数,需要指定参数名=**

```python
def demo(num,num_list = True):
```

#### 多值参数案例 —— 计算任意多个数字的和

1. 定义一个函数 `sum_numbers`，可以接收的 **任意多个整数**
2. 功能要求：将传递的 **所有数字累加** 并且返回累加结果

```python
def sum_numbers(*args):
num = 0
# 遍历 args 元组顺序求和
for n in args:
    num += n

return num
print(sum_numbers(1, 2, 3))
```









### 常用关键字

- `pass` 表示一个占位符，能够保证程序代码结构正确，一般用在开发程序时，不希望立刻编写分支内部的代码 



### LINUX 上的特殊符号
- `Shebang` 符号(`#!`)

* `#!`这个符号叫做 `Shebang` 或者 `Sha-bang`
* `Shebang` 通常在 `Unix` 系统脚本的中 **第一行开头** 使用
* 指明 **执行这个脚本文件** 的 **解释程序**

#### 使用 Shebang 的步骤

* 1. 使用 `which` 查询 `python3` 解释器所在路径

```bash
$ which python3
```

* 2. 修改要运行的 **主 python 文件**，在第一行增加以下内容(文件路径)

```python
#! /usr/bin/python3  
```

* 3. 修改 **主 python 文件** 的文件权限，增加执行权限

```bash
$ chmod +x cards_main.py
```

* 4. 在需要时执行程序即可

```bash
./cards_main.py
```





### 快捷键

- 函数的文档注释 Ctrl + Q 在函数定义的下方写注释

![Ctrl+Q](https://img-blog.csdnimg.cn/c9e6eaad37c940ffa5fa6d4a47a78e3d.png)