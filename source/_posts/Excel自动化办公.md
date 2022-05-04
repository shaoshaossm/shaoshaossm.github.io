---
title: Excel自动化办公
top: false
cover: false
toc: true
mathjax: true
date: 2022-02-16 12:29:02
password:
summary: 使用Python处理Excel电子表格------------------------------
tags: Python
categories: office
---

### 安装

```bash
pip install openpyxl==3.0.7
```

### 基本操作

```python
import openpyxl

print(openpyxl.__version__)
# 用openpyxl读取excel表格
wb = openpyxl.load_workbook('信息表.xlsx')
print(wb)
# 获取工作蒲sheet表名称
sheet1 = wb.sheetnames
print("sheet表名称:\n", sheet1)
# 获取指定sheet对象
sheet = wb['基本信息']
print(sheet)
# 获取活动表(目前活动的表)
print(wb.active)
# 从表中获取单元格
cell = sheet['A4']  # 创建一个cell对象
# 参数
print(cell.value)  # value:cell中存储的值
print(cell.row)  # 行索引
print(cell.column)  # 列索引
print(cell.coordinate)  # 坐标
# 用字母指定行列
print(sheet.cell(row=4, column=2).value)
#  遍历一个矩形区域中的所有cell对象

for cell_row in sheet['A3':'D8']:
    for cell in cell_row:
        print(cell.coordinate, cell.value)
# 访问特定行或列的单元格的值,利用worksheet对象的rows和column属性
print(list(sheet.columns))
for cell in list(sheet.columns)[0]:
    print(cell.value)
# 获取工作表中最大行和最大列的数量
print('--------------------------')
print(sheet.max_row, sheet.max_column)

```

### 案例演示

```python
import openpyxl, pprint

print('opening workbook...')
wb = openpyxl.load_workbook('人口统计简易表.xlsx')
sheet = wb['人口统计表']
print(wb.sheetnames)
# countryData将包含计算的每个县的总人口和普查区数目
countyData = {}
print('Reading rows...')

for row in range(2, sheet.max_row + 1):
    state = sheet['B' + str(row)].value
    county = sheet['C' + str(row)].value
    pop = sheet['D' + str(row)].value
    countyData.setdefault(state, {})
    countyData[state].setdefault(county, {'tracts': 0, 'pop': 0})
    countyData[state][county]['tracts']+=1
    countyData[state][county]['pop']+=int(pop)
print('Writing results...')
resultFile = open('census2022.py','w')
# 将countyData数据写入到addData字典中
resultFile.write('allData = '+pprint.pformat(countyData))
resultFile.close()
print('Done')

```

```py
import os
import census2022

print(census2022.allData['AL']['FT'])
```

### 写入数据基本操作

```python
import openpyxl

wb = openpyxl.Workbook()
print(wb)
print(wb.sheetnames)
sheet = wb.active
# 设置sheet名称
sheet.title = '跟进记录表'
print(wb.sheetnames)
# 保存
wb.save('第一个工作蒲.xlsx')
# 创建和删除工作表
wb = openpyxl.load_workbook('第一个工作蒲.xlsx')
wb.create_sheet(title='销售记录')
wb.create_sheet(index=1, title='养殖记录')  # 下标为1的位置
del wb['养殖记录']
print(wb.sheetnames)
wb.save('第一个工作蒲.xlsx')
# 写入数据
sheet = wb['销售记录']
sheet['A1'] = 'hello'
sheet['B1'] = 'world'
wb.save('第一个工作蒲.xlsx')

```

### 定向修改数据

```python
import openpyxl

wb = openpyxl.load_workbook('电子产品价格表.xlsx')
sheet = wb['Sheet1']
PRICE_UPDATES = {'苹果': 3,
                 '香蕉': 4,
                 '橘子': 5
                 }
for rowNum in range(2, sheet.max_row + 1):
    productName = sheet.cell(row=rowNum, column=1).value
    if productName in PRICE_UPDATES:
        sheet.cell(row=rowNum, column=2).value = PRICE_UPDATES[productName]
wb.save('updateProductsSales.xlsx')

```

### 单元格样式制定

```python
from openpyxl.styles import Font, PatternFill, Side, Border, Alignment
import openpyxl

wb = openpyxl.Workbook()
sheet = wb.active
sheet['A1'] = '字体'
# italic: 斜体 underline: 下划线 b: 加粗 color: RGB值
sheet['A1'].font = Font(name='楷体', color='8470FF', size=12, italic=True, underline='single', b=True)
# cell填充色
sheet['A2'].fill = PatternFill(patternType='solid', fgColor='8470FF')
# 设置边框样式
sheet['A4'] = '效果1'
sheet['A5'] = '效果2'
s1 = Side(style='thin', color='8470FF')
s2 = Side(style='double', color='8470FF')
sheet['A4'].border = Border(top=s1)
sheet['A5'].border = Border(top=s2, bottom=s1, left=s2, right=s1)

sheet['B1'] = '效果1'
sheet['B2'] = '效果2'
sheet['B3'] = '效果3'
B1 = sheet['B1'].alignment = Alignment(horizontal='right')
B2 = sheet['B2'].alignment = Alignment(horizontal='center')
B3 = sheet['B3'].alignment = Alignment(horizontal='general')

wb.save('styles.xlsx')

```

### 数据过滤

```python
from openpyxl.styles import Alignment
import openpyxl

wb = openpyxl.load_workbook('数据筛选表.xlsx')
sheet = wb['Sheet1']
sheet.auto_filter.ref = 'A1:D4'
# add_filter_culumn 参数1：指定列 参数2：筛选内容
sheet.auto_filter.add_filter_column(1, ['北京', '上海'])
# add_sort_condition 参数1: 指定区域 参数2：升降序
sheet.auto_filter.add_sort_condition(ref='D2:D4', descending=True)
wb.save('数据筛选表.xlsx')

```

### 公式

```python
import openpyxl
wb = openpyxl.Workbook()
sheet = wb.active
sheet['A1'] = 200
sheet['A2'] = 100
sheet['A3'] = '=SUM(A1:A2)'
wb.save('sum.xlsx')
wb = openpyxl.load_workbook('sum.xlsx',read_only=True)
sheet = wb.active
print(sheet['A3'].value)
```

### 单元格

```python
import openpyxl
wb = openpyxl.load_workbook('行和列.xlsx')
sheet = wb['Sheet1']
print(sheet.row_dimensions)
print(sheet.column_dimensions)
# 设置行高
sheet.row_dimensions[2].height = 50
# 设置列宽
sheet.column_dimensions['A'].width = 80
# 合并
sheet.merge_cells('D1:G5')
sheet['D1'] = 'hello'
# 拆分
sheet.unmerge_cells('D1:G5')
wb.save('行和列.xlsx')
```

