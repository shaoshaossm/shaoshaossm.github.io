---
title: 数据结构和算法(五)
top: false
cover: false
toc: true
mathjax: true
date: 2021-10-04 11:34:35
password: 
summary: 哈希表、二叉树(顺序存储、线索化、排序、平衡)、多路查找树、赫夫曼树、编码
tags: java
categories: 数据结构和算法
---

### <center>哈希表

[散列表](https://baike.baidu.com/item/散列表)（Hash table，也叫哈希表），是根据关键码值(Key value)而直接进行访问的[数据结构](https://baike.baidu.com/item/数据结构/1450)。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做[散列函数](https://baike.baidu.com/item/散列函数)，存放记录的[数组](https://baike.baidu.com/item/数组)叫做[散列](https://baike.baidu.com/item/散列表)[表](https://baike.baidu.com/item/散列表)。

![hashttable示意图](https://img-blog.csdnimg.cn/8da387b5838d422bb77303cf7f51944f.jpg)

有一个公司,当有新的员工来报道时,要求将该员工的信息加入(id,性别,年龄,名字,住址..),当输入该员工的id时,要求查找到该员工的 所有信息



代码实现:

```java
package com.ssm.hashTab;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/4 21:29
 */

import java.util.Scanner;

/**
 * 用hashtable存放雇员信息
 */
public class HashTableDemo {
    public static void main(String[] args) {
        hashTab hashTab = new hashTab(7);

        String key = "";
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("add: 添加雇员");
            System.out.println("list: 显示雇员");
            System.out.println("find: 查找雇员");
            System.out.println("exit: 退出系统 ");
            key = scanner.next();
            switch (key) {
                case "add":
                    System.out.println("输入id");
                    int id = scanner.nextInt();
                    System.out.println("输入名字");
                    String name = scanner.next();
                    Emp emp = new Emp(id, name);
                    hashTab.add(emp);
                    break;
                case "list":
                    hashTab.list();
                    break;
                case "find":
                    System.out.println("输入id");
                    id = scanner.nextInt();
                    hashTab.findEmpById(id);
                    break;
                case "exit":
                    scanner.close();
                    System.exit(0);
                default:
                    break;
            }
        }
    }
}

class hashTab {
    private EmpLinkedList[] empLinkedListArray;
    private int size; //共有多少条链表
    //构造器

    public hashTab(int size) {
        this.size = size;
        empLinkedListArray = new EmpLinkedList[size];
        //没这一步会报 NullPointerException  需要初始化链表
        for (int i = 0; i < size; i++) {
            empLinkedListArray[i] = new EmpLinkedList();
        }
    }

    //添加雇员
    public void add(Emp emp) {
        //根据员工id,得到员工应该添加到哪条链表
        int empLinkedListNo = hashFun(emp.id);
        //将 emp 放到对应的链表中
        empLinkedListArray[empLinkedListNo].add(emp);

    }

    //遍历所有的链表
    public void list() {
        for (int i = 0; i < size; i++) {
            empLinkedListArray[i].list(i + 1);
        }
    }
    //根据id查找雇员
    public void findEmpById(int id){
        //使用散列函数确定哪条链表查找
        int empLinkedListNo = hashFun(id);
        Emp emp = empLinkedListArray[empLinkedListNo].findEmpById(id);
        if (emp!=null){ //找到
            System.out.printf("在第%d条链表中找到雇员id = %d\n",(empLinkedListNo+1),id);
        } else { //没找到
            System.out.println("在hash表中没有找到该雇员");
        }
    }
    //编写散列函数,使用简单的取模法
    public int hashFun(int id) {
        return id % size;
    }

}

//表示一个雇员
class Emp {
    public int id;
    public String name;
    public Emp next;//默认为null

    public Emp(int id, String name) {
        super();
        this.id = id;
        this.name = name;
    }
}

//创建EmpLinkedList,表示链表
class EmpLinkedList {
    //头结点
    private Emp head; // 默认null

    //添加雇员到链表
    public void add(Emp emp) {
        //如果是添加第一个雇员
        if (head == null) {
            head = emp;
            return;
        }
        //如果不是第一个雇员,则使用一个辅助指针,帮助定位到最后
        Emp curEmp = head;
        while (true) {
            if (curEmp.next == null) {
                break;
            }
            curEmp = curEmp.next;
        }
        //退出时直接将emp 加入链表
        curEmp.next = emp;
    }


    //遍历链表的雇员信息
    public void list(int no) {
        if (head == null) {
            System.out.println("第" + no + "链表为空");
            return;
        }
        System.out.print("第" + no + "链表信息为");
        Emp curEmp = head;
        while (true) {
            System.out.printf("=> id = %d name = %s\t", curEmp.id, curEmp.name);
            if (curEmp.next == null) {
                break;
            }
            curEmp = curEmp.next;//后移 遍历
        }
        System.out.println();
    }

    //根据id查找雇员
    public Emp findEmpById(int id) {
        if (head == null) {
            System.out.println("链表为空");
            return null;
        }
        //辅助指针
        Emp curEmp = head;
        while (true){
            if (curEmp.id == id){ //找到了
                break;
            }
            //退出
            if (curEmp.next == null){ //没找到该雇员
                curEmp = null;
                break;
            }
            curEmp = curEmp.next;
        }
        return curEmp;
    }
}
```

### <center>树

<font color="blue">为什么需要树这种数据结构?</font>

- 数组存储方式的分析:
  - 优点：通过下标方式访问元素，速度快。对于有序数组，还可使用二分查找提高检索速度。
  - 缺点：如果要检索具体某个值，或者插入值(按一定顺序)会整体移动，效率较低
- 链式存储方式的分析
  - 优点：在一定程度上对数组存储方式有优化(比如：插入一个数值节点，只需要将插入节点，链接到链表中即可， 删除效率也很好)。
  - 缺点：在进行检索时，效率仍然较低，比如(检索某个值，需要从头节点开始遍历)

- 树存储方式的分析能提高数据存储，读取的效率,  比如利用 二叉排序树(Binary Sort Tree)，既可以保证数据的检索速度，同时也可以保证数据的插入，删除，修改的速度。

  - 案例: 【9，13，15，17，18，25，27，29，34】


### 1. 二叉树

- 二叉树的概念

  - 树有很多种，每个节点**最多只能有两个子节点**的一种形式称为二叉树。

  - 二叉树的子节点分为左节点和右节点。
  - 如果该二叉树的**所有**叶子节点都在最后一层**，并且结点总数= 2^n -1 , n 为层数，则我们称为满二叉树。
  - 如果该二叉树的所有叶子节点都在最后一层或者倒数第二层，而且最后一层的叶子节点在左边连续，倒数第二层的叶子节点在右边连续，我们称为完全二叉树。

![二叉树结构示意图](https://img-blog.csdnimg.cn/7a39a66a17c042f78d74cd3f9e287e5d.jpg)

<font color="red">二叉树遍历说明：</font>

前序遍历: **先输出父节点**，再遍历左子树和右子树

中序遍历: 先遍历左子树，**再输出父节点**，再遍历右子树

后序遍历: 先遍历左子树，再遍历右子树，**最后输出父节点**

**小结**: 看输出父节点的顺序，就确定是前序， 还是后序

**前序查找思路**

- 先判断当前结点的no是否等于要查找的
- 如果是相等，则返回当前结点
- 如果不等，则判断当前结点的左子节点是否为空，如果不为空，则递归前序查找
- 如果左递归前序查找，找到结点，则返回，否继续判断,当前的结点的右子节点是否为空，如果不空，则继续向右递归

**中序查找思路**

- 判断当前结点的左子节点是否为空，如果不为空，则递归中序查找
- 如果找到，则返回，如果没有找到，就和当前结点比较，如果是则返回当前结点，否则继续进行右递归的中序查找
- 如果右递归中序查找，找到就返回，否则返回null

**后序查找思路**

- 判断当前结点的左子节点是否为空，如果不为空，则递归后序查找
- 如果找到，就返回，如果没有找到，就判断当前结点的右子节点是否为空，如果不为空，则右递归进行后序查找如果找到，就返回
- 就和当前结点进行，比如，如果是则返回，否则返回null

**删除节点**

- 如果删除的节点是叶子结点,则删除该结点
- 如果删除的节点是非叶子结点,则删除该子树
- 思路:
  - 如果树是空树root,如果只有一个root结点,则等价将二叉树清空
  - 因为我们的二叉树是单向的，所以我们是判断<font color="red">当前结点的子结点</font>是来需要删除结点，而不能去判断当前这个结点是不是需要删除结点.
  - 如果当前结点的左子结点不为空，并且左子结点就是要删除结点，就将thisleft=null;并且就返回(结束递归删除)
  - 如果当前结点的右子结点不为空，并且右子结点就是要删除结点，就将this.right= null;并且就返回(结束递归删除)
  - 如果第2和第3步没有删除结点，那么我们就需要向左子树进行递归删除
  - 如果第4步也没有删除结点，则应当向右子树进行递归删除.

代码实现

```java
package com.ssm.tree;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/5 12:56
 */
public class BinaryTreeDemo {
    public static void main(String[] args) {
        //创建一颗二叉树
        BinaryTree binaryTree = new BinaryTree();
        HeroNode root = new HeroNode(1, "易");
        HeroNode node2 = new HeroNode(2, "艾希");
        HeroNode node3 = new HeroNode(3, "奶妈");
        HeroNode node4 = new HeroNode(4, "蛮王");
        HeroNode node5 = new HeroNode(5, "霞");

        //手动创建二叉树
        root.setLeft(node2);
        root.setRight(node3);
        node3.setRight(node4);
        node3.setLeft(node5);
        binaryTree.setRoot(root);
        //测试遍历
        System.out.println("前序遍历");
        binaryTree.preOrder();
        System.out.println("中序遍历");
        binaryTree.infixOrder();
        System.out.println("后序遍历");
        binaryTree.postOrder();
        //测试查找
        System.out.println("前序查找");
        HeroNode resnode = binaryTree.preOrderSearch(5);
        if (resnode != null) {
            System.out.printf("找到了,信息为 no=%d name=%s", resnode.getNo(), resnode.getName());
        } else {
            System.out.printf("没有找到 no = %d 的英雄", 5);
        }
        System.out.println("中序查找");
        HeroNode resnode2 = binaryTree.preOrderSearch(5);
        if (resnode2 != null) {
            System.out.printf("找到了,信息为 no=%d name=%s", resnode2.getNo(), resnode2.getName());
        } else {
            System.out.printf("没有找到 no = %d 的英雄", 5);
        }
        System.out.println("后序查找");
        HeroNode resnode3 = binaryTree.preOrderSearch(5);
        if (resnode3 != null) {
            System.out.printf("找到了,信息为 no=%d name=%s", resnode3.getNo(), resnode3.getName());
        } else {
            System.out.printf("没有找到 no = %d 的英雄", 5);
        }

        //删除节点
        binaryTree.delNode(5);
        System.out.println("删除节点");
        binaryTree.preOrder();
    }
}

//定义BinaryTree 二叉树
class BinaryTree {
    private HeroNode root;

    public void setRoot(HeroNode root) {
        this.root = root;
    }

    //前序遍历
    public void preOrder() {
        if (this.root != null) {
            this.root.preOrder();
        } else {
            System.out.println("二叉树为空,无法遍历");
        }
    }

    //中序遍历
    public void infixOrder() {
        if (this.root != null) {
            this.root.infixOrder();
        } else {
            System.out.println("二叉树为空,无法遍历");
        }
    }

    //后序遍历
    public void postOrder() {
        if (this.root != null) {
            this.root.postOrder();
        } else {
            System.out.println("二叉树为空,无法遍历");
        }
    }

    //前序查找
    public HeroNode preOrderSearch(int no) {
        if (root != null) {
            return root.preOrderSearch(no);
        } else {
            return null;
        }
    }

    //中序查找
    public HeroNode infixOrderSearch(int no) {
        if (root != null) {
            return root.infixOrderSearch(no);
        } else {
            return null;
        }
    }

    //后序查找
    public HeroNode postOrderSearch(int no) {
        if (root != null) {
            return root.postOrderSearch(no);
        } else {
            return null;
        }
    }

    //删除节点
    public void delNode(int no){
        if (root != null){
            if (root.getNo() == no){
                root = null;
            } else {
                root.delNode(no);
            }
        } else {
            System.out.println("空树,不能删除~~~");
        }
    }

}

//创建HeroNode 节点
class HeroNode {
    private int no;
    private String name;
    private HeroNode left;
    private HeroNode right;

    public HeroNode(int no, String name) {
        this.no = no;
        this.name = name;
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public HeroNode getLeft() {
        return left;
    }

    public void setLeft(HeroNode left) {
        this.left = left;
    }

    public HeroNode getRight() {
        return right;
    }

    public void setRight(HeroNode right) {
        this.right = right;
    }

    @Override
    public String toString() {
        return "HeroNode{" +
                "no=" + no +
                ", name='" + name + '\'' +
                '}';
    }

    //编写前序遍历
    public void preOrder() {
        System.out.println(this); //输出父节点
        //递归向左子树前序遍历
        if (this.left != null) {
            this.left.preOrder();
        }
        //递归向右子树前序遍历
        if (this.right != null) {
            this.right.preOrder();
        }
    }

    //编写中序遍历
    public void infixOrder() {
        //递归向左子树前序遍历
        if (this.left != null) {
            this.left.infixOrder();
        }
        System.out.println(this); //输出父节点
        //递归向右子树前序遍历
        if (this.right != null) {
            this.right.infixOrder();
        }
    }

    //编写后序遍历
    public void postOrder() {
        //递归向左子树前序遍历
        if (this.left != null) {
            this.left.postOrder();
        }
        //递归向右子树前序遍历
        if (this.right != null) {
            this.right.postOrder();
        }
        System.out.println(this); //输出父节点
    }

    //前序遍历查找
    public HeroNode preOrderSearch(int no) {
        //比较当前节点是不是
        if (this.no == no) {
            return this;
        }
        //不是的话,则判断当前结点的左子节点是否为空，如果不为空，则递归前序查找
        HeroNode resNode = null;
        if (this.left != null) {
            resNode = this.left.preOrderSearch(no);
        }
        if (resNode != null) { //说明找到
            return resNode;
        }
        //左递归前序查找，找到结点，则返回，否继续判断,当前的结点的右子节点是否为空，如果不空，则继续向右递归
        if (this.right != null) {
            resNode = this.right.preOrderSearch(no);
        }
        return resNode;
    }

    //中序遍历查找
    public HeroNode infixOrderSearch(int no) {

        // 判断当前结点的左子节点是否为空，如果不为空，则递归中序查找
        HeroNode resNode = null;
        if (this.left != null) {
            resNode = this.left.infixOrderSearch(no);
        }
        if (resNode != null) { //说明找到
            return resNode;
        }
        //如果没有找到，就和当前结点比较
        if (this.no == no) {
            return this;
        }
        //否则继续进行右递归的中序查找
        if (this.right != null) {
            resNode = this.right.infixOrderSearch(no);
        }
        return resNode;
    }

    //后序遍历查找
    public HeroNode postOrderSearch(int no) {

        // 判断当前结点的左子节点是否为空，如果不为空，则递归后序查找
        HeroNode resNode = null;
        if (this.left != null) {
            resNode = this.left.postOrderSearch(no);
        }
        if (resNode != null) { //说明找到
            return resNode;
        }
        //如果没有找到，就右递归的后序查找
        if (this.right != null) {
            resNode = this.right.postOrderSearch(no);
        }
        if (resNode != null) { //说明找到
            return resNode;
        }
        //左右子树都没有找到,就比较当前节点
        if (this.no == no) {
            return this;
        }
        return resNode;
    }


    //递归删除节点
    //如果删除的节点是叶子结点,则删除该结点  如果删除的节点是非叶子结点,则删除该子树
    public void delNode(int no) {
        if (this.left!=null && this.left.no == no){
            this.left = null;
            return;
        }
        if (this.right!=null && this.right.no == no){
            this.right = null;
            return;
        }
        if (this.left!=null){
            this.left.delNode(no);
        }
        if (this.right!=null){
            this.right.delNode(no);
        }
    }
}

```

运行结果:

```java
前序遍历
HeroNode{no=1, name='易'}
HeroNode{no=2, name='艾希'}
HeroNode{no=3, name='奶妈'}
HeroNode{no=5, name='霞'}
HeroNode{no=4, name='蛮王'}
中序遍历
HeroNode{no=2, name='艾希'}
HeroNode{no=1, name='易'}
HeroNode{no=5, name='霞'}
HeroNode{no=3, name='奶妈'}
HeroNode{no=4, name='蛮王'}
后序遍历
HeroNode{no=2, name='艾希'}
HeroNode{no=5, name='霞'}
HeroNode{no=4, name='蛮王'}
HeroNode{no=3, name='奶妈'}
HeroNode{no=1, name='易'}
前序查找
找到了,信息为 no=5 name=霞中序查找
找到了,信息为 no=5 name=霞后序查找
找到了,信息为 no=5 name=霞-----
HeroNode{no=1, name='易'}
HeroNode{no=2, name='艾希'}
HeroNode{no=3, name='奶妈'}
HeroNode{no=4, name='蛮王'}
```

### 2. 顺序存储二叉树

基本说明

- 从数据存储来看，**数组存储方式**和**树的存储方式**可以相互转换，即数组可以转换成树，树也可以转换成数组.

- 顺序存储二叉树的**特点**:

  - 顺序二叉树通常只考虑完全二叉树

  - 第n个元素的左子节点为 2 * n + 1 

  - 第n个元素的右子节点为 2 * n + 2

  - 第n个元素的父节点为 (n-1) / 2
  - n : 表示二叉树中的第几个元素

![顺序存储二叉树](https://img-blog.csdnimg.cn/c267a72ff22b4a58af5bdf370bd70ab5.png)

要求:以数组的方式存放 int[] arr = {1, 2, 3, 4, 5, 6, 7} 在遍历数组 时,仍然可以以前序遍历的方式完成结点的遍历

代码实现:

```java
package com.ssm.tree;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/8 14:43
 */
public class ArrBinaryTreeDemo {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        ArrBinaryTree arrBinaryTree = new ArrBinaryTree(arr);
        arrBinaryTree.preOrder();
    }
}

class ArrBinaryTree {
    private int[] arr;

    public ArrBinaryTree(int[] arr) {
        this.arr = arr;
    }

    //重载preOrder
    public void preOrder(){
        this.preOrder(0);
    }
    //编写一个方法,完成顺序存储二叉树的前序遍历
    public void preOrder(int index) {
        //如果数组为空,或arr.length==0
        if (arr == null || arr.length == 0) {
            System.out.println("数组为空,不能按照二叉树的前序遍历");
        }
        //输出当前这个元素
        System.out.print(arr[index]+" ");
        //向左递归遍历
        if ((index * 2 + 1) < arr.length) {
            preOrder(2 * index + 1);
        }
        //向右递归遍历
        if ((index * 2 + 2) < arr.length) {
            preOrder(2 * index + 2);
        }


    }

}

```

运行结果

```java
1 2 4 5 3 6 7 
```
### 3. 线索化二叉树

- n个结点的二叉链表中含有n+1 【公式 2n-(n-1)=n+1】 个空指针域。利用二叉链表中的空指针域，存放指向<font color="blue">该结点</font>在<font color="red">某种遍历次序下</font>的前驱和后继结点的指针（这种附加的指针称为"线索"）
- 这种加上了线索的二叉链表称为**线索链表**，相应的二叉树称为**线索二叉树****(Threaded** **BinaryTree****)**。根据线索性质的不同，线索二叉树可分为**前序线索二叉树、中序线索二叉树**和**后序线索二叉树**三种
- 一个结点的前一个结点，称为<font color="red">前驱</font>结点
- 一个结点的后一个结点，称为<font color="red">后继</font>结点

案例:

![中序线索二叉树](https://img-blog.csdnimg.cn/f88e30dbc42f438db0ea13ed33e3818c.png)



代码实现

```java
package com.ssm.tree.TreadBinaryTree;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/8 15:40
 */
public class TreadedBinaryTreeDemo {
    public static void main(String[] args) {
        HeroNode root = new HeroNode(1, "tom");
        HeroNode node2 = new HeroNode(3, "jack");
        HeroNode node3 = new HeroNode(6, "smith");
        HeroNode node4 = new HeroNode(8, "mary");
        HeroNode node5 = new HeroNode(10, "king");
        HeroNode node6 = new HeroNode(14, "dim");
        root.setLeft(node2);
        root.setRight(node3);
        node2.setLeft(node4);
        node2.setRight(node5);
        node3.setLeft(node6);
        //测试中序线索化
        ThreadedBinaryTree threadedBinaryTree = new ThreadedBinaryTree();
        threadedBinaryTree.setRoot(root);
        threadedBinaryTree.threadedNodes();
        //测试:以10号结点测试
        System.out.println("10号结点的前驱结点是: " + node5.getLeft());
        System.out.println("10号结点的后继结点是: " + node5.getRight());

        System.out.println("使用线索化的方式遍历 线索化二叉树");
        threadedBinaryTree.threadedList();
    }
}

//定义ThreadedBinaryTree 实现了线索化功能的二叉树
class ThreadedBinaryTree {
    private HeroNode root;
    //为了实现线索化,需要创建要给指向当前节点的前驱节点的指针
    // 在递归进行线索化时,pre总是保留前一个结点
    private HeroNode pre = null;

    public void setRoot(HeroNode root) {
        this.root = root;
    }

    //重载一把
    public void threadedNodes() {
        this.treadedNodes(root);
    }
    //遍历线索化 二叉树的方法
    public void threadedList(){
        //定义一个变量.存储当前遍历的结点,从root开始
        HeroNode node = root;
        while (node!=null){
            //循环的找到leftType == 1 的结点,第一个找到的就是8这个结点
            //后面随着遍历而变化,因为当leftType == 1 时,说明该结点是按照线索化处理后的结点
            while (node.getLeftType() == 0){
                node = node.getLeft();
            }
            System.out.println(node);
            //如果当前结点的右指针指向的是后继节点,就一直输出
            while (node.getRightType() == 1){
                //获取当前结点的后继结点
                node = node.getRight();
                System.out.println(node);
            }
            //替换这个遍历的结点
            node = node.getRight();
        }
    }
    //编写对二叉树进行中序线索化的方法

    /**
     * @param node 就是当前需要线索化的结点
     */
    public void treadedNodes(HeroNode node) {
        if (node == null) {
            return;
        }
        //先线索化左子树
        treadedNodes(node.getLeft());
        //线索化当前结点

        //处理当前节点的前驱节点
        if (node.getLeft() == null) {
            //让当前节点的左指针指向前驱结点
            node.setLeft(pre);
            //修改当前结点的左指针的类型,指向前驱结点
            node.setLeftType(1);
        }
        //处理后继结点
        if ((pre != null) && pre.getRight() == null) {
            //让当前节点的右指针指向当前结点
            pre.setRight(node);
            //修改当前结点的右指针的类型
            pre.setRightType(1);
        }
        //!!! 每处理一个结点后,就让当前结点是下一个结点的前驱结点
        pre = node;
        //线索化右子树
        treadedNodes(node.getRight());
    }
}

//创建HeroNode 节点
class HeroNode {
    private int no;
    private String name;
    private HeroNode left;
    private HeroNode right;

    //说明
    // 1. 如果 leftType == 0 表示指向的是左子树,如果是1则表示指向前驱结点
    // 1. 如果 rightType == 0 表示指向的是右子树,如果是1则表示指向后驱结点
    private int leftType;
    private int rightType;

    public HeroNode(int no, String name) {
        this.no = no;
        this.name = name;
    }

    public int getLeftType() {
        return leftType;
    }

    public void setLeftType(int leftType) {
        this.leftType = leftType;
    }

    public int getRightType() {
        return rightType;
    }

    public void setRightType(int rightType) {
        this.rightType = rightType;
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public HeroNode getLeft() {
        return left;
    }

    public void setLeft(HeroNode left) {
        this.left = left;
    }

    public HeroNode getRight() {
        return right;
    }

    public void setRight(HeroNode right) {
        this.right = right;
    }

    @Override
    public String toString() {
        return "HeroNode{" +
                "no=" + no +
                ", name='" + name + '\'' +
                '}';
    }
}
```

运行结果

```java
10号结点的前驱结点是: HeroNode{no=3, name='jack'}
10号结点的后继结点是: HeroNode{no=1, name='tom'}
使用线索化的方式遍历 线索化二叉树
HeroNode{no=8, name='mary'}
HeroNode{no=3, name='jack'}
HeroNode{no=10, name='king'}
HeroNode{no=1, name='tom'}
HeroNode{no=14, name='dim'}
HeroNode{no=6, name='smith'}
```

### 4. 赫夫曼树

基本介绍

- 给定n个权值作为n个<font color="blue">叶子结点</font>，构造一棵二叉树，若该树的<font color="blue">带权路径长度(wpl)</font>达到最小，称这样的二叉树为<font color="blue">最优二叉树</font>，也称为<font color="blue">哈夫曼树(Huffman Tree)</font>, 或<font color="blue">霍夫曼树</font>。

- 赫夫曼树是带权路径长度最短的树，权值较大的结点离根较近。

重要概念,举例说明

- 路径和路径长度：在一棵树中，从一个结点往下可以达到的孩子或孙子结点之间的通路，称为路径。通路中分支的数目称为路径长度。若规定根结点的层数为1，则从根结点到第L层结点的路径长度为L-1
- 结点的权及带权路径长度：若将树中结点赋给一个有着某种含义的数值，则这个数值称为该结点的权。结点的带权路径长度为：从根结点到该结点之间的路径长度与该结点的权的乘积
- 树的带权路径长度：树的带权路径长度规定为所有叶子结点的带权路径长度之和，记为WPL(weighted path length) ,权值越大的结点离根结点越近的二叉树才是最优二叉树。
- WPL最小的就是赫夫曼树

构成赫夫曼树的步骤：

- 从小到大进行排序, 将每一个数据，每个数据都是一个节点 ， 每个节点可以看成是一颗最简单的二叉树

- 取出根节点权值最小的两颗二叉树 

- 组成一颗新的二叉树, 该新的二叉树的根节点的权值是前面两颗二叉树根节点权值的和 

- 再将这颗新的二叉树，以根节点的权值大小 再次排序， 不断重复 1-2-3-4 的步骤，直到数列中，所有的数据都被处理，就得到一颗赫夫曼树

数列{13,7,8,3,29,6,1} ->赫夫曼树  先**排序**

![赫夫曼树](https://img-blog.csdnimg.cn/422ab00495394cc7bb670715edf74f83.png)

代码实现:

```java
package com.ssm.tree;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/10 13:57
 */
public class HuffmanTree {
    public static void main(String[] args) {
        int[] arr = {13, 7, 8, 3, 29, 6, 1};
        Node root = creatHuffmanTree(arr);
        preOrder(root);
    }

    // 前序遍历的方法
    public static void preOrder(Node root) {
        if (root!=null){
            root.preOrder();
        } else {
            System.out.println("空树");
        }
    }

    //创建赫夫曼树的方法

    /**
     *
     * @param arr 需要创建赫夫曼树的数组
     * @return 创建好后的赫夫曼树的root
     */
    public static Node creatHuffmanTree(int[] arr) {
        List<Node> nodes = new ArrayList<Node>();
        for (int value : arr
        ) {
            nodes.add(new Node(value));
        }
        while (nodes.size() > 1) {
            //排序
            Collections.sort(nodes);
            System.out.println("nodes = " + nodes);
            //取出根节点权值最小的两颗二叉树
            Node leftNode = nodes.get(0);
            //取出根节点权值第二小的两颗二叉树
            Node rightNode = nodes.get(1);
            //构建一颗新的二叉树
            Node parent = new Node(leftNode.value + rightNode.value);
            parent.left = leftNode;
            parent.right = rightNode;
            //从ArrayList删除处理过的二叉树
            nodes.remove(leftNode);
            nodes.remove(rightNode);
            //将parent加入到nodes
            nodes.add(parent);
        }
        return nodes.get(0);
    }
}

//节点类
//为了让node 对象持续排序Collections集合排序 需要实现Comparable接口
class Node implements Comparable<Node> {
    int value; //节点权值
    Node left;
    Node right;

    //前序遍历
    public void preOrder() {
        System.out.println(this);
        if (this.left != null) {
            this.left.preOrder();
        }
        if (this.right != null) {
            this.right.preOrder();
        }
    }

    public Node(int value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "Node{" +
                "value=" + value +
                '}';
    }

    @Override
    public int compareTo(Node o) {
        //从小到大排(从大到小 -(this.value - o.value))
        return this.value - o.value;
    }
}
```

运行结果:

```java
Node{value=67}
Node{value=29}
Node{value=38}
Node{value=15}
Node{value=7}
Node{value=8}
Node{value=23}
Node{value=10}
Node{value=4}
Node{value=1}
Node{value=3}
Node{value=6}
Node{value=13}
```


### 5. 赫夫曼编码

**基本介绍**

- 赫夫曼编码也翻译为 [ 哈夫曼](https://baike.baidu.com/item/哈夫曼)编码(Huffman Coding)，又称霍夫曼编码，是一种编码方式, 属于一种程序算法

- 赫夫曼编码是赫哈夫曼树在电讯通信中的经典的应用之一。

- 赫夫曼编码广泛地用于数据文件压缩。其压缩率通常在20%90%之间

- 赫夫曼码是可变[字长](https://baike.baidu.com/item/字长/97660)编码(VLC)的一种。Huffman于1952年提出一种编码方法，称之为最佳编码
- 注意, 赫夫曼树根据排序方法不同，也可能不太一样，**这样对应的赫夫曼编码也不完全一样**，但是wpl 是一样的，都是最小的 

案例 压缩 -> 解压 和文件的压缩 -> 解压:

-  一段文本: i like like like java do you like a java  
- 根据赫夫曼编码压缩数据的原理，需要创建 "i like like like java do you like a java" 对应的赫夫曼树.
- 生成赫夫曼树对应的赫夫曼编码
- 使用赫夫曼编码来生成赫夫曼编码数据  (已压缩)
- 转成赫夫曼编码对应的字符串 "101010..."
- =>对照赫夫曼编码重新转成原来的字符串

代码实现(解压功能有bug ：数组下标越界和空指针异常)

```java
package com.ssm.tree.huffmanCode;

import com.ssm.tree.HuffmanTree;
import com.sun.corba.se.pept.encoding.OutputObject;

import java.io.*;
import java.util.*;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/10 19:07
 */
public class HuffmanCode {
    public static void main(String[] args) {
        String content = "i like like like java do you like a java";
        byte[] contentBytes = content.getBytes();
        byte[] huffmanCodeBytes = huffmanZip(contentBytes);
        System.out.println("压缩后的结果:" + Arrays.toString(huffmanCodeBytes) + "长度= " + huffmanCodeBytes.length);
        byte[] decode = decode(huffmanCodes, huffmanCodeBytes);
        System.out.println("解压后原来的字符串=" + new String(decode));
        String srcFile = "G://1.jpg";
        String dstFile = "G://dst.zip";
        zipFile(srcFile, dstFile);
        System.out.println("压缩成功");
        String zipFile = "G://dst.zip";
        String dstFile2 = "G://2.jpg";
        unZipFile(zipFile, dstFile2);
        System.out.println("解压成功");
    }

    // 使用一个方法将前面的方法封装起来,便于调用

    /**
     * @param bytes 原始的字符串对应的字节数组
     * @return 是经过 赫夫曼编码处理后的字节数组(压缩后的数组)
     */
    private static byte[] huffmanZip(byte[] bytes) {
        List<Node> nodes = getNodes(bytes);
        //根据nodes 创建赫夫曼树
        Node huffmanTreeRoot = creatHuffmanTree(nodes);
        //对应的赫夫曼编码
        Map<Byte, String> huffmanCodes = getCodes(huffmanTreeRoot);
        // 根据生成的赫夫曼编码,压缩得到压缩后的赫夫曼编码字节数组
        byte[] huffmanCodeBytes = zip(bytes, huffmanCodes);
        return huffmanCodeBytes;
    }

    //将字符串对应的byte[]数组,通过生成的赫夫曼编码表,返回一个赫夫曼码压缩后的byte[]

    /**
     * @param bytes        原始的字符串对应的byte[]
     * @param huffmanCodes 生成的赫夫曼编码map
     * @return 返回赫夫曼编码处理后的byte[]
     */
    public static byte[] zip(byte[] bytes, Map<Byte, String> huffmanCodes) {
        //1.利用HuffmanCodes 将 bytes 转成 赫夫曼编码对应的字符串
        StringBuilder stringBuilder = new StringBuilder();
        for (byte b : bytes
        ) {
            stringBuilder.append(huffmanCodes.get(b));
        }
        //统计返回 byte[] huffmanCodeBytes 长度  一句话表示 int len = (StringBuilder.length+7)/8
        int len;
        if (stringBuilder.length() % 8 == 0) {
            len = stringBuilder.length() / 8;
        } else {
            len = stringBuilder.length() / 8 + 1;
        }
        //创建存储压缩后的byte数组
        byte[] huffmanCodeBytes = new byte[len];
        int index = 0;//记录是第几个byte
        for (int i = 0; i < stringBuilder.length(); i += 8) { //因为是每8位对应一个byte,所以步长+8
            String strByte;
            if (i + 8 > stringBuilder.length()) { //不够八位
                strByte = stringBuilder.substring(i);
            } else {
                strByte = stringBuilder.substring(i, i + 8);
            }
            //将strByte 转成一个byte,放入到 huffmanCodeBytes
            huffmanCodeBytes[index] = (byte) Integer.parseInt(strByte, 2);
            index++;

        }
        return huffmanCodeBytes;
    }

    //完成数据的解压

    /**
     * @param huffmanCodes 赫夫曼编码表 map
     * @param huffmanBytes 赫夫曼编码得到的字节数组
     * @return 原来的字符串对应的数组
     */
    private static byte[] decode(Map<Byte, String> huffmanCodes, byte[] huffmanBytes) {
        //转成赫夫曼编码对应的字符串 "101010..."
        StringBuilder stringBuilder = new StringBuilder();
        //将byte数组转成二进制字符串
        for (int i = 0; i < huffmanBytes.length; i++) {
            byte b = huffmanBytes[i];
            boolean flag = (i == huffmanBytes.length - 1);
            stringBuilder.append(byteToBitString(!flag, b));
        }
        //解码 把赫夫曼编码进行调换,因为反向查询 a->100 100->a
        Map<String, Byte> map = new HashMap<String, Byte>();
        for (Map.Entry<Byte, String> entry : huffmanCodes.entrySet()) {
            map.put(entry.getValue(), entry.getKey());
        }
        //创建一个集合,存放byte
        List<Byte> list = new ArrayList<>();
        for (int i = 0; i < stringBuilder.length(); ) {
            int count = 1;
            boolean flag = true;
            Byte b = null;
            while (flag) {
                String key = stringBuilder.substring(i, i + count); // i 不动,count移动,直到匹配到一个字符
                b = map.get(key);
                if (b == null) { //没有匹配到
                    count++;
                } else {
                    flag = false;
                }
            }

            list.add(b);
            i += count;
        }
        //for 循环结束 list中就存放了所有的字符
        byte[] b = new byte[list.size()];
        for (int i = 0; i < b.length; i++) {
            b[i] = list.get(i);
        }
        return b;
    }

    //完成对文件的压缩
    private static void zipFile(String srcFile, String dstFile) {
        OutputStream os = null;
        ObjectOutputStream oos = null;
        FileInputStream is = null;
        try {
            is = new FileInputStream(srcFile);
            byte[] b = new byte[is.available()];
            is.read(b);
            byte[] huffmanBytes = huffmanZip(b);
            os = new FileOutputStream(dstFile);
            oos = new ObjectOutputStream(os);
            oos.writeObject(huffmanBytes);
            oos.writeObject(huffmanCodes);


        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                is.close();
                os.close();
                oos.close();
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }

    }

    //完成对文件的解压
    public static void unZipFile(String zipFile, String dstFile) {
        InputStream is = null;
        OutputStream os = null;
        ObjectInputStream ois = null;
        try {
            is = new FileInputStream(zipFile);
            ois = new ObjectInputStream(is);
            byte[] huffmanBytes = (byte[]) ois.readObject();
            Map<Byte, String> huffmanCodes = (Map<Byte, String>) ois.readObject();
            //解码
            byte[] bytes = decode(huffmanCodes, huffmanBytes);
            //将bytes 数组写入目标文件
            os = new FileOutputStream(dstFile);
            os.write(bytes);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                os.close();
                ois.close();

                is.close();


            } catch (IOException e) {
                System.out.println(e.getMessage());
            }

        }
    }


    /**
     * 将一个byte 转成一个二进制字符串
     *
     * @param flag 标志是否需要补高位 如果是true,表示需要 false 不需要 (最后一个字节)
     * @param b    传入的byte
     * @return 该b对应的二进制字符串(按补码返回)
     */
    private static String byteToBitString(boolean flag, byte b) {
        int temp = b; // 将 b 转成int
        if (flag) {
            temp |= 256;
        }
        String string = Integer.toBinaryString(temp); //返回的是temp对应的二进制补码
        if (flag) {
            return string.substring(string.length() - 8);
        } else {
            return string;
        }

    }


    //生成赫夫曼树对应的赫夫曼编码
    //将赫夫曼编码存放在Map<Byte,String> 形式: 32->01 97->100
    static Map<Byte, String> huffmanCodes = new HashMap<Byte, String>();
    //在生成的赫夫曼编码表示,需要去拼接路径,定义一个StringBuilder,存储某个叶子结点的路径
    static StringBuilder stringBuilder = new StringBuilder();

    //重载一下
    private static Map<Byte, String> getCodes(Node root) {
        if (root == null) {
            return null;
        }
        //处理左子树
        getCodes(root.left, "0", stringBuilder);
        //处理右子树
        getCodes(root.right, "1", stringBuilder);
        return huffmanCodes;
    }

    /**
     * 功能:将传入的node结点的所有叶子结点的赫夫曼编码得到,并放入到huffmanCodes集合
     *
     * @param node          传入结点
     * @param code          路径:左子结点是0,右子结点1
     * @param stringBuilder 用于拼接路径
     */
    private static void getCodes(Node node, String code, StringBuilder stringBuilder) {
        StringBuilder stringBuilder2 = new StringBuilder(stringBuilder);
        //将code加入到stringBuilder2
        stringBuilder2.append(code);
        if (node != null) {
            //判断当前节点是叶子节点还是非叶子结点
            if (node.data == null) { //非叶子结点
                //向左递归
                getCodes(node.left, "0", stringBuilder2);
                //像右递归
                getCodes(node.right, "1", stringBuilder2);
            } else { //说明是一个叶子结点
                huffmanCodes.put(node.data, stringBuilder2.toString());

            }
        }

    }

    // 前序遍历的方法
    public static void preOrder(Node root) {
        if (root != null) {
            root.preOrder();
        } else {
            System.out.println("赫夫曼空树");
        }
    }

    /**
     * @param bytes 接收字节数组
     * @return 返回数是List 形式
     */
    private static List<Node> getNodes(byte[] bytes) {
        //创建一个ArrayList
        ArrayList<Node> nodes = new ArrayList<>();
        //存储每一个byte出现的次数 ->map[key,value]
        Map<Byte, Integer> counts = new HashMap<>();
        for (byte b : bytes
        ) {
            Integer count = counts.get(b);
            if (count == null) { //map 没有数据
                counts.put(b, 1);
            } else {
                counts.put(b, count + 1);
            }
        }
        //把每一个键值对转成一个node对象,并加入到nodes集合  遍历map
        for (Map.Entry<Byte, Integer> entry : counts.entrySet()) {
            nodes.add(new Node(entry.getKey(), entry.getValue()));
        }
        return nodes;
    }

    //通过list,创建对应的赫夫曼树
    private static Node creatHuffmanTree(List<Node> nodes) {
        while (nodes.size() > 1) {
            //排序
            Collections.sort(nodes);
            System.out.println("nodes = " + nodes);
            //取出根节点权值最小的两颗二叉树
            Node leftNode = nodes.get(0);
            //取出根节点权值第二小的两颗二叉树
            Node rightNode = nodes.get(1);
            //构建一颗新的二叉树,他的根结点没有data,只有权值
            Node parent = new Node(null, leftNode.weight + rightNode.weight);
            parent.left = leftNode;
            parent.right = rightNode;
            //从ArrayList删除处理过的二叉树
            nodes.remove(leftNode);
            nodes.remove(rightNode);
            //将新的二叉树加入到nodes
            nodes.add(parent);
        }
        //最后的结点就是赫夫曼树的根结点
        return nodes.get(0);
    }
}

class Node implements Comparable<Node> {
    Byte data; //存储数据本身.'a' => 97 ' ' =>32
    int weight; //权值,字符出现的次数
    Node left;
    Node right;

    public Node(Byte data, int weight) {
        this.data = data;
        this.weight = weight;
    }


    @Override
    public int compareTo(Node o) {
        return this.weight - o.weight;
    }

    @Override
    public String toString() {
        return "Node{" +
                "data=" + data +
                ", weight=" + weight +
                '}';
    }

    //前序遍历
    public void preOrder() {
        System.out.println(this);
        if (this.left != null) {
            this.left.preOrder();
        }
        if (this.right != null) {
            this.right.preOrder();
        }
    }
    
}
```

字符串运行结果

```java
压缩后的结果:[-88, -65, -56, -65, -56, -65, -55, 77, -57, 6, -24, -14, -117, -4, -60, -90, 28]长度= 17
解压后原来的字符串=i like like like java do you like a java
```

### 6.二叉排序树

二叉排序树：BST: (Binary Sort(Search) Tree), 对于二叉排序树的任何一个非叶子节点，要求左子节点的值比当前节点的值小，右子节点的值比当前节点的值大。  如果有相同的值，可以将该节点放在左子节点或右子节点

![二叉排序树](https://img-blog.csdnimg.cn/00e7f5c89bea4dc79f56fe518b3bf7a5.png)

代码实现

```java
package com.ssm.tree.binartSortTree;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/12 9:51
 */
public class BinarySortTreeDemo {
    public static void main(String[] args) {
        int[] arr = {7, 3, 10, 12, 9, 5, 1, 2};
        BinarySortTree binarySortTree = new BinarySortTree();
        for (int i = 0; i < arr.length; i++) {
            binarySortTree.add(new Node(arr[i]));
        }
        binarySortTree.infixOrder();
        binarySortTree.delNode(10);
        System.out.println("-----------");
        binarySortTree.infixOrder();
    }
}

//二叉排序树
class BinarySortTree {
    private Node root;

    //查找要删除的结点
    public Node search(int value) {
        if (root == null) {
            return null;
        } else {
            return root.search(value);
        }
    }

    //查找父结点
    public Node searchParent(int value) {
        if (root == null) {
            return null;
        } else {
            return root.searchParent(value);
        }
    }

    /**
     * @param node 传入的结点(当做二叉排序树的根结点)
     * @return 返回的 以node 为根结点的二叉排序树的最小结点值
     * 删除node 为根结点的二叉排序树的最小结点
     */
    public int delRightTreeMin(Node node) {
        Node target = node;
        //循环查找左子结点,就会找到最小值
        while (target.left != null) {
            target = target.left;
        }
        //删除最小结点
        delNode(target.value);
        return target.value;
    }

    //删除结点
    public void delNode(int value) {
        if (root == null) {
            return;
        } else {
            Node targetNode = search(value);
            if (targetNode == null) {
                return;
            }
            if (root.left == null && root.right == null) {
                root = null;
                return;
            }
            Node parent = searchParent(value);
            //要删除的结点是叶子结点
            if (targetNode.left == null && targetNode.right == null) {
                if (parent.left != null && parent.left.value == value) {  //是左子结点
                    parent.left = null;
                } else if (parent.right != null && parent.right.value == value) {
                    parent.right = null;
                }
                //要删除的结点有两颗子树
            } else if (targetNode.left != null && targetNode.right != null) {
                int minVal = delRightTreeMin(targetNode.right);
                targetNode.value = minVal;
            } else { //只有一颗子树的结点
                if (targetNode.left != null) {
                    if (parent != null) {
                        if (parent.left.value == value) {
                            parent.left = targetNode.left;
                        } else {
                            parent.right = targetNode.left;
                        }
                    } else {
                        root = targetNode.left;
                    }
                } else {
                    if (parent!=null){
                        if (parent.left.value == value) {
                            parent.left = targetNode.right;
                        } else {
                            parent.right = targetNode.right;
                        }
                    } else {
                        root = targetNode.right;
                    }

                }
            }
        }

    }

    //添加结点
    public void add(Node node) {
        if (root == null) {
            root = node;
        } else {
            root.add(node);
        }
    }

    public void infixOrder() {
        if (root != null) {
            root.infixOrder();
        } else {
            System.out.println("二叉排序树为空！不能遍历");
        }
    }
}

class Node {
    int value;
    Node left;
    Node right;

    public Node(int value) {
        this.value = value;
    }

    /**
     * 查找要删除的节点
     *
     * @param value 希望删除的结点的值
     * @return 如果找到返回该结点，否则返回null
     */
    public Node search(int value) {
        if (value == this.value) {
            return this;
        } else if (value < this.value) {
            if (this.left == null) {
                return null;
            }
            return this.left.search(value);
        } else {
            if (this.right == null) {
                return null;
            }
            return this.right.search(value);
        }
    }

    /**
     * 查找要删除节点的父结点
     *
     * @param value 要找到结点的值
     * @return 返回要删除节点的父结点，如果没有返回nul
     */
    public Node searchParent(int value) {
        if ((this.left != null && this.left.value == value) || (this.right != null && this.right.value == value)) {
            return this;
        } else {
            if (value < this.value && this.left != null) {
                return this.left.searchParent(value);
            } else if (value >= this.value && this.right != null) {
                return this.right.searchParent(value);
            } else {
                return null;
            }
        }
    }


    @Override
    public String toString() {
        return "Node{" +
                "value=" + value +
                '}';
    }

    //添加结点
    public void add(Node node) {
        if (node == null) {
            return;
        }
        if (node.value < this.value) {
            if (this.left == null) {
                this.left = node;
            } else {
                this.left.add(node);
            }
        } else {
            if (this.right == null) {
                this.right = node;
            } else {
                this.right.add(node);
            }
        }
    }

    //编写中序遍历
    public void infixOrder() {
        if (this.left != null) {
            this.left.infixOrder();
        }
        System.out.println(this);
        if (this.right != null) {
            this.right.infixOrder();
        }
    }

}
```

### 7. 平衡二叉树

- 平衡二叉树也叫平衡二叉排序(搜索)树（Self-balancing binary search tree）又被称为AVL树， 可以**保证查询效率较高**。

- 具有以下**特点**：它是一 棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。平衡二叉树的常用实现方法有[红黑树](https://baike.baidu.com/item/红黑树/2413209)、[AVL](https://baike.baidu.com/item/AVL/7543015)、[替罪羊树](https://baike.baidu.com/item/替罪羊树/13859070)、[Treap](https://baike.baidu.com/item/Treap)、[伸展树](https://baike.baidu.com/item/伸展树/7003945)等。

![eg](https://img-blog.csdnimg.cn/dda5bc0ab06944ef8b5949a493192d23.png)

![左右旋转](https://img-blog.csdnimg.cn/66c187d4e742460e8086e11e7e580d03.jpg)



代码实现

```java
package com.ssm.tree.avlTree;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/12 18:35
 */
public class AVLTreeDemo {
    public static void main(String[] args) {
        //  int [] arr = {4,3,6,5,7,8};
        int[] arr = {10, 11, 7, 6, 8, 9};
        AVLTree avlTree = new AVLTree();
        for (int i = 0; i < arr.length; i++) {
            avlTree.add(new Node(arr[i]));
        }
        avlTree.infixOrder();
        System.out.println(avlTree.getRoot().height());
        System.out.println(avlTree.getRoot().leftHeight());
        System.out.println(avlTree.getRoot().rightHeight());

    }
}

class AVLTree {
    private Node root;

    public Node getRoot() {
        return root;
    }
    
    //查找要删除的结点
    public Node search(int value) {
        if (root == null) {
            return null;
        } else {
            return root.search(value);
        }
    }

    //查找父结点
    public Node searchParent(int value) {
        if (root == null) {
            return null;
        } else {
            return root.searchParent(value);
        }
    }

    /**
     * @param node 传入的结点(当做二叉排序树的根结点)
     * @return 返回的 以node 为根结点的二叉排序树的最小结点值
     * 删除node 为根结点的二叉排序树的最小结点
     */
    public int delRightTreeMin(Node node) {
        Node target = node;
        //循环查找左子结点,就会找到最小值
        while (target.left != null) {
            target = target.left;
        }
        //删除最小结点
        delNode(target.value);
        return target.value;
    }

    //删除结点
    public void delNode(int value) {
        if (root == null) {
            return;
        } else {
            Node targetNode = search(value);
            if (targetNode == null) {
                return;
            }
            if (root.left == null && root.right == null) {
                root = null;
                return;
            }
            Node parent = searchParent(value);
            //要删除的结点是叶子结点
            if (targetNode.left == null && targetNode.right == null) {
                if (parent.left != null && parent.left.value == value) {  //是左子结点
                    parent.left = null;
                } else if (parent.right != null && parent.right.value == value) {
                    parent.right = null;
                }
                //要删除的结点有两颗子树
            } else if (targetNode.left != null && targetNode.right != null) {
                int minVal = delRightTreeMin(targetNode.right);
                targetNode.value = minVal;
            } else { //只有一颗子树的结点
                if (targetNode.left != null) {
                    if (parent != null) {
                        if (parent.left.value == value) {
                            parent.left = targetNode.left;
                        } else {
                            parent.right = targetNode.left;
                        }
                    } else {
                        root = targetNode.left;
                    }
                } else {
                    if (parent != null) {
                        if (parent.left.value == value) {
                            parent.left = targetNode.right;
                        } else {
                            parent.right = targetNode.right;
                        }
                    } else {
                        root = targetNode.right;
                    }

                }
            }
        }

    }

    //添加结点
    public void add(Node node) {
        if (root == null) {
            root = node;
        } else {
            root.add(node);
        }
    }

    public void infixOrder() {
        if (root != null) {
            root.infixOrder();
        } else {
            System.out.println("二叉排序树为空！不能遍历");
        }
    }
}

class Node {
    int value;
    Node left;
    Node right;

    public Node(int value) {
        this.value = value;
    }

    //返回左子树的高度
    public int leftHeight() {
        if (left == null) {
            return 0;
        }
        return left.height();
    }

    //返回右子树的高度
    public int rightHeight() {
        if (right == null) {
            return 0;
        }
        return right.height();
    }

    //返回以该结点为根结点的高度
    public int height() {
        return Math.max(left == null ? 0 : left.height(), right == null ? 0 : right.height()) + 1;
    }

    //左旋转方法
    private void leftRotate() {
        //创建新结点,以当前结点的值
        Node newNode = new Node(value);
        //把新的结点的左子树设置成当前结点的左子树
        newNode.left = left;
        //把新的结点的右子树设置成当前结点的右子树的左子树
        newNode.right = right.left;
        //把当前结点的值替换成右子结点的值
        value = right.value;
        //把当前结点的右子树设置成当前结点右子树的右子树
        right = right.right;
        //把当前结点的左子树(结点)设置成新的结点
        left = newNode;
    }

    //右旋转方法
    private void rightRotate() {
        Node newNode = new Node(value);
        //新结点的右子树设置成当前结点的右子树
        newNode.right = right;
        //新结点的左子树设置成当前结点的左子树的右子树
        newNode.left = left.right;
        //当前结点的值换为左子结点的值
        value = left.value;
        //当前结点的左子树设置成左子树的左子树
        left = left.left;
        ///当前结点的右子树设置为新结点
        right = newNode;

    }

    /**
     * 查找要删除的节点
     *
     * @param value 希望删除的结点的值
     * @return 如果找到返回该结点，否则返回null
     */
    public Node search(int value) {
        if (value == this.value) {
            return this;
        } else if (value < this.value) {
            if (this.left == null) {
                return null;
            }
            return this.left.search(value);
        } else {
            if (this.right == null) {
                return null;
            }
            return this.right.search(value);
        }
    }

    /**
     * 查找要删除节点的父结点
     *
     * @param value 要找到结点的值
     * @return 返回要删除节点的父结点，如果没有返回nul
     */
    public Node searchParent(int value) {
        if ((this.left != null && this.left.value == value) || (this.right != null && this.right.value == value)) {
            return this;
        } else {
            if (value < this.value && this.left != null) {
                return this.left.searchParent(value);
            } else if (value >= this.value && this.right != null) {
                return this.right.searchParent(value);
            } else {
                return null;
            }
        }
    }


    @Override
    public String toString() {
        return "Node{" +
                "value=" + value +
                '}';
    }

    //添加结点
    public void add(Node node) {
        if (node == null) {
            return;
        }
        if (node.value < this.value) {
            if (this.left == null) {
                this.left = node;
            } else {
                this.left.add(node);
            }
        } else {
            if (this.right == null) {
                this.right = node;
            } else {
                this.right.add(node);
            }
        }
        // 1.当符合右旋转的条件时
        // 2.如果它的左子树的的右子树高度大于它的左子树的高度
        // 3.先对当前这个结点的左节点进行左旋转
        // 4.再对当前结点进行右旋转的操作即可
        if (rightHeight() - leftHeight() > 1) { //左旋转
            //如果它的右子树的左子树的高度大于它的右子树的右子树的高度
            if (right != null && right.leftHeight() > right.rightHeight()) {
                //先对右子结点进行右转移
                right.rightRotate();
                //然后再对当前结点进行左转移
                leftRotate();
            } else {
                leftRotate();

            }
            return;
        }
        if (leftHeight() - rightHeight() > 1) { //右旋转
            if (left != null && left.rightHeight() > left.leftHeight()) {
                //先对当前这个结点的左节点进行左旋转
                left.leftRotate();
                rightRotate();
            } else {
                rightRotate();
            }

        }
    }

    //编写中序遍历
    public void infixOrder() {
        if (this.left != null) {
            this.left.infixOrder();
        }
        System.out.println(this);
        if (this.right != null) {
            this.right.infixOrder();
        }
    }

}
```

### 多路查找树

#### 1. 多叉树

- 在二叉树中，每个节点有数据项，最多有两个子节点。如果**允许每个节点可以有更多的数据项和更多的子节点**，就是**多叉树**

#### 2. B树

- B树通过重新组织节点，降低树的高度，并且减少i/o读写次数来提升效率  
- B树的阶：节点的最多子节点个数。比如2-3树的阶是3，2-3-4树的阶是4
- B-树的搜索，从根结点开始，对结点内的关键字（有序）序列进行二分查找，如果命中则结束，否则进入查询关键字所属范围的儿子结点；重复，直到所对应的儿子指针为空，或已经是叶子结点
- 关键字集合分布在整颗树中, 即叶子节点和非叶子节点都存放数据.
- 搜索有可能在非叶子结点结束
- 其搜索性能等价于在关键字全集内做一次二分查找

![B树](https://img-blog.csdnimg.cn/a385deda670f48569e2ecf8e1b4e39ee.png)

##### 2.1 2-3树基本介绍

- 2-3树的所有叶子节点都在同一层.(只要是B树都满足这个条件)

- 有两个子节点的节点叫二节点，二节点要么没有子节点，要么有两个子节点.

- 有三个子节点的节点叫三节点，三节点要么没有子节点，要么有三个子节点.

- 2-3树是由二节点和三节点构成的树。

- 插入规则:

  - 2-3树的所有叶子节点都在同一层.(只要是B树都满足这个条件)

  - 有两个子节点的节点叫二节点，二节点要么没有子节点，要么有两个子节点.
  - 有三个子节点的节点叫三节点，三节点要么没有子节点，要么有三个子节点
  - 当按照规则插入一个数到某个节点时，不能满足上面三个要求，就需要拆，先向上拆，如果上层满，则拆本层，拆后仍然需要满足上面3个条件。 
  - 对于三节点的子树的值大小仍然遵守(BST 二叉排序树)的规则

![2-3树](https://img-blog.csdnimg.cn/2fdcf1746da94cf1b85391a64ef05a85.png)

#### 3. B+树

- B+树的搜索与B树也基本相同，区别是B+树只有达到叶子结点才命中（B树可以在非叶子结点命中），其性能也等价于在关键字全集做一次二分查找
- 所有**关键字都出现在叶子结点的链表中**（即数据只能在叶子节点【也叫稠密索引】），且链表中的关键字(数据)恰好是有序的。
- 不可能在非叶子结点命中

- 非叶子结点相当于是叶子结点的索引（稀疏索引），叶子结点相当于是存储（关键字）数据的数据层
- 更适合文件索引系统
- B树和B+树各有自己的应用场景，不能说B+树**完全比**B树好，反之亦然.

![B+树](https://img-blog.csdnimg.cn/6e6cc37542f4416f991d9ba1744dfc15.png)

#### 4. B*树

- B*树定义了非叶子结点关键字个数至少为(2/3)*M，即块的最低使用率为2/3，而B+树的块的最低使用率为B+树的1/2。
- 从第1个特点我们可以看出，B*树分配新结点的概率比B+树要低，空间使用率更高

![B*树](https://img-blog.csdnimg.cn/b2d68c1dd4f94fd993548864f7b1bb83.png)

