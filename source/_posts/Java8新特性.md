---
title: Java8新特性
top: false
cover: false
toc: true
mathjax: true
date: 2022-04-03 11:49:33
password:
img: https://img-blog.csdnimg.cn/9d3caa9f8b99496bb61e8a8cd953be4d.png 
summary: 总结java8新特性中的lambda表达式，Stream，时间等----------
tags: [lambda表达式,java]
categories: 表达式
---

### Lambda

#### 简介

- Lambda是JAVA 8添加的新特性，说白了，Lambda是一个匿名函数
- 使用Lambda表达式可以对一个**接口的方法**进行非常简洁的实现
- 虽然可以使用Lambda表达式对某些接口进行简单的实现，但是并不是所有的接口都可以用Lambda表达式来实现，要求接口中定义的**必须要实现的抽象方法只能是一个**

> 在JAVA8中 ，对接口加了一个新特性：`default`
> 可以使用default对接口方法进行修饰，被修饰的方法在接口中可以默认实现

### @FunctionalInterface ###

- 修饰函数式接口的，接口中的抽象方法只有一个

#### 基本语法

```java
/**
* （）：用来描述参数列表
*  {}：用来描述方法体 有时可以省略
*  ->: Lambda运算符 读作goes to
*  例 Test t=()->{System.out.println("hello word")}; 大括号可省略
*/
```

**创建多个接口**

```java
@FunctionalInterface
public interface LambdaNoneReturnNoneParmeter {

    void test();
}

@FunctionalInterface
public interface LambdaNoneReturnSingleParmeter {

    void test(int n);
}

@FunctionalInterface
public interface LambdaNoneReturnMutipleParmeter {

    void test(int a,int b);
}

@FunctionalInterface
public interface LambdaSingleReturnNoneParmeter {

    int test();
}

@FunctionalInterface
public interface LambdaSingleReturnSingleParmeter {

    int test(int n);
}

@FunctionalInterface
public interface LambdaSingleReturnMutipleParmeter {

    int test(int a,int b);
}
```

**测试**

```java
public class Syntax1 {
    public static void main(String[] args) {
        // () : 描述参数列表
        // () : 描述方法体
        // () : lambda运算符，读作goes to

        // 无返回，无参
        LambdaNoneReturnNoneParameter lambda1 = () -> {
            System.out.println("hello World");
        };
        lambda1.test();

        // 无返回，单个参数
        LambdaNoneReturnSingleParameter lambda2 = (int a) -> {
            System.out.println(a);
        };
        lambda2.test(10);

        // 无返回，多个参数
        LambdaNoneReturnMultipleParameter lambda3 = (int a, int b) -> {
            System.out.println(a + b);
        };
        lambda2.test(10 + 20);

        // 有返回，无参数
        LambdaSingleReturnNoneParameter lambda4 = () -> {
            System.out.println("lambda4");
            return 10;
        };
        int test4 = lambda4.test();
        System.out.println(test4);
        // 有返回，单参数
        LambdaSingleReturnSingleParameter lambda5 = (int a) -> {
            System.out.println("lambda5");
            return a*2;
        };
        int test5 = lambda5.test(10);
        System.out.println(test5);
        // 有返回，多个参数
        LambdaSingleReturnMultipleParameter lambda6 = (int a,int b) -> {
            System.out.println("lambda6");
            return a+b;
        };
        int test6 = lambda6.test(10,20);
        System.out.println(test6);
    }

}
```

**结果**

```java
hello World
10
30
lambda4
10
lambda5
20
lambda6
30
```

#### 语法精简

```java
/**
* 参数小括号
* 如果参数列表中，参数的数量只有一个 此时小括号可以省略
*
* 参数大括号
* 如果方法体中只有一条语句，此时大括号可以省略
*
* 如果方法体中唯一的一条语句是一个返回语句，省略大括号的同时 也必须省略return
*/
```

##### 无返回，无参

```java
LambdaNoneReturnNoneParameter lambda1 = () -> {
    System.out.println("hello World");
};
lambda1.test();

LambdaNoneReturnNoneParameter lambda7 =() -> System.out.println("hello World");
```

#####  无返回，单个参数

```java
LambdaNoneReturnSingleParameter lambda2 = (int a) -> {
    System.out.println(a);
};
lambda2.test(10);

/**
* 参数小括号
* 如果参数列表中，参数的数量只有一个 此时小括号可以省略
*/
LambdaNoneReturnSingleParameter lambda2 = a -> {
    System.out.println("hello world");
};
/**
* 方法大括号
* 如果方法体中只有一条语句，此时大括号可以省略
*/
LambdaNoneReturnSingleParameter lambda3 = a -> System.out.println("hello world");
```

##### 无返回，多个参数

```java
LambdaNoneReturnMultipleParameter lambda3 = (int a, int b) -> {
    System.out.println(a + b);
};
lambda2.test(10 + 20);

LambdaNoneReturnMultipleParameter lambda1 = (a, b) -> {
    System.out.println("hello world");
};
```



##### 有返回，无参数

