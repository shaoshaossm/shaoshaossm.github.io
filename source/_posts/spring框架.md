---
title: spring框架
top: false
cover: false
toc: true
mathjax: true
date: 2022-02-22 20:23:27
password:
summary: 对spring框架的再次学习------------------------------------
tags: spring
categories: 框架
---

### IOC 控制反转

描述：把对象的创建，赋值，管理工作都交给代码之外的容器实现，也就是对象的创建是由其他外部资源完成

- 控制: 创建对象,对象的属性赋值,对象之间的关系管理
- 反转: 将创建对象的权限交给容器来创建,而不是由开人人员创建.由容器代理开发人员管理对象,给对象赋值

> 目的是减少对代码的改动,也能实现不同的功能,实现解耦合

- `spring`是使用的`DI(Dependency Injection)`实现了`ioc`的功能
- `spring`底层创建对象,使用的是反射机制
- `DI`给属性赋值: 
  - `set`注入:`spring`调用类的`set`方法实现属性的赋值
    - 简单类型`set`注入:<<property name="属性名" value="属性值"></property>>
    - 引用类型`set`注入:<<property name="属性名" ref="bean的id"></property>>
  - 构造注入:`spring`调用有参数的构造方法
    - <constructor-arg name="name" value="张三"></constructor-arg> name表示构造方法的形参名
    - <constructor-arg index="0" value="李四"></constructor-arg> index表示构造方法形参的位置,从0开始

### hello Spring

SomeService

```java
public interface SomeService {
    void doSome();
}
```

SomeServiceImpl

```java
public class SomeServiceImpl implements SomeService {
    public SomeServiceImpl() {
        System.out.println("SomeService构造方法执行了!");
    }

    @Override
    public void doSome() {
        System.out.println("执行了SomeServiceImpl的doSome()方法");
    }
}
```

beans.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--spring是把创建好的对象放入map中,
            springMap.put(id,对象)
            eg: springMap.put(someService,new someServiceImpl())
            一个bean 标签声明一个对象
    -->
    <!--  scope="singleton"  一次创建一个对象-->
    <bean id="someService" class="com.bjpowernode.service.impl.SomeServiceImpl" scope="singleton"/>
    <!-- scope="prototype"   一次创建多个对象-->
    <bean id="someService1" class="com.bjpowernode.service.impl.SomeServiceImpl" scope="prototype"/>
    <bean id="myDate" class="java.util.Date"/>

</beans>
```

Test

```java
    @Test
    public void test02(){
        //使用spring容器创建的对夏
        String config = "beans.xml";
        //ApplicationContext表示spring容器,通过容器获取对象
        //ClassPathXmlApplicationContext表示从类路径加载spring的配置文件
        ApplicationContext application = new ClassPathXmlApplicationContext(config);
        SomeService someService = (SomeService) application.getBean("someService");
        someService.doSome();
    }
```

set注入

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <bean id="myStudent" class="com.bjpowernode.ba02.Student">
      <property name="age" value="22"></property>
      <property name="name" value="海问香"></property>
      <property name="school" ref="mySchool"></property>
  </bean>
    <bean id="mySchool" class="com.bjpowernode.ba02.School">
        <property name="name" value="路村小学"></property>
        <property name="address" value="路村庄"></property>
    </bean>
</beans>
```

调用有参构造

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--使用name属性构造注入-->
    <bean id="myStudent" class="com.bjpowernode.ba03.Student">
        <constructor-arg name="name" value="张三"></constructor-arg>
        <constructor-arg name="age" value="18"></constructor-arg>
        <constructor-arg name="school" ref="mySchool"></constructor-arg>
    </bean>
    <bean id="mySchool" class="com.bjpowernode.ba03.School">
        <property name="name" value="路村小学"></property>
        <property name="address" value="路村庄"></property>
    </bean>
    <!--使用index属性实现构造注入-->
    <bean id="myStudent2" class="com.bjpowernode.ba03.Student">
        <constructor-arg index="0" value="李四"></constructor-arg>
        <constructor-arg index="1" value="16"></constructor-arg>
        <constructor-arg index="2"  ref="mySchool"></constructor-arg>

    </bean>
    <!--省略index-->
    <bean id="myStudent3" class="com.bjpowernode.ba03.Student">
        <constructor-arg  value="李四"></constructor-arg>
        <constructor-arg  value="16"></constructor-arg>
        <constructor-arg   ref="mySchool"></constructor-arg>

    </bean>
    <!--创建file构造注入-->
    <bean id="myfile" class="java.io.File">
    <constructor-arg name="parent" value="E:\BaiduNetdiskDownload\Spring\reamme.txt"></constructor-arg>
    <constructor-arg name="child" value="readme.txt"></constructor-arg>
    </bean>

