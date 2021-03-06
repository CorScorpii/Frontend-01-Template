# 有限状态机

## 每一个状态都是一个机器

- 在每一个机器里，我们可以做计算、存储、输出……
- 所有的这些机器接受的输入是一致的
- 状态机的每一个机器本身没有状态，如果我们用函数表示的话，它应该是纯函数（无副作用）

## 每一个机器知道下一个状态

- 每个机器都有确定的下一个状态（Moore）
- 每个机器根据输入决定下一个状态（Mealy）

## 使用有限状态机处理字符串

- 在一个字符串中，找到字符 "a"

  - ```javascript
    function match(string) {
      for (let c of string) {
        if (c == 'a') {
          return true
        }
      }
      return false
    }
    
    console.log(match('I am groot'))
    
    ```

    

- 在一个字符串中，找到字符 "ab"

  - ```javascript
    function match(string) {
      let foundA = false
      for (let c of string) {
        if (c == 'a') {
          foundA = true
        } else if (foundA && c == 'b') {
          return true
        } else {
          foundA = false
        }
      }
      return false
    }
    
    console.log(match('I abm groot'))
    
    ```

    

- 在一个字符串中，找到字符 "abcdef"

  - ```javascript
    function match(string) {
      let foundA = false
      let foundB = false
      let foundC = false
      let foundD = false
      let foundE = false
      for (let c of string) {
        if (c == 'a') {
          foundA = true
        } else if (foundA && c == 'b') {
          foundB = true
        } else if (foundB && c == 'c') {
          foundC = true
        } else if (foundC && c == 'd') {
          foundC = true
        } else if (foundD && c == 'e') {
          foundC = true
        } else if (foundE && c == 'f') {
          return true
        } else {
          foundA = false
          foundB = false
          foundC = false
          foundD = false
          foundE = false
        }
      }
      return false
    }
    
    console.log(match('I abcdefm groot'))
    
    ```

    

## JS中的有限状态机（Mealy）

- ```javascript
  //每一个函数是一个状态
  function state(input) //函数参数就是输入
  {
      //在函数中，可以自由地便携代码，处理每个状态的逻辑
      return next //返回值作为下一个状态
  }
  //以下是调用
  while(input){
      //获取输入
      state = state(input)//把状态机的返回值作为下一个状态
  }
  ```

- 在一个字符串中，找到字符 "abcdef"

  - ```javascript
    function match(string) {
      let state = start
      for (let c of string) {
        console.log(c)
        state = state(c)
      }
      return state === end
    }
    
    function start(c) {
      if (c === 'a') {
        return foundA
      } else {
        return start
      }
    }
    
    function end(c) {
      return end
    }
    
    function foundA(c) {
      if (c === 'b') {
        return foundB
      } else {
        return start
      }
    }
    
    function foundB(c) {
      if (c === 'c') {
        return foundC
      } else {
        return start
      }
    }
    
    function foundC(c) {
      if (c === 'd') {
        return foundD
      } else {
        return start
      }
    }
    
    function foundD(c) {
      if (c === 'e') {
        return foundE
      } else {
        return start
      }
    }
    
    function foundE(c) {
      if (c === 'f') {
        return end
      } else {
        return start
      }
    }
    
    console.log(match('I abcdefm groot'))
    
    ```

- 在一个字符串中，找到字符 "aabc"

  - ```javascript
    function match(string) {
      let state = start
      for (let c of string) {
        console.log(c)
        state = state(c)
      }
      return state === end
    }
    
    function start(c) {
      if (c === 'a') {
        return foundA
      } else {
        return start
      }
    }
    
    function end(c) {
      return end
    }
    
    function foundA(c) {
      if (c === 'b') {
        return foundB
      } else {
        return start(c)
      }
    }
    
    function foundB(c) {
      if (c === 'c') {
        return foundC
      } else {
        return start(c)
      }
    }
    
    function foundC(c) {
      if (c === 'd') {
        return end
      } else {
        return start
      }
    }
    
    
    console.log(match('I aabcm groot'))
    
    ```

- 如何用状态机处理诸如"abcabx"这样的字符串

  - ```javascript
    function match(string) {
      let state = start
      for (let c of string) {
        console.log(c)
        state = state(c)
      }
      return state === end
    }
    
    function start(c) {
      if (c === 'a') {
        return foundA
      } else {
        return start
      }
    }
    
    function end(c) {
      return end
    }
    
    function foundA(c) {
      if (c === 'b') {
        return foundB
      } else {
        return start(c)
      }
    }
    
    function foundB(c) {
      if (c === 'c') {
        return foundC
      } else {
        return start(c)
      }
    }
    
    function foundC(c) {
      if (c === 'a') {
        return foundA2
      } else {
        return start(c)
      }
    }
    
    function foundA2(c) {
      if (c === 'b') {
        return foundB2
      } else {
        return start(c)
      }
    }
    
    function foundB2(c) {
      if (c === 'x') {
        return end
      } else {
        return foundB(c)
      }
    }
    
    console.log(match('I abcabcabxm groot'))
    
    ```

- 作业：如何用状态机处理诸如"abababx"这样的字符串

  - ```javascript
    function match(string) {
      let state = start
      for (let c of string) {
        console.log(c)
        state = state(c)
      }
      return state === end
    }
    
    function start(c) {
      if (c === 'a') {
        return foundA
      } else {
        return start
      }
    }
    
    function end(c) {
      return end
    }
    
    function foundA(c) {
      if (c === 'b') {
        return foundB
      } else {
        return start(c)
      }
    }
    
    function foundB(c) {
      if (c === 'a') {
        return foundA2
      } else {
        return start(c)
      }
    }
    
    function foundA2(c) {
      if (c === 'b') {
        return foundB2
      } else {
        return start(c)
      }
    }
    
    function foundB2(c) {
      if (c === 'a') {
        return foundA3
      } else {
        return start(c)
      }
    }
    
    function foundA3(c) {
      if (c === 'b') {
        return foundB3
      } else {
        return start(c)
      }
    }
    
    function foundB3(c) {
      if (c === 'x') {
        return end
      } else {
        return foundB2(c)
      }
    }
    
    console.log(match('I abababxm groot'))
    
    ```

    

