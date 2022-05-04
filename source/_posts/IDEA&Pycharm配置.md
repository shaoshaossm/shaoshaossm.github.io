---
title: IDEA&Pycharm配置
top: false
cover: false
toc: true
mathjax: true
date: 2021-09-19 00:13:33
password:
summary: IDEA提交git、生成序列化版本号、Pycharm提交git
tags: [IDEA,Pycharm]
categories: 系统配置
---

### IntelliJ IDEA

#### 常用快捷键

```java
// psvm
public static void main(String[] args) {
}

// sout soutm soutp soutv xxx.sout
public static void main(String[] args) {
    ArrayList arrayList = new ArrayList();
    // sout
    System.out.println();
    // siutp
    System.out.println("args = " + Arrays.deepToString(args));
    // soutv
    System.out.println("arrayList = " + arrayList);
    // soutm
    System.out.println("test.main");
    // 1.sout
    System.out.println(1);
}

// fori
for (int i = 0; i < ; i++) {

}
// iter
for (Object o : arrayList) {

}
// itar
for (int i = 0; i < args.length; i++) {
    String arg = args[i];
}

ArrayList list = new ArrayList();

// list.for
for (Object o : arrayList) {
}
// list.fori
for (int i = 0; i < arrayList.size(); i++) {
}
// list.forr
for (int i = arrayList.size() - 1; i >= 0; i--) {
}

// ifn
if (list == null) {
}
// inn
if (list != null) {
}
// xxx.nn
if (list != null) {
}
// xxx.null
if (list == null) {    
}
// prsf
private static final 
// psf
public static final
// psfi
public static final int    
// psfs
public static final String     
```

#### 自定义代码模板快捷键

