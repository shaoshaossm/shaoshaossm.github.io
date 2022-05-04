---
title: java数据结构和算法(六)
top: false
cover: false
toc: true
mathjax: true
date: 2021-10-13 16:05:32
password:
summary: 图(深度优先遍历和广度优先遍历)o((>ω< ))oo((>ω< ))o---------------------
tags: java
categories: 数据结构和算法
---

### <center> 图

- 图的表示方式有两种：二维数组表示（邻接矩阵）；链表表示（邻接表）。
- <font color = "red">邻接矩阵</font>是表示图形中顶点之间相邻关系的矩阵，对于n个顶点的图而言，矩阵是的row和col表示的是1....n个点。 

![邻接矩阵](https://img-blog.csdnimg.cn/87a6a3bb7a864acd96c6f55042a36a64.png)

- <font color = "red">邻接表</font>的实现只关心存在的边，不关心不存在的边。因此没有空间浪费，邻接表由数组+链表组成  

![邻接表](https://img-blog.csdnimg.cn/ab8291a09fb94b5fa9a08681073a7358.png)

**图的遍历** : 即是对结点的访问。  

**图的深度优先搜索(Depth First Search)** 。

![深度优先遍历](https://img-blog.csdnimg.cn/c8da20681b0044d1911c78b1a2e04fbc.png)

- 深度优先遍历，从初始访问结点出发，初始访问结点可能有多个邻接结点，深度优先遍历的策略就是首先访问第一个邻接结点，然后再以这个被访问的邻接结点作为初始结点，访问它的第一个邻接结点， 可以这样理解：每次都在访问完**当前结点**后首先访问**当前结点的第一个邻接结点**。
- 我们可以看到，这样的访问策略是优先往纵向挖掘深入，而不是对一个结点的所有邻接结点进行横向访问。
- 显然，深度优先搜索是一个递归的过程

**深度优先遍历算法步骤**

- 访问初始结点v，并标记结点v为已访问。

- 查找结点v的第一个邻接结点w。

- 若w存在，则继续执行4，如果w不存在，则回到第1步，将从v的下一个结点继续。

- 若w未被访问，对w进行深度优先遍历递归（即把w当做另一个v，然后进行步骤123）。

- 查找结点v的w邻接结点的下一个邻接结点，转到步骤3。

**图的广度优先搜索(Broad First Search)** 。

![广度优先遍历](https://img-blog.csdnimg.cn/81a67600922a4054b118d6f7f3f9c968.png)

- 类似于一个分层搜索的过程，广度优先遍历需要使用一个队列以保持访问过的结点的顺序，以便按这个顺序来访问这些结点的邻接结点

**广度优先遍历算法步骤**

- 访问初始结点v并标记结点v为已访问。

-  结点v入队列

- 当队列非空时，继续执行，否则算法结束。

- 出队列，取得队头结点u。

- 查找结点u的第一个邻接结点w。

- 若结点u的邻接结点w不存在，则转到步骤3；否则循环执行以下三个步骤：
  - 若结点w尚未被访问，则访问结点w并标记为已访问。 
  - 结点w入队列 
  - 查找结点u的继w邻接结点后的下一个邻接结点w，转到步骤6。

代码实现

```java
package com.ssm.graph;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;

/**
 * @author shaoshao
 * @version 1.0
 * @date 2021/10/13 18:18
 */
public class Graph {
    private ArrayList<String> vertexList; //存储顶点的集合
    private int[][] edges;//存储图对应的邻接矩阵
    private int numOfEdge; // 表示边的数目
    private boolean[] isVisited; //


    public static void main(String[] args) {
        int n = 8;
        //String[] vertexs = {"A", "B", "C", "D", "E"};
        String[] vertexs = {"1", "2", "3", "4", "5", "6", "7", "8"};
        Graph graph = new Graph(n);
        //添加顶点
        for (String vertex : vertexs
        ) {
            graph.insertVertex(vertex);
        }
        //添加边
        /*graph.insertEdge(0, 1, 1); // A-B
        graph.insertEdge(0, 2, 1); // A-C
        graph.insertEdge(1, 2, 1);
        graph.insertEdge(1, 3, 1);
        graph.insertEdge(1, 4, 1);*/
        graph.insertEdge(0, 1, 1);
        graph.insertEdge(0, 2, 1);
        graph.insertEdge(1, 3, 1);
        graph.insertEdge(1, 4, 1);
        graph.insertEdge(3, 7, 1);
        graph.insertEdge(4, 7, 1);
        graph.insertEdge(2, 5, 1);
        graph.insertEdge(2, 6, 1);
        graph.insertEdge(5, 6, 1);
        graph.showGarph();
        System.out.println("深度优先遍历");
        graph.dfs();
        System.out.println();
        System.out.println("广度优先遍历");
        graph.bfs();
    }

    public Graph(int n) {
        edges = new int[n][n];
        vertexList = new ArrayList<String>(n);
        numOfEdge = 0;

    }

    //得到第一个邻接点的下标
    public int getFirstNeighbor(int index) {
        for (int i = 0; i < vertexList.size(); i++) {
            if (edges[index][i] > 0) {
                return i;
            }
        }
        return -1;
    }

    //根据前一个邻接结点的下标来获取下一个邻接结点
    public int getNextNeighbor(int v1, int v2) {
        for (int i = v2 + 1; i < vertexList.size(); i++) {
            if (edges[v1][i] > 0) {
                return i;
            }
        }
        return -1;
    }

    //深度优先遍历 i 第一次是0
    private void dfs(boolean[] isVisited, int i) {
        System.out.print(getValByIndex(i) + "->");
        isVisited[i] = true;
        int w = getFirstNeighbor(i);
        while (w != -1) {
            if (!isVisited[w]) { //说明有
                dfs(isVisited, w);
            }
            //如果w结点已经被访问过
            w = getNextNeighbor(i, w);
        }
    }

    //对dfs重载 遍历所有的结点
    public void dfs() {
        isVisited = new boolean[vertexList.size()];
        for (int i = 0; i < getNumOfVertex(); i++) {
            if (!isVisited[i]) {
                dfs(isVisited, i);
            }
        }
    }

    //广度优先遍历
    private void bfs(boolean[] isVisited, int i) {
        int u; //队列头结点对应的下标
        int w; //邻接点w
        //记录结点访问顺序
        LinkedList linkedList = new LinkedList();
        System.out.print(getValByIndex(i) + "->");
        isVisited[i] = true;
        linkedList.addLast(i);
        while (!linkedList.isEmpty()) {
            //取出队列头结点的下标
            u = (Integer) linkedList.removeFirst();
            // 得到第一个邻接结点的下标
            w = getFirstNeighbor(u);
            while (w != -1) {
                if (!isVisited[w]) {
                    System.out.print(getValByIndex(w) + "->");
                    isVisited[w] = true;
                    linkedList.addLast(w);
                }
                //以u为前驱结点,找w后面的下一个邻接结点
                w = getNextNeighbor(u, w); //体现出广度优先
            }
        }

    }

    //bfs重载 遍历所有的结点
    public void bfs() {
        isVisited = new boolean[vertexList.size()];
        for (int i = 0; i < getNumOfVertex(); i++) {
            if (!isVisited[i]) {
                bfs(isVisited, i);
            }
        }
    }


    //返回节点的个数
    public int getNumOfVertex() {
        return vertexList.size();
    }

    //返回边的个数
    public int getNumOfEdge() {
        return numOfEdge;
    }

    //返回结点i(下标)对应的数据
    public String getValByIndex(int i) {
        return vertexList.get(i);
    }

    //返回v1 v2的权值
    public int getWeight(int v1, int v2) {
        return edges[v1][v2];
    }

    //插入节点
    public void insertVertex(String vertex) {
        vertexList.add(vertex);
    }

    //添加边

    /**
     * @param v1     表示点的下标即是第几个顶点
     * @param v2     第二个顶点对应的下标
     * @param weight
     */
    public void insertEdge(int v1, int v2, int weight) {
        edges[v1][v2] = weight;
        edges[v2][v1] = weight;
        numOfEdge++;

    }

    //显示图对应的矩阵
    public void showGarph() {
        for (int[] link : edges
        ) {
            System.out.println(Arrays.toString(link));
        }
    }

}

```

运行结果

```java
[0, 1, 1, 0, 0, 0, 0, 0]
[1, 0, 0, 1, 1, 0, 0, 0]
[1, 0, 0, 0, 0, 1, 1, 0]
[0, 1, 0, 0, 0, 0, 0, 1]
[0, 1, 0, 0, 0, 0, 0, 1]
[0, 0, 1, 0, 0, 0, 1, 0]
[0, 0, 1, 0, 0, 1, 0, 0]
[0, 0, 0, 1, 1, 0, 0, 0]
深度优先遍历
1->2->4->8->5->3->6->7->
广度优先遍历
1->2->3->4->5->6->7->8->
```

![图例示意图](https://img-blog.csdnimg.cn/0aad0e90501848ab902885bc5c938795.png)







