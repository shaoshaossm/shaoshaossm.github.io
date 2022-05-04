---
title: Python爬虫之scrapy框架学习
top: false
cover: false
toc: true
mathjax: true
date: 2021-11-20 13:29:56
password:
summary: scrapy框架的学习和使用-----------------------------
tags: Python
categories: 爬虫
---

### scrapy安装步骤

- pip install wheel
- 下载twisted : 地址:https://www.lfd.uci.edu/~gohlke/pythonlibs/#twisted (选择对应的版本)
- 安装twisted : pip install aiohttp-3.8.1-cp38-cp38-win_amd64.whl
- pip install pywin32
- pip install scrapy
- 测试终端输入: scrapy
- 创建工程 终端输入: scrapy startproject firstdemo
- 在sprders目录 终端输入:scrapy genspider first www.xxx.com
- 执行工程 : scrapy crawl first (spiderName)  --nolong  (不输出日志)
- ROBOTSTXT_OBEY = False
- 配置文件`settings.py`中加上 LOG_ERROR = 'ERROR'
- USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'

### scrapy持久化存储

#### 基于终端指令

- 持久化存储对应的终端指令只能为：('json', 'jsonlines', 'jl', 'csv', 'xml', 'marshal', 'pickle')

```python
import scrapy

class FirstSpider(scrapy.Spider):
    # 爬虫文件名称
    name = 'qiubai'
    # 允许的域名
    # allowed_domains = ['www.xxx.com']
    # 起始url列表:存放的url会被scrapy自动进行请求的发送
    start_urls = ['https://www.qiushibaike.com/text/']

    def parse(self, response):
        all_data = []
        div_list = response.xpath('//div[@class="col1 old-style-col1"]/div')

        for div in div_list:
            # extract: 将Selector对象中data参数存储的字符串提取出来
            # author = div.xpath('./div[1]/a[2]/h2/text()')[0].extract() 作用一样 必须是一个列元素
            author = div.xpath('./div[1]/a[2]/h2/text()').extract_first()
            content = div.xpath('./a[1]/div/span//text()').extract()
            content = ''.join(content)
            dic = {
                'author': author,
                'content': content
            }
            all_data.append(dic)
            break
        return all_data

```

#### 基于管道

- 编码流程
  - 数据解析
  - 在`item`类中定义相关的属性
  - 将解析的数据封装到`item`类型的对象
  - 在`item`类型的对象提交给管道进行持久化存储的操作
  - 在管道类的`process_item`中要将其受到的`item`对象存储的数据进行持久化存储操作
  - 在配置文件中开启管道
- <font color="red">管道文件中一个管道类对应一组数据存储到一个平台或者载体中</font>
- <font color="red">爬虫文件提交的item只会给管道文件中第一个被执行的管道类接受</font>
- <font color="red">process_item中的return item表示将item传递给下一个即将被执行的管道类</font>

`qiubai.py`

```python
    def parse(self, response):
        div_list = response.xpath('//div[@class="col1 old-style-col1"]/div')

        for div in div_list:
            # extract: 将Selector对象中data参数存储的字符串提取出来
            author = div.xpath('./div[1]/a[2]/h2/text()').extract_first()
            content = div.xpath('./a[1]/div/span//text()').extract()
            content = ''.join(content)
            item = QiubaiproItem()
            item['author'] = author
            item['content'] = content
            yield item  # 将item提交给管道
```

`pipelines.py`

```python
# 存储到本地
class QiubaiproPipeline:
    fp = None

    # 重写父类的方法,该方法只在爬虫时调用一次
    def open_spider(self, spider):
        self.fp = open('./qiubai.txt', 'w', encoding='utf-8')

    # 接受爬虫过来的item对象,处理item类型的对象,每接收一个item对象调用一次
    def process_item(self, item, spider):
        author = item['author']
        content = item['content']
        self.fp.write(author + ':' + content + '\n')
        return item

    # 重写父类的方法,该方法只在爬虫结束调用一次
    def close_spider(self, spider):
        print('结束爬虫!')
        self.fp.close()
# 存储到数据库
# 管道文件中一个管道类对应一组数据存储到一个平台或者载体中
class mysqlPileLine(object):
    conn = None
    cursor = None

    def open_spider(self, spider):
        self.conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', password='密码', db='qiubai',
                                    charset='utf8')

    def process_item(self, item, spider):
        self.cursor = self.conn.cursor()

        try:
            self.cursor.execute('insert into qiubai values("%s","%s")' % (item["author"], item["content"]))
            self.conn.commit()
        except Exception as e:
            print(e)
            self.conn.rollback()
        return item

    def close_spider(self, spider):
        self.cursor.close()
        self.conn.close()
```

