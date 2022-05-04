---
title: MySql
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-06 11:59:35
password:
summary: MySql数据库学习总结-------------------------------------------------
tags: MySql
categories: 数据库
---

### 数据库导入数据基本操作

- dos命令窗口
  - `mysql -uroot -p密码`

- 查看所有数据库

```sql
show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| school             |
| springboot         |
| springdb           |
| sys                |
+--------------------+
```

-  创建数据库

```sql
create database ssm;
```

-  使用数据库

```sql
use ssm;
```

-  查看当前 使用的数据库中的表

```sql
show tables;
+---------------+
| Tables_in_ssm |
+---------------+
| dept          |
| emp           |
| salgrade      |
+---------------+
```

- 初始化数据

```sql
# (文件路径)
source G:\BaiduNetdiskDownload\Msq笔记\bjpowernode.sql 
```

- 查看表结构

```sql
desc dept;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra | 
+--------+-------------+------+-----+---------+-------+
| DEPTNO | int(2)      | NO   | PRI | NULL    |       |  部门编号
| DNAME  | varchar(14) | YES  |     | NULL    |       |  部门名称
| LOC    | varchar(13) | YES  |     | NULL    |       |  部门位置
+--------+-------------+------+-----+---------+-------+

desc emp;
+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| EMPNO    | int(4)      | NO   | PRI | NULL    |       | 员工编号 
| ENAME    | varchar(10) | YES  |     | NULL    |       | 员工姓名
| JOB      | varchar(9)  | YES  |     | NULL    |       | 工作岗位
| MGR      | int(4)      | YES  |     | NULL    |       | 上级领导编号
| HIREDATE | date        | YES  |     | NULL    |       | 入职日期
| SAL      | double(7,2) | YES  |     | NULL    |       | 月薪
| COMM     | double(7,2) | YES  |     | NULL    |       | 补助
| DEPTNO   | int(2)      | YES  |     | NULL    |       | 部门编号
+----------+-------------+------+-----+---------+-------+

desc salgrade;
+-------+---------+------+-----+---------+-------+
| Field | Type    | Null | Key | Default | Extra | 
+-------+---------+------+-----+---------+-------+
| GRADE | int(11) | YES  |     | NULL    |       | 等级
| LOSAL | int(11) | YES  |     | NULL    |       | 最低薪资
| HISAL | int(11) | YES  |     | NULL    |       | 最高薪资
+-------+---------+------+-----+---------+-------+
```

- 查看表数据

```sql
mysql> select * from dept;
+--------+------------+----------+
| DEPTNO | DNAME      | LOC      |
+--------+------------+----------+
|     10 | ACCOUNTING | NEW YORK |
|     20 | RESEARCH   | DALLAS   |
|     30 | SALES      | CHICAGO  |
|     40 | OPERATIONS | BOSTON   |
+--------+------------+----------+

mysql> select * from emp;
+-------+--------+-----------+------+------------+---------+---------+--------+
| EMPNO | ENAME  | JOB       | MGR  | HIREDATE   | SAL     | COMM    | DEPTNO |
+-------+--------+-----------+------+------------+---------+---------+--------+
|  7369 | SMITH  | CLERK     | 7902 | 1980-12-17 |  800.00 |    NULL |     20 |
|  7499 | ALLEN  | SALESMAN  | 7698 | 1981-02-20 | 1600.00 |  300.00 |     30 |
|  7521 | WARD   | SALESMAN  | 7698 | 1981-02-22 | 1250.00 |  500.00 |     30 |
|  7566 | JONES  | MANAGER   | 7839 | 1981-04-02 | 2975.00 |    NULL |     20 |
|  7654 | MARTIN | SALESMAN  | 7698 | 1981-09-28 | 1250.00 | 1400.00 |     30 |
|  7698 | BLAKE  | MANAGER   | 7839 | 1981-05-01 | 2850.00 |    NULL |     30 |
|  7782 | CLARK  | MANAGER   | 7839 | 1981-06-09 | 2450.00 |    NULL |     10 |
|  7788 | SCOTT  | ANALYST   | 7566 | 1987-04-19 | 3000.00 |    NULL |     20 |
|  7839 | KING   | PRESIDENT | NULL | 1981-11-17 | 5000.00 |    NULL |     10 |
|  7844 | TURNER | SALESMAN  | 7698 | 1981-09-08 | 1500.00 |    0.00 |     30 |
|  7876 | ADAMS  | CLERK     | 7788 | 1987-05-23 | 1100.00 |    NULL |     20 |
|  7900 | JAMES  | CLERK     | 7698 | 1981-12-03 |  950.00 |    NULL |     30 |
|  7902 | FORD   | ANALYST   | 7566 | 1981-12-03 | 3000.00 |    NULL |     20 |
|  7934 | MILLER | CLERK     | 7782 | 1982-01-23 | 1300.00 |    NULL |     10 |
+-------+--------+-----------+------+------------+---------+---------+--------+

mysql> select * from salgrade;
+-------+-------+-------+
| GRADE | LOSAL | HISAL |
+-------+-------+-------+
|     1 |   700 |  1200 |
|     2 |  1201 |  1400 |
|     3 |  1401 |  2000 |
|     4 |  2001 |  3000 |
|     5 |  3001 |  9999 |
+-------+-------+-------+
```

