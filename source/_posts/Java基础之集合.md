---
title: Java基础之集合
top: false
cover: false
author: ssm
toc: true
img: https://img-blog.csdnimg.cn/9d3caa9f8b99496bb61e8a8cd953be4d.png
mathjax: true
date: 2022-04-03 21:44:47
password:
summary: 总结集合的知识-----------------------------------------
tags: java
categories: 后端
---

![Collection](https://img-blog.csdnimg.cn/05c461e36b764b188780d645d888a417.png)
![Map](https://img-blog.csdnimg.cn/3c9eea82a00b424a9c30b176bec6cc2d.png)

### 集合概述

- 集合不能直接存储基本数据类型，另外集合也不能直接存储java对象，集合当中存储的都是java对象的内存地址。（集合中存储的是引用）

Java 集合主要有 3 种重要的类型：

- List：是一个<font color="red">有序</font>集合，可以放<font color="red">重复</font>的数据
- Set：是一个<font color="red">无序</font>集合，<font color="red">不允许放重复的数据</font>
- Map：是一个<font color="red">无序</font>集合，集合中包含一个<font color="blue">键对象</font>，一个<font color="blue">值对象</font>，<font color="blue">键对象不允许重复</font>，值对象可以重 复（身份证号—姓名）

| 数据类型    | 接口                                  | 注释                                                         |
| :---------- | :------------------------------------ | :----------------------------------------------------------- |
| boolean     | **add**(E o)                          | 确保此 collection 包含指定的元素（可选操作）。               |
| boolean     | **addAll**(Collection<? extends E> c) | 将指定 collection 中的所有元素都添加到此 collection 中（可选操作）。 |
| void        | **clear**()                           | 移除此 collection 中的所有元素（可选操作）。                 |
| boolean     | **contains**(Object o)                | 如果此 collection 包含指定的元素，则返回 true。              |
| boolean     | **containsAll**(Collection<?> c)      | 如果此 collection 包含指定 collection 中的所有  元素，则返回 true。 |
| boolean     | **equals**(Object o)                  | 比较此 collection 与指定对象是否相等。                       |
| int         | **hashCode**()                        | 返回此 collection 的哈希码值。                               |
| boolean     | **isEmpty**()                         | 如果此 collection 不包含元素，则返回 true。                  |
| Iterator<E> | **iterator**()                        | 返回在此 collection 的元素上进行迭代的迭代器。               |
| boolean     | **retainAll**(Collection<?>c)         | 仅保留此 collection 中那些也包含在指定  collection 的元素（可选操作）。 |
| int         | **size**()                            | 返回此 collection 中的元素数。                               |
| Object[]    | **toArray**()                         | 返回包含此 collection 中所有元素的数组。                     |
| <T> T []    | **toArray**(T[] a)                    | 返回包含此 collection  中所有元素的数组；返回数组的运行时类型与指定数组的运行时类型相同。 |
| boolean     | **remove**(Object o)                  | 从此 collection  中移除指定元素的单个实例，如果存在的话（可选操作）。 |
| boolean     | **hasNext**()                         | 如果仍有元素可以迭代，则返回true                             |
| E           | **next**()                            | 返回迭代的下一个元素。                                       |

>  关于Iterator 接口说明，Iterator 称为迭代接口，通过此接口可以遍历集合中的数据，此接口主要方法为上面表格最后两个

### Colection

### Collection接口常用方法

```java

public class CollectionTest01 {
    public static void main(String[] args) {
         //Collection c = new Collection()  //接口是抽象的 无法实例化
        Collection collection = new ArrayList();
        collection.add(1200);//自动装箱
        collection.add(new Object());
        collection.add(true);
        collection.add(new student());
        System.out.println("c集合中的元素个数是: "+collection.size());

        collection.clear();
        System.out.println("c集合中的元素个数是: "+collection.size());

        collection.add("Hello!");//""Hello对象的内存地址存放到集合当中
        collection.add("少少");
        collection.add("焰灵姬");

        boolean collection1 = collection.contains("少少");
        System.out.println(collection1);
        boolean collection2 = collection.contains("少少2");
        System.out.println(collection2);
        System.out.println(collection.size());

        collection.remove("少少");
        System.out.println(collection.size());

        System.out.println(collection.isEmpty());
        collection.add(100);
        Object [] objects = collection.toArray();
        for (int i = 0; i <objects.length ; i++) {
            System.out.print(objects[i]+" ");
        }
    }
}

class student{

}
```

#### 集合遍历 迭代

-<font color="red">集合结构只要发生改变，迭代器必须重新获取</font>,如果还是用的之前的迭代器，就会出现异常`java.util.ConcurrentModificationException`

```java
public class CollectionTest02 {
    public static void main(String[] args) {
        //以下讲解的遍历方式/迭代方式,是所有collection通用的一种方式
        //在map集合中不能用.在所有的   collection以及子类中使用
        //创建集合对象
        Collection collection = new ArrayList();//后面的集合无所谓,主要是看前面的collection接口,怎么遍历 怎么迭代
        collection.add(123);
        collection.add("ada");
        collection.add(new Object());
        //获取集合对象的迭代器对象iterator
        Iterator iterator = collection.iterator();
        while (iterator.hasNext()){
            Object object = iterator.next();
            System.out.println(object);
        }

        Collection collection1 = new HashSet();
        collection1.add(100);
        collection1.add("123a");
        collection1.add(100);
        collection1.add(new Object());
        Iterator iterator2 = collection1.iterator();
        while (iterator2.hasNext()){
            Object object = iterator2.next();
            System.out.println(object);
        }
    }
}
```

#### 深入了解contains

```java
//深入了解contains
public class CollectionTest03 {
    public static void main(String[] args) {
        //创建集合对象
        Collection collection = new ArrayList();
        String s1 = new String("ad");
        collection.add(s1);
        String s2 = new String("da");
        collection.add(s2);
        System.out.println(collection.size());
        String s3 = new String("ad");
        System.out.println(collection.contains(s3));
    }
}
----------------------------------------------------
2
true
----------------------------------------------------
public static void main(String[] args) {
        Collection collection = new ArrayList();
        User u1  = new User("jack");
        User u2  = new User("jack");
        collection.add(u1);
        System.out.println(collection.contains(u2));

        Collection cc = new ArrayList();
        String s1 = new String("hello");
        cc.add(s1);
        String s2 = new String("hello");
        cc.remove(s2);
        System.out.println(cc.size());

}    
class User{
    private String name;

    public User() {
    }

    public User(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(name, user.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
----------------------------------------------------
true
0
```

#### remove

```java
Collection collection1 = new ArrayList();
        collection1.add("abc");
        collection1.add("def");
        collection1.add("xyz");
        Iterator iterator = collection1.iterator();
        while (iterator.hasNext()){
            Object o = iterator.next();
           iterator.remove();
            System.out.println(o);
        }
        System.out.println(collection1.size());
    }
```

### List接口特有方法

```java

public class ListTest01 {
    public static void main(String[] args) {
        List list = new ArrayList();
        list.add("a");
        list.add("b");
        list.add("king");
        list.add("c");
        list.add(1,"king");
        Iterator iterator = list.iterator();
        while (iterator.hasNext()){
            System.out.println(iterator.next());
        }
        System.out.println("------------------");
        Object firstObject = list.get(0);
        System.out.println(firstObject);
        System.out.println("-----------------------------");
        for (int i = 0; i <list.size(); i++) {
            System.out.println(list.get(i));
        }
        System.out.println("--------------------342----");
        System.out.println(list.indexOf("king"));
        System.out.println("-----");
        System.out.println(list.lastIndexOf("king"));
        System.out.println("--------");
        list.remove(0);
        System.out.println(list.size());
        System.out.println("----------------");
        list.set(0,"huxinlaing");

        for (int i = 0; i <list.size() ; i++) {
            System.out.println(list.get(i));
        }
    }
}
```

#### ArrayList

- 默认初始化容量是10

- 扩容倍数是扩容到原容量的1.5（右移一位）倍

> 右移一位就是除以2，左移一位就是乘以2

> array list 底层是数组：
>
> 数组优点：检索效率高（每个元素占用空间大小相同，内存地址是连续的，知道元素内存地址，然后知道下标，通过数学表达式计算元素的内存地址，所以检索效率高）
>
> 数组缺点：随机增删元素效率比较低
>
> <font color="orange">arraylist不是线程安全的集合</font>
>
> ```java
> List myList = new ArrayList();//非线程安全的
> Collections.synchronizedCollection(myList);//线程安全的
> ```
>

```java
// ArrayList 的另一个构造方法
public class ArrayListTest {
    public static void main(String[] args) {
        // 默认初始化容量是10
        List list = new ArrayList();
        // 指定容量
        List list1= new ArrayList(100);
	    // 创建一个HashSet集合
        Collection collection1 = new HashSet();
        collection1.add(100);
        collection1.add(200);
        collection1.add(300);
        collection1.add(900);
        // 通过这个构造方法可以将HashSet集合转换成List集合
        List list2 = new ArrayList(collection1);
        for (int i = 0; i <list2.size() ; i++) {
            System.out.println(list2.get(i));
        }
    }
}
```

#### LinkedList

- 没有初始化容量
- 底层是双向链表

> 链表的优点：由于链表上的元素在空间存储上内存地址不连续，所以随机增删元素的时候不会有大量元素唯一，因此随机增删效率较高。
>
> 链表的缺点：不能通过数学表达式计算查找元素的内存地址，每一次都是从头查找，知道查找位置。所哟linkList集合检索效率较低。

```java
List list1= new LinkList();
// 和arraylist同理
```

### Vector

- 底层是数组
- 初始化容量10
- 扩容方式x2

```java
public class VectorTest {
    public static void main(String[] args) {
        //Vector vector = new Vector();
        List vector = new Vector();
        //默认容量10个
        vector.add(1);
        vector.add(2);
        vector.add(3);
        vector.add(4);
        vector.add(5);
        vector.add(6);
        //扩容是元容量的二倍
        //10--->20--->40
        //ArrayList
        //10--->15--->15*1.5--->15*1.5*1.5
        Iterator iterator = vector.iterator();
        while (iterator.hasNext()){
            Object o = iterator.next();
            System.out.println(o);
        }
        List myList = new ArrayList();//非线程安全的
        //线程安全的
        Collections.synchronizedCollection(myList);//线程安全的
        myList.add("111");
        myList.add("222");

    }
}

```

### Set

#### HashSet

- 无序不可重复
- 放到`HashSet`集合中的元素实际上是放到`HashMap`集合的`key`部分

```java

public class HashSetTest01 {
    public static void main(String[] args) {
        Set<String> strings = new HashSet<>();
        strings.add("hello1");
        strings.add("hello8");
        strings.add("hello2");
        strings.add("hello3");
        strings.add("hello4");
        strings.add("hello3");
        for (String s: strings
             ) {
            System.out.println(s);
        }
    }
}
------------------------------
hello1
hello4
hello2
hello3
hello8
```

#### TreeSet

- 底层实际上是一个TreeMap（TreeMap底层是二叉树）
- 放到TreeSet集合中的元素，等同于放到TreeMap集合的key部分
- 无序不可重复，但是存储的元素可以<font color="red">自动按照元素的大小顺序排序</font>，称：可排序集合

```java

public class TreeSetTest01 {
    public static void main(String[] args) {
        Set<String> stringSet = new TreeSet<>();
        stringSet.add("hello1");
        stringSet.add("hello2");
        stringSet.add("hello7");
        stringSet.add("hello4");
        stringSet.add("hello2");
        for (String s: stringSet
             ) {
            System.out.println(s);
        }
    }
}
-----------------------------------
hello1
hello2
hello4
hello7
```

> 无序：存进去的顺序和取出来的顺序不同，并且没有下标

```java
public static void main(String[] args) {
        TreeSet<String> treeSet = new TreeSet<>();
        treeSet.add("zhangsan");
        treeSet.add("zhangsi");
        treeSet.add("wangwu");
        treeSet.add("giaji");
        treeSet.add("wangliu");
        for (String tree: treeSet
             ) {
            System.out.println(tree);
        }
    }
```

#### 无法对自定义类型排序

> 得实现`Comparable`接口，在接口中写比较逻辑

```java

public class TreeSetTest04 {
    public static void main(String[] args) {
        TreeSet<Vip> treeSet = new TreeSet<>();
        treeSet.add(new Vip(23,"hu"));
        treeSet.add(new Vip(25,"hua"));
        treeSet.add(new Vip(30,"huxin"));
        treeSet.add(new Vip(28,"huxinliang"));
        treeSet.add(new Vip(25,"huda"));

        for (Vip v:treeSet
             ) {
            System.out.println(v);
        }
    }
}
class Vip implements Comparable<Vip>{
    int age;
    String name;

    public Vip(int age, String name) {
        this.age = age;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Vip{" +
                "age=" + age +
                ", name='" + name + '\'' +
                '}';
    }

    @Override
    public int compareTo(Vip o) {
        if (this.age==o.age){
            return this.name.compareTo(o.name);
        }else {
            return this.age-o.age;
        }
    }


}
```

> 实现比较器接口排序

```java
package Example6;

import java.util.Comparator;
import java.util.TreeSet;

/*TreeSet 集合中元素可排序的第二种方式： 用比较器的方式 comparator
最终的结论：
    放到TreeSet集合中或者TreeMap集合key部分的元素先要做到排序,有以下两种方式
    第一种:放在集合中的元素实现jva.lang.Comparatable接口
    第二种:在构造TreeSet或者TreeMp集合的时候给他传一个比较器对象*/
public class TreeSetTest05 {
    public static void main(String[] args) {
        //TreeSet<WuGui> treeSet = new TreeSet<>();  这样不行没有通过构造方法传递参数
        //给构造方法传递比较器

        //匿名内部类直接new 接口
        TreeSet<WuGui> treeSets = new TreeSet<>(new Comparator<WuGui>() {
            @Override
            public int compare(WuGui o1, WuGui o2) {
                return o1.age - o2.age;
            }
        });
        treeSets.add(new WuGui(10000));
        treeSets.add(new WuGui(10));
        treeSets.add(new WuGui(100));
        for (WuGui t : treeSets
        ) {
            System.out.println(t);
        }

    }
}

class WuGui {
    int age;

    public WuGui(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "WuGui{" +
                "age=" + age +
                '}';
    }
}

/*
也可以使用匿名内部类的方式
class WuGuiComparator implements Comparator<WuGui>{

    @Override
    public int compare(WuGui o1, WuGui o2) {
        return o1.age-o2.age;
    }
}*/
```

> - 放到TreeSet集合中或者TreeMap集合key部分的元素先要做到排序,有以下两种方式
>   - 第一种:放在集合中的元素实现jva.lang.Comparatable接口
>   - 第二种:在构造TreeSet或者TreeMp集合的时候给他传一个比较器对象

### Map

#### Map集合的遍历

```java
package Example6;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class MapTest02 {
    public static void main(String[] args) {
        Map<Integer, String> map = new HashMap<>();
        map.put(1, "hello1");
        map.put(2, "hello2");
        Set<Integer> keys = map.keySet();
        Map map1 = new HashMap();
        //迭代器
        Iterator<Integer> i = keys.iterator();
        while (i.hasNext()) {
            Integer key = i.next();
            String value = map.get(key);
            System.out.println(key + "=" + value);
        }
        //foreach
        for (Integer key : keys
        ) {
            System.out.println(key + "=" + map.get(key));
        }
        //Set<Map.Entry<Integer, String>>  Map -> Set
        Set<Map.Entry<Integer, String>> set = map.entrySet();
        Iterator<Map.Entry<Integer, String>> s = set.iterator();
        while (s.hasNext()) {
            Map.Entry<Integer, String> s1 = s.next();
            String s2 = s1.getValue();
            Integer i2 = s1.getKey();
            System.out.println(i2 + "=" + s2);
        }
        // 效率最高
        for (Map.Entry<Integer, String> node : set
        ) {
            System.out.println(node.getKey() + "=" + node.getValue());
        }
    }
}
```

#### HashMap

> * `HashMap`底层是哈希表/散列表的数据结构
> * 哈希表是数组和单向链表的结合体
> * 数组:查询方面效率较高 ,随机增删效率较低
> * 单向链表:随机增删效率较高,查询方面效率较低
> * 哈希表是这两个的结合体
> * <font color="red">放在`HashMap`集合key部分的元素,以及放在`HashSet`集合中的元素,需要同时重写`HashCode`和`equals`方法</font>
> * key重复的时候value覆盖
> * key部分元素无序不可重复
> * 默认初始化容量16（<font color="red">必须是2的倍数</font>），默认加载因子0.75（当hashmap集合底层数组的容量达到75%的时候，数组开始扩容）
> * 非线程安全的

```java

public class HashMapTest01 {
    
    public static void main(String[] args) {
        Map<Integer,String> map = new HashMap<>();
        map.put(1111,"hello1");
        map.put(6666,"hello2");
        map.put(7777,"hello5");
        // key重复的时候value覆盖
        map.put(2222,"hello22");
        map.put(2222,"hello4");

        System.out.println(map.size());
        // entrySet 将Map集合转换成Set集合
        Set<Map.Entry<Integer, String>> set = map.entrySet();
        for (Map.Entry<Integer,String> stringEntry : set
             ) {

            System.out.println(stringEntry.getKey()+"="+stringEntry.getValue());
        }
        System.out.println("------");
        Map<Integer,String> map1 = new HashMap<>();
        map1.put(10000,"dfad");
        map1.size();
        Set<Map.Entry<Integer,String>> set1 = map1.entrySet();
        for (Map.Entry<Integer,String> stringEntry:set1
             ) {
            System.out.println(stringEntry.getKey()+"="+stringEntry.getValue());
        }
    }
}
```

```java
Map<Integer,String> map = new HashMap<>();
    map.put(1,"hu");
    map.put(2,"xin");
    map.put(3,"liang");
    String string = map.get(2);
    System.out.println(string);
    System.out.println(map.size());
    map.remove(3);
    System.out.println(map.size());
    System.out.println(map.containsKey(1));
    System.out.println(map.containsValue("hu"));
    System.out.println("------");
    System.out.println(map.containsValue(new String("aa")));
    Collection<String> strings = map.values();
    for (String s: strings
         ) {
        System.out.println(s);
    }
    System.out.println("======================");
    map.clear();
    System.out.println(map.size());
    System.out.println(map.isEmpty());
}
```

#### HashTable

- 哈希表是一个数组和单向链表的结合体
- 一维数组，这个数组中每一个元素是一个单向链表
- 是线程安全的，所有方法带有`synchronize`关键字，效率低

```java
public static void main(String[] args) {
    Map map= new Hashtable();
    map.put(null,"qeq");
}
```

> - Hashtable 的key 和value 都不能为null
> - HashMap 集合的key和value都可以为null的

### Properties

- `Properties`是一个`Map`集合，继承`Hashtable`
- `Properties`的`key`和`value`都是`String`类型
- `Properties`线程安全的
- `Properties`被称为属性类对象

```java

public class ProperitesTest01 {
    public static void main(String[] args) {
        Properties pro = new Properties();
        pro.setProperty("url","jdbc:mysql://localhost:3306/www.baidu.com");
        pro.setProperty("driver","com.mysql.jdbc.Driver");
        pro.setProperty("username","root");
        pro.setProperty("password","123");
        String url = pro.getProperty("url");
        String driver = pro.getProperty("driver");
        String username = pro.getProperty("username");
        String password = pro.getProperty("password");
        System.out.println(url);
        System.out.println(driver);
        System.out.println(username);
        System.out.println(password);
    }
}
```

### Collections

> `java.util.collectio `集合接口
> `jav.util.collections `集合工具类 方便集合的操作

```java

public class CollectionsTest01 {
    public static void main(String[] args) {
        //ArrayList 不是线程安全的
        List<String> list = new LinkedList<>();
        //变成线程安全的
        Collections.synchronizedCollection(list);
        list.add("aasda");
        list.add("aaa");
        list.add("grg");
        list.add("aadde");
        Collections.sort(list);
        for (String s:list
             ) {
            System.out.println(s);
        }

        //对lis集合排序 要保证list集合实现了Comparbale 接口
        List<WuGui2> list1 = new LinkedList<>();
        list1.add(new WuGui2(1000));
        list1.add(new WuGui2(100));
        list1.add(new WuGui2(105));
        list1.add(new WuGui2(300));
        Collections.sort(list1);
        for (WuGui2 wg: list1
             ) {
            System.out.println(wg);
        }
		
        Set<String> strings = new HashSet<>();
        strings.add("da");
        strings.add("dada");
        strings.add("daaaa"); strings.add("dhnfuab");
        List<String> list2 = new ArrayList<>(strings);
        Collections.sort(list2);
        for (String string:list2
             ) {
            System.out.println(string);
        }


    }
}

class WuGui2 implements Comparable<WuGui2>{
    int age;

    public WuGui2(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "WuGui2{" +
                "age=" + age +
                '}';
    }

    @Override
    public int compareTo(WuGui2 o) {
        return this.age - o.age;
    }
}
```

### 总结

#### ArrayListTest

```java
package CollectionReview;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;

public class ArrayListTest {
    public static void main(String[] args) {
        //ArrayList<String> list = new ArrayList<>();
        LinkedList<String> list = new LinkedList<>();
        list.add("zhangsan");
        list.add("lisi");
        list.add("waangwu");
        String s = list.get(0);
        System.out.println(s);
//下标
        for (int i = 0; i <list.size() ; i++) {
            String s1 = list.get(i);
            System.out.println(s1);
        }

//迭代器
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()){
            String s1 = iterator.next();
            System.out.println(s1);
        }
     /*   for ( Iterator<String> iterator2 = list.iterator();iterator2.hasNext()){
            System.out.println(iterator2.next());
        }*/

   //foreach
        for (String s2:list
             ) {
            System.out.println(s2);
        }
    }
}
```

#### HashMapTest

```java
package CollectionReview;

import sun.nio.cs.ext.MacArabic;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class HashMapTest {
    public static void main(String[] args) {
        Map<Integer,String> map = new HashMap<>();
        map.put(1,"zhangsan");
        map.put(2,"lisiaad");
        map.put(9,"lisisdadada");
        map.put(2,"lisi");
        map.put(3,"wangwu");
        System.out.println(map.size());
        System.out.println(map.get(2));
        Set<Integer> k = map.keySet();
        for (Integer i:k
             ) {
            System.out.println(i+"="+map.get(i));
        }


        Set<Map.Entry<Integer,String>> set = map.entrySet();
        for (Map.Entry<Integer,String> stringEntry:set
             ) {
            System.out.println(stringEntry.getKey()+"="+stringEntry.getValue());
        }

    }
}
```

#### HashSetTest

```java
package CollectionReview;

import com.sun.org.apache.xerces.internal.impl.xpath.XPath;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Objects;
//无序不可重复
public class HashSetTest {
    public static void main(String[] args) {
        HashSet<String> set = new HashSet<>();
        set.add("abc");
        set.add("def");
        set.add("king");
        //set 集合中的元素不能通过下标的方式取。没有下标
        Iterator<String> stringIterator = set.iterator();
        while (stringIterator.hasNext()){
            System.out.println(stringIterator.next());
        }
        for (String s:set
             ) {
            System.out.println(s);
        }
        set.add("king");
        set.add("king");
        set.add("king");
        System.out.println(set.size());

        HashSet<Student> hashSet = new HashSet<>();
        hashSet.add(new Student(100,"张三"));
        hashSet.add(new Student(120,"里斯"));
        hashSet.add(new Student(100,"张三"));
        System.out.println(hashSet.size());
        for (Student s:hashSet
             ) {
            System.out.println(s);
        }
    }
}
class Student{
    int no;
    String name;

    public Student() {
    }

    public Student(int no, String name) {
        this.no = no;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{" +
                "no=" + no +
                ", name='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return no == student.no &&
                Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(no, name);
    }
}
```

#### PropertiesTest

```java
package CollectionReview;

import java.util.Properties;

public class PropertiesTest {
    public static void main(String[] args) {
        Properties pro = new Properties();
        pro.setProperty("username","hua");
        pro.setProperty("PassWord","123");
        String username = pro.getProperty("username");
        String password = pro.getProperty("PassWord");
        System.out.println(username);
        System.out.println(password);
    }
}
```

#### TreeSetTest

```java
package CollectionReview;

import java.util.Comparator;
import java.util.Iterator;
import java.util.Objects;
import java.util.TreeSet;

//可排序 不可重复
public class TreeSetTest {
    public static void main(String[] args) {
        //传入比较器可以改变排序规则

        TreeSet<Integer> treeSet = new TreeSet<>(new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o2 - o1;
            }
        });
        treeSet.add(10);
        treeSet.add(0);
        treeSet.add(54);
        treeSet.add(54);
        treeSet.add(54);
        treeSet.add(12);
        Iterator<Integer> integerIterator = treeSet.iterator();
        while (integerIterator.hasNext()) {
            System.out.println(integerIterator.next());
        }

        for (Integer i : treeSet
        ) {
            System.out.println(i);
        }


        TreeSet<A> aSet = new TreeSet<>();
        aSet.add(new A(100));
        aSet.add(new A(50));
        aSet.add(new A(300));
        aSet.add(new A(160));
        aSet.add(new A(140));
        Iterator<A> aIterator = aSet.iterator();
        while (aIterator.hasNext()) {
            System.out.println(aIterator.next());
        }

        for (A b : aSet
        ) {
            System.out.println(b);
        }


        TreeSet<B> treeSet1 = new TreeSet<>(new BComparator());

//匿名内部类
/*TreeSet<B> treeSet1 = new TreeSet<>(new Comparator<B>() {
    @Override
    public int compare(B o1, B o2) {
        return o1.i-o2.i;
    }
});*/
        treeSet1.add(new B(100));
        treeSet1.add(new B(300));
        treeSet1.add(new B(200));
        treeSet1.add(new B(150));
        Iterator<B> iterator = treeSet1.iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
        for (B b : treeSet1
        ) {
            System.out.println(b);
        }

    }
}

class A implements Comparable<A> {
    int i;

    public A(int i) {
        this.i = i;
    }

    @Override
    public String toString() {
        return "A{" +
                "i=" + i +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        A a = (A) o;
        return i == a.i;
    }

    @Override
    public int hashCode() {
        return Objects.hash(i);
    }

    @Override
    public int compareTo(A o) {
        return this.i - o.i;
    }
}

class B {
    int i;

    public B(int i) {
        this.i = i;
    }

    @Override
    public String toString() {
        return "B{" +
                "i=" + i +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        B b = (B) o;
        return i == b.i;
    }

    @Override
    public int hashCode() {
        return Objects.hash(i);
    }
}

//比较器
class BComparator implements Comparator<B> {


    @Override
    public int compare(B o1, B o2) {
        return o1.i - o2.i;
    }
}
```