```java

LambdaSingleReturnNoneParameter lambda4 = () -> {
    System.out.println("lambda4");
    return 10;
};
int test4 = lambda4.test();
System.out.println(test4);

/**
* 如果方法体中唯一的一条语句是一个返回语句
* 省略大括号的同时 也必须省略return
*/
LambdaSingleReturnNoneParameter lambda4 = () -> 10;
```

##### 有返回，单参数

```java
LambdaSingleReturnSingleParameter lambda5 = (int a) -> {
    System.out.println("lambda5");
    return a*2;
};
int test5 = lambda5.test(10);
System.out.println(test5);

LambdaSingleReturnSingleParameter lambda6 = a -> a;
```

##### 有返回，多个参数

```java
LambdaSingleReturnMultipleParameter lambda6 = (int a,int b) -> {
    System.out.println("lambda6");
    return a+b;
};
int test6 = lambda6.test(10,20);
System.out.println(test6);

LambdaSingleReturnMultipleParameter lambda5 = (a, b) -> a + b;
```

### 语法进阶

#### 方法引用(普通方法与静态方法)

在实际应用过程中，一个接口在很多地方都会调用同一个实现，例如：

```java
LambdaSingleReturnMutipleParmeter lambda1=(a,b)->a+b;
LambdaSingleReturnMutipleParmeter lambda2=(a,b)->a+b;
```

这样一来每次都要写上具体的实现方法 a+b，如果需求变更，则每一处实现都需要更改，基于这种情况，可以将后续的是实现更改为已定义的 方法，需要时直接调用就行

```java
/**
*方法引用：
* 可以快速的将一个Lambda表达式的实现指向一个已经实现的方法
* 方法的隶属者 如果是静态方法 隶属的就是一个类  其他的话就是隶属对象
* 语法：方法的隶属者::方法名
* 注意：
*  1.引用的方法中，参数数量和类型一定要和接口中定义的方法一致
*  2.返回值的类型也一定要和接口中的方法一致
*/
```

**测试**

```java
public class Syntax3 {
    public static void main(String[] args) {

        LambdaSingleReturnSingleParameter lambda1=a->a*2;
        LambdaSingleReturnSingleParameter lambda2=a->a*2;
        //简化
        LambdaSingleReturnSingleParameter lambda3 = a -> change(a);
        //方法引用
        LambdaSingleReturnSingleParameter lambda4 = Syntax3::change;

    }

    public static int change(int a) {
        return a * 2;
    }

}
```

#### 方法引用(构造方法)

创建一个实体类

```java
public class Person {
    public String name;
    public int age;

    public Person() {
        System.out.println("Person的无参构造方法执行");
    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Person的有参构造方法执行");
    }
}
```

两个接口

```java
interface PersonCreater{
    //通过Person的无参构造实现
    Person getPerson();
}

interface PersonCreater2{
    //通过Person的有参构造实现
    Person getPerson(String name,int age);
}
```

```java
public class Syntax4 {
    public static void main(String[] args) {
        
        PersonCreater personCreater = () -> new Person();
        // 构造方法的引用
        PersonCreater personCreater2 = Person::new; //等价于上面的()->new Person()
        personCreater2.getPerson();

        PersonCreater2 personCreater21 = Person::new;
        personCreater21.getPerson2("xx",1);
    }

}
```

**注意：是引用无参构造还是引用有参构造 在于接口定义的方法参数**

### 五、综合练习 ##

#### 1.集合排序案例 ###

```java
public class Exercise1 {

    public static void main(String[] args) {

        //需求：已知在一个ArrayList中有若干各Person对象，将这些Person对象按照年龄进行降序排列
        ArrayList<Person> list=new ArrayList<>();


        list.add(new Person("张三",10));
        list.add(new Person("李四",12));
        list.add(new Person("王五",13));
        list.add(new Person("赵六",14));
        list.add(new Person("李雷",11));
        list.add(new Person("韩梅梅",8));
        list.add(new Person("jack",10));

        System.out.println("排序前："+list);

        //将排列的依据传入 具体的方法指向的是 内部元素的age相减 sort会依据结果的正负进行降序排列
        //sort 使用提供的 Comparator对此列表进行排序以比较元素。
        list.sort((o1, o2) -> o2.age-o1.age);

        System.out.println("排序后："+list);
    }
}

```

#### 2.Treeset排序案例 ###

```java
public class Exercise2 {
    public static void main(String[] args) {

        /**Treeset 自带排序
         * 但是现在不知道Person谁大谁小无法排序
         * 解决方法：
         * 使用Lambda表达式实现Comparator接口，并实例化一个TreeSet对象
         * 注意：在TreeSet中如果Comparator返回值是 0 会判断这是两个元素是相同的 会进行去重
         * TreeSet<Person> set=new TreeSet<>((o1, o2) -> o2.age-o1.age); 
         * 这个获取的对象打印会少一个Person
         * 此时我们将方法修改
        */
        TreeSet<Person> set=new TreeSet<>((o1, o2) ->{
            if(o1.age>=o2.age){
                return -1;
            }else {
                return 1;
            }
        });

        set.add(new Person("张三",10));
        set.add(new Person("李四",12));
        set.add(new Person("王五",13));
        set.add(new Person("赵六",14));
        set.add(new Person("李雷",11));
        set.add(new Person("韩梅梅",8));
        set.add(new Person("jack",10));

        System.out.println(set);
    }
}

```

