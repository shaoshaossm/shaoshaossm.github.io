---
title: java基础
top: false
cover: false
toc: true
mathjax: true
date: 2021-09-22 18:13:56
password:
img: https://img-blog.csdnimg.cn/9d3caa9f8b99496bb61e8a8cd953be4d.png
summary: 基础不牢,天崩地裂.遇到的java基础问题记录一下,一点点积累吧!
tags: java
categories: 后端
---

### 引用

-  Java中的引用指的是除开那些特定的基本类型之外的变量类型.~ 
-  对于基本类型 如 int，char，boolean，float等基本类型，变量名不是引用，他直接指向具体的值，只有<font color="red">对象类型</font>的变量名才是引用
-  Java只有一种参数传递方式：那就是按值传递，即Java中传递任何东西都是传值。 

举例1:

```java
public class test {
    public static void main(String[] args) {
        int nums1[] = new int[2];
        int nums2[] = new int[3];
        nums1[0] = 50;
        nums2[0] = 10;
        nums2[1] = 20;
        nums2[2] = 30;
        nums1 = nums2;        # nums2 = nums1
        for (int x : nums1) {
            System.out.print(x + " ");
        }
        System.out.println();
        for (int x : nums2) {
            System.out.print(x + " ");
        }
        System.out.println();
        System.out.println(nums1 == nums2);
        System.out.println(nums1.equals(nums2));
    }

}

输出结果:                               输出结果:
10 20 30                               50 0
10 20 30                               50 0
true    # nums1指向的内存地址是nums2
true    # 总结:指向的是右边的内存地址
```

分析:
这里的 nums1 = nums2 不是将 nums2 的值赋值给 nums1 ,而是将 nums2指向了nums1的对象,或把nums2的内存地址指向给nums1,所以nums1的值就为nums2的值 .

举例2:

```java
public class test {
    public static void main(String[] args) {
        String x = "ab";
        System.out.println(x);
        change(x);
        System.out.println(x);
    }
    public static void change(String a) {
        a = "cd";
    }
}

输出结果:
ab      # x本身
cd      # a这里引用的是"cd"的内存地址 入参的作用域也仅限函数内部，属于局部变量
ab      # x本身,不会因为上面的change(x)而改变
```



- 在JAVA里，<font color="blue">“=”不能被看成是一个赋值语句，它不是在把一个对象赋给另外一个对象，它的执行过程实质上是将右边对象的地址传给了左边的引用，使得左边的引用指向了右边的对象</font>。JAVA表面上看起来没有指针，但它的引用其实质就是一个指针，<font color="blue">引用里面存放的并不是对象，而是该对象的地址，使得该引用指向了对象</font>。
- 在JAVA里，“=”语句不应该被翻译成赋值语句，因为它所执行的确实不是一个赋值的过程，<font color="blue">而是一个传地址的过程</font>
- 在JAVA中，<font color="blue">方法的入参对于基本数据类型和字符串常量来说，传递的其实只是这个值本身的一个拷贝而已</font>，对于外面的变量来说，并没有改变什么，入参的作用域也仅限函数内部，属于局部变量（对于包装类型和String，依然如此）。 
- 综上所述，可以简单的记为，在初始化时，<font color="blue">“=”语句左边的是引用，右边new出来的是对象。在后面的左右都是引用的“=”语句时，左右的引用同时指向了右边引用所指向的对象。</font>
  再所谓实例，其实就是对象的同义词。 

### 访问权限

| 访问权限 | 本类 | 本包的类 | 子类 | 非子类的外包类 |
| -------- | ---- | -------- | ---- | -------------- |
| public   | √    | √        | √    | √              |
| protect  | √    | √        | √    |                |
| default  | √    | √        |      |                |
| private  | √    |          |      |                |




### 构造器 继承问题

- 父类 仅仅声明了有参构造函数，没有自己声明无参构造函数，则子类必须**重写**父类构造函数 

  父类 有无参构造函数，则子类**不必重写**父类构造函数。

###  this& static

```java
publist clatt Test{
    

int num = 10; //示例变量 (引用.的方式访问)
publis static void main (String [] args){
    System.out.println(num)  // 编译报错
    Test t = new Test
    System.out.println(t.num)
}
    }
```

### abstract类与接口的比较