### 常用命令

- 查看数据库版本

```bash
mysql --version
mysql -V
mysql  Ver 8.0.17 for Win64 on x86_64 (MySQL Community Server - GPL)
```

- 查询当前使用数据库

```sql
select databases();
```

- 终止一条语句

```sql
\c
```

- 退出mysql

```sql
ctrl + c
quit
```

-  查看表的创建语句

```sql
 show create table emp;
 --------------------+
| emp   | CREATE TABLE `emp` (
  `EMPNO` int(4) NOT NULL,
  `ENAME` varchar(10) DEFAULT NULL,
  `JOB` varchar(9) DEFAULT NULL,
  `MGR` int(4) DEFAULT NULL,
  `HIREDATE` date DEFAULT NULL,
  `SAL` double(7,2) DEFAULT NULL,
  `COMM` double(7,2) DEFAULT NULL,
  `DEPTNO` int(2) DEFAULT NULL,
  PRIMARY KEY (`EMPNO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |
```

- 查看其他库中的表

```sql
show tables from springboot;
```

- 数据库导出导入

```sql
# 在Windows的dos命令窗口中执行
mysqldump ssm>D:\ssm.sql -uroot -p333
# 导入
create database ssm；
use ssm;
source D:\ssm.sql
```

### 表的操作

- `char` : 不可变长度，当某个字段中的数据长度不发生改变的时候使用
- `varchar`：可变长度，当某个字段中的数据长度不确定时使用
- `BLOB`：二进制大对象（存储图片、视频等流媒体信息） Binary Large OBject （对应java中的Object）
- `CLOB`：字符大对象（存储较大文本，比如，可以存储4G的字符串。） Character Large OBject（对应java中的Object）

#### 删除表

```sql
drop table if exists t_student;
```

#### 插入数据

```sql
insert into t_student(name,no) values ('zhangsan',2);
insert into t_student VALUES (1,'jack',0,'2000-01-01');
mysql> insert into t_student(name,no) values ('zhangsan',5),('zhangsan3',4);
mysql> select * from t_student;

+----+-----------+------+------------+
| no | name      | sex  | birth      |
+----+-----------+------+------------+
|  1 | jack      | 0    | 2000-01-01 |
|  2 | zhangsan  | NULL | NULL       |
|  3 | zhangsan2 | 0    | NULL       |
|  4 | zhangsan3 | 0    | NULL       |
|  5 | zhangsan  | 0    | NULL       |
+----+-----------+------+------------+
```

#### 表的复制

语法格式：

```sql
 create table 表名 as select 语句;
 没有条件整张表字段全部插入
```

- 将查询结果放入两一张表中

```sql
mysql> create table t_student1 as select ename,deptno from emp;
Query OK, 14 rows affected (0.04 sec)
Records: 14  Duplicates: 0  Warnings: 0
mysql> select * from t_student1;
+--------+--------+
| ename  | deptno |
+--------+--------+
| SMITH  |     20 |
| ALLEN  |     30 |
| WARD   |     30 |
| JONES  |     20 |
| MARTIN |     30 |
| BLAKE  |     30 |
| CLARK  |     10 |
| SCOTT  |     20 |
| KING   |     10 |
| TURNER |     30 |
| ADAMS  |     20 |
| JAMES  |     30 |
| FORD   |     20 |
| MILLER |     10 |
+--------+--------+
mysql> insert into t_student1 select ename,deptno from emp;
Query OK, 14 rows affected (0.01 sec)
Records: 14  Duplicates: 0  Warnings: 0
mysql> select * from t_student1;
+--------+--------+
| ename  | deptno |
+--------+--------+
| SMITH  |     20 |
| ALLEN  |     30 |
| WARD   |     30 |
| JONES  |     20 |
| MARTIN |     30 |
| BLAKE  |     30 |
| CLARK  |     10 |
| SCOTT  |     20 |
| KING   |     10 |
| TURNER |     30 |
| ADAMS  |     20 |
| JAMES  |     30 |
| FORD   |     20 |
| MILLER |     10 |
| SMITH  |     20 |
| ALLEN  |     30 |
| WARD   |     30 |
| JONES  |     20 |
| MARTIN |     30 |
| BLAKE  |     30 |
| CLARK  |     10 |
| SCOTT  |     20 |
| KING   |     10 |
| TURNER |     30 |
| ADAMS  |     20 |
| JAMES  |     30 |
| FORD   |     20 |
| MILLER |     10 |
+--------+--------+
28 rows in set (0.00 sec)
```

#### 修改表中数据

语法格式：

```sql
update 表名 set 字段名1=值1，字段名2=值2 ... where 条件
没有条件整张表全部更新
```

- 将学生表中编号为1的学生姓名和性别分别改为‘ssm’和‘1‘

```sql
mysql> update t_student set sex = '1',name = 'ssm' where no = 1;
```

#### 删除表中数据

语法格式：

```sql
delete from 表名 where 条件;
没有条件全部删除。
```

- 删除表中编号为0的数据

```sql
mysql> delete from t_student where no = 5;
Query OK, 1 row affected (0.01 sec)
```

- 删除所有记录

```sql
delete from t_student;
```

##### 删除大表

```sql
truncate table t_student1;
```

### 查询

```sql
select    5
  ..