#### 3.集合的遍历 ###

```java
public class Exercise3 {

    public static void main(String[] args) {
        ArrayList<Integer> list=new ArrayList<>();

        Collections.addAll(list,1,2,3,4,5,6,7,8,9);
        /**
         * list.forEach(Consumer<? super E> action) 
         * api文档解释： 对 集合中的每个元素执行给定的操作，直到所有元素都被处理或动作引发异常。
         * 将集合中的每一个元素都带入到接口Consumer的方法accept中  然后方法accept指向我们的引用
         * 输出集合中的所有元素
         * list.forEach(System.out::println);
        */

        //输出集合中所有的偶数
        list.forEach(ele->{
            if(ele%2==0){
                System.out.println(ele);
            }
        });
    }
}

```

#### 4.删除集合中满足条件的元素 ###

```java
public class Exercise4 {

    public static void main(String[] args) {
        ArrayList<Person> list=new ArrayList<>();

        list.add(new Person("张三",10));
        list.add(new Person("李四",12));
        list.add(new Person("王五",13));
        list.add(new Person("赵六",14));
        list.add(new Person("李雷",11));
        list.add(new Person("韩梅梅",8));
        list.add(new Person("jack",10));

        //删除集合中年龄大于12的元素	
        /**
         * 之前迭代器的做法
         * ListIterator<Person> it = list.listIterator();
         * while (it.hasNext()){
         *   Person ele=it.next();
         *   if(ele.age>12){
         *         it.remove();
         *   }
         * }
         */

        /**
         * lambda实现
         * 逻辑
         * 将集合中的每一个元素都带入到接口Predicate的test方法中，
         * 如果返回值是true，则删除这个元素
        */
        list.removeIf(ele->ele.age>10);
        System.out.println(list);
    }
}

```

#### 5.开辟一条线程 做一个数字的输出 ###

```java
public class Exercise5 {
    public static void main(String[] args) {

        /**
         * 通过Runnable 来实例化线程
         */
        Thread t=new Thread(()->{
            for(int i=0;i<100;i++){
                System.out.println(i);
            }
        });
        t.start();
    }
}

```

### 系统内置的函数式接口

```java
public class FunctionalInterTest {
    public static void main(String[] args) {


        // Predicate<T>              ：     参数是T 返回值boolean  
        // 在后续如果一个接口需要指定类型的参数，返回boolean时可以指向 Predicate
        //          IntPredicate            int -> boolean
        //          LongPredicate           long -> boolean
        //          DoublePredicate         double -> boolean

        // Consumer<T>               :      参数是T 无返回值(void)
        //          IntConsumer             int ->void
        //          LongConsumer            long ->void
        //          DoubleConsumer          double ->void

        // Function<T,R>             :      参数类型T  返回值R
        //          IntFunction<R>          int -> R
        //          LongFunction<R>         long -> R
        //          DoubleFunction<R>       double -> R
        //          IntToLongFunction       int -> long
        //          IntToDoubleFunction     int -> double
        //          LongToIntFunction       long -> int
        //          LongToDoubleFunction    long -> double
        //          DoubleToLongFunction    double -> long
        //          DoubleToIntFunction     double -> int

        // Supplier<T> : 参数 无 返回值T
        // UnaryOperator<T> :参数T 返回值 T
        // BiFunction<T,U,R> : 参数 T、U 返回值 R
        // BinaryOperator<T> ：参数 T、T 返回值 T
        // BiPredicate<T,U> :  参数T、U  返回值 boolean
        // BiConsumer<T,U> :    参数T、U 无返回值

        /**
         * 常用的 函数式接口
         * Predicate<T>、Consumer<T>、Function<T,R>、Supplier<T>
         */
       
    }
}
```

### Lambda闭包

```java

public class ClosureDemo {
    public static void main(String[] args) {
        /**
         * lambda的闭包会提升包围变量的生命周期
         * 所以局部变量 num在getNumber()方法内被 get()引用 不会在getNumber()方法执行后销毁
         * 这种方法可以在外部获取到某一个方法的局部变量
         */
        Integer integer = getNumber().get();
        System.out.println(integer);
    }
    public static Supplier<Integer> getNumber(){
        int num = 10;
        return () ->{
            return num;
        };
//        return () ->num;
    }
}
```

```java

public class ClosureDemo2 {
    public static void main(String[] args) {
        int a = 10;
        Consumer<Integer> c = ele -> {
            System.out.println(ele);
            System.out.println(a);
        };

        c.accept(a);
        c.accept(1);

    }
}
```

### Stream

流（Stream）是数据渠道，用于操作数据源(集合，数组等)所生成的元素序列，**集合讲的是数据，流讲的是计算**

- Stream 自己不会存储元素
- Stream 不会改变源对象。相反，他们会返回一个持有结果的新Stream
- Stream 操作是延迟执行的。这意味着他们会等到需要结果的时候才执行

Stream 的操作三个步骤

- 创建Stream
  - 一个数据源（集合，数组），获取一个流

