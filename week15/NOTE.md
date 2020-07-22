# 1. 准备

准备工作阶段，我们跟 JSX 一样的。因为这些语法都是脱离了 HTML、CSS、JavaScript 的，所以还是需要通过 Babel 进行转换，然后通过 webpack 打包到一个文件内。



# 2. 解析 SFC

目前在社区中，没有单独解析 SFC 的插件，因此我们需要自己写一个 webpack 的 Loader 来解析 SFC。关于怎么写一个 Loader 可以先看看 webpack 官方的文章 [Writing a Loader](https://webpack.js.org/contribute/writing-a-loader/)。其实语法也比较简单，就是会把目标文件以字符串的方式传到 loader 文件中，然后 loader 文件要吐出来一个字符串。



## 配置环境

因此我们先创建一个 `mycomponent.view` 的文件，我们不是要实现 Vue 因此就用一个 .view 的后缀。最后的文件内容就是这样：

```html
<template>
  <div>
    <img />
  </div>
</template>
<script>
export default {
  el: "#example",
  data: {
    message: "Hello"
  },
  computed: {
    // a computed getter
    reversedMessage: function() {
      // `this` points to the vm instance
      let i = 1;
      while (i < 100) {
        i++;
      }
      let a = "<html>"
    }
  }
};
</script>
<style>
  .class {
    font-size: 20px;
  }
</style>
```



接下来就是要一个 loader 的解析文件，所以我们新建一个 `view-loader.js`

```javascript
// view-loader.js
module.exports = function (source, map) {
    console.log(source);
  return "";
}
```



然后就是将前面两个文件配置到 webpack，我们只要在 babel 的后面再添加一个规则即可。用来解析 .view 后缀的文件，并且解析的代码是我们前面创建的 `view-loader.js`。

```javascript
// view-loader.js
module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          },
        },
      },
      {
        test: /\.view$/,
        use: {
          loader: require.resolve("./src/view-loader.js"),
        },
      },
    ],
  },
  mode: "development",
  optimization: {
    minimize: false,
  },
};
```



最后就是 main.js 的代码，我们先把 `createElement`、`Wrapper`、`Text` 这几个函数抽出去放到 `createElement.js` 文件中：

```javascript
// createElement.js
export function createElement(Class, attrs, ...children) {
  let o;

  if (typeof Class === "string") {
    o = new Wrapper(Class);
  } else {
    o = new Class();
  }

  for (let name in attrs) {
    o.setAttribute(name, attrs[name]);
  }

  for (let child of children) {
    o.appendChild(child);
  }

  return o;
}

export class Wrapper {
  constructor(type) {
    this.root = document.createElement(type);
    this.children = [];
  }

  get style() {
    return this.root.style;
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  addEventListener() {
    this.root.addEventListener(...arguments);
  }

  mountTo(parent) {
    parent.appendChild(this.root);

    let visit = (children) => {
      for (let child of children) {
        if (Array.isArray(child)) {
          visit(child);
          continue;
        }
        if (typeof child === "string") {
          child = new Text(child);
        }
        child.mountTo(this.root);
      }
    };
    visit(this.children);
  }
}

export class Text {
  constructor(type) {
    this.root = document.createTextNode(type);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}
```



然后 main.js 中只需要用 import 引入 `MyComponent.view` 文件，然后正常使用这个 MyComponent 组件即可。

```javascript
// main.js
import { MyComponent } from "./MyComponent.view";

let component = new MyComponent();
component.mountTo(document.body);
console.log(component);
```



最后执行 `npx webpack` 打包。就得到 loader 的 console 输出：



可以看到 loader 的参数 source 就是我们的 MyComponent.view 的内容，也就是说我们自己的写的 loader 成功工作了。



## 完善 loader

现在我们的 loader 可以得到整个 view 文件的内容，那么我们要怎么解析这些 string 呢？其实解析文件都是先将文本解析成 AST，然后再根据 AST 输出成自己想要的东西。



### 解析文本

那么第一步就是将文本 --> AST，我们前面就说了 SFC 是一个类似 HTML 的格式，因此我们可以像解析 HTML 一样来解析 view。而我们在以前的课程中做过解析 HTML 的工作，因此我们可以直接拿过来用。



> 其实关于解析文本我们在 此处为语雀文档，点击链接查看：https://www.yuque.com/wendraw/fe/expression-parsing 中聊了非常多，感兴趣的同学可以回顾一下。



内容比较多就不贴代码了，直接引个 GitHub 的链接 [parser.js](https://github.com/wendraw/toyed-browser-tutorial/blob/master/clients/2-parseHTML/parser.js)。



因此我们直接在 view-loader.js 使用即可：

```javascript
// view-loader.js
const parser = require("./parser");

module.exports = function (source, map) {
  const tree = parser.parseHTML(source);
  console.log(tree);
  return "";
}
```

再次运行 `npx webpack` 打包之后，得到了一个报错。



我们发现这是 parser.js 内的报错，意思是说开始标签和结束标签对不上。我们进一步断点发现，栈顶的标签是 html，而现在的结束标签是 script。



这其实是我在 view 的 script 标签内放的一个小陷阱，因为我们在写 JS 代码时很可能用到 "<html>" 这样的字符串。而我们的解析器把 JS 代码中的字符串也识别成了 HTML 的标签，这样很明显是不对的。



这是因为我们之前在解析 HMTL 时偷懒了，只实现了 10 多种状态，其实在 [whatwg 的 tokenization](https://html.spec.whatwg.org/multipage/parsing.html#tokenization) 中定义 80 种状态，其中 script 相关的就有 16 种。有 `<script></script>` 和 `<!--<script></script>-->` 这两种，后一种情况我们暂时不考虑。



因此最后需要在 parser.js 中加上 script 相关的几个状态机。



这里额外需要讲的就是我们要怎么进入 scriptData 这个状态，其实就是当我们的解析器，解析到了 `<script>` 这样的开标签时，直到得到 </script> 闭标签。这中间都是 JS 代码，我们应该把它们识别成 text。



因此在 stack 顶部是 script 标签，并且当前的状态 state 是 data 的时候，就跳到 scriptData 状态，表示开始识别 JS 代码了。

```javascript
// parser.js
......
module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (let char of html) {
    state = state(char);
    if (stack[stack.length - 1].tagName === "script" && state === data) {
      state = scriptData;
    }
  }
  state = state(EOF);
  return stack[0];
};
```





### 输出文本

我们有了 DOM 树（很多同学经常叫 AST，其实 DOM 树跟 AST 还是有区别的，前者的构建不包含语义的元素，而 AST 是要考虑语义的成分）。接下来就是要从 DOM 树中取我们想要的东西，然后构建成字符串吐出去。那么我们想要的字符串到底是一个什么样的结构呢？



我们看一下 main.js 的使用，我们是希望最后的 MyComponent 是一个 class，可以直接通过 `mountTo` 挂到 document.body 上。



最后的 `view-loader.js` 代码就是这样：

```javascript
// view-loader.js
const parser = require("./parser");

module.exports = function (source, map) {
  const tree = parser.parseHTML(source);

  let template = null;
  let script = null;
  let style = null;
  for (let node of tree.children) {
    if (node.tagName === "template") {
      template = node.children.filter((e) => e.type !== "text")[0];
    }
    if (node.tagName === "script") {
      script = node.children[0].content;
    }
    if (node.tagName === "style") {
      style = node.children[0].content;
    }
  }

  let visit = (node) => {
    if (node.type === "text") {
      return JSON.stringify(node.content);
    }
    let attrs = {};
    for (let attr of node.attributes) {
      attrs[attr.name] = attr.value;
    }
    let children = node.children.map((node) => visit(node));
    return `createElement("${node.tagName}", ${JSON.stringify(
      attrs
    )}, ${children})`;
  };

  let result = `
import {createElement} from "./createElement"
export class MyComponent {
  render() {
    return ${visit(template)}
  }
  setAttribute(name, value) {
    this[name] = value;
  }
  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
  `;
  console.log(result);
  return result;
};
```

我们这里只处理了 `template` 部分的代码，`script` 和 `style` 都只是将内容取出来，还没有用到（这部分的内容我们后面再用）。



然后我们的组件最终还是落实到了 createElement 上，每一个标签我们都用 createElement 来包装。最后就会得到一个嵌套的 createElement。使用 `npx webpack` 打包之后就能看到转化之后的文本



# 3. 检验结果

然后我们再用一个 index.html 来将 dist 文件中编译后的 main.js 运行起来，就得到了一个正确的树形结构

```html
<body></body>
<script src="../dist/main.js"></script>
```

# 4. 混合 JSX

到这一步，我们已经自己完全实现了 React 中的 JSX 和 Vue 中的 SFC。其实我们不用把它们孤立的看待，它们完全可以结合起来一起使用。比如，我觉得 main.js 中的 new MyComponent() 这个操作太丑了，我就想要用 JSX 这种风格来写。



当然 JSX 的 babel-loader 插件要先加上：

```javascript
// webpack.config.js
use: {
  loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            {
              pragma: "createElement",
            },
          ],
        ],
    },
}
```



然后我们的 `main.js` 就可以直接用 JSX了。

```javascript
// main.js
import { createElement } from "./createElement";
import { MyComponent } from "./MyComponent.view";

let component = <MyComponent id="idx" name="SFC and JSX" />;

component.mountTo(document.body);
console.log(component);
```



最后的效果跟直接 `new MyComponent()` 来创建组件的效果是一样的。



# 总结

 Vue 中应用组件化的思想 SFC。跟 React 的 JSX 不一样，Vue 更贴近 HTML 的方式。这其实就是不同 UI 框架所提供的编程范式，是不同设计者的智慧。而我们学习框架不能光停留在这些 API 的表面，我们要深入到原理。其实不管是 SFC 还是 JSX，在用解析器去掉外面那一层“糖衣”之后，最终的组件化设计都是落到了我们的 `createElement.js` 的设计。