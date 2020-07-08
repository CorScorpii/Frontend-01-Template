# Proxy

Vue3.0为什么要用proxy
- 在新加属性时 get 和set 收集不到

```javascript
        let object = {
            a: 1,
            b: 2
        }

        let proxy = new Proxy(object, {
            get(obj, prop) {
                console.log(obj, prop);
            },
            defineProperty() {
                console.log(arguments)
            }
        });

        proxy.a // {a: 1, b: 2} "a"
        Object.defineProperty(proxy, 'a', {value: 1}) // Arguments(3) [{…}, "a", {…}, callee: ƒ, Symbol(Symbol.iterator): ƒ]

        // 给defineproperty增加返回值
        let proxy = new Proxy(object, {
            get(obj, prop) {
                console.log(obj, prop);
            },
            defineProperty(ob, prop, desc) {
                return Object.defineProperty(obj, prop, desc);
            }
        });

         Object.defineProperty(proxy, 'a', {value: 1}); // {a: 1, b: 1}\ a \{value: 10}
```

# Range

思考以下代码会出现的问题

1.以下代码在mousemove时即会触发

```javascript
let draggable = document.getElementById('draggable')
draggable.addEventListener('mousedown', (event) => {})

draggable.addEventListener('mousemove', (event) => {})

draggable.addEventListener('mouseup', (event) => {})
```

2.mousemove mouseup 不一定从draggable上监听 并且要在mouseup中把事件清理掉

```javascript
let draggable = document.getElementById('draggable')
draggable.addEventListener('mousedown', (event) => {})

document.addEventListener('mousemove', (event) => {})

document.addEventListener('mouseup', (event) => {})
```

3.在移动时会先跳到当前鼠标点击的区域

```javascript
let draggable = document.getElementById('draggable')
draggable.addEventListener('mousedown', (event) => {
  let move = (event) => {
    let x = event.clientX,
      y = event.clientY

    draggable.style.transform = `translate(${x}px, ${y}px)`
  }

  let up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
})

```

问题解析：在mousedown时记录点击的坐标，并且在mousemove时减掉初始坐标值

```javascript
let draggable = document.getElementById('draggable')
draggable.addEventListener('mousedown', (event) => {
  let startX = event.clientX,
    startY = event.clientY
  let move = (event) => {
    let x = event.clientX - startX,
      y = event.clientY - startY

    draggable.style.transform = `translate(${x}px, ${y}px)`
  }

  let up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
})
```

# 组件化基础

- 对象 - Properties - Methods - Inherit

- 组件 - Properties - Methods - Inherit - Attribute - Config & State - Event - Lifecycle - Children

- Attribute vs Property

  - Attribute 强调属性

  - Property 强调从属关系

  - 第一种类型区别 实际一样 名字不同

    - case 1

      ```javascript
          // Attribute:
          <my-component attribute="v" />
          myComponent.getAttribute("a");
          myComponent.setAttribute("a", "value");
      
          // Property
          myComponent.a = "value";
      ```

    - case2

      ```html
          <div class="cls1 cls2"></div>
          <script>
              var div = document.getElementByTagName('div');
      
              div.className; // cls1 cls2
          </script>
      ```

  - 第二种区别 语义相通 调用方式不一样

    - case1

      ```javascript
          var div = document.getElementByTagName('div');
          div.style // 对象
      ```

  - 其他

    - case1

      ```html
          <a href="//m.taobao.com"></a>
          <script>
              var a = document.getElementsByTagName('a');
      
              a.href // "http://m.taobao.com" 这个url是resolve过的结果
      
              a.getAttribute('href'); // m.taobao.com 跟html代码中完全一致m.
          </script>
      ```

    - case2

      ```html
          <input value="cute"></input>
          <script>
              var input = document.getElementsByTagname("input")[0]; // 若property没有设置，则结果是Attribute
      
              input.value // cute
      
              input.getAttribute("value") // cute
      
              input.value = "hello"; // 若value属性已经设置 则attribute不变，property变化 元素实际上的效果是property优先
              input.value // hello
              input.getAttribute("value") // cute
          </script>
      ```

- 如何设置组件状态 | Markup set | JS set | JS Change | user Input Change | item | ---- | ---- | ---- | ---- | ---- | ----
  | false | true | true | ? | property | true | true | true | ? | attribute | false | false | flase | true | state | false | true | flase | flase | config

- Lifecycle [lifeCycle](https://github.com/VvVs/Frontend-01-Template/blob/master/week13/component/lifeCycle.jpg)

- Children

  - Content型children

    ```html
        <my-button>
            <img src="{{icon}}">{{title}}</img>
        </my-button>
    ```

  - Template型children

    ```html
        <my-list data>
            <li>
                <img src="{{icon}}">{{title}}</img>
            </li>
        </my-list>
    ```