- 中间操作
  - 一个中间操作链，对数据源的数据进行处理
  - `filter`：接收 Lambda ，从流中排除某些元素
  - `limit`：截断流，使其元素不超过给定数量
  - `skip(n)`：跳过元素，返回一个舍弃了前n个元素的流；若流中元素不足n个，则返回一个空流；与 limit(n) 互补
  - `distinct`：筛选，通过流所生成的 hashCode() 与 equals() 取除重复元素
- 终止操作
  - 一个终止操作，执行中间操作链，并产生结果

**创建实体类Employee**

```java
public class Employee {
    private Integer id;
    private String name;
    private Integer age;
    private Double salary;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public Employee(Integer id, String name, Integer age, Double salary) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    public Employee() {
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", salary=" + salary +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Objects.equals(id, employee.id) &&
                Objects.equals(name, employee.name) &&
                Objects.equals(age, employee.age) &&
                Objects.equals(salary, employee.salary);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, age, salary);
    }
}
```

#### 创建流

```java

public class TestStreamAPI1 {

    @Test
    public void test1(){

        // 1.通过Collection 系列集合提供的 stream() 或 parallelStream()
        ArrayList<String> list = new ArrayList<>();
        Stream<String> stream1 = list.stream();

        // 2.通过Arrays中的静态方法Stream()获取数组流
        Integer [] integer1 = new Integer[10];
        Stream<Integer> stream2 = Arrays.stream(integer1);

        // 3.通过Stream类中静态方法of()
        Stream<String> stream3 = Stream.of("a", "b", "c");

        // 4.创建无限流
        // 迭代
        Stream<Integer> stream4 = Stream.iterate(0, (x) -> x + 2);
        stream4.limit(10).forEach(System.out::println);
        // 生成
        Stream.generate(()->Math.random()).limit(10).forEach(System.out::println);
    }
}
```

#### 筛选和切片

```java
// 中间操作
public class TestStreamAPI2 {

    List<Employee> emps = Arrays.asList(
            new Employee(101, "Z3", 19, 9999.99),
            new Employee(102, "L4", 20, 7777.77),
            new Employee(103, "W5", 35, 6666.66),
            new Employee(104, "Tom", 44, 1111.11),
            new Employee(105, "Jerry", 60, 4444.44),
            new Employee(105, "Jerry", 60, 4444.44),
            new Employee(105, "Jerry", 60, 4444.44)
    );

    @Test
    public void test00() {
        // 中间操作：不会执行任何操作
        Stream<Employee> stream = emps.stream()
                .filter((e) -> {
                    System.out.println("Stream API 中间操作");
                    return e.getAge() > 35;
                });
        // 终止操作：一次性执行全部内容，即“惰性求值”
        stream.forEach(System.out::println);

    }
    
    // 内部迭代
    @Test
    public void test01() {
        emps.stream()
                .filter((x) -> x.getAge() > 35)
                .limit(3)  //短路？达到满足不再内部迭代
                .distinct()
                .skip(1)
                .forEach(System.out::println);
    }
}
```

#### Stream映射

- map：接收 Lambda ，将元素转换为其他形式或提取信息；接受一个函数作为参数，该函数会被应用到每个元素上，并将其映射成一个新的元素
- flatMap：接收一个函数作为参数，将流中每一个值都换成另一个流，然后把所有流重新连接成一个流

```java
@Test
public void test2() {
    List<String> list = Arrays.asList("aa", "bb", "cc");
    list.stream()
            .map((str) -> str.toUpperCase())
            .forEach(System.out::println);
    System.out.println("-----------------------------");
    emps.stream()
            .map((Employee::getName))
            .forEach(System.out::println);
    System.out.println("-----------------------------");
    Stream<Stream<Character>> stream = list.stream()
            .map(TestStreamAPI2::filterCharacter);

    stream.forEach((sm) -> {
        sm.forEach(System.out::println);
    });
    System.out.println("-----------------------------");
    Stream<Character> characterStream = list.stream()
            .flatMap(TestStreamAPI2::filterCharacter);
    characterStream.forEach(System.out::println);
}
    
public static Stream<Character> filterCharacter(String str) {
    ArrayList<Character> list = new ArrayList<>();
    for (Character ch : str.toCharArray(
    )) {
        list.add(ch);
    }
    return list.stream();
}
```

#### Stream排序

- sorted()：自然排序
- sorted(Comparator c)：定制排序

```java
@Test
public void test3(){
    List<String> list = Arrays.asList("cc", "bb", "aa");
    list.stream()
            .sorted()
            .forEach(System.out::println);
    System.out.println("-----------------------");
    emps.stream()
            .sorted((e1,e2)->{
                if (e1.getAge().equals(e2.getAge())){
                    return e1.getName().compareTo(e2.getName());
                } else {
                    return -e1.getAge().compareTo(e2.getAge());
                }
            }).forEach(System.out::println);

}
```

#### Stream查找与匹配

终止操作：

- allMatch：检查是否匹配所有元素
- anyMatch：检查是否至少匹配一个元素
- noneMatch：检查是否没有匹配所有元素
- findFirst：返回第一个元素
- findAny：返回当前流中的任意元素
- count：返回流中元素的总个数
- max：返回流中最大值
- min：返回流中最小值

