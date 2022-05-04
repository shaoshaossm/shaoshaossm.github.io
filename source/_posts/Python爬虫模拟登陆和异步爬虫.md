---
title: Python爬虫模拟登陆和异步爬虫
top: false
cover: false
toc: true
mathjax: true
date: 2021-11-17 16:54:12
password:
summary: 学习爬虫中的模拟登陆和多任务异步协程爬虫------------------------
tags: Python
categories: 爬虫
---

### 模拟登陆

- 使用**超级鹰**平台识别验证码的编码流程:
  - 将验证码图片进行本地下载
  - 调用平台提供的示例代码进行图片数据识别

有**验证码**,验证码可以读取到但测试未成功

```python
# 验证码
import requests
from lxml import html

import chaojiying

# 封装识别验证码函数


if __name__ == "__main__":
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
    }
    url = "https://so.gushiwen.cn/user/login.aspx?from=http://so.gushiwen.cn/user/collect.aspx"
    page_text = requests.get(url=url, headers=headers).text
    tree = html.etree.HTML(page_text)
    code_img_src = 'https://so.gushiwen.cn/' + tree.xpath('//*[@id="imgCode"]/@src')[0]

    print(code_img_src)
    code_img_data = requests.get(url=code_img_src, headers=headers).content
    with open('./code.jpg', 'wb') as fp:
        fp.write(code_img_data)
    chaojiying = chaojiying.Chaojiying_Client('手机号', '密码', '925040')  # 用户中心>>软件ID 生成一个替换 96001
    im = open('./code.jpg', 'rb').read()  # 本地图片文件路径 来替换 a.jpg 有时WIN系统须要//
    code = chaojiying.PostPic(im, 1004)
    code_img = code['pic_str']
    print(code_img)  # 1902 验证码类型  官方网站>>价格体系 3.4+版 print 后要加()
    # 模拟登陆
    login_url = "https://so.gushiwen.cn/user/login.aspx?"
    data = {
        'from': 'http://so.gushiwen.cn/user/collect.aspx',
        'email': '',
        'pwd': '',
        'code': code_img,
        'denglu': '登录',
    }
    response = requests.post(url=login_url, headers=headers, data=data)
    login_page_text = response.text
    print(response.status_code)

    with open('changyan.html', 'w', encoding='utf-8') as fp:
        fp.write(login_page_text)

```

- `cookie` : 用来让服务端记录客户端的相关状态
- 自动处理: 
  - `cookie`来源于模拟登陆请求后,由服务端创建
  - `session`会话对象:
    - 进行请求的发送
    - 如果请求中产生了`cookie`,则由`cookie`会被自动存储/携带在`session`对象中

无**验证码**,模拟登陆并获取用户数据 测试成功

```python
# 模拟登陆无验证码
import requests
from lxml import html

if __name__ == "__main__":
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
    }
    session = requests.session()
    url = "https://work.shopeebao1688.com/login.html"
    page_text = requests.get(url=url, headers=headers).text
    tree = html.etree.HTML(page_text)
    login_url = "https://work.shopeebao1688.com/index/Login/doLogin?username=13668567749&password=yangbiao2021"
    data = {
        'username': '',
        'password': ''
    }
    response = session.post(url=login_url, headers=headers, data=data)
    login_page_text = response.text
    print(response.status_code)
    detail_url = "https://work.shopeebao1688.com/main"
    # 使用携带cookie 的session 进行get请求的发送
    detail_page_text = session.get(url=detail_url, headers=headers).text
    with open('xiabao.html', 'w', encoding='utf-8') as fp:
        fp.write(detail_page_text)

```

### 代理

- 带路服务器
- 代理的作用:
  - 突破自身访问限制
  - 隐藏自身真实IP
- 代理相关网站
  - 快代理
- 代理`ip`类型
  - `http`:应用到http协议对应的url中
  - `https`:应用到http协议对应的url中 

- 代理`ip`的匿名度
  - 透明：服务器知道该次请求使用了代理，也知道请求对应的真实ip
  - 匿名：知道使用了代理，但不知道真实ip
  - 高匿：不知道使用了代理，跟不知道真实的ip

```python
# 代理服务器  未成功（可能是没找到https的服务器）
import requests

url = "https://www.baidu.com/s?ie=UTF-8&wd=ip"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
}
page_text = requests.get(url=url, headers=headers, proxies={"HTTP": '39.99.149.148'}).text
with open('ip2.html', 'w', encoding='utf-8') as fp:
    fp.write(page_text)

```

### 异步爬虫之线程池

- 线程池处理的是阻塞且耗时的操作

