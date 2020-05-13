# Realm中的对象

```javascript
  var set = new Set()
  var globalProperties = [
    'eval',
    'isFinite',
    'isNaN',
    'parseFloat',
    'parseInt',
    'decodeURI',
    'decodeURIComponent',
    'encodeURI',
    'encodeURIComponent',
    'Array',
    'Date',
    'RegExp',
    'Promise',
    'Proxy',
    'Map',
    'WeakMap',
    'Set',
    'WeakSet',
    'Function',
    'Boolean',
    'String',
    'Number',
    'Symbol',
    'Object',
    'Error',
    'EvalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError',
    'ArrayBuffer',
    'SharedArrayBuffer',
    'DataView',
    'Float32Array',
    'Float64Array',
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Uint8Array',
    'Uint16Array',
    'Uint32Array',
    'Uint8ClampedArray',
    'Atomics',
    'JSON',
    'Math',
    'Reflect',
  ]

  var queue = []

  for (var p of globalProperties) {
    queue.push({
      path: [p],
      object: this[p],
    })
  }

  let current

  while (queue.length) {
    current = queue.shift()
    console.log(current.path.join('.'))
    if (set.has(current.object)) {
      continue
    }
    set.add(current.object)

    let proto = Object.getPrototypeOf(current.object)
    if (proto) {
      queue.push({
        path: current.path.concat(['__proto__']),
        object: proto,
      })
    }

    for (let p of Object.getOwnPropertyNames(current.object)) {
      var property = Object.getOwnPropertyDescriptor(current.object, p)

      if (
        property.hasOwnProperty('value') &&
        ((property.value !== null && typeof property.value === 'object') ||
          typeof property.value === 'function') &&
        property.value instanceof Object
      ) {
        queue.push({
          path: current.path.concat([p]),
          object: property.value,
        })

        if (
          property.hasOwnProperty('get') &&
          typeof property.set === 'function'
        ) {
          queue.push({
            path: current.path.concat([p]),
            object: property.get,
          })
        }

        if (
          property.hasOwnProperty('set') &&
          typeof property.set === 'function'
        ) {
          queue.push({
            path: current.path.concat([p]),
            object: property.set,
          })
        }
      }
    }
  }
```

# AntV-G6可视化

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AntV G6 Demo</title>
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.4.7/dist/g6.min.js"></script>
</head>

<body>
    <div id="realm-container"></div>
</body>
<script type="text/javascript">
    const getInitData = () => {
        const globalProperties = [
            "eval",
            "isFinite",
            "isNaN",
            "parseFloat",
            "parseInt",
            "decodeURI",
            "decodeURIComponent",
            "encodeURI",
            "encodeURIComponent",
            "Array",
            "Date",
            "RegExp",
            "Promise",
            "Proxy",
            "Map",
            "WeakMap",
            "Set",
            "WeakSet",
            "Function",
            "Boolean",
            "String",
            "Number",
            "Symbol",
            "Object",
            "Error",
            "EvalError",
            "RangeError",
            "ReferenceError",
            "SyntaxError",
            "TypeError",
            "URIError",
            "ArrayBuffer",
            "SharedArrayBuffer",
            "DataView",
            "Float32Array",
            "Float64Array",
            "Int8Array",
            "Int16Array",
            "Int32Array",
            "Uint8Array",
            "Uint16Array",
            "Uint32Array",
            "Uint8ClampedArray",
            "Atomics",
            "JSON",
            "Math",
            "Reflect"
        ];

        const set = new Set();

        const globalObject = {
            id: "Global Object",
            children: [

            ]
        }

        for (let i of globalProperties) {
            globalObject.children.push({
                children: [],
                id: i
            })
        }

        for (let i = 0; i < globalProperties.length; i++) {
            const current = globalProperties[i]
            if (set.has(globalProperties[i]))
                continue;
            set.add(globalProperties[i])
            for (let p of Object.getOwnPropertyNames(window[globalProperties[i]])) {
                let d = Object.getOwnPropertyDescriptor(window[globalProperties[i]], p)
                if (d.hasOwnProperty("value") && ((d.value !== null && typeof d.value === "object") || (typeof d.value === "function")) && d.value instanceof Object) {
                    let subChildren = []
                    for (let k of Object.getOwnPropertyNames(d.value)) {
                        if (k !== 'name' && k !== 'length') {
                            subChildren.push({ id: k })
                        }
                    }
                    globalObject["children"][i].children.push({
                        children: subChildren,
                        id: p
                    })
                }
                if (d.hasOwnProperty("get") && typeof d.get === "function") {
                    let subChildren = []
                    for (let k of Object.getOwnPropertyNames(d.get)) {
                        if (k !== 'name' && k !== 'length') {
                            subChildren.push({ id: k })
                        }
                    }
                    globalObject["children"][i].children.push({
                        children: subChildren,
                        id: p
                    })
                }
                if (d.hasOwnProperty("set") && typeof d.set === "function") {
                    let subChildren = []
                    for (let k of Object.getOwnPropertyNames(d.set)) {
                        if (k !== 'name' && k !== 'length') {
                            subChildren.push({ id: k })
                        }
                    }
                    globalObject["children"][i].children.push({
                        children: subChildren,
                        id: p
                    })
                }
            }
        }
        return globalObject
    }
    const myData = getInitData();
    const width = window.devicePixelRatio * window.screen.width * 0.5;
    const height = window.devicePixelRatio * window.screen.height;
    const graph = new G6.TreeGraph({
        container: 'realm-container',
        width,
        height,
        linkCenter: true,
        modes: {
            default: [
                {
                    type: 'collapse-expand',
                    onChange: function onChange(item, collapsed) {
                        const data = item.get('model').data;
                        data.collapsed = collapsed;
                        return true;
                    },
                },
                'drag-canvas',
                'zoom-canvas',
            ],
        },
        defaultNode: {
            size: 26,
            anchorPoints: [
                [0, 0.5],
                [1, 0.5],
            ],
            style: {
                fill: '#C6E5FF',
                stroke: '#5B8FF9',
            },
        },
        defaultEdge: {
            type: 'cubic-horizontal',
            style: {
                stroke: '#A3B1BF',
            },
        },
        layout: {
            type: 'compactBox',
            direction: 'LR', // H / V / LR / RL / TB / BT
            getId: function getId(globalObject) {
                return globalObject.id;
            },
            getHeight: function getHeight() {
                return 16;
            },
            getWidth: function getWidth() {
                return 16;
            },
            getVGap: function getVGap() {
                return 10;
            },
            getHGap: function getHGap() {
                return 100;
            },
        }
    })

    graph.node(function (node) {
        return {
            label: node.id,
            labelCfg: {
                position: node.children && node.children.length > 0 ? 'left' : 'right',
                offset: 5,
            },
        };
    });

    graph.data(myData);
    graph.render();
    graph.fitView();
</script>

</html>
```