</beans>
```

- 引用类型的自动注入
  - `byName` : java类中引用类型的属性名和spring容器中(配置文件)<bean>的id名称一样,且数据类型一致,这样的容器中的bean,spring能够赋值给引用类型
  - `byType`: java类中引用类型的数据类型和spring容器中(配置文件)<bean>的class属性是<font color="red">同源</font>关系,且数据类型一致,这样bean能够赋值给引用类型
    - java类中引用类型的数据类型和bean的class的值是一样的
    - java类中引用类型的数据类型和bean的class的值是父子类关系的
    - java类中引用类型的数据类型和bean的class的值是接口和实现类关系的

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--byname-->
    <bean id="myStudent" class="com.bjpowernode.ba04.Student" autowire="byName">
        <property name="name" value="胡"></property>
        <property name="age" value="18"></property>
        <!--        引用类型 用了byName即可自动注入 
            引用类型的属性名和spring容器中(配置文件)<bean>的id名称一样,且数据类型一致-->
        <!--        <property name="school" ref="school"></property>-->
    </bean>
    <bean id="school" class="com.bjpowernode.ba04.School">
        <property name="name" value="路村小学"></property>
        <property name="address" value="路村庄"></property>
    </bean>
</beans>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--byType-->
    <bean id="myStudent" class="com.bjpowernode.ba05.Student" autowire="byType">
        <property name="name" value="胡"></property>
        <property name="age" value="18"></property>

    </bean>
    <!--<bean id="mySchool" class="com.bjpowernode.ba05.School" >
        <property name="name" value="路村小学"></property>
        <property name="address" value="路村庄"></property>
    </bean>-->
    <!--    school的子类-->
    <bean id="primarySchool" class="com.bjpowernode.ba05.PrimarySchool">
        <property name="name" value="北京小学"></property>
        <property name="address" value="北京"></property>
    </bean>


</beans>
```

多个配置文件

spring-school.xml

```xml
<bean id="mySchool" class="com.bjpowernode.ba06.School" >
        <property name="name" value="牛逼小学"></property>
        <property name="address" value="路村庄"></property>
    </bean>
```

spring-student.xml

```xml
<bean id="myStudent" class="com.bjpowernode.ba06.Student" autowire="byType">
        <property name="name" value="胡鑫亮"></property>
        <property name="age" value="28"></property>
    </bean>
```

total.xml

```xml
<!--主配置文件,一般包含其他的配置文件-->
<!--    <import resource="classpath:ba06/spring-school.xml"></import>
    <import resource="classpath:ba06/spring-student.xml"></import>-->
<!--或者使用通配符(*)-->
    <import resource="classpath:ba06/spring-*.xml"></import>
```

加载test.properties属性配置文件

```xml
<context:property-placeholder location="classpath:test.properties"></context:property-placeholder>
```

### AOP面向切面编程

- 从动态角度考虑程序运行过程
- AOP底层就是采用动态代理模式实现的。采用了两种代理，<font color="red">JDK动态代理(有接口)</font>和<font color="red">CGLB动态代理(无接口)</font>
- `Aspect`:切面，表示增强功能
- `Pointcut`: 切入点,指多个连接点方法的集合,多个方法
- `Advice`:通知,表示切面功能执行的时间
- 切面三个关键要素
  - 切面的功能代码，切面要干什么
  - 切面的执行位置，使用Pointcut表示切面执行的位置
  - 切面的执行时间，使用Advice表示时间，在目标方法之前，还是目标方法之后
- 如何理解面向切面编程
  - 在分析项目功能时,找出切面
  - 合理安排切面的执行时间
  - 合理安排切面的执行位置,在哪个类,哪个方法增加增强功能

#### aspectj

- spring中内置的开源专门做aop的框架
- 实现方式
  - 使用xml的配置文件
  - 使用注解
- execution表达式共四部分
- execution(访问权限 方法返回值 <font color="red">方法声明(参数)</font> 异常类型)

