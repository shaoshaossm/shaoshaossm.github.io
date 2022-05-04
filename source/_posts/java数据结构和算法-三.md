---
title: java数据结构和算法(三)
top: false
cover: false
toc: true
mathjax: true
date: 2021-10-01 09:17:52
password: 
summary: 冒泡、选择、插入、希尔、快速、归并、基数排序算法
tags: java
categories: 数据结构和算法
---

###  <center>排序算法

- 排序也称排序算法(Sort Algorithm)，排序是将一组数据，依指定的顺序进行排列的过程。

- 排序的分类：
  - 内部排序:指将需要处理的所有数据都加载到内部存储器中进行排序。
  - 外部排序法：数据量过大，无法全部加载到内存中，需要借助外部存储进行排序。

![常见排序分类](https://img-blog.csdnimg.cn/4fb4f5bc04d740bcb85bb978b600a3a7.png)

### 1.算法的时间复杂度

#### 1.1 度量一个程序(算法)执行时间的两种方法:

  - 事后统计的方法 这种方法可行, 但是有两个问题：一是要想对设计的算法的运行性能进行评测，需要实际运行该程序；二是所得时间的统计量依赖于计算机的硬件、软件等环境因素, **这种方式，要在同一台计算机的相同状态下运行，才能比较那个算法**速度更快。
  - 事前估算的方法通过分析某个算法的**时间复杂度**来判断哪个算法更优.

#### 1.2 时间频度

时间频度**：一个算法花费的时间与算法中语句的执行次数成正比例，哪个算法中语句执行次数多，它花费时间就多。**一个算法中的语句执行次数称为语句频度或时间频度**。记为T(n)。

#### 1.3 时间复杂度

- 一般情况下，算法中的基本操作语句的重复执行次数是问题规模n的某个函数，用T(n)表示，若有某个辅助函数f(n)使得当n趋近于无穷大时，T(n) / f(n) 的极限值为不等于零的常数，则称f(n)是T(n)的同数量级函数。记作 T(n)=Ｏ( f(n))，称Ｏ( f(n) ) 为算法的渐进时间复杂度，简称时间复杂度。

- T(n) 不同，但时间复杂度可能相同。 如：T(n)=n²+7n+6 与 T(n)=3n²+2n+2 它们的T(n) 不同，但时间复杂度相同，都为O(n²)。

- 计算时间复杂度的方法：
  - 用常数1代替运行时间中的所有加法常数 T(n)=n²+7n+6  => T(n)=n²+7n+1
  - 修改后的运行次数函数中，只保留最高阶项 T(n)=n²+7n+1 => T(n) = n²
  - 去除最高阶项的系数 T(n) = n² => T(n) = n² => O(n²)
  - 简单来说是忽略常数项,系数项和低次数项,只考虑最高次项

#### 1.4 常见的时间复杂度

- 常数阶O(1)

![常熟阶](https://img-blog.csdnimg.cn/66dad9c2234243e89fa2a72e26ad1f3b.png)

- 对数阶O(log2n)

  ![对数阶](https://img-blog.csdnimg.cn/0c9067a732f148159a943eca3df22578.png)

- 线性阶O(n)

![线性阶](https://img-blog.csdnimg.cn/6bdf246c7b714db980d58860e21ce45b.png)

- 线性对数阶O(nlog2n)

![线性对数阶](https://img-blog.csdnimg.cn/eb1d292b3acc4d849fbf211a2b0daa91.png)

- 平方阶O(n^2)

![平方阶](https://img-blog.csdnimg.cn/78bf930c1a3943b6a852fa74cbeadc26.png)

- 立方阶O(n^3)

- k次方阶O(n^k)

- 指数阶O(2^n)

![常见的时间复杂度](https://img-blog.csdnimg.cn/9f38a76e16594a7698239cc57de2ede9.png)

- 常见的算法时间复杂度由小到大依次为：Ο(1)＜Ο(log2n)＜Ο(n)＜Ο(nlog2n)＜Ο(n2)＜Ο(n3)＜ Ο(nk) ＜Ο(2n) ，随着问题规模n的不断增大，上述时间复杂度不断增大，算法的执行效率越低 

- 从图中可见，我们应该尽可能避免使用指数阶的算法

#### 1.5 平均时间复杂度和最坏时间复杂度

- 平均时间复杂度是指所有可能的输入实例均以等概率出现的情况下，该算法的运行时间。

- 最坏情况下的时间复杂度称最坏时间复杂度。一般讨论的时间复杂度均是最坏情况下的时间复杂度。 这样做的原因是：最坏情况下的时间复杂度是算法在任何输入实例上运行时间的界限，这就保证了算法的运行时间不会比最坏情况更长。 
- 平均时间复杂度和最坏时间复杂度是否一致，和算法有关(如图:)。

![平均时间复杂度和最坏时间复杂度](https://img-blog.csdnimg.cn/bd2c667a76244282866b63b6b64bc46e.png)

### 2 算法的空间复杂度

- 类似于时间复杂度的讨论，一个算法的空间复杂度(Space Complexity)定义为该算法所耗费的存储空间，它也是问题规模n的函数。

- 空间复杂度(Space Complexity)是对一个算法在运行过程中临时占用存储空间大小的量度。有的算法需要占用的临时工作单元数与解决问题的规模n有关，它随着n的增大而增大，当n较大时，将占用较多的存储单元，例如快速排序和归并排序算法就属于这种情况

-  在做算法分析时，**主要讨论的是时间复杂度**。从用户使用体验上看，更看重的程序执行的速度。一些缓存产品(redis, memcache)和算法(基数排序)本质就是用空间换时间.

### 3 八种排序

#### 3.1 冒泡排序

- 冒泡排序（Bubble Sorting）的基本思想是：通过对待 排序序列从前向后（从下标较小的元素开始）,依次比较 相邻元素的值，若发现逆序则交换，使值较大 的元素逐渐从前移向后部，就象水底下的气泡一样逐渐 向上冒。
-  因为排序的过程中，各元素不断接近自己的位置，如果一趟比较下 来没有进行过交换，就说明序列有序，因此要在排序过程中设置 一个标志flag判断元素是否进行过交换。从而减少不必要的比较。
- 规则小总: 
  - 一共进行数组的大小-1次循环
  - 每次排序的次数在逐渐地减少

代码实现并优化:

```java
package com.ssm.sort;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/1 18:12
 */
public class BubbleSort {
    public static void main(String[] args) {
        //int[] arr = {3, 9, -1, 11, -5,};
        //System.out.println("排序前" + Arrays.toString(arr));
        //测试冒泡排序的速度 O(n^2) ,给80000个数据测试
        int[] arr = new int[80000];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) (Math.random() * 8000000);
        }
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序前的时间是:"+simpleDateFormat.format(date));

        bubbleSort(arr);
        //System.out.println("排序后" + Arrays.toString(arr));
        Date date2 = new Date();
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序后的时间是:"+simpleDateFormat2.format(date2));
       /*
        //第二趟排序,就是将倒数第二大的排到倒数第二位
        for (int i = 0; i < arr.length - 1 - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
        System.out.println("第二趟排序后的数组" + Arrays.toString(arr));

        //第三趟排序,就是将倒数第三大的排到倒数第三位
        for (int i = 0; i < arr.length - 1 - 2; i++) {
            if (arr[i] > arr[i + 1]) {
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
        System.out.println("第三趟排序后的数组" + Arrays.toString(arr));

        //第四趟排序,就是将倒数第四大的排到倒数第四位
        for (int i = 0; i < arr.length - 1 - 3; i++) {
            if (arr[i] > arr[i + 1]) {
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
        System.out.println("第四趟排序后的数组" + Arrays.toString(arr));
        */
    }
	//冒泡排序方法
    public static void bubbleSort(int[] arr) {
        //冒泡排序时间复杂度: O(n^2)
        int temp = 0;
        boolean flag = false; //标识符 表示是否发生过交换
        for (int j = 0; j < arr.length - 1; j++) {
            for (int i = 0; i < arr.length - 1 - j; i++) {
                if (arr[i] > arr[i + 1]) {
                    flag = true;
                    temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                }
            }
            if (!flag) { // 在一次排序中没有发生过交换
                break;
            } else {
                flag = false; // 重置flag!!!,进行下次判断
            }
        }
    }
}

```

运行结果:

```java
第一趟排序后的数组[3, -1, 9, -5, 11]
第二趟排序后的数组[3, -1, -5, 9, 11]
第三趟排序后的数组[-1, -5, 3, 9, 11]
第四趟排序后的数组[-5, -1, 3, 9, 11]
    
排序前[3, 9, -1, 11, -5]
排序后[-5, -1, 3, 9, 11]

排序前的时间是:2021-10-01 18:48:46
排序后的时间是:2021-10-01 18:48:55
```

#### 3.2 选择排序

- 选择式排序也属于内部排序法，是从欲排序的数据中，按指定的规则选出某一元素，再依规定交换位置后达到排序的目的。

它的<font color="red">基本思想</font>是：第一次从arr[0]-arr[n-1]中选取最小值，与arr[0]交换，第二次从arr[1]-arr[n-1]中选取最小值，与arr[1]交换，第三次从arr[2]-arr[n-1]中选取最小值，与arr[2]交换，…，第i次从arr[i-1]-arr[n-1]中选取最小值，与arr[i-1]交换，…, 第n-1次从arr[n-2]-arr[n-1]中选取最小值，与arr[n-2]交换，总共通过n-1次，得到一个按排序码从小到大排列的有序序列。

![选择排序思路分析图](https://img-blog.csdnimg.cn/6ca83b7cf2cb423a837ed32996ca9625.png)

逐步推导代码演示:

```java
package com.ssm.sort;
import java.util.Arrays;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/1 22:18
 */
public class SelectSort {
    public static void main(String[] args) {
        int [] arr = {101,34,119,1};
        System.out.println("排序前:"+ Arrays.toString(arr));
        selectSort(arr);
    }

    public static void selectSort(int[] arr) {
        //第一轮
        int minIndex  = 0;
        int min = arr[0];
        for (int j = 0 + 1; j <arr.length ; j++) {
            if (min > arr[j]){ //说明假定的最小值不是最小值
                min = arr[j]; //重置min
                minIndex = j; // 重置minindex
            }
        }
        //将最小值,放在arr[0],即交换
        arr[minIndex] = arr[0];
        arr[0] = min;
        System.out.println("第一轮后:"+ Arrays.toString(arr));

        //第二轮
        minIndex  = 1;
        min = arr[1];
        for (int j = 1+1; j <arr.length ; j++) {
            if (min > arr[j]){ //说明假定的最小值不是最小值
                min = arr[j]; //重置min
                minIndex = j; // 重置minindex
            }
        }
        //将最小值,放在arr[0],即交换
        if (minIndex != 1){
            arr[minIndex] = arr[1];
            arr[1] = min;

        }
        System.out.println("第二轮后:"+ Arrays.toString(arr));
        //第三轮
        minIndex  = 2;
        min = arr[2];
        for (int j = 1+1; j <arr.length ; j++) {
            if (min > arr[j]){ //说明假定的最小值不是最小值
                min = arr[j]; //重置min
                minIndex = j; // 重置minindex
            }
        }
        //将最小值,放在arr[0],即交换
        if (minIndex != 2){
            arr[minIndex] = arr[2];
            arr[2] = min;

        }
        System.out.println("第三轮后:"+ Arrays.toString(arr));
    }

}

```

运行结果:

```java
排序前:[101, 34, 119, 1]
第一轮后:[1, 34, 119, 101]
第二轮后:[1, 34, 119, 101]
第三轮后:[1, 34, 101, 119]
```

完整版代码演示:

```java
package com.ssm.sort;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/1 22:18
 */
public class SelectSort {
    public static void main(String[] args) {
        //int [] arr = {101,34,119,1};

        int[] arr = new int[80000];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) (Math.random() * 8000000);
        }
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序前的时间是:"+simpleDateFormat.format(date));

        selectSort(arr);
        //System.out.println("排序后" + Arrays.toString(arr));
        Date date2 = new Date();
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序后的时间是:"+simpleDateFormat2.format(date2));

        //System.out.println("排序前:"+ Arrays.toString(arr));
        //selectSort(arr);
        //System.out.println("排序后:"+ Arrays.toString(arr));
        
    }
    //选择排序时间复杂度O(n^2)
    public static void selectSort(int[] arr) {
        for (int i = 0; i <arr.length ; i++) {
            int minIndex = i;
            int min = arr[i];
            for (int j = i + 1; j < arr.length; j++) {
                if (min > arr[j]) { //说明假定的最小值不是最小值
                    min = arr[j]; //重置min
                    minIndex = j; // 重置minindex
                }
            }
            //将最小值,放在arr[0],即交换
            arr[minIndex] = arr[i];
            arr[i] = min;
           // System.out.println("第"+(i+1)+"轮后:" + Arrays.toString(arr));

        }

    }

}

```

运行结果:

```java
排序前:[101, 34, 119, 1]
第1轮后:[1, 34, 119, 101]
第2轮后:[1, 34, 119, 101]
第3轮后:[1, 34, 101, 119]
第4轮后:[1, 34, 101, 119]
排序后:[1, 34, 101, 119]

排序前的时间是:2021-10-01 23:07:18
排序后的时间是:2021-10-01 23:07:21
```

####  3.3插入排序

- 插入式排序属于内部排序法，是对于欲排序的元素以插入的方式找寻该元素的适当位置，以达到排序的目的。

- 插入排序（Insertion Sorting）的**基本思想**是：把n个待排序的元素看成为一个有序表和一个无序表，开始时有序表中只包含一个元素，无序表中包含有n-1个元素，排序过程中每次从无序表中取出第一个元素，把它的排序码依次与有序表元素的排序码进行比较，将它插入到有序表中的适当位置，使之成为新的有序表。

![插入排序思路分析图](https://img-blog.csdnimg.cn/762406816a064092ae2ed340cfc76c17.png)

逐步代码演示:

```java
package com.ssm.sort;
import java.util.Arrays;
/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/2 13:01
 */
public class InsertSort {
    public static void main(String[] args) {
        int[] arr = {101, 34, 119, 2};
        insertSort(arr);
    }

    public static void insertSort(int[] arr) {
        // 第一轮{101,34,119,2}; => {34,101,119,2};
        // 定义待插入的数
        int insertVal = arr[1];
        int insertIndex = 1 - 1;//即arr[1]前面这个数的下标

        //给insert找到插入的位置
        // 1.insertIndex >= 0 保证在给insertVal 找到插入位置,不越界
        // 2.insertVal < arr[insertIndex] 待插入的数,还没有找到插入位置
        while (insertIndex >= 0 && insertVal < arr[insertIndex]) {
            arr[insertIndex + 1] = arr[insertIndex];
            insertIndex--;
        }
        //当退出while循环时,说明插入位置找到,insertIndex + 1
        arr[insertIndex + 1] = insertVal;
        System.out.println("第1轮插入" + Arrays.toString(arr));

        // 第2轮{34,101,119,2}; => {34,101,119,2};
        insertVal = arr[2];
        insertIndex = 2 - 1;

        while (insertIndex >= 0 && insertVal < arr[insertIndex]) {
            arr[insertIndex + 1] = arr[insertIndex];
            insertIndex--;
        }

        arr[insertIndex + 1] = insertVal;
        System.out.println("第3轮插入" + Arrays.toString(arr));

        // 第3轮{34,101,119,2}; => {2, 34, 101, 119};
        insertVal = arr[3];
        insertIndex = 3 - 1;

        while (insertIndex >= 0 && insertVal < arr[insertIndex]) {
            arr[insertIndex + 1] = arr[insertIndex];
            insertIndex--;
        }

        arr[insertIndex + 1] = insertVal;
        System.out.println("第2轮插入" + Arrays.toString(arr));
    }

}
```

运行结果:

```java
第1轮插入[34, 101, 119, 2]
第3轮插入[34, 101, 119, 2]
第2轮插入[2, 34, 101, 119]
```

完整版代码演示:

```java
package com.ssm.sort;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/2 13:01
 */
public class InsertSort {
    public static void main(String[] args) {
        //int[] arr = {101, 34, 119, 2};
        int[] arr = new int[80000];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) (Math.random() * 8000000);
        }
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序前的时间是:" + simpleDateFormat.format(date));

        insertSort(arr);
        Date date2 = new Date();
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序后的时间是:" + simpleDateFormat2.format(date2));


    }

    public static void insertSort(int[] arr) {
        int insertVal = 0;
        int insertIndex = 0;//即arr[1]前面这个数的下标
        // 第一轮{101,34,119,2}; => {34,101,119,2};
        // 定义待插入的数
        for (int i = 1; i < arr.length; i++) {


            insertVal = arr[i];
            insertIndex = i - 1;//即arr[1]前面这个数的下标

            //给insert找到插入的位置
            // 1.insertIndex >= 0 保证在给insertVal 找到插入位置,不越界
            // 2.insertVal < arr[insertIndex] 待插入的数,还没有找到插入位置
            while (insertIndex >= 0 && insertVal < arr[insertIndex]) {
                arr[insertIndex + 1] = arr[insertIndex];
                insertIndex--;
            }
            //当退出while循环时,说明插入位置找到,insertIndex + 1
            if (insertIndex + 1 != i) {
                arr[insertIndex + 1] = insertVal;
            }

            // System.out.println("第"+i+"轮插入" + Arrays.toString(arr));
        }
    }

}

```

运行结果:

```java
排序前的时间是:2021-10-02 13:53:13
排序后的时间是:2021-10-02 13:53:14
```

#### 3.4 希尔排序

- **希尔排序**是希尔（Donald Shell）于1959年提出的一种排序算法。希尔排序也是一种**插入排序**，它是简单插入排序经过改进之后的一个**更高效的版本**，也称为缩小增量排序。

- **基本思想**:  希尔排序是把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止。

![希尔排序分析示意图](https://img-blog.csdnimg.cn/336e6bec857e44a4855fe3b4b993217f.png)

##### 3.4.1 交换法

代码实现:

```java
package com.ssm.sort;

import java.util.Arrays;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/2 14:27
 */
public class ShellSort {
    public static void main(String[] args) {
        int [] arr = {8,9,1,7,2,3,5,4,6,0};
shellSort(arr);
    }
    //希尔排序
    public static void shellSort(int [] arr){
        int temp = 0;
        //第一轮 10个数据分成了5组
        for (int i = 5; i < arr.length ; i++) {
            //遍历各组中的所有元素(共5组,每组中有2个元素), 步长5
            for (int j = i-5; j >=0 ; j-=5) {
                //如果当前元素大于加上步长后的那个元素,说明交换
                if (arr[j] > arr[j+5]){
                    temp = arr[j];
                    arr[j] = arr[j+5];
                    arr[j+5] = temp;
                }
            }
        }
        System.out.println("希尔排序后1轮后: "+ Arrays.toString(arr));

        //第二轮 
        for (int i = 2; i < arr.length ; i++) {
            //遍历各组中的所有元素(共5组,每组中有2个元素), 步长5
            for (int j = i-2; j >=0 ; j-=2) {
                //如果当前元素大于加上步长后的那个元素,说明交换
                if (arr[j] > arr[j+2]){
                    temp = arr[j];
                    arr[j] = arr[j+2];
                    arr[j+2] = temp;
                }
            }
        }
        System.out.println("希尔排序后2轮后: "+ Arrays.toString(arr));

        //第3轮
        for (int i = 1; i < arr.length ; i++) {
            //遍历各组中的所有元素(共5组,每组中有2个元素), 步长5
            for (int j = i-1; j >=0 ; j-=1) {
                //如果当前元素大于加上步长后的那个元素,说明交换
                if (arr[j] > arr[j+1]){
                    temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
        System.out.println("希尔排序后3轮后: "+ Arrays.toString(arr));
    }
}

```

运行结果:

```java
希尔排序后1轮后: [3, 5, 1, 6, 0, 8, 9, 4, 7, 2]
希尔排序后2轮后: [0, 2, 1, 4, 3, 5, 7, 6, 9, 8]
希尔排序后3轮后: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

完整版代码实现:

```java
package com.ssm.sort;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/2 14:27
 */
public class ShellSort {
    public static void main(String[] args) {
      //  int [] arr = {8,9,1,7,2,3,5,4,6,0};
        int[] arr = new int[80000];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) (Math.random() * 8000000);
        }
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序前的时间是:" + simpleDateFormat.format(date));

        shellSort(arr);
        Date date2 = new Date();
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序后的时间是:" + simpleDateFormat2.format(date2));

    }
    //希尔排序
    public static void shellSort(int [] arr) {

        int temp = 0;
        int count = 0;
        for (int gap = arr.length/2; gap >0 ; gap/=2 ) {


        //第一轮 10个数据分成了5组
        for (int i = gap; i < arr.length; i++) {
            //遍历各组中的所有元素(共gap组,每组中有2个元素), 步长gap
            for (int j = i - gap; j >= 0; j -= gap) { //j-=5 为了跳出循环
                //如果当前元素大于加上步长后的那个元素,说明交换
                if (arr[j] > arr[j + gap]) {
                    temp = arr[j];
                    arr[j] = arr[j + gap];
                    arr[j + gap] = temp;
                }
            }
        }
            //System.out.println("希尔排序第"+(++count)+"轮后: " + Arrays.toString(arr));
        }


    }
}
```

运行结果:

```java
排序前的时间是:2021-10-02 14:56:46
排序后的时间是:2021-10-02 14:56:51
```

##### 3.4.2 移位法

代码实现:

```java
package com.ssm.sort;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/2 14:27
 */
public class ShellSort {
    public static void main(String[] args) {
      //  int [] arr = {8,9,1,7,2,3,5,4,6,0};
        int[] arr = new int[80000];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) (Math.random() * 8000000);
        }
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序前的时间是:" + simpleDateFormat.format(date));

        shellSort2(arr);
        Date date2 = new Date();
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序后的时间是:" + simpleDateFormat2.format(date2));

    }
   //希尔排序 ->移位法
    public static void shellSort2(int[] arr) {

        //增量gap 逐步缩小增量
        for (int gap = arr.length / 2; gap > 0; gap /= 2) {
            //从第gap个元素,逐个对其所在的组进行直接插入排序
            for (int i = gap; i < arr.length; i++) {
                int j = i;
                int temp = arr[j];
                if (arr[j]<arr[j-gap]){
                    while (j-gap>=0 && temp<arr[j-gap]){
                        //移动
                        arr[j] = arr[j-gap];
                        j-=gap;
                    }
                    //当退出while后,就给temp找到插入的数据
                    arr[j] = temp;
                }
            }
            //System.out.println("希尔排序后: " + Arrays.toString(arr));
        }
        
    }
}
```

运行结果:

```java
排序前的时间是:2021-10-02 15:14:42
排序后的时间是:2021-10-02 15:14:42
```

#### 3.5 快速排序

**快速排序（Quicksort）**是对冒泡排序的一种改进。基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列

![快速排序法示意图](https://img-blog.csdnimg.cn/a03f7bfd62b84b849a13906f0aaaf5b8.png)

代码演示:

```java
package com.ssm.sort;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/2 20:22
 */
public class QucikSort {
    public static void main(String[] args) {
        //int[] arr = {-9, 78, 0, 23, -56, 70,45,12,48,13};
        int[] arr = new int[8000000];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) (Math.random() * 8000000);
        }
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序前的时间是:"+simpleDateFormat.format(date));

        qucikSort(arr, 0, arr.length - 1);
        //System.out.println("排序后" + Arrays.toString(arr));
        Date date2 = new Date();
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序后的时间是:"+simpleDateFormat2.format(date2));


        //System.out.println("arr=" + Arrays.toString(arr));
    }

    public static void qucikSort(int[] arr, int left, int right) {
        int l = left;
        int r = right;
        int pivot = arr[(left + right) / 2];//中轴值
        int temp = 0; //临时变量作为交换使用
        //while 循环的目的是让比pivot值 小的放左边, 大的放右边
        while (l < r) {
            //在pivot的左边一直找,找到大于等于pivot的值,才退出
            while (arr[l] < pivot) {
                l += 1;
            }
            //在pivot的右边一直找,找到小于等于pivot的值,才退出
            while (arr[r] > pivot) {
                r -= 1;
            }
            // 如果 l>=r 说明pivot的左右两边的值已经按照左边全是小于等于pivot,右边全是大于等于pivot的值
            if (l >= r) {
                break;
            }

            //交换
            temp = arr[l];
            arr[l] = arr[r];
            arr[r] = temp;

            //如果交换完后发现arr[l] == pivot 值相等r--,前移
            if (arr[l] == pivot) {
                r -= 1;
            }
            //如果交换完后发现arr[r] == pivot 值相等l++,后移
            if (arr[r] == pivot) {
                l += 1;
            }
        }
        //必须l++,r--,否则栈溢出
        if (l == r) {
            l += 1;
            r -= 1;
        }
        //向左递归
        if (left<r){ // 这里的r已发生变化 r -= 1;
            qucikSort(arr,left,r);
        }
        //向右递归
        if (right>l){ //这里的l已发生变化  l += 1;
            qucikSort(arr,l,right);
        }
    }
}
```

运行结果:

```java
arr=[-56, -9, 0, 12, 13, 23, 45, 48, 70, 78]

排序前的时间是:2021-10-02 20:59:58
排序后的时间是:2021-10-02 20:59:59
```

#### 3.6 归并排序

归并排序（MERGE-SORT）是利用<font color="red">归并</font>的思想实现的排序方法，该算法采用经典的<font color="red">分治</font>（divide-and-conquer）策略（分治法将问题<font color="red">分(divide)</font>成一些小的问题然后递归求解，而<font color="red">治(conquer)</font>的阶段则将分的阶段得到的各答案"修补"在一起，即分而治之)。

![归并排序示意图](https://img-blog.csdnimg.cn/eb432bba43ba42d7852fee5153bda282.png)

- 可以看到这种结构很像一棵完全二叉树，本文的归并排序我们采用递归去实现（也可采用迭代的方式去实现）。**分**阶段可以理解为就是递归拆分子序列的过程。

- 再来看看**治**阶段，我们需要将两个已经有序的子序列合并成一个有序序列，比如上图中的最后一次合并，要将[4,5,7,8]和[1,2,3,6]两个已经有序的子序列，合并为最终序列[1,2,3,4,5,6,7,8]，来看下实现步骤:

![合1](https://img-blog.csdnimg.cn/58301be90b7a44c5972a4002a309f782.png)

![合2](https://img-blog.csdnimg.cn/52668f99e617454e9ad5ab1f79492e55.png)

代码演示:

```java
package com.ssm.sort;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/2 21:24
 */
public class MergeSort {
    public static void main(String[] args) {
        //int[] arr = {8, 4, 5, 1, 7, 3, 6, 2};
        int[] arr = new int[8000000];
        int [] temp = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) (Math.random() * 800000000);
        }
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序前的时间是:"+simpleDateFormat.format(date));

        mergeSort(arr,0,arr.length-1,temp);
        Date date2 = new Date();
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序后的时间是:"+simpleDateFormat2.format(date2));

       // int [] temp = new int[arr.length];
        //mergeSort(arr,0,arr.length-1,temp);
        //System.out.println("归并排序后:"+ Arrays.toString(arr));
    }
    //分+合的方法
    public static void mergeSort(int[] arr, int left, int right, int[] temp){
        if (left<right){
            int mid = (left+right)/2;
            //向左递归进行分解
            mergeSort(arr,left,mid,temp);
            //向右递归进行分解
            mergeSort(arr,mid+1,right,temp);
            //合并
            merge(arr,left,mid,right,temp);
        }
    }

    //合并的方法

    /**
     * @param arr   排序的原始数组
     * @param left  左边有序数列的初始索引
     * @param mid   中间索引
     * @param right 右边索引
     * @param temp  做中转的数组
     */
    public static void merge(int[] arr, int left, int mid, int right, int[] temp) {
        int i = left; //初始化i,左边有序数列的初始索引
        int j = mid + 1; //初始化j,右边有序数列的初始索引
        int t = 0;//指向temp数组的当前索引
        //(一)
        //先把左右两边(有序)的数据按照规则填充到temp数组,直到左右两边的有序数列,有一边处理完毕
        while (i <= mid && j <= right) {
            //如果左边的有序数列小于等于右边的有序数列,即将有序序列的左边有序序列的当前元素,拷贝到temp数组,然后t++,i++
            if (arr[i] < arr[j]) {
                temp[t] = arr[i];
                t += 1;
                i += 1;
            } else { //反之,将右边有序序列的当前元素,拷贝到temp数组
                temp[t] = arr[j];
                t += 1;
                j += 1;
            }
        }
        //(二) 把有剩余数据的一边的数据依次填充到temp
        while (i <= mid) { //左边的有序序列还有剩余的元素,就全部填充到temp
            temp[t] = arr[i];
            t += 1;
            i += 1;
        }
        while (j <= right) { //右边的有序序列还有剩余的元素,就全部填充到temp
            temp[t] = arr[j];
            t += 1;
            j += 1;
        }

        //(三)将temp数组元素拷贝到arr  注意,并不是每次都拷贝所有
        t = 0;
        int tempLeft = left;
        //System.out.println("tempLeft="+tempLeft+"right="+right);
        while (tempLeft <= right) {
            arr[tempLeft] = temp[t];
            t += 1;
            tempLeft += 1;
        }
    }
}
```

运行结果:

```java
tempLeft=0right=1
tempLeft=2right=3
tempLeft=0right=3
tempLeft=4right=5
tempLeft=6right=7
tempLeft=4right=7
tempLeft=0right=7
归并排序后:[1, 2, 3, 4, 5, 6, 7, 8]

排序前的时间是:2021-10-02 22:44:58
排序后的时间是:2021-10-02 22:44:58
```

#### 3.7 基数(桶)排序

- [基](https://baike.baidu.com/item/基数排序/7875498)[数排序](https://baike.baidu.com/item/基数排序/7875498)（radix sort）属于“分配式排序”（distribution sort），又称“桶子法”（bucket sort）或bin sort，顾名思义，它是通过键值的各个位的值，将要排序的[元素分配](https://baike.baidu.com/item/元素分配/2107419)至某些“桶”中，达到排序的作用

- 基数排序法是属于稳定性的排序，基数排序法的是效率高的稳定性排序法

- 基数排序(Radix Sort)是**[桶排序](http://www.cnblogs.com/skywang12345/p/3602737.html)**的扩展

- 基数排序是1887年赫尔曼·何乐礼发明的。它是这样实现的：将整数按位数切割成不同的数字，然后按每个位数分别比较。

- 基本思想: 将所有待比较数值统一为同样的数位长度，数位较短的数前面补零。然后，从最低位开始，依次进行一次排序。这样从最低位排序一直到最高位排序完成以后, 数列就变成一个有序序列。

![基数排序实现示意图](https://img-blog.csdnimg.cn/3d2ccb651a994485a2a41e25712ed3d9.png)

代码实现:

```java
package com.ssm.sort;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/3 15:34
 */
public class RadixSort {
    public static void main(String[] args) {
        //int[] arr = {53,3,542,748,14,214};


        int[] arr = new int[800000];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) (Math.random() * 800000);
        }
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序前的时间是:"+simpleDateFormat.format(date));

        radixSort(arr);
        Date date2 = new Date();
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("排序后的时间是:"+simpleDateFormat2.format(date2));

    }

    public static void radixSort(int[] arr) {
        //得到数组中最大数的位数
        int max = arr[0];//假设第一个数就是最大的
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i]; //得到最大数
            }
        }
        //得到最大数是几位数
        int maxLength = (max + "").length();
        //定义一个二维数组,表示10个桶子,每个桶就是一个一维数组
        //共10个一维数组,为防止栈溢出,则每个一维数组大小定义为arr.length
        int[][] bucket = new int[10][arr.length];
        //定义一个一维数组用来记录每个桶中实际存放了多少个数据
        int[] bucketElementsCounts = new int[10];
        //使用循环处理
        for (int i = 0, n = 1; i < maxLength; i++, n *= 10) {
            //针对每个元素的对应的位数进行排序处理 个位,十位,百位
            for (int j = 0; j < arr.length; j++) {
                //取出每个元素对应位的值
                int digitOfElement = arr[j] / n % 10;
                //放入到对应的桶中
                bucket[digitOfElement][bucketElementsCounts[digitOfElement]] = arr[j];
                bucketElementsCounts[digitOfElement]++;
            }
            //按照桶的顺序(一维数组的下标依次取出数据,放入原来的数组)
            int index = 0;
            for (int k = 0; k <bucketElementsCounts.length ; k++) {
                //如果桶中有数据,则放入
                if (bucketElementsCounts[k]!=0){
                    //循环该桶即第k个桶(第k个一维数组)
                    for (int l = 0; l <bucketElementsCounts[k] ; l++) {
                        //取出元素放入arr
                        arr[index++] = bucket[k][l];
                    }
                }
                //第i+1轮处理完后需将每个bucketElementsCounts[k] = 0 !!!
                bucketElementsCounts[k] = 0;
            }
            //System.out.println("第"+(i+1)+"轮后 arr="+ Arrays.toString(arr));
        }

    }
}
```

运行结果:

```java
第1轮后 arr=[542, 53, 3, 14, 214, 748]
第2轮后 arr=[3, 14, 214, 542, 748, 53]
第3轮后 arr=[3, 14, 53, 214, 542, 748]

