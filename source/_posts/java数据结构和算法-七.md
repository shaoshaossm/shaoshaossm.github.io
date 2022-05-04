---
title: java数据结构和算法(七)
top: false
cover: false
toc: true
mathjax: true
date: 2021-10-15 18:25:06
password:
summary: 十种典型算法分析---------------------------------------------------
tags: java
categories: 数据结构和算法
---

### 1. 二分查找(非递归)

代码实现

```java

public class BinarySearchNoRecursion {
    public static void main(String[] args) {
        int[] arr = {1, 23, 46, 413, 880, 999};
        int index = binarySearch(arr, 999);
        System.out.println(index);
    }

    /**
     * 二分查找非递归实现
     *
     * @param arr    待查找的数组 arr升序排序
     * @param target 目标数
     * @return 返回对应下标 否则返回-1
     */
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] > target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return -1;
    }
}

```

### 2. 分治算法(汉诺塔)

代码实现

```java

public class HanoiTower {
    public static void main(String[] args) {
        hanoiTower(5,'A','B','C');
    }
    public static void hanoiTower(int num,char a,char b, char c){
        if (num==1){
            System.out.println("第1个盘从 "+a+"->"+c);
        } else {
            //n>=2 把所有的盘总是看成两个盘:1.下边的一个盘,上面的所有盘
            //1.最上面的所有盘A->B
            hanoiTower(num-1,a,c,b);
            //2.最下面的盘A->C
            System.out.println("第"+num+"个盘从 "+a+"->"+c);
            //3.把B塔的所有盘从B->C 移动过程使用到a塔
            hanoiTower(num-1,b,a,c);
        }
    }
}

```

### 3. 动态规划算法

- 动态规划(**Dynamic Programming**)算法的核心思想是：将大问题划分为小问题进行解决，从而一步步获取最优解的处理算法

- 动态规划算法与分治算法类似，其基本思想也是将待求解问题分解成若干个子问题，先求解子问题，然后从这些子问题的解得到原问题的解。

- 与分治法不同的是，**适合于用动态规划求解的问题，经分解得到子问题往往不是互相独立的。** ( 即下一个子阶段的求解是建立在上一个子阶段的解的基础上，进行进一步的求解 )

- 动态规划可以通过**填表的方式**来逐步推进，得到最优解.

| **物品** | **重量** | **价格** |
| -------- | -------- | -------- |
| 吉他(G)  | 1        | 1500     |
| 音响(S)  | 4        | 3000     |
| 电脑(L)  | 3        | 2000     |

代码实现

```java

public class KnapsackProblem {
    public static void main(String[] args) {
        int[] w = {1, 4, 3};
        int[] val = {1500, 3000, 2000};
        int m = 4;
        int n = val.length;
        //最大价值
        int[][] v = new int[n + 1][m + 1];
        //商品放入情况
        int[][] path = new int[n + 1][m + 1];
        //初始化第一行和列
        for (int i = 0; i < v.length; i++) {
            v[i][0] = 0;
        }
        for (int i = 0; i < v[0].length; i++) {
            v[0][i] = 0;
        }

        //动态规划处理
        for (int i = 1; i < v.length; i++) {
            for (int j = 1; j < v[i].length; j++) {
                //公式
                if (w[i - 1] > j) {
                    v[i][j] = v[i - 1][j];
                } else {
                    // v[i][j] = Math.max(v[i-1][j],val[i-1]+v[i-1][j-w[i-1]]);
                    // 记录商品放入情况
                    if (v[i - 1][j] < val[i - 1] + v[i - 1][j - w[i - 1]]) {
                        v[i][j] = val[i - 1] + v[i - 1][j - w[i - 1]];
                        path[i][j] = 1;
                    } else {
                        v[i][j] = v[i - 1][j];
                    }
                }
            }

        }
        //输出
        for (int i = 0; i < v.length; i++) {
            for (int j = 0; j < v[i].length; j++) {
                System.out.print(v[i][j] + " ");
            }
            System.out.println(
            );
        }
        int i = path.length-1; //行的最大下标
        int j = path[0].length-1; //列的最大下标
        while (i>0&&j>0){ //从最后遍历
            if (path[i][j]==1){
                System.out.printf("第%d个商品放入到背包\n",i);
                j-=w[i-1]; // 剩余的容量
            }
            i--;
        }
    }
}

```

运行结果

```java
0 0 0 0 0 
0 1500 1500 1500 1500 
0 1500 1500 1500 3000 
0 1500 1500 2000 3500 
第3个商品放入到背包
第1个商品放入到背包
```

### 4. KMP算法

- KMP是一个解决模式串在文本串是否出现过，如果出现过，最早出现的位置的经典算法

- Knuth-Morris-Pratt **字符串查找算法**，简称为 “KMP算法”，常用于在一个文本串S内查找一个模式串P 的出现位置，这个算法由Donald Knuth、Vaughan Pratt、James H. Morris三人于1977年联合发表，故取这3人的姓氏命名此算法.

