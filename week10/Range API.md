# Range API

## 一个问题

- 把一个元素所有的子元素逆序

  - 1 2 3 4 5 **→** 5 4 3 2 1

    - ```html
      <!--把一个元素的子元素逆序-->
      <html>
      <div id="a">
          <span>1</span>
          <p>2</p>
          <a>3</a>
          <div>4</div>
      </div>
      
      <script>
          let element = document.getElementById('a')
      
          //基础答案
          function reverseChildren1(element) {
              let children = Array.prototype.slice.call(element.childNodes)
      
              element.innerHTML = ''
      
              children.reverse()
      
              for (let child of children) {
                  element.appendChild(child)
              }
          }
      
          //进阶答案
          function reverseChildren2(element) {
              let l = element.childNodes.length
              where(l-- > 0){
                  element.appendChild(element.childNodes[l])
              }
          }
      
          //满分答案
          function reverseChildren(element) {
              let range = new Range()
              range.selectNodeContents(element)
      
              //在fragment上操作没有重排和重绘
              let fragment = range.extractContents()
              let l = fragment.childNodes.length
              while (l-- > 0) {
                  fragment.appendChild(fragment.childNodes[l])
              }
              element.appendChild(fragment)
          }
          reverseChildren(element)
      
      </script>
      
      </html>
      ```

  - 获取range
    - ```javascript
      var range = new Range()
      range.setStart(element, 9) //设置起点，可设置到文本节点里面的单个文字的前后
      range.setEnd(element, 4) //设置终点，可设置到文本节点里面的单个文字的前后
      var range = document.getSelection().getRangeAt(0)
      ```

  - 快捷操作

    - ```javascript
      range.setStartBefore
      range.setEndBefore
      range.setStartAfter
      range.setEndAfter
      range.selectNode
      range.selectNodeContents
      ```

  - 摘出内容与插入Node

    - ```javascript
      var fragment = range.extractContents()//fragment是一种文档片段，当append一个fragment到一个节点的时候，它会把自身的子元素全部append上去，它自己还在外面，DOM树是永远不会出现fragment这样一个节点的
      range.insertNode(document.createTextNode('aaa'))//可以在文本之间插入，非常精细
      ```

  - 示例1，切HTML节点

    - ```html
      <html>
      <div id="a">123<span style="background-color: pink">456789</span>0123456789</div>
      <script>
          let range = new Range()
          //移除7890123
          range.setStart(document.getElementById('a').childNodes[1].childNodes[0], 3)
          range.setEnd(document.getElementById('a').childNodes[2], 3)
          range.extractContents()
          //移除456789012
          range.setStart(document.getElementById('a').childNodes[1].childNodes[0], 0)
          range.setEnd(document.getElementById('a').childNodes[2], 3)
          range.extractContents()
          //移除整个span和012
          range.setStart(document.getElementById('a').childNodes[0], 3)
          range.setEnd(document.getElementById('a').childNodes[2], 3)
          range.extractContents()
      </script>
      
      </html>
      ```

  - 示例二，切Style节点

    - ```html
      <html>
      <style title="Hello">
          a::before {
              color: red;
              content: 'Hello'
          }
      </style>
      <link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">
      <a> world</a>
      <script>
          document.styleSheets[0].cssRules[0].style.color = "lightgreen"
          document.styleSheets[0].cssRules[0].style.fontSize = "40px"
          let range = new Range()
          range.selectNodeContents(document.getElementsByTagName('style')[0])
          range.extractContents()
      </script>
      
      </html>
      ```

      

    

# CSSOM

## document.styleSheets

- 案例

  - ```html
    <html>
    <style title="Hello">
        a {
            color: red
        }
    </style>
    <link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">
    
    </html>
    ```

  - ![styleSheets](F:\资料\前端训练营\Week_10\styleSheets.png)

