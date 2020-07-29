/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Carousel.js":
/*!*********************!*\
  !*** ./Carousel.js ***!
  \*********************/
/*! exports provided: Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./createElement.js\");\n/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animation.js */ \"./animation.js\");\n/* harmony import */ var _cubicBezier_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubicBezier.js */ \"./cubicBezier.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar Carousel = /*#__PURE__*/function () {\n  function Carousel(config) {\n    _classCallCheck(this, Carousel);\n\n    this.children = [];\n    this.attributes = new Map();\n    this.properties = new Map();\n  } //attribute\n\n\n  _createClass(Carousel, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this[name] = value;\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      this.render().mountTo(parent);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this = this;\n\n      var timeline = new _animation_js__WEBPACK_IMPORTED_MODULE_1__[\"Timeline\"]();\n      timeline.start();\n      var position = 0;\n      var nextPicStopHandler = null;\n      var children = this.data.map(function (url, currentPosition) {\n        var lastPosition = (currentPosition - 1 + _this.data.length) % _this.data.length;\n        var nextPosition = (currentPosition + 1) % _this.data.length;\n        var offset = 0;\n\n        var onStart = function onStart() {\n          timeline.pause();\n          clearTimeout(nextPicStopHandler);\n          var currentElement = children[currentPosition];\n          var currentTransformValue = Number(currentElement.style.transform.match(/translateX\\(([\\s\\S]+)px\\)/)[1]);\n          offset = currentTransformValue + 500 * currentPosition;\n        };\n\n        var onPan = function onPan(event) {\n          var lastElement = children[lastPosition];\n          var currentElement = children[currentPosition];\n          var nextElement = children[nextPosition];\n          var dx = event.clientX - event.startX;\n          var currentTransformValue = -500 * currentPosition + offset + dx;\n          var lastTransformValue = -500 - 500 * lastPosition + offset + dx;\n          var nextTransformValue = 500 - 500 * nextPosition + offset + dx;\n          lastElement.style.transform = \"translateX(\".concat(lastTransformValue, \"px)\");\n          currentElement.style.transform = \"translateX(\".concat(currentTransformValue, \"px)\");\n          nextElement.style.transform = \"translateX(\".concat(nextTransformValue, \"px)\");\n        };\n\n        var onPanend = function onPanend(event) {\n          var direction = 0;\n          var dx = event.clientX - event.startX;\n\n          if (dx + offset > 250) {\n            direction = 1;\n          } else if (dx + offset < -250) {\n            direction = -1;\n          }\n\n          timeline.reset();\n          timeline.start();\n          var lastElement = children[lastPosition];\n          var currentElement = children[currentPosition];\n          var nextElement = children[nextPosition];\n          var lastAnimation = new _animation_js__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](lastElement.style, 'transform', -500 - 500 * lastPosition + offset + dx, -500 - 500 * lastPosition + direction * 500, 500, 0, _cubicBezier_js__WEBPACK_IMPORTED_MODULE_2__[\"ease\"], function (v) {\n            return \"translateX(\".concat(v, \"px)\");\n          });\n          var currentAnimation = new _animation_js__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](currentElement.style, 'transform', -500 * currentPosition + offset + dx, -500 * currentPosition + 500 * direction, 500, 0, _cubicBezier_js__WEBPACK_IMPORTED_MODULE_2__[\"ease\"], function (v) {\n            return \"translateX(\".concat(v, \"px)\");\n          });\n          var nextAnimation = new _animation_js__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](nextElement.style, 'transform', 500 - 500 * nextPosition + offset + dx, 500 - 500 * nextPosition + 500 * direction, 500, 0, _cubicBezier_js__WEBPACK_IMPORTED_MODULE_2__[\"ease\"], function (v) {\n            return \"translateX(\".concat(v, \"px)\");\n          });\n          timeline.add(lastAnimation);\n          timeline.add(currentAnimation);\n          timeline.add(nextAnimation);\n          position = (position - direction + _this.data.length) % _this.data.length;\n          nextPicStopHandler = setTimeout(nextPic, 3000);\n        };\n\n        var element = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(\"img\", {\n          src: url,\n          onStart: onStart,\n          onPan: onPan,\n          onPanend: onPanend,\n          enableGesture: true\n        });\n        element.style.transform = 'translateX(0px)';\n        element.addEventListener('dragstart', function (event) {\n          return event.preventDefault();\n        });\n        return element;\n      });\n\n      var nextPic = function nextPic() {\n        var nextPosition = (position + 1) % _this.data.length;\n        var current = children[position];\n        var next = children[nextPosition];\n        var currentAnimation = new _animation_js__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](current.style, 'transform', -100 * position, -100 - 100 * position, 500, 0, _cubicBezier_js__WEBPACK_IMPORTED_MODULE_2__[\"ease\"], function (v) {\n          return \"translateX(\".concat(5 * v, \"px)\");\n        });\n        var nextAnimation = new _animation_js__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](next.style, 'transform', 100 - 100 * nextPosition, -100 * nextPosition, 500, 0, _cubicBezier_js__WEBPACK_IMPORTED_MODULE_2__[\"ease\"], function (v) {\n          return \"translateX(\".concat(5 * v, \"px)\");\n        });\n        timeline.add(currentAnimation);\n        timeline.add(nextAnimation);\n        position = nextPosition;\n        nextPicStopHandler = setTimeout(nextPic, 3000);\n      };\n\n      nextPicStopHandler = setTimeout(nextPic, 3000);\n      return Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(\"div\", {\n        \"class\": \"carousel\"\n      }, children);\n    }\n  }]);\n\n  return Carousel;\n}();\n\n//# sourceURL=webpack:///./Carousel.js?");

