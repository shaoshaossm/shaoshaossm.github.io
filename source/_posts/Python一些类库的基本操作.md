---
title: Python一些类库的基本操作
top: false
cover: false
toc: true
mathjax: true
date: 2021-11-24 22:36:46
password:
img: https://img-blog.csdnimg.cn/c3cf15ea0c2b4f758b5c2d10ae8e54a9.png
summary: 对Python一些类库的基本操作----------------------------
tags: Python
categories: 后端
---

### Xwlt

```python
import xlwt

workbook = xlwt.Workbook(encoding='utf-8')
worksheet = workbook.add_sheet('sheet1')
worksheet.write(0,0,'hello')
workbook.save('student.xls')
```

### Sqlite

```python
import sqlite3
conn = sqlite3.connect('test.db')
c = conn.cursor()
sql = '''
    insert into company (id,name,age,address,salary)
    values (1,'张三',22,'山西',8000)
'''
sql = '''
    select * from company
'''
cursor = c.execute(sql)
for row in cursor:
    print('id=',row[0])
    print('name=',row[1])
    print('age=',row[2])
    print('address=',row[3])
# conn.commit()
conn.close()
print("成功")
```

### Flask

```python
from flask import Flask,render_template
import time
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello world!'

@app.route('/1/')
def hello_world2():
    a = time.time() # 字典,列表等其他类型也可
    return render_template('index.html',var = a)
@app.route('/welcome/<name>')
def welcome(name):
    return 'Hello %s' % name


@app.route('/welcome/<int:id>')
def welcome2(id):
    return 'Hello id: %d' % id


if __name__ == '__main__':
    app.run()

```

### WordCloud

```python
import jieba  # 分词
from matplotlib import pyplot as plt  # 绘图可视化
from wordcloud import WordCloud  # 词云
from PIL import Image  # 图片处理
import numpy as np  # 矩阵运算
import sqlite3  # 数据库

conn = sqlite3.connect('test.db')
cur = conn.cursor()
sql = 'select name,address from company'
data = cur.execute(sql)
text = ''
for item in data:
    text = text + item[0]

print(text)
cur.close()
conn.close()
cut = jieba.cut(text)
string = ' '.join(cut)
print(len(string))
img = Image.open('639cad061d950a7b7700d56c07d162d9f3d3c9f2.jpg')
img_array = np.array(img)  # 图片->数组
wc = WordCloud(background_color='white',
               mask=img_array,
               font_path='CENTURY.TTF')
wc.generate_from_text(string)
# 绘制图片
fig = plt.figure(1)
plt.imshow(wc)
plt.axis('off') #是否显示坐标轴
# plt.show()
plt.savefig('word.jpg')
```



