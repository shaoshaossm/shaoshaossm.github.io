---
title: Ubuntu安装SqlServer
top: false
cover: false
toc: true
mathjax: true
date: 2022-04-10 10:00:25
img: https://img-blog.csdnimg.cn/83ff328cb2fa41319612e57e0ec4c457.png
password:
summary: 在ubuntu上安装sqlserver、配置ODBC并且用navicat远程连接
tags: [SqlServer,Ububtu]
categories: 数据库
---

### 安装

- 前提准备

```sh
sudo apt update && sudo apt upgrade
```

- 安装msssql-server包

```sh
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
```

- 注册 Microsoft SQL Server Ubuntu 存储库： 对于 Ubuntu 18.04：

```sh
sudo add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/18.04/mssql-server-2019.list)"
```

- 运行以下命令以安装 SQL Server：

```sh
sudo apt-get update
sudo apt-get install -y mssql-server
```

- 包安装完成后，运行 mssql-conf setup，按照提示设置 SA 密码并选择版本。

```sh
sudo /opt/mssql/bin/mssql-conf setup
```

选择版本 8 ，设置密钥（HMWJ3-KY3J2-NMVD7-KG4JR-X2G8G），设置SA密码。

> 请确保为 SA 帐户指定强密码（最少 8 个字符，包括大写和小写字母、十进制数字和/或非字母数字符号）。

- 完成配置后，验证服务是否正在运行：

```sh
systemctl status mssql-server --no-pager
```

- 如果计划远程连接，可能还需要在防火墙上打开 SQL Server TCP 端口（默认值为 1433）。

```sh
sudo ufw allow 22/tcp  --允许所有的外部IP访问本机的22/tcp (默认ssh)端口，ssh登录的远程服务器别忘了把自己的ssh端口先打开
sudo ufw allow 80  --允许所有的外部IP访问本机的80 (默认网站)端口
sudo ufw allow 1433  --允许所有的外部IP访问本机的1433 (默认MSSQL)端口
```

> 关闭防火墙也可

### 安装SQL Server命令行工具。

- 安装 curl

```sh
sudo apt-get update 
sudo apt install curl
```

- 导入公共存储库 GPG 密钥。

```sh
curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
```

- 注册 Microsoft Ubuntu 存储库。对于 Ubuntu 18.04：

```sh
curl https://packages.microsoft.com/config/ubuntu/18.04/prod.list | sudo tee /etc/apt/sources.list.d/msprod.list
```

- 更新源列表，并使用 unixODBC 开发人员包运行安装命令。

```sh
sudo apt-get update 
sudo apt-get install mssql-tools unixodbc-dev
```

> 若要将 mssql-tools 更新至最新版本，请运行以下命令：
>
> ```sh
> sudo apt-get update 
> sudo apt-get install mssql-tools
> ```

**可选**：添加到 bash shell 中的 **PATH** 环境变量。

- 要使 sqlcmd/bcp 能从登陆会话的 bash shell 进行访问，请使用下列命令修改 ~/.bash_profile 文件中的 PATH ：

```sh
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
```

- 要使 sqlcmd/bcp 能从交互式/非登录会话的 bash shell 进行访问，请使用下列命令修改 ~/.bashrc 文件中的 PATH ：

```sh
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
```

### 本地连接

```sh
sqlcmd -S localhost -U SA -P '<YourPassword>'
```

> 1. 如果成功，应会显示 sqlcmd 命令提示符：>

- 停止、启动或重新启动数据库引擎服务

```sh
sudo systemctl stop mssql-server
sudo systemctl start mssql-server
sudo systemctl restart mssql-server
```

- 设置开机自启并启动sqlserver

```sh
sudo systemctl enable mssql-server
sudo systemctl start mssql-server
```

### 创建数据库

- 创建一个名为 `TestDB` 的新数据库。

```sql
CREATE DATABASE TestDB
```

- 查询以返回服务器上所有数据库的名称：

```sql
SELECT Name from sys.Databases
```

- 前两个命令没有立即执行。 必须在新行中键入 `GO` 才能执行以前的命令：

```sql
GO
```

### navicat

此时需要配置ODBC驱动器管理器

windows搜索ODBC数据源64位

![在这里插入图片描述](https://img-blog.csdnimg.cn/c80cfcf9fa78447ab067e654c0c23272.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/8dcc65e4023a4f468f09b9d77714014d.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/5f45edc92d2d42829b33cb3c7594d640.png)

![选择数据库](https://img-blog.csdnimg.cn/6c99dc710963475784aa9d558b40bb52.png)

![完成](https://img-blog.csdnimg.cn/4a14bad0f0b74e9aa9b3d49ffb46bd88.png)

![测试成功](https://img-blog.csdnimg.cn/d8d983c80f4d41b4a2fdcba61b8785d2.png)

> 此时连接sqlserver时需要安装一个软件，一直下一步即可

![连接成功](https://img-blog.csdnimg.cn/c67b04f475ab42be91be6087e8970774.png)

### 文件还原

![还原](https://img-blog.csdnimg.cn/9615c36c092a4df2bff00447ed826bcc.png)

![还原](https://img-blog.csdnimg.cn/dbcecfad3ed94ae8b1d076c73af040ca.png)

![选择bak文件](https://img-blog.csdnimg.cn/aa069c1882534c77b27fe844b607463a.png)

![还原](https://img-blog.csdnimg.cn/af30e4b3ea1d4cc995dcc7f3102ef7d9.png)
![SQL预览](https://img-blog.csdnimg.cn/c8b7527156424d48a58639dc88b9ab0b.png)


![成功](https://img-blog.csdnimg.cn/a1f90e25650d4142aeebc193064f3d55.png)























### 参考文章

[blog](https://www.cnblogs.com/qq2806933146xiaobai/p/14657048.html)

[微软原文](https://docs.microsoft.com/zh-cn/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-linux-2017)