`items.py`

```python
import scrapy

class QiubaiproItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    author = scrapy.Field()
    content = scrapy.Field()
```



 `settings.py`

```python
ITEM_PIPELINES = {
    # 300 优先级 数值越小 优先级越高
    'qiubaiPro.pipelines.QiubaiproPipeline': 300,
    'qiubaiPro.pipelines.mysqlPileLine': 301,
}
```

- 基于Spider的全站数据爬取彼岸网图片名称和图片并进行本地存储

`meinv.py`

```python
import scrapy
from meinvPro.items import MeinvproItem

class MeinvSpider(scrapy.Spider):
    name = 'meinv'
    # allowed_domains = ['www.xxx.com']
    start_urls = ['https://pic.netbian.com/4kmeinv/index.html']
    url = 'https://pic.netbian.com/4kmeinv/index_%d.html'
    page_num = 2

    def parse(self, response):

        li_list = response.xpath('//*[@id="main"]/div[3]/ul/li')
        for li in li_list:
            img_name = li.xpath('./a/b/text()').extract_first()
            # 若有图片懒加载 使用伪属性
            img_src = 'https://pic.netbian.com/' + li.xpath('./a/img/@src').extract_first()
            print(img_name, img_src)

            item = MeinvproItem()
            item['img_src'] = img_src
            yield item
        if self.page_num <= 10:
            new_url = format(self.url % self.page_num)
            self.page_num += 1
            yield scrapy.Request(url=new_url, callback=self.parse)

```

`items.py`

```python

import scrapy

class MeinvproItem(scrapy.Item):
    # define the fields for your item here like:
    img_src = scrapy.Field()

```

`pipelines.py`

```python

from itemadapter import ItemAdapter
from scrapy.pipelines.images import ImagesPipeline
import scrapy

# class MeinvproPipeline:
#     def process_item(self, item, spider):
#         return item
class imgsPileLine(ImagesPipeline):
    # 根据图片地址进行图片数据请求
    def get_media_requests(self, item, info):
        yield scrapy.Request(item['img_src'])

    # 指定图片存储路径
    def file_path(self, request, response=None, info=None):
        img_Name = request.url.split('/')[-1]
        return img_Name

    def item_completed(self, results, item, info):
        return item

```

`settings.py`

```python
# 指定图片存储目录
IMAGES_STORE = './imgs'
# 更换管道
ITEM_PIPELINES = {
   'meinvPro.pipelines.imgsPileLine': 300,
}
```



### 五大核心组件

- 引擎(Scrapy)
  - 用来处理整个系统的数据流处理,触发事务(框架核心)。
- 调度器(Scheduler)
  - 用来接收引擎发过来的请求,压入队列中,并在引擎再次请求的时候返回,可以想象成一个URL(抓取网页的网址或者说是链接)的优先队列,由他来决定下一个要抓取的网址是什么,同时去除重复的网址。
- 下载器(Downloader)
  - 用于下载网页的内容,并将网页内容返回给蜘蛛(Scrapy下载是建立在twisted这个高效的异步模型上的)。
- 爬虫(Spiders)
  - 爬虫主要是干活的,用于从特定的网页中提取自己需要的信息,即所谓的实体(item).用户也可以从中取出链接,让Scrapy继续抓取下一个页面。
- 项目管道(Pipeline)
  - 负责处理爬虫从网页中抽取的实体,主要的功能是持久化实体、验证实体的有效性,清楚不需要的信息,当页面被爬虫解析后,将被发送到项目管道,并经过几个特定的次序处理数据。

### 请求传参

- 使用场景：爬取解析的数据不在同一张页面中（详情页）。

`meta={'item':item}`

案例演示

