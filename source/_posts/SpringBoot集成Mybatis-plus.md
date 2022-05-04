---
title: SpringBoot集成Mybatis-Plus
top: false
cover: false
toc: true
mathjax: true
date: 2022-03-28 16:21:16
password:
summary: 总结使用Mybatis-Plus等操作-------------------------
tags: [SpringBoot,Mybatis-Plus]
categories: 框架
---

### 简介

[官网地址](https://baomidou.com/)

[github地址](https://github.com/baomidou/mybatis-plus-samples)

<font color="red">官网写的非常详细了</font>

![](https://img-blog.csdnimg.cn/f125c324abd54affb2626a44c2a60aa2.png)

### 特性

- 无侵入：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑
- 损耗小：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作，BaseMapper
- 强大的 CRUD 操作：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求，以后简单的CRUD操作，不用自己编写了 ！
- 支持 Lambda 形式调用：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- 支持主键自动生成：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题
- 支持 ActiveRecord 模式：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
- 支持自定义全局通用操作：支持全局通用方法注入（ Write once, use anywhere ）
- 内置代码生成器：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用（自动帮你生成代码）
- 内置分页插件：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
- 分页插件支持多种数据库：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库
- 内置性能分析插件：可输出 Sql 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
- 内置全局拦截插件：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作

### 快速入门

**new SpringBoot 项目**

![目录结构](https://img-blog.csdnimg.cn/30479ff6172d43a59f7d3817a3d48d33.png)

pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.5</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.ssm</groupId>
    <artifactId>mybatis_plus</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>mybatis_plus</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <!--1.数据库驱动-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.17</version>
            <scope>runtime</scope>
        </dependency>
        <!--2.lombok-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <!--3.mybatis-plus  版本很重要3.0.5-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.0.5</version>
        </dependency>
        <!--4.h2-->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-resources-plugin</artifactId>
                <version>3.1.0</version>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>

    </build>

</project>
```

application.properties

```properties
#数据库连接配置
spring.datasource.username=root
spring.datasource.password=
#mysql5~8 驱动不同driver-class-name     8需要增加时区的配置serverTimezone=UTC
#useSSL=false 安全连接
spring.datasource.url=jdbc:mysql://localhost:3306/mybatis_plus?useSSL=false&serverTimezone=GMT%2B8&allowPublicKeyRetrieval=true
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

UserMapper

```java

//在对应的接口上面继承一个基本的接口 BaseMapper
public interface UserMapper extends BaseMapper<User> {
    //所有CRUD操作都编写完成了
}
```

User

```java

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

MybatisPlusApplication

- 在主启动类添加[@MapperScan](https://github.com/MapperScan)注解

```java

@MapperScan("com.ssm.mybatis_plus.mapper")
@SpringBootApplication
public class MybatisPlusApplication {

    public static void main(String[] args) {
        SpringApplication.run(MybatisPlusApplication.class, args);
    }

}
```

#### 测试

MybatisPlusApplicationTests

```java
@SpringBootTest
class MybatisPlusApplicationTests {

    @Autowired
    private UserMapper userMapper;
    @Test
    void contextLoads() {
        List<User> users = userMapper.selectList(null);
        users.forEach(System.out::println);
    }
}
```

![测试成功](https://img-blog.csdnimg.cn/a764825c34c24d6fbbb9caa48769c33f.png)

### 配置日志

```properties
#配置日志  log-impl:日志实现
mybatis-plus.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/3e2c21fa74774733b85f929ef23b1a46.png)

### CRUD

> #### Insert

![在这里插入图片描述](https://img-blog.csdnimg.cn/b3e66db0f1ca4f858a3c8ae6dee58d76.png)

> #### AUTO，配置主键自增

- 在实体类字段上配置`@TableId(type = IdType.AUTO)`

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

![设置id自增](https://img-blog.csdnimg.cn/17332275add74409988160f43adb7593.png)

![ID自增](https://img-blog.csdnimg.cn/452be9b1f8504e1988a51f8693d37abd.png)

> #### INPUT，自己输入id

- 在实体类字段上配置`@TableId(type = IdType.INPUT)`

```java
@Test//测试插入
public void insertTest(){
    User user = new User();
    user.setId(1112l);
    user.setName("hxl2");
    user.setAge(18);
    user.setEmail("1600767556@qq.com");
    Integer result = userMapper.insert(user); //会帮我们自动生成id
    System.out.println(result); //受影响的行数
    System.out.println(user); //通过日志发现id会自动回填
}
```

![插入成功](https://img-blog.csdnimg.cn/55154e7e57ec4fa48de9b0ec979ff22c.png)

> #### Update

```java
@Test//测试更新
    public void updateTest(){
        User user = new User();
        user.setId(111L);//怎么改id？？
        //通过条件自动拼接动态Sql
        user.setName("root");
        user.setAge(12);
        user.setEmail("root@qq.com");
        int i = userMapper.updateById(user);//updateById，但是参数是个user
        System.out.println(i);
    }
```

![更新成功](https://img-blog.csdnimg.cn/401d5c819f274909a76ce3c84b20437a.png)

> ### 自动填充

> #### 方式一：数据库级别

- 在表中增加字段：create_time,update_time
- 设置这两个字段自动填充

```java
private Date createTime;
private Date updateTime;
```

![自动填充成功](https://img-blog.csdnimg.cn/0f4e46f607274299855db0933ccd5d63.png)

```java
//字段  字段添加填充内容
@TableField(fill = FieldFill.INSERT)//value = ("create_time"),
private Date createTime;
@TableField(fill = FieldFill.INSERT_UPDATE)
private Date updateTime;
```

> #### 方式二：代码级别

- 删除数据库那两个字段的的默认值，更新操作！

- 实体类字段属性上需要增加注解

```java
//字段  字段添加填充内容
@TableField(fill = FieldFill.INSERT)//value = ("create_time"),
private Date createTime;
@TableField(fill = FieldFill.INSERT_UPDATE)
private Date updateTime;
```

- 编写处理器来处理这个注解即可！

```java
@Slf4j
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    @Override//插入时的填充策略
    public void insertFill(MetaObject metaObject) {
        log.info("==start insert ······==");
        //setFieldValByName(java.lang.String fieldName, java.lang.Object fieldVal, org.apache.ibatis.reflection.MetaObject metaObject)
        this.setFieldValByName("createTIme",new Date(),metaObject);
        this.setFieldValByName("updateTime",new Date(),metaObject);
    }
    @Override//更新时的填充策略
    public void updateFill(MetaObject metaObject) {
        log.info("==start update ······==");
        this.setFieldValByName("updateTime",new Date(),metaObject);
    }
}

```

![修改成功](https://img-blog.csdnimg.cn/526e0aa270fe4bdfa7b16531002a78f0.png)

> #### Delete

> ##### 根据id删除

```java
@Test //测试删除
    public void  testDelete(){
        int result = userMapper.deleteById(111l);
        System.out.println("result:"+result);
    }
```

![删除成功](https://img-blog.csdnimg.cn/b903db28d6e44bf4af9aff8044a744fe.png)

> ##### 根据map里的字段删除

```java
@Test //测试删除
public void  testDelete(){
    HashMap<String, Object> map = new HashMap<>();
    map.put("name","hxl2");
    map.put("age",18);
    int result = userMapper.deleteByMap(map);
    System.out.println("result:"+result);
}
```

![删除成功](https://img-blog.csdnimg.cn/69b53bba7c4b4476916f01c94f7252d9.png)

> ##### （通过多个id）批量删除

```java
@Test //测试删除
public void  testDelete3(){
    List<Long> list = Arrays.asList(1l,2l,3l);
    int result = userMapper.deleteBatchIds(list);
    System.out.println("result:"+result);
}
```

![删除成功](https://img-blog.csdnimg.cn/df17b6dd7c4f4d899b8ce114a7726aca.png)

> #### Select

> ##### 通过id查询

```java
@Test
public void testSelect(){
    User user = userMapper.selectById("4");
    System.out.println("user:"+user);
}
```

![查询成功](https://img-blog.csdnimg.cn/049e2f3842564025a8f29529d00c784c.png)

> ##### 通过id批量查询

```java
@Test
public void testSelect2(){
    List<Long> list = Arrays.asList(4l,5l);
    List<User> user =  userMapper.selectBatchIds(list);
    user.forEach(System.out::println);
}
```

![查询成功](https://img-blog.csdnimg.cn/fb4612b5baad4a94880447c72b02d245.png)

> ##### 根据map集合中条件查询

```java
@Test
public void testSelect3(){
    HashMap<String, Object> map = new HashMap<>();
    map.put("name","Billie");
    map.put("age",24);
    List<User> result = userMapper.selectByMap(map);
    System.out.println("result:"+result);
}
```

![查询成功](https://img-blog.csdnimg.cn/43e8065abab54665a0a75ba44f1dd163.png)

> #### 根据list查询

```java
@Test
public void testSelect4(){
    // 没有条件，即查询所有
    List<User> result = userMapper.selectList(null);
    System.out.println("result:"+result);
}
```

![查询成功](https://img-blog.csdnimg.cn/eefef588998f4f80a9eb90e692b295b6.png)

> #### 自定义查询(Mybatis查询)

指定mapper位置

```properties
mybatis-plus.mapper-locations=/mapper/**
```

UserMapper.xml

```xml
<mapper namespace="com.ssm.mybatis_plus.mapper.UserMapper">

    <select id="selectMapById" resultType="map">
        select id,name,age,email from user where id = #{id}
    </select>

</mapper>
```

UserMapper

```java
public interface UserMapper extends BaseMapper<User> {
    Map<String,Object> selectMapById(Long id);
}
```

```java
@Test
public void testSelect5(){
    // 自定义
    Map<String,Object> map = userMapper.selectMapById(4L);
    System.out.println("map:"+map);
}
```

![查询成功](https://img-blog.csdnimg.cn/0480f018bf7a4d9094ceeceaf57709bf.png)

> #### 通用Service

- 通用 Service CRUD 封装IService接口，进一步封装 CRUD 采用 get 查询单行 remove 删 除 list 查询集合 page 分页 前缀命名方式区分 Mapper 层避免混淆
- 泛型 T 为任意实体对象 
- 建议如果存在自定义通用 Service 方法的可能，请创建自己的 IBaseService 继承 Mybatis-Plus 提供的基类 
- 官网地址：https://baomidou.com/pages/49cc81/#service-crud-%E6%8E%A5%E5%8F% 

##### 查询总记录数

```java
@Test
public void testGetCount(){
    long count = userService.count(null);
    System.out.println("总记录数"+count);

}
```

![查询成功](https://img-blog.csdnimg.cn/4193582063ba47388d2e9589123d1587.png)

##### 批量添加功能

```java
@Test
    public void testInsertMore(){
        ArrayList<User> list = new ArrayList<>();
        for (int i = 0; i <=10 ; i++) {
            User user = new User();
            user.setAge(20+i);
            user.setName("ssm"+i);
            list.add(user);
        }
        boolean b = userService.saveBatch(list);
        System.out.println(b);
    }
```

![添加成功](https://img-blog.csdnimg.cn/cfda08a81f244f3f97fe51be4a356401.png)

#### 逻辑删除

> 3.5.1版本只需要加`@TableLogic`注解即可

- 在数据库中添加字段`is_deleted`，默认值为0

```java
@TableLogic
private Integer isDeleted;
```

```properties
mybatis-plus:
# 设置mybatis-plus全局配置
  global-config:
    db-config:
      logic-delete-field: flag # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```

```java
//逻辑删除组件
@Bean
public ISqlInjector sqlInjector(){
    return new LogicSqlInjector();
}
```

![测试成功](https://img-blog.csdnimg.cn/1674ee35ad3847849393a1ef86bda0a7.png)

 ### 注解

#### @TableName

- 设置实体类所对应的表明
- 当实体类与表名不相同时使用

```java
@TableName("t_user")
public class User {
}
```

![](https://img-blog.csdnimg.cn/7951df32b4b348bb88776ccd83068b85.png)

#### 全局配置

#### 全局配置主键生成策略

```yaml
# 设置mybatis-plus全局配置 db t_开头
  global-config:
    db-config:
      # 设置主键生成策略
      id-type: auto
```

#### 全局配置数据库表名

```yaml
# 设置mybatis-plus全局配置 db t_开头
  global-config:
    db-config:
      # 设置数据库表名
      table-prefix: t_
```

###  条件构造器

#### 组装查询条件

```java
@Test
public void test01(){
    // 查询用户名包含a，年龄20-30之间，邮箱信息不为空
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.like("name","a").between("age",10,20).isNotNull("email");
    List list = userMapper.selectList(queryWrapper);
    list.forEach(System.out::println);
}
```

![查询成功](https://img-blog.csdnimg.cn/6188b100ef5a43a69cd2d7ff8cc8503d.png)

#### 组装排序条件

```java
@Test
    public void test02() {
        //按年龄降序查询用户，如果年龄相同则按id升序排列
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper
                .orderByDesc("age")
                .orderByAsc("id");
        List<User> users = userMapper.selectList(queryWrapper);
        users.forEach(System.out::println);
    }
```

![查询成功](https://img-blog.csdnimg.cn/b8f55f60ab5f4313b86d01cf8bc9bd2e.png)

#### 组装删除条件

```java
@Test
public void test03(){
    //删除email为空的用户
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.isNull("email");
    int result = userMapper.delete(queryWrapper);
    System.out.println("受影响的行数：" + result);
}
```

![测试成功](https://img-blog.csdnimg.cn/5b237a702f97413987cf3dcde113454a.png)

#### QueryWrapper实现修改功能

- 将（年龄大于20并且用户名中包含有a）或邮箱为null的用户信息修改

```java
@Test
    public void test04() {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();

        queryWrapper
                .like("name", "a")
                .gt("age", 20)
                .or()
                .isNull("email");
        User user = new User();
        user.setAge(18);
        user.setEmail("user@ssm.com");
        int result = userMapper.update(user, queryWrapper);
        System.out.println("受影响的行数：" + result);
    }
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/09e76a6315e948dc909894e90d1f9c96.png)

- 将用户名中包含有a并且（年龄大于20或邮箱为null）的用户信息修改

```java
@Test
    public void test05() {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
//lambda表达式内的逻辑优先运算
        queryWrapper
                .like("name", "a")
                .and(i -> i.gt("age", 20).or().isNull("email"));
        User user = new User();
        user.setAge(18);
        user.setEmail("user@atguigu.com");
        int result = userMapper.update(user, queryWrapper);
        System.out.println("受影响的行数：" + result);
    }
```

#### 组装select语句

```java
@Test
    public void test06() {
//查询用户信息的username和age字段
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("name", "age");
//selectMaps()返回Map集合列表，通常配合select()使用，避免User对象中没有被查询到的列值为null
        List<Map<String, Object>> maps = userMapper.selectMaps(queryWrapper);
        maps.forEach(System.out::println);
    }
```

#### 实现子查询

```java
@Test
public void test06() {
//查询id小于等于3的用户信息
(select id from t_user where id <= 3))
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.inSql("id", "select id from user where id <= 3");
List<User> list = userMapper.selectList(queryWrapper);
list.forEach(System.out::println);
}
```

#### condition

> 在真正开发的过程中，组装条件是常见的功能，而这些条件数据来源于用户输入，是可选的，因 此我们在组装这些条件时，必须先判断用户是否选择了这些条件，若选择则需要组装该条件，若 没有选择则一定不能组装，以免影响SQL执行的结果

```java
@Test
    public void test08UseCondition() {
//定义查询条件，有可能为null（用户未输入或未选择）
        String username = null;
        Integer ageBegin = 10;
        Integer ageEnd = 24;
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
//StringUtils.isNotBlank()判断某字符串是否不为空且长度不为0且不由空白符(whitespace)
        queryWrapper
                .like(StringUtils.isNotBlank(username), "name", "a")
                .ge(ageBegin != null, "age", ageBegin)
                .le(ageEnd != null, "age", ageEnd);
        List<User> users = userMapper.selectList(queryWrapper);
        users.forEach(System.out::println);
    }
```

#### LambdaQueryWrapper

```java
@Test
    public void test09() {
		//定义查询条件，有可能为null（用户未输入）
        String username = "a";
        Integer ageBegin = 10;
        Integer ageEnd = 24;
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
		//避免使用字符串表示字段，防止运行时错误
        queryWrapper
                .like(StringUtils.isNotBlank(username), User::getName, username)
                .ge(ageBegin != null, User::getAge, ageBegin)
                .le(ageEnd != null, User::getAge, ageEnd);
        List<User> users = userMapper.selectList(queryWrapper);
        users.forEach(System.out::println);
    }
```

#### LambdaUpdateWrapper

```java
@Test
    public void test10() {
		//组装set子句
        LambdaUpdateWrapper<User> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper
                .set(User::getAge, 18)
                .set(User::getEmail, "user@ssm.com")
                .like(User::getName, "a")
                .and(i -> i.lt(User::getAge, 24).or().isNull(User::getEmail)); //lambda表达式内的逻辑优先运算
        User user = new User();
        int result = userMapper.update(user, updateWrapper);
        System.out.println("受影响的行数：" + result);
    }
```

### 插件

> 添加配置类

```java
@Configuration
@MapperScan("com.ssm.mybatis_plus.mapper")
public class MybatisPlusConfig {

    /**
     * 新的分页插件,一缓和二缓遵循mybatis的规则,需要设置 MybatisConfiguration#useDeprecatedExecutor = false 避免缓存出现问题(该属性会在旧插件移除后一同移除)
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.H2));
        return interceptor;
    }

    @Bean
    public ConfigurationCustomizer configurationCustomizer() {
        return configuration -> configuration.setUseDeprecatedExecutor(false);
    }
}
```

```java
@Test
public void testPage() {
    /*
        SELECT uid AS id,user_name AS name,age,email,is_deleted FROM t_user
        WHERE is_deleted=0 LIMIT ?
     */
    Page<User> page = new Page<>(1, 3);
    userMapper.selectPage(page, null);
    System.out.println( page.getRecords());
    System.out.println("总页数:"  + page.getPages());
    System.out.println("总记录数" + page.getTotal());
    System.out.println("是否有上一页" + page.hasNext());
    System.out.println("是否有下一页:" + page.hasPrevious());
}
```

![运行结果](https://img-blog.csdnimg.cn/fef492b9506e4fd987c002d7caae08bf.png)

#### 自定义分页

UserMapper中定义接口方法

```java
/**
* 根据年龄查询用户列表，分页显示
* @param page 分页对象,xml中可以从里面进行取值,传递参数 Page 即自动分页,必须放在第一位 * @param age 年龄
* @return
*/
Page<User> selectPageVo(@Param("page") Page<User> page, @Param("age") Integer age);
```

UserMapper.xml中编写SQL

```xml
<!--Page<User> selectPageVo(@Param("page") Page<User> page, @Param("age") Integer age);-->
<select id="selectPageVo" resultType="User">
    select uid as `id`,user_name as `name`,age,email from t_user where age > #{age}
</select>
```

测试

```java
@Test
public void testSelectPageVo(){ //设置分页参数
    Page<User> page = new Page<>(1, 5);
    userMapper.selectPageVo(page, 20);
    //获取分页数据
    List<User> list = page.getRecords();
    list.forEach(System.out::println);
    System.out.println("当前页:"+page.getCurrent());
    System.out.println("每页显示的条数:"+page.getSize());
    System.out.println("总记录数:"+page.getTotal());
    System.out.println("总页数:"+page.getPages());
    System.out.println("是否有上一页:"+page.hasPrevious());
    System.out.println("是否有下一页:"+page.hasNext());
}
```

![查询成功](https://img-blog.csdnimg.cn/a97d4947359044dca8b4124ba5ccf578.png)

#### 乐观锁

**场景**

> 一件商品，成本价是80元，售价是100元。老板先是通知小李，说你去把商品价格增加50元。小 
>
> 李正在玩游戏，耽搁了一个小时。正好一个小时后，老板觉得商品价格增加到150元，价格太 
>
> 高，可能会影响销量。又通知小王，你把商品价格降低30元。 
>
> 此时，小李和小王同时操作商品后台系统。小李操作的时候，系统先取出商品价格100元；小王 
>
> 也在操作，取出的商品价格也是100元。小李将价格加了50元，并将100+50=150元存入了数据 
>
> 库；小王将商品减了30元，并将100-30=70元存入了数据库。是的，如果没有锁，小李的操作就 
>
> 完全被小王的覆盖了。 
>
> 现在商品价格是70元，比成本价低10元。几分钟后，这个商品很快出售了1千多件商品，老板亏1 万多。

##### 模拟问题场景

**数据库中增加product表**

```sql
CREATE TABLE t_product
(
id BIGINT(20) NOT NULL COMMENT '主键ID',
NAME VARCHAR(30) NULL DEFAULT NULL COMMENT '商品名称', price INT(11) DEFAULT 0 COMMENT '价格',
VERSION INT(11) DEFAULT 0 COMMENT '乐观锁版本号', PRIMARY KEY (id)
);
```

**添加数据**

```sql
INSERT INTO t_product (id, NAME, price) VALUES (1, '外星人笔记本', 100);
```

**添加实体类**

```java
@Data
public class Product {
    private Long id;
    private String name;
    private Integer price;
    private Integer version;
}
```

**添加mapper**

```java
@Repository
public interface ProductMapper extends BaseMapper<Product> {

}
```

**测试**

```java
@Test
public void testProduct01() {
    Product productLi = productMapper.selectById(1);
    System.out.println("小李查询商品价格" + productLi.getPrice());

    Product productWang = productMapper.selectById(1);
    System.out.println("小王查询商品价格" + productWang.getPrice());
    // 小李将商品价格提高50
    productLi.setPrice(productLi.getPrice() + 50);
    productMapper.updateById(productLi);
    // 小王将商品价格降低30
    productWang.setPrice(productWang.getPrice() - 30);
    productMapper.updateById(productWang);
    // 5.老板查询商品价格
    Product productBoss = productMapper.selectById(1);
    System.out.println("老板查询的商品价格:" + productBoss.getPrice());
}
```

![问题出现](https://img-blog.csdnimg.cn/abd11c01476b4de79f037a1cede811cd.png)

**乐观锁和悲观锁**

> 上面的故事，如果是乐观锁，小王保存价格前，会检查下价格是否被人修改过了。如果被修改过了，则重新取出的被修改后的价格，150元，这样他会将120元存入数据库。 
>
> 如果是悲观锁，小李取出数据后，小王只能等小李操作完之后，才能对价格进行操作，也会保证 最终的价格是120元。

**乐观锁实现流程** 

> 数据库中**添加version字段**
>
> **取出记录时，获取当前version**

```sql
SELECT id,`name`,price,`version` FROM product WHERE id=1
```

> 更新时，version + 1，如果where语句中的version版本不对，则更新失败

```sql
UPDATE product SET price=price+50, `version`=`version` + 1 WHERE id=1 AND`version`=1
```

##### MyBatis-Plus实现乐观锁

**修改实体类**

```java
@Data
public class Product {
    private Long id;
    private String name;
    private Integer price;
    @Version
    private Integer version;
}
```

**添加乐观锁插件配置**

```java

@Configuration
@MapperScan("com.ssm.mybatis_plus.mapper")
public class MybatisPlusConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor(){
        MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
        // 添加分页插件
        mybatisPlusInterceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        // 添加乐观锁插件
        mybatisPlusInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return mybatisPlusInterceptor;

    }

}
```

**优化流程**

```java
@Test
public void testProduct01() {
    Product productLi = productMapper.selectById(1);
    System.out.println("小李查询商品价格" + productLi.getPrice());

    Product productWang = productMapper.selectById(1);
    System.out.println("小王查询商品价格" + productWang.getPrice());
    // 小李将商品价格提高50
    productLi.setPrice(productLi.getPrice() + 50);
    productMapper.updateById(productLi);
    // 小王将商品价格降低30
    productWang.setPrice(productWang.getPrice() - 30);
    int result = productMapper.updateById(productWang);
    if (result == 0){
        Product productNew = productMapper.selectById(1);
        productNew.setPrice(productNew.getPrice()-30);
        productMapper.updateById(productNew);
    }
    // 5.老板查询商品价格
    Product productBoss = productMapper.selectById(1);
    System.out.println("老板查询的商品价格:" + productBoss.getPrice());
}
```

![成功实现](https://img-blog.csdnimg.cn/554d7d724d614e03a7c4444b83392c70.png)

### 通用枚举

> 数据库user表添加字段sex

**创建通用枚举类型**

```java

@Getter // 因为枚举里面都是常量
public enum SexEnum {

    MALE(1, "男"),
    FEMALE(2, "女");

    @EnumValue // 将注解所标识的属性的值存储到数据库中
    private Integer sex;
    private String sexName;

    SexEnum(Integer sex, String sexName) {
        this.sex = sex;
        this.sexName = sexName;
    }
}
```

user实体类添加属性 `private SexEnum sex;`

```java

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @TableId(type = IdType.INPUT)

    private Long id;
    private String name;
    private Integer age;
    private String email;
    private SexEnum sex;
    //字段  字段添加填充内容
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;
    @TableLogic
    private Integer isDeleted;
}
```

**配置扫描通用枚举**

```yaml
mybatis-plus:
  mapper-locations: /mapper/**
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
# 设置mybatis-plus全局配置
  global-config:
    db-config:
      # 设置数据库表名
#      table-prefix: t_
      # 设置主键生成策略
      id-type: auto
  # 配置类型别名所对应的包
  type-aliases-package: com.ssm.mybatis_plus.pojo
  # 扫描枚举的包
  type-enums-package: com.atguigu.mybatisplus.enums
```

**测试**

- 使用默认主键策略（雪花算法）

```java
@Test
public void test() {
    User user = new User();
    user.setName("admin");
    user.setAge(33);
    user.setSex(SexEnum.MALE);
    int result = userMapper.insert(user);
    System.out.println("result = " + result);
}
```

![添加成功](https://img-blog.csdnimg.cn/4df1478817f94c79b6a0d52d2543e0fe.png)

### 代码生成器

**添加依赖**

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.5.1</version>
</dependency>
<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>2.3.31</version>
</dependency>
```

**生成类**

```java

public class FastAutoGeneratorTest {
    public static void main(String[] args) {
        // 设置我们需要创建在哪的路径
        String path = "E:\\ideaProjectAll\\mybatis_plus";
        // 这里我是mysql8 5版本可以换成 jdbc:mysql://localhost:3306/mybatis_plus?characterEncoding=utf-8&useSSL=false
        FastAutoGenerator.create("jdbc:mysql://localhost:3306/mybatis_plus?useSSL=false&serverTimezone=GMT%2B8&allowPublicKeyRetrieval=true", "root", "数据库密码")
                .globalConfig(builder -> {
                    builder.author("ssm") // 设置作者
                            // .enableSwagger() // 开启 swagger 模式
                            .fileOverride() // 覆盖已生成文件
                            .outputDir(path); // 指定输出目录
                })
                .packageConfig(builder -> {
                    builder.parent("com.ssm") // 设置父包名
                            .moduleName("mybatis_plus") // 设置父包模块名
                            .pathInfo(Collections.singletonMap(OutputFile.mapperXml, path)); // 设置mapperXml生成路径
                })
                .strategyConfig(builder -> {
                    builder.addInclude("user");// 设置需要生成的表名
//                            .addTablePrefix("t_", "c_"); // 设置过滤表前缀
                }).templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker 引擎模板，默认的是Velocity引擎模板
                .execute();
    }
}
```

### 多数据源

> 适用于多种场景:纯粹多库、 读写分离、 一主多从、 混合模式等 目前我们就来模拟一个纯粹多库的一个场景，其他场景类似 
>
> 场景说明:
>
> 我们创建两个库，分别为:`mybatis_plus`(以前的库不动)与`mybatis_plus_1`(新建)，将 `mybatis_plus`库的`product`表移动到`mybatis_plus_1`库，这样每个库一张表，通过一个测试用例 分别获取用户数据与商品数据，如果获取到说明多库模拟成功

![目录结构](https://img-blog.csdnimg.cn/c082b94cd16047d298d542e2b66def9e.png)

ProductServiceImpl

```java
@Service
@DS("slave_1") // 要操作的数据源
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {
}
```

ProductService

```java
public interface ProductService extends IService<Product> {
}
```

UserServiceImpl

```java
@Service
@DS("master") // 指定所操作的数据源
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
```

UserService

```java
public interface UserService extends IService<User> {
}
```

**多数据源配置**

```yaml
spring:
  datasource:
    # 配置数据源信息 datasource:
    dynamic:
      # 设置默认的数据源或者数据源组,默认值即为master
      primary: master
      # 严格匹配数据源,默认false.true未匹配到指定数据源时抛异常,false使用默认数据源
      strict: false
      datasource:
        master:
          url: jdbc:mysql://localhost:3306/mybatis_plus?useSSL=false&serverTimezone=GMT%2B8&allowPublicKeyRetrieval=true
          driver-class-name: com.mysql.cj.jdbc.Driver
          username: root
          password: '数据库密码'
        slave_1:
          url: jdbc:mysql://localhost:3306/mybatis_plus_1?useSSL=false&serverTimezone=GMT%2B8&allowPublicKeyRetrieval=true
          driver-class-name: com.mysql.cj.jdbc.Driver
          username: root
          password: '数据库密码'
```

**测试**

```java
@Test
    public void test() {
        // 测试
        System.out.println(userService.getById(5L));
        System.out.println(productService.getById(1L));
    }
```

> 结果: 
>
> 1、都能顺利获取对象，则测试成功
>
> 2、如果我们实现读写分离，将写操作方法加上主库数据源，读操作方法加上从库数据源，自动切换，是不是就能实现读写分离?

![查询成功](https://img-blog.csdnimg.cn/1766d6b047774c17a9ef516ac2917c6b.png)

### MyBatisX插件

![代码生成](https://img-blog.csdnimg.cn/6548be0aa0d04b2b9eefbff4be786814.png)

![按需要选择](https://img-blog.csdnimg.cn/4d9f4c1e89564ea6a42cae9f301ddda7.png)
![按需要选择](https://img-blog.csdnimg.cn/d4ceefa0da56400788bdc1c8539a9df0.png)
![自动生成](https://img-blog.csdnimg.cn/b046ce7d85364377b50a82df918d357c.png)

