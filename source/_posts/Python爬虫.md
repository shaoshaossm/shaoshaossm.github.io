---
title: Python爬虫基础
top: false
cover: false
toc: true
mathjax: true
date: 2021-11-14 12:15:51
password:
summary: Python爬虫三种方式的基础学习---------------------------------
tags: Python
categories: 爬虫
---

### 爬虫基础简介

### http协议

- 概念: 服务器和客户端进行数据交互的一种形式
- `user-Agent`: 请求载体的身份表示
- Connection : 请求完毕后,是断开连接还是保持连接 
- `Content-Type` : 服务器相应客户端的数据类型 

```http
# user-Agent ( NetWork-All-Headers )
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36
```

#### https协议

- 概念: 安全的超文本数据传输协议
- 普遍采用的加密方式 : 证书密钥加密

### request模块

- 作用：模拟浏览器发送请求
- request模块编码流程
  - 指定url
  - 发起请求
  - 获取响应数据
  - 持久化存储

1. 爬取`https://shaoshaossm.github.io/` 首页数据

```python
import requests

if __name__ == "__main__":
    url = "https://shaoshaossm.github.io/"
    response = requests.get(url=url)
    page_text = response.text

    print(page_text)
    with open('./ssm.html', 'w', encoding='utf-8') as fp:
        fp.write(page_text)
    print("爬取结束")

```

2. 豆瓣高分电影

```python
# 豆瓣高分电影
import requests
import json

if __name__ == "__main__":
    # UA伪装
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
    }
    url = "https://movie.douban.com/j/search_subjects?"
    param = {
        'type': 'movie',
        'tag': '热门',
        'sort': 'recommend',
        'page_limit': '20',
        'page_start': '0'
    }

    # 携带参数的
    response = requests.get(url=url, params=param, headers=headers)
    list_data = response.json()
    print(list_data)
    # 持久化存储
    fp = open('./douban.json', 'w', encoding='utf-8')
    json.dump(list_data, fp, ensure_ascii=False)
    print('voer!!!')

```

3. 药监总局化妆品生产许可

-  百度搜 国家药品监督管理局，点首页化妆品——化妆品查询——化妆品生产许可获证企业 

```python
# 药监总局化妆品生产许可
import requests
import json

if __name__ == "__main__":
    # UA伪装
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
    }
    id_list = []
    all_data_list = []
    url = "http://scxk.nmpa.gov.cn:81/xk/itownet/portalAction.do?method=getXkzsList"
    # post请求参数处理
    for page in range(1, 2):
        page = str(page)
        data = {
            'on': 'true',
            'page': page,
            'pageSize': '3',
            'productName': '',
            'conditionType': '1',
            'applyname': '',
            'applysn': '',
        }
        # 携带参数的

        json_ids = requests.post(url=url, headers=headers, data=data).json()
        for dic in json_ids['list']:
            id_list.append(dic['ID'])

    post_url = "http://scxk.nmpa.gov.cn:81/xk/itownet/portalAction.do?method=getXkzsById"
    for id in id_list:
        data = {
            'id': id
        }
        detail_json = requests.post(url=post_url, headers=headers, data=data).json()
        print(detail_json)
        all_data_list.append(detail_json)
    # 持久化存储
    fp = open('./allData.json', 'w', encoding='utf-8')
    json.dump(all_data_list, fp=fp, ensure_ascii=False)
    print('voer!!!')
# 若报错多试几次
```

### 聚焦爬虫

- 爬取页面中指定的内容
- 数据解析分类
  - 正则
  - bs4
  - **xpath**

- 数据解析原理概述:
  - 进行指定标签的定位
  - 标签或者标签对应的属性中存储的数据的值进行提取(解析)

- <font color="red">正则表达式</font>爬取糗事百科图片--分页爬取

```python
# 爬取糗事百科图片--分页爬取
import requests
import re
import os

requests.packages.urllib3.disable_warnings()
if __name__ == "__main__":
    if not os.path.exists('E:\\pachongzhuanyongwenjianjia\\qiutu'):
        os.makedirs('E:\\pachongzhuanyongwenjianjia\\qiutu')
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
    }
    # 设置一个通用的url模板
    url = "https://www.qiushibaike.com/imgrank/page/%d/"

    for pageNum in range(1, 6):
        new_url = format(url % pageNum)

        # 二进制形式的图片数据
        page_text = requests.get(url=new_url, headers=headers).text
        ex = '<div class="thumb">.*?<img src="(.*?)" alt.*?</div>'
        img_src_list = re.findall(ex, page_text, re.S)
        for src in img_src_list:
            # 拼接出一个完整的图片地址
            src = 'https:' + src
            # 请求图片二进制数据
            img_data = requests.get(url=src, headers=headers).content
            # 生成图片名称
            img_name = src.split('/')[-1]
            # 图片存储路路径
            imgPath = 'E:\\pachongzhuanyongwenjianjia\\qiutu\\' + img_name
            with open(imgPath, 'wb') as fp:
                fp.write(img_data)
                print(img_name, "下载成功")

```

- `bs4`数据解析原理:
  - 实例化一个`BeautifulSoup`对象,并且将页面源码数据加载到该对象中
  - 通过调用`BeautifulSoup`对象中相关属性或方法进行标签定位和数据提取

- 环境安装
  - pip install bs4
  - pip install lxml