```java
public enum Status{
        FREE,
        BUSY,
        VOCATION;
    }
private Status status;

public class TestStreamAPI3 {
    List<Employee> emps = Arrays.asList(
            new Employee(101, "Z3", 19, 9999.99, Employee.Status.BUSY),
            new Employee(102, "L4", 20, 7777.77, Employee.Status.FREE),
            new Employee(103, "W5", 35, 6666.66, Employee.Status.BUSY),
            new Employee(104, "Tom", 44, 1111.11, Employee.Status.VOCATION),
            new Employee(105, "Jerry", 60, 4444.44, Employee.Status.VOCATION),
            new Employee(105, "Jerry", 60, 4444.44, Employee.Status.FREE),
            new Employee(105, "Jerry", 60, 4444.44, Employee.Status.BUSY)
    );

    @Test
    public void test01() {
        List<Status> list = Arrays.asList(Status.FREE, Status.BUSY, Status.VOCATION);

        boolean flag1 = list.stream()
                .allMatch((s) -> s.equals(Status.BUSY));
        System.out.println(flag1);

        boolean flag2 = list.stream()
                .anyMatch((s) -> s.equals(Status.BUSY));
        System.out.println(flag2);

        boolean flag3 = list.stream()
                .noneMatch((s) -> s.equals(Status.BUSY));
        System.out.println(flag3);

        // 避免空指针异常
        Optional<Status> op1 = list.stream()
                .findFirst();
        // 如果Optional为空 找一个替代的对象
        Status s1 = op1.orElse(Status.BUSY);
        System.out.println(s1);

        Optional<Status> op2 = list.stream()
                .findAny();
        System.out.println(op2);

        long count = list.stream()
                .count();
        System.out.println(count);
    }

    @Test
    public void tet2() {
        List<Status> list = Arrays.asList(Status.FREE, Status.BUSY, Status.VOCATION);

        Long count = list.stream()
                .count();
        System.out.println(count);

        Optional<Employee> op1 = emps.stream()
                .max((e1, e2) -> Double.compare(e1.getSalary(), e2.getSalary()));
//                        .max(Comparator.comparingDouble(Employee::getSalary));
        System.out.println(op1.get());

        Optional<Double> op2 = emps.stream()
                .map(Employee::getSalary)
                .min(Double::compare);
        System.out.println(op2.get());
    }
}
```

#### 归约 / 收集

- 归约：reduce(T identity, BinaryOperator) / reduce(BinaryOperator) 可以将流中的数据反复结合起来，得到一个值
- 收集：collect 将流转换成其他形式；接收一个 Collector 接口的实现，用于给流中元素做汇总的方法

**reduce：**

```java
List<Employee> emps = Arrays.asList(
            new Employee(101, "Z3", 19, 9999.99, Employee.Status.BUSY),
            new Employee(102, "L4", 20, 7777.77, Employee.Status.FREE),
            new Employee(103, "W5", 35, 6666.66, Employee.Status.BUSY),
            new Employee(104, "Tom", 44, 1111.11, Employee.Status.VOCATION),
            new Employee(105, "Jerry", 60, 4444.44, Employee.Status.VOCATION),
            new Employee(105, "Jerry", 60, 4444.44, Employee.Status.FREE),
            new Employee(105, "Jerry", 60, 4444.44, Employee.Status.BUSY)
    );
// 归纳
@Test
public void test3() {
    List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 0);
    Integer sum = list.stream().reduce(0, (x, y) -> x + y);
    System.out.println(sum);

    Optional<Double> op = emps.stream()
        .map(Employee::getSalary)
        .reduce(Double::sum);
    System.out.println(op);
}
```

**collect：**

