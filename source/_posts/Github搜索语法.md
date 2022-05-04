---
title: Github搜索语法
top: false
cover: false
toc: true
mathjax: true
date: 2021-11-25 14:02:03
password:
summary: 对GitHub搜索语法的学习--------------------------
tags: git
categories: 版本控制
---

 可以使⽤[搜索](https://github.com/)页面或[高级搜索](https://github.com/search)页面来搜索GitHub 

| Query | Examples                                                    |
| ----- | ----------------------------------------------------------- |
| >n    | cats stars:>100 匹配关键字“cats”且stars大于100的仓库        |
| <n    | cats stars:>100 匹配关键字“cats”且stars小于100的仓库        |
| >=n   | cats stars:>=100 匹配关键字“cats”且stars大于等于100的仓库   |
| <=n   | cats stars:<=100 匹配关键字“cats”且stars小于等于100的仓库   |
| n..*  | cats stars:100..* 匹配关键字“cats”且stars大于等于100的仓库  |
| *..n  | cats stars:*..100 匹配关键字“cats”且stars小于等于100的仓库  |
| n..n  | cats stars:10..50 匹配关键字“cats”且stars大于10小于50的仓库 |

### 搜索代码

#### 注意事项

-  只能搜索⼩于384 KB的⽂件。
-  只能搜索少于500,000个⽂件的存储库。
-  登录的⽤户可以搜索所有公共存储库 。
- 除`filename`搜索外，搜索源代码时，必须包含一个搜索词。例如：搜索`language:java`无效，而是这样：`amazing language:java`
-  搜索结果最多可以显示来⾃同⼀⽂件的两个⽚段，但⽂件中可能会有更多结果。  
-  不能将以下通配符用作搜索查询的一部分`. , : ; / \  ' " = * ! ? # $ & + ^ | ~ < > ( ) { } [ ]`,搜索将忽略这些符号。

#### 日期条件

`cats pushed:<2012-07-05` 搜索在2012年07⽉05⽇前push代码，且cats作为关键字

` cats pushed:2016-04-30..2016-07-04 `⽇期区间

` cats created:>=2017-04-01 `创建时间

#### 逻辑运算

AND、OR、NOT

#### 排除运算

`cats pushed:<2012-07-05 -language:java `搜索在2012年07⽉05⽇前push代码，且cats作为关键字，排除 `java `语⾔仓库。

#### 包含搜索

`cats in:file` 搜索⽂件中包含cats的代码

`cats in:path` 搜索路径中包含cats的代码

`cats in:path,file `搜索路径、⽂件中包含cats的代码

`console path:app/public language:javascript` 搜索关键字`console`，且语⾔为javascript，在app/public下的代码

#### 主体搜索

`user:USERNAME` ⽤户名搜索

`org: ORGNAME` 组织搜索

`repo:USERNAME/REPOSITORY` 指定仓库搜索

#### 文件大小

`size>10000`搜索大小大于1kb的文件

#### 文件名称

` filename:config.php language:php ` 搜索文件名为config.php,且语言为php的代码

 #### 扩展名 

`extension:EXTENSION `**指定扩展名**

### 常见用法示例

` in:name mini-app` #仓库标题搜索含有关键字"mini-app"

` in:descripton web` #仓库描述搜索含有关键字"web" 

`in:readme node #README`文件搜素含有关键字"node" 

`org:github`` #匹配github名下的仓库

` stars:>3000` #stars数量大于3000的搜索仓库

` stars:1000..3000` #stars数量大于1000小于3000的仓库

` forks:>1000` #forks数量大于1000的搜索关键字

` forks:1000..3000 `#forks数量大于1000小于3000的搜索仓库

` size:>=5000` #指定仓库大于5000k(5M)的搜索仓库

` pushed:>2019-02-12` #发布时间大于2019-02-12的仓库

` created:>2019-02-12` #创建时间大于2019-02-12的仓库

` mirror:true(false)` #是否是镜像仓库 archived:true(false) #是否是废弃的仓库

` user:jack` #用户名为"jack"的仓库

` license:apache-2.0` #仓库的 LICENSE为"apache-2.0"

` language:java` #使用"java"语言的仓库

` user:jack in:name web` #组合搜索,用户名为"jack",且标题含有"web"的

` topic:jekyll` #匹配topic中含有关键字"jekyll"的仓库

` topic:5` #匹配拥有5个topic的仓库

` topic:>3` #匹配拥有3个以上topic的仓库

` is:public` #公开的仓库

` is:private` #匹配有权限的私有仓库 

---

案例演示：

`in:name spring cloud stars:>3000 pushed:>2021-10-01`

`in:description 植物大战僵尸 stars:>100 language：java`

`in:readme 植物大战僵尸 stars:>100 created:>2019`