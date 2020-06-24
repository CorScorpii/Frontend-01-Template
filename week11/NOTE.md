# 异步编程

在没有异步编程的情况下，其实很多的场景是不能很好的实现的，通过setTimeout这个api能做到很多的事情，但是在原有JS的基础上，新标准（ES5之后）带来的generator和promise都更好的解决了异步编程的问题，同时也提供了then这样的方法，使得回掉地狱也变成了过去式。

几种可以实现异步的方式：

- setTimeout()
- Promise
- async/await
- generator/iterator

```javascript
function* g{
    yield 1;
    yield 2;
    yield 3;
}

for(v of g()){
    console.log(v)
}

async function* ag(){
    let i=0;
    while(true){
        await sleep(1000);
        yield i++;
    }
}

for await(let v of ag()){
    console.log(v)
}
```



## 寻路算法

[![寻路](https://github.com/TurnerXi/Frontend-01-Template/raw/master/documents/images/%E5%AF%BB%E8%B7%AF.png)](https://github.com/TurnerXi/Frontend-01-Template/blob/master/documents/images/寻路.png)

> 寻路问题本质上是在平面上的搜索问题，由起始点出发，逐渐向四周扩散，直到找到目标位置，期间可以通过一定手段简化搜索路径

### 路径编辑器

制作思路：

1. 绘制 100*100 的地图——一维数组
2. 通过鼠标绘制和擦除障碍物——mouseup、mouseover/mousemove、mousedown 事件
3. 保存地图——localStorage

### 搜索目标点

#### 思路

1. 获取起始点坐标
2. 根据起始点坐标扩展（8 个方向），并标记扩展坐标
3. 遇到障碍物或边界停止扩展
4. 不能重复访问已扩展的坐标
5. 返回搜索最佳路径

#### 技巧

使用可视化手段和异步编程查看整个搜索过程。

#### 算法

- 广度优先搜索——队列
- 深度优先搜索——栈
- A*——数组/二叉堆