from      1
  ..
where     2
  ..   
group by  3  分组函数在分组之后才能使用
  ..
having    4
  ..
order by  6
  ..
limit 
  ..      7
```

#### 简单查询

- 列出员工的编号，姓名和年薪

```sql
mysql> select empno,ename,sal*12 as yearsal from emp;
+-------+--------+----------+
| empno | ename  | yearsal  |
+-------+--------+----------+
|  7369 | SMITH  |  9600.00 |
|  7499 | ALLEN  | 19200.00 |
|  7521 | WARD   | 15000.00 |
|  7566 | JONES  | 35700.00 |
|  7654 | MARTIN | 15000.00 |
|  7698 | BLAKE  | 34200.00 |
|  7782 | CLARK  | 29400.00 |
|  7788 | SCOTT  | 36000.00 |
|  7839 | KING   | 60000.00 |
|  7844 | TURNER | 18000.00 |
|  7876 | ADAMS  | 13200.00 |
|  7900 | JAMES  | 11400.00 |
|  7902 | FORD   | 36000.00 |
|  7934 | MILLER | 15600.00 |
+-------+--------+----------+
```

#### 条件查询

| 运算符           | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| =                | 等于                                                         |
| <>或!=           | 不等于                                                       |
| <                | 小于                                                         |
| <=               | 小于等于                                                     |
| >                | 大于                                                         |
| >=               | 大于等于                                                     |
| between … and …. | 两个值之间,**等同于 >= and <=**  字符方面：左闭右开          |
| is null          | 为null（is not null 不为空）                                 |
| **and**          | 并且                                                         |
| **or**           | 或者                                                         |
| in               | 包含，相当于多个or（not in不在这个范围中）                   |
| not              | not可以取非，主要用在is 或in中                               |
| like             | like称为模糊查询，支持%或下划线匹配  %匹配任意个字符  下划线，一个下划线只匹配一个字符 |

- 查询薪水为1600到3000的员工

```sql
mysql> select ename,sal from emp where sal between 1100 and 3100;
+--------+---------+
| ename  | sal     |
+--------+---------+
| ALLEN  | 1600.00 |
| WARD   | 1250.00 |
| JONES  | 2975.00 |
| MARTIN | 1250.00 |
| BLAKE  | 2850.00 |
| CLARK  | 2450.00 |
| SCOTT  | 3000.00 |
| TURNER | 1500.00 |
| ADAMS  | 1100.00 |
| FORD   | 3000.00 |
| MILLER | 1300.00 |
+--------+---------+
```

- 找出哪些人没有津贴

```sql
select ename,sal,comm from emp where comm is null or comm = 0.0;
+--------+---------+------+
| ename  | sal     | comm |
+--------+---------+------+
| SMITH  |  800.00 | NULL |
| JONES  | 2975.00 | NULL |
| BLAKE  | 2850.00 | NULL |
| CLARK  | 2450.00 | NULL |
| SCOTT  | 3000.00 | NULL |
| KING   | 5000.00 | NULL |
| TURNER | 1500.00 | 0.00 |
| ADAMS  | 1100.00 | NULL |
| JAMES  |  950.00 | NULL |
| FORD   | 3000.00 | NULL |
| MILLER | 1300.00 | NULL |
+--------+---------+------+
```

- 薪资大于1000的并且部门编号是20或30的员工

```sql
mysql> select ename,sal,deptno from emp where sal>1000 and (deptno = 20 or deptno = 30);
+--------+---------+--------+
| ename  | sal     | deptno |
+--------+---------+--------+
| ALLEN  | 1600.00 |     30 |
| WARD   | 1250.00 |     30 |
| JONES  | 2975.00 |     20 |
| MARTIN | 1250.00 |     30 |
| BLAKE  | 2850.00 |     30 |
| SCOTT  | 3000.00 |     20 |
| TURNER | 1500.00 |     30 |
| ADAMS  | 1100.00 |     20 |
| FORD   | 3000.00 |     20 |
+--------+---------+--------+
```

- 找出工资是800和5000的员工

```sql
 select ename,job,sal from emp where sal in(800,5000);