排序前的时间是:2021-10-03 16:00:10
排序后的时间是:2021-10-03 16:00:10
```

**基数排序**的说明:

- 基数排序是对传统桶排序的扩展，速度很快.

- 基数排序是经典的空间换时间的方式，占用内存很大, 当对海量数据排序时，容易造成 OutOfMemoryError 。

- 基数排序时稳定的。[注:假定在待排序的记录序列中，存在多个具有相同的关键字的记录，若经过排序，这些记录的相对次序保持不变，即在原序列中，r[i]=r[j]，且r[i]在r[j]之前，而在排序后的序列中，r[i]仍在r[j]之前，**则称这种排序算法是稳定的；否则称为不稳定的**]

4)有负数的数组，我们不用基数排序来进行排序, 如果要支持负数，参考[https://](https://code.i-harness.com/zh-CN/q/e98fa9)[code.i-harness.com/zh-CN/q/e98fa9](https://code.i-harness.com/zh-CN/q/e98fa9)

#### 3.8 堆排序

- 堆排序的基本思想是：
  - 将待排序序列构造成一个大顶堆
  - 此将其与末尾元素进行交换，此时末尾就为最大值。
  - 然后将剩余n-1个元素重新构造成一个堆，这样会得到n个元素的次小值。如此反复执行，便能得到一个有序序列了。
  - 这时，整个序列的最大值就是堆顶的根节点。

![大顶堆和小顶堆示意图](https://img-blog.csdnimg.cn/13db5cc6cad54aabbb5925f6a98de0cc.png)

一般**升序采用大顶堆**，**降序采用小顶堆** 

代码实现

```java
package com.ssm.sort;

import java.util.Arrays;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/9 16:55
 */
public class HeapSort {
    public static void main(String[] args) {
        //要求将数组进行升序排序
        int[] arr = {4, 6, 8, 5, 9};
        heapSort(arr);
    }
   

    //编写一个堆排序的方法
    public static void heapSort(int[] arr) {

        int temp = 0;
        //最终代码
        for (int i = arr.length / 2 - 1; i >= 0; i--) {
            adjustHeap(arr, i, arr.length);
        }
        /**
         * 将其与末尾元素进行交换，此时末尾就为最大值。
         * 然后将剩余n-1个元素重新构造成一个堆，这样会得到n个元素的次小值。如此反复执行，便能得到一个有序序列了。
         */
        for (int j = arr.length - 1; j > 0; j--) {
            temp = arr[j];
            arr[j] = arr[0];
            arr[0] = temp;
            adjustHeap(arr, 0, j);
        }

        System.out.println("数组: " + Arrays.toString(arr)); //9, 6, 8, 5, 4

    }

    //将一个数组(二叉树),调整成一个大顶堆

    /**
     * 完成将以i 对应的非叶子结点的树调整成大顶堆
     *
     * @param arr    待调整数组
     * @param i      非叶子结点在数组中索引
     * @param length 表示多少个元素要继续调整 length在逐渐减少
     */
    public static void adjustHeap(int[] arr, int i, int length) {

        int temp = arr[i]; //先去除当前元素的值,保存在临时变量
        for (int k = i * 2 + 1; k < length; k = k * 2 + 1) {
            if (k + 1 < length && arr[k] < arr[k + 1]) { //说明左子结点的值小于右子结点的值
                k++; //k 指向右子结点
            }
            if (arr[k] > temp) { //子节点大于父结点
                arr[i] = arr[k]; //把较大的值赋值给当前结点
                i = k;  //!!! i指向k,继续循环比较
            } else {
                break;
            }
        }
        //当for循环结束时,我们已经将以i为父结点的树的最大值,放在了最顶部(局部)
        arr[i] = temp;//将temp值放到调整后的位置
    }
}

```

运行结果

```java
数组: [4, 5, 6, 8, 9]
```



### <center>常用算法排序对比



![常用算法排序对比](https://img-blog.csdnimg.cn/02c1eb753cc8413aa243bcb5d7c88ead.png)

![相关术语解释](https://img-blog.csdnimg.cn/50b05c4420844ee8af84e87ac4892ff1.jpg)