---
title: Python进阶
top: false
cover: false
toc: true
mathjax: true
date: 2021-11-06 19:11:00
password:
img: https://img-blog.csdnimg.cn/c3cf15ea0c2b4f758b5c2d10ae8e54a9.png
summary: Python面向对象、继承、异常、I/O等-----------------
tags: Python
categories: 后端
---

### 方法

在 `Python` 中可以使用以下两个方法验证：

1. 在 **标识符** / **数据** 后输入一个 `.`，然后按下 `TAB` 键，`iPython` 会提示该对象能够调用的 **方法列表**
2. 使用内置函数 `dir` 传入 **标识符** / **数据**，可以查看对象内的 **所有属性及方法**

**提示** `__方法名__` 格式的方法是 `Python` 提供的 **内置方法 / 属性**

| 序号 |   方法名   | 类型 | 作用                                                 |
| :--: | :--------: | :--: | ---------------------------------------------------- |
|  01  | `__new__`  | 方法 | **创建对象**时，会被 **自动** 调用                   |
|  02  | `__init__` | 方法 | **对象被初始化**时，会被 **自动** 调用               |
|  03  | `__del__`  | 方法 | **对象被从内存中销毁**前，会被 **自动** 调用         |
|  04  | `__str__`  | 方法 | 返回**对象的描述信息**，`print` 函数输出使用         |
|  05  | `__file__` | 方法 | 返回**文件所在路径**                                 |
|  06  | `__name__` | 方法 | 测试模块代码只在**测试情况下运行**,被导入时不会执行! |

> 利用好 `dir()` 函数，在学习时很多内容就不需要死记硬背了

#### 初始化方法 ——同时设置初始值

在开发中，如果希望在 **创建对象的同时，就设置对象的属性**，可以对 `__init__` 方法进行 **改造**

1. 把希望设置的属性值，定义成 `__init__` 方法的参数
2. 在方法内部使用 `self.属性 = 形参` 接收外部传递的参数
3. 在创建对象时，使用 `类名(属性1, 属性2...)` 调用

```python
class Cat:

    def __init__(self, name):
        print("初始化方法 %s" % name)
        self.name = name
    ...
    
tom = Cat("Tom")
...

lazy_cat = Cat("大懒猫")
...
```

#### 私有属性和私有方法

- 在定义方法和属性时,在属性名或者方法名前增加**两个下划线**,定义的就是**私有**属性或方法

```python
self.__age = 18
def __scret(self):
    pass
```



#### 类方法和静态方法

- 类方法就是针对**类对象**定义的方法

```python
# 类方法
@classmethod
def 方法名(cls):
    pass

# 静态方法
@staticmethod
def 静态方法名():
    pass
```



### 封装

- 方法写在类中就是封装

```python
class HouseItem:

    def __init__(self, name, area):
        """

        :param name: 家具名称
        :param area: 占地面积
        """
        self.name = name
        self.area = area

    def __str__(self):
        return "[%s] 占地面积 %.2f" % (self.name, self.area)


# 1. 创建家具
bed = HouseItem("席梦思", 4)
chest = HouseItem("衣柜", 2)
table = HouseItem("餐桌", 1.5)

print(bed)
print(chest)
print(table)
```





### 继承 and 多继承

- 当**父类**方法不能满足子类需求时,可以对方法进行**重写(override)**
  - 覆盖父类的方法
  - 对父类方法进行扩展

```python
# 单继承
class 类名(父类名):
    pass
# 多继承
class 类名(父类名,父类名):
    pass
```

- 对父类方法进行扩展
  - 在**子类中重写**父类的方法
  - 在需要的位置使用`super()`.父类方法来调用父类方法的执行
  - 代码其他位置针对子类的需求,编写**子类特有的代码实现**

- `super()`就是`super`类创建的对象
- 最常使用的场景就是在**重写父类方法**时,调用**在父类中封装的方法实现**

- **子类对象**不能在自己的方法的内部,**直接**访问父类的**私有属性和私有方法**
- **子类对象**可以通过父类的**公有**方法**间接**访问**私有属性或私有方法 **