```python
import scrapy
from bossPro.items import BossproItem

class BossSpider(scrapy.Spider):
    name = 'boss'

    start_urls = ['https://jh.58.com/job/?param6693=8|10&PGTID=0d100000-0021-349d-98e8-58c336a9edba&ClickID=2']
    # 回调函数接收item
    def parse_detail(self, response):
        item = response.meta['item']
        job_desc = response.xpath('/html/body/div[3]/div[3]/div[2]/div[1]/div[1]/div[1]//text()').extract()
        job_desc = ''.join(job_desc)
        print(job_desc)
        item['job_desc'] = job_desc
        yield item
    def parse(self, response):
        li_list = response.xpath('//*[@id="list_con"]/li')
        # print(li_list)
        for li in li_list:

            item = BossproItem()
            job_address = li.xpath('./div[1]/div[1]/a/span[1]/text()').extract_first()

            job_name = li.xpath('./div[1]/div[1]/a/span[2]/text()').extract_first()
            item['job_name'] = jo b_name
            print(job_address,job_name)
            detail_url = li.xpath('./div[1]/div[1]/a/@href').extract_first()
            # 请求传参：meta = {}，可以将meta字典传递给请求对应的回调函数
            yield scrapy.Request(detail_url, callback=self.parse_detail,meta={'item':item})

```

### 中间件

- 位于引擎和下载器之间
- 用于拦截到整个工程中所有请求和响应
- 拦截请求
  - UA伪装
  - 代理IP
- 拦截相应
  - 篡改响应数据(响应对象)

案例演示 (ip更换失败)

`middle.py`

```python
import scrapy


class MiddleSpider(scrapy.Spider):
    name = 'middle'

    start_urls = ['https://www.baidu.com/s?wd=ip']

    def parse(self, response):
        page_text = response.text
        print(page_text)
        with open('ip.html', 'w', encoding='utf-8') as fp:
            fp.write(page_text)

```

`middlewares.py`

```python

class MiddleproDownloaderMiddleware:
    # UA伪装
    user_agent_list=[
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11'
    ]
    # 代理池
    PROXY_http = [
        '153.180.102.104:80',
        '195.208.131.189:56055'
    ]
    PROXY_https = [
        '120.83.49.90.9000',
        '95.189.112.214:35508'
    ]

    def process_request(self, request, spider):
        request.headers['User-Agent'] = random.choice(self.user_agent_list)
		# 方便测试
        request.meta['proxy'] = 'http://121.232.148.116:9000'
        return None

    def process_response(self, request, response, spider):

        return response

    def process_exception(self, request, exception, spider):
        # 代理
        if request.url.split(':')[0] == 'http':
            request.meta['proxy'] = 'http://'+random.choice(self.PROXY_http)
        else:
            request.meta['proxy'] = 'https://'+random.choice(self.PROXY_https)
        return request # 将修正后的请求对象进行重新发送


```

`settings.py`

```python
# 开启
DOWNLOADER_MIDDLEWARES = {
   'middlePro.middlewares.MiddleproDownloaderMiddleware': 543,
}
```

- 爬取网易各大板块文章标题和内容并本地存储

`wangyi.py`

```python
import scrapy
from selenium import webdriver
from wangyiPro.items import WangyiproItem


class WangyiSpider(scrapy.Spider):
    name = 'wangyi'
    # allowed_domains = ['www.xxx.com']
    start_urls = ['https://news.163.com/']
    models_urls = []  # 存储板块对应详情页对应的url


    def __init__(self):
        self.bro = webdriver.Chrome(executable_path='E:\PyCharm\pachong\com\ssm\seleniumTest\chromedriver.exe')

    def parse(self, response):
        li_list = response.xpath('//*[@id="index2016_wrap"]/div[1]/div[2]/div[2]/div[2]/div[2]/div/ul/li')
        print(li_list)
        alist = [3, 4, 6, 7, 8]
        for index in alist:
            model_url = li_list[index].xpath('./a/@href').extract_first()
            self.models_urls.append(model_url)
        for url in self.models_urls:
            yield scrapy.Request(url, callback=self.parse_model)

    # 解析每个板块页面中对应新闻的标题和新闻详情页的url
    def parse_model(self, response):
        div_list = response.xpath('/html/body/div/div[3]/div[4]/div[1]/div[1]/div/ul/li/div/div')
        for div in div_list:
            title = div.xpath('./div/div[1]/h3/a/text()').extract_first()
            print(title)
            new_detail_url = div.xpath('./div/div[1]/h3/a/@href').extract_first()
            item = WangyiproItem()
            item['title'] = title

            # 对新闻详情页的url发起请求
            yield scrapy.Request(url=new_detail_url, callback=self.parse_detail, meta={'item': item})

    def parse_detail(self, response):
        all_data = []
        content = response.xpath('//*[@id="content"]/div[2]//text()').extract()
        content = ''.join(content)

        item = response.meta['item']

        item['content'] = content
        dic = {
            'content': content
        }
        all_data.append(dic)
        yield item
        return all_data
    def closed(self, spider):
        self.bro.quit()

```

`items.py`

