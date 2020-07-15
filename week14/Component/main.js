function create(Cls, attributes, ...children) {
  //   console.log(arguments)

  let o

  if (typeof Cls === 'string') {
    o = new Wrapper(Cls)
  } else {
    o = new Cls({
      timer: {},
    })
  }

  for (let name in attributes) {
    // o[name] = attributes[name]
    o.setAttribute(name, attributes[name])
  }

  //   console.log(children)
  for (let child of children) {
    if (typeof child === 'string') {
      child = new Text(child)
    }
    // console.log(child)
    o.appendChild(child)
    // o.children.push(child)
  }
  return o
}

class Text {
  constructor(text) {
    this.children = []
    this.root = document.createTextNode(text)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class Wrapper {
  constructor(type) {
    this.children = []
    this.root = document.createElement(type)
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }

  appendChild(child) {
    this.children.push(child)
  }

  mountTo(parent) {
    parent.appendChild(this.root)

    for (let child of this.children) {
      child.mountTo(this.root)
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////////////
class MyComponent {
  constructor(config) {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
    // this.root = document.createElement('div')
    // console.log('config', config)
  }
  //property
  //   set class(v) {
  //     console.log('Parent::class', v)
  //   }
  //   set id(v) {
  //     console.log('Parent::id', v)
  //   }

  //attribute
  setAttribute(name, value) {
    this.attributes.set(name, value)
    // console.log(name, value)
  }

  set title(value) {
    this.properties.set('title', value)
  }

  appendChild(child) {
    this.children.push(child)
  }

  mountTo(parent) {
    this.slot = <div></div>
    for (let child of this.children) {
      this.slot.appendChild(child)
    }
    this.render().mountTo(parent)
  }

  render() {
    return (
      <article>
        <h1>{this.attributes.get('title')}</h1>
        <h2>{this.properties.get('title')}</h2>
        <header>I'm a header</header>
        {this.slot}
        <footer>I'm a footer</footer>
      </article>
    )
  }

  //children
  //   appendChild(child) {
  //     console.log(child)
  //   }
}

// class Child {
//   constructor(config) {
//     this.children = []
//     this.root = document.createElement('div')
//   }

//   setAttribute(name, value) {
//     this.root.setAttribute(name, value)
//   }

//   appendChild(child) {
//     child.mountTo(this.root)
//   }

//   mountTo(parent) {
//     parent.appendChild(this.root)
//   }
// }

// let component = (
//   <div
//     id="a"
//     class="b"
//     style="width:100px; height:100px;background-color:pink;"
//   >
//     <div></div>
//     <p></p>
//     <div></div>
//     <div></div>
//   </div>
// )

// let component = <div>Hello</div>

let component = (
  <MyComponent title="I'm a title">
    <div>Hello World</div>
  </MyComponent>
)
component.title = "I'm a title 2"

component.mountTo(document.body)
// component.id = 'c'

console.log(component)