![常用五种切入点表达式](https://img-blog.csdnimg.cn/ac5d0e251ded4097bf94914d42c3e955.png)

案例演示

SomeService

```java
public interface SomeService {
    void doSome(String name,Integer age);
}
```

SomeServiceImpl

```java
public class SomeServiceImpl implements SomeService {
    @Override
    public void doSome(String name, Integer age) {

        System.out.println("目标方法doSome");
    }
}
```

MyAspect 前置通知

```java

@Aspect
public class MyAspect {
	/**
     * 定义方法是实现切面功能
     * 要求：
     * 1.公共方法 public
     * 2.没有返回值 void
     * 3.方法名称自定义
     * 4.方法可以有参，也可以无参数
     *      如果有参数，参数不是自定义的
     */
    /*@Before(value ="execution(public void com.bjpowernode.ba01.SomeServiceImpl.doSome(String,Integer))" )
    public void myBefore(){
        System.out.println("前置通知;切面功能:在目标方法之前输出执行时间:"+new Date());
    }*/
    /**
     * 指定通知方法中的参数： JoinPoint
     * 作用：在通知方法中获取方法执行时的信息，例如方法名称，方法实参
     * 若切面功能中需要用到方法的信息，就加入JoinPoint
     * 必须是第一个位置的参数
     */
    @Before(value ="execution(void *..SomeServiceImpl.doSome(String,Integer))" )
    public void myBefore2(JoinPoint joinPoint){
        System.out.println("方法的签名:"+joinPoint.getSignature());
        System.out.println("方法名称:"+joinPoint.getSignature().getName());
        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            System.out.println("参数:"+arg);
        }
        System.out.println("2===前置通知;切面功能:在目标方法之前输出执行时间:"+new Date());
    }
    /*@Before(value ="execution(* *..SomeServiceImpl.*(..))" )
    public void myBefore3(){
        System.out.println("3====前置通知;切面功能:在目标方法之前输出执行时间:"+new Date());
    }
    @Before(value ="execution(* do*(..))" )
    public void myBefore4(){
        System.out.println("4====前置通知;切面功能:在目标方法之前输出执行时间:"+new Date());
    }
*/
}
```

applicationContext.xml

```xml
<bean id="someService" class="com.bjpowernode.ba07.SomeServiceImpl"></bean>
    <bean id="myAspect" class="com.bjpowernode.ba07.MyAspect"></bean>
    <aop:aspectj-autoproxy proxy-target-class="true"></aop:aspectj-autoproxy>
</beans>
```

MyTest01

```java
public class MyTest01 {
    @Test
    public void test01(){
        String config="applicationContext.xml";
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext(config);
        SomeService someService = (SomeService) applicationContext.getBean("someService");
        someService.doSome("lisi",20);
    }

}
```

运行结果

```java
方法的签名:void com.bjpowernode.ba01.SomeServiceImpl.doSome(String,Integer)
方法名称:doSome
参数:lisi
参数:20
2===前置通知;切面功能:在目标方法之前输出执行时间:Fri Feb 25 17:37:20 CST 2022
目标方法doSome
```

MyAspect 后置通知

```java

@Aspect
public class MyAspect {
    /**
     * 定义方法是实现切面功能
     * 要求：
     * 1.公共方法 public
     * 2.没有返回值 void
     * 3.方法名称自定义
     * 4.方法要有参数 推荐 Object res
     * 特点：
     * 1.在目标方法之后执行
     * 2.能够获取到目标方法的返回值，可以根据这个返回值做不同的处理功能
     * Object res  = doOther
     * 3.可以修改这个返回值
     */
    /**
     * @AfterReturning:后置通知
     * @param res
     */
    @AfterReturning(value = "execution(* *..SomeServiceImpl.doOther(..))",returning = "res")
    public void myAfterReturning(JoinPoint joinPoint,Object res){
        System.out.println("后置通知:方法的定义:"+joinPoint.getSignature());
        System.out.println("后置通知:方法名称:"+joinPoint.getSignature().getName());
        System.out.println("后置通知:在目标方法之后执行的,获取的返回值是:"+res);
        if (res.equals("abc")){

        }else {

        }
        if (res!=null){
            res="Hello Aspectj";
        }
    }
}
```

MyAspect 环绕通知

```java

@Aspect
public class MyAspect {
    /**
     * - 在目标方法前后都能增加功能
     * - 控制目标方法是否被调用执行
     * - 修改原来目标方法的执行结果，影响最后的调用结果
     *   ProceedingJoinPoint 执行目标方法
     *   返回值：目标方法的执行结果，可以被修改
     */
    /**
     * 环绕通知
     * @param proceedingJoinPoint
     * @return
     */
    @Around(value = "execution(* *..SomeServiceImpl.doFirst(..))")
    public Object myAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object[] args = proceedingJoinPoint.getArgs();
        String name = "";
        if (args!=null && args.length>1){
            Object arg = args[0];
            name = (String) arg;
        }
        Object res = null;
        System.out.println("环绕通知:在目标方法执行之前,输出时间"+new Date());
        if ("zhangsan".equals(name)){
            //等同于method.invoke
            res = proceedingJoinPoint.proceed();
        }

        System.out.println("环绕通知,在目标方法之后,提交事务");
        if (res !=null){
            res = "Hello Aspectj AOP";
        }
        return res;
    }
}

```

MyAspect 异常通知

```java

@Aspect
public class MyAspect {
    /**
     * 异常通知
     *  1.public
     *  2.没有返回值
     *  3.方法名称自定义
     *  4.参数有一个Exception 和 JoinPoint
     *  属性：value 切入点表达式
     *        throwing 自定义变量，表示方法抛出的异常对象
     *        变量名和方法参数名一样
     *   特点：
     *   1.在目标方法抛出异常时执行
     *   2.做异常监控程序
     * @param ex
     */
    @AfterThrowing(
            value = "execution(* *..SomeServiceImpl.doSecond(..))", throwing = "ex"
    )
    public void myAfterException(Exception ex) {
        System.out.println("异常通知,方法发生异常时执行:" + ex.getMessage());
    }
}

```

MyAspect 最终通知

```java

@Aspect
public class MyAspect {
    /**
     * 最终通知
     * 1.public
     * 2.没有返回值
     * 3.方法名称自定义
     * 4.JoinPoint
     * 属性：value 切入点表达式
     * 特点：
     * 1.总是会在目标方法之后执行
     * 2.一般做资源清除工作
     */
    @After(value = "execution(* *..SomeServiceImpl.doThird(..))")
    public void myAfter() {
        System.out.println("执行最终通知，总是会执行");
    }
}
```

@Pointcut 管理切入点

```java

@Aspect
public class MyAspect {
    /**
     * 最终通知
     */
    @After(value = "mypt()")
    public void  myAfter(){
        System.out.println("执行最终通知，总是会执行");
    }

    /**
     * - 定义管理切入点注解
     * - 多个切入点表达式是重复的,可以复用,可以使用@Pointcut
     * - 属性：value 切入点表达式
     * - 当使用@Pointcut定义在一个方法的上面,此时这个方法名称就是切入点表达式,其他通知中,value属性就可以使用这个方法名称,代替切入点表达式
     */
    @Pointcut(value = "execution(* *..SomeServiceImpl.doThird(..))" )
    private void mypt(){
        //无需代码
    }
}

```

有接口且使用cglb代理

```xml
<!--    如果期望目标类有接口,使用cglb代理 加上
            proxy-target-class="true" 即可
        -->
    <aop:aspectj-autoproxy proxy-target-class="true"></aop:aspectj-autoproxy>
```

### spring事务处理

- 事务是指一组sql语句的集合，集合中有多条sql语句，这些语句的执行要是一致的，作为一个整体执行。要么同时成功，同时失败。
- spring提供一种处理事务的统一模型，使用统一步骤，方式完成多种不同数据库访问技术的事务处理。
- 事务内部提交，回滚事务，使用的是事务管理器对象

#### 事务的隔离级别

DEFAULT：采用 DB 默认的事务隔离级别。MySql 的默认为 REPEATABLE_READ； Oracle 默认为 READ_COMMITTED。 

➢ READ_UNCOMMITTED：读未提交。未解决任何并发问题。

➢ READ_COMMITTED：读已提交。解决脏读，存在不可重复读与幻读。 

➢ REPEATABLE_READ：可重复读。解决脏读、不可重复读，存在幻读 

➢ SERIALIZABLE：串行化。不存在并发问题。

#### 事务的超时时间

➢ 表示一个方法最长的执行时间，如果方法执行时超过了时间，事务就回滚。默认-1。

#### 事务的传播行为

- 所谓事务传播行为是指，处于不同事务中的方法在相互调用时，执行期间事务的维护情 况。如，A 事务中的方法 doSome()调用 B 事务中的方法 doOther()，在调用执行期间事务的 维护情况，就称为事务传播行为。事务传播行为是加在方法上的。
- <font color="red">PROPAGATION_REQUIRED</font>
  - 指定的方法必须在事务内执行。若当前存在事务，就加入到当前事务中；若当前没有事 务，则创建一个新事务。这种传播行为是最常见的选择，也是 Spring 默认的事务传播行为
- <font color="red">PROPAGATION_REQUIRES_NEW </font>
  - 指定的方法支持当前事务，但若当前没有事务，也可以以非事务方式执行。
- <font color="red">PROPAGATION_SUPPORTS</font>
  - 总是新建一个事务，若当前存在事务，就将当前事务挂起，直到新事务执行完毕。
- PROPAGATION_MANDATORY 
- PROPAGATION_NESTED 
- PROPAGATION_NEVER
- PROPAGATION_NOT_SUPPORTED

#### 事务提交事务，回滚事务的时机

- 当业务方法执行成功时，没有抛出异常，当方法执行完毕，spring在方法执行后提交事务。事务管理器commit
- 当业务方法抛出运行时异常或error，spring执行回滚，调用事务管理器的rollback
- 当业务方法抛出非运行时异常，主要是受查异常，提交事务
  - 受查异常：即写代码时必须处理的异常。例如：IOException，SQLException

#### 注解事务(小项目)

```java

public class BuyGoodsServiceImpl implements BuyGoodsService {
    private SaleDao saleDao;
    private GoodsDao goodsDao;
 /*   @Transactional(
            propagation = Propagation.REQUIRED,
            isolation = Isolation.DEFAULT,
            readOnly = false,
            rollbackFor = {
                    NullPointerException.class,
                    NotEnoughException.class
            }
    )*/
  @Transactional
  @Override
    public void buy(Integer goodsid, Integer nums) {
        System.out.println("buy方法的开始");
        Sale sale = new Sale();
        sale.setGid(goodsid);
        sale.setNums(nums);
        saleDao.insertSale(sale);
        Goods goods = goodsDao.selectGoods(goodsid);
        if (goods ==null){
            throw new NotEnoughException("编号是："+goodsid+",商品不存在");
        }else if (goods.getAmount() < nums){
            throw new NotEnoughException("编号是："+goodsid+",商品库存不足");
        }
        Goods buyGoods = new Goods();
        buyGoods.setId(goodsid);
        buyGoods.setAmount(nums);
        goodsDao.updateGoods(buyGoods);
        System.out.println("buy方法的完成");
    }

    public void setSaleDao(SaleDao saleDao) {
        this.saleDao = saleDao;
    }

    public void setGoodsDao(GoodsDao goodsDao) {
        this.goodsDao = goodsDao;
    }

}

```

```xml
<!--开启事务注解驱动,告诉spring使用注解驱动管理事务,创建代理驱动-->
<!--  <tx:annotation-driven  transaction-manager = "transactionManager"/>-->
<tx:annotation-driven transaction-manager="transactionManager"/>
```

 #### 事务配置文件(大项目)

```xml
<!--声明式事务处理：和源代码完全分离的-->
<!--1.声明事务管理器对象-->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="myDataSource" />
</bean>

<!--2.声明业务方法它的事务属性（隔离级别，传播行为，超时时间）
          id:自定义名称，表示 <tx:advice> 和 </tx:advice>之间的配置内容的
          transaction-manager:事务管理器对象的id
    -->
<tx:advice id="myAdvice" transaction-manager="transactionManager">
    <!--tx:attributes：配置事务属性-->
    <tx:attributes>
        <!--tx:method：给具体的方法配置事务属性，method可以有多个，分别给不同的方法设置事务属性
                name:方法名称，1）完整的方法名称，不带有包和类。
                              2）方法可以使用通配符,* 表示任意字符
                propagation：传播行为，枚举值
                isolation：隔离级别
                rollback-for：你指定的异常类名，全限定类名。 发生异常一定回滚
            -->
        <tx:method name="buy" propagation="REQUIRED" isolation="DEFAULT"
                   rollback-for="java.lang.NullPointerException,com.bjpowernode.excep.NotEnoughException"/>

        <!--使用通配符，指定很多的方法-->
        <tx:method name="add*" propagation="REQUIRES_NEW" />
        <!--指定修改方法-->
        <tx:method name="modify*" />
        <!--删除方法-->
        <tx:method name="remove*" />
        <!--查询方法，query，search，find-->
        <tx:method name="*" propagation="SUPPORTS" read-only="true" />
    </tx:attributes>
</tx:advice>

<!--配置aop-->
<aop:config>
    <!--配置切入点表达式：指定哪些包中类，要使用事务
            id:切入点表达式的名称，唯一值
            expression：切入点表达式，指定哪些类要使用事务，aspectj会创建代理对象

            com.bjpowernode.service
            com.crm.service
            com.service
        -->
    <aop:pointcut id="servicePt" expression="execution(* *..service..*.*(..))"/>

    <!--配置增强器：关联adivce和pointcut
           advice-ref:通知，上面tx:advice哪里的配置
           pointcut-ref：切入点表达式的id
        -->
    <aop:advisor advice-ref="myAdvice" pointcut-ref="servicePt" />
</aop:config>

```