- KMP方法算法就利用之前判断过信息，通过一个next数组，保存模式串中前后最长公共子序列的长度，每次回溯时，通过next数组找到，前面匹配过的位置，省去了大量的计算时间

- 参考资料：https://www.cnblogs.com/ZuoAndFutureGirl/p/9028287.html 

字符串匹配问题

代码实现

```java

public class ViolenceMatch {
    public static void main(String[] args) {
        String str1 = "少司啊命你少少打司命少司命";
        String str2 = "少司命";
        int i = violenceMatch(str1, str2);
        System.out.println(i);
    }

    //暴力算法
    public static int violenceMatch(String str1, String str2) {
        char[] s1 = str1.toCharArray();
        char[] s2 = str2.toCharArray();
        int s1Len = s1.length;
        int s2Len = s2.length;
        int i = 0;
        int j = 0;
        while (i < s1Len && j < s2Len) {
            if (s1[i] == s2[j]) {
                i++;
                j++;
            } else {
                i = i - (j - 1);
                j = 0;
            }
        }
        if (j == s2Len) {
            return i - j;
        } else {
            return -1;
        }
    }

    //KMP算法

    /**
     * @param str1 源字符串
     * @param str2 子串
     * @param next 子串对应的部分匹配表
     * @return 返回匹配的位置 否则返回-1
     */
    public static int kmpSearch(String str1, String str2, int[] next) {
        for (int i = 0, j = 0; i < str1.length(); i++) {
            while (j > 0 && str1.charAt(i) != str2.charAt(j)) {
                j = next[j - 1];
            }
            if (str1.charAt(i) == str2.charAt(j)) {
                j++;
            }
            if (j == str2.length()) { //找到了
                return i - j + 1;
            }
        }
        return -1;
    }

    //获取到一个字符串的部分匹配值表
    public static int[] kmpNext(String dest) {
        int[] next = new int[dest.length()];
        next[0] = 0;
        for (int i = 1, j = 0; i < dest.length(); i++) {
            //kmp算法核心点
            while (j > 0 && dest.charAt(i) != dest.charAt(j)) {
                j = next[j - 1];
            }
            if (dest.charAt(i) == dest.charAt(j)) {
                j++;
            }
            next[i] = j;
        }
        return next;

    }
}

```

### 5. 贪心算法

- 贪婪算法(贪心算法)是指在对问题进行求解时，在每一步选择中都采取最好或者最优(即最有利)的选择，从而希望能够导致结果是最好或者最优的算法
- 贪婪算法所得到的结果**不一定是最优的结果**(有时候会是最优解)，但是都是相对近似(接近)最优解的结果

<font color="blue">应用场景-集合覆盖问题</font>

假设存在下面需要付费的广播台，以及广播台信号可以覆盖的地区。 **如何选择最少的广播台**，让所有的地区都可以接收到信号?

| 广播台 | 覆盖地区               |
| ------ | ---------------------- |
| K1     | "北京", "上海", "天津" |
| K2     | "广州", "北京", "深圳" |
| K3     | "成都", "上海", "杭州" |
| K4     | "上海", "天津"         |
| K5     | "杭州", "大连"         |