### 多态

- 在程序执行时，传入不同的**狗对象**实参，就会产生不同的执行效果

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def game(self):
        print("%s 蹦跳玩" % self.name)

class XiaoTianDog(Dog):
    def game(self):
        print("%s 边飞边蹦跳玩" % self.name)
        
class Person:
    def __init__(self, name):
        self.name = name

    def game_width_dog(self, dog):
        print("%s 与 %s 一起玩耍" % (self.name, dog.name))
        dog.game()

xiaoming = Person("小明")
xiaotianquan = XiaoTianDog("哮天犬")
xiaoming.game_width_dog(xiaotianquan)
wangcai = Dog("旺财")
xiaoming.game_width_dog(wangcai)

```

运行结果

```python
小明 与 哮天犬 一起玩耍
哮天犬 边飞边蹦跳玩
小明 与 旺财 一起玩耍
旺财 蹦跳玩
```

### 单例

- 设计模式
  - 设计模式是针对**某一特定问题**的成熟的解决方案
  - 使用设计模式是为了可重用代码、让代码更容易被人理解、保证代码的可读性
- 单例设计模式
  - 目的--让类创建的对象,在系统中**只有唯一的一个实例**
  - 每一次执行`类名()`返回的对象、**内存地址是相同的**
- 应用场景:
  -  **音乐播放** 对象
  -  **回收站** 对象
  -  **打印机 **对象

> 重写new方法的代码非常固定

- 重写 `__new__`方法一定要`return super().__new__(cls)`

- `__new__`是一个静态方法,在调用时需要主动传递`cls`参数

案例演示

- 只执行一次初始化
- 内存地址是唯一的

```python
class MusicPlayer:
    instance = None
    init_flag = False

    def __new__(cls, *args, **kwargs):
        if cls.instance is None:
            cls.instance = super().__new__(cls)
        return cls.instance

    def __init__(self):
        if MusicPlayer.init_flag:
            return
        print("初始化播放器")
        MusicPlayer.init_flag = True


player1 = MusicPlayer()
print(player1)
player2 = MusicPlayer()
print(player2)
# 运行结果
初始化播放器
<__main__.MusicPlayer object at 0x0000017824D39A20>
<__main__.MusicPlayer object at 0x0000017824D39A20>
```

### 异常

- **简单捕获异常**语法格式

```python
try:
    尝试执行的代码
except:
    出现错误的处理
```

- **错误类型捕获**语法格式
- 当`python`解释器**抛出异常**时,**最后一行**错误信息的**第一个单词**,就是错误类型

```python
try:
    pass
except 错误类型1:
    pass
except (错误类型2,错误类型3):
    pass
# 捕获未知错误
except Exception as result:
    print("未知错误 %s" % result)
```

- **异常捕获完整**语法

```python
try:
    pass
except 错误类型1:
    pass
except (错误类型2,错误类型3):
    pass
except Exception as result:
    print("未知错误 %s" % result)
else:
    # 没有异常才会执行的代码
    pass
finally:
    # 必定执行的代码
    pass
```

- **异常传递性**

```python
def demo1():
    return int(input("请输入一个整数"))


def demo2():
    demo1()


try:
    print(demo2())
except Exception as result:
    print(result)

```

> - 再开发中，可以在主函数中增加**异常捕获**
> - 在主函数中调用其他函数,只要出现异常,都会传递到主函数的**异常捕获**中
> - 这样不需要再代码中增加大量的**异常捕获**,保证代码的整洁行.

- 主动抛出`raise`异常

```python
def input_password():
    pwd = input("请输入密码")
    if len(pwd) >= 8:
        return pwd
    ex = Exception("密码长度不够")
    raise ex


try:

    print(input_password())
except Exception as result:
    print(result)

```

### 模块

- 使用`as`指定模块的别名

```python
import 模块名1 as 模块名
```

> 模块别名应该符合<font color="green">大驼峰</font>命名法

- 从模块中导入**部分**工具

```python
from 模块名1 import 工具名
```

> 导入之后可直接使用模块提供的工具 -- <font color="green">全局变量、函数、类</font>
>
> 如果两个模块存在**同名函数**,那么后导入的模块的函数会**覆盖**先导入的函数

- 从模块导入所有工具

```python
from 模块名1 import *
```

- `__name` 属性兼顾测试和导入

```python
def main():
    pass
if __name__ == "__main__":
    main
```

- `__file__` 文件所在路径

```python
import my_package
print(my_package.__file__)
```

### 包

`__inti__.py`

- 要在外界使用包中的模块,需要在`__inti__.py`中指定对外界提供的模块列表

```python
# 从 当前目录 导入 模块列表
from . import ...
# 示例
from .send import send_message
```

### 制作发布压缩包

#### 1) 创建 setup.py

* `setup.py` 的文件

```python
from distutils.core import setup

setup(name="hm_message",  # 包名
      version="1.0",  # 版本
      description="ssm's 发送和接收消息模块",  # 描述信息
      long_description="完整的发送和接收消息模块",  # 完整描述信息
      author="ssm",  # 作者
      author_email="1600767556@qq.com",  # 作者邮箱
      url="www.shaoshaossm.github.io",  # 主页
      py_modules=["hm_message.send_message",
                  "hm_message.receive_message"])
```

有关字典参数的详细信息，可以参阅官方网站：

https://docs.python.org/2/distutils/apiref.html

#### 2) 构建模块

```bash
$ python3 setup.py build
```

#### 3) 生成发布压缩包

```bash
$ python3 setup.py sdist
```

> 注意：要制作哪个版本的模块，就使用哪个版本的解释器执行！

####  安装模块

```bash
$ tar -zxvf hm_message-1.0.tar.gz 

$ sudo python3 setup.py install
```

**卸载模块**

直接从安装目录下，把安装模块的 **目录** 删除就可以

```python
$ cd /usr/local/lib/python3.5/dist-packages/
$ sudo rm -r hm_message*
```

#### `pip` 安装第三方模块

* **第三方模块** 通常是指由 **知名的第三方团队** **开发的** 并且被 **程序员广泛使用** 的 `Python` 包 / 模块
  * 例如 `pygame` 就是一套非常成熟的 **游戏开发模块**
* `pip` 是一个现代的，通用的 `Python` 包管理工具
* 提供了对 `Python` 包的查找、下载、安装、卸载等功能

安装和卸载命令如下：

```bash
# 将模块安装到 Python 2.x 环境
$ sudo pip install pygame
$ sudo pip uninstall pygame

# 将模块安装到 Python 3.x 环境
$ sudo pip3 install pygame
$ sudo pip3 uninstall pygame
```

#### 在 `Mac` 下安装 `iPython`

```bash
$ sudo pip install ipython
```

#### 在 `Linux` 下安装 `iPython`

```bash
$ sudo apt install ipython
$ sudo apt install ipython3
```

### I/O

###  操作文件的函数/方法

* 在 `Python` 中要操作文件需要记住 1 个函数和 3 个方法

| 序号 | 函数/方法 | 说明                           |
| ---- | --------- | ------------------------------ |
| 01   | open      | 打开文件，并且返回文件操作对象 |
| 02   | read      | 将文件内容读取到内存           |
| 03   | write     | 将指定内容写入文件             |
| 04   | close     | 关闭文件                       |

* `open` 函数负责打开文件，并且返回文件对象
* `read`/`write`/`close` 三个方法都需要通过 **文件对象** 来调用

### read 方法 —— 读取文件

* `open` 函数的第一个参数是要打开的文件名（文件名区分大小写）
    * 如果文件 **存在**，返回 **文件操作对象**
    * 如果文件 **不存在**，会 **抛出异常**
* `read` 方法可以一次性 **读入** 并 **返回** 文件的 **所有内容**
* `close` 方法负责 **关闭文件**
    * 如果 **忘记关闭文件**，**会造成系统资源消耗，而且会影响到后续对文件的访问**
* **注意**：`read` 方法执行后，会把 **文件指针** 移动到 **文件的末尾**

```python
# 1. 打开 - 文件名需要注意大小写
file = open("README")