/***/ }),

/***/ "./animation.js":
/*!**********************!*\
  !*** ./animation.js ***!
  \**********************/
/*! exports provided: Timeline, Animation, ColorAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timeline\", function() { return Timeline; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Animation\", function() { return Animation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ColorAnimation\", function() { return ColorAnimation; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Timeline = /*#__PURE__*/function () {\n  function Timeline() {\n    var _this = this;\n\n    _classCallCheck(this, Timeline);\n\n    this.animations = new Set();\n    this.finishedAnimations = new Set();\n    this.addTimes = new Map();\n    this.requestID = null;\n    this.state = 'init';\n\n    this.tick = function () {\n      var t = Date.now() - _this.startTime;\n\n      var _iterator = _createForOfIteratorHelper(_this.animations),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var animation = _step.value;\n          var object = animation.object,\n              property = animation.property,\n              template = animation.template,\n              start = animation.start,\n              end = animation.end,\n              duration = animation.duration,\n              timingFunction = animation.timingFunction,\n              delay = animation.delay;\n\n          var addTime = _this.addTimes.get(animation);\n\n          if (t < delay + addTime) {\n            continue;\n          }\n\n          var progression = timingFunction((t - delay - addTime) / duration); // 0-1之间的数\n\n          if (t > duration + delay + addTime) {\n            progression = 1;\n\n            _this.animations[\"delete\"](animation);\n\n            _this.finishedAnimations.add(animation);\n          }\n\n          var value = animation.valueFromProgression(progression); // value就是根据progression算出的当前值\n\n          object[property] = template(value);\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      if (_this.animations.size) {\n        _this.requestID = requestAnimationFrame(_this.tick);\n      } else {\n        _this.requestID = null;\n      }\n    };\n  }\n\n  _createClass(Timeline, [{\n    key: \"pause\",\n    value: function pause() {\n      if (this.state !== 'playing') {\n        return;\n      }\n\n      this.state = 'pause';\n      this.pauseTime = Date.now();\n\n      if (this.requestID !== null) {\n        cancelAnimationFrame(this.requestID);\n        this.requestID = null;\n      }\n    }\n  }, {\n    key: \"resume\",\n    value: function resume() {\n      if (this.state !== 'pause') {\n        return;\n      }\n\n      this.state = 'playing';\n      this.startTime += Date.now() - this.pauseTime;\n      this.tick();\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      if (this.state !== 'init') {\n        return;\n      }\n\n      this.state = 'playing';\n      this.startTime = Date.now();\n      this.tick();\n    }\n  }, {\n    key: \"reset\",\n    value: function reset() {\n      if (this.state === 'playing') {\n        this.pause();\n      }\n\n      this.animations = new Set();\n      this.finishedAnimations = new Set();\n      this.addTimes = new Map();\n      this.requestID = null;\n      this.startTime = Date.now();\n      this.pauseTime = null;\n      this.state = 'init';\n    }\n  }, {\n    key: \"restart\",\n    value: function restart() {\n      if (this.state === 'playing') {\n        this.pause();\n      }\n\n      var _iterator2 = _createForOfIteratorHelper(this.finishedAnimations),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var animation = _step2.value;\n          this.animations.add(animation);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n\n      this.finishedAnimations = new Set();\n      this.requestID = null;\n      this.state = 'playing';\n      this.startTime = Date.now();\n      this.pauseTime = null;\n      this.tick();\n    }\n  }, {\n    key: \"add\",\n    value: function add(animation, addTime) {\n      this.animations.add(animation);\n\n      if (this.state === 'playing' && this.requestID === null) {\n        this.tick();\n      }\n\n      if (this.state === 'playing') {\n        this.addTimes.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime);\n      } else {\n        this.addTimes.set(animation, addTime !== void 0 ? addTime : 0);\n      }\n    }\n  }]);\n\n  return Timeline;\n}();\nvar Animation = /*#__PURE__*/function () {\n  function Animation(object, property, start, end, duration, delay, timingFunction, template) {\n    _classCallCheck(this, Animation);\n\n    this.object = object;\n    this.property = property;\n    this.template = template;\n    this.start = start;\n    this.end = end;\n    this.duration = duration;\n    this.delay = delay;\n    this.timingFunction = timingFunction; //ease linear easeIn easeOut\n  }\n\n  _createClass(Animation, [{\n    key: \"valueFromProgression\",\n    value: function valueFromProgression(progression) {\n      return this.start + progression * (this.end - this.start);\n    }\n  }]);\n\n  return Animation;\n}();\nvar ColorAnimation = /*#__PURE__*/function () {\n  function ColorAnimation(object, property, start, end, duration, delay, timingFunction, template) {\n    _classCallCheck(this, ColorAnimation);\n\n    this.object = object;\n    this.property = property;\n\n    this.template = template || function (v) {\n      return \"rgba(\".concat(v.r, \",\").concat(v.g, \",\").concat(v.b, \",\").concat(v.a, \")\");\n    };\n\n    this.start = start;\n    this.end = end;\n    this.duration = duration;\n    this.delay = delay;\n    this.timingFunction = timingFunction; //ease linear easeIn easeOut\n  }\n\n  _createClass(ColorAnimation, [{\n    key: \"valueFromProgression\",\n    value: function valueFromProgression(progression) {\n      return {\n        r: this.start.r + progression * (this.end.r - this.start.r),\n        g: this.start.g + progression * (this.end.g - this.start.g),\n        b: this.start.b + progression * (this.end.b - this.start.b),\n        a: this.start.a + progression * (this.end.a - this.start.a)\n      };\n    }\n  }]);\n\n  return ColorAnimation;\n}();\n/*\n\nlet animation = new Animation(object, property, start, end, duration, timingFunction)\nlet animation2 = new Animation(object2, property2, start, end, duration, timingFunction)\n\nlet timeline = new Timeline\n\ntimeline.add(animation)\ntimeline.add(animation2)\n\ntimeline.start()\ntimeline.pause()\ntimeline.resume()\ntimeline.stop()\n\n*/\n\n//# sourceURL=webpack:///./animation.js?");

/***/ }),

/***/ "./createElement.js":
/*!**************************!*\
  !*** ./createElement.js ***!
  \**************************/
/*! exports provided: create, Text */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony import */ var _gesture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gesture.js */ \"./gesture.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\nfunction create(Cls, attributes) {\n  var o;\n\n  if (typeof Cls === 'string') {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    o.setAttribute(name, attributes[name]);\n  }\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        if (_typeof(child) === 'object' && child instanceof Array) {\n          visit(child);\n          continue;\n        }\n\n        if (typeof child === 'string') {\n          child = new Text(child);\n        }\n\n        o.appendChild(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children);\n  return o;\n}\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.children = [];\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Text;\n}();\n\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this.root.setAttribute(name, value);\n\n      if (name.match(/^on([\\s\\S]+)$/)) {\n        var eventName = RegExp.$1.replace(/^[\\s\\S]/, function (c) {\n          return c.toLowerCase();\n        });\n        this.addEventListener(eventName, value);\n      }\n\n      if (name === 'enableGesture') {\n        Object(_gesture_js__WEBPACK_IMPORTED_MODULE_0__[\"enableGesture\"])(this.root);\n      }\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener() {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }]);\n\n  return Wrapper;\n}();\n\n//# sourceURL=webpack:///./createElement.js?");

