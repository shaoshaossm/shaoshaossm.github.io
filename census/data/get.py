import requests

from requests.adapters import HTTPAdapter

from requests.packages.urllib3.util import Retry
from requests.packages.urllib3.util.retry import Retry


import time, datetime,random
user_agent_list = ["Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
				"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
				"Mozilla/5.0 (Windows NT 10.0; WOW64) Gecko/20100101 Firefox/61.0",
				"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36",
				"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36",
				"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
				"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
				"Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.5; en-US; rv:1.9.2.15) Gecko/20110303 Firefox/3.6.15",
				]
headers = {'User-Agent': random.choice(user_agent_list)}
s = requests.Session()

retry_strategy = Retry(
    total=5,
    status_forcelist=[429, 500, 502, 503, 504],
    method_whitelist=['GET', 'POST']
)
s = requests.Session()
s.mount('https://', HTTPAdapter(max_retries=retry_strategy)) # 设置 post()方法进行重访问
s.mount('http://',HTTPAdapter(max_retries=retry_strategy)) # 设置 post()方法进行重访问
#s.mount('https://', HTTPAdapter(max_retries=Retry(total=5, method_whitelist=frozenset(['GET', 'POST'])))) # 设置 post()方法进行重访问
#s.mount('http://', HTTPAdapter(max_retries=Retry(total=5, method_whitelist=frozenset(['GET', 'POST'])))) # 设置 post()方法进行重访问

# 开始统计的日期
start_date   = '20220401'
date         = datetime.datetime.now()
# 结束统计的日期
end_date     = str(date.year) + (str(date.month) if date.month > 9 else ('0' + str(date.month))) + (str(date.day) if date.day > 9 else ('0' + str(date.day)))
# token和siteid
#需要修改为你的token和siteid  ######################################################################################################    改这里就好了
access_token = '122.1211df52fb0964365ecda3e9c3529e65.YaP35xdlXfpeFo63Z2An2Pbub0t3Op-IPnOfaYA.DeLg_Q'
site_id      = '17830328'
# 百度统计API 
dataUrl      = 'https://openapi.baidu.com/rest/2.0/tongji/report/getData?access_token=' + access_token + '&site_id=' + site_id
# 统计访问次数 PV 填写 'pv_count'，统计访客数 UV 填写  'visitor_count'，二选一
metrics      = 'pv_count'
ips      = 'visitor_count'

def downFile(url, fileName, prefix=''):
    print('downloading :', url)
    down_res = requests.get(url)
    with open(prefix+fileName, 'wb') as f:
        f.write(down_res.content)
        time.sleep(2)
    print('writing :', prefix+fileName)

time.sleep(2)	
# 访客地图
downFile(dataUrl + '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=visit/district/a', 
    'map.json')

time.sleep(2)		
# 访问趋势
downFile(dataUrl + '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=trend/time/a&gran=month', 
    'pv.json')
time.sleep(2)	
downFile(dataUrl + '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + ips + '&method=trend/time/a&gran=month', 
    'uv.json')
time.sleep(2)	
# 访问来源
downFile(dataUrl + '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=source/all/a', 
    'sources.json')
time.sleep(2)	

## 搜索引擎
downFile(dataUrl + '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=source/engine/a', 
    'engine.json')

time.sleep(2)	
## 外部链接
downFile(dataUrl + '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=source/link/a', 
    'link.json')
time.sleep(2)	
# 访问日历
'''
访问日历需要获取一年内的数据，按照一年365天计算，大概为52周多一点，所以前面有完整的52排，获取方式只要通过开始日期年份-1即可
然后就是第53排的处理，python中的date.weekday()获取的星期几是0对应周一，所以通过(date.weekday()+1)%7即可转换到0对应周日
于是在52周的基础上，减去星期数，就可以得到新的start_date
'''
date       = datetime.datetime(date.year-1, date.month, date.day)
date       = datetime.datetime.fromtimestamp(date.timestamp()-3600*24*((date.weekday()+1)%7))
start_date = str(date.year) + (str(date.month) if date.month > 9 else ('0' + str(date.month))) + (str(date.day) if date.day > 9 else ('0' + str(date.day)))
downFile(dataUrl + '&method=overview/getTimeTrendRpt' + '&metrics=' + metrics + '&start_date=' + start_date + '&end_date=' + end_date,
    'calendar.json')
time.sleep(2)	
	
downFile(dataUrl + '&method=overview/getTimeTrendRpt' + '&metrics=' + ips + '&start_date=' + start_date + '&end_date=' + end_date,
    'ipcalendar.json')
