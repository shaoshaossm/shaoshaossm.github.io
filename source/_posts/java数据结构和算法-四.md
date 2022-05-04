---
title: java数据结构和算法(四)
top: false
cover: false
toc: true
mathjax: true
date: 2021-10-02 23:11:19
password:
summary: 线性、二分、插值、裴波那契 查找的分析和实现----
tags: java
categories: 数据结构和算法
---

### <center>查找

#### 1.1 线性查找 

代码实现:

```java
package com.ssm.search;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/3 16:19
 */
public class SeqSearch {
    public static void main(String[] args) {
        int[] arr = {9, 45, 16, 8, -4, 62};
        int index = seqSearch(arr, -4);
        if (index != -1) {
            System.out.println("找到了下标为:" + index);
        } else {
            System.out.println("没有找到");
        }
    }

    public static int seqSearch(int[] arr, int value) {
        //线性查找逐一对比,发现有相同值就返回下标
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == value) {
                return i;
            }
        }
        return -1;
    }

}
```

运行结果:

```java
找到了下标为:4
```

#### 1.2 二分查找

代码实现:

```java
package com.ssm.search;

import java.util.ArrayList;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/4 13:19
 */
public class BinarySearch {
    public static void main(String[] args) {
        int[] arr = {1, 8, 10, 89, 1000, 1000, 1625};
        ArrayList<Integer> i = binarySearch(arr, 0, arr.length, 1000);
        System.out.println("ArrayList="+i);
    }

    public static ArrayList<Integer> binarySearch(int[] arr, int left, int right, int findval) {
        //当left > right 说明没有找到
        if (left > right) {
            return new ArrayList<>();
        }
        int mid = (left + right) / 2;
        int midvalue = arr[mid];
        if (findval > midvalue) { //向右递归
            return binarySearch(arr, mid + 1, right, findval);
        } else if (findval < midvalue) {
            return binarySearch(arr, left, mid - 1, findval);
        } else {
            //1.在找到mid的索引值,不要马上返回
            //2.向mid左边扫描,将所有满足的元素的下标放入到集合ArrayList中
            //3.向mid右边扫描,将所有满足的元素的下标放入到集合ArrayList中
            //4.返回ArrayLis
            ArrayList<Integer> resIndexList = new ArrayList<Integer>();
            //向左扫描
            int temp = mid - 1;
            while (true) {
                if (temp < 0 || arr[temp] != findval) {
                    break;
                } else {
                    resIndexList.add(temp);
                    temp -= 1;
                }
                resIndexList.add(mid);
                temp = mid + 1;

            }
            while (true) {
                if (temp < arr.length - 1 || arr[temp] != findval) {
                    break;
                } else {
                    resIndexList.add(temp);
                    temp += 1;
                }
            }
            return resIndexList;
        }
    }
}
```

运行结果:

```java
ArrayList=[4, 5]
```

#### 1.3 插值查找

- 插值查找算法类似于二分查找，不同的是插值查找每次从**自适应****mid**处开始查找。

- 将折半查找中的求mid 索引的公式 , low 表示左边索引left, high表示右边索引right. key 就是前面我们讲的 findVal

  ![二分=>插值](https://img-blog.csdnimg.cn/9ef76a13213741cda4beebcd41c793b1.png)

```java
int mid = low + (high - low) * (key - arr[low]) / (arr[high] - arr[low]) ;/*插值索引*/
对应前面的代码公式：
 int mid = left + (right – left) * (findVal – arr[left]) / (arr[right] – arr[left])
```


代码实现:

```java
package com.ssm.search;

import java.util.Arrays;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/4 14:18
 */
public class InsertValueSearch {
    public static void main(String[] args) {
        int[] arr = new int[100];
        for (int i = 0; i < 100; i++) {
            arr[i] = i + 1;
        }
        System.out.println("index = "+insertValueSearch(arr,0,arr.length-1,1));

        //System.out.println(Arrays.toString(arr));
    }

    public static int insertValueSearch(int[] arr, int left, int right, int findVal) {
        //注意findVal < arr[0] 和 findVal > arr[arr.length - 1] 必须有 否则可能越界
        if (left > right || findVal < arr[0] || findVal > arr[arr.length - 1]) {
            return -1;
        }
        int mid = left + (right - left) * (findVal - arr[left]) / (arr[right] - arr[left]);
        int midValue = arr[mid];
        if (findVal > midValue) {
            return insertValueSearch(arr, mid + 1, right, findVal);
        } else if (findVal < midValue) {
            return insertValueSearch(arr, left, mid - 1, findVal);
        } else {
            return mid;
        }
    }
}

```

运行结果:

```java
index = 0
```

#### 1.4 斐波那契(黄金分割)查找

原理:

斐波那契查找原理与前两种相似，仅仅改变了中间结点（mid）的位置，mid不再是中间或插值得到，而是位于黄金分割点附近，即mid=low+F(k-1)-1（F代表斐波那契数列），如下图所示

![斐波那契查找原理示意图](https://img-blog.csdnimg.cn/49c1b593a8c54e52bfd97284e13a3136.png)

对F(k-1)-1的理解：

- 由斐波那契数列 F[k]=F[k-1]+F[k-2] 的性质，可以得到 （F[k]-1）=（F[k-1]-1）+（F[k-2]-1）+1 。该式说明：只要顺序表的长度为F[k]-1，则可以将该表分成长度为F[k-1]-1和F[k-2]-1的两段，即如上图所示。从而中间位置为mid=low+F(k-1)-1
- 类似的，每一子段也可以用相同的方式分割
- 但顺序表长度n不一定刚好等于F[k]-1，所以需要将原来的顺序表长度n增加至F[k]-1。这里的k值只要能使得F[k]-1恰好大于或等于n即可，由以下代码得到,顺序表长度增加后，新增的位置（从n+1到F[k]-1位置），都赋为n位置的值可。

代码实现:

```java
package com.ssm.search;

import java.util.Arrays;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/4 14:43
 */
public class FibonacciSearch {
    public static int maxSize = 20;

    public static void main(String[] args) {
        int[] arr = {1, 8, 20, 89, 1000, 1234};
        System.out.println("index= " + fibSearch(arr, 89));
    }

    //因为后面mid = low+F(k-1)-1,需要使用斐波那契数列,所以先获取一个斐波那契数列
    public static int[] fib() {
        int[] f = new int[maxSize];
        f[0] = 1;
        f[1] = 1;
        for (int i = 2; i < maxSize; i++) {
            f[i] = f[i - 1] + f[i - 2];
        }
        return f;
    }
    //编写斐波那契查找算法(非递归)

    /**
     * @param a   数组
     * @param key 需要查找的关键码（值）
     * @return 返回对应的下标 没有返回-1
     */
    public static int fibSearch(int[] a, int key) {
        int low = 0;
        int high = a.length - 1;
        int k = 0;// 斐波那契数组下标
        int mid = 0; //存放mid值
        int[] f = fib();//获取到斐波那契数列
        //获取到斐波那契数组的下标
        while (high > f[k] - 1) {  //用high和 f[k]中的值比较(1, 1, 2, 3, 5, 8, 13, 21, 34, 55)  > 表示还没找到
            k++;
        }
        //因为f[k] 值可能大于a的长度,因此我们需要使用Arrays类,构造一个新的数组,并指向temp[],不足的部分用0补齐
        int[] temp = Arrays.copyOf(a, f[k]);
        //实际上是用a数组最后的数填充temp eg:temp = {1, 8, 20, 89, 1000, 1234,0,0} => temp = {1, 8, 20, 89, 1000, 1234,1234,}
        for (int i = high + 1; i < temp.length; i++) {
            temp[i] = a[high];
        }
        //找到 key
        while (low <= high) {
            mid = low + f[k - 1] - 1;
            if (key < temp[mid]) { //向数组的前面查找
                high = mid - 1;
                //说明 1.全部元素 = 前面的元素+后面的元素
                //2. f[k]+f[k-1]+f[k-2]
                //因为前面有f[k-1]个元素,所以可以继续拆分 f[k-1] = f[k-2]+f[k-3]
                //即 f[k-1]的前面继续查找 k-- 即下次循环mid =low+ f[k-1-1]-1
                k--;
            } else if (key > temp[mid]) { // 后面查找
                low = mid + 1;
                //说明 1.全部元素 = 前面的元素+后面的元素
                //2. f[k]+f[k-1]+f[k-2]
                //因为前面有f[k-2]个元素,所以可以继续拆分 f[k-2] = f[k-3]+f[k-4]
                //即 f[k-2]的前面继续查找 k-=2 即下次循环mid =low+ f[k-1-2]-1
                k -= 2;
            } else { //找到
                //需要确定返回的是哪个下表
                if (mid <= high) {
                    return mid;
                } else {
                    return high;
                }
            }
        }
        return -1;
    }
}

```

运行结果:

```java
nidex= 3
```