```python
# 爬取梨视频
import requests
from lxml import html
from multiprocessing.dummy import Pool

if __name__ == "__main__":
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
    }
    url = "https://www.pearvideo.com/category_10"

    page_text = requests.get(url=url, headers=headers).text
    tree = html.etree.HTML(page_text)
    li_list = tree.xpath('//ul[@id="listvideoListUl"]/li')
    urls = []  # 所有视频的连接
    for li in li_list:
        detail_url = 'https://www.pearvideo.com/' + li.xpath('./div/a/@href')[0]
        href = li.xpath('./div/a/@href')[0]
        name = li.xpath('./div/a/div[2]/text()')[0] + '.mp4'
        video_id = detail_url.split('_')[1]
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            , 'Referer': 'https://www.pearvideo.com/' + href
        }
        video_href = 'https://www.pearvideo.com/videoStatus.jsp?contId=' + video_id
        video_url = requests.get(url=video_href, headers=headers).json()
        video = video_url["videoInfo"]["videos"]["srcUrl"]
        video = video.replace(video.split('/')[-1].split('-')[0], 'cont-%s' % video_id)
        dic = {
            'name': name,
            'url': video
        }

        urls.append(dic)
    print(urls)

    def get_video_data(dic):
        url = dic['url']
        print(dic['name'], '正在下载。。。')
        data = requests.get(url=url, headers=headers).content
        with open(dic['name'], 'wb') as fp:
            fp.write(data)
            print(dic['name'], '下载成功')


    # 使用线程池对视频数据进行请求
    pool = Pool(4)
    pool.map(get_video_data, urls)
    pool.close()
    pool.join()


```

### 单线程+异步协程

- `event_loop`:事件循环,相当于一个无限循环,我们可以把一些函数注册到这个事件循环上,当满足某些条件时,函数就会被执行
- `coroutine`: 协程对象,可以把协程对象注册到事件循环中,它会被事件循环调用.可以使用`async`关键字定义一个方法,这个方法在调用时不会执行,而是返回一个协程对象
- `task`:任务,它是对协程对象的一个封装,包含了任务的各个状态
- `future`: 代表将来执行或还没有执行的任务,实际上和`task`没有本质区别
- `async`: 定义一个协程
- `await`: 用来挂起阻塞方法的执行

#### 协程基础案例演示

```python
import asyncio

async def request(url):
    print("正在请求的url", url)
    print("请求成功", url)
    return url

# async 修饰的函数,调用之后返回的是一个协程对象
c = request('www.baidu.com')
# # 创建事件循环对象
# loop = asyncio.get_event_loop()
# # 将协程对象注册到loop中,然后启动loop
# loop.run_until_complete(c)

# task使用
#loop = asyncio.get_event_loop()
# 基于loop创建一个task对象
# task = loop.create_task(c)
#
# print(task)
# loop.run_until_complete(task)
# print(task)

# future的使用
# loop = asyncio.get_event_loop()
# task = asyncio.ensure_future(c)
# print(task)
# loop.run_until_complete(task)
# print(task)

def callback_func(task):
    print(task.result())

# 绑定回调
loop = asyncio.get_event_loop()
task = asyncio.ensure_future(c)
task.add_done_callback(callback_func)
loop.run_until_complete(task)

```

#### 多任务异步协程

- 基础案例演示

```python
import asyncio
import time

async def request(url):
    print("正在下载", url)
    # time.sleep(2)  6s
    # 当在asyncio中遇到阻塞操作必须手动挂起
    await asyncio.sleep(2)  # 2s
    print("下载完毕", url)

start = time.time()
urls = [
    'www.baidu.com',
    'www.4399.com',
    'www.ssm.com']
stasks = []
for url in urls:
    c = request(url)
    task = asyncio.ensure_future(c)
    stasks.append(task)
loop = asyncio.get_event_loop()
# 将任务列表封装到wait中
loop.run_until_complete(asyncio.wait(stasks))
print(time.time()-start)
```

- 进阶案例

```python
from flask import Flask
import time

app = Flask(__name__)

@app.route('/ssm')
def index_ssm():
    time.sleep(2)
    return "hello ssm"

@app.route('/shao')
def index_shao():
    time.sleep(2)
    return "hello shao"

@app.route('/hxl')
def index_hxl():
    time.sleep(2)
    return "hello hxl"


if __name__ == '__main__':
    app.run(threaded=True)

```

```python
import asyncio
import time
import aiohttp

urls = [
    'http://127.0.0.1:5000/ssm', 'http://127.0.0.1:5000/shao', 'http://127.0.0.1:5000/hxl'
]

start = time.time()


async def get_page(url):
    async with aiohttp.ClientSession() as session:
        # headers params/data proxy='http://ip:port'
        async with await session.get(url) as response:
            page_text = await response.text()
            print(page_text)
    print('正在下载', url)
    print('下载完毕', url)


tasks = []
for url in urls:
    c = get_page(url)
    task = asyncio.ensure_future(c)
    tasks.append(task)

loop = asyncio.get_event_loop()
# 将任务列表封装到wait中
loop.run_until_complete(asyncio.wait(tasks))
print(time.time() - start)

```

