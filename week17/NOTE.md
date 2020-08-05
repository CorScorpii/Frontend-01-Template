## 匿名函数递归

[Y Combinator](http://kestas.kuliukas.com/YCombinatorExplained/)

 http://kestas.kuliukas.com/YCombinatorExplained/

```javascript
//yc here
var y = (g) => ((f) => f(f))((self) => g((...args) => self(self)(...args)))

//use yc
var f = y((self) => (n) => (n < 0 ? 0 : n + self(n - 1)))

f(100) // 5050

```

## 工具分类

![tools](https://github.com/CorScorpii/Frontend-01-Template/raw/master/week17/tools.png)

## 工具链

### 工具链

#### Yeoman

> Yeoman是现代化前端项目的脚手架工具，用于生成包含指定框架结构的工程化目录结构。

Step:

- 全局安装 yo

```
npm install -g yo
```

or

```
yarn global add yo
```

- 创建自定义工具工程
  - 需要以 generator 开头
  - 安装依赖

```
  npm install yeoman-generator
```

or

```
  yarn add yeoman-generator
```

- 创建工程结构
  - generator
    - app
      - index.js
- 集成并实现 generator

```javascript
  var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  flow steps
  // 处理 自动运行的流程
}
```

[YEOMAN](https://yeoman.io/)

