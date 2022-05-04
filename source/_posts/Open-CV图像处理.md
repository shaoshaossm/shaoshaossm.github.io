---
title: Open-CV图像处理
top: false
cover: false
toc: true
mathjax: true
date: 2022-01-14 14:24:08
password:
summary: 图像集合变换,形态学操作,平滑,直方图,边缘检测,模块匹配和霍夫变换
tags: OpenCV
categories: 图像处理
---

### 几何变换

#### 图像缩放

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

# 绝对尺寸  esc + m
rows,cols = img.shape[:2]

#%%

rows

#%%

cols

#%%

res = cv.resize(img,(2*cols,2*rows))

#%%

plt.imshow(res[:,:,::-1])

#%%

res.shape

#%%

res1 = cv.resize(img,None,fx=0.5,fy=0.5)

#%%

plt.imshow(res1[:,:,::-1])

#%%

res1.shape

```

#### 图像平移

```python
#%% md

# 图像平移

#%%

rows

#%%

M = np.float32([[1,0,100],[0,1,50]])

#%%

res2 = cv.warpAffine(img,M,(cols,rows))

#%%

plt.imshow(res2[:,:,::-1])


#%%

res2 = cv.warpAffine(img,M,(cols,rows))

#%%

plt.imshow(res2[:,:,::-1])

```

#### 图像旋转

```python
#%%

M = cv.getRotationMatrix2D((cols/2,rows/2),45,0.5)

#%%

res3 = cv.warpAffine(img,M,(cols,rows))

#%%

plt.imshow(res3[:,:,::-1])
```

#### 图像仿射变换

图像的仿射变换涉及到图像的形状位置角度的变化，是深度学习预处理中常到的功能,仿射变换主要是对图像的缩放，旋转，翻转和平移等操作的组合。

```python
# 2.1 创建变换矩阵
pts1 = np.float32([[50,50],[200,50],[50,200]])
pts2 = np.float32([[100,100],[200,50],[100,250]])
M = cv.getAffineTransform(pts1,pts2)
# 2.2 完成仿射变换
dst = cv.warpAffine(img,M,(cols,rows))
```

#### 图像的投射变换

透射变换是视角变化的结果，是指利用透视中心、像点、目标点三点共线的条件，按透视旋转定律使承影面（透视面）绕迹线（透视轴）旋转某一角度，破坏原有的投影光线束，仍能保持承影面上投影几何图形不变的变换。

它的本质将图像投影到一个新的视平面

```python
# 2.1 创建变换矩阵
pts1 = np.float32([[56,65],[368,52],[28,387],[389,390]])
pts2 = np.float32([[100,145],[300,100],[80,290],[310,300]])

T = cv.getPerspectiveTransform(pts1,pts2)
# 2.2 进行变换
dst = cv.warpPerspective(img,T,(cols,rows))
```

#### 图像的金字塔

图像金字塔是图像多尺度表达的一种，最主要用于图像的分割，是一种以多分辨率来解释图像的有效但概念简单的结构。

图像金字塔用于机器视觉和图像压缩，一幅图像的金字塔是一系列以金字塔形状排列的分辨率逐步降低，且来源于同一张原始图的图像集合。其通过梯次向下采样获得，直到达到某个终止条件才停止采样。

金字塔的底部是待处理图像的高分辨率表示，而顶部是低分辨率的近似，层级越高，图像越小，分辨率越低。

```python
imgup = cv.pyrUp(img)
plt.imshow(imgup[:,:,::-1])
imgdown = cv.pyrDown(img)
plt.imshow(imgdown[:,:,::-1])
```

**总结**

1. 图像缩放：对图像进行放大或缩小

   `cv.resize()`

2. 图像平移：

   指定平移矩阵后，调用`cv.warpAffine()`平移图像

3. 图像旋转：

   调用`cv.getRotationMatrix2D`获取旋转矩阵，然后调用`cv.warpAffine()`进行旋转

4. 仿射变换：

   调用`cv.getAffineTransform`将创建变换矩阵，最后该矩阵将传递给`cv.warpAffine()`进行变换

5. 透射变换：

   通过函数`cv.getPerspectiveTransform()`找到变换矩阵，将`cv.warpPerspective()`进行投射变换

6. 金字塔

   图像金字塔是图像多尺度表达的一种，使用的API：

   `cv.pyrUp()`: 向上采样

   `cv.pyrDown()`: 向下采样

### 形态学操作

#### 连通性

![4,8,D邻接](https://img-blog.csdnimg.cn/df2470c5480f4cce902391e7206ffd49.png)

