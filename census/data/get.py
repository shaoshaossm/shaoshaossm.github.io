import requests
import time, datetime

# 开始统计的日期
start_date   = '20220401'
date         = datetime.datetime.now()
# 结束统计的日期
end_date     = str(date.year) + (str(date.month) if date.month > 9 else ('0' + str(date.month))) + (str(date.day) if date.day > 9 else ('0' + str(date.day)))
# token和siteid
#需要修改为你的token和siteid
access_token = '121.a3e99577f2965334517ab0fc9b474dea.Y7cxEIJRk5jddaIQ6Jv9KMHThZpgCIZS_XxcoWx.kpkAkA'
site_id      = '17830328'
# 百度统计API
dataUrl      = 'https://openapi.baidu.com/rest/2.0/tongji/report/getData?access_token=' + access_token + '&site_id=' + site_id
# 统计访问次数 PV 填写 'pv_count'，统计访客数 UV 填写 'visitor_count'，二选一
metrics      = 'pv_count'
ips      = 'visitor_count'

def downFile(url, fileName, prefix=''):
    print('downloading :', url)
    down_res = requests.get(url)
    with open(prefix+fileName, 'wb') as f:
        f.write(down_res.content)
    print('writing :', prefix+fileName)

# 访客地图
downFile(dataUrl + '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=visit/district/a', 
    'map.json')

# 访问趋势
downFile(dataUrl + '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=trend/time/a&gran=month', 
    'pv.json')
downFile(dataUrl + '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + ips + '&method=trend/time/a&gran=month', 
    'uv.json')
# 访问来源
downFile(dataUrl + '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=source/all/a', 
    'sources.json')

## 搜索引擎
downFile(dataUrl + '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=source/engine/a', 
    'engine.json')

## 外部链接
downFile(dataUrl + '&start_date=' + start_date + '&end_date=' + end_date + '&metrics=' + metrics + '&method=source/link/a', 
    'link.json')

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
downFile(dataUrl + '&method=overview/getTimeTrendRpt' + '&metrics=' + ips + '&start_date=' + start_date + '&end_date=' + end_date,
    'ipcalendar.json')
