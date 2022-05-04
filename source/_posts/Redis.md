---
title: Redis
top: false
cover: false
toc: true
mathjax: false
date: 2022-04-14 18:16:36
password:
img: https://img-blog.csdnimg.cn/57b7107d43574e2ebbdc62e848b42bd3.png
summary: 掌握Redis五大数据类型、常用操作命令、Redis持久化、主从复制、事务控制以及用Jedis等
tags: Redis
categories: 数据库
---

### 简介

- Remote Dictionary Server(远程字典服务器),是一个用C语言编写的、开源的、基于内存运行并支持持久化的、高性能的NoSQL[数据库](https://baike.baidu.com/item/数据库).也是当前热门的NoSQL数据库之一。

**特点**

- 支持数据持久化
  - Redis支持数据的持久化，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用。

- 支持多种数据结构
  - Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。

- 支持数据备份
  - Redis支持数据的备份，即master-slave模式的数据备份。

### 安装

> linux上安装，这个以前已经安装好，此处不在赘述，如需安装参考文档（阿里云盘有）

### 启动

#### 前台启动

> 在任何目录下执行： redis-server

#### 后台启动

> 在任何目录下执行： redis-server &

#### 常用启动

> 在任何目录下执行：启动redis服务时，指定配置文件：redis-server redis.conf &

**Redis3.2.9**

```sh
cd usr/java/redis-3.2.9/src/
# 启动
./redis-server ../redis.conf &
# 指定连接客户端 -p 指定端口号
./redis-cli -a 123456 -h 192.168.174.131
# 关闭
redis-cli -a 123456 -h 192.168.174.131 shutdown
```

> 默认连接的是本机本地的redis

### 基本知识

- 测试redis性能

```sh
[root@localhost src] redis-benchmark -a 123456 -h 192.168.174.131
```

- 查看redis服务是否正常运行

```sh
# 进入客户端
./redis-cli -a 123456 -h 192.168.174.131
ping
```

![PONG](https://img-blog.csdnimg.cn/33c311fa2e9b4f42b7ead3cf8321bd70.png)

- 查看redis服务器的统计信息

```sh
# 进入客户端
./redis-cli -a 123456 -h 192.168.174.131
info # 查看redis服务器的所有的统计信息
info [信息段]# 查看redis服务器的指定的统计信息，如 info Replication
```

- 默认创建 16个数据库，指定使用数据库

```sh
select index # index:0-15
```

- 查看当前数据库实例中key的数目 

```sh
dbsize
```

- 查看当前数据库实例中所有的key 

```sh
keys *
```

- 清空数据库实例 

```sh
flushdb
```

- 清空所有数据库实例

```sh
flushall
```

- 查看redis中所有的配置信息

```sh
config get *
```

- 查看redis中指定的配置信息

```bash
# 查看redis中占用的端口号
config get port # get 后跟参数
```

#### redis的5种数据结构

- 字符串类型`string`

  - 字符串类型是`Redis`中最基本的数据结构，它能存储任何类型的数据，包括二进制数据，序列化后的数据，JSON化的对象甚至是一张图片。最大512M。

  - | key      | value |
    | :------- | ----- |
    | username | 张三  |

- 列表类型`list`

  - `Redis`列表是简单的字符串列表，按照插入顺序排序，元素可以重复。你可以添加一个元素到列表的头部（左边）或者尾部（右边）,底层是个链表结构。

  - | key    | value          |
    | :----- | -------------- |
    | region | 北京 上海 天津 |

- 集合类型`set`

  - `Redis`的`Set`是`string`类型的无序无重复集合。

  - <table>
    	<tr>
    	    <th>key</th>
    	    <th>value</th>
    	</tr >
    	<tr >
    	    <td rowspan="3">framework</td>
    	    <td>spring</td>
    	</tr>
    	<tr>
    	    <td>mybatis</td>
    	</tr>
    	<tr>
    	    <td>springcloud</td>
    	</tr>
    </table>

- 哈希类型`hash`

  - `Redis hash` 是一个`string`类型的`field`和`value`的映射表，hash特别适合用于存储对象。

  - | key    | loginuser |
    | ------ | --------- |
    | field  | value     |
    | uname  | 张三      |
    | times  | 6         |
    | region | 北京      |

    

- 有序集合类型`zset （sorted set）`

  - `Redis `有序集合`zset`和集合`set`一样也是`string`类型元素的集合，且不允许重复的成员。不同的是`zset`的每个元素都会关联一个分数（分数可以重复），`redis`通过分数来为集合中的成员进行从小到大的排序。
  
  - <table>
    	<tr>
    	    <th>key</th>
    	    <th>value score</th>
    	</tr >
    	<tr >
    	    <td rowspan="3">salary</td>
    	    <td>张三 3500</td>
    	</tr>
    	<tr>
    	    <td>李四 5000</td>
    	</tr>
    	<tr>
    	    <td>王五 6500</td>
    	</tr>
    </table>

### 常用操作命令

#### redis中有关key的操作命令

##### keys

- 语法：keys pattern

- 作用：查找所有符合模式pattern的key. pattern可以使用通配符。

> 通配符：
>
> - *：表示0或多个字符，例如：keys * 查询所有的key。
>
> - ？：表示单个字符，例如：wo?d , 匹配 word , wood
>
> - [] ：表示选择[]内的一个字符，例如wo[or]d, 匹配word, wood, 不匹配wold、woord

![keys](https://img-blog.csdnimg.cn/7ce0463a877d4cb0a5c958d2e14be982.png)

##### exists

- 语法：exists key [key…]

- 判断key在数据库中是否存在

> 返回值：整数，存在key返回1，其他返回0。使用多个key，返回存在的key的数量。

![exists](https://img-blog.csdnimg.cn/f28c2e05d7094935bb2b36626f18e1d9.png)

##### move

- 语法：move key db

- 作用：移动key到指定的数据库，移动的key在原库被删除。

> 返回值：移动成功返回1，失败返回0.

![move](https://img-blog.csdnimg.cn/1fad6d09e3944e3ab08dac273a3b7534.png)

##### ttl

- 语法：ttl key

- 作用：查看key的剩余生存时间（ttl: time to live），以秒为单位。

> 返回值：
>
> l -1 ：没有设置key的生存时间， key永不过期。
>
> l -2：key不存在

![ttl](https://img-blog.csdnimg.cn/a283a91c013c49c2ab91d29129b0e316.png)

##### expire

- 语法：expire key seconds

- 作用：设置key的生存时间，超过时间，key自动删除。单位是秒。

> 返回值：设置成功返回数字 1，其他情况是 0 。

![expire](https://img-blog.csdnimg.cn/34be0de0e8c74a1bbda9f02cd4b26caf.png)

##### type

- 语法：type key

- 作用：查看key所存储值的数据类型

> 返回值：字符串表示的数据类型

![type](https://img-blog.csdnimg.cn/60fb511dae98471caaf19c4a3ace0dec.png)

##### rename

- 语法：rename key newkey
- 作用：将key改为名newkey。当 key 和 newkey 相同，或者 key 不存在时，返回一个错误。

> 当 newkey 已经存在时， RENAME 命令将覆盖旧值。

![rename](https://img-blog.csdnimg.cn/5ad76e59ba4741a9972529a92598102b.png)

##### del

- 语法：del key [key…]

- 作用：删除存在的key，不存在的key忽略。

> 返回值：数字，删除的key的数量。

![del](https://img-blog.csdnimg.cn/8257a6345e6b4d819edb9e4db27737e8.png)

#### 字符串类型（string）

> 字符串类型是Redis中最基本的数据类型，它能存储任何形式的字符串，包括二进制数据，序列化后的数据，JSON化的对象甚至是一张图片。
>
> 字符串类型的数据操作总的思想是通过key操作value，key是数据标识，value是我们感兴趣的业务数据。

##### set

- 语法：set key value
- 功能：将字符串值 value 设置到 key 中，如果key已存在，后放的值会把前放的值覆盖掉。

> 返回值：OK表示成功

![set](https://img-blog.csdnimg.cn/7c280ced48b14d63bf02b9ddb981cc1b.png)

##### get

- 语法：get key

- 功能：获取 key 中设置的字符串值

> 返回值：key存在，返回key对应的value；key不存在，返回nil

![get](https://img-blog.csdnimg.cn/3e934b2c4d214c02ab2684e1b3bd36af.png)

##### append

- 语法：append key value

- 功能：如果 key 存在，则将 value 追加到 key 原来旧值的末尾如果 key 不存在，则将key 设置值为 value

> 返回值：追加字符串之后的总长度(字符个数)

![append](https://img-blog.csdnimg.cn/e36388e9f51a4243857bc5e7e3efbad7.png)

##### strlen

- 语法：strlen key
- 功能：返回 key 所储存的字符串值的长度

> 返回值：如果key存在，返回字符串值的长度；key不存在，返回0

![strlen](https://img-blog.csdnimg.cn/21828ab991724d3b8260b068010664b3.png)

##### incr

- 语法：incr key
- 功能：将 key 中储存的数字值加1，如果 key 不存在，则 key 的值先被初始化为 0 再执行incr操作。

> 返回值：返回加1后的key值

![incr](https://img-blog.csdnimg.cn/bfd3334fec104214b24f5870644ab2d3.png)

#####       decr

- 语法：decr key

- 功能：将 key 中储存的数字值减1，如果 key 不存在，则么 key 的值先被初始化为 0 再执行 decr 操作。

> 返回值：返回减1后的key值

![decr](https://img-blog.csdnimg.cn/ed24544f8f034110aeff2b988407f816.png)

##### incrby

- 语法：incrby key offset

- 功能：将 key 所储存的值加上增量值，如果 key 不存在，则 key 的值先被初始化为 0 再执行 INCRBY 命令。

> 返回值：返回增量之后的key值。

![incrby](https://img-blog.csdnimg.cn/4570234fd69845cfbbe874156e09b2a0.png)

##### decrby

- 语法：decrby key offset

- 功能：将 key 所储存的值减去减量值，如果 key 不存在，则 key 的值先被初始化为 0 再执行 DECRBY 命令。

> 返回值：返回减量之后的key值。

![decrby](https://img-blog.csdnimg.cn/bc9cda4d1474474f9622a2b0ee3f9d3d.png)

##### getrange

- 语法：getrange key startIndex endIndex
- 功能：获取 key 中字符串值从 startIndex 开始到 endIndex 结束的子字符串,包括startIndex和endIndex, 负数表示从字符串的末尾开始，-1 表示最后一个字符。

> 返回值：截取后的字符串

![setrange](https://img-blog.csdnimg.cn/21ec81aa9bd34bccad00940aad3c982c.png)

##### setrange

- 语法：setrange key offsetIndex value
- 功能：用value覆盖key的存储的值从offset开始。

> 返回值：修改后的字符串的长度。

![getrange](https://img-blog.csdnimg.cn/1dfb0caa1d4f4c30ab45c6af7ce3ffa3.png)

##### setex

- 语法：setex key seconds value

- 功能：设置key的值，并将 key 的生存时间设为 seconds (以秒为单位) ，如果key已经存在，将覆盖旧值。

> 返回值：设置成功，返回OK。

![setex](https://img-blog.csdnimg.cn/8152a56690d84a9584d4c21cafb467c3.png)

##### setnx

- 语法：setnx key value

- 功能：setnx 是 set if not exists 的简写，如果key不存在，则 set 值，存在则不设置值。

> 返回值：设置成功，返回1

![setnx](https://img-blog.csdnimg.cn/1bf03d6bf0a94c5d9d72a062c408f4c3.png)

##### mset

- 语法：mset key value [key value…]

- 功能：同时设置一个或多个 key-value 对

> 返回值：设置成功，返回OK。

![mset](https://img-blog.csdnimg.cn/f2b4c3a8400944e1915feab13a373548.png)

##### mget

- 语法：mget key [key …]

- 功能：获取所有(一个或多个)给定 key 的值

> 返回值：包含所有key的列表，如果key不存在，则返回nil。

##### msetnx

- 语法：msetnx key value[key value…]

- 功能：同时设置一个或多个 key-value 对，如果有一个key是存在的，则设置不成功。

> 返回值：设置成功，返回1设置失败，返回0

![msetnx](https://img-blog.csdnimg.cn/d25d21cb390e476b9f131258bec0b2f9.png)

#### 列表（list）

> Redis列表是简单的字符串列表，按照插入顺序排序，左边（头部）、右边（尾部）或者中间都可以添加元素。链表的操作无论是头或者尾效率都极高，但是如果对中间元素进行操作，那效率会大大降低了。
>
> 列表类型的数据操作总的思想是通过key和下标操作value，key是数据标识，下标是数据在列表中的位置，value是我们感兴趣的业务数据。

##### lpush

- 语法：lpush key value [value…]

- 功能：将一个或多个值 value 插入到列表 key 的最左边（表头），各个value值依次插入到表头位置。

> 返回值：插入之后的列表的长度。

![lpush](https://img-blog.csdnimg.cn/8f702ed367cf43358e93f364f51ac567.png)

##### rpush

- 语法：rpush key value [value…]

- 功能：将一个或多个值 value 插入到列表 key 的最右边（表尾），各个 value 值按依次插入到表尾。

> 返回值：插入之后的列表的长度。

![rpush](https://img-blog.csdnimg.cn/ad658410e5b040f099ce70b848bb3c2b.png)

##### lrange

- 语法：lrange key startIndex endIndex

- 功能：获取列表 key 中指定下标区间内的元素，下标从0开始，到列表长度-1；下标也可以是负数，表示列表从后往前取，-1表示倒数第一个元素，-2表示倒数第二个元素，以此类推；startIndex和endIndex超出范围不会报错。

> 返回值：获取到的元素列表。

![lrange](https://img-blog.csdnimg.cn/ea4e60cac40b43cd80ba62e17ee05f42.png)

##### rpop

- 语法：rpop key

- 功能：移除并返回列表key尾部第一个元素，即列表右侧的第一个元素。

> 返回值：列表右侧第一个元素的值；列表key不存在，返回nil。

![rpop](https://img-blog.csdnimg.cn/78118f04f4924fdeb725c0ccdc4e387f.png)

##### lindex

- 语法：lindex key index

- 功能：获取列表 key 中下标为指定 index 的元素，列表元素不删除，只是查询。0 表示列表的第一个元素，1 表示列表的第二个元素；index也可以负数的下标， -1 表示列表的最后一个元素， -2 表示列表的倒数第二个元素，以此类推。

> 返回值：key存在时，返回指定元素的值；Key不存在时，返回nil。

![lindex](https://img-blog.csdnimg.cn/f51f35644ac54b08a0bdac3e28b99e80.png)

##### llen

- 语法：llen key

- 功能：获取列表 key 的长度

> 返回值：数值，列表的长度；key不存在返回0

![llen](https://img-blog.csdnimg.cn/fe2930e7005e4734a8134054c40357b0.png)

##### lrem

- 语法：lrem key count value

- 功能：根据参数 count 的值，移除列表中与参数 value 相等的元素，
  - count >0 ，从列表的左侧向右开始移除；
  - count < 0 从列表的尾部开始移除；
  - count = 0移除表中所有与 value 相等的值。

> 返回值：数值，移除的元素个数

![lrem](https://img-blog.csdnimg.cn/68dcc4de97e3440d9db21682f581df81.png)

##### ltrim

- 语法：ltrim key startIndex endIndex

- 功能：截取key的指定下标区间的元素，并且赋值给key。下标从0开始，一直到列表长度-1；下标也可以是负数，表示列表从后往前取，-1表示倒数第一个元素，-2表示倒数第二个元素，以此类推；startIndex和endIndex超出范围不会报错。

> 返回值：执行成功返回ok

![ltrim](https://img-blog.csdnimg.cn/b55b407609484f1d8c385a2f8174df89.png)

##### lset

- 语法：lset key index value

- 功能：将列表 key 下标为 index 的元素的值设置为 value。

> 设置成功返回ok ; key不存在或者index超出范围返回错误信息。

![lset](https://img-blog.csdnimg.cn/1d8644e0e8714fe6b094d55838adf7fa.png)

##### linsert

- 语法：linsert key before/after pivot value

- 功能：将值 value 插入到列表 key 当中位于值 pivot 之前或之后的位置。key不存在或者pivot不在列表中，不执行任何操作。

> 返回值：命令执行成功，返回新列表的长度。没有找到pivot返回 -1， key不存在返回0。

![linsert](https://img-blog.csdnimg.cn/77487b5c3f9f4ef98272b3ebe0ada696.png)

#### 集合类型（set）

> Redis的Set是string类型的无序不重复集合。
>
> 集合类型的数据操作总的思想是通过key确定集合，key是集合标识，元素没有下标，只有直接操作业务数据和数据的个数。

##### sadd

- 语法：sadd key member [member…]

- 功能：将一个或多个 member 元素加入到集合 key 当中，已经存在于集合的 member 元素将被忽略，不会再加入。

> 返回值：加入到集合的新元素的个数(不包括被忽略的元素)。

![sadd](https://img-blog.csdnimg.cn/cfc25b6b3b154895970a26a94122cb29.png)

#####  smembers

- 语法：smembers key

- 功能：获取集合 key 中的所有成员元素，不存在的key视为空集合。

> 返回值：返回指定集合的所有元素集合，不存在的key，返回空集合。

![smembers](https://img-blog.csdnimg.cn/2313c7417dc6460eacf4d14d0242760d.png)

##### sismember

- 语法：sismember key member

- 功能：判断 member 元素是否是集合 key 的元素

> 返回值：member是集合成员返回1，其他返回 0 。

![sismember](https://img-blog.csdnimg.cn/ae358edee3bc4fafb7628ee833277e71.png)

##### scard

- 语法：scard key

- 功能：获取集合里面的元素个数

> 返回值：数字，key的元素个数。其他情况返回 0 。

![scard](https://img-blog.csdnimg.cn/c4194f4167af4190bf6c455b49fb525f.png)

##### srem

- 语法：srem key member [member…]

- 功能：移除集合中一个或多个元素，不存在的元素被忽略。

> 返回值：数字，成功移除的元素个数，不包括被忽略的元素。

![srem](https://img-blog.csdnimg.cn/26c922784c99447a9a86966ead7079dc.png)

##### srandmember

- 语法：srandmember key[count]

- 功能：只提供key，随机返回集合中一个元素，元素不删除，依然在集合中；提供了count时，count 正数, 返回包含count个数元素的集合，集合元素各不重复。count是负数，返回一个count绝对值的长度的集合，集合中元素可能会重复多次。

> 返回值：一个元素或者多个元素的集合

![srandmember](https://img-blog.csdnimg.cn/07f6f2dcd57b4db8945952837819c3c8.png)

##### spop

- 语法：spop key[count]

- 功能：随机从集合中删除一个或count个元素。

> 返回值：被删除的元素，key不存在或空集合返回nil。

![spop](https://img-blog.csdnimg.cn/6629c2b06a004ed09daef6228d549bd1.png)

##### smove

- 语法：smove src dest member

- 功能：将 member 元素从src集合移动到dest集合，member不存在，smove不执行操作，返回0，如果dest存在member，则仅从src中删除member。

> 返回值：成功返回 1 ，其他返回 0 。

![smove](https://img-blog.csdnimg.cn/54fa17d3fb654566833fb53eeab7439e.png)

##### sdiff

- 语法：sdiff key key [key…]

- 功能：返回指定集合的差集，以第一个集合为准进行比较，即第一个集合中有但在其它任何集合中都没有的元素组成的集合。

> 返回值：返回第一个集合中有而后边集合中都没有的元素组成的集合，如果第一个集合中的元素在后边集合中都有则返回空集合。

![sdiff](https://img-blog.csdnimg.cn/7ff9e7bae7f042f687f5eeef4c27f5b1.png)

##### sinter

- 语法：sinter key key [key…]

- 功能：返回指定集合的交集，即指定的所有集合中都有的元素组成的集合。

> 返回值：交集元素组成的集合，如果没有则返回空集合。

![sinter](https://img-blog.csdnimg.cn/65850261a5b84aa59e55a2a66d17b3d2.png)

##### sunion

- 语法：sunion key key [key…]

- 功能：返回指定集合的并集，即指定的所有集合元素组成的大集合，如果元素有重复，则保留一个。

> 返回值：返回所有集合元素组成的大集合，如果所有key都不存在，返回空集合。

![sunion](https://img-blog.csdnimg.cn/34e5a6110390472e8f110e2a93e1cc43.png)

#### 哈希类型（hash）

> Redis的hash 是一个string类型的key和value的映射表，这里的value是一系列的键值对，hash特别适合用于存储对象。
>
> 哈希类型的数据操作总的思想是通过key和field操作value，key是数据标识，field是域，value是我们感
>
> 兴趣的业务数据。

##### hset

- 语法：hset key field value  [field value …]

- 功能：将键值对field-value设置到哈希列表key中，如果key不存在，则新建哈希列表，然后执行赋值，如果key下的field已经存在，则value值覆盖。

> 返回值：返回设置成功的键值对个数。

![hset](https://img-blog.csdnimg.cn/3725bd24074b4e4094c37ea87349d885.png)

##### hget

- 语法：hget key field

- 功能：获取哈希表 key 中给定域 field 的值。

> 返回值：field域的值，如果key不存在或者field不存在返回nil。

![hget](https://img-blog.csdnimg.cn/95183cb268fd43a38ef4dab840b117c5.png)

##### hmset

- 语法：hmget key field [field…]

- 功能：获取哈希表 key 中一个或多个给定域的值

> 返回值：返回和field顺序对应的值，如果field不存在，返回nil。

![hmset](https://img-blog.csdnimg.cn/96818eb24b964245b867a90a630e469b.png)

##### hmget

- 语法：hmget key field [field…]

- 功能：获取哈希表 key 中一个或多个给定域的值

> 返回值：返回和field顺序对应的值，如果field不存在，返回nil。

![hmget](https://img-blog.csdnimg.cn/ac38e18c251e4c969885f14635d2aeac.png)

##### hgetall

- 语法：hgetall key

- 功能：获取哈希表 key 中所有的域和值

> 返回值：以列表形式返回hash中域和域的值，key不存在，返回空hash.

![hgetall](https://img-blog.csdnimg.cn/5bf0b4422a134a949491f49c6f3dafed.png)

##### hdel

- 语法：hdel key field [field…]

- 功能：删除哈希表 key 中的一个或多个指定域field，不存在field直接忽略。

> 返回值：成功删除的field的数量。

![hdel](https://img-blog.csdnimg.cn/d6b857174a64443f812b77242d706cba.png)

##### hlen

- 语法：hlen key

- 功能：获取哈希表 key 中域field的个数

> 返回值：数值，field的个数。key不存在返回0.

![hlen](https://img-blog.csdnimg.cn/9c19988aea30476183ad8f7f1a7c20ad.png)

##### hexists

- 语法：hexists key field

- 功能：查看哈希表 key 中，给定域 field 是否存在

> 返回值：如果field存在，返回1，其他返回0。

![hexists](https://img-blog.csdnimg.cn/2b4440ee965d4681938c8f04c6ba7207.png)

##### hkeys

- 语法：hkeys key

- 功能：查看哈希表 key 中的所有field域列表

> 返回值：包含所有field的列表，key不存在返回空列表

![hkeys](https://img-blog.csdnimg.cn/0026d05f2e0e466eb434b4f449f44ccc.png)

##### hvals

- 语法：hvals key

- 功能：返回哈希表 中所有域的值列表

> 返回值：包含哈希表所有域值的列表，key不存在返回空列表。

![hvals](https://img-blog.csdnimg.cn/622c1a58148249caa3f04257d6938163.png)

##### hincrby

- 语法：hincrby key field int

- 功能：给哈希表key中的field域增加int

> 返回值：返回增加之后的field域的值

![hincrby](https://img-blog.csdnimg.cn/9dcc8094be0944b6bd8bc17801ea19e3.png)

##### hincrbyfloat

- 语法：hincrbyfloat key field float

- 功能：给哈希表key中的field域增加float

> 返回值：返回增加之后的field域的值

![hincrbyfloat](https://img-blog.csdnimg.cn/98e4409a07eb41dfb88aeefe6fc6ddd1.png)

##### hsetnx

- 语法：hsetnx key field value

- 功能：将哈希表 key 中的域 field 的值设置为 value ，当且仅当域 field 不存在的时候才设置，否则不设置。

> 返回值：设值成功返回1，其他返回0.

![hsetnx](https://img-blog.csdnimg.cn/7529b63343e1417181f4db53ed396031.png)

#### 有序集合类型(Zset)

> Redis 有序集合zset和集合set一样也是string类型元素的集合，且不允许重复的成员。
>
> 不同的是zset的每个元素都会关联一个分数（分数可以重复），redis通过分数来为集合中的成员进行从小到大的排序。

##### zadd

- 语法：zadd key score member [score member…]

- 功能：将一个或多个 member 元素及其 score 值加入到有序集合 key 中，如果member存在集合中，则覆盖原来的值；score可以是整数或浮点数.

> 返回值：数字，新添加的元素个数.

![zadd](https://img-blog.csdnimg.cn/eab6979bbeb34045a58174b3b6b1ccc5.png)

##### zrange

- 语法：zrange key startIndex endIndex [WITHSCORES]

- 功能：查询有序集合，指定区间的内的元素。集合成员按score值从小到大来排序；startIndex和endIndex都是从0开始表示第一个元素，1表示第二个元素，以此类推； startIndex和endIndex都可以取负数，表示从后往前取，-1表示倒数第一个元素；WITHSCORES选项让score和value一同返回。

> 返回值：指定区间的成员组成的集合。

![zrange](https://img-blog.csdnimg.cn/a5641ba276f74e3bb207dcd5095a13d1.png)

##### zrangebyscore

- 语法：zrangebyscore key min max [WITHSCORES ] [LIMIT offset count]

- 功能：获取有序集 key 中，所有 score 值介于 min 和 max 之间（包括min和max）的成员，有序成员是按递增（从小到大）排序；使用符号”(“ 表示包括min但不包括max；withscores 显示score和 value；limit用来限制返回结果的数量和区间，在结果集中从第offset个开始，取count个。

> 返回值：指定区间的集合数据

![zrangebyscore](https://img-blog.csdnimg.cn/63b1cfd45f3a4aa69afdbbf9d498c91d.png)

![zrangebyscore](https://img-blog.csdnimg.cn/31705db925b54315ab92f3a4062090f5.png)

##### zrem

- 语法：zrem key member [member…]

- 功能：删除有序集合 key 中的一个或多个成员，不存在的成员被忽略。

> 返回值：被成功删除的成员数量，不包括被忽略的成员。

![zrem](https://img-blog.csdnimg.cn/391895dbb5984073bfadf949d9e15c37.png)

##### zcard

- 语法：zcard key

- 作用：获取有序集 key 的元素成员的个数。

> 返回值：key存在，返回集合元素的个数； key不存在，返回0。

![zcard](https://img-blog.csdnimg.cn/667cd347dec441c1ad3e2e5c8bab75f3.png)

##### zcount

- 语法：zcount key min max

- 功能：返回有序集 key 中， score 值在 min 和 max 之间(包括 score 值等于 min 或 max )的成员的数量。

> 返回值：指定有序集合中分数在指定区间内的元素数量。

![zcount](https://img-blog.csdnimg.cn/0bc3cdf8f8944742947be25ebb851c74.png)

##### zrank

- 语法：zrank key member

- 功能：获取有序集 key 中成员 member 的排名，有序集成员按 score 值从小到大顺序排列，从0开始排名，score最小的是0 。

> 返回值：指定元素在有序集合中的排名；如果指定元素不存在，返回nil。

![zrank](https://img-blog.csdnimg.cn/f0d19721eaf046caad789707ebc4de46.png)

##### zscore

- 语法：zscore key member

- 功能：获取有序集合key中元素member的分数。

> 返回值：返回指定有序集合元素的分数。

![zscore](https://img-blog.csdnimg.cn/6ad4247f2cdf4b98893d4aaab8d1c60c.png)

##### zrevrank

- 语法：zrevrank key member

- 功能：获取有序集 key 中成员 member 的排名，有序集成员按 score 值从大到小顺序排列，从0开始排名，score最大的是0 。

> 返回值：指定元素在有序集合中的排名；如果指定元素不存在，返回nil。

![zrevrank](https://img-blog.csdnimg.cn/5f56c3d110734b22b906e4e258213a98.png)

#####  zrevrange

- 语法：zrevrange key startIndex endIndex [WITHSCORES]

- 功能：查询有序集合，指定区间的内的元素。集合成员按score值从大到小来排序；startIndex和endIndex都是从0开始表示第一个元素，1表示第二个元素，以此类推； startIndex和endIndex都可以取负数，表示从后往前取，-1表示倒数第一个元素；WITHSCORES选项让score和value一同返回。

> 返回值：指定区间的成员组成的集合。

![zrevrange](https://img-blog.csdnimg.cn/85f39c0314454b85ab84e602074c0355.png)

##### zrevrangebyscore

- 语法：zrevrangebyscore key max min  [WITHSCORES ] [LIMIT offset count]

- 功能：获取有序集 key 中，所有 score 值介于 max 和 min 之间（包括max和min）的成员，有序成员是按递减（从大到小）排序；使用符号”(“ 表示不包括min和max；withscores 显示score和 value；limit用来限制返回结果的数量和区间，在结果集中从第offset个开始，取count个。

> 返回值：指定区间的集合数据

![zrevrangebyscore](https://img-blog.csdnimg.cn/67493bf04fbd4eed97195b992d56ba12.png)

### 新数据类型

#### Bitmaps

> - Bitmaps本身不是一种数据类型， 实际上它就是字符串（key-value） ， 但是它可以对字符串的位进行操作。
>
> - Bitmaps单独提供了一套命令， 所以在Redis中使用Bitmaps和使用字符串的方法不太相同。 可以把Bitmaps想象成一个以位为单位的数组， 数组的每个单元只能存储0和1， 数组的下标在Bitmaps中叫做偏移量。

##### setbit

- 格式：setbit<key><offset><value>设置Bitmaps中某个偏移量的值（0或1）*offset:偏移量从0开始

![setbit](https://img-blog.csdnimg.cn/70d5a7f612704609874821ff62fa5237.png)

> 很多应用的用户id以一个指定数字（例如10000） 开头， 直接将用户id和Bitmaps的偏移量对应势必会造成一定的浪费， 通常的做法是每次做setbit操作时将用户id减去这个指定数字。
>
> 在第一次初始化Bitmaps时， 假如偏移量非常大， 那么整个初始化过程执行会比较慢， 可能会造成Redis的阻塞。

##### getbit

- 格式：getbit<key><offset>获取Bitmaps中某个偏移量的值

> 获取键的第offset位的值（从0开始算）
>
> 返回值有的返回1，没有的返回0

![getbit](https://img-blog.csdnimg.cn/6966f99f2a424799b380e4b591698a77.png)

##### bitcount

> 统计**字符串**被设置为1的bit数。一般情况下，给定的整个字符串都会被进行计数，通过指定额外的 start 或 end 参数，可以让计数只在特定的位上进行。start 和 end 参数的设置，都可以使用负数值：比如 -1 表示最后一个位，而 -2 表示倒数第二个位，start、end 是指bit组的字节的下标数，二者皆包含。

- 格式：bitcount<key>[start end] 统计字符串从start字节到end字节比特值为1的数量

> 返回key的数量

![在这里插入图片描述](https://img-blog.csdnimg.cn/7e79c818e0de4d6893515556ee0dd076.png)

>  注意：redis的setbit设置或清除的是bit位置，而bitcount计算的是byte位置。

##### bitop

- 格式：bitop and(or/not/xor) <destkey> [key…]
- bitop是一个复合操作， 它可以做多个Bitmaps的and（交集） 、 or（并集） 、 not（非） 、 xor（异或） 操作并将结果保存在destkey中。

![bitop](https://img-blog.csdnimg.cn/1b594a669d614bb1a7f14a1c10b75e9f.png)

> 常用于统计活跃用户数量

#### HyperLogLog

> `Redis HyperLogLog` 是用来做基数统计的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定的、并且是很小的。
>
> 在 Redis 里面，每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。
>
> 但是，因为 HyperLogLog 只会根据输入元素来计算基数，而不会储存输入元素本身，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。

>  什么是基数?
>
> 比如数据集 {1, 3, 5, 7, 5, 7, 8}， 那么这个数据集的基数集为 {1, 3, 5 ,7, 8}, 基数(不重复元素)为5。 基数估计就是在误差可接受的范围内，快速计算基数。

##### pfadd

格式：pfadd <key>< element> [element ...]  添加指定元素到 HyperLogLog 中

> 将所有元素添加到指定HyperLogLog数据结构中。如果执行命令后HLL估计的近似基数发生变化，则返回1，否则返回0。

![pfadd](https://img-blog.csdnimg.cn/466a7eb9aa674643a16ee742737c141d.png)

##### pfcount

- 格式：pfcount<key> [key ...] 计算HLL的近似基数，可以计算多个HLL，比如用HLL存储每天的UV，计算一周的UV可以使用7天的UV合并计算即可

> 返回key的数量

![pfcount](https://img-blog.csdnimg.cn/274c5fe4746d409eadfee63c31af0c06.png)

##### pfmerge

- 格式：pfmerge<destkey><sourcekey> [sourcekey ...] 将一个或多个HLL合并后的结果存储在另一个HLL中，比如每月活跃用户可以使用每天的活跃用户来合并计算可得

![在这里插入图片描述](https://img-blog.csdnimg.cn/14df20c298e6410ea270e7f1787adb22.png)

#### Geospatial

> Redis 3.2 中增加了对GEO类型的支持。GEO，Geographic，地理信息的缩写。该类型，就是元素的2维坐标，在地图上就是经纬度。redis基于该类型，提供了经纬度设置，查询，范围查询，距离查询，经纬度Hash等常见操作。

##### geoadd

- 格式：geoadd<key>< longitude><latitude><member> [longitude latitude member...]  添加地理位置（经度，纬度，名称）

![geoadd](https://img-blog.csdnimg.cn/dbe3a147c5e8484090e3b3514f379b4c.png)

> - 两极无法直接添加，一般会下载城市数据，直接通过 Java 程序一次性导入。
>
> - 有效的经度从 -180 度到 180 度。有效的纬度从 -85.05112878 度到 85.05112878 度。
>
> - 当坐标位置超出指定范围时，该命令将会返回一个错误。
>
> - 已经添加的数据，是无法再次往里面添加的。

##### geopos

- 格式：geopos <key><member> [member...] 获得指定地区的坐标值

![geopos](https://img-blog.csdnimg.cn/43e5975d961648868806c248b7706c7c.png)





##### geodist

- 格式：geodist<key><member1><member2> [m|km|ft|mi ] 获取两个位置之间的直线距离

![geodist](https://img-blog.csdnimg.cn/0073a7e8b5074c309415625dadd056d7.png)

> 单位：
>
> m 表示单位为米[默认值]。
>
> km 表示单位为千米。
>
> mi 表示单位为英里。
>
> ft 表示单位为英尺。
>
> 如果用户没有显式地指定单位参数， 那么 GEODIST 默认使用米作为单位

##### georadius

格式：georadius<key>< longitude><latitude>radius m|km|ft|mi  以给定的经纬度为中心，找出某一半径内的元素

> m|km|ft|mi  ：经度 纬度 距离 单位

![georadius](https://img-blog.csdnimg.cn/5f51fdd8c1eb4d8283f55471cd06502a.png)

### Redis的配置文件

#### redis.conf

> - Redis的安装根目录下(/opt/redis-5.0.2)，Redis在启动时会加载这个配置文件，在运行时按照配置进行工作。 这个文件有时候我们会拿出来，单独存放在某一个位置，启动的时候<font color="red">必须明确指定</font>使用哪个配置文件，此文件才会生效。

#### 网络配置

> - `bind`：绑定IP地址，其它机器可以通过此IP访问Redis，默认绑定127.0.0.1，也可以修改为本机的IP地址。
>
> - `port`：配置Redis占用的端口，默认是6379。
>
> - `tcp-keepalive`：TCP连接保活策略，可以通过tcp-keepalive配置项来进行设置，单位为秒，假如设置为60秒，则server端会每60秒向连接空闲的客户端发起一次ACK请求，以检查客户端是否已经挂掉，对于无响应的客户端则会关闭其连接。如果设置为0，则不会进行保活检测。

#### 常规配置

> - `loglevel`：日志级别，开发阶段可以设置成debug，生产阶段通常设置为notice或者warning.
>
> - `logfile`：指定日志文件名，如果不指定，Redis只进行标准输出。要保证日志文件所在的目录必须存在，文件可以不存在。还要在redis启动时指定所使用的配置文件，否则配置不起作用。
>
> - `databases`：配置Redis数据库的个数，默认是16个。

#### 安全配置

> - `requirepass`：配置Redis的访问密码。默认不配置密码，即访问不需要密码验证。此配置项需要在protected-mode=yes时起作用。使用密码登录客户端：redis-cli -h ip -p 6379 -a pwd

### Redis持久化

> `redis`是内存数据库，它把数据存储在内存中，这样在加快读取速度的同时也对数据安全性产生了新的问题，即当`redis`所在服务器发生宕机后，redis数据库里的所有数据将会全部丢失。为了解决这个问题，`redis`提供了持久化功能——`RDB`和`AOF`（Append Only File）。

#### RDB配置

> - save <seconds> <changes>：配置复合的快照触发条件，即Redis 在seconds秒内key改变changes次，Redis把快照内的数据保存到磁盘中一次。默认的策略是：
>
>   - <font color="orange">1分钟内改变了1万次</font>
>
>   - <font color="orange">或者5分钟内改变了10次</font>
>
>   - <font color="orange">或者15分钟内改变了1次</font>
>
>     > 如果要禁用Redis的持久化功能，则把所有的save配置都注释掉。
>
> - `stop-writes-on-bgsave-error`：当bgsave快照操作出错时停止写数据到磁盘，这样能保证内存数据和磁盘数据的一致性，但如果不在乎这种一致性，要在bgsave快照操作出错时继续写操作，这里需要配置为no。
>
> - `rdbcompression`：设置对于存储到磁盘中的快照是否进行压缩，设置为yes时，Redis会采用LZF算法进行压缩；如果不想消耗CPU进行压缩的话，可以设置为no，关闭此功能。
>
> - `rdbchecksum`：在存储快照以后，还可以让Redis使用CRC64算法来进行数据校验，但这样会消耗一定的性能，如果系统比较在意性能的提升，可以设置为no，关闭此功能。
>
> - `dbfilename`：Redis持久化数据生成的文件名，默认是dump.rdb，也可以自己配置。
>
> - `dir`：Redis持久化数据生成文件保存的目录，默认是./即redis的启动目录，也可以自己配置。

> RDB策略：在指定时间间隔内，redis服务执行指定次数的写操作，会自动触发一次持久化操作。
>
> RDB策略是redis默认的持久化策略，redis服务开启时这个持久化策略就已经默认开启了。

#### AOF配置

> - `appendonly`：配置是否开启AOF，yes表示开启，no表示关闭。默认是no。
>
> - `appendfilename`：AOF保存文件名
>
> - `appendfsync`：AOF异步持久化策略
>   - `always`：同步持久化，每次发生数据变化会立刻写入到磁盘中。性能较差但数据完整性比较好（慢，安全）
>   - ` everysec`：出厂默认推荐，每秒异步记录一次（默认值）
>   - ` no`：不即时同步，由操作系统决定何时同步。
>
> - `no-appendfsync-on-rewrite`：重写时是否可以运用appendsync，默认no，可以保证数据的安全性。
>
> - `auto-aof-rewrite-percentage`：设置重写的基准百分比
>
> - `auto-aof-rewrite-min-size`：设置重写的基准值

> 采用操作日志来记录进行每一次写操作，每次redis服务启动时，都会重新执行一遍操作日志中的指令。
>
> 效率低下，redis默认不开启AOF功能。

#### 小结

> 根据数据的特点决定开启那种持久化策略，一般情况，使用默认的开启RDB策略就够了。

### Redis事务

> Redis的事务允许在一次单独的步骤中执行一组命令，并且能够保证将一个事务中的所有命令序列化，然后按顺序执行；在一个Redis事务中，Redis要么执行其中的所有命令，要么什么都不执行。即Redis的事务要能够保证序列化和原子性。

#### Redis事务常用命令

##### multi

- 语法：multi

- 功能：用于标记事务块的开始。Redis会将后续的命令逐个放入队列中，然后才能使用EXEC命令原子化地执行这个命令序列。

> 返回值：开启成功返回OK

![multi](https://cdn.jsdelivr.net/gh/shaoshaossm/images/blog/image-20220416201834415.png)

##### exec

- 语法：exec

- 功能：在一个事务中执行所有先前放入队列的命令，然后恢复正常的连接状态。
  - <font color="orange">如果在把命令压入队列的过程中报错，则整个队列中的命令都不会执行，执行结果报错；</font>
  - <font color="orange">如果在压队列的过程中正常，在执行队列中某一个命令报错，则只会影响本条命令的执行结果，其它命令正常运行；</font>
  - 当使用WATCH命令时，只有当受监控的键没有被修改时，EXEC命令才会执行事务中的命令;而一旦执行了exec命令，之前加的所有watch监控全部取消。

> 返回值：这个命令的返回值是一个数组，其中的每个元素分别是原子化事务中的每个命令的返回值。 当使用WATCH命令时，如果事务执行中止，那么EXEC命令就会返回一个Null值。

![exec](https://cdn.jsdelivr.net/gh/shaoshaossm/images/blog/image-20220416201923645.png)

##### discard

- 语法：discard

- 功能：清除所有先前在一个事务中放入队列的命令，并且结束事务。如果使用了WATCH命令，那么DISCARD命令就会将当前连接监控的所有键取消监控。

> 返回值：清除成功，返回OK。

![discard](https://cdn.jsdelivr.net/gh/shaoshaossm/images/blog/image-20220416202000998.png)

#### 事务冲突问题

一个请求想给金额减8000

一个请求想给金额减5000

一个请求想给金额减1000

![不加事务](https://img-blog.csdnimg.cn/44df8e94e65b4455ab184669469d7a6b.png)

##### 悲观锁

> **悲观锁(Pessimistic Lock)**, 顾名思义，就是很悲观，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会block直到它拿到锁。**传统的关系型数据库里边就用到了很多这种锁机制**，比如**行锁**，**表锁**等，**读锁**，**写锁**等，都是在做操作之前先上锁。

![悲观锁](https://img-blog.csdnimg.cn/d827ff86092749cd87233b23df546bab.png)

##### 乐观锁

> **乐观锁(Optimistic Lock),** 顾名思义，就是很乐观，每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去更新这个数据，可以使用版本号等机制。**乐观锁适用于多读的应用类型，这样可以提高吞吐量**。Redis就是利用这种check-and-set机制实现事务的。

![乐观锁](https://img-blog.csdnimg.cn/64581f815d6746f9835c6946f430fe97.png)

##### watch

- 语法：watch key [key …]

- 功能：当某个事务需要按条件执行时，就要使用这个命令将给定的键设置为受监控的。如果被监控的key值在本事务外有修改时，则本事务所有指令都不会被执行。Watch命令相当于关系型数据库中的乐观锁。

> 返回值：监控成功，返回OK。

![watch](https://cdn.jsdelivr.net/gh/shaoshaossm/images/blog/image-20220416202056364.png)

##### unwatch

- 语法：unwatch

- 功能：清除所有先前为一个事务监控的键。如果在watch命令之后你调用了EXEC或DISCARD命令，那么就不需要手动调用UNWATCH命令。

> 返回值：清除成功，返回OK。

![unwatch](https://cdn.jsdelivr.net/gh/shaoshaossm/images/blog/image-20220416202214467.png)



















#### 总结

> - 单独的隔离操作：事务中的所有命令都会序列化、顺序地执行。事务在执行过程中，不会被其它客户端发来的命令请求所打断，除非使用watch命令监控某些键。
>
> - 不保证事务的原子性：redis同一个事务中如果一条命令执行失败，其后的命令仍然可能会被执行，redis的事务没有回滚。Redis已经在系统内部进行功能简化，这样可以确保更快的运行速度，因为Redis不需要事务回滚的能力。

### Redis消息的发布与订阅(了解)

> Redis 发布订阅(pub/sub)是一种消息通信模式：发送者(pub)发送消息，订阅者(sub)接收消息。Redis 客户端可以订阅任意数量的频道。

#### 发布订阅示意图

图一：消息订阅者(client2 、 client5 和 client1)订阅频道 channel1：

![消息订阅者](https://cdn.jsdelivr.net/gh/shaoshaossm/images/blog/20c9f087012f4bfca2b276db90b9ff02.png)

图二：消息发布者发布消息到频道channel1，会被发送到三个订阅者：

![消息发布者](https://img-blog.csdnimg.cn/4f7dfb4f2b114d6ab3b5f915df7f7747.png)

#### 常用命令

##### subscribe

- 语法：subscribe channel [channel…]

- 功能：订阅一个或多个频道的信息

> 返回值：订阅的消息

![subscribe](https://img-blog.csdnimg.cn/0f9cbe35dab043e58f081a4aaad04bae.png)

##### publish

- 语法：publish chanel message

- 功能：将信息发送到指定的频道。

> 返回值：数字。接收到消息订阅者的数量。

![publish](https://img-blog.csdnimg.cn/08b8939f55a0476d8473e7df862f6e11.png)

##### psubscribe

- 语法：psubscribe pattern [pattern]

- 功能：订阅一个或多个符合给定模式的频道。模式以 * 作为通配符，例如：news.* 匹配所有以 news. 开头的频道。

> 返回值：订阅的信息。

![psubscribe](https://img-blog.csdnimg.cn/3fdb494ec98d4309b6ae17d46a1df9b1.png)

### Redis的主从复制

> 主机数据更新后根据配置和策略，自动同步到从机的master/slave机制，Master以写为主，Slave以读为主。
>
> <font color="red">主少从多，主写从读，读写分离，主写同步复制到从</font>

TODO

### Redis哨兵模式

TODO

> 详情请参考文档（尚硅谷和动力节点）阿里云盘有

### Jedis

#### 代码编写

**注入jedis依赖**

```xml
<dependencies>
    <dependency>
        <groupId>redis.clients</groupId>
        <artifactId>jedis</artifactId>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
    </dependency>

</dependencies>
```

- 测试能否连通

```java
/**
 * 本机测试
 */
@Test
public void test01() {
    Jedis jedis = new Jedis("127.0.0.1", 6379);
    String ping = jedis.ping();
    System.out.println(ping);
}
/**
 * 虚拟机测试
 */
@Test
public void test02(){
    Jedis jedis = new Jedis("192.168.174.131",6379);
    jedis.auth("123456");
    System.out.println(jedis.ping());
}
```

> - 禁用Linux的防火墙：Linux(CentOS7)里执行命令
>   - **systemctl stop/disable firewalld.service**  
>
> - redis.conf中注释掉： bind 127.0.0.1  ,然后关闭保护模式：protected-mode no

#### Jedis常用操作

```java

public class JedisDemo1 {

    /**
     * 本机测试
     */
    @Test
    public void test01() {
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        String ping = jedis.ping();
        System.out.println(ping);
    }

    /**
     * 虚拟机测试
     */
    @Test
    public void test02() {
        Jedis jedis = new Jedis("192.168.174.131", 6379);
        jedis.auth("123456");
        System.out.println(jedis.ping());
    }

    /**
     * Jedis基本操作 string
     */
    @Test
    public void test03() {
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        jedis.set("k1", "v1");
        jedis.set("k2", "v2");
        // 设置多个key-value
        jedis.mset("k3", "v3", "k4", "v4");
        System.out.println(jedis.mget("k3", "k4"));
        System.out.println(jedis.get("k1"));

        for (String key : jedis.keys("*")
        ) {
            System.out.println(key);
        }
        //
    }

    /**
     * 操作list
     */
    @Test
    public void test04() {
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        jedis.lpush("mylist", "hxl", "ssm", "zs");
        List<String> list = jedis.lrange("mylist", 0, -1);
        for (String element : list) {
            System.out.println(element);
        }
    }

    /**
     * 操作set
     */
    @Test
    public void test05() {
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        jedis.sadd("name", "hxl", "ssm", "zs");
        Set<String> name = jedis.smembers("name");
        System.out.println(name);
    }

    /**
     * 操作hash
     */
    @Test
    public void test06() {
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        jedis.hset("users", "age", "20");
        System.out.println(jedis.hget("users", "age"));

        jedis.hset("hash1", "userName", "lisi");
        System.out.println(jedis.hget("hash1", "userName"));
        Map<String, String> map = new HashMap<String, String>();
        map.put("telphone", "13810169999");
        map.put("address", "atguigu");
        map.put("email", "abc@163.com");
        jedis.hmset("hash2", map);
        List<String> result = jedis.hmget("hash2", "telphone", "email", "address");
        System.out.println(result);
        for (String element : result) {
            System.out.println(element);
        }

    }

    /**
     * 操作zset
     */
    @Test
    public void test07() {
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        jedis.zadd("score", 100d, "少司命");
        System.out.println(jedis.zrange("score", 0, -1));
    }

}
```

> 更多操作参考常用命令使用

#### 模拟短信发送

```java
package com.ssm.Demo;

import redis.clients.jedis.Jedis;

import java.util.Random;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2022/4/17 16:04
 */
public class PhoneCode {
    public static void main(String[] args) {

//        verifyCode("19858165529");
        getRedisCode("19858165529","098883");
    }



    //生成6位数字验证码
    public static StringBuffer getCode() {
        Random random = new Random();
//        String code = "";
        StringBuffer code = new StringBuffer();
        for (int i = 0; i < 6; i++) {
            int rand = random.nextInt(10);
            code.append(rand);
        }
        return code;
    }

    // 每个手机每天发送3个验证码，验证码放到redis中，设置过期时间
    public static String verifyCode(String phone) {
        Jedis jedis = new Jedis("127.0.0.1",6379);

        // 手机发送次数key
        String countKey = "VerifyCode"+phone+":count";
        // 验证码key
        String codeKey = "VerifyCode"+phone+":code";

        String count = jedis.get(countKey);
        if (count == null){
            // 第一次发送
            // 设置发送次数是1
            jedis.setex(countKey,24*60*60,"1");
        } else if (Integer.parseInt(count)<=2){
            jedis.incr(countKey);
        } else if (Integer.parseInt(count)>2){
            System.out.println("发送次数超过三次");
            jedis.close();
        }
        // 发送验证码到redis里面
        String vcode = getCode().toString();
        jedis.setex(codeKey,120,vcode);
        jedis.close();
        return vcode;
    }

    // 验证码校验
    public static void getRedisCode(String phone,String code){
        Jedis jedis = new Jedis("127.0.0.1",6379);
        // 验证码key
        String codeKey = "VerifyCode"+phone+":code";
        String redisCode = jedis.get(codeKey);
        System.out.println(redisCode);
        if (redisCode.equals(code)){
            System.out.println("成功");
        } else {
            System.out.println("失败");
        }
        jedis.close();
    }
}
```

### SpringBoot整合Redis

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.ssm</groupId>
    <artifactId>jedisspringboot</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>jedisspringboot</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.3.7.RELEASE</spring-boot.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <!-- spring2.X集成redis所需common-pool2-->
        <dependency>
        <groupId>org.apache.commons</groupId>
            <artifactId>commons-pool2</artifactId>
            <version>2.6.0</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.3.7.RELEASE</version>
                <configuration>
                    <mainClass>com.ssm.JedisspringbootApplication</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>
```

RedisConfig

```java

@EnableCaching
@Configuration
public class RedisConfig extends CachingConfigurerSupport {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        template.setConnectionFactory(factory);
//key序列化方式
        template.setKeySerializer(redisSerializer);
//value序列化
        template.setValueSerializer(jackson2JsonRedisSerializer);
//value hashmap序列化
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        return template;
    }

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
//解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
// 配置序列化（解决乱码的问题）,过期时间600秒
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofSeconds(600))
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(redisSerializer))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer))
                .disableCachingNullValues();
        RedisCacheManager cacheManager = RedisCacheManager.builder(factory)
                .cacheDefaults(config)
                .build();
        return cacheManager;
    }
}
```

RedisTestController

```java

@RestController
@RequestMapping("/redisTest")
public class RedisTestController {
    @Autowired
    private RedisTemplate redisTemplate;

    @GetMapping
    public String testRedis() {
        //设置值到redis
        redisTemplate.opsForValue().set("name","lucy");
        //从redis获取值
        String name = (String)redisTemplate.opsForValue().get("name");
        return name;
    }
}
```

JedisspringbootApplication

```java
package com.ssm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JedisspringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(JedisspringbootApplication.class, args);
    }

}
```

application.properties

```properties
# 应用名称
#Redis服务器地址
spring.redis.host=127.0.0.1
#Redis服务器连接端口
spring.redis.port=6379
#Redis数据库索引（默认为0）
spring.redis.database= 0
#连接超时时间（毫秒）
spring.redis.timeout=1800000
#连接池最大连接数（使用负值表示没有限制）
spring.redis.lettuce.pool.max-active=20
#最大阻塞等待时间(负数表示没限制)
spring.redis.lettuce.pool.max-wait=-1
#连接池中的最大空闲连接
spring.redis.lettuce.pool.max-idle=5
#连接池中的最小空闲连接
spring.redis.lettuce.pool.min-idle=0
```