/***/ }),

/***/ "./cubicBezier.js":
/*!************************!*\
  !*** ./cubicBezier.js ***!
  \************************/
/*! exports provided: cubicBezier, ease, linear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubicBezier\", function() { return cubicBezier; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ease\", function() { return ease; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"linear\", function() { return linear; });\nfunction cubicBezier(p1x, p1y, p2x, p2y) {\n  var ZERO_LIMIT = 1e-6; // Calculate the polynomial coefficients,\n  // implicit first and last control points are (0,0) and (1,1).\n\n  var ax = 3 * p1x - 3 * p2x + 1;\n  var bx = 3 * p2x - 6 * p1x;\n  var cx = 3 * p1x;\n  var ay = 3 * p1y - 3 * p2y + 1;\n  var by = 3 * p2y - 6 * p1y;\n  var cy = 3 * p1y;\n\n  function sampleCurveDerivativeX(t) {\n    // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.\n    return (3 * ax * t + 2 * bx) * t + cx;\n  }\n\n  function sampleCurveX(t) {\n    return ((ax * t + bx) * t + cx) * t;\n  }\n\n  function sampleCurveY(t) {\n    return ((ay * t + by) * t + cy) * t;\n  } // Given an x value, find a parametric value it came from.\n\n\n  function solveCurveX(x) {\n    var t2 = x;\n    var derivative;\n    var x2; // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation\n    // First try a few iterations of Newton's method -- normally very fast.\n    // http://en.wikipedia.org/wiki/Newton's_method\n\n    for (var i = 0; i < 8; i++) {\n      // f(t)-x=0\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      derivative = sampleCurveDerivativeX(t2); // == 0, failure\n\n      /* istanbul ignore if */\n\n      if (Math.abs(derivative) < ZERO_LIMIT) {\n        break;\n      }\n\n      t2 -= x2 / derivative;\n    } // Fall back to the bisection method for reliability.\n    // bisection\n    // http://en.wikipedia.org/wiki/Bisection_method\n\n\n    var t1 = 1;\n    /* istanbul ignore next */\n\n    var t0 = 0;\n    /* istanbul ignore next */\n\n    t2 = x;\n    /* istanbul ignore next */\n\n    while (t1 > t0) {\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      if (x2 > 0) {\n        t1 = t2;\n      } else {\n        t0 = t2;\n      }\n\n      t2 = (t1 + t0) / 2;\n    } // Failure\n\n\n    return t2;\n  }\n\n  function solve(x) {\n    return sampleCurveY(solveCurveX(x));\n  }\n\n  return solve;\n}\nvar ease = cubicBezier(0.25, 0.1, 0.25, 0.1);\nvar linear = cubicBezier(0, 0, 1, 1);\n\n//# sourceURL=webpack:///./cubicBezier.js?");