# 2. 读取
text = file.read()
print(text)

# 3. 关闭
file.close()
```

### 打开文件的方式

* `open` 函数默认以 **只读方式** 打开文件，并且返回文件对象

语法如下：

```python
f = open("文件名", "访问方式")
```

| 访问方式 | 说明                                                         |
| :------: | ------------------------------------------------------------ |
|    r     | 以**只读**方式打开文件。文件的指针将会放在文件的开头，这是**默认模式**。如果文件不存在，抛出异常 |
|    w     | 以**只写**方式打开文件。如果文件存在会被覆盖。如果文件不存在，创建新文件 |
|    a     | 以**追加**方式打开文件。如果该文件已存在，文件指针将会放在文件的结尾。如果文件不存在，创建新文件进行写入 |
|    r+    | 以**读写**方式打开文件。文件的指针将会放在文件的开头。如果文件不存在，抛出异常 |
|    w+    | 以**读写**方式打开文件。如果文件存在会被覆盖。如果文件不存在，创建新文件 |
|    a+    | 以**读写**方式打开文件。如果该文件已存在，文件指针将会放在文件的结尾。如果文件不存在，创建新文件进行写入 |

- 写入文件示例
- 若文件中有中文需加入`encoding='utf-8'`

```python
# 打开文件
f = open("README", "w",encoding='utf-8')

f.write("hello python！\n")
f.write("今天天气真好")

# 关闭文件
f.close()
```

`readline` 方法

* `readline` 方法可以一次读取一行内容
* 方法执行后，会把 **文件指针** 移动到下一行，准备再次读取

**读取大文件的正确姿势**

```python
# 打开文件
file = open("README")

while True:
    # 读取一行内容
    text = file.readline()

    # 判断是否读到内容
    if not text:
        break

    # 每读取一行的末尾已经有了一个 `\n`
    print(text, end="")

# 关闭文件
file.close()

```

### 复制文件

#### 小文件复制

* 打开一个已有文件，读取完整内容，并写入到另外一个文件

```python
# 1. 打开文件
file_read = open("README")
file_write = open("README[复件]", "w")

# 2. 读取并写入文件
text = file_read.read()
file_write.write(text)

# 3. 关闭文件
file_read.close()
file_write.close()

```

#### 大文件复制

* 打开一个已有文件，逐行读取内容，并顺序写入到另外一个文件

```python
# 1. 打开文件
file_read = open("README")
file_write = open("README[复件]", "w")

# 2. 读取并写入文件
while True:
    # 每次读取一行
    text = file_read.readline()

    # 判断是否读取到内容
    if not text:
        break

    file_write.write(text)

# 3. 关闭文件
file_read.close()
file_write.close()

```

### 文件/目录操作

### 文件操作

```python
# 导入前提
import os
```

| 序号 | 方法名 | 说明       | 示例                              |
| ---- | ------ | ---------- | --------------------------------- |
| 01   | rename | 重命名文件 | `os.rename(源文件名, 目标文件名)` |
| 02   | remove | 删除文件   | `os.remove(文件名)`               |

### 目录操作

| 序号 | 方法名     | 说明           | 示例                      |
| ---- | ---------- | -------------- | ------------------------- |
| 01   | listdir    | 目录列表       | `os.listdir(目录名)`      |
| 02   | mkdir      | 创建目录       | `os.mkdir(目录名)`        |
| 03   | rmdir      | 删除目录       | `os.rmdir(目录名)`        |
| 04   | getcwd     | 获取当前目录   | `os.getcwd()`             |
| 05   | chdir      | 修改工作目录   | `os.chdir(目标目录)`      |
| 06   | path.isdir | 判断是否是文件 | `os.path.isdir(文件路径)` |

> 提示：文件或者目录操作都支持 **相对路径** 和 **绝对路径**

`eva()` : 将**字符串**当成**有效的表达式**来求值，并**返回计算结果** 

```python
input_str = input("请输入算术题：")
print(eval(input_str))
```