```java
List<Employee> emps = Arrays.asList(
            new Employee(101, "Z3", 19, 9999.99, Employee.Status.BUSY),
            new Employee(102, "L4", 20, 7777.77, Employee.Status.FREE),
            new Employee(103, "W5", 35, 6666.66, Employee.Status.BUSY),
            new Employee(104, "Tom", 44, 1111.11, Employee.Status.VOCATION),
            new Employee(105, "Jerry", 60, 4444.44, Employee.Status.VOCATION),
            new Employee(105, "Jerry", 60, 4444.44, Employee.Status.FREE),
            new Employee(105, "Jerry", 60, 4444.44, Employee.Status.BUSY)
    );
// 收集：
@Test
public void test4() {
    List<String> list = emps.stream()
        .map(Employee::getName)
        .collect(Collectors.toList()
                 //.collect(Collectors.toSet()
                );
    list.forEach(System.out::println);
    System.out.println("----------------------------");
    HashSet<String> hs = emps.stream()
        .map(Employee::getName)
        .collect(Collectors.toCollection(HashSet::new));
    hs.forEach(System.out::println);
}

@Test
public void test04() {
    //分组
    Map<Status, List<Employee>> map = emps.stream()
        .collect(Collectors.groupingBy(Employee::getStatus));
    System.out.println(map);

    //多级分组
    Map<Status, Map<String, List<Employee>>> mapMap = emps.stream()
        .collect(Collectors.groupingBy(Employee::getStatus, Collectors.groupingBy((e) -> {
            if (((Employee) e).getAge() <= 35) {
                return "青年";
            } else if (((Employee) e).getAge() <= 50) {
                return "中年";
            } else {
                return "老年";
            }
        })));
    System.out.println(mapMap);

    //分区
    Map<Boolean, List<Employee>> listMap = emps.stream()
        .collect(Collectors.partitioningBy((e) -> e.getSalary() > 4321));
    System.out.println(listMap);
}

@Test
public void test05() {
    //总结
    DoubleSummaryStatistics dss = emps.stream()
        .collect(Collectors.summarizingDouble(Employee::getSalary));
    System.out.println(dss.getMax());
    System.out.println(dss.getMin());
    System.out.println(dss.getSum());
    System.out.println(dss.getCount());
    System.out.println(dss.getAverage());

    //连接
    String str = emps.stream()
        .map(Employee::getName)
        .collect(Collectors.joining("-")); //可传入分隔符
    System.out.println(str);
}
@Test
public void test03() {
    //总数
    Long count = emps.stream()
        .collect(Collectors.counting());
    System.out.println(count);

    //平均值
    Double avg = emps.stream()
        .collect(Collectors.averagingDouble(Employee::getSalary));
    System.out.println(avg);

    //总和
    Double sum = emps.stream()
        .collect(Collectors.summingDouble(Employee::getSalary));
    System.out.println(sum);

    //最大值
    Optional<Employee> max = emps.stream()
        .collect(Collectors.maxBy((e1, e2) -> Double.compare(e1.getSalary(), e2.getSalary())));
    System.out.println(max.get());
    System.out.println("-------------");
    Optional<Double> max2 = emps.stream()
        .map(Employee::getSalary)
        .collect(Collectors.maxBy(Double::compare));
    System.out.println(max2.get());
    //最小值
    Optional<Double> min = emps.stream()
        .map(Employee::getSalary)
        .collect(Collectors.minBy(Double::compare));
    System.out.println(min.get());
}
```

#### 并行流 / 串行流

