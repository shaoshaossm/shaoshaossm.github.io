---
title: open-CV的初步学习
top: false
cover: false
toc: true
mathjax: true
date: 2022-01-12 16:30:04
password:
summary: 对Open-CV图像的基本操作和算数操作------------------------------
tags: OpenCV
categories: 图像处理
---

### 安装

```bash
# 安装指定版本
pip install opencv-python==3.4.2.17
```

```python
# 测试是否安装成功
import cv2
lena  = cv2.imread("1.jpg")
cv2.imshow("image",lena)
cv2.waitKey(0)
```

```bash
# 利用SIFT和SURF等进行特征提取
pip install opencv-contrib-python
```

### Open-CV基本操作

#### 图像的基础操作

- 图像的IO操作，读取和保存方法
- 在图像上绘制几何图形
- 怎么获取图像的属性
- 怎么访问图像的像素，进行通道分离，合并等
- 怎么实现颜色空间的变换
- 图像的算术运算

#### 1.1 读取图像

```python
lena  = cv2.imread()
```

- 读取方式的标志

  - cv.IMREAD*COLOR：以彩色模式加载图像，任何图像的透明度都将被忽略。这是默认参数。

  - cv.IMREAD*GRAYSCALE：以灰度模式加载图像

  - cv.IMREAD_UNCHANGED：包括alpha通道的加载图像模式。

    **可以使用1、0或者-1来替代上面三个标志**

- 参考代码

```python
import cv2 as cv
# 以灰度图的形式读取图像
img = cv.imread('1.jpg',0)
```

#### 1.2 显示图像

```python
cv.imshow()
```

参数：

- 显示图像的窗口名称，以字符串类型表示
- 要加载的图像

**注意：在调用显示图像的API后，要调用cv.waitKey()给图像绘制留下时间，否则窗口会出现无响应情况，并且图像无法显示出来**。

- 参考代码

```python
import cv2
lena  = cv2.imread("1.jpg",-1)
cv2.imshow("image",lena)
cv2.waitKey(0)
```

#### 1.3 保存图像

```python
cv.imwrite()
```

参数：

- 文件名，要保存在哪里
- 要保存的图像

```python
cv.imwrite('2.jpg',img)
```

#### 1.4 完整代码演示

```python
import numpy as np
import cv2 as cv
import matplotlib.pyplot as plt
# 1 读取图像
img = cv.imread('1.jpg',0)
# 2 显示图像
# 2.1 利用opencv展示图像
cv.imshow('image',img)
# 2.2 在matplotplotlib中展示图像
plt.imshow(img[:,::-1])
# 结束
# cv.destroyAllWindows()
plt.title('匹配结果'), plt.xticks([]), plt.yticks([])
plt.show()
k = cv.waitKey(0)
# 3 保存图像
cv.imwrite('2.jpg',img)
```

### 绘制几何图形

#### 2.1 绘制直线

```
cv.line(img,start,end,color,thickness)
```

参数：

- img:要绘制直线的图像
- Start,end: 直线的起点和终点
- color: 线条的颜色
- Thickness: 线条宽度

#### 2.2 绘制圆形

```python
cv.circle(img,centerpoint, r, color, thickness)
```

参数：

- img:要绘制圆形的图像
- Centerpoint, r: 圆心和半径
- color: 线条的颜色
- Thickness: 线条宽度，为-1时生成闭合图案并填充颜色

#### 2.3 绘制矩形

```python
cv.rectangle(img,leftupper,rightdown,color,thickness)
```

参数：

- img:要绘制矩形的图像
- Leftupper, rightdown: 矩形的左上角和右下角坐标
- color: 线条的颜色
- Thickness: 线条宽度

#### 2.4 向图像中添加文字

```python
cv.putText(img,text,station, font, fontsize,color,thickness,cv.LINE_AA)
```

参数：

- img: 图像
- text：要写入的文本数据
- station：文本的放置位置
- font：字体
- Fontsize :字体大小

#### 2.5 效果演示

