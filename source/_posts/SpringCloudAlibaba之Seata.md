---
title: SpringCloudAlibaba之Seata
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-27 12:40:38
password:
summary: 总结在SprinCloudAlibaba中使用Seata------------------
tags: [SpringCloudAlibaba,Seata]
categories: 框架
---

### 分布式事务问题由来

单体应用被拆分成微服务应用，原来的三个模块被拆分成三个独立的应用,分别使用三个独立的数据源，业务操作需要调用三三 个服务来完成。此时**每个服务内部的数据一致性由本地事务来保证， 但是全局的数据一致性问题没法保证**。

<font color="orange">**一次业务操作需要跨多个数据源或需要跨多个系统进行远程调用，就会产生分布式事务问题**。</font>

### Seata概述

- Seata是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。

[官方网址](http://seata.io/zh-cn/)

一个典型的分布式事务过程

分布式事务处理过程的一ID+三组件模型：

- `Transaction ID XID` 全局唯一的事务ID

- 三组件概念

  - `TC (Transaction Coordinator)` - 事务协调者：维护全局和分支事务的状态，驱动全局事务提交或回滚。

  - `TM (Transaction Manager)` - 事务管理器：定义全局事务的范围：开始全局事务、提交或回滚全局事务。

  - `RM (Resource Manager)` - 资源管理器：管理分支事务处理的资源，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。

    

处理过程：

- TM向TC申请开启一个全局事务，全局事务创建成功并生成一个全局唯一的XID；
- XID在微服务调用链路的上下文中传播；
- RM向TC注册分支事务，将其纳入XID对应全局事务的管辖；
- TM向TC发起针对XID的全局提交或回滚决议；
- TC调度XID下管辖的全部分支事务完成提交或回滚请求。

![处理过程](https://img-blog.csdnimg.cn/b158d07ab187478f87ae3fc9f50b58cf.png)

### Seata-Server1.4.2安装

[下载地址](https://github.com/seata/seata/releases)

![在这里插入图片描述](https://img-blog.csdnimg.cn/511a1217cee149d1821c2b5f212a7996.png)

**SEATA 的分布式交易解决方案**

我们只需要使用一个 `@GlobalTransactional` 注解在业务方法上:

![分布式交易解决方案](https://img-blog.csdnimg.cn/410ab2312cc84042a92317f1d804baf0.png)

- 解压文件到指定目录并修改conf

```json
mode = "db"
    
driverClassName = "com.mysql.cj.jdbc.Driver"
## if using mysql to store the data, recommend add rewriteBatchedStatements=true in jdbc connection param
url = "jdbc:mysql://127.0.0.1:3306/seata?useSSL=false&serverTimezone=UTC"
user = "root"
password = "密码"
```

![file.conf](https://img-blog.csdnimg.cn/77901d12a584424fa9c2f31687badcf1.png)

![更换数据源](https://img-blog.csdnimg.cn/805a38066ec84651a19cc40a1551c41a.png)

新建数据库seata，在seata库里建表

去README.md文件中链接官网执行sql脚本

![跳转官网](https://img-blog.csdnimg.cn/67c7fc620e134c3c859d0a2e65c53a9d.png)

![sql文件](https://img-blog.csdnimg.cn/6f227ddc2c3842989fab3418cebb5a4c.png)

建表语句

```sql
-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
CREATE TABLE IF NOT EXISTS `global_table`
(
    `xid`                       VARCHAR(128) NOT NULL,
    `transaction_id`            BIGINT,
    `status`                    TINYINT      NOT NULL,
    `application_id`            VARCHAR(32),
    `transaction_service_group` VARCHAR(32),
    `transaction_name`          VARCHAR(128),
    `timeout`                   INT,
    `begin_time`                BIGINT,
    `application_data`          VARCHAR(2000),
    `gmt_create`                DATETIME,
    `gmt_modified`              DATETIME,
    PRIMARY KEY (`xid`),
    KEY `idx_status_gmt_modified` (`status` , `gmt_modified`),
    KEY `idx_transaction_id` (`transaction_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- the table to store BranchSession data
CREATE TABLE IF NOT EXISTS `branch_table`
(
    `branch_id`         BIGINT       NOT NULL,
    `xid`               VARCHAR(128) NOT NULL,
    `transaction_id`    BIGINT,
    `resource_group_id` VARCHAR(32),
    `resource_id`       VARCHAR(256),
    `branch_type`       VARCHAR(8),
    `status`            TINYINT,
    `client_id`         VARCHAR(64),
    `application_data`  VARCHAR(2000),
    `gmt_create`        DATETIME(6),
    `gmt_modified`      DATETIME(6),
    PRIMARY KEY (`branch_id`),
    KEY `idx_xid` (`xid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- the table to store lock data
CREATE TABLE IF NOT EXISTS `lock_table`
(
    `row_key`        VARCHAR(128) NOT NULL,
    `xid`            VARCHAR(128),
    `transaction_id` BIGINT,
    `branch_id`      BIGINT       NOT NULL,
    `resource_id`    VARCHAR(256),
    `table_name`     VARCHAR(32),
    `pk`             VARCHAR(36),
    `status`         TINYINT      NOT NULL DEFAULT '0' COMMENT '0:locked ,1:rollbacking',
    `gmt_create`     DATETIME,
    `gmt_modified`   DATETIME,
    PRIMARY KEY (`row_key`),
    KEY `idx_status` (`status`),
    KEY `idx_branch_id` (`branch_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `distributed_lock`
(
    `lock_key`       CHAR(20) NOT NULL,
    `lock_value`     VARCHAR(20) NOT NULL,
    `expire`         BIGINT,
    primary key (`lock_key`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('HandleAllSession', ' ', 0);
```

修改register.conf文件

```properties
  type = "nacos"

  nacos {
    application = "seata-server"
    serverAddr = "localhost:8848"
    group = "SEATA_GROUP"
    namespace = ""
    cluster = "default"
    username = ""
    password = ""
  }
```

![registry.conf](https://img-blog.csdnimg.cn/eb63e7a89c5b4a97b75a4949e92d5d9c.png)

目的是：指明注册中心为nacos，及修改nacos连接信息

先启动Nacos端口号8848 nacos\bin\startup.cmd

再启动seata-server - seata-server-1.4.2\seata\bin\seata-server.bat

![启动seata成功](https://img-blog.csdnimg.cn/258f228c15d046cebad9ff498396d004.png)

### Seata业务数据库准备

这里我们会创建三个服务，一个订单服务，一个库存服务，一个账户服务。

<font color="blue">当用户下单时,会在订单服务中创建一个订单, 然后通过远程调用库存服务来扣减下单商品的库存，再通过远程调用账户服务来扣减用户账户里面的余额，最后在订单服务中修改订单状态为已完成。</font>

该操作跨越三个数据库，有两次远程调用，很明显会有分布式事务问题。

一言蔽之，**下订单—>扣库存—>减账户(余额)。**

创建业务数据库

- seata_ order：存储订单的数据库;
- seata_ storage：存储库存的数据库;
- seata_ account：存储账户信息的数据库。

建库SQL

```sql
CREATE DATABASE seata_order;
CREATE DATABASE seata_storage;
CREATE DATABASE seata_account;
```

按照上述3库分别建对应业务表

- seata_order库下建t_order表

```sql
CREATE TABLE t_order (
    `id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT(11) DEFAULT NULL COMMENT '用户id',
    `product_id` BIGINT(11) DEFAULT NULL COMMENT '产品id',
    `count` INT(11) DEFAULT NULL COMMENT '数量',
    `money` DECIMAL(11,0) DEFAULT NULL COMMENT '金额',
    `status` INT(1) DEFAULT NULL COMMENT '订单状态: 0:创建中; 1:已完结'
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

SELECT * FROM t_order;

```

- seata_storage库下建t_storage表

```sql
CREATE TABLE t_order (
    `id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT(11) DEFAULT NULL COMMENT '用户id',
    `product_id` BIGINT(11) DEFAULT NULL COMMENT '产品id',
    `count` INT(11) DEFAULT NULL COMMENT '数量',
    `money` DECIMAL(11,0) DEFAULT NULL COMMENT '金额',
    `status` INT(1) DEFAULT NULL COMMENT '订单状态: 0:创建中; 1:已完结'
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

SELECT * FROM t_order;

```

- seata_account库下建t_account表

```sql
CREATE TABLE t_account(
	`id` BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'id',
	`user_id` BIGINT(11) DEFAULT NULL COMMENT '用户id',
	`total` DECIMAL(10,0) DEFAULT NULL COMMENT '总额度',
	`used` DECIMAL(10,0) DEFAULT NULL COMMENT '已用余额',
	`residue` DECIMAL(10,0) DEFAULT '0' COMMENT '剩余可用额度'
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO seata_account.t_account(`id`, `user_id`, `total`, `used`, `residue`)
VALUES ('1', '1', '1000', '0', '1000');

SELECT * FROM t_account;

```

按照上述3库分别建对应的回滚日志表

订单-库存-账户3个库下**都需要建各自的回滚日志表**

![跳转官网](https://img-blog.csdnimg.cn/b8a91d10344c410ea719f951b43dfbbd.png)

![sql文件](https://img-blog.csdnimg.cn/4f1c209f1015408290444c1299553c62.png)

```sql
-- for AT mode you must to init this sql for you business database. the seata server not need it.
CREATE TABLE IF NOT EXISTS `undo_log`
(
    `branch_id`     BIGINT       NOT NULL COMMENT 'branch transaction id',
    `xid`           VARCHAR(128) NOT NULL COMMENT 'global transaction id',
    `context`       VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as serialization',
    `rollback_info` LONGBLOB     NOT NULL COMMENT 'rollback info',
    `log_status`    INT(11)      NOT NULL COMMENT '0:normal status,1:defense status',
    `log_created`   DATETIME(6)  NOT NULL COMMENT 'create datetime',
    `log_modified`  DATETIME(6)  NOT NULL COMMENT 'modify datetime',
    UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8mb4 COMMENT ='AT transaction mode undo table';
```

![数据库整体概览](https://img-blog.csdnimg.cn/0c55dadf4ca84703b280045104068552.png)

### Seata之Order-Module配置搭建

下订单 -> 减库存 -> 扣余额 -> 改（订单）状态

// TODO 待做

重点注解`@GlobalTransactional(name = "fsp-create-order", rollbackFor = Exception.class)`
