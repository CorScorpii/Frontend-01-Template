# JavaScript中对象的分类

- 宿主对象（host Objects）：由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。
- 内置对象（Built-in Objects）：由 JavaScript 语言提供的对象。
  - 固有对象（Intrinsic Objects ）：由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。
  - 原生对象（Native Objects）：可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象。
- 普通对象（Ordinary Objects）：由 {} 语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承。

## 宿主对象

- 浏览器环境
  - window
  - document.createElement

## 固有对象

- 获取全部JavaScript固有对象

- ```javascript
  
  var set = new Set();
  var objects = [
      eval,
      isFinite,
      isNaN,
      parseFloat,
      parseInt,
      decodeURI,
      decodeURIComponent,
      encodeURI,
      encodeURIComponent,
      Array,
      Date,
      RegExp,
      Promise,
      Proxy,
      Map,
      WeakMap,
      Set,
      WeakSet,
      Function,
      Boolean,
      String,
      Number,
      Symbol,
      Object,
      Error,
      EvalError,
      RangeError,
      ReferenceError,
      SyntaxError,
      TypeError,
      URIError,
      ArrayBuffer,
      SharedArrayBuffer,
      DataView,
      Float32Array,
      Float64Array,
      Int8Array,
      Int16Array,
      Int32Array,
      Uint8Array,
      Uint16Array,
      Uint32Array,
      Uint8ClampedArray,
      Atomics,
      JSON,
      Math,
      Reflect];
  objects.forEach(o => set.add(o));
  
  for(var i = 0; i < objects.length; i++) {
      var o = objects[i]
      for(var p of Object.getOwnPropertyNames(o)) {
          var d = Object.getOwnPropertyDescriptor(o, p)
          if( (d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
              if(!set.has(d.value))
                  set.add(d.value), objects.push(d.value);
          if( d.get )
              if(!set.has(d.get))
                  set.add(d.get), objects.push(d.get);
          if( d.set )
              if(!set.has(d.set))
                  set.add(d.set), objects.push(d.set);
      }
  }
  ```

  

## 原生对象

![Object Types](G:\Frontend-01-Template\week03\Object Types.png)

- 几乎所有这些构造器的能力都是无法用纯JavaScript代码实现的，它们也无法用class/extend语法来继承
- 这些构造器创建的对象多数使用了私有字段，例如：
  - Error: [[ErrorData]]
  - Boolean: [[BooleanData]]
  - Number: [[NumberData]]
  - Date: [[DateValue]]
  - RegExp: [[RegExpMatcher]]
  - Symbol: [[SymbolData]]
  - Map: [[MapData]]
- 这些字段似的原型继承方法无法正常工作，所以我们可以认为，所有这些原生对象都是为了特定能力或者性能，而设计出来的“特权对象”

## 特殊行为的对象

除了上面介绍的对象之外，在固有对象和原生对象中，有一些对象的行为跟正常对象有很大区别。它们常见的下标运算（就是使用中括号或者点来做属性访问）或者设置原型跟普通对象不同

- Array：Array 的 length 属性根据最大的下标自动发生变化。
- Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
- String：为了支持下标运算，String 的正整数属性访问会去字符串里查找。
- Arguments：Arguments 的非负整数型下标属性跟对应的变量联动。
- 模块的 namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。
- 类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
- Immutable Prototype：[[Prototype]]一旦初始化就无法更改。
- bind 后的 function：跟原来的函数相关联
- Proxy：每个Proxy都有一个[[ProxyHandler]]和一个[[ProxyTarget]]，他们的值是一个object或者null