+-------+-----------+---------+
| ename | job       | sal     |
+-------+-----------+---------+
| SMITH | CLERK     |  800.00 |
| KING  | PRESIDENT | 5000.00 |
+-------+-----------+---------+
```

- 模糊查询
  - `%`代表多个字符
  - `_`代表单个字符
- 查询姓名以M开头所有的员工

```sql
mysql> select * from emp where ename like 'M%';
+-------+--------+----------+------+------------+---------+---------+--------+
| EMPNO | ENAME  | JOB      | MGR  | HIREDATE   | SAL     | COMM    | DEPTNO |
+-------+--------+----------+------+------------+---------+---------+--------+
|  7369 | SMITH  | CLERK    | 7902 | 1980-12-17 |  800.00 |    NULL |     20 |
|  7654 | MARTIN | SALESMAN | 7698 | 1981-09-28 | 1250.00 | 1400.00 |     30 |
|  7876 | ADAMS  | CLERK    | 7788 | 1987-05-23 | 1100.00 |    NULL |     20 |
|  7900 | JAMES  | CLERK    | 7698 | 1981-12-03 |  950.00 |    NULL |     30 |
|  7934 | MILLER | CLERK    | 7782 | 1982-01-23 | 1300.00 |    NULL |     10 |
+-------+--------+----------+------+------------+---------+---------+--------+
```

- 查询姓名以N结尾的所有的员工

- 查询姓名中包含O的所有的员工

- 查询姓名中第三个字符为A的所有员工

```sql
mysql> select * from emp where ename like '%N';
mysql> select * from emp where ename like '%O%';
mysql> select * from emp where ename like '__a%';
```

- 查询姓名中有下划线的所有的员工

```sql
mysql> select * from emp where ename like '%\_%';
```

### 排序数据

- 按照job和薪水倒序

```sql
mysql> select * from emp order by job desc,sal desc;
+-------+--------+-----------+------+------------+---------+---------+--------+
| EMPNO | ENAME  | JOB       | MGR  | HIREDATE   | SAL     | COMM    | DEPTNO |
+-------+--------+-----------+------+------------+---------+---------+--------+
|  7499 | ALLEN  | SALESMAN  | 7698 | 1981-02-20 | 1600.00 |  300.00 |     30 |
|  7844 | TURNER | SALESMAN  | 7698 | 1981-09-08 | 1500.00 |    0.00 |     30 |
|  7521 | WARD   | SALESMAN  | 7698 | 1981-02-22 | 1250.00 |  500.00 |     30 |
|  7654 | MARTIN | SALESMAN  | 7698 | 1981-09-28 | 1250.00 | 1400.00 |     30 |
|  7839 | KING   | PRESIDENT | NULL | 1981-11-17 | 5000.00 |    NULL |     10 |
|  7566 | JONES  | MANAGER   | 7839 | 1981-04-02 | 2975.00 |    NULL |     20 |
|  7698 | BLAKE  | MANAGER   | 7839 | 1981-05-01 | 2850.00 |    NULL |     30 |
|  7782 | CLARK  | MANAGER   | 7839 | 1981-06-09 | 2450.00 |    NULL |     10 |
|  7934 | MILLER | CLERK     | 7782 | 1982-01-23 | 1300.00 |    NULL |     10 |
|  7876 | ADAMS  | CLERK     | 7788 | 1987-05-23 | 1100.00 |    NULL |     20 |
|  7900 | JAMES  | CLERK     | 7698 | 1981-12-03 |  950.00 |    NULL |     30 |
|  7369 | SMITH  | CLERK     | 7902 | 1980-12-17 |  800.00 |    NULL |     20 |
|  7788 | SCOTT  | ANALYST   | 7566 | 1987-04-19 | 3000.00 |    NULL |     20 |
|  7902 | FORD   | ANALYST   | 7566 | 1981-12-03 | 3000.00 |    NULL |     20 |
+-------+--------+-----------+------+------------+---------+---------+--------+
```

- 手动指定按照薪水由小到大排序

```sql
mysql> select * from emp order by sal asc;
+-------+--------+-----------+------+------------+---------+---------+--------+
| EMPNO | ENAME  | JOB       | MGR  | HIREDATE   | SAL     | COMM    | DEPTNO |
+-------+--------+-----------+------+------------+---------+---------+--------+
|  7369 | SMITH  | CLERK     | 7902 | 1980-12-17 |  800.00 |    NULL |     20 |
|  7900 | JAMES  | CLERK     | 7698 | 1981-12-03 |  950.00 |    NULL |     30 |
|  7876 | ADAMS  | CLERK     | 7788 | 1987-05-23 | 1100.00 |    NULL |     20 |
|  7521 | WARD   | SALESMAN  | 7698 | 1981-02-22 | 1250.00 |  500.00 |     30 |
|  7654 | MARTIN | SALESMAN  | 7698 | 1981-09-28 | 1250.00 | 1400.00 |     30 |
|  7934 | MILLER | CLERK     | 7782 | 1982-01-23 | 1300.00 |    NULL |     10 |
|  7844 | TURNER | SALESMAN  | 7698 | 1981-09-08 | 1500.00 |    0.00 |     30 |
|  7499 | ALLEN  | SALESMAN  | 7698 | 1981-02-20 | 1600.00 |  300.00 |     30 |
|  7782 | CLARK  | MANAGER   | 7839 | 1981-06-09 | 2450.00 |    NULL |     10 |
|  7698 | BLAKE  | MANAGER   | 7839 | 1981-05-01 | 2850.00 |    NULL |     30 |
|  7566 | JONES  | MANAGER   | 7839 | 1981-04-02 | 2975.00 |    NULL |     20 |
|  7788 | SCOTT  | ANALYST   | 7566 | 1987-04-19 | 3000.00 |    NULL |     20 |
|  7902 | FORD   | ANALYST   | 7566 | 1981-12-03 | 3000.00 |    NULL |     20 |
|  7839 | KING   | PRESIDENT | NULL | 1981-11-17 | 5000.00 |    NULL |     10 |
+-------+--------+-----------+------+------------+---------+---------+--------+
```

### 分组函数/聚合函数/多行处理函数

| 函数  | 解释       |
| ----- | ---------- |
| count | 取得记录数 |
| sum   | 求和       |
| avg   | 取平均     |
| max   | 取最大的数 |
| min   | 取最小的数 |

#### count

采用count(字段名称)，不会取得为null的记录

- 取得所有的员工数

```sql
select count(*) from emp;
```

- 取得津贴不为null员工数

```sql
select count(comm) from emp;
```

- 取得工作岗位的个数 <font color="red">`distinct`：去重 只能出现在所有字段的最前面</font>

```sql
select count(distinct job ) from emp;
+---------------------+
| count(distinct job) |
+---------------------+
|                   5 |
+---------------------+
```

#### sum

- 取得薪水的合计（sal+comm）

```sql
mysql> select sum(sal+ifnull(comm,0)) from emp;
+-------------------------+
| sum(sal+ifnull(comm,0)) |
+-------------------------+
|                31225.00 |
+-------------------------+
```

#### avg

- 取得平均薪水

```sql
mysql> select avg(sal) from emp;
+-------------+
| avg(sal)    |
+-------------+
| 2073.214286 |
+-------------+
```

#### max

- 取得最高薪水

```sql
mysql> select max(sal) from emp;
+----------+
| max(sal) |
+----------+
|  5000.00 |
+----------+
```

- 取得最晚入职得员工

```sql
mysql> select max(str_to_date (hiredate, '%Y-%m-%d')) from emp;
+-----------------------------------------+
| max(str_to_date (hiredate, '%Y-%m-%d')) |
+-----------------------------------------+
| 1987-05-23                              |
+-----------------------------------------+
```

#### min

- 取得最早入职得员工

```sql
select min(str_to_date(hiredate, '%Y-%m-%d')) from emp;
+----------------------------------------+
| min(str_to_date(hiredate, '%Y-%m-%d')) |
+----------------------------------------+
| 1980-12-17                             |
+----------------------------------------+
```

#### 组合聚合函数

- 可以将这些聚合函数都放到select中一起使用

```sql
select count(*),sum(sal),avg(sal),max(sal),min(sal) from emp;
+----------+----------+-------------+----------+----------+
| count(*) | sum(sal) | avg(sal)    | max(sal) | min(sal) |
+----------+----------+-------------+----------+----------+
|       14 | 29025.00 | 2073.214286 |  5000.00 |   800.00 |
+----------+----------+-------------+----------+----------+
```

#### 分组查询

- `group by`:按照某个字段或者某些字段进行分组
- `having`: 对分组之后的数据进行再次过滤
- `where `后面不能使用分组函数，遇到这种情况就使用`having`

---

- 找出每个部门不同工作岗位的最高薪资

```sql
mysql>select deptno,job,max(sal) from emp group by deptno,job order by deptno;
+--------+-----------+----------+
| deptno | job       | max(sal) |
+--------+-----------+----------+
|     10 | CLERK     |  1300.00 |
|     10 | MANAGER   |  2450.00 |
|     10 | PRESIDENT |  5000.00 |
|     20 | ANALYST   |  3000.00 |
|     20 | CLERK     |  1100.00 |
|     20 | MANAGER   |  2975.00 |
|     30 | CLERK     |   950.00 |
|     30 | MANAGER   |  2850.00 |
|     30 | SALESMAN  |  1600.00 |
+--------+-----------+----------+
```

- 如果使用了order by，order by必须放到group by后面
- 按照工作岗位和部门编码分组并按工资合计排序，取得的工资合计

```sql
mysql> select ename,sum(sal),job from emp group by job order by sum(sal) desc;
+-------+----------+-----------+
| ename | sum(sal) | job       |
+-------+----------+-----------+
| JONES |  8275.00 | MANAGER   |
| SCOTT |  6000.00 | ANALYST   |
| ALLEN |  5600.00 | SALESMAN  |
| KING  |  5000.00 | PRESIDENT |
| SMITH |  4150.00 | CLERK     |
+-------+----------+-----------+
```

- 找出工资高于平均工资的员工(where后面嵌套子查询)

```sql
mysql> select ename,sal from emp where sal > (select avg(sal) from emp);
+-------+---------+
| ename | sal     |
+-------+---------+
| JONES | 2975.00 |
| BLAKE | 2850.00 |
| CLARK | 2450.00 |
| SCOTT | 3000.00 |
| KING  | 5000.00 |
| FORD  | 3000.00 |
```

- 找出每个部门的平均薪资，要去显示薪资大于2000的数据

```sql
mysql> select deptno,avg(sal) from emp group by deptno having avg(sal)>2000;
+--------+-------------+
| deptno | avg(sal)    |
+--------+-------------+
|     20 | 2175.000000 |
|     10 | 2916.666667 |
+--------+-------------+
```

#### 连接查询

##### sql99

```sql
...
  A