/***/ }),

/***/ "./gesture.js":
/*!********************!*\
  !*** ./gesture.js ***!
  \********************/
/*! exports provided: enableGesture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enableGesture\", function() { return enableGesture; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction enableGesture(element) {\n  var contexts = Object.create(null);\n  var MOUSE_SYMBOL = Symbol('mouse');\n\n  if (document.ontouchstart !== null) {\n    element.addEventListener('mousedown', function (event) {\n      contexts[MOUSE_SYMBOL] = Object.create(null);\n      start(event, contexts[MOUSE_SYMBOL]);\n\n      var mousemove = function mousemove(event) {\n        move(event, contexts[MOUSE_SYMBOL]);\n      };\n\n      var mouseend = function mouseend(event) {\n        end(event, contexts[MOUSE_SYMBOL]);\n        document.removeEventListener('mousemove', mousemove);\n        document.removeEventListener('mouseup', mouseend);\n      };\n\n      document.addEventListener('mousemove', mousemove);\n      document.addEventListener('mouseup', mouseend);\n    });\n  }\n\n  element.addEventListener('touchstart', function (event) {\n    var _iterator = _createForOfIteratorHelper(event.changedTouches),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var touch = _step.value;\n        contexts[touch.identifier] = Object.create(null);\n        start(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  });\n  element.addEventListener('touchmove', function (event) {\n    var _iterator2 = _createForOfIteratorHelper(event.changedTouches),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var touch = _step2.value;\n        move(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n  });\n  element.addEventListener('touchend', function (event) {\n    var _iterator3 = _createForOfIteratorHelper(event.changedTouches),\n        _step3;\n\n    try {\n      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n        var touch = _step3.value;\n        end(touch, contexts[touch.identifier]);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _iterator3.e(err);\n    } finally {\n      _iterator3.f();\n    }\n  });\n  element.addEventListener('touchcancel', function (event) {\n    var _iterator4 = _createForOfIteratorHelper(event.changedTouches),\n        _step4;\n\n    try {\n      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n        var touch = _step4.value;\n        cancel(touch, contexts[touch.identifier]);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _iterator4.e(err);\n    } finally {\n      _iterator4.f();\n    }\n  }); //tap\n  //pan - panstart panmove paned\n  //flick\n  //press - pressstart pressend\n\n  var start = function start(point, context) {\n    element.dispatchEvent(Object.assign(new CustomEvent('start'), {\n      startX: point.clientX,\n      startY: point.clientY,\n      clientX: point.clientX,\n      clientY: point.clientY\n    }));\n    context.startX = point.clientX;\n    context.startY = point.clientY;\n    context.moves = [];\n    context.isTap = true;\n    context.isPan = false;\n    context.isPress = false;\n    context.timeoutHandler = setTimeout(function () {\n      if (context.isPan) {\n        return;\n      }\n\n      context.isTap = false;\n      context.isPan = false;\n      context.isPress = true;\n      element.dispatchEvent(new CustomEvent('pressstart', {})); //   console.log('pressstart')\n    }, 500); //   console.log('start', point.clientX, point.clientY)\n  };\n\n  var move = function move(point, context) {\n    var dx = point.clientX - context.startX;\n    var dy = point.clientY - context.startY;\n\n    if (Math.pow(dx, 2) + Math.pow(dy, 2) > 100 && !context.isPan) {\n      if (context.isPress) {\n        element.dispatchEvent(new CustomEvent('presscancel', {})); // console.log('presscancel')\n      }\n\n      context.isTap = false;\n      context.isPan = true;\n      context.isPress = false;\n      element.dispatchEvent(Object.assign(new CustomEvent('panstart'), {\n        startX: context.startX,\n        startY: context.startY,\n        clientX: point.clientX,\n        clientY: point.clientY\n      })); //   console.log('panstart')\n    }\n\n    if (context.isPan) {\n      context.moves.push({\n        dx: dx,\n        dy: dy,\n        t: Date.now()\n      });\n      context.moves = context.moves.filter(function (record) {\n        return Date.now() - record.t < 300;\n      });\n      var e = new CustomEvent('pan');\n      Object.assign(e, {\n        startX: context.startX,\n        startY: context.startY,\n        clientX: point.clientX,\n        clientY: point.clientY\n      });\n      element.dispatchEvent(e); //   console.log('pan')\n    } //   console.log('move', dx, dy)\n\n  };\n\n  var end = function end(point, context) {\n    if (context.isPan) {\n      var dx = point.clientX - context.startX;\n      var dy = point.clientY - context.startY; // console.log(context.moves)\n\n      var record = context.moves[0];\n      var speed = Math.sqrt(Math.pow(record.dx - dx, 2) + Math.pow(record.dy - dy, 2)) / (Date.now() - record.t); //   console.log(speed)\n\n      var isFlick = speed > 2.5;\n\n      if (isFlick) {\n        element.dispatchEvent(Object.assign(new CustomEvent('flick'), {\n          startX: context.startX,\n          startY: context.startY,\n          clientX: point.clientX,\n          clientY: point.clientY,\n          speed: speed\n        })); // console.log('flick')\n      }\n\n      element.dispatchEvent(Object.assign(new CustomEvent('panend'), {\n        startX: context.startX,\n        startY: context.startY,\n        clientX: point.clientX,\n        clientY: point.clientY,\n        speed: speed,\n        isFlick: isFlick\n      })); //   console.log('panend')\n    }\n\n    if (context.isTap) {\n      element.dispatchEvent(new CustomEvent('tap', {})); //   console.log('tap')\n    }\n\n    if (context.isPress) {\n      element.dispatchEvent(new CustomEvent('pressend', {})); //   console.log('pressend')\n    }\n\n    clearTimeout(context.timeoutHandler);\n  };\n\n  var cancel = function cancel(point, context) {\n    element.dispatchEvent(new CustomEvent('canceled', {})); // console.log('canceled')\n\n    clearTimeout(context.timeoutHandler);\n  };\n}\n\n//# sourceURL=webpack:///./gesture.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./createElement.js\");\n/* harmony import */ var _Carousel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Carousel.js */ \"./Carousel.js\");\n\n\nvar component = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(_Carousel_js__WEBPACK_IMPORTED_MODULE_1__[\"Carousel\"], {\n  data: ['https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg', 'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg', 'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg', 'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg']\n});\ncomponent.mountTo(document.body);\nconsole.log(component);\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });