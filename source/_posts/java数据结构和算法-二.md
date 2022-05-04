---
title: java数据结构和算法(二)
top: false
cover: false
toc: true
mathjax: true
date: 2021-09-24 22:31:00
password:
summary: 栈(计算器[中缀表达式->后缀表达式])、递归(迷宫、八皇后)
tags: java
categories: 数据结构和算法
---



###  <center>栈

#### 1.1 栈的介绍

- 栈的英文为(stack)

- 栈是一个**先入后出**(FILO-First In Last Out)的有序列表。

- 栈(stack)是限制线性表中元素的插入和删除**只能在线性表的同一端**进行的一种特殊线性表。允许插入和删除的一端，为变化的一端，称为**栈顶**(Top)，另一端为固定的一端，称为**栈底**(Bottom)。

- 根据栈的定义可知，最先放入栈中元素在栈底，最后放入的元素在栈顶，而删除元素刚好相反，最后放入的元素最先删除，最先放入的元素最后删除

![入栈](https://img-blog.csdnimg.cn/629064845556410c83cddd02f0ba0f5c.png)

![出栈](https://img-blog.csdnimg.cn/9b405e76cbda41dcb3aab55ae8d97301.png)

#### 1.2 栈的应用场景

- 子程序的调用：在跳往子程序前，会先将下个指令的地址存到堆栈中，直到子程序执行完后再将地址取出，以回到原来的程序中。  

- 处理递归调用：和子程序的调用类似，只是除了储存下一个指令的地址外，也将参数、区域变量等数据存入堆栈中。

- 表达式的转换[中缀表达式转后缀表达式]与求值(实际解决)。

- 二叉树的遍历。

- 图形的深度优先(depth一first)搜索法。

#### 1.3 栈的快速入门

**思路**

- 定义top表示栈顶，初始值为-1
- 入栈的操作，先让top++，再放入数组
- 出栈操作，先取出元素，在让top–
- top == -1时，栈空
- top == maxSize-1时，栈满

**代码实现**

```java
public class ArrayStackDemo {
    public static void main(String[] args) {
        ArrayStack stack = new ArrayStack(4);
        String key = "";
        boolean loop = true;
        Scanner scanner = new Scanner(System.in);

        while (loop){
            System.out.println("show: 显示栈");
            System.out.println("exit: 退出程序");
            System.out.println("push: 添加数据到栈(入栈)");
            System.out.println("pop: 从栈中弹出数据(弹栈)");
            key = scanner.next();
            switch (key){
                case "show":
                    stack.list();
                    break;
                case "push":
                    System.out.println("请输入一个数");
                    int value = scanner.nextInt();
                    stack.push(value);
                    break;
                case "pop":
                    try {
                        int res = stack.pop();
                        System.out.println("出栈的数据是: "+res);
                    } catch (Exception e){
                        System.out.println(e.getMessage());
                    }
                    break;
                case "exit":
                    scanner.close();
                    loop = false;
                    break;
                default:
                    break;
            }
        }
        System.out.println("退出程序!");

    }
}

//栈
class ArrayStack {
    private int maxSize; //栈的大小
    private int[] stack; //数组模拟战
    private int top = -1; //top表示栈顶,初始值为-1

    //构造器
    public ArrayStack(int maxSize) {
        this.maxSize = maxSize;
        stack = new int[this.maxSize];
    }

    //栈满
    public boolean isFull() {
        return top == maxSize - 1;
    }

    //栈空
    public boolean isEmpty() {
        return top == -1;
    }

    //入栈-push
    public void push(int value) {
        if (isFull()) {
            System.out.println("栈满");
            return;
        }

        top++;
        stack[top] = value;
    }

    //出栈
    public int pop() {
        if (isEmpty()) {
            //抛出异常
            throw new RuntimeException("栈空");
        }
        int value = stack[top];
        top--;
        return value;
    }

    //遍历栈
    public void list() {
        if (isEmpty()) {
            System.out.println("栈空");
            return;
        }
        for (int i = top; i >= 0; i--) {
            System.out.printf("stack[%d]=%d\n", i, stack[i]);
        }
    }
}
```

#### 1.4 栈实现综合计算器(中缀表达式)

- 求[7*2+12-5]

- 通过一个index值(索引)，来遍历找们的表达式
- 如果我们发现是一个数字就直接入数栈
- 3如果发现扫描到是一个符号就分如下情况
  - 如果发现当前的符号栈为空，就直接入栈
  - 如果符号栈有操作符，就进行比较<font color="red">如果当前的操作符的优先级小于或者等于栈中的操作符</font>，就需要从数栈中pop出两个数在从符号栈中pop出一个符号，进行运算，将得到结果，入数栈，然后将当前的操作符入符号栈，<font color="red">如果当前的操作符的优先级大于栈中的操作符，就直接入符号栈</font>
- 当表达式扫描完毕，就顺序的从数栈和符号栈中pop出相应的数和符号，并运行.
- 5最后在数栈只有一个数字，就是表达式的结果

![数栈,符号栈](https://img-blog.csdnimg.cn/1aaaf16df056477fa3454e8263169c5d.png)代码实现:

```java
public class Calculator {
    public static void main(String[] args) {
        String experssion = "70+2*6-4";
        //创建两个栈 数栈,符号栈
        ArrayStack2 numStack = new ArrayStack2(10);
        ArrayStack2 operStack = new ArrayStack2(10);
        //定义需要的相关变量
        int index = 0;
        int num1 = 0;
        int num2 = 0;
        int oper = 0;
        int res = 0;
        char ch = ' ';
        String keepNum = "";//用于拼接多位数
        while (true) {
            ch = experssion.substring(index, index + 1).charAt(0);
            //判断ch是什么,然后做相应的处理
            if (operStack.isOper(ch)) { //如果是运算符
                //判断当前栈是否为空
                if (!operStack.isEmpty()) {
                    //如果符号栈中有操作符,就进行比较,如果当前的操作符的优先级小于或者等于栈中的操作符,就需要从数栈中pop出两个数
                    //再从符号栈中pop出一个符号,进行运算,将得到的结果入数栈,然后将当前的操作符入符号栈
                    if (operStack.priority(ch) <= operStack.priority(operStack.peek())) {
                        num1 = numStack.pop();
                        num2 = numStack.pop();
                        oper = operStack.pop();
                        res = numStack.cal(num1, num2, oper);
                        //将得到的结果入数栈
                        numStack.push(res);
                        //然后将当前的操作符入符号栈
                        operStack.push(ch);
                    } else {
                        //如果当前的操作符的优先级小于或者等于栈中的操作符,就直接入符号栈
                        operStack.push(ch);
                    }
                } else {
                    //如果为空直接入符号栈
                    operStack.push(ch);
                }

            } else { //如果是数,则直接入数栈
                //1.当处理多位数时,不能发现是一个数就直接入栈
                //2.在处理数时,需要向expression的表达式的index 后再看一位,如果是数就扫描,如果是符号才入栈
                //3. 定义一个字符串变量用于拼接
                keepNum+=ch;
                //如果expression是最后一位,就直接入栈
                if (index == experssion.length()-1){
                    numStack.push(Integer.parseInt(keepNum));
                } else {
                    //判断下一个字符是不是数字,,如果是数就扫描,如果是符号才入栈
                    if (operStack.isOper(experssion.substring(index+1,index+2).charAt(0))){
                        //如果后一位是运算符,则入栈
                        numStack.push(Integer.parseInt(keepNum));
                        //keepNum清空!!!!!
                        keepNum="";
                    }
                }

            }
            index++;
            if (index >=experssion.length()){
                break;
            }
        }
        while (true){
            if (operStack.isEmpty()){
                break;
            }
            num1 = numStack.pop();
            num2 = numStack.pop();
            oper = operStack.pop();
            res = numStack.cal(num1, num2, oper);
            numStack.push(res);
        }

        System.out.printf("表达式%s = %d",experssion,numStack.pop()) ;
    }
}

class ArrayStack2 {
    private int maxSize; //栈的大小
    private int[] stack; //数组模拟战
    private int top = -1; //top表示栈顶,初始值为-1

    //构造器
    public ArrayStack2(int maxSize) {
        this.maxSize = maxSize;
        stack = new int[this.maxSize];
    }

    // 返回当前栈顶的值
    public int peek() {
        return stack[top];
    }

    //栈满
    public boolean isFull() {
        return top == maxSize - 1;
    }

    //栈空
    public boolean isEmpty() {
        return top == -1;
    }

    //入栈-push
    public void push(int value) {
        if (isFull()) {
            System.out.println("栈满");
            return;
        }

        top++;
        stack[top] = value;
    }

    //出栈
    public int pop() {
        if (isEmpty()) {
            //抛出异常
            throw new RuntimeException("栈空");
        }
        int value = stack[top];
        top--;
        return value;
    }

    //遍历栈
    public void list() {
        if (isEmpty()) {
            System.out.println("栈空");
            return;
        }
        for (int i = top; i >= 0; i--) {
            System.out.printf("stack[%d]=%d\n", i, stack[i]);
        }
    }

    //返回运算符的优先级,优先级用数字表示
    public int priority(int oper) {
        if (oper == '*' || oper == '/') {
            return 1;
        } else if (oper == '+' || oper == '-') {
            return 0;
        } else {
            return -1;
        }
    }

    //判断是不是一个运算符
    public boolean isOper(char val) {
        return val == '+' || val == '-' || val == '*' || val == '/';
    }

    public int cal(int num1, int num2, int oper) {
        int res = 0; //res 用于存放计算的结果
        switch (oper) {
            case '+':
                res = num1 + num2;
                break;
            case '-':
                res = num2 - num1;
                break;
            case '*':
                res = num1 * num2;
                break;
            case '/':
                res = num2 / num1;
                break;
            default:
                break;
        }
        return res;
    }
}
```

### 2.1前缀表示、中缀表达式、后缀表达式(逆波兰表达式)

**<font color="blue">前缀表达式的计算机求值</font>**

从右至左扫描表达式，遇到数字时，将数字压入堆栈，遇到运算符时，弹出栈顶的两个数，用运算符对它们做相应的计算（栈顶元素 和 次顶元素），并将结果入栈；重复上述过程直到表达式最左端，最后运算得出的值即为表达式的结果

例如: (3+4)×5-6 对应的前缀表达式就是 **- × + 3 4 5** **6 ,** **针对前缀表达式求值步骤**如下

1)从**右至左扫描**，将6、5、4、3压入堆栈

2)遇到+运算符，因此弹出3和4（3为栈顶元素，4为次顶元素），计算出3+4的值，得7，再将7入栈

3)接下来是×运算符，因此弹出7和5，计算出7×5=35，将35入栈

4)最后是-运算符，计算出35-6的值，即29，由此得出最终结果

**<font color="blue">中缀表达式</font>**

1)中缀表达式就是**常见的运算表达式**，如(3+4)×5-6

2)中缀表达式的求值是我们人最熟悉的，但是对计算机来说却不好操作(前面我们讲的案例就能看的这个问题)，因此，在计算结果时，往往会将中缀表达式转成其它表达式来操作(一般转成后缀表达式.)

**<font color="blue">后缀表达式</font>**

1)后缀表达式又称**逆波兰表达式**,与前缀表达式相似，只是运算符位于操作数之后

2)中举例说明： (3+4)×5-6 对应的后缀表达式就是 **3** **4 + 5 × 6** **–**

| 正常的表达式 | 逆波兰表达式  |
| ------------ | ------------- |
| a+b          | a b +         |
| a+(b-c)      | a b c - +     |
| a+(b-c)*d    | a b c – d * + |
| a+d*(b-c)    | a d b c - * + |
| a=1+3        | a 1 3 + =     |

**<font color="blue">后缀表达式的计算机求值</font>**

从**左至右**扫描表达式，遇到数字时，将数字压入堆栈，遇到运算符时，弹出栈顶的两个数，用运算符对它们做相应的计算（次顶元素 和 栈顶元素），并将结果入栈；重复上述过程直到表达式最右端，最后运算得出的值即为表达式的结果

例如: (3+4)×5-6 对应的后缀表达式就是 **3 4 + 5 × 6 -** **,** 针对后缀表达式求值步骤如下:

1)从左至右扫描，将3和4压入堆栈；

2)遇到+运算符，因此弹出4和3（4为栈顶元素，3为次顶元素），计算出3+4的值，得7，再将7入栈；

3)将5入栈；

4)接下来是×运算符，因此弹出5和7，计算出7×5=35，将35入栈；

5)将6入栈；

6)最后是运算符，计算出的值，即，由此得出最终结 .

#### 2.2 逆波兰计算器

- 支持 + - * / ( ) 
- 多位数，支持小数,
- 兼容处理, 过滤任何空白字符，包括空格、制表符、换页符

**逆波兰计算器**

代码实现:

```java
package com.ssm.stack;
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/9/26 20:53
 */
public class PoLandNotation {

    public static void main(String[] args) {
        //定义逆波兰表达式
        String suffixExpression = "3 4 + 5 * 6 -";
        //思路: 1.先将"3 4 + 5 * 6-" => 放到ArrayList中
        //2.将ArrayList 传递给一个方法,遍历ArrayList 配合栈完成计算
        List<String> rpnList = getListString(suffixExpression);
        System.out.println("rpnList=" + rpnList);

        int res = calculate(rpnList);
        System.out.println("计算的结果是:" + res);
    }

    //将一个逆波兰表达式依次将数据和运算符放入到ArrayList中
    public static List<String> getListString(String suffixExpression) {
        // 将 suffixExpression 分割
        String[] split = suffixExpression.split(" ");
        List<String> list = new ArrayList<String>();
        for (String ele : split) {
            list.add(ele);
        }
        return list;
    }

    //完成对逆波兰表达式的运算
    public static int calculate(List<String> ls) {
        //创建一个栈
        Stack<String> stack = new Stack<>();
        //遍历ls
        for (String item : ls
        ) {
            //使用正则表达式取出数据
            if (item.matches("\\d+")) {
                stack.push(item);
            } else {
                //pop 两个数,并运算,再入栈
                int num2 = Integer.parseInt(stack.pop());
                int num1 = Integer.parseInt(stack.pop());
                int res = 0;
                if (item.equals("+")) {
                    res = num1 + num2;
                } else if (item.equals("-")) {
                    res = num1 - num2;
                } else if (item.equals("*")) {
                    res = num1 * num2;
                } else if (item.equals("/")) {
                    res = num1 / num2;
                } else {
                    throw new RuntimeException("运算符有误");
                }
                //把res入栈
                stack.push("" + res);
            }
        }
        //最后留在stack中的数据就是运算结果
        return Integer.parseInt(stack.pop());

    }
}
```