join
  B
on
  连接条件
where 
...
```

##### 内外连接比较

- 内连接：假设A和B表进行连接，使用内连接的话，凡是A表和B表能够匹配上的记录查询出来(null查不出来)，这就是内连接。AB两张表没有主副之分，两张表是平等的。
- 外连接：假设A和B表进行连接，使用外连接的话，AB两张表中有一张表是主表，一张表是副表，主要查询主表中的数据，捎带着查询副表，当副表中的数据没有和主表中的数据匹配上，副表自动模拟出NULL与之匹配。

##### 内连接之等值连接

- 查询每个员工的部门名称，要求显示员工名和部门名

```sql
mysql> select e.ename,d.dname from emp e join dept d on e.deptno= d.deptno;
+--------+------------+
| ename  | dname      |
+--------+------------+
| SMITH  | RESEARCH   |
| ALLEN  | SALES      |
| WARD   | SALES      |
| JONES  | RESEARCH   |
| MARTIN | SALES      |
| BLAKE  | SALES      |
| CLARK  | ACCOUNTING |
| SCOTT  | RESEARCH   |
| KING   | ACCOUNTING |
| TURNER | SALES      |
| ADAMS  | RESEARCH   |
| JAMES  | SALES      |
| FORD   | RESEARCH   |
| MILLER | ACCOUNTING |
+--------+------------+
```

##### 内连接之非等值连接

- 查询每个员工的工资等级，要求显示员工名，工资，工资等级

```sql
mysql> select e.ename,e.sal,s.grade from emp e join salgrade s on e.sal between s.losal and s.hisal;
+--------+---------+-------+
| ename  | sal     | grade |
+--------+---------+-------+
| SMITH  |  800.00 |     1 |
| ALLEN  | 1600.00 |     3 |
| WARD   | 1250.00 |     2 |
| JONES  | 2975.00 |     4 |
| MARTIN | 1250.00 |     2 |
| BLAKE  | 2850.00 |     4 |
| CLARK  | 2450.00 |     4 |
| SCOTT  | 3000.00 |     4 |
| KING   | 5000.00 |     5 |
| TURNER | 1500.00 |     3 |
| ADAMS  | 1100.00 |     1 |
| JAMES  |  950.00 |     1 |
| FORD   | 3000.00 |     4 |
| MILLER | 1300.00 |     2 |
+--------+---------+-------+
```

##### 自连接

<font color="blue">一张表看做两张表</font>

- 找出每个员工的上级领导，要求显示员工名和对应的领导名

```sql
mysql> select e.ename as '员工名',b.ename as '领导名'from emp e join emp b on e.mgr = b.empno;
+--------+--------+
| 员工名 | 领导名 |
+--------+--------+
| SMITH  | FORD   |
| ALLEN  | BLAKE  |
| WARD   | BLAKE  |
| JONES  | KING   |
| MARTIN | BLAKE  |
| BLAKE  | KING   |
| CLARK  | KING   |
| SCOTT  | JONES  |
| TURNER | BLAKE  |
| ADAMS  | SCOTT  |
| JAMES  | BLAKE  |
| FORD   | JONES  |
| MILLER | CLARK  |
+--------+--------+
```

##### 外连接(左右)

- 找出每个员工的上级领导，要求显示员工名和对应的领导名

```sql
mysql> select a.ename '员工',b.ename '领导' from emp b right join emp a on a.mgr=b.empno;
+--------+-------+
| 员工   | 领导  |
+--------+-------+
| SMITH  | FORD  |
| ALLEN  | BLAKE |
| WARD   | BLAKE |
| JONES  | KING  |
| MARTIN | BLAKE |
| BLAKE  | KING  |
| CLARK  | KING  |
| SCOTT  | JONES |
| KING   | NULL  |
| TURNER | BLAKE |
| ADAMS  | SCOTT |
| JAMES  | BLAKE |
| FORD   | JONES |
| MILLER | CLARK |
+--------+-------+
mysql> select a.ename '员工',b.ename '领导' from emp a left join emp b on a.mgr=b.empno;
+--------+-------+
| 员工   | 领导  |
+--------+-------+
| SMITH  | FORD  |
| ALLEN  | BLAKE |
| WARD   | BLAKE |
| JONES  | KING  |
| MARTIN | BLAKE |
| BLAKE  | KING  |
| CLARK  | KING  |
| SCOTT  | JONES |
| KING   | NULL  |
| TURNER | BLAKE |
| ADAMS  | SCOTT |
| JAMES  | BLAKE |
| FORD   | JONES |
| MILLER | CLARK |
+--------+-------+
```

- 找出哪个部门没有员工

```sql
mysql> select d.* from emp e right join dept d on e.deptno=d.deptno where e.empno is null;
+--------+------------+--------+
| DEPTNO | DNAME      | LOC    |
+--------+------------+--------+
|     40 | OPERATIONS | BOSTON |
+--------+------------+--------+
```

##### 三张表查询

- 找出每一个员工的部门名称以及工资等级,以及上级领导

```sql
mysql> select e.ename '员工',d.dname,s.grade,e1.ename '领导' from emp e join dept d on e.deptno=d.deptno join salgrade s on e.sal between s.losal and s.hisal left join emp e1 on e.mgr = e1.empno;
+--------+------------+-------+-------+
| 员工   | dname      | grade | 领导  |
+--------+------------+-------+-------+
| SMITH  | RESEARCH   |     1 | FORD  |
| ALLEN  | SALES      |     3 | BLAKE |
| WARD   | SALES      |     2 | BLAKE |
| JONES  | RESEARCH   |     4 | KING  |
| MARTIN | SALES      |     2 | BLAKE |
| BLAKE  | SALES      |     4 | KING  |
| CLARK  | ACCOUNTING |     4 | KING  |
| SCOTT  | RESEARCH   |     4 | JONES |
| KING   | ACCOUNTING |     5 | NULL  |
| TURNER | SALES      |     3 | BLAKE |
| ADAMS  | RESEARCH   |     1 | SCOTT |
| JAMES  | SALES      |     1 | BLAKE |
| FORD   | RESEARCH   |     4 | JONES |
| MILLER | ACCOUNTING |     2 | CLARK |
+--------+------------+-------+-------+
```

##### 子查询

###### from后嵌套子查询

- 找出每个部门的平均薪水的薪资等级（）

```sql
mysql> select t.*,s.grade from (select deptno,avg(sal) as avgsal from emp group by deptno) t join salgrade s on t.avgsal between s.losal and s.hisal;
+--------+-------------+-------+
| deptno | avgsal      | grade |
+--------+-------------+-------+
|     20 | 2175.000000 |     4 |
|     30 | 1566.666667 |     3 |
|     10 | 2916.666667 |     4 |
+--------+-------------+-------+
```

- 找出每个部门平均的薪水等级

```sql
mysql> select e.deptno,avg(s.grade) from emp e join salgrade s on e.sal between s.losal and s.hisal group by e.deptno;
+--------+--------------+
| deptno | avg(s.grade) |
+--------+--------------+
|     20 |       2.8000 |
|     30 |       2.5000 |
|     10 |       3.6667 |
+--------+--------------+
```

###### select后嵌套子查询

- 找出每个员工所在部门的名称，要求显示员工名和部门名

```sql
mysql> select e.ename,d.dname from emp e join dept d on e.deptno=d.deptno;
mysql> select e.ename,(select d.dname from dept d where e.deptno = d.deptno) as dname from emp e;
+--------+------------+
| ename  | dname      |
+--------+------------+
| SMITH  | RESEARCH   |
| ALLEN  | SALES      |
| WARD   | SALES      |
| JONES  | RESEARCH   |
| MARTIN | SALES      |
| BLAKE  | SALES      |
| CLARK  | ACCOUNTING |
| SCOTT  | RESEARCH   |
| KING   | ACCOUNTING |
| TURNER | SALES      |
| ADAMS  | RESEARCH   |
| JAMES  | SALES      |
| FORD   | RESEARCH   |
| MILLER | ACCOUNTING |
+--------+------------+
```

##### union

- 主要用于查询毫无关系的两张表

```sql
mysql> select ename from emp union select dname from dept;
+------------+
| ename      |
+------------+
| SMITH      |
| ALLEN      |
| WARD       |
| JONES      |
| MARTIN     |
| BLAKE      |
| CLARK      |
| SALES      |
| OPERATIONS |
+------------+
```

### limit

每页显示pageSize条记录：第pageNo页：（pageNo - 1）* pageSize，pageSize

- 取出工资前五名的员工

```sql
mysql> select ename,sal from emp order by sal desc limit 0,5;
+-------+---------+
| ename | sal     |
+-------+---------+
| KING  | 5000.00 |
| FORD  | 3000.00 |
| SCOTT | 3000.00 |
| JONES | 2975.00 |
| BLAKE | 2850.00 |
+-------+---------+
```

- 找出工资排名在第4-9名的员工

```sql
mysql> select ename,sal from emp order by sal desc limit 3,6;
+--------+---------+
| ename  | sal     |
+--------+---------+
| JONES  | 2975.00 |
| BLAKE  | 2850.00 |
| CLARK  | 2450.00 |
| ALLEN  | 1600.00 |
| TURNER | 1500.00 |
| MILLER | 1300.00 |
+--------+---------+
```

### 约束

#### 非空约束 (notnull)

- 非空约束只能出现在列级约束中

```sql
 create table t_user(
     usercode varchar(255) not null,
     username varchar(255)
 );
