---
title: Python爬虫之selenium学习
top: false
cover: false
toc: true
mathjax: true
date: 2021-11-19 16:41:17
password:
summary: 对selenium模块的学习和使用----------------------
tags: Python
categories: 爬虫
---

### 基本概述

- `selenium`可以便捷的获取网站中的动态加在的数据
- `selenium`可以便捷的实现模拟登陆
- `selenium`是基于浏览器自动化的一个模块

### 使用流程

```bash
pip install selenium
```

- 查看google浏览器版本号

```bash
# 在浏览器中输入
chrome://version/
```

- 选择合适的版本

```bash
http://chromedriver.storage.googleapis.com/index.html
```

- 将下载好的`chromedriver.exe`放入开发目录中即可
- 运行测试

```python
from selenium import webdriver
bro = webdriver.Chrome(executable_path='./chromedriver')
```

#### 案例演示1.：

```python
from selenium import webdriver
from lxml import html
from time import sleep
bro = webdriver.Chrome(executable_path='./chromedriver')
bro.get('http://scxk.nmpa.gov.cn:81/xk/')
# 获取浏览器当前页面的页面源码数据
page_text = bro.page_source
tree = html.etree.HTML(page_text)

li_list = tree.xpath('//ul[@id="gzlist"]/li')
for li in li_list:
    name = li.xpath('./dl/@title')[0]
    print(name)
sleep(4)
bro.quit()
```

#### 案例演示2.：

```python
from selenium import webdriver
from time import sleep
from selenium.webdriver.common.by import By

bro = webdriver.Chrome(executable_path='./chromedriver')
bro.get('https://lol.qq.com/main.shtml')
# 获取浏览器当前页面的页面源码数据
bro.execute_script('window.scrollTo(0,document.body.scrollHeight)')
sleep(2)
search_btn=bro.find_element(By.ID,'J_headSearchBtn')

# search_btn = bro.find_element_by_id('J_headSearchBtn')
search_btn.click()
search_input = bro.find_element_by_id('J_hoverSearchInput')
search_input.send_keys('无限火力')
btn = bro.find_element_by_id('J_hoverSearchBtn')
btn.click()
bro.get('https://www.4399.com')
sleep(3)

bro.back()
sleep(3)
bro.forward()
sleep(5)
bro.quit()
```

#### 案例演示3.:

```python
from selenium import webdriver
from time import sleep
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains

bro = webdriver.Chrome(executable_path='./chromedriver')

bro.get('https://www.runoob.com/try/try.php?filename=jqueryui-api-droppable')
# 如果定位的标签在iframe标签中，需如下操作
bro.switch_to.frame('iframeResult')  # 切换浏览器标签的作用域
div = bro.find_element(By.ID, 'draggable')
# 动作链
action = ActionChains(bro)
# 点击长按指定的标签
action.click_and_hold(div)
for i in range(13):
    # (x,y) x: 水平 y： 竖直
    action.move_by_offset(17, 0).perform()
    sleep(0.3)
# 释放动作链
action.release()
sleep(5)
bro.quit()
```

#### qq空间自动登录签到

```python
from selenium import webdriver
from time import sleep
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains

bro = webdriver.Chrome(executable_path='./chromedriver')

bro.get('https://qzone.qq.com/')
# 如果定位的标签在iframe标签中，需如下操作
bro.switch_to.frame('login_frame')  # 切换浏览器标签的作用域

a_tag = bro.find_element(By.ID, 'switcher_plogin')
a_tag.click()
username_tag = bro.find_element(By.ID, 'u')
password_tag = bro.find_element(By.ID, 'p')
sleep(1)
username_tag.send_keys('')
sleep(1)
password_tag.send_keys('')
sleep(1)
btn = bro.find_element(By.ID, 'login_button')
btn.click()
sleep(3)
qiandao = bro.find_element(By.ID, 'checkin_button')
qiandao.click()
bro.switch_to.frame('checkin_likeTipsFrame')

qiandao_img = bro.find_element(By.CLASS_NAME, 'detail-box')
qiandao_img.click()
fabu = bro.find_element(By.CLASS_NAME, 'btn-submit')
fabu.click()
sleep(10)
bro.quit()

```

#### 验证码识别并自动登录

```python
# 验证码模拟登陆
from selenium import webdriver
import time
import chaojiying
from PIL import Image
from selenium.webdriver.common.by import By

if __name__ == "__main__":
    bro = webdriver.Chrome(executable_path='./chromedriver')
    bro.maximize_window()
    bro.get("http://changyan.kuaizhan.com/")
    time.sleep(1)

    # tanchuangguanbi = bro.find_element(By.CLASS_NAME, ' icon-raw-error ')
    tanchuangguanbi = bro.find_element_by_class_name('icon-raw-error ')
    tanchuangguanbi.click()
    time.sleep(1)

    btn = bro.find_element_by_class_name('c-button')
    btn.click()
    time.sleep(2)
    bro.save_screenshot('aa.png')
    code_img_ele = bro.find_element_by_xpath('//*[@id="vcode-img"]')
    # 获取验证码
    # 验证码左上角坐标x，y
    location = code_img_ele.location
    print('location: ', location)
    # 验证码对应的长宽
    size = code_img_ele.size
    print('size', size)
    rangle = (
        int(location['x'])*1.25,int(location['y'])*1.25,int((location['x']) + size['width'])*1.25,int((location['y']) + size['height'])*1.25
    )
    print(rangle)
    i = Image.open('./aa.png')
    code_img_name = './code.png'
    frame = i.crop(rangle)
    frame.save(code_img_name)
    # 解析验证码
    chaojiying = chaojiying.Chaojiying_Client('手机号', '密码', '925040')  # 用户中心>>软件ID 生成一个替换 96001
    im = open('./code.png', 'rb').read()  # 本地图片文件路径 来替换 a.jpg 有时WIN系统须要//
    code = chaojiying.PostPic(im, 1004)
    code_img = code['pic_str']
    print(code_img)  # 1902 验证码类型  官方网站>>价格体系 3.4+版 print 后要加()
    username_tag = bro.find_element(By.ID, 'normal_login_name')
    username_tag.send_keys('手机号')
    time.sleep(2)
    password_tag = bro.find_element(By.ID, 'normal_login_password')
    password_tag.send_keys('密码')
    time.sleep(2)
    text = bro.find_element_by_id('normal_login_vcode').text
    print(text)
    # fullXpath 相对路径定位不到
    Verification_code = bro.find_element(By.XPATH,'/html/body/div/div/div[4]/div[2]/div[2]/form/div[3]/div/div/div/div/div[1]/input')
    Verification_code.send_keys(code_img)
    time.sleep(2)
    Login_btn = bro.find_element_by_class_name('login-form-button')
    Login_btn.click()
    time.sleep(50)
	bro.quit()
```

#### Google 无头浏览器

```python
from selenium import webdriver
from time import sleep
# 无可视化界面
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
# 规避selenium检测
from selenium.webdriver import ChromeOptions

# 实现无可视化界面的操作
chrome_options = Options()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')

# 实现规避检测
option = ChromeOptions()
option.add_experimental_option('excludeSwitches', ['enable-automation'])

s = Service("chromedriver.exe")
driver = webdriver.Chrome(service=s)

# bro = webdriver.Chrome(executable_path='./chromedriver',options=chrome_options)
bro = webdriver.Chrome(chrome_options=chrome_options, options=option)

bro.get('https://qzone.qq.com/')
print(bro.page_source)

sleep(3)
bro.quit()

```