- `abstract`类和接口都可以有`abstract`方法
- 接口中只可以有常量,不能有变量,而`abstract`类中既可以有常量也可以有变量
- `abstract`类中也可以有非`abstract`方法,接口不可以
- 抽象类的子类不是必须需要实现抽象类的抽象方法,如果抽象类的子类也是个抽象类的话就不用实现
- 具有抽象方法的类必须是抽象类

---

- 方法的调用

- <font color="red">引用</font>.方法   不带有<font color="red">static </font>的方法是通过引用的方式访问的,这个过程需要对象的参与 (student1.方法)
- <font color="red">类名 </font>.方法  带有<font color="red">static </font>的方法是用过类名的方式访问的,这个执行过程中没有当前对象,自然也不存在this,类名可以省略

- this不能使用在带有static 的方法中
- this. 在区分示例变量和局部变量中不能省略
- this可以使用在示例方法中,代表当前对象【语法格式：this.】
- this可以使用在构造方法中，通过当前的构造方法调用其他构造方法【语法格式：thig（实参）】
- this()这种语法只能出现在构造函数的第一行

---

- java中基本数据类型比较是否相等,使用**==**号判断
- java中所有的引用数据类型统一使用**equals**方法判断

---

- 如果A类中某个方法的参数是B类生命的对象(或某个方法返回的数据类型是B类对象),则A类依赖B类
- A类中成员变量使用B类声明的对象,则称A类关联于B类

### 内部类

```java
class Inner class {
    // 静态内部类
	static class Inner1{
        
    }
    // 实例内部类
	class Inner2{
        
    }
    public void doSome() {
        //局部内部类
        class Inner3{
            
        }
    }
}

// 匿名内部类
public static void main(String[] args) {
        MyMath myMath = new MyMath();
        //匿名内部类 (代替接口的实现) 装逼可以用用 开发建议不用
        myMath.mySum(new Compute() {
            @Override
            public int sum(int a, int b) {
                return a+b;
            }
        },10,20);
    }
interface Compute{
    int sum(int a,int b);
}
class MyMath{
    public void mySum(Compute c, int x, int y){
        System.out.println(x+"+"+y+"="+c.sum(x,y));
    }
}
```

- 装箱、拆箱

```java
Integer i = new Integer(123); // 基本数据类型->引用数据类型(手动装箱)
int retVlaue = i.intValue();  // 引用数据类型->基本数据类型(手动拆箱)
Integer x = 100;              // 自动装箱
int y = x;                    // 自动拆箱
```

### 字符串

### String

```java
    String s1 = "Hello World";
    System.out.println(s1);
    byte [] b = {97,98,99,100,101,102,103};
    String s2 = new String(b);
    System.out.println(s2);
    String s3 = new String(b,1,5);
    System.out.println(s3);
    char [] c = {'我','是','中','国','人'};
    String s4 = new String(c,2,3);
    System.out.println(s4);
    String s5 = new String("胡鑫亮");
    System.out.println(s5);
----------------------------------------------------
        Hello World
        abcdefg
        bcdef
        中国人
        胡鑫亮
```

```java

public class StringTest02 {
    public static void main(String[] args) {
        char c = "中过人".charAt(1);
        System.out.println(c);
        int result = "abc".compareTo("abc");
        System.out.println(result);
        System.out.println("Hollo World.java".contains(".java"));
        System.out.println("Hello World.java".endsWith(".java"));
        System.out.println("ABCDef".equalsIgnoreCase("abcdef"));
        System.out.println("dasagagaacavavajavadaodako".indexOf("java"));
        String s = "dada ";
        System.out.println(s.isEmpty());
        byte [] bytes = "abcdef".getBytes();
        for (int i = 0; i <bytes.length ; i++) {
            System.out.print(bytes[i]+" ");
        }
        System.out.println("-----------");
        System.out.println("javaasdafagagagagajava".lastIndexOf("java"));
        System.out.println("------------");
        String newString = "http://www.baidu.com".replace("http://","https://");
        System.out.println(newString);
        String [] ymd = "2000-11-23".split("-");
        for (int i = 0; i <ymd.length ; i++) {
            System.out.println(ymd[i]);
        }
        System.out.println("www.baidu.com".startsWith("www"));
        System.out.println("www.baidu.com".substring(4));
        System.out.println("www.baidu.com".substring(4,6));
        char [] chars = "我是中国人".toCharArray();
        for (int i = 0; i <chars.length ; i++) {
            System.out.println(chars[i]);
        }
        System.out.println("ABGJAcafhuADABGbbJFABjb".toLowerCase());
        System.out.println("ABGJAcafhuADABGbbJFABjb".toUpperCase());
        System.out.println("  adaadad  ".trim());
        String s1 = String.valueOf(true);
        System.out.println(s1);
        String  s2 = String.valueOf( new Customer2());
        System.out.println(s2);
        Object object = new Object();
        System.out.println(object);
    }

}
class Customer2{
    @Override
    public String toString() {
        return "Customer2{}";
    }
}
----------------------------------------------------------------------
过
0
true
true
true
15
false
97 98 99 100 101 102 -----------
18
------------
https://www.baidu.com
2000
11
23
true
baidu.com
ba
我
是
中
国
人
abgjacafhuadabgbbjfabjb
ABGJACAFHUADABGBBJFABJB
adaadad
true
Customer2{}
java.lang.Object@1b6d3586

```