- 遍历所有的广播电台, 找到一个覆盖了最多**未覆盖的地区**的电台(此电台可能包含一些已覆盖的地区，但没有关系） 

- 将这个电台加入到一个集合中(比如ArrayList), 想办法把该电台覆盖的地区在下次比较时去掉。

- 重复第1步直到覆盖了全部的地区



代码实现

```java

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

public class GreedyAlgorithm {
    public static void main(String[] args) {
        HashMap<String, HashSet<String>> broadcasts = new HashMap<String, HashSet<String>>();
        HashSet<String> hashSet1 = new HashSet<>();
        hashSet1.add("北京");
        hashSet1.add("上海");
        hashSet1.add("天津");
        HashSet<String> hashSet2 = new HashSet<>();
        hashSet2.add("广州");
        hashSet2.add("北京");
        hashSet2.add("深圳");
        HashSet<String> hashSet3 = new HashSet<>();
        hashSet3.add("成都");
        hashSet3.add("杭州");
        hashSet3.add("上海");
        HashSet<String> hashSet4 = new HashSet<>();
        hashSet4.add("天津");
        hashSet4.add("上海");
        HashSet<String> hashSet5 = new HashSet<>();
        hashSet5.add("大连");
        hashSet5.add("杭州");

        broadcasts.put("k1", hashSet1);
        broadcasts.put("k2", hashSet2);
        broadcasts.put("k3", hashSet3);
        broadcasts.put("k4", hashSet4);
        broadcasts.put("k5", hashSet5);

        //存放所有的地区
        HashSet<String> allArea = new HashSet<String>();
        allArea.add("北京");
        allArea.add("上海");
        allArea.add("深圳");
        allArea.add("杭州");
        allArea.add("广州");
        allArea.add("天津");
        allArea.add("成都");
        allArea.add("大连");

        //存放选择的电台的集合
        ArrayList<String> selects = new ArrayList<String>();
        //临时集合,存放遍历过程中的电台覆盖的地区和当前还没有覆盖的地区的交集
        HashSet<String> tempSet = new HashSet<String>();
        //保存在一次遍历中能够覆盖最大未覆盖的地区对应的电台key  如果maxKey不为null,则加入到selects
        String maxKey = null;
        while (allArea.size() != 0) {
            maxKey = null;
            for (String key : broadcasts.keySet()) {
                tempSet.clear();
                HashSet<String> areas = broadcasts.get(key);
                tempSet.addAll(areas);
                //取tempSet 和 areas 的交集 赋给 tempSet
                tempSet.retainAll(allArea);
                //如果当亲这个集合包含未覆盖地区的数量,比maxKey指向的集合地区还多,就需要重置maxKey  这里体现贪心算法的特点
                if (tempSet.size() > 0 && (maxKey == null || tempSet.size() > broadcasts.get(maxKey).size())) {
                    maxKey = key;
                }
            }
            if (maxKey != null) {
                selects.add(maxKey);
                //将maxkey指向的广播电台重allArea中去除掉
                allArea.removeAll(broadcasts.get(maxKey));
            }
        }
        System.out.println("得到的选择结果" + selects);
    }
}

```

### 6. 普利姆算法

![普利姆算法](https://img-blog.csdnimg.cn/46d7560c75e7486e9f29256cd4e472b1.png)

- 普利姆(Prim)算法求**最小生成树**，也就是在包含n个顶点的连通图中，找出只有(n-1)条边包含所有n个顶点的连通子图，也就是所谓的**极小连通子图**

![问题示意图](https://img-blog.csdnimg.cn/d57522fe6b634cb199dd4dbb1034f3a1.png)



各个村庄的距离用边线表示(权) ，比如 A – B 距离 5公里.问：如何修路保证各个村庄都能连通，并且总的修建公路总里程最短?

代码演示

```java
package com.ssm.tenAlgorithms;

import java.util.Arrays;

public class PrimAlgorithm {
    public static void main(String[] args) {
        char[] data = {'A', 'B', 'C', 'D', 'E', 'F', 'G'};
        int verxs = data.length;
        int[][] weight = {
                {10000, 5, 7, 10000, 10000, 10000, 2},
                {5, 10000, 10000, 9, 10000, 10000, 9},
                {7, 10000, 10000, 10000, 8, 10000, 10000},
                {10000, 9, 10000, 10000, 10000, 4, 10000},
                {10000, 10000, 8, 10000, 10000, 5, 4},
                {10000, 10000, 10000, 4, 5, 10000, 6},
                {2, 3, 10000, 10000, 4, 6, 10000},
        };
        MGraph graph = new MGraph(verxs);
        MinTree minTree = new MinTree();
        minTree.createGraph(graph, verxs, data, weight);
        minTree.showGraph(graph);
        minTree.prim(graph,0);
    }
}

//创建最小生成树
class MinTree {
    public void createGraph(MGraph graph, int verxs, char[] data, int[][] weight) {
        int i, j;
        for (i = 0; i < verxs; i++) {
            graph.data[i] = data[i];
            for (j = 0; j < verxs; j++) {
                graph.weight[i][j] = weight[i][j];
            }
        }
    }

    //显示图的邻接矩阵
    public void showGraph(MGraph graph) {
        for (int[] link : graph.weight) {
            System.out.println(Arrays.toString(link));
        }
    }

    //prim算法,生成最小生成树
    public void prim(MGraph graph, int v) {
        // visited [] 标记顶点是否被访问
        int[] visited = new int[graph.verxs];
        visited[v] = 1;
        // h1,h2记录两个顶点的下标
        int h1 = -1;
        int h2 = -1;
        int minWeight = 10000;
        for (int k = 1; k < graph.verxs; k++) {
            for (int i = 0; i < graph.verxs; i++) { //i 表示被访问过的结点
                for (int j = 0; j < graph.verxs; j++) { //j 表示未被访问过的结点
                    if (visited[i]==1&&visited[j]==0&&graph.weight[i][j]<minWeight){
                        //找到权值最小的边
                        minWeight = graph.weight[i][j];
                        h1=i;
                        h2=j;
                    }
                }
            }
            System.out.println("边<"+graph.data[h1]+","+graph.data[h2]+">权值:"+minWeight);
            visited[h2]=1;
            minWeight=10000;
        }

    }
}

class MGraph {
    int verxs; //图的节点的个数
    char[] data; //存放节点的个数
    int[][] weight; //存放边,就是我们的邻接矩阵

    public MGraph(int verxs) {
        this.verxs = verxs;
        data = new char[verxs];
        weight = new int[verxs][verxs];
    }

}
```

运行结果

```java
边<A,G>权值:2
边<G,B>权值:3
边<G,E>权值:4
边<E,F>权值:5
边<F,D>权值:4
边<A,C>权值:7
```

### 7.克鲁斯卡尔算法

![克鲁斯卡尔算法](https://img-blog.csdnimg.cn/d9edfa644e64427b925b8ce8daffd039.png)

- 克鲁斯卡尔(Kruskal)算法，是用来求加权连通图的最小生成树的算法。

- **基本思想**：按照权值从小到大的顺序选择n-1条边，并保证这n-1条边不构成回路

- **具体做法**：首先构造一个只含n个顶点的森林，然后依权值从小到大从连通网中选择边加入到森林中，并使森林中不产生回路，直至森林变成一棵树为止

```java

import java.util.Arrays;

public class KruskalCase {

	private int edgeNum; //边的个数
	private char[] vertexs; //顶点数组
	private int[][] matrix; //邻接矩阵
	//使用 INF 表示两个顶点不能连通
	private static final int INF = Integer.MAX_VALUE;
	
	public static void main(String[] args) {
		char[] vertexs = {'A', 'B', 'C', 'D', 'E', 'F', 'G'};
		//克鲁斯卡尔算法的邻接矩阵  
	      int matrix[][] = {
	      /*A*//*B*//*C*//*D*//*E*//*F*//*G*/
	/*A*/ {   0,  12, INF, INF, INF,  16,  14},
	/*B*/ {  12,   0,  10, INF, INF,   7, INF},
	/*C*/ { INF,  10,   0,   3,   5,   6, INF},
	/*D*/ { INF, INF,   3,   0,   4, INF, INF},
	/*E*/ { INF, INF,   5,   4,   0,   2,   8},
	/*F*/ {  16,   7,   6, INF,   2,   0,   9},
	/*G*/ {  14, INF, INF, INF,   8,   9,   0}}; 
	      //大家可以在去测试其它的邻接矩阵，结果都可以得到最小生成树.
	      
	      //创建KruskalCase 对象实例
	      KruskalCase kruskalCase = new KruskalCase(vertexs, matrix);
	      //输出构建的
	      kruskalCase.print();
	      kruskalCase.kruskal();
	      
	}
	
	//构造器
	public KruskalCase(char[] vertexs, int[][] matrix) {
		//初始化顶点数和边的个数
		int vlen = vertexs.length;
		
		//初始化顶点, 复制拷贝的方式
		this.vertexs = new char[vlen];
		for(int i = 0; i < vertexs.length; i++) {
			this.vertexs[i] = vertexs[i];
		}
		
		//初始化边, 使用的是复制拷贝的方式
		this.matrix = new int[vlen][vlen];
		for(int i = 0; i < vlen; i++) {
			for(int j= 0; j < vlen; j++) {
				this.matrix[i][j] = matrix[i][j];
			}
		}
		//统计边的条数
		for(int i =0; i < vlen; i++) {
			for(int j = i+1; j < vlen; j++) {
				if(this.matrix[i][j] != INF) {
					edgeNum++;
				}
			}
		}
		
	}
	public void kruskal() {
		int index = 0; //表示最后结果数组的索引
		int[] ends = new int[edgeNum]; //用于保存"已有最小生成树" 中的每个顶点在最小生成树中的终点
		//创建结果数组, 保存最后的最小生成树
		EData[] rets = new EData[edgeNum];
		
		//获取图中 所有的边的集合 ， 一共有12边
		EData[] edges = getEdges();
		System.out.println("图的边的集合=" + Arrays.toString(edges) + " 共"+ edges.length); //12
		
		//按照边的权值大小进行排序(从小到大)
		sortEdges(edges);
		
		//遍历edges 数组，将边添加到最小生成树中时，判断是准备加入的边否形成了回路，如果没有，就加入 rets, 否则不能加入
		for(int i=0; i < edgeNum; i++) {
			//获取到第i条边的第一个顶点(起点)
			int p1 = getPosition(edges[i].start); //p1=4
			//获取到第i条边的第2个顶点
			int p2 = getPosition(edges[i].end); //p2 = 5
			
			//获取p1这个顶点在已有最小生成树中的终点
			int m = getEnd(ends, p1); //m = 4
			//获取p2这个顶点在已有最小生成树中的终点
			int n = getEnd(ends, p2); // n = 5
			//是否构成回路
			if(m != n) { //没有构成回路
				ends[m] = n; // 设置m 在"已有最小生成树"中的终点 <E,F> [0,0,0,0,5,0,0,0,0,0,0,0]
				rets[index++] = edges[i]; //有一条边加入到rets数组
			}
		}
		//<E,F> <C,D> <D,E> <B,F> <E,G> <A,B>。
		//统计并打印 "最小生成树", 输出  rets
		System.out.println("最小生成树为");
		for(int i = 0; i < index; i++) {
			System.out.println(rets[i]);
		}
		
		
	}
	
	//打印邻接矩阵
	public void print() {
		System.out.println("邻接矩阵为: \n");
		for(int i = 0; i < vertexs.length; i++) {
			for(int j=0; j < vertexs.length; j++) {
				System.out.printf("%12d", matrix[i][j]);
			}
			System.out.println();//换行
		}
	}

	/**
	 * 功能：对边进行排序处理, 冒泡排序
	 * @param edges 边的集合
	 */
	private void sortEdges(EData[] edges) {
		for(int i = 0; i < edges.length - 1; i++) {
			for(int j = 0; j < edges.length - 1 - i; j++) {
				if(edges[j].weight > edges[j+1].weight) {//交换
					EData tmp = edges[j];
					edges[j] = edges[j+1];
					edges[j+1] = tmp;
				}
			}
 		}
	}
	/**
	 * 
	 * @param ch 顶点的值，比如'A','B'
	 * @return 返回ch顶点对应的下标，如果找不到，返回-1
	 */
	private int getPosition(char ch) {
		for(int i = 0; i < vertexs.length; i++) {
			if(vertexs[i] == ch) {//找到
				return i;
			}
		}
		//找不到,返回-1
		return -1;
	}
	/**
	 * 功能: 获取图中边，放到EData[] 数组中，后面我们需要遍历该数组
	 * 是通过matrix 邻接矩阵来获取
	 * EData[] 形式 [['A','B', 12], ['B','F',7], .....]
	 * @return
	 */
	private EData[] getEdges() {
		int index = 0;
		EData[] edges = new EData[edgeNum];
		for(int i = 0; i < vertexs.length; i++) {
			for(int j=i+1; j <vertexs.length; j++) {
				if(matrix[i][j] != INF) {
					edges[index++] = new EData(vertexs[i], vertexs[j], matrix[i][j]);
				}
			}
		}
		return edges;
	}
	/**
	 * 功能: 获取下标为i的顶点的终点(), 用于后面判断两个顶点的终点是否相同
	 * @param ends ： 数组就是记录了各个顶点对应的终点是哪个,ends 数组是在遍历过程中，逐步形成
	 * @param i : 表示传入的顶点对应的下标
	 * @return 返回的就是 下标为i的这个顶点对应的终点的下标, 一会回头还有来理解
	 */
	private int getEnd(int[] ends, int i) { // i = 4 [0,0,0,0,5,0,0,0,0,0,0,0]
		while(ends[i] != 0) {
			i = ends[i];
		}
		return i;
	}
 
}

//创建一个类EData ，它的对象实例就表示一条边
class EData {
	char start; //边的一个点
	char end; //边的另外一个点
	int weight; //边的权值
	//构造器
	public EData(char start, char end, int weight) {
		this.start = start;
		this.end = end;
		this.weight = weight;
	}
	//重写toString, 便于输出边信息
	@Override
	public String toString() {
		return "EData [<" + start + ", " + end + ">= " + weight + "]";
	}
	
	
}

```

克鲁斯卡尔算法和普利姆算法的区别:

- 普利姆：以点为核心，两点之间的权值从小到大找，找到的最小的连上即可。(<font color = red>不能断开</font>)
- 克鲁斯卡尔：以边为核心，边的权值从小到大找，即使两个线条不相连也先连上，然后最后再连在一起<font color = red>（可以断开）</font>

### 8.迪杰斯特拉算法

迪杰斯特拉(Dijkstra)算法是**典型最短路径算法**，用于计算一个结点到其他结点的最短路径。 它的主要特点是以起始点为中心向外层层扩展(**广度优先**搜索思想)，直到扩展到终点为止

![Dijkstra](https://img-blog.csdnimg.cn/c66825a356974c87b2ce1cfbf5b8e639.png)

- 战争时期，胜利乡有7个村庄(A, B, C, D, E, F, G) ，现在有六个邮差，从G点出发，需要分别把邮件分别送到 A, B, C , D, E, F 六个村庄

- 各个村庄的距离用边线表示(权) ，比如 A – B 距离 5公里

- 问：如何计算出G村庄到 其它各个村庄的最短距离? 

- 如果从其它点出发到各个点的最短距离又是多少?



![案例](https://img-blog.csdnimg.cn/e1db5d8918b14b2ba78c3e5d0517e751.png)

```java
package com.ssm.tenAlgorithms;

import java.util.Arrays;

public class DijkstraAlgorithm {

	public static void main(String[] args) {
		char[] vertex = { 'A', 'B', 'C', 'D', 'E', 'F', 'G' };
		//邻接矩阵
		int[][] matrix = new int[vertex.length][vertex.length];
		final int N = 65535;// 表示不可以连接
		matrix[0]=new int[]{N,5,7,N,N,N,2};
		matrix[1]=new int[]{5,N,N,9,N,N,3};
		matrix[2]=new int[]{7,N,N,N,8,N,N};
		matrix[3]=new int[]{N,9,N,N,N,4,N};
		matrix[4]=new int[]{N,N,8,N,N,5,4};
		matrix[5]=new int[]{N,N,N,4,5,N,6};
		matrix[6]=new int[]{2,3,N,N,4,6,N};
		//创建 Graph对象
		Graph graph = new Graph(vertex, matrix);
		//测试, 看看图的邻接矩阵是否ok
		graph.showGraph();
		//测试迪杰斯特拉算法
		graph.dsj(2);//C
		graph.showDijkstra();


	}

}

class Graph {
	private char[] vertex; // 顶点数组
	private int[][] matrix; // 邻接矩阵
	private VisitedVertex vv; //已经访问的顶点的集合

	// 构造器
	public Graph(char[] vertex, int[][] matrix) {
		this.vertex = vertex;
		this.matrix = matrix;
	}

	//显示结果
	public void showDijkstra() {
		vv.show();
	}

	// 显示图
	public void showGraph() {
		for (int[] link : matrix) {
			System.out.println(Arrays.toString(link));
		}
	}

	//迪杰斯特拉算法实现
	/**
	 *
	 * @param index 表示出发顶点对应的下标
	 */
	public void dsj(int index) {
		vv = new VisitedVertex(vertex.length, index);
		update(index);//更新index顶点到周围顶点的距离和前驱顶点
		for(int j = 1; j <vertex.length; j++) {
			index = vv.updateArr();// 选择并返回新的访问顶点
			update(index); // 更新index顶点到周围顶点的距离和前驱顶点
		}
	}



	//更新index下标顶点到周围顶点的距离和周围顶点的前驱顶点,
	private void update(int index) {
		int len = 0;
		//根据遍历我们的邻接矩阵的  matrix[index]行
		for(int j = 0; j < matrix[index].length; j++) {
			// len 含义是 : 出发顶点到index顶点的距离 + 从index顶点到j顶点的距离的和
			len = vv.getDis(index) + matrix[index][j];
			// 如果j顶点没有被访问过，并且 len 小于出发顶点到j顶点的距离，就需要更新
			if(!vv.in(j) && len < vv.getDis(j)) {
				vv.updatePre(j, index); //更新j顶点的前驱为index顶点
				vv.updateDis(j, len); //更新出发顶点到j顶点的距离
			}
		}
	}
}

// 已访问顶点集合
class VisitedVertex {
	// 记录各个顶点是否访问过 1表示访问过,0未访问,会动态更新
	public int[] already_arr;
	// 每个下标对应的值为前一个顶点下标, 会动态更新
	public int[] pre_visited;
	// 记录出发顶点到其他所有顶点的距离,比如G为出发顶点，就会记录G到其它顶点的距离，会动态更新，求的最短距离就会存放到dis
	public int[] dis;

	//构造器
	/**
	 *
	 * @param length :表示顶点的个数
	 * @param index: 出发顶点对应的下标, 比如G顶点，下标就是6
	 */
	public VisitedVertex(int length, int index) {
		this.already_arr = new int[length];
		this.pre_visited = new int[length];
		this.dis = new int[length];
		//初始化 dis数组
		Arrays.fill(dis, 65535);
		this.already_arr[index] = 1; //设置出发顶点被访问过
		this.dis[index] = 0;//设置出发顶点的访问距离为0

	}
	/**
	 * 功能: 判断index顶点是否被访问过
	 * @param index
	 * @return 如果访问过，就返回true, 否则访问false
	 */
	public boolean in(int index) {
		return already_arr[index] == 1;
	}

	/**
	 * 功能: 更新出发顶点到index顶点的距离
	 * @param index
	 * @param len
	 */
	public void updateDis(int index, int len) {
		dis[index] = len;
	}
	/**
	 * 功能: 更新pre这个顶点的前驱顶点为index顶点
	 * @param pre
	 * @param index
	 */
	public void updatePre(int pre, int index) {
		pre_visited[pre] = index;
	}
	/**
	 * 功能:返回出发顶点到index顶点的距离
	 * @param index
	 */
	public int getDis(int index) {
		return dis[index];
	}


	/**
	 * 继续选择并返回新的访问顶点， 比如这里的G 完后，就是 A点作为新的访问顶点(注意不是出发顶点)
	 * @return
	 */
	public int updateArr() {
		int min = 65535, index = 0;
		for(int i = 0; i < already_arr.length; i++) {
			if(already_arr[i] == 0 && dis[i] < min ) {
				min = dis[i];
				index = i;
			}
		}
		//更新 index 顶点被访问过
		already_arr[index] = 1;
		return index;
	}

	//显示最后的结果
	//即将三个数组的情况输出
	public void show() {

		System.out.println("==========================");
		//输出already_arr
		for(int i : already_arr) {
			System.out.print(i + " ");
		}
		System.out.println();
		//输出pre_visited
		for(int i : pre_visited) {
			System.out.print(i + " ");
		}
		System.out.println();
		//输出dis
		for(int i : dis) {
			System.out.print(i + " ");
		}
		System.out.println();
		//为了好看最后的最短距离，我们处理
		char[] vertex = { 'A', 'B', 'C', 'D', 'E', 'F', 'G' };
		int count = 0;
		for (int i : dis) {
			if (i != 65535) {
				System.out.print(vertex[count] + "("+i+") ");
			} else {
				System.out.println("N ");
			}
			count++;
		}
		System.out.println();

	}

}

```

### 9.弗洛伊德算法

- 和Dijkstra算法一样，弗洛伊德(Floyd)算法也是一种用于寻找给定的加权图中顶点间最短路径的算法。

```java
package com.ssm.tenAlgorithms;

import java.util.Arrays;

public class FloydAlgorithm {

    public static void main(String[] args) {
        // 测试看看图是否创建成功
        char[] vertex = {'A', 'B', 'C', 'D', 'E', 'F', 'G'};
        //创建邻接矩阵
        int[][] matrix = new int[vertex.length][vertex.length];
        final int N = 65535;
        matrix[0] = new int[]{0, 5, 7, N, N, N, 2};
        matrix[1] = new int[]{5, 0, N, 9, N, N, 3};
        matrix[2] = new int[]{7, N, 0, N, 8, N, N};
        matrix[3] = new int[]{N, 9, N, 0, N, 4, N};
        matrix[4] = new int[]{N, N, 8, N, 0, 5, 4};
        matrix[5] = new int[]{N, N, N, 4, 5, 0, 6};
        matrix[6] = new int[]{2, 3, N, N, 4, 6, 0};

        //创建 Graph 对象
        Graph graph = new Graph(vertex.length, matrix, vertex);
        //调用弗洛伊德算法
        graph.floyd();
        graph.show();
    }


    // 创建图
    static class Graph {
        private char[] vertex; // 存放顶点的数组
        private int[][] dis; // 保存，从各个顶点出发到其它顶点的距离，最后的结果，也是保留在该数组
        private int[][] pre;// 保存到达目标顶点的前驱顶点

        // 构造器

        /**
         * @param length 大小
         * @param matrix 邻接矩阵
         * @param vertex 顶点数组
         */
        public Graph(int length, int[][] matrix, char[] vertex) {
            this.vertex = vertex;
            this.dis = matrix;
            this.pre = new int[length][length];
            // 对pre数组初始化, 注意存放的是前驱顶点的下标
            for (int i = 0; i < length; i++) {
                Arrays.fill(pre[i], i);
            }
        }

        // 显示pre数组和dis数组
        public void show() {

            //为了显示便于阅读，我们优化一下输出
            char[] vertex = {'A', 'B', 'C', 'D', 'E', 'F', 'G'};
            for (int k = 0; k < dis.length; k++) {
                // 先将pre数组输出的一行
                for (int i = 0; i < dis.length; i++) {
                    System.out.print(vertex[pre[k][i]] + " ");
                }
                System.out.println();
                // 输出dis数组的一行数据
                for (int i = 0; i < dis.length; i++) {
                    System.out.print("(" + vertex[k] + "到" + vertex[i] + "的最短路径是" + dis[k][i] + ") ");
                }
                System.out.println();
                System.out.println();

            }

        }

        //弗洛伊德算法, 比较容易理解，而且容易实现
        public void floyd() {
            int len = 0; //变量保存距离
            //对中间顶点遍历， k 就是中间顶点的下标 [A, B, C, D, E, F, G]
            for (int k = 0; k < dis.length; k++) { //
                //从i顶点开始出发 [A, B, C, D, E, F, G]
                for (int i = 0; i < dis.length; i++) {
                    //到达j顶点 // [A, B, C, D, E, F, G]
                    for (int j = 0; j < dis.length; j++) {
                        len = dis[i][k] + dis[k][j];// => 求出从i 顶点出发，经过 k中间顶点，到达 j 顶点距离
                        if (len < dis[i][j]) {//如果len小于 dis[i][j]
                            dis[i][j] = len;//更新距离
                            pre[i][j] = pre[k][j];//更新前驱顶点
                        }
                    }
                }
            }
        }
    }
}

```

弗洛伊德算法和迪杰斯特拉算法不同之处：

- 迪杰斯特拉算法通过选定的被访问顶点，求出从出发访问顶点到其他顶点的最短路径；
- 弗洛伊德算法中每一个顶点都是出发访问点，所以需要将每一个顶点看做被访问顶点，求出从每一个顶点到其他顶点的最短路径。



### 10.骑士周游回溯算法

![马踏棋盘](https://img-blog.csdnimg.cn/b47b728effeb437ba16b7ee75522f42c.png)

- 马踏棋盘算法也被称为骑士周游问题

- 将马随机放在国际象棋的8×8棋盘Board[0～7][0～7]的某个方格中，马按走棋规则(**马走日字**)进行移动。要求每个方格只进入一次，走遍棋盘上全部64个方格
- 马踏棋盘问题(骑士周游问题)实际上是图的深度优先搜索(DFS)的应用。

```java
package com.ssm.tenAlgorithms;

import java.awt.Point;
import java.util.ArrayList;
import java.util.Comparator;

public class HorseChessboard {

    private static int X; // 棋盘的列数
    private static int Y; // 棋盘的行数
    //创建一个数组，标记棋盘的各个位置是否被访问过
    private static boolean visited[];
    //使用一个属性，标记是否棋盘的所有位置都被访问
    private static boolean finished; // 如果为true,表示成功

    public static void main(String[] args) {
        System.out.println("骑士周游算法，开始运行~~");
        //测试骑士周游算法是否正确
        X = 8;
        Y = 8;
        int row = 1; //马儿初始位置的行，从1开始编号
        int column = 1; //马儿初始位置的列，从1开始编号
        //创建棋盘
        int[][] chessboard = new int[X][Y];
        visited = new boolean[X * Y];//初始值都是false
        //测试一下耗时
        long start = System.currentTimeMillis();
        traversalChessboard(chessboard, row - 1, column - 1, 1);
        long end = System.currentTimeMillis();
        System.out.println("共耗时: " + (end - start) + " 毫秒");

        //输出棋盘的最后情况
        for(int[] rows : chessboard) {
            for(int step: rows) {
                System.out.print(step + "\t");
            }
            System.out.println();
        }
    }

    /**
     * 完成骑士周游问题的算法
     * @param chessboard 棋盘
     * @param row 马儿当前的位置的行 从0开始
     * @param column 马儿当前的位置的列  从0开始
     * @param step 是第几步 ,初始位置就是第1步
     */
    public static void traversalChessboard(int[][] chessboard, int row, int column, int step) {
        chessboard[row][column] = step;
        //row = 4 X = 8 column = 4 = 4 * 8 + 4 = 36
        visited[row * X + column] = true; //标记该位置已经访问
        //获取当前位置可以走的下一个位置的集合
        ArrayList<Point> ps = next(new Point(column, row));
        //对ps进行排序,排序的规则就是对ps的所有的Point对象的下一步的位置的数目，进行非递减排序
        sort(ps);
        //遍历 ps
        while(!ps.isEmpty()) {
            Point p = ps.remove(0);//取出下一个可以走的位置
            //判断该点是否已经访问过
            if(!visited[p.y * X + p.x]) {//说明还没有访问过
                traversalChessboard(chessboard, p.y, p.x, step + 1);
            }
        }
        //判断马儿是否完成了任务，使用   step 和应该走的步数比较 ，
        //如果没有达到数量，则表示没有完成任务，将整个棋盘置0
        //说明: step < X * Y  成立的情况有两种
        //1. 棋盘到目前位置,仍然没有走完
        //2. 棋盘处于一个回溯过程
        if(step < X * Y && !finished ) {
            chessboard[row][column] = 0;
            visited[row * X + column] = false;
        } else {
            finished = true;
        }

    }

    /**
     * 功能： 根据当前位置(Point对象)，计算马儿还能走哪些位置(Point)，并放入到一个集合中(ArrayList), 最多有8个位置
     * @param curPoint
     * @return
     */
    public static ArrayList<Point> next(Point curPoint) {
        //创建一个ArrayList
        ArrayList<Point> ps = new ArrayList<Point>();
        //创建一个Point
        Point p1 = new Point();
        //表示马儿可以走5这个位置
        if((p1.x = curPoint.x - 2) >= 0 && (p1.y = curPoint.y -1) >= 0) {
            ps.add(new Point(p1));
        }
        //判断马儿可以走6这个位置
        if((p1.x = curPoint.x - 1) >=0 && (p1.y=curPoint.y-2)>=0) {
            ps.add(new Point(p1));
        }
        //判断马儿可以走7这个位置
        if ((p1.x = curPoint.x + 1) < X && (p1.y = curPoint.y - 2) >= 0) {
            ps.add(new Point(p1));
        }
        //判断马儿可以走0这个位置
        if ((p1.x = curPoint.x + 2) < X && (p1.y = curPoint.y - 1) >= 0) {
            ps.add(new Point(p1));
        }
        //判断马儿可以走1这个位置
        if ((p1.x = curPoint.x + 2) < X && (p1.y = curPoint.y + 1) < Y) {
            ps.add(new Point(p1));
        }
        //判断马儿可以走2这个位置
        if ((p1.x = curPoint.x + 1) < X && (p1.y = curPoint.y + 2) < Y) {
            ps.add(new Point(p1));
        }
        //判断马儿可以走3这个位置
        if ((p1.x = curPoint.x - 1) >= 0 && (p1.y = curPoint.y + 2) < Y) {
            ps.add(new Point(p1));
        }
        //判断马儿可以走4这个位置
        if ((p1.x = curPoint.x - 2) >= 0 && (p1.y = curPoint.y + 1) < Y) {
            ps.add(new Point(p1));
        }
        return ps;
    }

    //根据当前这个一步的所有的下一步的选择位置，进行非递减排序, 减少回溯的次数
    public static void sort(ArrayList<Point> ps) {
        ps.sort(new Comparator<Point>() {

            @Override
            public int compare(Point o1, Point o2) {
                // TODO Auto-generated method stub
                //获取到o1的下一步的所有位置个数
                int count1 = next(o1).size();
                //获取到o2的下一步的所有位置个数
                int count2 = next(o2).size();
                if(count1 < count2) {
                    return -1;
                } else if (count1 == count2) {
                    return 0;
                } else {
                    return 1;
                }
            }

        });
    }
}

```