- Rules

  - ```javascript
    document.styleSheets[0].cssRules
    document.styleSheets[0].insertRule("p {color:pink;}",0)
    document.styleSheets[0].removeRule(0)
    ```

  - 示例

    - ```html
      <html>
      <style title="Hello">
          a::before {
              color: red;
              content: 'Hello'
          }
      </style>
      <link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">
      <a> world</a>
      <script>
          document.styleSheets[0].cssRules[0].style.color = "lightgreen"
          document.styleSheets[0].cssRules[0].style.fontSize = "40px"
          document.styleSheets[0].cssRules[0].style.content = "xxx"//不生效，content没法改
          document.styleSheets[0].deleteRule(0)
          document.styleSheets[0].insertRule("a::before { color: lightgreen; content: \"Hello2\"; font-size: 40px; }")
      </script>
      
      </html>
      ```

      

## Rule

- CSSStyleRule
- CSSCharsetRule
- CSSImportRule
- CSSMediaRule
- CSSFontFaceRule
- CSSPageRule
- CSSNamespaceRule
- CSSKeyframesRule
- CSSKeyframeRule
- CSSSupportsRule

-  CSSStyleRule

  - selectorText String

  - style K-V结构

  - 示例

    - ```html
      <html>
      <style title="Hello">
          a::before {
              color: red;
              content: 'Hello'
          }
      </style>
      <link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">
      <a> world</a>
      <script>
          document.styleSheets[0].cssRules[0].style.color = "lightgreen"
          document.styleSheets[0].cssRules[0].style.fontSize = "40px"
          document.styleSheets[0].cssRules[0].style.content = "xxx"//不生效，content没法改
          document
      </script>
      
      </html>
      ```

## getComputedStyle

- window.getComputedStyle(elt, pseudoElt)
  - elt 想要获取的元素
  - pseudoElt 可选，伪元素

##  View部分

- window API

  - ```javascript
    let childWindow = window.open("about:blank","_blank")
    let childWindow = window.open("about:blank","_blank","width=100,height=100,left=100,top=100")
    childWindow.moveBy(-50,-50)
    childWindow.resizeBy(50,50)
    //只能移动childWindow，不能移动自己
    window.innerHeight
    window.innerWidth
    document.documentElement.getBoundingClientRect()//和window.innerHeight，window.innerWidth尺寸一样
    window.outerHeight
    window.outerWidth
    window.devicePixelRatio//设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。
    ```

- 滚动 API

  - ```javascript
    //视口滚动
    window.scrollX
    window.scrollY
    window.scroll(0,30)//绝对值
    window.scrollTo(0,50)//绝对值
    window.scrollBy(0,8)//差量
    //元素滚动
    $0.scroll(x,y)
    $0.scrollTo(x,y)
    $0.scrollBy(x,y)
    $0.scrollTop
    $0.scrollLeft
    $0.scrollHeight
    ```

- getClientRects

  - ```html
    <html>
    <!--inline元素会产生多个盒（rects），伪元素生成的盒不会被记录到rects里面，因为伪元素其实是一个子元素的概念-->
    <style>
        .x::before {
            content: '额外'
        }
    </style>
    
    <div style="width:100px; height:400px; overflow:scroll;">
        文字<span class="x" style="background-color: lightcoral; line-height:1.5;">
            文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
        </span>
    </div>
    <script>
        $0.getClientRects()
    </script>
    
    </html>
    ```

- getBoundingClientRects

  - ```html
    <html>
    <!--获取包裹所有盒的外圈大小用getBoundingClientRects。它会受外部容器scroll的影响，是根据实际渲染所占用的区域来的。不会超出可见区域-->
    <style>
        .x::before {
            content: '额外'
        }
    </style>
    
    <div style="width:100px; height:400px; overflow:scroll;">
        文字<span class="x" style="background-color: lightcoral; line-height:1.5;">
            文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字 文字
        </span>
    </div>
    <script>
        $0.getClientRects()
        $0.getBoundingClientRect()
    </script>
    
    </html>
    ```

    