#### StringBuffer&Stringbuilder

```java
    //StringBuffer 是线程安全的
    //Stringbuilder是非线程安全的
    String s1 = "";
    for (int i = 0; i <10 ; i++) {
        s1+=i;
        System.out.println(s1);
    }
    StringBuffer stringBuffer = new StringBuffer();
    stringBuffer.append("a");
    stringBuffer.append(true);
    System.out.println(stringBuffer);
    StringBuffer stringBuffer1 = new StringBuffer(100);

    StringBuilderTest01 stringBuilder = new StringBuilderTest01();
    stringBuilder.append(100);
    }

    private void append(int i) {
    }
```

### 抽象类

- 类和类之间具有共同特征,将这些共同特征提取出来,形成的就是抽象类
- 抽象类属于引用数据类型
- 抽象类无法实例化,无法创建对象,抽象类是用来继承的
- `final`和`abstract`不能联合使用
- 抽象类的子类可以使抽象类
- 抽象类无法实例化,但抽象类有构造方法,这个构造方法是供子类使用的
- 抽象方法中可以没有抽象类,抽象类必须在抽象方法中

### 接口

- 接口中的抽象方法定义时,`public abstract`修饰符可以省略
- 接口中的方法都是抽象方法,所以接口中的方法不能有方法体
- 接口中的常量的`public static final`可以省略
- 接口中的所有元素都是`public`修饰的

### 异常