```python
# 提供数据解析的方法和属性
soup.tagName : 返回文档中第一次出现的tagName对应的标签
soup.find() : 
    -- find('tagName'):等同于soup.div
    -- 属性定位:
        -- soup.find('div',class_/id/attr='song')
soup.find_all('tagName'):返回符合要求的所有标签(列表)
select:
    -- select('某种选择器 (id,class,标签...选择器)'),返回的是一个列表
    -- 层级选择器:
        -- soup.select('.tang > ul > li > a')[0]: > 表示一个层级 [0] 第一个数据
        -- soup.select('.tang > ul a'): > 空格表示多个个层级
获取标签之间的文本数据:
    -- soup.a.text/string/get_text()
    -- text/get_text():可以获取标签中所有的文本内容
    -- string: 只可以获取该标签下直系的文本内容
获取标签中的属性值:
    -- soup.a['href']
```

- `bs4`爬取三国演义中所有章节和文章内容

```python
# 爬取三国演义中所有章节和文章内容
import requests
from bs4 import BeautifulSoup

if __name__ == "__main__":
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
    }
    url = "https://www.shicimingju.com/book/sanguoyanyi.html"
    page_text = requests.get(url=url, headers=headers).content
    # 实例化BeautifulSoup对象 将页面源码数据加载到该对象中
    soup = BeautifulSoup(page_text, 'lxml')
    # 解析章节标题和详情页url
    li_list = soup.select('.book-mulu > ul > li')
    fp = open('./sanguo.txt', 'w', encoding='utf-8')
    for li in li_list:
        title = li.a.string
        detail_url = 'https://www.shicimingju.com' + li.a['href']
        # 对详情页发起请求,解析章节内容
        detail_page_text = requests.get(detail_url, headers=headers).content
        # 解析出详情页中相关的章节内容
        detail_soup = BeautifulSoup(detail_page_text, 'lxml')
        # 解析到章节内容
        content = detail_soup.find('div', class_='chapter_content').text
        fp.write(title + ':' + content + '\n')
        print(title, '爬取成功!!!')

```

- `xpath` 解析原理
  - 实例化一个`etree`的对象,且需要将被解析的页面源码数据加载到该对象中
  - 调用`etree` 对象中的xpath方法结合着xpath表达式实现标签的定位和内容的捕获
- 环境安装
  - pin install lxml
- `xpath`表达式
  - /:表示的是从根节点开始定位.表示的是一个层级
  - //:表示多个层级.可以从任意位置开始定位
  - 属性定位: //div[@class='song'] tag[@attrName="attrValue"]
  - 索引定位: //div[@class='song']/p[3] 索引从1开始
  - 取文本:
    - /text() 获取的是标签中直系的文本内容
    - //text() 标签中非直系文本内容 (所有文本的内容)
  - 取属性
    - /@attrName   ===>img/src

```python
# 演示示例
from lxml import etree

if __name__ == '__main__':
    tree = etree.parse('1.html')
    #  r = tree.xpath('/html/body/h1')
    # r = tree.xpath('//h1')
    # r = tree.xpath('//div[@class="song"]')
    # r = tree.xpath('//div')
    # r = tree.xpath('//div[@class="song"]//li[5]/a/text()')[0]
    # r = tree.xpath('//li[7]//text()')
    # r = tree.xpath('//div[@class="song"]//text()')
    r = tree.xpath('//div[@class="song"]/img/@src')
    print(r)

```

- 全国城市列表(两种方式)

```python
import requests
from lxml import html

if __name__ == "__main__":
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
    }
    url = "https://www.aqistudy.cn/historydata/"
    page_text = requests.get(url=url, headers=headers).text
    tree = html.etree.HTML(page_text)
    all_li_list = tree.xpath('//div[@class="bottom"]/ul/li/a | //div[@class="bottom"]/ul/div[2]/li/a')
    all_city_Names = []
    # 解析到热门城市名称
    for li in all_li_list:
        all_city_Name = li.xpath('./text()')[0]
        all_city_Names.append(all_city_Name)

    print(all_city_Names, len(all_city_Names))
```

- 

```python
# 彼岸图网美女图片 分页爬取
import requests
from lxml import html
import os

if __name__ == "__main__":
    if not os.path.exists('E:\\pachongzhuanyongwenjianjia\\bizhimeinv'):
        os.makedirs('E:\\pachongzhuanyongwenjianjia\\bizhimeinv')
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
    }
    url = "https://pic.netbian.com/4kqiche/index_%d.html"

    for pageNum in range(2, 4):
        new_url = format(url % pageNum)
        response = requests.get(url=new_url, headers=headers)
        # 手动设置相应数据的编码格式
        # response.encoding = 'utf-8'
        page_text = response.text
        tree = html.etree.HTML(page_text)
        li_list = tree.xpath('//ul[@class="clearfix"]/li')
        for li in li_list:
            img_src = "https://pic.netbian.com" + li.xpath('./a/img/@src')[0]
            img_name = li.xpath('./a/img/@alt')[0] + '.jpg'
            # 通用中文乱码的解决方案
            img_name = img_name.encode('iso-8859-1').decode('gbk')
            print(img_name, img_src)
            img_data = requests.get(url=img_src, headers=headers).content
            imgPath = 'E:\\pachongzhuanyongwenjianjia\\bizhimeinv\\' + img_name
            with open(imgPath, 'wb') as fp:
                fp.write(img_data)
                print(img_name, img_src,"下载成功")

```

