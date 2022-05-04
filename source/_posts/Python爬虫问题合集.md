---
title: Python问题合集
top: false
cover: false
toc: true
mathjax: true
date: 2021-11-16 16:57:33
password:
summary: 总结Python学习中遇到的所有问题----------------------------
tags: Python
categories: 爬虫
---

### 中文乱码

```python
# 通用中文乱码的解决方案
img_name = img_name.encode('iso-8859-1').decode('gbk')
# 手动设置相应数据的编码格式
response = requests.get(url=url, headers=headers)
response.encoding = 'utf-8'
#  text -> content
response.text 改成 response.content
```

### 爬虫

- 解决python爬虫`requests.exceptions.SSLError: HTTPSConnectionPool(host='XXX', port=443)`问题

1. 安装`cryptography`、`pyOpenSSL`、`certifi`三个模块即可

```bash
pip install cryptography
pip install pyOpenSSL
pip install certifi
```

- requests库提示警告：`InsecureRequestWarning: Unverified HTTPS request is being made. Adding certificate ver`

1. 加入如下代码即可

```python
requests.packages.urllib3.disable_warnings()
```

- 提取html文件报错`lxml.etree.XMLSyntaxError: Opening and ending tag mismatch: meta line 4 and head`

```python
原因在于html标签未加 / 所有的标签最好都用 / 来结束
```

- `TypeError: can only concatenate str (not “list”) to str`(列表和字符串的报错解决方法)

```python
# 强转即可
str(title)
```

- 警告`DeprecationWarning: executable_path has been deprecated, please pass in a Service object`

```python
# 是使用api过期导致此警告 使用这个（测试案例）即可
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

s = Service("chromedriver.exe")
driver = webdriver.Chrome(service=s)
driver.get('https://www.baidu.com/')
driver.quit() 

```

- 标签定位不到`selenium.common.exceptions.ElementNotInteractableException: Message: element not interactable`

```python
# 使用标签的绝对定位
bro.find_element(By.XPATH,''
```

- l类型错误 :`TypeError: ‘ItemMeta‘ object does not support item assignment`

```python
# 报错原因：未找到具体item，load出错，item后面需要加()进行实例化。
item = MeinvproItem()
```

- scrapy框架写入数据库中存储数据部分代码报错 `redis.exceptions.DataError: Invalid input of type: 'dict'. Convert to a byte, string or number first. `

```python
# 使用旧版本pip install redis==2.10.6，即可解决
```



### jupyter

- 每次打开jupyter提示如下行信息

![autopep8](https://img-blog.csdnimg.cn/2bad4a8b136c4f35a72dcd06bf0f74b3.png)

```bash
pip install autopep8
```

- 设置代码提示功能

```bash
# 安装nbextensions
pip install jupyter_contrib_nbextensions -i https://pypi.mirrors.ustc.edu.cn/simple
jupyter contrib nbextension install --user
-------------------------------------------------------------------------------------------------------------------
# 安装nbextensions_configurator
pip install --user jupyter_nbextensions_configurator 
jupyter nbextensions_configurator enable --user
# 勾选Hinterland启用代码自动补全
```























