```python
import scrapy

class WangyiproItem(scrapy.Item):
    title = scrapy.Field()
    content = scrapy.Field()
```

`middlewares.py`

```python

from scrapy.http import HtmlResponse
from time import sleep


class WangyiproDownloaderMiddleware:

    def process_response(self, request, response, spider):
        bro = spider.bro  # 获取浏览器对象
        # url -> request -> response
        if request.url in spider.models_urls:
            bro.get(request.url)
            sleep(2)
            page_text = bro.page_source
            # 五大板块对应的响应对象 针对定位到的这些response进行篡改,实例化一个新的响应对象 ,替代原来的响应对象
            new_response = HtmlResponse(url=request.url, body=page_text, encoding='utf-8', request=request)
            return new_response
        else:
            # 其他请求对应的响应对象
            return response

```

`pipelines.py`

```python
class WangyiproPipeline:
    def process_item(self, item, spider):
        print(item)
        return item
```

`settings.py`

```python
USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11'

ROBOTSTXT_OBEY = False
LOG_ERROR = 'ERROR'

DOWNLOADER_MIDDLEWARES = {
   'wangyiPro.middlewares.WangyiproDownloaderMiddleware': 543,
}

ITEM_PIPELINES = {
   'wangyiPro.pipelines.WangyiproPipeline': 300,
}
```

### CrawlSpider类

- 全站数据爬取的方式
  - 基于spider: 手动请求
  - 基于CrawlSpider
- CrawlSpider的使用
  - 创建工程
  - cd xxx
  - scrapy genspider -t crawl  xxx www.xxx.com
- 链接提取器:
  - 根据指定规则(allow)进行指定链接提取
- 规则解析器:
  - 将链接提取提取到的链接进行指定规则 (callback) 的解析操作

---

案例演示

- 爬取sun网站中的编号,新闻标题,新闻内容,标号

`sun.py`

```python
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from sunPro.items import SunproItem,DetailItem

class SunSpider(CrawlSpider):
    name = 'sun'
    # allowed_domains = ['www.xxx.com']
    start_urls = ['https://wz.sun0769.com/political/index/politicsNewest?id=2&page=2']
    link = LinkExtractor(allow=r'id=2&page=\d+')

    # link_detail = 'https://wz.sun0769.com/political/politics/index?' + LinkExtractor(allow=r'id=\d+')
    link_detail = LinkExtractor(allow=r'id=\d+')
    print(link_detail)
    rules = (
        # LinkExtractor 链接提取器
        # allows = (正则) 根据指定规则进行链接提取
        # follow=True : 将链接提取器继续作用到链接提取器提取到的链接所对应的页面中
        # 规则解析器 : 将链接提取提取到的链接进行指定规则 (callback) 的解析操作

        Rule(link, callback='parse_item', follow=True),
        Rule(link_detail, callback='parse_detail')

    )

    # 解析新闻编号、标题
    def parse_item(self, response):
        li_list = response.xpath('/html/body/div[2]/div[3]/ul[2]/li')
        for li in li_list:
            new_num = li.xpath('./span[1]/text()').extract_first()
            new_title = li.xpath('./span[3]/a/text()').extract_first()
            item = SunproItem()
            item['title'] = new_title
            item['new_num'] = new_num
            yield item

    # 解析新闻内容、编号
    def parse_detail(self, response):
        new_id = response.xpath('/html/body/div[3]/div[2]/div[2]/div[1]/span[4]/text()').extract_first()
        new_content = response.xpath('/html/body/div[3]/div[2]/div[2]/div[2]/pre/text()').extract_first()
        new_content = ''.join(new_content)
        item = DetailItem()
        item['new_id'] = new_id
        item['content'] = new_content
        yield item

```

`items.py`

```python

import scrapy

class SunproItem(scrapy.Item):
    title = scrapy.Field()
    new_num = scrapy.Field()

class DetailItem(scrapy.Item):
    new_id = scrapy.Field()
    content = scrapy.Field()

```

`pipelines.py`

```python

class SunproPipeline:
    def process_item(self, item, spider):
        # 判定item类型
        if item.__class__.__name__ == 'DetailItem':
            print(item['new_id'], item['content'])
        else:
            print(item['new_num'], item['title'])
        return item

```

`settings.py`

```python
USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11'

ROBOTSTXT_OBEY = False

LOG_ERROR = 'ERROR'

DOWNLOAD_DELAY = 3

ITEM_PIPELINES = {
   'sunPro.pipelines.SunproPipeline': 300,
}
```