#### 2.3 中缀表达式转后缀表达式的思路分析

<font color="blue">具体步骤如下:</font>

- 初始化两个栈：运算符栈s1和储存中间结果的栈s2；

- 从左至右扫描中缀表达式；

- 遇到操作数时，将其压s2；

- 遇到运算符时，比较其与s1栈顶运算符的优先级：
  - 如果s1为空，或栈顶运算符为左括号“(”，则直接将此运算符入栈；
  - 否则，若优先级比栈顶运算符的高，也将运算符压入s1；
  - 否则，将s1栈顶的运算符弹出并压入到s2中，再次转到(4-1)与s1中新的栈顶运算符相比较； 

- 遇到括号时：
  - 如果是左括号“(”，则直接压入s1
  - 如果是右括号“)”，则依次弹出s1栈顶的运算符，并压入s2，直到遇到左括号为止，此时将这一对括号丢弃

- 重复步骤2至5，直到表达式的最右边

- 将s1中剩余的运算符依次弹出并压入s2

- 依次弹出s2中的元素并输出，**结果的逆序即为中缀表达式对应的后缀表达式**

<font color="blue">举例说明:</font>

将中缀表达式**1+((2+3)×4)-5**转为后缀表达式的*过程如下:

因此结果为**1 2 3 + 4 × + 5 –**

| 扫描到的元素 | s2(栈底->栈顶)         | s1 (栈底->栈顶) | 说明                               |
| ------------ | ---------------------- | --------------- | ---------------------------------- |
| 1            | 1                      | 空              | 数字，直接入栈                     |
| +            | 1                      | +               | s1为空，运算符直接入栈             |
| (            | 1                      | + (             | 左括号，直接入栈                   |
| (            | 1                      | + ( (           | 同上                               |
| 2            | 1 2                    | + ( (           | 数字                               |
| +            | 1 2                    | + ( ( +         | s1栈顶为左括号，运算符直接入栈     |
| 3            | 1 2 3                  | + ( ( +         | 数字                               |
| )            | 1 2 3 +                | + (             | 右括号，弹出运算符直至遇到左括号   |
| ×            | 1 2 3 +                | + ( ×           | s1栈顶为左括号，运算符直接入栈     |
| 4            | 1 2 3 + 4              | + ( ×           | 数字                               |
| )            | 1 2 3 + 4 ×            | +               | 右括号，弹出运算符直至遇到左括号   |
| -            | 1 2 3 + 4 × +          | -               | -与+优先级相同，因此弹出+，再压入- |
| 5            | 1 2 3 + 4 × + 5        | -               | 数字                               |
| 到达最右端   | **1  2 3 + 4 × + 5 -** | 空              | s1中剩余的运算符                   |

代码实现

```java
package com.ssm.stack;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/9/26 20:53
 */
public class PoLandNotation {

    public static void main(String[] args) {
        //将中缀表达式转成后缀表达式
        //直接对str操作不方便,因此将 "1+((2+3)*4)-5" => ArrayList [1,+,(,(,2,+,3,),*4,)-,5]
        //将得到的中缀表达式对应的list => 后缀表达式对应的list
        //即 ArrayList [1,+,(,(,2,+,3,),*4,)-,5]  => ArrayList [1,2,3,+,4,*+,5,-]
        String expression = "1+((2+3)*4)-5";
        List<String> infixExpressionList = toInfixExpressionList(expression);
        System.out.println("中缀表达式对应的list:"+infixExpressionList);
        List<String> parseSuffixExpressionList = parseSuffixExpressionList(infixExpressionList);
        System.out.println("后缀表达式对应的list:"+parseSuffixExpressionList);
        System.out.printf("expression=%d",calculate(parseSuffixExpressionList));
        System.out.println();
        //定义逆波兰表达式
        String suffixExpression = "3 4 + 5 * 6 -";
        //思路: 1.先将"3 4 + 5 * 6-" => 放到ArrayList中
        //2.将ArrayList 传递给一个方法,遍历ArrayList 配合栈完成计算
        List<String> rpnList = getListString(suffixExpression);
        System.out.println("rpnList=" + rpnList);

        int res = calculate(rpnList);
        System.out.println("计算的结果是:" + res);

    }

    // ArrayList [1,+,(,(,2,+,3,),*4,)-,5]  => ArrayList [1,2,3,+,4,*+,5,-]
    public static List<String> parseSuffixExpressionList(List<String> ls){
        //定义两个栈 s2可以用ArrayList代替
        Stack<String> s1 = new Stack<String>();
        List<String> s2 = new ArrayList<String>();
        for (String item:ls) {
            //如果是一个数
            if (item.matches("\\d+")){
                s2.add(item);
            } else if (item.equals("(")){
                s1.push(item);
            } else if (item.equals(")")){
                //如果是右括号“)”，则依次弹出s1栈顶的运算符，并压入s2，直到遇到左括号为止，此时将这一对括号丢弃
                while (!s1.peek().equals("(")){
                    s2.add(s1.pop());
                }
                s1.pop();//!!! 将( 弹出s1栈 消除小括号

            } else {
                //步骤第四步
                while (s1.size() !=0 && Operation.getValue(s1.peek())>=Operation.getValue(item)){
                    s2.add(s1.pop());
                }
                s1.push(item);
            }
        }
        //将s1中剩余的运算符依次弹出并加入s2
        while (s1.size()!=0){
            s2.add(s1.pop());
        }
        return s2; //因为是存放到 list中,因此按顺序输出就是对应的后缀表达式对应的list
    }

    //将中缀表达式转成对应的list
    public static List<String> toInfixExpressionList(String s) {
        List<String> ls = new ArrayList<String>();
        int i = 0;//指针 用于遍历中缀表达式字符串
        String str; //多位数拼接
        char c; //每遍历一个字符就放入到c
        do {
            //如果c是非数字,需要加入到ls中
            if ((c = s.charAt(i)) < 48 || (c = s.charAt(i)) > 57) {
                ls.add("" + c);
                i++;
            } else { //如果是一个数,需要考虑多位数
                str = "";
                while (i < s.length() && (c = s.charAt(i)) >= 48 && (c = s.charAt(i)) <= 57) {
                    str += c; //拼接
                    i++;
                }
                ls.add(str);
            }
        } while (i < s.length()); {
            return ls;
        }
    }

    //将一个逆波兰表达式依次将数据和运算符放入到ArrayList中
    public static List<String> getListString(String suffixExpression) {
        // 将 suffixExpression 分割
        String[] split = suffixExpression.split(" ");
        List<String> list = new ArrayList<String>();
        for (String ele : split) {
            list.add(ele);
        }
        return list;
    }

    //完成对逆波兰表达式的运算
    public static int calculate(List<String> ls) {
        //创建一个栈
        Stack<String> stack = new Stack<>();
        //遍历ls
        for (String item : ls
        ) {
            //使用正则表达式取出数据
            if (item.matches("\\d+")) {
                stack.push(item);
            } else {
                //pop 两个数,并运算,再入栈
                int num2 = Integer.parseInt(stack.pop());
                int num1 = Integer.parseInt(stack.pop());
                int res = 0;
                if (item.equals("+")) {
                    res = num1 + num2;
                } else if (item.equals("-")) {
                    res = num1 - num2;
                } else if (item.equals("*")) {
                    res = num1 * num2;
                } else if (item.equals("/")) {
                    res = num1 / num2;
                } else {
                    throw new RuntimeException("运算符有误");
                }
                //把res入栈
                stack.push("" + res);
            }
        }
        //最后留在stack中的数据就是运算结果
        return Integer.parseInt(stack.pop());

    }
}
class Operation{
    private static int ADD = 1;
    private static int SUB = 1;
    private static int MUL = 2;
    private static int DIV = 2;

    //返回对应的优先级数字
    public static int getValue(String operation){
        int result = 0;
        switch (operation){
            case "+":
                result = ADD;
                break;
            case "-":
                result = SUB;
                break;
            case "*":
                result = MUL;
                break;
            case "/":
                result = DIV;
                break;
            default:
                System.out.println("不存在该运算符");
                break;
        }
        return result;
    }
}
```

### <center>递归

- **递归就是方法自己调用自己**,每次调用时**传入不同的变量**.递归有助于编程者解决复杂的问题,同时可以让代码变得简洁。

#### 2.1 递归简单示例

递归调用规则:

- 当程序执行到一个方法时,就会开辟一个独立的空间(栈帧)
- 每个空间的数据(局部变量),是独立的

![递归图解](https://img-blog.csdnimg.cn/9d9722f7d8534a2d83a4810d0b55fc8c.png)

打印问题代码实现:

```java
package com.ssm.recursion;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/9/30 13:22
 */
public class RecursionTest {
    public static void main(String[] args) {
        test(4);
    }

    //打印问题
    public static void test(int n) {
        if (n > 2) {
            test(n - 1);
        }
        System.out.println("n=" + n);
    }
}
```

运行结果:

```java
n=2
n=3
n=4
```

阶层问题代码实现:

```java
package com.ssm.recursion;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/9/30 13:22
 */
public class RecursionTest {
    public static void main(String[] args) {
  	  System.out.println(factorial(4));
    }

  //阶层问题
    public static int factorial(int n) {
        if (n == 1) {
            return 1;
        } else {
            return factorial(n - 1) * n; // 1 * 2 * 3 * 4
        }
    }
}
```

运行结果

```java
24
```

- 递归需要遵守的重要规则
  - 执行一个方法时，就创建一个新的受保护的独立空间(栈空间)
  - 方法的局部变量是独立的，不会相互影响，比如n变量
  - 如果方法中使用的是引用类型变量(比如数组)，就会共享该引用类型的数据
  - 递归必须向退出递归的条件逼近，否则就是无限递归出现StackOverflowError，死龟了:)
  - 当一个方法执行完毕，或者遇到return，就会返回，遵守谁调用，就将结果返回给谁，同时当方法执行完毕或
    者返回时，该方法也就执行完毕

#### 3.1 迷宫问题

代码实现:

```java
package com.ssm.recursion;
/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/9/30 14:30
 */
public class MiGong {
    public static void main(String[] args) {
        //创建二维数组 模拟二维数组
        int[][] map = new int[8][7];
        //上下左右全部置为1
        for (int i = 0; i < 7; i++) {
            map[0][i] = 1;
            map[7][i] = 1;
        }
        for (int i = 0; i < 8; i++) {
            map[i][0] = 1;
            map[i][6] = 1;
        }
        //设置挡板,1表示
        map[3][1] = 1;
        map[3][2] = 1;
        // 输出地图
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 7; j++) {
                System.out.print(map[i][j] + " ");
            }
            System.out.println();
        }
        System.out.println("-------------");
        //使用递归回溯给小球找路
        setWay(map, 1, 1);
        //输出新地图
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 7; j++) {
                System.out.print(map[i][j] + " ");
            }
            System.out.println();
        }
    }

    /**
     * 出发点map[1][1]
     * 若小球能到map[6][5] 则找到通路
     * 约定:当map[i][j]为0的点表示改点没有走过,当1表示墙,2表示可以走,3表示此路以走过,但走不通
     * 在走迷宫时,制定一个策略:  下->右->上->左,如果改点走不通,再回溯
     *
     * @param map 地图
     * @param i   从哪个位置找
     * @param j   从哪个位置找
     * @return 若找到通路, 返回true, 否则返回false
     */
    public static boolean setWay(int[][] map, int i, int j) {
        if (map[6][5] == 2) { //已找到
            return true;
        } else {
            if (map[i][j] == 0) { //这个点没走过
                // 按照策略 下->右->上->左
                map[i][j] = 2; // 假定该点可有走通
                if (setWay(map, i + 1, j)) {
                    return true;
                } else if (setWay(map, i, j + 1)) {
                    return true;
                } else if (setWay(map, i - 1, j)) {
                    return true;
                } else if (setWay(map, i, j - 1)) {
                    return true;
                } else {
                    map[i][j] = 3;
                    return false;
                }

            } else {
                return false;
            }
        }
    }
}
```

运行结果:

```java
1 1 1 1 1 1 1 
1 0 0 0 0 0 1 
1 0 0 0 0 0 1 
1 1 1 0 0 0 1 
1 0 0 0 0 0 1 
1 0 0 0 0 0 1 
1 0 0 0 0 0 1 
1 1 1 1 1 1 1 
-------------
1 1 1 1 1 1 1 
1 2 0 0 0 0 1 
1 2 2 2 0 0 1 
1 1 1 2 0 0 1 
1 0 0 2 0 0 1 
1 0 0 2 0 0 1 
1 0 0 2 2 2 1 
1 1 1 1 1 1 1 
```

#### 3.2 八皇后问题

问题描述: 任意两个皇后不能处于同一行、同一列或同意斜线,问有多少中解法

说明:理论上应该创建一个二维数组来表示棋盘，但是实际上可以通过算法，用一个一维数组即可解决问题.arr[8]=047,5,2,61,3)//对应arr下标表示第几行，即第几个皇后，arr[i]=val,val表示第i+1个皇后，放在第i+1行的第val+1 列

游戏在线地址:https://www.novelgames.com/zh/queens/

代码实现:

```java
package com.ssm.recursion;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/9/30 20:43
 */
public class Queue8 {
    //定义最大皇后数
    int max = 8;
    //定义数组arr,保存皇后放置位置的结果 arr={0,4,7,5,2,6,1,3}
    int [] array = new int [max];
    static int count =0;
    static int judgeCount = 0;
    public static void main(String[] args) {
        Queue8 queue8 = new Queue8();
        queue8.check(0);
        System.out.printf("一共有%d中解法\n",count);
        System.out.printf("一共判断了%d次冲突",judgeCount);

    }
    //放置第n个皇后
    //特别注意 : check 是 每一次递归时,进入到check中都有for (int i = 0; i <max ; i++),因此会有回溯
    private void  check(int n){
        if (n == max) { // n = 8 8个皇后已经放好
            print();
            return;
        }
        //依次放入皇后 并判断是否冲突
        for (int i = 0; i <max ; i++) {
            //先把当前这个皇后n,放到改行的第一列
            array[n] = i;
            //判断当前第n个皇后到i列时,是否冲突
            if (judge(n)){ //不冲突
                check(n+1);
            }
            //如果冲突 继续执行 array[n] = i;即将第n个皇后,放置在本行的后移一个位置
        }
    }

    //查看当我们放置第n个皇后,就去检测该皇后是否和前面已经摆放的皇后冲突
    public boolean judge(int n){
        judgeCount++;
        for (int i = 0; i < n; i++) {
            // 1.array[i] == array[n]  判断第n个皇后是否和前面的n-1个皇后是否在同一列
            // 2.Math.abs(n-i) == Math.abs(array[n] - array[i]  判断第n个皇后是否和前面的n-1个皇后是否在同一斜线
            // 3. 判断是否在同一行 没必要 每次都递增
            if (array[i] == array[n] || Math.abs(n-i) == Math.abs(array[n] - array[i])) {
                return false;
            }
        }
        return true;
    }
    //将皇后摆放位置输出
    private void print(){
        count++;
        for (int i = 0; i <array.length ; i++) {
            System.out.print(array[i]+" ");
        }
        System.out.println();
    }
}
```

运行部分结果:

```java
6 1 5 2 0 3 7 4 
6 2 0 5 7 4 1 3 
6 2 7 1 4 0 5 3 
一共有92中解法
一共判断了15720次冲突
```