```python
import numpy as np
import cv2 as cv
import matplotlib.pyplot as plt
# 1 创建一个空白的图像
img = np.zeros((512,512,3), np.uint8)
# 2 绘制图形
cv.line(img,(0,0),(511,511),(255,0,0),2)
cv.line(img,(0,511),(511,0),(200,20,3),2)
cv.rectangle(img,(384,384),(510,128),(0,255,0),3)
cv.circle(img,(255,255), 63, (0,0,255), -1)
font = cv.FONT_HERSHEY_SIMPLEX
cv.putText(img,'OpenCV',(10,500), font, 4,(255,255,255),2,cv.LINE_AA)
# 3 图像展示
plt.imshow(img[:,:,::-1])
plt.title('匹配结果'), plt.xticks([]), plt.yticks([])
plt.show()
```

![效果展示](https://img-blog.csdnimg.cn/64cc9aa678134e3c947b644b6a6aec72.png)

### 3.获取并修改图像中的像素点

我们可以通过行和列的坐标值获取该像素点的像素值。对于BGR图像，它返回一个蓝，绿，红值的数组。对于灰度图像，仅返回相应的强度值。使用相同的方法对像素值进行修改。

```python
import numpy as np
import cv2 as cv
img = cv.imread('messi5.jpg')
# 获取某个像素点的值
px = img[100,100]
# 仅获取蓝色通道的强度值
blue = img[100,100,0]
# 修改某个位置的像素值
img[100,100] = [255,255,255]
```

### 4 获取图像的属性

图像属性包括行数，列数和通道数，图像数据类型，像素数等。

| 属性     | API       |
| -------- | --------- |
| 形状     | img.shape |
| 图像大小 | img.size  |
| 数据类型 | img.dtype |

### 5 图像通道的拆分与合并

有时需要在B，G，R通道图像上单独工作。在这种情况下，需要将BGR图像分割为单个通道。或者在其他情况下，可能需要将这些单独的通道合并到BGR图像。你可以通过以下方式完成。

```python
# 通道拆分
b,g,r = cv.split(img)
# 通道合并
img = cv.merge((b,g,r))
```

### 6 色彩空间的改变

OpenCV中有150多种颜色空间转换方法。最广泛使用的转换方法有两种，BGR↔Gray和BGR↔HSV。

API：

```python
cv.cvtColor(input_image，flag)
```

参数：

- input_image: 进行颜色空间转换的图像
- flag: 转换类型
  - cv.COLOR_BGR2GRAY : BGR↔Gray
  - cv.COLOR_BGR2HSV: BGR→HSV

#### 代码演示

```python
#%%

import numpy as np
import cv2 as cv
import matplotlib.pyplot as plt

#%%

img = np.zeros((256,256,3),np.uint8)

#%%

plt.imshow(img[:,:,::-1])



#%%

img[100,100]

#%%

img.shape

#%%

img.dtype

#%%

img.size

#%%

img = cv.imread('1.jpg')

#%%

plt.imshow(img[:,:,::-1])

#%%

b,g,r = cv.split(img)

#%%

plt.imshow(b,cmap=plt.cm.gray)

#%%

img2 = cv.merge((b,g,r))

#%%

plt.imshow(img2[:,:,::-1])

#%%

gray  = cv.cvtColor(img,cv.COLOR_BGR2GRAY)

#%%

plt.imshow(gray,cmap)

```

### 算数操作

#### 1.图像加法

代码演示

```python
#%%

import numpy as np
import cv2 as cv
import matplotlib.pyplot as plt

#%%

img = cv.imread('1.jpg')

#%%

plt.imshow(img[:,:,::-1])

#%%

imggray = cv.imread('2.jpg')

#%%

plt.imshow(imggray[:,:,::-1])

#%%

img2 = cv.add(img,imggray)

#%%

plt.imshow(img2[:,:,::-1])

```

两种结果对比(Opencv更好一点)

![OpenCV](https://img-blog.csdnimg.cn/1533667874f24412a2c886f858f3e7fa.png)![Numpy](https://img-blog.csdnimg.cn/f026174e259d43abba3ce2c79365a703.png)

#### 2.图像的混合

这其实也是加法，但是不同的是两幅图像的权重不同，这就会给人一种混合或者透明的感觉。图像混合的计算公式如下：

> g(x) = (1−α)f0(x) + αf1(x)

通过修改 α 的值（0 → 1）,实现不同权重的图像混合

参考代码

```python
#%%

img4 = cv.addWeighted(img,0.4,imggray,0.6,0)

#%%

plt.imshow(img4[:,:,::-1])
```

![图像混合](https://img-blog.csdnimg.cn/9a7b1bc9fd0d4be18ffda46ea54982b9.png)

> 注意：这里都要求两幅图像是相同大小的。
