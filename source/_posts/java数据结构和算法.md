---
title: java数据结构和算法(一)
top: 
cover: false
toc: true
mathjax: true
date: 2021-09-21 15:23:37
password:
summary: 稀疏数组、队列(数组模拟队列、环形队列)、链表(单、双、环形)
tags: java
categories: 数据结构和算法
---

### 1.稀疏数组sparsearray

基本介绍:

当一个数组中大部分元素为０，或者为同一个值的数组时，可以使用稀疏数组来保存该数组。

稀疏数组的处理方法是:

- 记录数组一共有几行几列，有多少个不同的值

- 把具有不同值的元素的行列及值记录在一个小规模的数组中，从而缩小程序的规模

![稀疏数组](https://img-blog.csdnimg.cn/9c934b2eebc04a1f9ebdd7737b017824.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAd2VpeGluXzQ1MjAwNzM5,size_20,color_FFFFFF,t_70,g_se,x_16)

二维数组转稀疏数组的思路:

- 遍历原始的二维数组,得到有效数据的个数 sum

- 根据sum就可以创建稀疏数组 sparseArr int [sum+1] [3]

- 将二维数组的有效数据存入到稀疏数组

  

稀疏数组转二维数组思路:

- 先读取稀疏数组的第一行,根据第一行的数据,创建原始的二维数组
- 再读取稀疏数组后几行的数据,并赋给原始的二维数组即可

代码实现:

```java
/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/9/14 18:30
 */
public class SparseArray {
    public static void main(String[] args) {
        //创建一个二位数组 11*11
        //0: 表示没有去棋子  1:表示黑子  2: 表示蓝子
        int [][] chessArr1 = new int[11][11];
        chessArr1[1][2] = 1;
        chessArr1[0][2] = 1;
        chessArr1[2][3] = 2;
        //输出原始的二维数组
        for (int[] row : chessArr1) {
            for (int data : row) {
                System.out.printf("%d\t", data);
            }
            System.out.println();
        }
        //二维数组 ------>  稀疏数组
        //1.遍历原始的二维数组得到sum总数
        int sum = 0;
        for (int i = 0; i <chessArr1.length ; i++) {
            for (int j = 0; j <chessArr1.length ; j++) {
                if (chessArr1[i][j] != 0) {
                    sum++;
                }
            }
        }
        //2.创建对应的稀疏数组
        int[][] sparseArr2 = new int[sum+1][3];
        //给稀疏数组赋值
        sparseArr2[0][0] = chessArr1.length;
        sparseArr2[0][1] = chessArr1.length;
        sparseArr2[0][2] = sum;

        //遍历二维数组 将非0的值存放到sparseArr中
        // 用于记录第几个非0数据
        int  count = 0;
        for (int i = 0; i <chessArr1.length ; i++) {
            for (int j = 0; j <chessArr1.length ; j++) {

                if (chessArr1[i][j] != 0) {
                    count++;
                    sparseArr2[count][0] = i;
                    sparseArr2[count][1] = j;
                    sparseArr2[count][2] = chessArr1[i][j];
                }
            }
        }
        System.out.println();

        System.out.println("得到的稀疏数组为~~~~");
        for (int i = 0; i <sparseArr2.length ; i++) {
            System.out.printf("%d\t%d\t%d\t\n",sparseArr2[i][0],sparseArr2[i][1],sparseArr2[i][2]);
        }
        System.out.println();

        /**
         * 稀疏数组 ---->二维数组
         */

        //1.先读取稀疏数组的第一行,根据第一行数据,创建原始的二维数组
        int[][] chessArr2 = new int[sparseArr2[0][0]][sparseArr2[0][1]];
        //2.再读取稀疏数组从第二行开始的数据,并赋值给二维数组即可
        for (int i = 1; i <sparseArr2.length ; i++) {
            chessArr2[sparseArr2[i][0]][sparseArr2[i][1]] = sparseArr2[i][2];
        }
        System.out.println("恢复后的二维数组~~~");
        for (int[] row : chessArr2) {
            for (int data : row) {
                System.out.printf("%d\t",data);
            }
            System.out.println();
        }



    }

}

```

### 2.队列

基本介绍:

- 队列是一个有序列表，可以用**数组**或是**链表**来实现。
- 遵循**先入先出**的原则。即：先存入队列的数据，要先取出。后存入的要后取出
- 使用数组模拟队列示意图:

![使用数组模拟队列示意图](https://img-blog.csdnimg.cn/bd6a1f1d78b94fa4b34cdfc28ff8318b.png)

#### 2.1 数组模拟队列数据

数据存入队列思路分析:

- 将尾指针往后移：rear+1 , 当front == rear 【空】
- 若尾指针 rear 小于队列的最大下标 maxSize-1，则将数据存入 rear所指的数组元素中，否则无法存入数据。 rear == maxSize - 1[队列满]

代码实现:

```java
import java.util.Scanner;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/9/15 9:39
 */
public class ArrayQueueDemo {
    public static void main(String[] args) {
        System.out.println("测试数组模拟环形队列~~");
        //创建队列
        ArrayQueue queue = new ArrayQueue(3);
        //接受用户输入
        char key = ' ';
        Scanner scanner = new Scanner(System.in);
        boolean loop = true;
        while (loop) {
            System.out.println("s(show): 显示队列");
            System.out.println("e(exit): 退出程序");
            System.out.println("a(add): 添加程序到队列");
            System.out.println("g(get): 从队列中获取数据");
            System.out.println("h(head): 查看队列头数据");
            key = scanner.next().charAt(0);
            switch (key) {
                case 's':
                    queue.showQueue();
                    break;
                case 'a':
                    System.out.println("请输入一个数");
                    int value = scanner.nextInt();
                    queue.addQueue(value);
                    break;
                case 'g':
                    try {
                        int res = queue.getQueue();
                        System.out.printf("取出的数据是%d\n", res);

                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                    break;
                case 'h':
                    try {
                        int res = queue.headQueue();
                        System.out.printf("取出的数据是%d\n", res);
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                    break;
                case 'e':
                    scanner.close();
                    loop = false;
                    break;
                default:
                    break;
            }
        }
        System.out.println("程序退出");
    }

}

/**
 * 使用数组模拟队列 - 编写一个ArrayQueue类
 */
class ArrayQueue {
    private int maxSize; //数组的最大容量
    private int front; //队列头
    private int rear; //队列尾
    private int[] arr; //该数组用于存放数据,模拟队列

    //创建队列的构造器
    public ArrayQueue(int arrMaxSize) {
        this.maxSize = arrMaxSize;
        arr = new int[maxSize];
        front = -1;
        rear = -1;
    }

    //判断队列是否满
    public boolean isFull() {
        return rear == maxSize - 1;
    }

    //判断队列是否为空
    public boolean isEmpty() {
        return rear == front;
    }

    //添加数据到队列中
    public void addQueue(int n) {
        //判断队列是否已满
        if (isFull()) {
            System.out.println("队列已满不能加入数据!");
            return;
        }
        //rear++;  i++先赋值然后加1 ++i是先+1然后赋值
        arr[++rear] = n;
    }

    //获取队列中的数据,出队列
    public int getQueue() {
        //判断队列是否为空
        if (isEmpty()) {
            throw new RuntimeException("队列为空,不能取数据!");
        }
        return arr[++front];
    }

    //显示队列中的所有数据
    public void showQueue() {
        if (isEmpty()) {
            System.out.println("队列为空,没有数据~~~");
            return;
        }
        for (int i = 0; i < arr.length; i++) {
            System.out.printf("arr[%d]=%d\n", i, arr[i]);
        }
    }

    //显示队列的头数据
    public int headQueue() {
        if (isEmpty()) {
            throw new RuntimeException("队列为空,没有数据~~");
        }
        return arr[front + 1];
    }


}
```

#### 2.2 数组模拟环形队列

分析说明

- 尾索引的下一个为头索引时表示队列满,即将队列容量空出一个作为约定,这个在做判断队列满的时候需要注意(rear+1)%maxSize == front [满]
- rear  == front [空]
- 队列中的有效的数据个数:(rear+maxSize-front)%maxSize //rear =1 front =0
- front指向队列的第一个元素,front 的初始值是0
- rear指向队列的最后一个元素的后一个位置,因为希望空出一个空间作为约定(判断队列是否满) rear的初始值是0

代码实现:

```java
import java.util.Scanner;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/9/15 22:22
 */
public class CircleArrayQueueDemo {
    public static void main(String[] args) {
        //创建队列
        CircleArray queue = new CircleArray(4);//这里设置的4其队列的有效数据最大是3
        //接受用户输入
        char key = ' ';
        Scanner scanner = new Scanner(System.in);
        boolean loop = true;
        while (loop) {
            System.out.println("s(show): 显示队列");
            System.out.println("e(exit): 退出程序");
            System.out.println("a(add): 添加程序到队列");
            System.out.println("g(get): 从队列中获取数据");
            System.out.println("h(head): 查看队列头数据");
            key = scanner.next().charAt(0);
            switch (key) {
                case 's':
                    queue.showQueue();
                    break;
                case 'a':
                    System.out.println("请输入一个数");
                    int value = scanner.nextInt();
                    queue.addQueue(value);
                    break;
                case 'g':
                    try {
                        int res = queue.getQueue();
                        System.out.printf("取出的数据是%d\n", res);

                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                    break;
                case 'h':
                    try {
                        int res = queue.headQueue();
                        System.out.printf("取出的数据是%d\n", res);
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                    break;
                case 'e':
                    scanner.close();
                    loop = false;
                    break;
                default:
                    break;
            }
        }
        System.out.println("程序退出");
    }
}

class CircleArray {
    private int maxSize; //数组的最大容量
    private int front; //front指向队列的第一个元素,front 的初始值是0;
    private int rear; //rear指向队列的最后一个元素的后一个位置,因为希望空出一个空间作为约定(判断队列是否满) rear的初始值是0;
    private int[] arr; //该数组用于存放数据,模拟队列

    public CircleArray(int arrMaxSize) {
        maxSize = arrMaxSize;
        arr = new int[maxSize];
    }

    //判断队列是否满
    public boolean isFull() {
        return (rear + 1) % maxSize == front;
    }

    //判断队列是否为空
    public boolean isEmpty() {
        return rear == front;
    }

    //添加数据到队列中
    public void addQueue(int n) {
        //判断队列是否已满
        if (isFull()) {
            System.out.println("队列已满不能加入数据");
            return;
        }
        //直接将数据加入
        arr[rear] = n;
        //将 rear 后移,这里必须考虑取模
        rear = (rear + 1) % maxSize;
    }

    //获取队列中的数据,出队列
    public int getQueue() {
        //判断队列是否为空
        if (isEmpty()) {
            throw new RuntimeException("队列为空,不能取数据!");
        }
        /**
         * 这里需分析出front是指向队列的第一个元素
         * 1.先把front 对应的值保留到一个临时变量
         * 2.将front 后移,考虑取模
         * 3.将临时变量返回
         */
        int value = arr[front];
        front = (front + 1) % maxSize;
        return value;
    }

    //显示队列中的所有数据
    public void showQueue() {
        if (isEmpty()) {
            System.out.println("队列为空,没有数据~~~");
            return;
        }
        for (int i = front; i < front+size(); i++) {
            System.out.printf("arr[%d]=%d\n", i%maxSize, arr[i%maxSize]);
        }
    }

    //求出当前队列有效数据的个数
    public int size() {
        return (rear+maxSize-front)%maxSize;
    }

    //显示队列的头数据
    public int headQueue() {
        if (isEmpty()) {
            throw new RuntimeException("队列为空,没有数据~~");
        }
        return arr[front];
    }

}

```

### 3.链表

链表是有序的列表:

- 链表是以节点的方式来存储,是链式存储
- 每个节点包含 data 域， next 域：指向下一个节点  
- 链表的**各个节点不一定是连续存储**.  
- 链表分带头节点的链表和没有头节点的链表，根据实际的需求来确定

#### 3.1单向链表

- 添加英雄,直接添加到链表尾部
  - 先创建一个head节点,用来表示单链表的头
  - 后面每添加一个节点,就直接加入到链表的尾部
  - 通过一个辅助变量遍历,帮助遍历整个链表
- 添加英雄,根据**排名**将英雄插入指定位置
  - 首先根据辅助节点找到新添加节点的位置
  - 新的节点.next = temp.next
  - 将temp.next = 新的节点
- 修改节点功能
  - 先找到该节点,通过遍历
  - temp.name = newHeroNode.name; temp.nickname = newHeroNode.nickname
- 删除节点
  - 先找到需要删除的这个节点的前一个节点temp
  - temp.next = temp.next.next
  - 被删除的节点,将不会有其他引用指向,会被gc回收

- 求单链表中节点个数

```java
public static int getLength(HeroNode head) {
        if (head.next == null) { //空链表
            return 0;
        }
        int lenght = 0;
        HeroNode cur = head.next;
        while (cur != null) {
            lenght++;
            cur = cur.next;
        }
        return lenght;
    }
```

- 求倒数第k个节点
  - 编写一个方法,接收head节点,同时接收一个index
  - index 表示倒数第index个节点
  - 先把链表从头到尾遍历,得到链表的总长度getlength
  - 得到size后,从链表的第一个开始遍历(size-index)个,就可以得到
  - 如果找到了,则返回该节点,否则返回null

```java
public static HeroNode findLastIndexNode(HeroNode head, int index) {
        if (head.next == null) {
            return null;
        }
        //第一个遍历得到链表的总长度(节点个数)
        int size = getLength(head);
        //第二次遍历 size-index 位置,就是我们倒数第k个节点
        //index 验证
        if (index <= 0 || index > size) {
            return null;
        }
        //定义一个辅助变量,for 循环定位到倒数的index
        HeroNode cur = head.next;
        for (int i = 0; i < size - index; i++) {
            cur = cur.next;
        }
        return cur;
    }
```

- 反转单链表  (头插法)

  - 定义一个节点reverseHead = new HeroNode();

  - 从头到尾遍历原来的节点,每遍历一个节点就将其取出,并放在新的链表reverseHead的最前端
  - 原来的链表的head.next = reverseHead.next

```java
public static void reverseList(HeroNode head) {
        //如果链表为空或只有一个节点 无需反转 直接返回
        if (head.next == null || head.next.next == null) {
            return;
        }
        //定义一个辅助指针,帮助遍历原来的链表
        HeroNode cur = head.next;
        HeroNode next = null; //指向当前节点的下一个节点
        HeroNode reverseHead = new HeroNode(0, "", "");
        while (cur != null) {
            next = cur.next; //先暂时保存当前节点的下一个节点,后面需要使用
            cur.next = reverseHead.next; //将cur的下一个节点指向新的链表的最前端
            reverseHead.next = cur; //将cur连接到新的链表上
            cur = next; //cure 后移
        }
        //将head.next 指向 reverseHead.next,实现单链表反转
        head.next = reverseHead.next;
    }
```

- 从尾到头打印单链表
  - 利用栈的数据结构,将各个节点压入栈中,然后利用栈的<font color="red">先进后出</font>的特点,实现逆序打印的效果

代码实现:

```java
 public static void  reversePrint(HeroNode head){
        if (head.next != null){
            //创建一个栈,将各个节点压入栈中
            Stack<HeroNode> stack = new Stack<>();
            HeroNode cur = head.next;
            while (cur!=null){
                stack.push(cur);
                cur = cur.next;
            }
            while (stack.size()>0) {
                System.out.println(stack.pop());
            }
        }
    }
```

代码实现:

```java
/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/9/16 11:59
 * <p>
 * 单向链表创建并直接添加到链表的尾部实现&&考虑排名将英雄添加到指定位置
 */
public class SingleLinkListDemo {
    public static void main(String[] args) {
        HeroNode heroNode1 = new HeroNode(1, "易", "无极剑圣");
        HeroNode heroNode2 = new HeroNode(2, "艾希", "寒冰射手");
        HeroNode heroNode3 = new HeroNode(3, "瑞兹", "流浪法师");
        HeroNode heroNode4 = new HeroNode(4, "提莫", "迅捷斥候");
        //创建单向链表
        SingleLinkList singleLinkList = new SingleLinkList();
        /*singleLinkList.add(heroNode1);
        singleLinkList.add(heroNode2);
        singleLinkList.add(heroNode4);
        singleLinkList.add(heroNode3);*/

        singleLinkList.addByOrder(heroNode1);
        singleLinkList.addByOrder(heroNode2);
        singleLinkList.addByOrder(heroNode4);
        singleLinkList.addByOrder(heroNode3);
        singleLinkList.addByOrder(heroNode3);
        singleLinkList.list();

        //测试修改节点的代码
        singleLinkList.update(new HeroNode(2, "ad希", "寒冰"));
        System.out.println("修改后的链表情况");
        singleLinkList.list();

        //测试删除节点的代码
        singleLinkList.del(4);
        singleLinkList.del(3);
        singleLinkList.del(2);
        singleLinkList.del(1);
        System.out.println("删除后的链表情况");
        singleLinkList.list();
        
        //测试求单链表中节点个数
        System.out.println("有效的节点个数: " + getLength(singleLinkList.getHead()));

        //测试是否得到倒数第k个节点
        System.out.println("倒数第1个节点: " + findLastIndexNode(singleLinkList.getHead(), 1));
        
        //反转单链表
        System.out.println("反转单链表~~");
        reverseList(singleLinkList.getHead());
        singleLinkList.list();
        
        //逆序打印单链表
        System.out.println("逆序打印单链表~~");
        reversePrint(singleLinkList.getHead());
        
    }
}

//定义SingleLinkList 管理我们的英雄
class SingleLinkList {
    //先初始化一个头节点,不存放数据
    private HeroNode head = new HeroNode(0, "", "");

    /**
     * 添加节点到单向链表
     * 思路:当不考虑编号顺序时
     * 1.找到当前链表的最后节点
     * 2.将最后这个节点的next 指向新的节点
     */
    public void add(HeroNode heroNode) {
        //因为head节点不能动,所以需要一个辅助节点变量temp
        HeroNode temp = head;
        //遍历链表,找到最后
        while (temp.next != null) {
            temp = temp.next;
        }
        //当退出while循环时temp就指向了链表的最后
        temp.next = heroNode;

    }

    /**
     * 第二种添加节点的方式 根据英雄排名插入到指定位置
     * (如果有排名则添加失败,并给出提示)
     * 1.首先找到添加的新的节点的位置,通过辅助变量通过遍历来搞定
     * 2.新的节点.next = temp.next
     * 3.将temp.next=新的节点
     */
    public void addByOrder(HeroNode heroNode) {
        //再次使用辅助节点来帮助我们找到添加的位置
        //因为单链表,因为我们找到temp 是位于添加位置的前一个节点,否则插入不了(1,,,4 若插入2的话temp要找的是1)
        HeroNode temp = head;
        boolean flag = false; //flag 标志用于判断添加的编号是否已经存在,默认未false
        while (true) {
            if (temp.next == null) { //说明已经遍历到最后一个节点 直接在最后插入即可
                break;
            }
            if (temp.next.no > heroNode.no) { //位置找到,就在temp的后面插入 heroNode(2) 添加在temp和temp.next(4)之间
                break;
            } else if (temp.next.no == heroNode.no) {
                flag = true; //编号存在
                break;
            }
            temp = temp.next; //上面三个条件都不成立 后移 遍历当前链表
        }
        //判断flag 的值
        if (flag) {
            System.out.printf("准备插入英雄的编号 %d 已经存在,不能添加\n", heroNode.no);
        } else {
            //插入到temp后面
            heroNode.next = temp.next;
            temp.next = heroNode;
        }
    }

    //修改节点的信息,根据no编号来修改,即no编号不修改
    public void update(HeroNode newHeroNode) {
        if (head.next == null) {
            System.out.println("链表为空");
            return;
        }
        //根据no编号,找到需要修改的节点 定义辅助变量
        HeroNode temp = head.next;
        boolean flag = false;
        while (temp != null) {
            if (temp.no == newHeroNode.no) {
                //找到了
                flag = true;
                break;
            }
            temp = temp.next;
        }
        //根据flag 判断是否找到需要修改的节点
        if (flag) {
            temp.name = newHeroNode.name;
            temp.nickname = newHeroNode.nickname;
        } else {
            System.out.printf("没有找到编号%d 的节点,不能修改\n", newHeroNode.no);
        }
    }

    /**
     * 删除节点
     * 1. head 不能动,需要一个temp辅助节点找到待删除节点前一个节点
     * 2. 说明我们在比较时,是temp.next.no和需要删除节点的no比较
     */
    public void del(int no) {
        HeroNode temp = head;
        boolean flag = false; //标志是否找到删除节点
        while (temp.next != null) {
            if (temp.next.no == no) {
                //找到待删除节点的前一个节点temp
                flag = true;
                break;
            }
            temp = temp.next;
        }
        if ((flag)) {
            temp.next = temp.next.next;
        } else {
            System.out.printf("要删除的 %d 节点不存在\n",no);
        }
    }


    //显示链表[遍历]
    public void list() {
        //判断链表是否为空
        if (head.next == null) {
            System.out.println("链表为空,没有数据~~~");
            return;
        }
        //头节点不能动再次使用辅助变量temp来遍历
        HeroNode temp = head.next;
        //判断是否到最后
        while (temp != null) {
            //输出节点信息
            System.out.println(temp);
            //将temp后移
            temp = temp.next;
        }

    }
}

//定义HeroNode,每个HeroNode对象就是一个节点
class HeroNode {
    public int no;
    public String name;
    public String nickname;
    public HeroNode next; //指向下一个节点

    //构造器
    public HeroNode(int no, String name, String nickname) {
        this.no = no;
        this.name = name;
        this.nickname = nickname;
    }

    //为了显示方法 重写toString


    @Override
    public String toString() {
        return "HeroNode{" +
                "no=" + no +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                '}';
    }
}

```

#### 3.2 双向链表

- 单向链表，**查找的方向只能是一个方向**，而双向链表可以向前或者向后查找。

- 单向链表不能自我删除，需要靠辅助节点 ，而双向链表，则可以<font color="red">自我删除</font>，所以前面我们单链表删除
  时节点，总是找到temp,temp是待删除节点的前一个节点(认真体会).

示意图：

![双向链表](https://img-blog.csdnimg.cn/accb13b27dd14853b1adb28a57bc4af0.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAd2VpeGluXzQ1MjAwNzM5,size_20,color_FFFFFF,t_70,g_se,x_16)

- 遍历：和单链表一样，只是前后都可以遍历
- 添加：（默认添加到链表最后）
  - 先找到双向链表的最后一个节点
  - temp.next = newHeroNoed
  - newHeroNode.pre = temp
- 添加：根据**排名**添加
  - 首先根据辅助节点找到新添加节点的位置
  - 新的节点.next = temp.next
  - 将temp.next = heroNode
  - temp.next.pre = heroNode;
  - heroNode.pre = temp;
- 修改：和单链表思路一样
- 删除 （自我删除）
  - 直接找到要删除的节点 temp
  - temp.pre.next = temp.next
  - temp.next.pre = temp.pre

代码实现：

```java
public class DoubleLinkListDemo {
    public static void main(String[] args) {
        HeroNode2 heroNode1 = new HeroNode2(1, "易", "无极剑圣");
        HeroNode2 heroNode2 = new HeroNode2(2, "艾希", "寒冰射手");
        HeroNode2 heroNode3 = new HeroNode2(3, "瑞兹", "流浪法师");
        HeroNode2 heroNode4 = new HeroNode2(4, "提莫", "迅捷斥候");
        HeroNode2 heroNode5 = new HeroNode2(5, "拉莫斯", "披甲龙龟");

        DoubleLinkList doubleLinkList = new DoubleLinkList();
       /* doubleLinkList.add(heroNode1);
        doubleLinkList.add(heroNode2);
        doubleLinkList.add(heroNode3);
        doubleLinkList.add(heroNode4);
        doubleLinkList.add(heroNode5);*/

        doubleLinkList.addByOrder(heroNode1);
        doubleLinkList.addByOrder(heroNode4);
        doubleLinkList.addByOrder(heroNode3);
        doubleLinkList.addByOrder(heroNode2);
        doubleLinkList.addByOrder(heroNode5);

        doubleLinkList.list();
        //修改
        System.out.println("修改后链表情况");
        doubleLinkList.update(new HeroNode2(2,"ad希","寒冰"));
        doubleLinkList.list();
        //删除
        System.out.println("删除后链表情况");
        doubleLinkList.del(2);
        doubleLinkList.list();
    }
}

class DoubleLinkList {
    private HeroNode2 head = new HeroNode2(0, "", "");

    public HeroNode2 getHead() {
        return head;
    }

    //遍历双向链表
    public void list() {
        //判断链表是否为空
        if (head.next == null) {
            System.out.println("链表为空,没有数据~~~");
            return;
        }
        //头节点不能动再次使用辅助变量temp来遍历
        HeroNode2 temp = head.next;
        //判断是否到最后
        while (temp != null) {
            //输出节点信息
            System.out.println(temp);
            //将temp后移
            temp = temp.next;
        }

    }

    //添加一个节点到双向链表的最后
    public void add(HeroNode2 heroNode) {
        //因为head节点不能动,所以需要一个辅助节点变量temp
        HeroNode2 temp = head;
        //遍历链表,找到最后
        while (temp.next != null) {
            temp = temp.next;
        }
        //当退出while循环时temp就指向了链表的最后
        temp.next = heroNode;
        heroNode.pre = temp;
    }

    public void addByOrder(HeroNode2 heroNode) {
        //再次使用辅助节点来帮助我们找到添加的位置
        //因为单链表,因为我们找到temp 是位于添加位置的前一个节点,否则插入不了(1,,,4 若插入2的话temp要找的是1)
        HeroNode2 temp = head;
        boolean flag = false; //flag 标志用于判断添加的编号是否已经存在,默认未false
        while (true) {
            if (temp.next == null) { //说明已经遍历到最后一个节点 直接在最后插入即可
                break;
            }
            if (temp.next.no > heroNode.no) { //位置找到,就在temp的后面插入 heroNode(2) 添加在temp和temp.next(4)之间
                break;
            } else if (temp.next.no == heroNode.no) {
                flag = true; //编号存在
                break;
            }
            temp = temp.next; //上面三个条件都不成立 后移 遍历当前链表
        }
        //判断flag 的值
        if (flag) {
            System.out.printf("准备插入英雄的编号 %d 已经存在,不能添加\n", heroNode.no);
        } else {
            //插入到temp后面
            heroNode.next = temp.next;
            temp.next = heroNode;
            temp.next.pre = heroNode;
            heroNode.pre = temp;
        }
    }

    //修改一个节点的内容 和单向链表一样
    public void update(HeroNode2 newHeroNode) {
        if (head.next == null) {
            System.out.println("链表为空");
            return;
        }
        //根据no编号,找到需要修改的节点 定义辅助变量
        HeroNode2 temp = head.next;
        boolean flag = false;
        while (temp != null) {
            if (temp.no == newHeroNode.no) {
                //找到了
                flag = true;
                break;
            }
            temp = temp.next;
        }
        //根据flag 判断是否找到需要修改的节点
        if (flag) {
            temp.name = newHeroNode.name;
            temp.nickname = newHeroNode.nickname;
        } else {
            System.out.printf("没有找到编号%d 的节点,不能修改\n", newHeroNode.no);
        }
    }

    //从双向链表中删除节点
    public void del(int no) {
        if (head.next == null) {
            System.out.println("链表为空~~");
            return;
        }
        HeroNode2 temp = head.next;
        boolean flag = false; //标志是否找到删除节点
        while (temp != null) {
            if (temp.no == no) {
                //找到待删除节点的前一个节点temp
                flag = true;
                break;
            }
            temp = temp.next;
        }
        if ((flag)) {
            temp.pre.next = temp.next;
            //如果是最后i一个节点。不需要执行这句话
            if (temp.next != null) {
                temp.next.pre = temp.pre;
            }
        } else {
            System.out.printf("要删除的 %d 节点不存在\n", no);
        }
    }

}

class HeroNode2 {
    public int no;
    public String name;
    public String nickname;
    public HeroNode2 next; //指向下一个节点
    public HeroNode2 pre;

    //构造器
    public HeroNode2(int no, String name, String nickname) {
        this.no = no;
        this.name = name;
        this.nickname = nickname;
    }

    //为了显示方法 重写toString
    @Override
    public String toString() {
        return "HeroNode{" +
                "no=" + no +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                '}';
    }
}
```

#### 3.3 单向环形链表

![单向环形链表](https://img-blog.csdnimg.cn/614ec237f9c6446fb5b09cb4a612fe38.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAd2VpeGluXzQ1MjAwNzM5,size_20,color_FFFFFF,t_70,g_se,x_16)

约瑟夫问题示意图:

![约瑟夫问题示意图](https://img-blog.csdnimg.cn/65514aefff8645d9843a9c9ee7bc37c0.png)

- Josephu 问题为：设编号为1，2，… n的n个人围坐一圈，约定编号为k（1<=k<=n）的人从1开始报数，数到m 的那个人出列，它的下一位又从1开始报数，数到m的那个人又出列，依次类推，直到所有人出列为止，由此产生一个出队编号的序列。

- 用一个不带头结点的循环链表来处理Josephu 问题：先构成一个有n个结点的单循环链表，然后由k结点起从1开始计数，计到m时，对应结点从链表中删除，然后再从被删除结点的下一个结点又从1开始计数，直到最后一个结点从链表中删除算法结束。

- 约瑟夫创建环形链表图解:(每创建一个黄线重新指向)

![创建环形链表思路图解](https://img-blog.csdnimg.cn/36c4b5c528c94b8da8b3d7f18131363e.png)

思路:

- 先创建第一个节点,让first指向该节点,并形成环形
- 后面每创建一个节点,就把该节点加入到已有的环形链表中即可

遍历:

- 先让一个辅助指针(变量)curBoy,指向first节点
- 然后通过一个while循环遍历该环形链表即可curBoy,next == first结束

约瑟夫小孩出圈图解:

- 创建一个辅助指针helper,事先应该指向环形链表的最后这个节点

![初始状态](https://img-blog.csdnimg.cn/eeb9ea73c6a14134a752125b9d539bc0.png)

- 小孩报数前,先让first和helper移动k-1次
- 当小孩报数时,让first和helper指针同时移动m-1次

![移动m-1次](https://img-blog.csdnimg.cn/99ad0a54d9504752b485b4e2e1b71307.png)

- 这时就可以将first指向小孩出圈的节点
  - first = first.next
  - helper.next = first

![小孩出圈动作](https://img-blog.csdnimg.cn/8d6fc81894b14c62ac126c2f846ae839.png)

```java
public class josepfu {

    public static void main(String[] args) {
        CircleSingleLinkedList circleSingleLinkedList = new CircleSingleLinkedList();
        circleSingleLinkedList.addBoy(5);
        circleSingleLinkedList.showBoy();

        circleSingleLinkedList.countBoy(1, 2, 5);//5个人,1开始报数,数2下
    }
}

class CircleSingleLinkedList {
    //创建一个first节点,当前没有编号
    private Boy first = null;

    //添加小孩节点,构成环形列表
    public void addBoy(int nums) {
        if (nums < 1) {
            System.out.println("nums的值不正确");
            return;
        }
        Boy curBoy = null;//辅助指针,用来构建环形列表
        for (int i = 1; i <= nums; i++) {
            Boy boy = new Boy(i);
            if (i == 1) {
                first = boy;
                first.setNext(first);//构成环
                curBoy = first;
            } else {
                curBoy.setNext(boy); //指向下一个boy 上面的线连上了
                boy.setNext(first); // 指到第一个节点  下面的线连上了
                curBoy = boy; //指向下一个boy 指针指上去了
            }
        }

    }

    //遍历当前环形链表
    public void showBoy() {
        if (first == null) {
            System.out.println("链表为空");
            return;
        }
        //first 不能动,仍然使用辅助指针完成遍历
        Boy curBoy = first;
        while (true) {
            System.out.printf("小孩的编号 %d \n", curBoy.getNo());
            if (curBoy.getNext() == first) { //遍历完毕
                break;
            }
            curBoy = curBoy.getNext();//curBoy后移
        }
    }

    /**
     * 根据用户输入计算出圈的顺序
     *
     * @param startNo  从第几个小孩开始数数
     * @param countNum 表示数记下
     * @param nums     最初有多少个小孩在圈中
     */
    public void countBoy(int startNo, int countNum, int nums) {
        //先对数据进行校验
        if (first == null || startNo < 1 || startNo > nums) {
            System.out.println("参数输入有误,清重新输入");
            return;
        }
        //创建辅助指针,帮助完成小孩出圈 事先应指向环形链表的最后这个节点
        Boy helper = first;
        while (true) {
            if (helper.getNext() == first) {
                break;
            }
            helper = helper.getNext();
        }
        //小孩报数前,先让first和helper移动k-1次
        for (int i = 0; i < startNo - 1; i++) {
            first = first.getNext();
            helper = helper.getNext();
        }
        //当小孩报数时,让first和helper指针同时移动m-1次
        while (true) {
            if (helper == first) { //圈中只有一人
                break;
            }
            for (int i = 0; i < countNum - 1; i++) {
                first = first.getNext();
                helper = helper.getNext();
            }
            //first指向的节点就是小孩出圈的节点
            System.out.printf("小孩%d出圈\n", first.getNo());
            first = first.getNext();
            helper.setNext(first);
        }
        System.out.printf("最后留在圈中的小孩编号%d\n", helper.getNo());
    }
}


class Boy {
    private int no;
    private Boy next;//指向下一个节点 默认null

    public Boy(int no) {
        this.no = no;
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public Boy getNext() {
        return next;
    }

    public void setNext(Boy next) {
        this.next = next;
    }
}

```

