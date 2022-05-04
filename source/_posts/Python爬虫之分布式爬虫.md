---
title: Python爬虫之分布式爬虫
top: false
cover: false
toc: true
mathjax: true
date: 2021-11-24 10:45:17
password:
summary: 学习分布式爬虫、增量式爬虫----------------------------
tags: Python
categories: 爬虫
---

- 搭建分布式机群,让其对一组资源进行分布式联合爬取
- 提升爬取效率
- 实现分布式:
  - pip install scrapy-redis
- scrapy-redis 组件的作用:
  - 给原生的scrapy框架提供可以被共享的管道和调度器

---

### 分布式爬虫

实现步骤:

- ` scrapy startproject firstdemo `
- `scrapy genspider -t crawl xxx [www.xxx.com`](http://www.xxx.com/)
- 修改当前爬虫文件
  - 导包 : `from scrapy_redis.spiders import RedisCrawlSpider`
  - 将`start_urls`和`allowed_domains`进行注释 
  - 添加新属性: `redis_key = 'sun' `可以被共享的调度器的名称
  - 编写数据解析相关操作
  - 将当前爬虫类的父类修改成`RedisCrawlSpider`
- 修改配置文件`settings`
- 指定使用可以被共享的管道
  - `ITEM_PIPELINES = {    'scrapy_redis.pipelines.RedisPipeline': 400}`
- 指定调度器
  - 增加一个去重容器类的配置,使用`redis`的`set`集合来存储请求的指纹数据,从而实现请求去重的持久化 `DUPEFILTER_CLASS = 'scrapy_redis.dupefilter.RFPDupeFilter'`
  - 使用`scrapy_redis`组件 自己的调度器` SCHEDULER = 'scrapy_redis.scheduler.Scheduler'`
  - 配置调度器是否要持久化,也就是当爬虫结束,是否要清空`Redis`中请求队列和去重指纹`set`(人话:爬虫一般机器宕机了,重启后是否继续爬虫还是从0开始) `SCHEDULER_PERSIST = True`
- 指定`redis`服务器
  - `REDIS_HOST = '127.0.0.1'`
  - `REDIS_PORT = 6379`

- `redis`相关操作配置

  - linux或mac:
    - `redis.conf`

  - windows:`redis.windows.conf`
    - 将`bind 127.0.0.1` 删除
    - 关闭保护模式 `protected-mode yes` 改为 `no`
  - 结合配置文件开启redis服务
    - `redis-server redis.windows.conf`
  - 启动客户端
    - `redis-cli`

- 执行工程

  - `scrapy runspider xxx.py`
  - 向调度器队列(redis)中放入一个起始url
    - `lpush xxx www.xx.com`
  - 查看队列中所有的内容和数量:
    - `lrange xx:items 0 -1`
    - `llen xx:items`

- 最终爬取到的数据存储在了`redis`的`proName:items`这个数据结构中

---

代码实现

`sun2.py`

```python

from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from scrapy_redis.spiders import RedisCrawlSpider
from sun2Pro.items import Sun2ProItem
class Sun2Spider(RedisCrawlSpider):
    name = 'sun2'
    redis_key = 'sun'


    rules = (
        Rule(LinkExtractor(allow=r'id=2&page=\d+'), callback='parse_item', follow=True),
    )

    def parse_item(self, response):
        li_list = response.xpath('/html/body/div[2]/div[3]/ul[2]/li')
        for li in li_list:
            new_num = li.xpath('./span[1]/text()').extract_first()
            new_title = li.xpath('./span[3]/a/text()').extract_first()
            item = Sun2ProItem()
            item['title'] = new_title
            item['new_num'] = new_num
            yield item


```

`items`

```python
import scrapy

class Sun2ProItem(scrapy.Item):
    title = scrapy.Field()
    new_num = scrapy.Field()
```

`settings`

```python
DOWNLOAD_DELAY = 3
# 指定管道
ITEM_PIPELINES = {
    'scrapy_redis.pipelines.RedisPipeline': 400
}
# 指定调度器
# 增加一个去重容器类的配置,使用redis的set集合来存储请求的指纹数据,从而实现请求去重的持久化
DUPEFILTER_CLASS = 'scrapy_redis.dupefilter.RFPDupeFilter'
# 使用scrapy_redis组件 自己的调度器
SCHEDULER = 'scrapy_redis.scheduler.Scheduler'
# 配置调度器是否要持久化,也就是当爬虫结束,是否要清空Redis中请求队列和去重指纹set(人话:爬虫一般机器宕机了,重启后是否继续爬虫还是从0开始)
SCHEDULER_PERSIST = True
# 指定redis
REDIS_HOST = '127.0.0.1'
REDIS_PORT = 6379
```

### 增量式爬虫

- 监测网站数据更新情况,只会爬取网站最新出来的数据
- **核心**:监测页面url之前是否请求过
  - 将爬取过的url存储到`redis`的`set`数据结构中
- 查看所有的 `urls` : `semebers urls`

---

案例演示

`movie.py`

```python
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from redis import Redis
from moviePro.items import MovieproItem


class MovieSpider(CrawlSpider):
    name = 'movie'

    start_urls = ['http://www.male37.live/index.php/vod/type/id/2/page/2.html']

    rules = (
        # Rule(LinkExtractor(allow=r'/id/3/page/\d+/\.html'), callback='parse_item', follow=True),
        Rule(LinkExtractor(allow=r'id/\d+/page/\d+\.html'), callback='parse_item', follow=True),
    )
    conn = Redis(host='127.0.0.1', port=6379)

    def parse_item(self, response):
        li_list = response.xpath('/html/body/div[1]/div/div[1]/div/div/div[2]/ul/li')
        for li in li_list:
            detail_url = 'http://www.male37.live' + li.xpath('./div/a/@href').extract_first()
            ex = self.conn.sadd('urls', detail_url)
            if ex == 1:
                print('该url没有被爬取过,可以进行数据爬取!')
                yield scrapy.Request(url=detail_url, callback=self.parse_detail)
            else:
                print('数据还没更新,暂无新数据可爬取!')

    def parse_detail(self, response):
        item = MovieproItem()
        item['name'] = response.xpath(
            '/html/body/div[1]/div/div[1]/div[1]/div/div/div/div[2]/h1/text()').extract_first()
        print(item['name'], '--------------')
        item['desc'] = response.xpath(
            '/html/body/div[1]/div/div[1]/div[1]/div/div/div/div[2]/p[5]/span[2]').extract_first()
        item['desc'] = ''.join(item['desc'])
        yield item

```

`items.py`

```python
import scrapy


class MovieproItem(scrapy.Item):
    name = scrapy.Field()
    desc = scrapy.Field()
```

`pipelines.py`

```python
class MovieproPipeline:
    conn = None

    def open_spider(self, spider):
        self.conn = spider.conn

    def process_item(self, item, spider):
        dic = {
            'name': item['name'],
            'desc': item['desc']
        }
        print(dic)
        self.conn.lpush('movieData', dic)
        return item
```

`settings`

```python
REDIS_HOST = '127.0.0.1'
REDIS_PORT = 6379

ITEM_PIPELINES = {
   'moviePro.pipelines.MovieproPipeline': 300,
}
```