```

#### 唯一性约束（unique）

- 唯一约束修饰的字段具有唯一性，不能重复。但可以为null。

```sql
# 多个字段联合添加1个约束unique 【表级约束】
create table t_user(
usercode varchar(255),
username varchar(255),
unique(usercode,username) 
);    
# 单个字段添加1个约束unique 【列级约束】
create table t_user(
usercode varchar(255) unique,
username varchar(255) unique
);
```

#### 主键约束

- 主键不能为null，且不能重复
- 一张表的主键约束只能有一个

```sql
 # 列级约束
 create table t_user(
     id int primary key,
     usercode varchar(255),
     username varchar(255)
 );
 # 表级约束
  create table t_user(
     id int ,
     usercode varchar(255),
     username varchar(255)，
      primary key(id)
 );
```

##### 主键自增

```sql
create table  t_user(
	id int primary key auto_increment,
    username varchar(255)
)
```

#### 外键约束

- 子表中的某个字段来自父表中的字段不一定是主键，但一定要具有unique约束，一般是主键
- 外键可以为null

```sql
drop table if exists t_student;
drop table if exists t_class;
# 父表
create table t_class(
	cno int,
    canme varchar(255),
    primary key(cno)
);
# 子表
create table t_class(
	cno int,
    sanme varchar(255),
    classno int,
    foreign key(classno) references t_class(cno)
);
```

### 事务

- 一个事务是一个完整的业务逻辑单元，不可再分。

- 事务的特性？
  - A:原子性：事务是最小的工作单元，不可再分。
  - B:一致性：事务必须保证多条DML语句同时成功或者同时失败。
  - C:隔离性：事务A与事务B之间具有隔离。
  - D:持久性：持久性说的是最终数据必须持久化到硬盘中，事务才算成功结束。
  
- mysql数据库默认的隔离级别是：第三级别，可重复读。

- 隔离性
  
- 查询当前隔离事务级别,开启事务

 ```sql
 select @@global.tx_isolation;
 start transaction;
 ```

- 第一级别：读未提交(read uncommitted) 存在脏读现象<font color="blue">未提交也能读到</font>

```sql
set global transaction isolation level read uncommitted;
```

- 第二级别：读已提交(read committed) 不可重复读，解决了脏读现象<font color="blue">提交了才能读到</font>

```sql
set global transaction isolation level read committed;
```

- 第三级别：可重复读(repeatable read) 读到的数据是幻象，解决了不可重复读现象<font color="blue">提交了还能读到之前的数据</font>

```sql
set global transaction isolation level repeatable read;
```

- 第四级别：序列化读/串行化读 需要事务排队，解决了所有问题<font color="blue">事务提交了之后才能访问</font>

```sql
set global transaction isolation level serializable;
```

-  `start transaction;`:关闭自动提交机制

-  `rollback`: 回滚事务

-  `commit`: 提交

### 索引

- 索引就相当于一本书的目录，通过目录可以快速的找到对应的资源。
- 添加索引是给某一个字段，或者说某些字段添加索引。
- 创建索引对象：
  - <font color="red">create index 索引名称 on 表名(字段名);</font>
- 删除索引对象：
  - <font color="red">drop index 索引名称 on 表名;</font>

- 什么时候考虑给字段添加索引？(满足什么条件)
  - 数据量庞大。(根据客户的需求，根据线上的环境)
  - 该字段很少的DML操作。(因为字段进行修改操作，索引也需要维护)
  - 该字段经常出现在where子句中。(经常根据哪个字段维护)
- 主键具有unique约束的字段会自动添加索引。根据主键查询效率较高，尽量根据主键检索。
- 索引底层采用的数据结构是：B + Tree
- 索引的实现原理？
  通过B Tree缩小扫描范围，底层索引进行了排序，分区，索引会携带数据在表中的"物理地址"，最终通过索引检索到数据之后，获取到关联的物理地址，通过物理索引检索到数据之后，获取到关联的物理地址，通过物理地址定位表中的数据，效率是最高的。
  elect ename from emp where ename = 'SMITH';
  通过索引转换为：
  select ename from emp where  物理地址 = 0x123;
- 索引的分类
  - 单一索引：给单个字段添加索引
  - 复合索引：给多个字段联合起来添加一个索引
  - 主键索引：主键上会自动添加索引
  - 唯一索引：有unique约束的字段会自动添加索引
- 模糊查询的时候，第一个通配符使用的是%，这个时候索引是是失效的。

---

- 查看sql语句的执行计划

```sql
mysql> explain select ename,sal from emp where sal = 800;
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+-------------+
| id | select_type | table | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra       |
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+-------------+
|  1 | SIMPLE      | emp   | NULL       | ALL  | NULL          | NULL | NULL    | NULL |   14 |    10.00 | Using where |
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+-------------+
```

- 给sal字段添加索引

```sql
create index emp_sal_index on emp(sal);
```

- 再次查看sql语句的执行计划

```sql
mysql> explain select ename,sal from emp where sal = 800;
+----+-------------+-------+------------+------+---------------+---------------+---------+-------+------+----------+-------+
| id | select_type | table | partitions | type | possible_keys | key           | key_len | ref   | rows | filtered | Extra |
+----+-------------+-------+------------+------+---------------+---------------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | emp   | NULL       | ref  | emp_sal_index | emp_sal_index | 9       | const |    1 |   100.00 | NULL  |
+----+-------------+-------+------------+------+---------------+---------------+---------+-------+------+----------+-------+
```

### 视图

-  站在不同的角度去看到数据。(同一张表的数据，通过不同的角度去看待)

- 创建视图，删除视图

```sql
create view myview as select empno,ename from emp;
drop view myview;
```

- 对试图进行增删改查，会影响到原表数据。(通过视图影响原表数据，不是直接操作的原表)

- 试图可以隐藏表的实现细节。保密级别较高的系统，数据库只对外提供相关的视图，java程序员只对视图对象进行CRUD。

### 数据库设计三范式

- 三范式都是哪些？
- 第一范式：任何一张表都应该有主键，并且每一个字段原子性不可再分。
- 第二范式：建立在第一范式的基础上，所有非主键字段完全依赖主键，不能产生部份依赖。
- <font color="red">多对多？三张表，关系表两个外键。</font>

```sql

# 多对多？三张表，关系表两个外键。
t_student学生表
sno(pk)       sname
---------------------
1             张三
2             李四 
3             王五

t_teacher 讲师表
tno(pk)            tname
----------------------
1			王老师
2			张老师
3			李老师

t_student_teacher_relation 学生讲师关系表
id(pk)        sno(fk)          tno(fk)
-------------------------------------------
1	      1                 3
2	      1			1
3	      2			2
4	      2			3
5	      3			1
6	      3			3
```

- 第三范式：建立在第二范式的基础上，所有非主键字段直接依赖主键，不能产生传递依赖。
- <font color="red">一对多？两张表，多的表加外键。</font>

- 一对一怎么设计？

  - 主键共享

  - 外键唯一

       
