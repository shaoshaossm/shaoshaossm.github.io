---
title: java之泛型理解
top: false
cover: false
toc: true
mathjax: true
date: 2022-04-10 17:23:42
password:
img: https://img-blog.csdnimg.cn/9d3caa9f8b99496bb61e8a8cd953be4d.png
summary: 总结在java中使用泛型------------------------------------
tags: [java]
categories: 后端
---

### 泛型

- 用泛型来指定集合中存储的数据类型

> 优点：
>
> - 集合中存储的元素类型统一
> - 从集合中取出的元素类型是泛型指定的类型，不需要大量的“向下转型”

**案例**

```java
public class GenericTest01 {
    public static void main(String[] args) {
    /* 没有使用泛型
     List list = new ArrayList();
        Cat cat = new Cat();
        Bird bird = new Bird();
        list.add(cat);
        list.add(bird);
        Iterator iterator =list.iterator();
        while (iterator.hasNext()){
            Object object = iterator.next();
            if (object instanceof Animal){
                Animal animal = (Animal)object;
                animal.move();
            }
            if (object instanceof Bird){
                Bird bird1 = (Bird)object;
                bird1.fly();
            }else if (object instanceof Cat){
               Cat cat1 = (Cat)object;
               cat1.catchMouse();
            }
        }*/


    //使用泛型
        List<Animal> list = new ArrayList<Animal>();

        //list.add("dada"); 错误 只能存储Animal
        Cat cat = new Cat();
        Bird bird = new Bird();

        list.add(cat);
        list.add(bird);

        Iterator<Animal> iterator = list.iterator();
        while (iterator.hasNext()){
            Animal animal = iterator.next();
            //animal.move();
            if (animal instanceof Cat){
                Cat cat1 = (Cat)animal;
                cat1.catchMouse();
            }if (animal instanceof Bird){
                Bird bird1 = (Bird)animal;
                bird1.fly();
            }
        }


    }
}
class Animal{
    private String name;
public void move(){
    System.out.println("动物在移动!");
}
}

class Cat extends Animal{
    public void catchMouse(){
        System.out.println("猫捉老鼠");
    }

}
class Bird extends Animal {
    public void fly() {
        System.out.println("鸟儿在飞翔");
    }
}
```

### 类型自动推断

- 后面的类型可以省略`List<Animal> list = new ArrayList<>();`

```java
/*
* 自动类型推断机制 钻石表达式
* */
public class GenericTest02 {
    public static void main(String[] args) {
        List<Animal> list = new ArrayList<>();
        list.add(new Cat());
        list.add(new Bird());
        list.add(new Animal());
        Iterator<Animal> iterator = list.iterator();
        while (iterator.hasNext()){
            Animal animal = iterator.next();
            animal.move();
        }
        List<String > list1 = new ArrayList<>();
        list1.add("dadaaaaaaaaaaa");
        list1.add("abcdefghigklmn");
        Iterator<String> iterator1 = list1.iterator();
        while (iterator1.hasNext()){
            String string = iterator1.next();
            System.out.println(string+" ");
            String newString = string.substring(6);
            System.out.println(newString);

        }
    }
}
```

### 自定义泛型

```java
package Example6;
// E 标识符 随便写
public class GenericTest03<E> {

    public void doSome(E o){

        System.out.println(o);
    }


    public static void main(String[] args) {
        //GenercicTest03<String> genercicTest03 = new GenercicTest03();
        //genercicTest03.doSome("\033[32;4m" + "123" + "\033[0m") ;
        GenericTest03<Integer> genercicTest031 = new GenericTest03<>();
        genercicTest031.doSome(1000);

       /* System.out.println("\033[30;4m" + "123" + "\033[0m");
        System.out.println("\033[31;4m" + "Hello" + "\033[0m");
        System.out.println("\033[32;4m" + "Hello" + "\033[0m");
        System.out.println("\033[33;4m" + "Hello" + "\033[0m");
        System.out.println("\033[34;4m" + "Hello" + "\033[0m");
        System.out.println("\033[35;4m" + "Hello" + "\033[0m");
        System.out.println("\033[36;4m" + "Hello" + "\033[0m");
        System.out.println("\033[37;4m" + "Hello" + "\033[0m");
        System.out.println("\033[40;31;4m" + "Hello" + "\033[0m");
        System.out.println("\033[41;32;4m" + "Hello" + "\033[0m");
        System.out.println("\033[42;33;4m" + "Hello" + "\033[0m");
        System.out.println("\033[43;34;4m" + "Hello" + "\033[0m");
        System.out.println("\033[44;35;4m" + "Hello" + "\033[0m");
        System.out.println("\033[45;36;4m" + "Hello" + "\033[0m");
        System.out.println("\033[46;37;4m" + "Hello" + "\033[0m");*/

        MyIterator<String > myIterator = new MyIterator();
        String s = myIterator.get();

        MyIterator<Animal > myIterator2 = new MyIterator();
        Animal s2 = myIterator2.get();

        GenericTest03 genercicTest032 = new GenericTest03();
        genercicTest032.doSome(new Object());
    }



}
class MyIterator<T>{
    public T get(){
        return null;
    }
}
```

> java源代码中经常出现的是：
>
> ​	<E> 和 <T>
>
> E：Element单词首字母
>
> T：Type单词首字母

<div style="position: relative; padding: 30% 45%;">
    <iframe style="
        position: absolute; 
        width: 100%; 
        height: 100%; 
        left: 0; top: 0;" 
        src="//player.bilibili.com/player.html?aid=11361088&bvid=BV1Rx411876f&cid=231253056&page=689&high_quality=1" 
        scrolling="no" 
        border="0" 
        frameborder="no" 
        framespacing="0" 
        allowfullscreen="true">
    </iframe>
</div>