![](https://img-blog.csdnimg.cn/acaefa3cb49b426396e6dba8ec4faace.png)

![自定义测试方法](https://img-blog.csdnimg.cn/fbfc2d3b2003451686211fde01e4da0f.png)

- 查看类的继承图

![Ctrl +Alt + U](https://img-blog.csdnimg.cn/1dcd79ab18ea42f79149733bfe841589.png)

![shift + Ctrl +Alt + U](https://img-blog.csdnimg.cn/17e9cbfdd3614a30ab53bdc55aa4be6f.png)

> Ctrl + H 查看类的集成结构

#### IDEA 提交 git 

  1. 创建一个空项目
  2. 点击如图所示

![创建 mercurial/Git 存储库](https://img-blog.csdnimg.cn/275115ac9cc843d0bdb001d8ec7f0fc4.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAd2VpeGluXzQ1MjAwNzM5,size_20,color_FFFFFF,t_70,g_se,x_16)

  3. 下一步 点击如图所示

![add+ commit ](https://img-blog.csdnimg.cn/f6324e3f89684acb9f4216baf29aeeae.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAd2VpeGluXzQ1MjAwNzM5,size_20,color_FFFFFF,t_70,g_se,x_16)

  4. 再点击如图所示
     ![push代码到git](https://img-blog.csdnimg.cn/e1718aea99f04c18b72bc675d042700f.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAd2VpeGluXzQ1MjAwNzM5,size_20,color_FFFFFF,t_70,g_se,x_16)
  5. 提示输入仓库地址 输入即可提交代码,如图所示

![测试成功](https://img-blog.csdnimg.cn/1abec00e879f4c90a48272844a9acbf9.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAd2VpeGluXzQ1MjAwNzM5,size_20,color_FFFFFF,t_70,g_se,x_16)

#### 修改文件后再次提交git

![Commit File](https://img-blog.csdnimg.cn/f8a993960b39472a85dcf99b3bbb25ee.png)
![Commit and Push](https://img-blog.csdnimg.cn/0251244461204053a324587d08ce2a34.png)
![Push](https://img-blog.csdnimg.cn/b19f6e0a3b414d199afc15a99e9983be.png)

![push详细信息](https://img-blog.csdnimg.cn/e0711944381c427fab2fb2d2a7ac72af.png)

![设置仓库别名](https://img-blog.csdnimg.cn/f7a3c6c3a3b242719f9e2bc5b65e6ed8.png)

```sh
# 仓库地址名
git@github.com:shaoshaossm/你的仓库名称.git
```

#### 版本切换

![查看历史提交记录](https://img-blog.csdnimg.cn/813462ff97cc4b35ba4075644947d607.png)
![切换版本](https://img-blog.csdnimg.cn/a9037fc7709c458bb37ae7130deb3724.png)

#### 创建切换分支

![创建分支&切换分支](https://img-blog.csdnimg.cn/a74feaaed9764d0aa41ae4da390feb7d.png)

 ![切换分支](https://img-blog.csdnimg.cn/1e7bad98dcd645f9b32a36222a7f36cd.png)

#### 合并分支

![合并test分支到master](https://img-blog.csdnimg.cn/77fe04dc2dbf4c9ea5538b26f6b4ca4b.png)

#### 合并冲突分支

- test 和 master 分支分别在同一个文件写代码
- 在master分支上点击Merge into Current

![Smart Merge](https://img-blog.csdnimg.cn/93495ec0c4804e23975c6805900a8215.png)

![Merge，三种选择](https://img-blog.csdnimg.cn/d2f598598393429e91cd127f75e379cf.png)
![手动合并](https://img-blog.csdnimg.cn/f9e4e67ac87e4d78a37c49c0880390b9.png)

#### 登录口令

![生成登录口令](https://img-blog.csdnimg.cn/a7e0cfd09e83486d9ff5c231af0096b3.png)

#### idea创建远程库

![在这里插入图片描述](https://img-blog.csdnimg.cn/40145480aaab4c3ca5a77395dfb6f055.png)

#### 拉取远程库代码

![pull](https://img-blog.csdnimg.cn/23fc04a7480748bab8d4395ef5e279f8.png)

![pull](https://img-blog.csdnimg.cn/f4f3a5d8aea541cdb79a6e5fe0fb6075.png)

#### clone项目到本地

![get from Version Control](https://img-blog.csdnimg.cn/71cc2f1243944bd2b487583be1088053.png)
![Clone](https://img-blog.csdnimg.cn/a5a52d0f2ac94d798b1126bcf3f9acb3.png)

#### GitLab

---

#### SpringBoot核心配置文件中文乱码

![UTF-8 + √](https://img-blog.csdnimg.cn/99e0aa91457349ea822b89387d3c11df.png)

---

#### IDEA 生成序列化版本号

![IDEA 生成序列化版本号配置](https://img-blog.csdnimg.cn/270faca20fed451a87502d4781967295.png)

![ALT+Enter](https://img-blog.csdnimg.cn/2fc708f00ac24de19ccba5941278938f.png)

#### debug

![图解](https://img-blog.csdnimg.cn/1aee9adbe28a47a38c79c1895504c995.png)

![debug菜单栏](https://img-blog.csdnimg.cn/1be31dc81d6e40c3a47694178ac0e1ac.png)

`Show Execution Point (Alt + F10)`：如果你的光标在其它行或其它页面，点击这个按钮可跳转到当前代码执行的行。

 `Step Over (F8)`：步过，一行一行地往下走，如果这一行上有方法不会进入方法。

`Step Into (F7)`：步入，如果当前行有方法，可以进入方法内部，一般用于进入自定义方法内，不会进入官方类库的方法。

` Force Step Into (Alt + Shift + F7)`：强制步入，能进入任何方法，查看底层源码的时候可以用这个进入官方类库的方法。

`Step Out (Shift + F8)`：步出，从步入的方法内退出到方法调用处，此时方法已执行完毕，只是还没有完成赋值。

` Drop Frame (默认无)`：回退断点，后面章节详细说明。

` Run to Cursor (Alt + F9)`：运行到光标处，你可以将光标定位到你需要查看的那一行，然后使用这个功能，代码会运行至光标行，而不需要打断点。

`Evaluate Expression (Alt + F8)`：计算表达式。

> 条件断点

![条件断点](https://img-blog.csdnimg.cn/abbca79542394eaa96b0433019a6fbc0.png)

> 查看表达式的值 ALT+F8

![image-20220402191249508](C:\Users\shaoshao\AppData\Roaming\Typora\typora-user-images\image-20220402191249508.png)

#### 生成javadoc

![选择generate](https://img-blog.csdnimg.cn/b134562e99b54aeba38aa9090e8183a3.png)
![生成](https://img-blog.csdnimg.cn/c8f8d7ce815b4d2a8fd0098ec942e43e.png)

- Locale：输入语言类型：`zh_CN`

- Other command line arguments：`-encoding UTF-8 -charset UTF-8`

#### 缓存和索引的清理

![删除LocalHistory](https://img-blog.csdnimg.cn/97b733fa791941c5a3404eae0c739ab4.png)
![Ivalidate Caches/Restart](https://img-blog.csdnimg.cn/71a0f73b2e154dd7a37647b506fa5280.png)
![Incalidate and Restart](https://img-blog.csdnimg.cn/cffd31dad7d4462e87dcbaab6057b28a.png)

#### 添加书签

ctrl + F11

![选择书签号](https://img-blog.csdnimg.cn/5d17f51b70d64673b4ce94c2311d45c0.png)

按ctrl + 书签号即可快速回到书签位置

####  配置tomcat

![tomcat](https://img-blog.csdnimg.cn/440c0c61e40d4ab3a942650f4ec95c0d.png)

[run-editConfiguration]

![添加tomcat](https://img-blog.csdnimg.cn/53125e8cdd14499da0f448e742469393.png)

![tomcat](https://img-blog.csdnimg.cn/dd64e71c531c4e9da5c2d62824c1d5fe.png)

[file-new moudle]

![创建项目](https://img-blog.csdnimg.cn/9cce40a873cd4257bab02706f4f865fe.png)

![指定项目](https://img-blog.csdnimg.cn/661c88634bc74a21a36981983521050a.png)

#### Java监视和管理控制台

> cmd命令看输入jconsole

![jconsole](https://img-blog.csdnimg.cn/1a4474c5b1a7479e949454566496d136.png)

> 选择要连接的进程

![新建连接](https://img-blog.csdnimg.cn/c45aa5f61706410a86894f4a48189895.png)

![MBean](https://img-blog.csdnimg.cn/f5a2d70de8b84c028c8b95893cd640c7.png)

#### maven项目管理

- 双击ctrl，选择项目，执行命令

![maven项目管理操作](https://img-blog.csdnimg.cn/c85e7ccc818e4ea3b173442f15fcab9f.png)

#### 创建springboot项目失败

- 选择用阿里云地址(http://start.aliyun.com/)创建即可

![更换地址](https://img-blog.csdnimg.cn/c25170d406c84c34b969ca39c22d35f6.png)

#### 注解生效激活

![注解生效激活](https://img-blog.csdnimg.cn/98627ba52f8847edab68300ccdf05e3f.png)

#### File Type文件过滤

![File Type文件过滤](https://img-blog.csdnimg.cn/99484db1e56340b599d188bf2090d63a.png)

#### 解决：Error:java: 无效的源发行版: 12

- 按住 Ctrl+alt+shift+s

![第一步](https://img-blog.csdnimg.cn/2fae7ab95b124f50a3bdcbbcfef86b7b.png)
![第二步](https://img-blog.csdnimg.cn/21a06f0300644108b7613b4a33a86948.png)
![第三步](https://img-blog.csdnimg.cn/04e12282bbca4c6d899a5c68afbddb8f.png)

#### 启动热部署

- 添加devtools依赖

```XML
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

- 热启动插件

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <configuration>
        <fork>true</fork>
        <addResources>true</addResources>
      </configuration>
    </plugin>
  </plugins>
</build>
```

![启动ABCD](https://img-blog.csdnimg.cn/2568153f3cce4a948edb703442ed6174.png)

- Ctrl + shift + Alt + / 选择 register

![勾选即可](https://img-blog.csdnimg.cn/8903f77558b24d31af28daf4495a20d4.png)

- 重启IDEA



### Pycharm

#### Pycharm创建项目

![第一步](https://img-blog.csdnimg.cn/78cd2f5a52bd4b56a07a9b94edb1a500.png)

![第二步](https://img-blog.csdnimg.cn/80d88ea4b77346cbb4df6c997e11871e.png)



![Create](https://img-blog.csdnimg.cn/576c07c52e8b447480707cc72840b226.png)

- 安装类库的话直接cmd中安装即可,安装完后就在anaconda中了


#### Pycharm 提交git

![配置GIT executable地址](https://img-blog.csdnimg.cn/5bcd42352f734a6e9ebf5003158f8ec2.png)

![创建tokens](https://img-blog.csdnimg.cn/4f220ddb6dc24cfba3d99205964af5ed.png)

![输入创建的密钥并测试](https://img-blog.csdnimg.cn/d432dcc0bbef44a49a67ca68541fddf8.png)

![创建git仓库](https://img-blog.csdnimg.cn/986af89f7d4c46a8b13ab19739653951.png)



#### 使用pycharm调用其他类中的函数

![Import function](https://img-blog.csdnimg.cn/c4497cd45e01405c9300f53afaa43fc8.png)

---

#### PyCharm使用过程中遇到的问题

- 使用pycharm安装类库时安装失败,必须使用虚拟环境才能安装本地的不行

- 如果要本地安装的话需要到Scripts目录下使用pip install 才行





### Maven

- 阿里云镜像 F:\ideaMaven\apache-maven-3.6.3\conf\settings.xml

```xml
<mirror>      
    <id>nexus-aliyun</id> 
    <mirrorOf>*</mirrorOf>   
    <name>Nexus aliyun</name>  
    <url>http://maven.aliyun.com/nexus/content/groups/public</url>    
</mirror>  
```