![Fork/Join](https://img-blog.csdnimg.cn/9e4a44a81eb24f42b5a5737e2bf9f2e1.png)

![区别](https://img-blog.csdnimg.cn/c86ff23709f94c37811e0f1f98f9f22d.png)


Fork / Join 实现：

```java
public class ForkJoinCalculate extends RecursiveTask<Long> {

    private static final long serialVersionUID = 1234567890L;

    private long start;
    private long end;

    private static final long THRESHPLD = 10000;

    public ForkJoinCalculate(long start, long end) {
        this.start = start;
        this.end = end;
    }

    @Override
    protected Long compute() {
        long length = end - start;

        if (length <= THRESHPLD) {
            long sum = 0;
            for (long i = start; i <= end; i++) {
                sum += i;
            }
        } else {
            long middle = (start + end) / 2;

            ForkJoinCalculate left = new ForkJoinCalculate(start, end);
            left.fork(); //拆分子任务 压入线程队列

            ForkJoinCalculate right = new ForkJoinCalculate(middle + 1, end);
            right.fork();

            return left.join() + right.join();
        }

        return null;
    }
}

public class TestForkJoin {

    /**
     * ForkJoin 框架
     */
    @Test
    public void test01(){
        Instant start = Instant.now();

        ForkJoinPool pool = new ForkJoinPool();
        ForkJoinCalculate task = new ForkJoinCalculate(0, 100000000L);

        Long sum = pool.invoke(task);
        System.out.println(sum);

        Instant end = Instant.now();
        System.out.println(Duration.between(start, end).getNano());
    }

    /**
     * 普通 for循环
     */
    @Test
    public void test02(){
        Instant start = Instant.now();

        Long sum = 0L;
        for (long i = 0; i < 100000000L; i++) {
            sum += i;
        }

        Instant end = Instant.now();
        System.out.println(Duration.between(start, end).getNano());
    }
}

```

Java 8 并行流 / 串行流：

```java
@Test
public void test03(){
    //串行流(单线程)：切换为并行流 parallel()
    //并行流：切换为串行流 sequential()
    System.out.println(LongStream.rangeClosed(0, 100000000L)
                       .parallel() //底层：ForkJoin
                       .reduce(0, Long::sum));

}
```

**定义**：Optional 类 (java.util.Optional) 是一个容器类，代表一个值存在或不存在，原来用 null 表示一个值不存在，现在用 Optional 可以更好的表达这个概念；并且可以避免空指针异常

常用方法：

- `Optional.of(T t)`：创建一个 Optional 实例
- `Optional.empty(T t)`：创建一个空的 Optional 实例
- `Optional.ofNullable(T t)`：若 t 不为 null，创建 Optional 实例，否则空实例
- `isPresent()`：判断是否包含某值
- orElse(T t)`：如果调用对象包含值，返回该值，否则返回 t
- `orElseGet(Supplier s)`：如果调用对象包含值，返回该值，否则返回 s 获取的值
- `map(Function f)`：如果有值对其处理，并返回处理后的 Optional，否则返回 Optional.empty()
- `flatmap(Function mapper)`：与 map 相似，要求返回值必须是 Optional

### 接口

- 接口中可以有默认方法

```java
public interface MyFun {
    default String getName(){
        return "aa";
    }
}
```

![类优先原则](https://img-blog.csdnimg.cn/df2a7c39447d468aa77f0255666d9227.png)

MyInterface

```java
public interface MyInterface {
    default String getName(){
        return "hehehe";
    }

    public static void show(){
        System.out.println("接口中的静态方法");
    }

}
```

MyFun

```java
public interface MyFun {
    default String getName(){
        return "aa";
    }
}
```

SubClass2

```java
public class SubClass2 extends MyClass implements MyInterface {
    
}
```

SubClass

```java
public class SubClass /*extends*/ implements MyInterface , MyFun {

    @Override
    public String getName() {
        return MyInterface.super.getName();
        //        return MyFun.super.getName();
    }
}
```

TestDefaultInterface

```java

public class TestDefaultInterface {
    public static void main(String[] args) {
        SubClass subClass = new SubClass();
        System.out.println(subClass.getName());
        MyInterface.show();
    }
}
```

运行结果

```java
hehehe
// aa
接口中的静态方法
```

### 时间与日期

传统的日期格式化

```java

public class DateTest {

    @Test
    public void test01(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Callable<Date> task = () -> sdf.parse("20220409");

        ExecutorService pool = Executors.newFixedThreadPool(10);

        ArrayList<Future<Date>> result = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            result.add(pool.submit(task));
        }

        for (Future<Date> future : result) {
            try {
                System.out.println(future.get());
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        }

        pool.shutdown();
    }

}
```

加锁：

```java
@Test
public void test02(){
    Callable<Date> task = () -> DateFormatThreadLocal.convert("20200517");

    ExecutorService pool = Executors.newFixedThreadPool(10);

    ArrayList<Future<Date>> result = new ArrayList<>();
    for (int i = 0; i < 10; i++) {
        result.add(pool.submit(task));
    }

    for (Future<Date> future : result) {
        try {
            System.out.println(future.get());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }

    pool.shutdown();
}
```

DateTimeFormatter：

```java

@Test
public void test03() throws ExecutionException, InterruptedException {
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMdd");

    Callable<LocalDate> task = new Callable<LocalDate>() {

        @Override
        public LocalDate call() throws Exception {
            LocalDate ld = LocalDate.parse("20161121", dtf);
            return ld;
        }

    };

    ExecutorService pool = Executors.newFixedThreadPool(10);

    List<Future<LocalDate>> results = new ArrayList<>();

    for (int i = 0; i < 10; i++) {
        results.add(pool.submit(task));
    }

    for (Future<LocalDate> future : results) {
        System.out.println(future.get());
    }

    pool.shutdown();
}
```

#### 新时间日期API

- LocalDate、LocalTime、LocalDateTime 类的实 例是**不可变的对象**，分别表示使用 ISO-8601日 历系统的日期、时间、日期和时间。它们提供 了简单的日期或时间，并不包含当前的时间信 息。也不包含与时区相关的信息。

![方法](https://img-blog.csdnimg.cn/62aaba067b994fe18bff1a9846d35a9d.png)

- `Instant 时间戳`:用于“时间戳”的运算。它是以Unix元年(传统 的设定为UTC时区1970年1月1日午夜时分)开始 所经历的描述进行运算
- `Duration `和` Period`:
  - Duration:用于计算两个“时间”间隔 
  - Period:用于计算两个“日期”间隔
- 日期的操纵
  - TemporalAdjuster : 时间校正器。有时我们可能需要获 取例如：将日期调整到“下个周日”等操作。
  - TemporalAdjusters: 该类通过静态方法提供了大量的常 用 TemporalAdjuster 的实现。
- 解析与格式化
  -  java.time.format.DateTimeFormatter类：该类提供了三种 格式化方法：
    -  ⚫ 预定义的标准格式
    -  ⚫ 语言环境相关的格式
    -  ⚫ 自定义的格式
- 时区的处理 
  - Java8 中加入了对时区的支持，带时区的时间为分别为： ZonedDate、ZonedTime、ZonedDateTime 其中每个时区都对应着 ID，地区ID都为 “{区域}/{城市}”的格式
  - 例如 ：Asia/Shanghai 等 ZoneId：该类中包含了所有的时区信息 getAvailableZoneIds() : 可以获取所有时区时区信息 of(id) : 用指定的时区信息获取ZoneId 对象

![与传统日期处理的转换](https://img-blog.csdnimg.cn/d20a2c5a5e8d4013a91cd0edff85f174.png)

```java

public class TestLocalDateTime {
   
   //6.ZonedDate、ZonedTime、ZonedDateTime ： 带时区的时间或日期
   @Test
   public void test7(){
      LocalDateTime ldt = LocalDateTime.now(ZoneId.of("Asia/Shanghai"));
      System.out.println(ldt);
      
      ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("US/Pacific"));
      System.out.println(zdt);

      LocalDateTime ldt2 = LocalDateTime.now();
      ZonedDateTime zonedDateTime = ldt2.atZone(ZoneId.of("Asia/Shanghai"));
      System.out.println(zonedDateTime);

   }
   
   @Test
   public void test6(){
      Set<String> set = ZoneId.getAvailableZoneIds();
      set.forEach(System.out::println);
   }

   
   //5. DateTimeFormatter : 解析和格式化日期或时间
   @Test
   public void test5(){
//    DateTimeFormatter dtf = DateTimeFormatter.ISO_LOCAL_DATE;
      
      DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm:ss E");
      LocalDateTime ldt = LocalDateTime.now();
      String strDate = ldt.format(dtf);
      
      System.out.println(strDate);
      
      LocalDateTime newLdt = LocalDateTime.parse(strDate, dtf);
      System.out.println(newLdt);
   }
   
   //4. TemporalAdjuster : 时间校正器
   @Test
   public void test4(){
   LocalDateTime ldt = LocalDateTime.now();
      System.out.println(ldt);
      
      LocalDateTime ldt2 = ldt.withDayOfMonth(10);
      System.out.println(ldt2);
      
      LocalDateTime ldt3 = ldt.with(TemporalAdjusters.next(DayOfWeek.SUNDAY));
      System.out.println(ldt3);
      
      //自定义：下一个工作日
      LocalDateTime ldt5 = ldt.with((l) -> {
         LocalDateTime ldt4 = (LocalDateTime) l;
         
         DayOfWeek dow = ldt4.getDayOfWeek();
         
         if(dow.equals(DayOfWeek.FRIDAY)){
            return ldt4.plusDays(3);
         }else if(dow.equals(DayOfWeek.SATURDAY)){
            return ldt4.plusDays(2);
         }else{
            return ldt4.plusDays(1);
         }
      });
      
      System.out.println(ldt5);
      
   }
   
   //3.
   //Duration : 用于计算两个“时间”间隔
   //Period : 用于计算两个“日期”间隔
   @Test
   public void test3(){
      Instant ins1 = Instant.now();
      
      System.out.println("--------------------");
      try {
         Thread.sleep(1000);
      } catch (InterruptedException e) {
      }
      
      Instant ins2 = Instant.now();
      
      System.out.println("所耗费时间为：" + Duration.between(ins1, ins2));
      
      System.out.println("----------------------------------");
      
      LocalDate ld1 = LocalDate.now();
      LocalDate ld2 = LocalDate.of(2011, 1, 1);
      
      Period pe = Period.between(ld2, ld1);
      System.out.println(pe.getYears());
      System.out.println(pe.getMonths());
      System.out.println(pe.getDays());
   }
   
   //2. Instant : 时间戳。 （使用 Unix 元年  1970年1月1日 00:00:00 所经历的毫秒值）
   @Test
   public void test2(){
      Instant ins = Instant.now();  //默认使用 UTC 时区
      System.out.println(ins);
      
      OffsetDateTime odt = ins.atOffset(ZoneOffset.ofHours(8));
      System.out.println(odt);
      
      System.out.println(ins.getNano());
      
      Instant ins2 = Instant.ofEpochSecond(5);
      System.out.println(ins2);

      System.out.println(ins.toEpochMilli());
   }
   
   //1. LocalDate、LocalTime、LocalDateTime
   @Test
   public void test1(){
      LocalDateTime ldt = LocalDateTime.now();
      System.out.println(ldt);
      
      LocalDateTime ld2 = LocalDateTime.of(2016, 11, 21, 10, 10, 10);
      System.out.println(ld2);
      
      LocalDateTime ldt3 = ld2.plusYears(20);
      System.out.println(ldt3);
      
      LocalDateTime ldt4 = ld2.minusMonths(2);
      System.out.println(ldt4);
      
      System.out.println(ldt.getYear());
      System.out.println(ldt.getMonthValue());
      System.out.println(ldt.getDayOfMonth());
      System.out.println(ldt.getHour());
      System.out.println(ldt.getMinute());
      System.out.println(ldt.getSecond());
   }

}
```


### 注解
#### 重复注解

定义注解：

```java
@Repeatable(MyAnnotations.class) //指定容器类
@Target({ElementType.TYPE, ElementType.METHOD,  ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation {
    String value() default "Java 8";
}

```

定义容器：

```java
@Target({ElementType.TYPE, ElementType.METHOD,  ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotations {

    MyAnnotation[] value();
}

```

@Test：

```java
public class Test01 {

    //重复注解
    @Test
    @MyAnnotation("Hello")
    @MyAnnotation("World")
    public void test01() throws NoSuchMethodException {
        Class<Test01> clazz = Test01.class;
        Method test01 = clazz.getMethod("test01");
        MyAnnotation[] mas = test01.getAnnotationsByType(MyAnnotation.class);
        for (MyAnnotation ma : mas) {
            System.out.println(ma.value());
        }
    }
}

```

#### 类型注解

- Java 8 新增注解：新增ElementType.TYPE_USE 和ElementType.TYPE_PARAMETER（在Target上）

<div style="position: relative; padding: 30% 45%;">
    <iframe style="
        position: absolute; 
        width: 100%; 
        height: 100%; 
        left: 0; top: 0;" 
        src="//player.bilibili.com/player.html?aid=62117143&bvid=BV1ut411g7E9&cid=107981921&page=1&high_quality=1" 
        scrolling="no" 
        border="0" 
        frameborder="no" 
        framespacing="0" 
        allowfullscreen="true">
    </iframe>
</div>