![Java异常体系](https://img-blog.csdnimg.cn/5c4f1a1c8739415d94180c5477489a70.png)

异常的表现形式

```java
NumberFormatException nfe = new NumberFormatException("数字格式化异常");
// 异常处理两种方式 try catch 捕捉(推荐使用),或throw 抛出(让调用者处理使用,)
 try {
            FileInputStream fileInputStream = new FileInputStream("F:\\java-书\\1.txt");
            System.out.println(10/0);
        } catch (FileNotFoundException | ArithmeticException | NullPointerException e) {
            System.out.println("文件不存在?数字异常?空指针异常?都有可能!");
        } finally {
     System.out.println("finally代码一定执行,除非 System.exit(0); ");
 }

```

自定义异常

```java
public class MyExceptionTest01 extends Exception {//编译时异常

    public MyExceptionTest01() {

    }

    public MyExceptionTest01(String s) {
        super(s);
    }


}
public class MyExceptionTest01 extends RuntimeException{//运行时异常

}
```

- 重写之后的方法不能比重写之前的方法抛出更多的异常,可以更少

### 集合

![Java集合框架思维导图](https://img-blog.csdnimg.cn/0168c290b5904154a26544f805b2bf6a.png)

**ArrayList遍历三种方式**

```java
public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("da");
        list.add("da");
        //使用迭代器遍历
        Iterator<String> it = list.iterator();
        while (it.hasNext()){
            String s = it.next();
            System.out.println(s);
        }
//使用小标的方式
        for (int i = 0; i <list.size() ; i++) {
            System.out.println(list.get(i));
        }
        //使用foreach
        for (String s: list
             ) {
            System.out.println(s);
        }
    }
```

#### Map遍历的四种方式

```java
   public static void main(String[] args) {
        Map<Integer, String> map = new HashMap<>();
        map.put(1, "hello1");
        map.put(2, "hello2");
        Set<Integer> keys = map.keySet();
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
```

- Hashtable 的 key 和value 都不能为null HashMap 集合的key和value都可以为null的 (图片写错了)

- 放到TreeSet集合中或者TreeMap集合key部分的元素先要做到排序,有以下两种方式
  - 放在集合中的元素实现jva.lang.Comparable接口 
  - 在构造TreeSet或者TreeMp集合的时候给他传一个比较器对象
  - 比较规则不变或只有一个时,建议使用 Comparable接口
  - 比较规则有多个时,建议使用 Comparator 接口

```java
// Comparable
class Vip implements Comparable<Vip>{
 
    @Override
    public int compareTo(Vip o) {
        if (this.age==o.age){
            return this.name.compareTo(o.name);
        }else {
            return this.age-o.age;
        }
    }
}
// Comparator
class WuGuiComparator implements Comparator<WuGui>{
    
    @Override
    public int compare(WuGui o1, WuGui o2) {
        return o1.age-o2.age;
    }

//或者匿名内部类直接new 接口
TreeSet<WuGui> treeSets = new TreeSet<>(new Comparator<WuGui>() {
            @Override
            public int compare(WuGui o1, WuGui o2) {
                return o1.age - o2.age;
            }
        });
    
```

### I/O流

#### 流的分类

- 字节流和字符流：
  - 字节流：以字节为单位，每次次读入或读出是8位数据。可以读任何类型数据。
  - 字符流：以字符为单位，每次次读入或读出是16位数据。其只能读取字符类型数据。
- 输出流和输入流：
  - 输入流：从文件读入到内存。只能进行读操作。
  - 输出流：从内存读出到文件。只能进行写操作。
- 节点流和处理流：
  - 节点流：直接与数据源相连，读入或读出。
  - 处理流：与节点流一块使用，在节点流的基础上，再套接一层，套接在节点流上的就是处理流。处理流的构造方法总是要带一个其他的流对象做参数。一个流对象经过其他流的多次包装，称为流的链接。

![I/O流](https://img-blog.csdnimg.cn/a362489654ae473698f170100ea3cbb6.png)



#### FileInputStream

```java
FileInputStream fis = fis = new FileInputStream("");
// 一次读取一个字节 （效率低，一般不用）
while ((readData = fis.read()) !=-1){
                System.out.println(readData);
            }
// 一次读取四个字节
    byte [] bytes = new byte[4];
    int readCount = fis.read(bytes);
    System.out.println(readCount);

    System.out.println(new String(bytes,0,readCount));
    int count = 0;
    while ((count = fis.read(bytes)) != -1){
        System.out.print(new String(bytes,0,count));
    }
//
    System.out.println(fis.available()); //返回流当中剩余的没有读到的字节数量
    fis.skip(6); // 跳过几个字节不读
    System.out.println(fis.read());
    byte [] bytes = new byte[fis.available()]; //不适合太大的文件
    int readCount = fis.read(bytes);
    System.out.println(new String(bytes))
```

#### FileOutputStream

```java
FileOutputStream fos = fos = new FileOutputStream("");
byte [] bytes = {97,98,99,100,101};
    fos.write(bytes);

    fos.write(bytes,0,2);

    String s = "我是一个中国人,我骄傲!!!";
    byte [] mb = s.getBytes();
    fos.write(mb);
    fos.flush();

```

#### copy

```java
package Example7;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class CopyTest01 {
    public static void main(String[] args) {
        FileInputStream fis = null;
        FileOutputStream fos = null;

        try {
            fis = new FileInputStream("");
            fos = new FileOutputStream("");
            byte[] bytes = new byte[1024*1024];
            int reCoount = 0;
            while ((reCoount = fis.read())!=-1){
                fos.write(bytes,0,reCoount);
            }
            fos.flush();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}


    char [] chars = new char[1024*512];
    int readCount = 0;
    while ((readCount = fileReader.read(chars))!=-1){
        fileWriter.write(chars,0,readCount);
    }
    fileWriter.flush();
```

#### FileReader

```java
// 字符输入流 读取文本方便
FileReader reader = new FileReader("");
char [] chars = new char[4];
    int readerCount=0;
    while ((readerCount = reader.read(chars))!=-1){
        System.out.print(new String(chars,0,readerCount));
    }
```

#### FileWriter

```java
FileWriter out = new FileWriter("file",true);
char [] chars = {'我','是','中','国','人'};
            out.write(chars);
            out.write(chars,2,3);
            out.write("德玛西亚");
            out.write("\n");
            out.write("Hello World");
            out.flush();
```

#### BufferedReader

```java
FileReader fr = new FileReader("file");
        BufferedReader bf = new BufferedReader(fr);
        String s = null;

        while ((s = bf.readLine())!=null){
            System.out.println(s);
        }
        bf.close();


```

#### BufferedReader

```java
    FileInputStream in = new FileInputStream("file");
    InputStreamReader inputStreamReader = new InputStreamReader(in);
    BufferedReader bf = new BufferedReader(inputStreamReader);
    BufferedReader bf = new BufferedReader(new InputStreamReader(new FileInputStream("file")));
    String line = null;
    while ((line = bf.readLine())!=null){
        System.out.println(line);
    }
    bf.close();
```

#### BufferedWriter

```java
    BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter("file"));
    BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("file",true)));

    bufferedWriter.write("HelloWorld");
    bufferedWriter.write("woshi");
    bufferedWriter.write("\n");
    bufferedWriter.write("huxinlaing");
    bufferedWriter.flush();
    bufferedWriter.close();
```

#### DataOutputStream

```java
DataOutputStream dos = new DataOutputStream(new FileOutputStream(""));
        byte b = 100;
        short s = 200;
        int i = 300;
        long l = 400L;
        float f = 3.0f;
        double d = 3.14;
        boolean sex = false;
        char c = 'g';
        dos.writeByte(b);
        dos.writeShort(s);
        dos.writeInt(i);
        dos.writeLong(l);
        dos.writeFloat(f);
        dos.writeDouble(d);
        dos.writeBoolean(sex);
        dos.writeChar(c);

        dos.flush();
        dos.close();
```

#### DataInputStream

```java
 DataInputStream dis = new DataInputStream(new FileInputStream(""));
        byte b = dis.readByte();
        short s = dis.readShort();
        int i = dis.readInt();
        long l = dis.readLong();
        float f = dis.readFloat();
        double d = dis.readDouble();
        boolean sex = dis.readBoolean();
        char c = dis.readChar();

        System.out.println(c);
        System.out.println(b);
        System.out.println(s);
        System.out.println(i+1000);
        System.out.println(l);
        System.out.println(f);
        System.out.println(d);
        System.out.println(sex);

        dis.close();
```

#### PrintStream

```java
    System.out.println("Hello World!");
    //分开写
    PrintStream ps=  System.out;
    ps.println("Hello World");
    ps.println("hello lisi");
    //PrintStream printStream = (new PrintStream(new FileOutputStream("F:\\java IO流文件放置\\log")));
    System.gc();
    System.currentTimeMillis();
    // System.setOut(printStream);
    //标准输出流不在指向控制台,而是指向log文件
    System.setOut(new PrintStream(new FileOutputStream("F:\\java IO流文件放置\\log")));
    System.out.println("hello World");
```

#### ObjectOutputStream

```java
    //student对象不支持序列化 必须实现Serializable接口方可-
    Student s = new Student(100,"hu");
    ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("F:\\java IO流文件放置\\students"));
    //序列化对象
    oos.writeObject(s);
    oos.flush();
    oos.close();
```

#### ObjectInputStream

```java
    ObjectInputStream ois = new ObjectInputStream(new FileInputStream("F:\\java IO流文件放置\\students"));
	//反序列化    
	Object o = ois.readObject();
    System.out.println(o);
    ois.close();
```

- `transient` : 关键字不参与序列化

#### 序列化版本号

```java
private static final long serialVersionUID = 555516245443047316L;
```

#### Properties

```java
    //属性配置文件    
    //创建一个输入流对象
    FileReader reader = new FileReader("F:\\java IO流文件放置\\userinfo.txt");
    //新建一个map集合
    Properties pro = new Properties();

    pro.load(reader);
    String username = pro.getProperty("username");
    System.out.println(username);
    String password = pro.getProperty("password");
    System.out.println(password);
```

#### File

```java
    File f1 = new File("F:\\java IO流文件放置\\file");
    System.out.println(f1.exists());
    //以文件的形式存在
    if (!f1.exists()) {
        f1.createNewFile();
    }
    //以目录的形式存在
    if (!f1.exists()){
        f1.mkdir();
    }
    File f2 = new File("F:\\java IO流文件放置\\file\\a\\v\\c\\a\\d\\f");
    if (!f2.exists()){
        f2.mkdirs();
    }
    File f3 = new File("F:\\java IO流文件放置\\file");
    System.out.println(f3.getParent());

    File parentFile =f3.getParentFile();
    System.out.println("获取绝对路径"+parentFile.getAbsolutePath());

    File f4= new File("file");
    System.out.println(f4.getAbsoluteFile());

    System.out.println("文件名"+f1.getName());
    //判断是不是文件
    System.out.println(f1.isFile());
    //判断是不是目录
    System.out.println(f1.isDirectory());
    //获取文件最后一次修改时间
    long lastModified = f1.lastModified();
    Date time = new Date(lastModified);
    System.out.println(time);
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS");

    System.out.println(simpleDateFormat.format(time));
    System.out.println(f1.length());

    File file = new File("F:\\java IO流文件放置");
    File [] file1 = file.listFiles();
    for (File f:file1
        ) {
        System.out.println(f);
        System.out.println(f.getName());

    }
```

> **注**：输入输出流中的入和出，都是相对于系统内存而言的。为什么要有处理流？直接使用节点流，读写不方便，为了更方便的读写文件，才有了处理流。 包装流与节点流是相对而言的,外面的包装流,里面的参数是节点流

![Java I/O Mind](https://img-blog.csdnimg.cn/5695ebf864eb4de8b40bd4420bac5517.png)

![流按类型分类](https://img-blog.csdnimg.cn/f866759318fd48709367db234091f2d5.png)

![流按用途分类](https://img-blog.csdnimg.cn/df8e2e64bc754b7d9712c4e13fee5bad.png)

### 线程

线程实现三种的方式

```java
// 1. extends Thread
public static void main(String[] args) {
        MyThread myThread = new MyThread();
        myThread.start();
        for (int i = 0; i <1000 ; i++) {
            System.out.println("主线程--->"+i);
        }
    }

class MyThread extends Thread{
    @Override
    public void run() {
        //编写程序 这段程序运行在分支线程（栈）中
        for (int i = 0; i <1000 ; i++) {
            System.out.println("分支线程--->"+i);
        }
    }
}

// 2.1 implements Runnable
public static void main(String[] args) {
       Thread t = new Thread(new MyRunnable());
        t.start();
        for (int i = 0; i <100 ; i++) {
            System.out.println("主线程--->"+i);
        }
    }
class MyRunnable implements Runnable{

    @Override
    public void run() {
        for (int i = 0; i <100 ; i++) {
            System.out.println("分支线程--->"+i);
        }
    }
}
// 2.2 匿名内部类写法
 Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i <100 ; i++) {
                    System.out.println("分支线程--->"+i);
                }
            }

        });
        t.start();
        for (int i = 0; i <100 ; i++) {
            System.out.println("主线程--->"+i);
        };
    }
// 3. 实现 Callable 接口
public static void main(String[] args) throws Exception{
        //创建一个”未来任务类“对象
        FutureTask futureTask = new FutureTask(new Callable() {
            @Override
            public Object call() throws Exception {//call方法相当于run()方法
                System.out.println("call method begin!");
                Thread.sleep(1000*10);
                System.out.println("call method end!");
                int a=10;
                int b = 20;
                return a+b;
            }
        });
        //创建线程对象
        Thread t= new Thread(futureTask);
        //启动线程
        t.start();
        //获取返回值
        Object obj = futureTask.get();
        System.out.println("线程执行结果："+obj);
        //main 方法执行到这里必须等待 因为这个线程在main线程中执行
        System.out.println("Hello World!");

    }
// lambda 表达式实现
public static void main(String[] args) {
        Thread thread = new Thread(() ->{
            for (int i = 0; i < 10; i++) {
                System.out.println(i);
            }
        });
        thread.start();
    }
```

常用API

```java
myThread.start(); // 启动线程
Thread.currentThread().getName() // 获取当前线程名称
M.setName("m1"); // 设置线程名称
myThread4.sleep(1000*5); // 线程休眠
thread.interrupt();  // 终止线程休眠,采用了java异常处理机制
thread.stop();// 终止线程已过时(不建议使用)
Thread.currentThread().setPriority(1); // 设置当前线程的优先级
Thread.currentThread().getPriority() // 获取当前线程的默认优先级
Thread.MAX_PRIORITY  // 线程优先级最高
Thread.MIN_PRIORITY // 线程优先级最低
Thread.NORM_PRIORITY // 默认线程优先级
Thread.yield(); // 让步线程 暂停当前正在执行的线程对象，并执行其他线程。
thread.join();// 合并线程 thread合并到当前线程 ,当前线程受阻 thread线程直到结束
thread.setDaemon(true); //启动线程之前,将thread线程设置为守护线程

```

### 反射

获取java.lang.Class 实例的三种方法

```java
// 1.Class c1 =  Class.forName("完整类名加包名");
Class c1 =  Class.forName("java.lang.String"); // c1 : String 类型
// 2. Class c1 =  对象.getClass()
Class x = "abc".getClass();   // x : String 类型 == c1 
// 3. .Class 属性
Class v = String.class;
```

资源绑定器

```java
//只能绑定xxx.properties文件,这个文件必须在类路径下,文件扩展名必须是properties  后面的扩展名不能写
        ResourceBundle bundle = ResourceBundle.getBundle("Example9/classinfo2");
        String classname = bundle.getString("className");
```

```java
 //通过反射机制,获取Class,通过Class来实例化对象
Class c = Class.forName("Example9.bean.User");
Object obj = c.newInstance();       
c.getName() //完整类名
c.getSimpleName() // 简单类名
c.getFields() // 获取类中所有公开的属性Field
c.getDeclaredFields(); // 获取类中所有的Field(公开的)
c.getDeclaredField("no") // 获取no属性
c.getDeclaredField("no").set(obj,222) // 设置no值
c.getDeclaredField("no").get(obj) // 获取no值
c.getDeclaredField("name").setAccessible(true); // 打破封装
field.getType() //遍历获取的Fileds,获取属性的类型
field.getModifiers() // 返回的是数字,对应修饰符的代号
Modifier.toString(field.getModifiers()) // 将代号转成字符串
c.getDeclaredMethods() // 获取所有的Method (包括私有的)
method.getParameterTypes(); // 获取所有的方法参数列表
c.getDeclaredMethod().invoke // 调用方法(重要!!!) 
c.getDeclaredConstructors() // 获取所有的构造方法
c.getDeclaredConstructor(int.class) // 获取有参数的构造方法
c.getDeclaredConstructor() // 获取无参数的构造方法
c.getSuperclass() // 获取这类的父类
c.getInterfaces() // 获取类中所有的接口
c.isAnnotationPresent(MyAnnotation05.class)  // 判断类上是否有MyAnnotation05 注解
c.getAnnotation(MyAnnotation05.class) // 获取该注解对象
c.getAnnotation(MyAnnotation05.class).value // 获取注解对象的属性
    
```

### 注解

- 元注解: 用来标注注解类型的注解
  - @Target  用来标注被标注的注解可以出现在哪个位置
    - @@Target(ElementType.METHOD) 只能出现在方法上
  - @Rentention 用来标注被标注的注解最终保存在哪里
    - @Retention(RetentionPolicy.RUNTIME)  该注解只保留在java class文件中,并且可以被反射机制所读取
    - @Retention(RetentionPolicy.CLASS) 该注解只保留在java class文件中
    - @Retention(RetentionPolicy.SOURCE) 该注解只保留在java源文件中
- @Deprecated 这个注解标注的元素已过时
- @Override只能注解方法
- @Test 可直接运行方法，常用来做测试

```java
/*
自定义注解
 */
public @interface MyAnnotation {
}
// 注解中定义属性
int age() default 25; //属性指定默认值 那后面的可以不写了
@MyAnnotation02(name="shaoshao",color = "blue")
//属性名是value,并且只有一个属性值可以省略
@MyAnnotation03("hehe")
```

