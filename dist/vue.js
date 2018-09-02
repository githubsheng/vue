(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vue"] = factory();
	else
		root["Vue"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(1)['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _config = __webpack_require__(2);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _index = __webpack_require__(3);
	
	var _index2 = __webpack_require__(15);
	
	var _index3 = __webpack_require__(43);
	
	var _index4 = _interopRequireDefault(_index3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mount = _index4.default.prototype.$mount;
	
	_index4.default.prototype.$mount = function (el) {
	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = (0, _index2.query)(template).innerHTML;
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        (0, _index2.warn)('invalid template option:' + template, this);
	      }
	    } else {
	      template = (0, _index2.getOuterHTML)((0, _index2.query)(el));
	    }
	    options.render = new Function((0, _index.compile)(template, _config2.default.preserveWhitespace));
	  }
	  mount.call(this, el);
	};
	
	_index4.default.compile = _index.compile;
	
	exports.default = _index4.default;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	
	  /**
	   * Preserve whitespaces between elements.
	   */
	
	  preserveWhitespace: true,
	
	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */
	
	  silent: false,
	
	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */
	
	  _assetTypes: ['component', 'directive', 'filter', 'transition'],
	
	  /**
	   * prop binding modes
	   */
	
	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },
	
	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */
	
	  _maxUpdateCount: 100
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.compile = compile;
	exports.registerDirective = registerDirective;
	
	var _index = __webpack_require__(4);
	
	var _index2 = __webpack_require__(10);
	
	var _index3 = __webpack_require__(12);
	
	var cache1 = Object.create(null);
	var cache2 = Object.create(null);
	
	function compile(html, preserveWhitespace) {
	  html = html.trim();
	  var cache = preserveWhitespace ? cache1 : cache2;
	  var hit = cache[html];
	  return hit || (cache[html] = (0, _index2.generate)((0, _index.parse)(html, preserveWhitespace)));
	}
	
	function registerDirective(name, fn) {
	  _index3.directives[name] = fn;
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parse = parse;
	
	var _entities = __webpack_require__(6);
	
	var _htmlParser = __webpack_require__(7);
	
	var _textParser = __webpack_require__(8);
	
	var _helpers = __webpack_require__(9);
	
	var dirRE = /^v-|^@|^:/;
	var bindRE = /^:|^v-bind:/;
	var onRE = /^@|^v-on:/;
	var modifierRE = /\.[^\.]+/g;
	var mustUsePropsRE = /^(value|selected|checked|muted)$/;
	var forAliasRE = /([a-zA-Z_][\w]*)\s+(?:in|of)\s+(.*)/;
	
	// this map covers SVG elements that can appear as template root nodes
	var svgMap = {
	  svg: 1,
	  g: 1,
	  defs: 1,
	  symbol: 1,
	  use: 1,
	  image: 1,
	  text: 1,
	  circle: 1,
	  ellipse: 1,
	  line: 1,
	  path: 1,
	  polygon: 1,
	  polyline: 1,
	  rect: 1
	
	  /**
	   * Convert HTML string to AST
	   *
	   * @param {String} template
	   * @param {Boolean} preserveWhitespace
	   * @return {Object}
	   */
	
	};function parse(template, preserveWhitespace) {
	  var stack = [];
	  var root = void 0;
	  var currentParent = void 0;
	  var inSvg = false;
	  var svgIndex = -1;
	  var warned = false;
	  (0, _htmlParser.parseHTML)(template, {
	    html5: true,
	
	    start: function start(tag, attrs, unary) {
	      var element = {
	        tag: tag,
	        plain: !attrs.length,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs),
	        parent: currentParent,
	        children: []
	
	        // check svg
	      };if (inSvg) {
	        element.svg = true;
	      } else if (svgMap[tag]) {
	        element.svg = true;
	        inSvg = true;
	        svgIndex = stack.length;
	      }
	
	      processFor(element);
	      processIf(element);
	      processRender(element);
	      processSlot(element);
	      processClassBinding(element);
	      processStyleBinding(element);
	      processAttributes(element);
	
	      // tree management
	      if (!root) {
	        root = element;
	      } else if (process.env.NODE_ENV !== 'production' && !stack.length && !warned) {
	        warned = true;
	        console.error('Component template should contain exactly one root element:\n\n' + template);
	      }
	      if (currentParent) {
	        currentParent.children.push(element);
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      }
	    },
	    end: function end() {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.text === ' ') element.children.pop();
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      // check svg state
	      if (inSvg && stack.length <= svgIndex) {
	        inSvg = false;
	        svgIndex = -1;
	      }
	    },
	    chars: function chars(text) {
	      if (!currentParent) {
	        if (process.env.NODE_ENV !== 'production' && !warned) {
	          warned = true;
	          console.error('Component template should contain exactly one root element:\n\n' + template);
	        }
	        return;
	      }
	      text = currentParent.tag === 'pre' || text.trim() ? (0, _entities.decodeHTML)(text)
	      // only preserve whitespace if its not right after a starting tag
	      : preserveWhitespace && currentParent.children.length ? ' ' : null;
	      if (text) {
	        var expression = void 0;
	        if (text !== ' ' && (expression = (0, _textParser.parseText)(text))) {
	          currentParent.children.push({ expression: expression });
	        } else {
	          currentParent.children.push({ text: text });
	        }
	      }
	    }
	  });
	  return root;
	}
	
	function processFor(el) {
	  var exp = void 0;
	  if (exp = getAndRemoveAttr(el, 'v-for')) {
	    var inMatch = exp.match(forAliasRE);
	    if (process.env.NODE_ENV !== 'production' && !inMatch) {
	      console.error('Invalid v-for expression: ' + exp);
	    }
	    el.alias = inMatch[1].trim();
	    el.for = inMatch[2].trim();
	    if (exp = getAndRemoveAttr(el, 'track-by')) {
	      el.key = exp === '$index' ? exp : el.alias + '["' + exp + '"]';
	    }
	  }
	}
	
	function processIf(el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	  }
	}
	
	function processRender(el) {
	  if (el.tag === 'render') {
	    el.render = true;
	    el.method = el.attrsMap.method;
	    el.args = el.attrsMap.args;
	    if (process.env.NODE_ENV !== 'production' && !el.method) {
	      console.error('method attribute is required on <render>.');
	    }
	  }
	}
	
	function processSlot(el) {
	  if (el.tag === 'slot') {
	    el.name = el.attrsMap.name;
	    el.dynamicName = el.attrsMap[':name'] || el.attrsMap['v-bind:name'];
	  }
	}
	
	function processClassBinding(el) {
	  el.staticClass = getAndRemoveAttr(el, 'class');
	  el.classBinding = getAndRemoveAttr(el, ':class') || getAndRemoveAttr(el, 'v-bind:class');
	}
	
	function processStyleBinding(el) {
	  el.styleBinding = getAndRemoveAttr(el, ':style') || getAndRemoveAttr(el, 'v-bind:style');
	}
	
	function processAttributes(el) {
	  var list = el.attrsList;
	  for (var i = 0; i < list.length; i++) {
	    var name = list[i].name;
	    var value = list[i].value;
	    if (dirRE.test(name)) {
	      // modifiers
	      var modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) {
	        // v-bind
	        name = name.replace(bindRE, '');
	        if (mustUsePropsRE.test(name)) {
	          (el.props || (el.props = [])).push({ name: name, value: value });
	        } else {
	          (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	        }
	      } else if (onRE.test(name)) {
	        // v-on
	        name = name.replace(onRE, '');
	        (0, _helpers.addHandler)(el.events || (el.events = {}), name, value, modifiers);
	      } else {
	        // normal directives
	        name = name.replace(dirRE, '');(el.directives || (el.directives = [])).push({
	          name: name,
	          value: value,
	          modifiers: modifiers
	        });
	      }
	    } else {
	      // literal attribute
	      (el.attrs || (el.attrs = [])).push({
	        name: name,
	        value: JSON.stringify(value)
	      });
	    }
	  }
	}
	
	function parseModifiers(name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) {
	      ret[m.slice(1)] = true;
	    });
	    return ret;
	  }
	}
	
	function makeAttrsMap(attrs) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if (process.env.NODE_ENV !== 'production' && map[attrs[i].name]) {
	      console.error('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map;
	}
	
	function getAndRemoveAttr(el, attr) {
	  var val = void 0;
	  if (val = el.attrsMap[attr]) {
	    el.attrsMap[attr] = null;
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === attr) {
	        list.splice(i, 1);
	        break;
	      }
	    }
	  }
	  return val;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.decodeHTML = decodeHTML;
	var decoder = document.createElement('div');
	
	function decodeHTML(html) {
	  decoder.innerHTML = html;
	  return decoder.textContent;
	}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseHTML = parseHTML;
	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */
	
	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>\/=]+)/;
	var singleAttrAssign = /=/;
	var singleAttrAssigns = [singleAttrAssign];
	var singleAttrValues = [
	// attr value double quotes
	/"([^"]*)"+/.source,
	// attr value, single quotes
	/'([^']*)'+/.source,
	// attr value, no quotes
	/([^\s"'=<>`]+)/.source];
	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;
	
	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});
	
	// Empty Elements
	var empty = makeMap('area,base,basefont,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr');
	
	// Inline Elements
	var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,noscript,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,svg,textarea,tt,u,var');
	
	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');
	
	// Attributes that have their values filled in disabled='disabled'
	var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected');
	
	// Special Elements (can contain anything)
	var special = makeMap('script,style');
	
	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var nonPhrasing = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track');
	
	var reCache = {};
	
	function attrForHandler(handler) {
	  var pattern = singleAttrIdentifier.source + '(?:\\s*(' + joinSingleAttrAssigns(handler) + ')' + '\\s*(?:' + singleAttrValues.join('|') + '))?';
	  return new RegExp('^\\s*' + pattern);
	}
	
	function joinSingleAttrAssigns(handler) {
	  return singleAttrAssigns.map(function (assign) {
	    return '(?:' + assign.source + ')';
	  }).join('|');
	}
	
	function parseHTML(html, handler) {
	  var stack = [];
	  var attribute = attrForHandler(handler);
	  var last = void 0,
	      prevTag = void 0,
	      nextTag = void 0,
	      lastTag = void 0;
	  while (html) {
	    last = html;
	    // Make sure we're not in a script or style element
	    if (!lastTag || !special(lastTag)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (/^<!--/.test(html)) {
	          var commentEnd = html.indexOf('-->');
	
	          if (commentEnd >= 0) {
	            html = html.substring(commentEnd + 3);
	            prevTag = '';
	            continue;
	          }
	        }
	
	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (/^<!\[/.test(html)) {
	          var conditionalEnd = html.indexOf(']>');
	
	          if (conditionalEnd >= 0) {
	            html = html.substring(conditionalEnd + 2);
	            prevTag = '';
	            continue;
	          }
	        }
	
	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          if (handler.doctype) {
	            handler.doctype(doctypeMatch[0]);
	          }
	          html = html.substring(doctypeMatch[0].length);
	          prevTag = '';
	          continue;
	        }
	
	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          html = html.substring(endTagMatch[0].length);
	          endTagMatch[0].replace(endTag, parseEndTag);
	          prevTag = '/' + endTagMatch[1].toLowerCase();
	          continue;
	        }
	
	        // Start tag:
	        var startTagMatch = parseStartTag(html);
	        if (startTagMatch) {
	          html = startTagMatch.rest;
	          handleStartTag(startTagMatch);
	          prevTag = startTagMatch.tagName.toLowerCase();
	          continue;
	        }
	      }
	
	      var text;
	      if (textEnd >= 0) {
	        text = html.substring(0, textEnd);
	        html = html.substring(textEnd);
	      } else {
	        text = html;
	        html = '';
	      }
	
	      // next tag
	      var nextTagMatch = parseStartTag(html);
	      if (nextTagMatch) {
	        nextTag = nextTagMatch.tagName;
	      } else {
	        nextTagMatch = html.match(endTag);
	        if (nextTagMatch) {
	          nextTag = '/' + nextTagMatch[1];
	        } else {
	          nextTag = '';
	        }
	      }
	
	      if (handler.chars) {
	        handler.chars(text, prevTag, nextTag);
	      }
	      prevTag = '';
	    } else {
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)</' + stackedTag + '[^>]*>', 'i'));
	
	      html = html.replace(reStackedTag, function (all, text) {
	        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
	          text = text.replace(/<!--([\s\S]*?)-->/g, '$1').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
	        }
	        if (handler.chars) {
	          handler.chars(text);
	        }
	        return '';
	      });
	
	      parseEndTag('</' + stackedTag + '>', stackedTag);
	    }
	
	    if (html === last) {
	      throw new Error('Parse Error: ' + html);
	    }
	  }
	
	  if (!handler.partialMarkup) {
	    // Clean up any remaining tags
	    parseEndTag();
	  }
	
	  function parseStartTag(input) {
	    var start = input.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: []
	      };
	      input = input.slice(start[0].length);
	      var end, attr;
	      while (!(end = input.match(startTagClose)) && (attr = input.match(attribute))) {
	        input = input.slice(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        match.rest = input.slice(end[0].length);
	        return match;
	      }
	    }
	  }
	
	  function handleStartTag(match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;
	
	    if (handler.html5 && lastTag === 'p' && nonPhrasing(tagName)) {
	      parseEndTag('', lastTag);
	    }
	
	    if (!handler.html5) {
	      while (lastTag && inline(lastTag)) {
	        parseEndTag('', lastTag);
	      }
	    }
	
	    if (closeSelf(tagName) && lastTag === tagName) {
	      parseEndTag('', tagName);
	    }
	
	    var unary = empty(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;
	
	    var attrs = match.attrs.map(function (args) {
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') {
	          delete args[3];
	        }
	        if (args[4] === '') {
	          delete args[4];
	        }
	        if (args[5] === '') {
	          delete args[5];
	        }
	      }
	      return {
	        name: args[1],
	        value: args[3] || args[4] || (args[5] && fillAttrs(args[5]) ? args[1] : '')
	      };
	    });
	
	    if (!unary) {
	      stack.push({ tag: tagName, attrs: attrs });
	      lastTag = tagName;
	      unarySlash = '';
	    }
	
	    if (handler.start) {
	      handler.start(tagName, attrs, unary, unarySlash);
	    }
	  }
	
	  function parseEndTag(tag, tagName) {
	    var pos;
	
	    // Find the closest opened tag of the same type
	    if (tagName) {
	      var needle = tagName.toLowerCase();
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].tag.toLowerCase() === needle) {
	          break;
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }
	
	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if (handler.end) {
	          handler.end(stack[i].tag, stack[i].attrs, i > pos || !tag);
	        }
	      }
	
	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (tagName.toLowerCase() === 'br') {
	      if (handler.start) {
	        handler.start(tagName, [], true, '');
	      }
	    } else if (tagName.toLowerCase() === 'p') {
	      if (handler.start) {
	        handler.start(tagName, [], false, '', true);
	      }
	      if (handler.end) {
	        handler.end(tagName, []);
	      }
	    }
	  }
	}
	
	function makeMap(values) {
	  values = values.split(/,/);
	  var map = {};
	  values.forEach(function (value) {
	    map[value] = 1;
	  });
	  return function (value) {
	    return map[value.toLowerCase()] === 1;
	  };
	}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseText = parseText;
	var tagRE = /\{\{((?:.|\\n)+?)\}\}/g;
	
	function parseText(text) {
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index;
	  while (match = tagRE.exec(text)) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	    }
	    // tag token
	    var exp = match[1].trim();
	    tokens.push('((' + exp + ')==null?\'\':' + exp + ')');
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)));
	  }
	  return tokens.join('+');
	}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addHandler = addHandler;
	function addHandler(events, name, value, modifiers) {
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  var newHandler = { value: value, modifiers: modifiers };
	  var handlers = events[name];
	  if (Array.isArray(handlers)) {
	    handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }
	}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.generate = generate;
	
	var _events = __webpack_require__(11);
	
	var _index = __webpack_require__(12);
	
	function generate(ast) {
	  var code = ast ? genElement(ast) : '__h__("div")';
	  return 'with (this) { return ' + code + '}';
	}
	
	function genElement(el) {
	  if (el.for) {
	    return genFor(el);
	  } else if (el.if) {
	    return genIf(el);
	  } else if (el.tag === 'template') {
	    return genChildren(el);
	  } else if (el.tag === 'render') {
	    return genRender(el);
	  } else if (el.tag === 'slot') {
	    return genSlot(el);
	  } else {
	    return '__h__(\'' + el.tag + '\', ' + genData(el) + ', ' + genChildren(el) + ')';
	  }
	}
	
	function genIf(el) {
	  var exp = el.if;
	  el.if = false; // avoid recursion
	  return '(' + exp + ') ? ' + genElement(el) + ' : null';
	}
	
	function genFor(el) {
	  var exp = el.for;
	  var alias = el.alias;
	  el.for = false; // avoid recursion
	  return '(' + exp + ') && (' + exp + ').map(function (' + alias + ', $index) {return ' + genElement(el) + '})';
	}
	
	function genData(el) {
	  if (el.plain) {
	    return el.svg ? '{svg:true}' : '{}';
	  }
	
	  var data = '{';
	
	  // key
	  if (el.key) {
	    data += 'key:' + el.key + ',';
	  }
	  // slot names
	  if (el.attrsMap.slot) {
	    data += 'slot:"' + el.attrsMap.slot + '",';
	  }
	  // svg
	  if (el.svg) {
	    data += 'svg:true,';
	  }
	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  if (el.directives) {
	    var dirs = (0, _index.genDirectives)(el);
	    if (dirs) data += dirs + ',';
	  }
	  // class
	  if (el.staticClass) {
	    data += 'staticClass:"' + el.staticClass + '",';
	  }
	  if (el.classBinding) {
	    data += 'class:' + el.classBinding + ',';
	  }
	  // style
	  if (el.styleBinding) {
	    data += 'style:' + el.styleBinding + ',';
	  }
	  // props
	  if (el.props) {
	    data += 'props:{' + genProps(el.props) + '},';
	  }
	  // attributes
	  if (el.attrs) {
	    data += 'attrs:{' + genProps(el.attrs) + '},';
	  }
	  // event handlers
	  if (el.events) {
	    data += (0, _events.genHandlers)(el.events);
	  }
	  return data.replace(/,$/, '') + '}';
	}
	
	function genChildren(el) {
	  if (!el.children.length) {
	    return 'undefined';
	  }
	  return '[' + el.children.map(genNode).join(',') + ']';
	}
	
	function genNode(node) {
	  if (node.tag) {
	    return genElement(node);
	  } else {
	    return genText(node);
	  }
	}
	
	function genText(text) {
	  return text.expression ? '(' + text.expression + ')' : JSON.stringify(text.text);
	}
	
	function genRender(el) {
	  return el.method + '(' + (el.args || 'null') + ',' + genChildren(el) + ')';
	}
	
	function genSlot(el) {
	  var name = el.name ? '"' + el.name + '"' : el.dynamicName || '"default"';
	  return '$slots[' + name + ']';
	}
	
	function genProps(props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    res += '"' + prop.name + '":' + prop.value + ',';
	  }
	  return res.slice(0, -1);
	}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.genHandlers = genHandlers;
	var isArray = Array.isArray;
	var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	
	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};
	
	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: 'if($event.target !== $event.currentTarget)return;'
	};
	
	function genHandlers(events) {
	  var res = 'on:{';
	  for (var name in events) {
	    res += '"' + name + '":' + genHandler(events[name]) + ',';
	  }
	  return res.slice(0, -1) + '}';
	}
	
	function genHandler(handler) {
	  if (!handler) {
	    return 'function(){}';
	  } else if (isArray(handler)) {
	    return '[' + handler.map(genHandler).join(',') + ']';
	  } else if (!handler.modifiers) {
	    return simplePathRE.test(handler.value) ? handler.value : 'function($event){' + handler.value + '}';
	  } else {
	    var code = 'function($event){';
	    for (var key in handler.modifiers) {
	      code += modifierCode[key] || genKeyFilter(key);
	    }
	    var handlerCode = simplePathRE.test(handler.value) ? handler.value + '($event)' : handler.value;
	    return code + handlerCode + '}';
	  }
	}
	
	function genKeyFilter(key) {
	  var code = keyCodes[key];
	  if (isArray(code)) {
	    return 'if(' + code.map(function (c) {
	      return '$event.keyCode!==' + c;
	    }).join('&&') + ')return;';
	  } else {
	    return 'if($event.keyCode!==' + code + ')return;';
	  }
	}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.directives = undefined;
	exports.genDirectives = genDirectives;
	
	var _model = __webpack_require__(13);
	
	var _show = __webpack_require__(14);
	
	var directives = exports.directives = {
	  model: _model.model,
	  show: _show.show,
	  cloak: function cloak() {} // noop
	};
	
	function genDirectives(el) {
	  var dirs = el.directives;
	  var res = 'directives:[';
	  var hasRuntime = false;
	  for (var i = 0; i < dirs.length; i++) {
	    var dir = dirs[i];
	    var gen = directives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST
	      gen(el, dir);
	    } else {
	      // runtime directive
	      hasRuntime = true;
	      res += '{def:__d__("' + dir.name + '")' + (dir.value ? ',value:(' + dir.value + ')' : '') + (dir.modifiers ? ',modifiers:' + JSON.stringify(dir.modifiers) : '') + '},';
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']';
	  }
	}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.model = model;
	
	var _helpers = __webpack_require__(9);
	
	function model(el, dir) {
	  if (!el.events) el.events = {};
	  if (!el.props) el.props = [];
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  if (el.tag === 'select') {
	    if (el.attrsMap.multiple != null) {
	      genMultiSelect(el, value);
	    } else {
	      genSelect(el, value);
	    }
	  } else {
	    switch (el.attrsMap.type) {
	      case 'checkbox':
	        genCheckboxModel(el, value);
	        break;
	      case 'radio':
	        genRadioModel(el, value);
	        break;
	      default:
	        genDefaultModel(el, value, modifiers);
	        break;
	    }
	  }
	}
	
	function genCheckboxModel(el, value) {
	  (0, _helpers.addHandler)(el.events, 'change', value + '=$event.target.checked');
	  el.props.push({
	    name: 'checked',
	    value: '!!(' + value + ')'
	  });
	}
	
	function genRadioModel(el, value) {
	  (0, _helpers.addHandler)(el.events, 'change', value + '=$event.target.value');
	  el.props.push({
	    name: 'checked',
	    value: '(' + value + '==' + getInputValue(el) + ')'
	  });
	}
	
	function genDefaultModel(el, value, modifiers) {
	  var type = el.attrsMap.type;
	  var event = modifiers && modifiers.lazy ? 'change' : 'input';
	  var code = type === 'number' || modifiers && modifiers.number ? value + '=Number($event.target.value)' : value + '=$event.target.value';
	  (0, _helpers.addHandler)(el.events, event, code);
	  el.props.push({
	    name: 'value',
	    value: '(' + value + ')'
	  });
	}
	
	function genSelect(el, value) {
	  (0, _helpers.addHandler)(el.events, 'change', value + '=$event.target.value');
	  el.props.push({
	    name: 'value',
	    value: '(' + value + ')'
	  });
	}
	
	function genMultiSelect(el, value) {
	  (0, _helpers.addHandler)(el.events, 'change', value + '=Array.prototype.filter\n    .call($event.target.options,function(o){return o.selected})\n    .map(function(o){return o.value})');
	  // patch child options
	  for (var i = 0; i < el.children.length; i++) {
	    var c = el.children[i];
	    if (c.tag === 'option') {
	      (c.props || (c.props = [])).push({
	        name: 'selected',
	        value: '(' + value + ').indexOf(' + getInputValue(c) + ')>-1'
	      });
	    }
	  }
	}
	
	function getInputValue(el) {
	  return el.attrsMap.value ? JSON.stringify(el.attrsMap.value) : el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
	}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.show = show;
	function show(el, dir) {
	  var code = "display:(" + dir.value + "?'':'none')";
	  el.styleBinding = el.styleBinding ? el.styleBinding.replace(/}\s?$/, code + ",}") : "{" + code + "}";
	}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _lang = __webpack_require__(16);
	
	Object.keys(_lang).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _lang[key];
	    }
	  });
	});
	
	var _env = __webpack_require__(17);
	
	Object.keys(_env).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _env[key];
	    }
	  });
	});
	
	var _dom = __webpack_require__(18);
	
	Object.keys(_dom).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _dom[key];
	    }
	  });
	});
	
	var _options = __webpack_require__(20);
	
	Object.keys(_options).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _options[key];
	    }
	  });
	});
	
	var _debug = __webpack_require__(19);
	
	Object.keys(_debug).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _debug[key];
	    }
	  });
	});
	
	var _index = __webpack_require__(26);
	
	Object.defineProperty(exports, 'defineReactive', {
	  enumerable: true,
	  get: function get() {
	    return _index.defineReactive;
	  }
	});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.set = set;
	exports.del = del;
	exports.hasOwn = hasOwn;
	exports.isPrimitive = isPrimitive;
	exports.isLiteral = isLiteral;
	exports.isReserved = isReserved;
	exports.toNumber = toNumber;
	exports.toBoolean = toBoolean;
	exports.stripQuotes = stripQuotes;
	exports.camelize = camelize;
	exports.hyphenate = hyphenate;
	exports.classify = classify;
	exports.bind = bind;
	exports.toArray = toArray;
	exports.extend = extend;
	exports.isObject = isObject;
	exports.isPlainObject = isPlainObject;
	exports.def = def;
	exports.parsePath = parsePath;
	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */
	
	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */
	
	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */
	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}
	
	/**
	 * Check if value is primitive
	 *
	 * @param {*} value
	 * @return {Boolean}
	 */
	
	function isPrimitive(value) {
	  return typeof value === 'string' || typeof value === 'number';
	}
	
	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;
	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}
	
	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}
	
	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */
	
	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}
	
	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */
	
	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}
	
	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */
	
	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var camelizeRE = /-(\w)/g;
	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}
	
	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}
	
	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var hyphenateRE = /([a-z\d])([A-Z])/g;
	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}
	
	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var classifyRE = /(?:^|[-_\/])(\w)/g;
	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}
	
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	function isObject(obj) {
	  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}
	
	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isArray = exports.isArray = Array.isArray;
	
	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	/**
	 * Parse simple path.
	 */
	
	var bailRE = /[^\w\.]/;
	function parsePath(path) {
	  if (bailRE.test(path)) {
	    return;
	  } else {
	    path = path.split('.');
	    return function (obj) {
	      for (var i = 0; i < path.length; i++) {
	        if (!obj) return;
	        obj = obj[path[i]];
	      }
	      return obj;
	    };
	  }
	}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* global MutationObserver */
	
	// can we use __proto__?
	var hasProto = exports.hasProto = '__proto__' in {};
	
	// Browser environment sniffing
	var inBrowser = exports.inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
	
	// detect devtools
	var devtools = exports.devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE9 = exports.isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = exports.isAndroid = UA && UA.indexOf('android') > 0;
	
	var transitionProp = void 0;
	var transitionEndEvent = void 0;
	var animationProp = void 0;
	var animationEndEvent = void 0;
	
	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  exports.transitionProp = transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  exports.transitionEndEvent = transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  exports.animationProp = animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  exports.animationEndEvent = animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}
	
	exports.transitionProp = transitionProp;
	exports.transitionEndEvent = transitionEndEvent;
	exports.animationProp = animationProp;
	exports.animationEndEvent = animationEndEvent;
	
	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */
	
	var nextTick = exports.nextTick = function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function timerFunc() {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	}();
	
	var _Set = void 0;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
	  // use native Set when available.
	  exports._Set = _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  exports._Set = _Set = function _Set() {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}
	
	exports._Set = _Set;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isUnknownElement = undefined;
	exports.isReservedTag = isReservedTag;
	exports.query = query;
	exports.inDoc = inDoc;
	exports.setClass = setClass;
	exports.getOuterHTML = getOuterHTML;
	
	var _env = __webpack_require__(17);
	
	var _debug = __webpack_require__(19);
	
	var reservedTags = 'slot|component|div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer';
	var reservedTagMap = Object.create(null);
	reservedTags.split('|').forEach(function (tag) {
	  reservedTagMap[tag] = true;
	});
	
	function isReservedTag(tag) {
	  return reservedTagMap[tag];
	}
	
	var isUnknownElement = exports.isUnknownElement = void 0;
	if (process.env.NODE_ENV !== 'production') {
	  exports.isUnknownElement = isUnknownElement = function () {
	    var cache = {};
	    return function (tag) {
	      if (cache.hasOwnProperty(tag)) {
	        return cache[tag];
	      }
	      var el = document.createElement(tag);
	      if (tag.indexOf('-') > -1) {
	        // http://stackoverflow.com/a/28210364/1070244
	        return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	      } else {
	        return (/HTMLUnknownElement/.test(el.toString()) &&
	          // Chrome returns unknown for several HTML5 elements.
	          // https://code.google.com/p/chromium/issues/detail?id=540526
	          !/^(data|time|rtc|rb)$/.test(tag)
	        );
	      }
	    };
	  }();
	}
	
	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */
	
	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && (0, _debug.warn)('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}
	
	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function inDoc(node) {
	  var doc = document.documentElement;
	  var parent = node && node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}
	
	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (_env.isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}
	
	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */
	
	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.warn = undefined;
	
	var _config = __webpack_require__(2);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _lang = __webpack_require__(16);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var warn = void 0;
	var formatComponentName = void 0;
	
	if (process.env.NODE_ENV !== 'production') {
	  var hasConsole = typeof console !== 'undefined';
	
	  exports.warn = warn = function warn(msg, vm) {
	    if (hasConsole && !_config2.default.silent) {
	      console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	    }
	  };
	
	  formatComponentName = function formatComponentName(vm) {
	    var name = vm._isVue ? vm.$options.name : vm.name;
	    return name ? ' (found in component: <' + (0, _lang.hyphenate)(name) + '>)' : '';
	  };
	}
	
	exports.warn = warn;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mergeOptions = mergeOptions;
	exports.resolveAsset = resolveAsset;
	
	var _index = __webpack_require__(21);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _config = __webpack_require__(2);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _debug = __webpack_require__(19);
	
	var _dom = __webpack_require__(18);
	
	var _lang = __webpack_require__(16);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */
	
	var strats = _config2.default.optionMergeStrategies = Object.create(null);
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	
	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!(0, _lang.hasOwn)(to, key)) {
	      (0, _lang.set)(to, key, fromVal);
	    } else if ((0, _lang.isObject)(toVal) && (0, _lang.isObject)(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}
	
	/**
	 * Data
	 */
	
	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && (0, _debug.warn)('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};
	
	/**
	 * El
	 */
	
	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && (0, _debug.warn)('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};
	
	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	
	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeMount = strats.mounted = strats.beforeUpdate = strats.updated = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : (0, _lang.isArray)(childVal) ? childVal : [childVal] : parentVal;
	};
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	
	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal);
	  return childVal ? (0, _lang.extend)(res, childVal) : res;
	}
	
	_config2.default._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});
	
	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	
	strats.watch = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  (0, _lang.extend)(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !(0, _lang.isArray)(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};
	
	/**
	 * Other object hashes.
	 */
	
	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  (0, _lang.extend)(ret, parentVal);
	  (0, _lang.extend)(ret, childVal);
	  return ret;
	};
	
	/**
	 * Default strategy.
	 */
	
	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};
	
	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */
	
	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components;
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if ((0, _dom.isReservedTag)(key)) {
	        process.env.NODE_ENV !== 'production' && (0, _debug.warn)('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = (0, _lang.hyphenate)(key);
	      }
	      def = components[key];
	      if ((0, _lang.isPlainObject)(def)) {
	        components[key] = _index2.default.extend(def);
	      }
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */
	
	function guardProps(options) {
	  var res = {};
	  var props = options.props;
	  var i = void 0,
	      val = void 0;
	  if ((0, _lang.isArray)(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        res[(0, _lang.camelize)(val)] = null;
	      } else if (val.name) {
	        res[(0, _lang.camelize)(val.name)] = val;
	      }
	    }
	  } else if ((0, _lang.isPlainObject)(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      res[(0, _lang.camelize)(keys[i])] = typeof val === 'function' ? { type: val } : val;
	    }
	  }
	  options.props = res;
	}
	
	function guardDirectives(options) {
	  var dirs = options.directives;
	  if (dirs) {
	    var keys = Object.keys(dirs);
	    var i = keys.length;
	    while (i--) {
	      if (typeof dirs[keys[i]] === 'function') {
	        dirs[keys[i]] = { update: dirs[keys[i]] };
	      }
	    }
	  }
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */
	
	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  guardDirectives(child);
	  var options = {};
	  var key;
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!(0, _lang.hasOwn)(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @param {Boolean} warnMissing
	 * @return {Object|Function}
	 */
	
	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  var res = assets[id] ||
	  // camelCase ID
	  assets[camelizedId = (0, _lang.camelize)(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    (0, _debug.warn)('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }
	  return res;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Vue;
	
	var _state = __webpack_require__(22);
	
	var _render = __webpack_require__(28);
	
	var _events = __webpack_require__(42);
	
	var _lifecycle = __webpack_require__(41);
	
	var _index = __webpack_require__(15);
	
	var uid = 0;
	
	function Vue(options) {
	  this._init(options);
	}
	
	Vue.prototype._init = function (options) {
	  // a uid
	  this._uid = uid++;
	  // a flag to avoid this being observed
	  this._isVue = true;
	  // merge options
	  this.$options = (0, _index.mergeOptions)(this.constructor.options, options || {}, this);
	  (0, _lifecycle.initLifecycle)(this);
	  (0, _events.initEvents)(this);
	  (0, _lifecycle.callHook)(this, 'init');
	  (0, _state.initState)(this);
	  (0, _lifecycle.callHook)(this, 'created');
	  (0, _render.initRender)(this);
	};
	
	Vue.prototype.$nextTick = function (fn) {
	  (0, _index.nextTick)(fn, this);
	};
	
	(0, _state.stateMixin)(Vue);
	(0, _events.eventsMixin)(Vue);
	(0, _lifecycle.lifecycleMixin)(Vue);
	(0, _render.renderMixin)(Vue);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.initState = initState;
	exports.stateMixin = stateMixin;
	
	var _watcher = __webpack_require__(23);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _dep = __webpack_require__(24);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _index = __webpack_require__(26);
	
	var _index2 = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function initState(vm) {
	  vm._watchers = [];
	  initProps(vm);
	  initData(vm);
	  initComputed(vm);
	  initMethods(vm);
	  initWatch(vm);
	}
	
	function initProps(vm) {
	  var data = vm.$options._renderData;
	  var attrs = data && data.attrs || {};
	  var props = vm.$options.props;
	  if (props) {
	    (0, _index.withoutConversion)(function () {
	      for (var key in props) {
	        (0, _index.defineReactive)(vm, key, attrs[key]);
	      }
	    });
	  }
	}
	
	function initData(vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function' ? data() : data || {};
	  if (!(0, _index2.isPlainObject)(data)) {
	    data = {};
	    process.env.NODE_ENV !== 'production' && (0, _index2.warn)('data functions should return an object.', vm);
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var i = keys.length;
	  while (i--) {
	    proxy(vm, keys[i]);
	  }
	  // observe data
	  (0, _index.observe)(data, vm);
	}
	
	function noop() {}
	
	function initComputed(vm) {
	  var computed = vm.$options.computed;
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key];
	      var def = {
	        enumerable: true,
	        configurable: true
	      };
	      if (typeof userDef === 'function') {
	        def.get = makeComputedGetter(userDef, vm);
	        def.set = noop;
	      } else {
	        def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, vm) : (0, _index2.bind)(userDef.get, vm) : noop;
	        def.set = userDef.set ? (0, _index2.bind)(userDef.set, vm) : noop;
	      }
	      Object.defineProperty(vm, key, def);
	    }
	  }
	}
	
	function makeComputedGetter(getter, owner) {
	  var watcher = new _watcher2.default(owner, getter, null, {
	    lazy: true
	  });
	  return function computedGetter() {
	    if (watcher.dirty) {
	      watcher.evaluate();
	    }
	    if (_dep2.default.target) {
	      watcher.depend();
	    }
	    return watcher.value;
	  };
	}
	
	function initMethods(vm) {
	  var methods = vm.$options.methods;
	  if (methods) {
	    for (var key in methods) {
	      vm[key] = (0, _index2.bind)(methods[key], vm);
	    }
	  }
	}
	
	function initWatch(vm) {
	  var watch = vm.$options.watch;
	  if (watch) {
	    for (var key in watch) {
	      var handler = watch[key];
	      var options = void 0;
	      if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object') {
	        options = handler;
	        handler = handler.handler;
	      }
	      vm.$watch(key, handler, options);
	    }
	  }
	}
	
	function stateMixin(Vue) {
	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        setData(this, newData);
	      }
	    }
	  });
	
	  Vue.prototype.$watch = function (fn, cb, options) {
	    options = options || {};
	    options.user = true;
	    var watcher = new _watcher2.default(this, fn, cb, options);
	    if (options.immediate) {
	      cb.call(this, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };
	}
	
	function setData(vm, newData) {
	  newData = newData || {};
	  var oldData = vm._data;
	  vm._data = newData;
	  var keys, key, i;
	  // unproxy keys not present in new data
	  keys = Object.keys(oldData);
	  i = keys.length;
	  while (i--) {
	    key = keys[i];
	    if (!(key in newData)) {
	      unproxy(vm, key);
	    }
	  }
	  // proxy keys not already proxied,
	  // and trigger change for changed values
	  keys = Object.keys(newData);
	  i = keys.length;
	  while (i--) {
	    key = keys[i];
	    if (!(0, _index2.hasOwn)(vm, key)) {
	      // new property
	      proxy(vm, key);
	    }
	  }
	  oldData.__ob__.removeVm(vm);
	  (0, _index.observe)(newData, vm);
	  vm.$forceUpdate();
	}
	
	function proxy(vm, key) {
	  if (!(0, _index2.isReserved)(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter() {
	        return vm._data[key];
	      },
	      set: function proxySetter(val) {
	        vm._data[key] = val;
	      }
	    });
	  }
	}
	
	function unproxy(vm, key) {
	  if (!(0, _index2.isReserved)(key)) {
	    delete vm[key];
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Watcher;
	
	var _config = __webpack_require__(2);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _dep = __webpack_require__(24);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _batcher = __webpack_require__(25);
	
	var _index = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var uid = 0;
	var prevTarget = void 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    (0, _index.extend)(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _index._Set();
	  this.newDepIds = new _index._Set();
	  // parse expression for getter
	  if (isFn) {
	    this.getter = expOrFn;
	  } else {
	    this.getter = (0, _index.parsePath)(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      process.env.NODE_ENV !== 'production' && (0, _index.warn)('Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.');
	    }
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var value = this.getter.call(this.vm, this.vm);
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  this.afterGet();
	  return value;
	};
	
	/**
	 * Prepare for dependency collection.
	 */
	
	Watcher.prototype.beforeGet = function () {
	  prevTarget = _dep2.default.target;
	  _dep2.default.target = this;
	};
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	
	Watcher.prototype.afterGet = function () {
	  _dep2.default.target = prevTarget;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */
	
	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && _config2.default.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    (0, _batcher.pushWatcher)(this);
	  }
	};
	
	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */
	
	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    ((0, _index.isObject)(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      this.cb.call(this.vm, value, oldValue);
	    }
	    this.queued = this.shallow = false;
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	
	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = _dep2.default.target;
	  this.value = this.get();
	  this.dirty = false;
	  _dep2.default.target = current;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	
	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};
	
	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */
	
	function traverse(val) {
	  var i, keys;
	  if ((0, _index.isArray)(val)) {
	    i = val.length;
	    while (i--) {
	      traverse(val[i]);
	    }
	  } else if ((0, _index.isObject)(val)) {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      traverse(val[keys[i]]);
	    }
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Dep;
	var uid = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	
	function Dep() {
	  this.id = uid++;
	  this.subs = [];
	}
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};
	
	/**
	 * Add self as a dependency to the target watcher.
	 */
	
	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.pushWatcher = pushWatcher;
	
	var _config = __webpack_require__(2);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _index = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	
	var queueIndex;
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var internalQueueDepleted = false;
	
	/**
	 * Reset the batcher's state.
	 */
	
	function resetBatcherState() {
	  queue = [];
	  userQueue = [];
	  has = {};
	  circular = {};
	  waiting = internalQueueDepleted = false;
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	
	function flushBatcherQueue() {
	  runBatcherQueue(queue);
	  internalQueueDepleted = true;
	  runBatcherQueue(userQueue);
	  resetBatcherState();
	}
	
	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */
	
	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (queueIndex = 0; queueIndex < queue.length; queueIndex++) {
	    var watcher = queue[queueIndex];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > _config2.default._maxUpdateCount) {
	        (0, _index.warn)('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	        break;
	      }
	    }
	  }
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */
	
	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    if (internalQueueDepleted && !watcher.user) {
	      // an internal watcher triggered by a user watcher...
	      // let's run it immediately after current user watcher is done.
	      userQueue.splice(queueIndex + 1, 0, watcher);
	    } else {
	      // push watcher into appropriate queue
	      var q = watcher.user ? userQueue : queue;
	      has[id] = q.length;
	      q.push(watcher);
	      // queue the flush
	      if (!waiting) {
	        waiting = true;
	        (0, _index.nextTick)(flushBatcherQueue);
	      }
	    }
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.withoutConversion = withoutConversion;
	exports.Observer = Observer;
	exports.observe = observe;
	exports.defineReactive = defineReactive;
	
	var _dep = __webpack_require__(24);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _array = __webpack_require__(27);
	
	var _index = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var arrayKeys = Object.getOwnPropertyNames(_array.arrayMethods);
	
	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However in certain cases, e.g.
	 * v-for scope alias and props, we don't want to force conversion
	 * because the value may be a nested value under a frozen data structure.
	 *
	 * So whenever we want to set a reactive property without forcing
	 * conversion on the new value, we wrap that call inside this function.
	 */
	
	var shouldConvert = true;
	function withoutConversion(fn) {
	  shouldConvert = false;
	  fn();
	  shouldConvert = true;
	}
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */
	
	function Observer(value) {
	  this.value = value;
	  this.dep = new _dep2.default();
	  (0, _index.def)(value, '__ob__', this);
	  if ((0, _index.isArray)(value)) {
	    var augment = _index.hasProto ? protoAugment : copyAugment;
	    augment(value, _array.arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}
	
	// Instance methods
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */
	
	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};
	
	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */
	
	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    (0, _index.def)(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */
	
	function observe(value, vm) {
	  if (!(0, _index.isObject)(value)) {
	    return;
	  }
	  var ob;
	  if ((0, _index.hasOwn)(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldConvert && ((0, _index.isArray)(value) || (0, _index.isPlainObject)(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}
	
	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */
	
	function defineReactive(obj, key, val) {
	  var dep = new _dep2.default();
	
	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (_dep2.default.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if ((0, _index.isArray)(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.arrayMethods = undefined;
	
	var _index = __webpack_require__(15);
	
	var arrayProto = Array.prototype;
	var arrayMethods = exports.arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  (0, _index.def)(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});
	
	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */
	
	(0, _index.def)(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});
	
	/**
	 * Convenience method to remove the element at given index or target element reference.
	 *
	 * @param {*} item
	 */
	
	(0, _index.def)(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = this.indexOf(item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderState = undefined;
	exports.initRender = initRender;
	exports.renderMixin = renderMixin;
	
	var _watcher = __webpack_require__(23);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _index = __webpack_require__(15);
	
	var _index2 = __webpack_require__(29);
	
	var _lifecycle = __webpack_require__(41);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var renderState = exports.renderState = {
	  activeInstance: null
	};
	
	function initRender(vm) {
	  vm._vnode = null;
	  vm._mounted = false;
	  vm._renderData = vm.$options._renderData;
	  vm.$slots = {};
	  // props are set in initState
	  resolveSlots(vm, vm.$options._renderChildren);
	  var el = vm.$options.el;
	  if (el) {
	    vm.$mount(el);
	  }
	}
	
	function resolveSlots(vm, children) {
	  if (children) {
	    var slots = { default: children };
	    var i = children.length;
	    var name = void 0,
	        child = void 0;
	    while (i--) {
	      child = children[i];
	      if (name = child.data && child.data.slot) {
	        (slots[name] || (slots[name] = [])).push(child);
	        children.splice(i, 1);
	      }
	    }
	    vm.$slots = slots;
	  }
	}
	
	function mergeParentData(vm, data, parentData) {
	  // attrs
	  if (parentData.attrs) {
	    var props = vm.$options.props;
	    for (var key in parentData.attrs) {
	      if (!(0, _index.hasOwn)(props, key)) {
	        data.attrs[key] = parentData.attrs[key];
	      }
	    }
	  }
	  // directives
	  if (parentData.directives) {
	    data.directives = parentData.directives.conact(data.directives || []);
	  }
	}
	
	function renderMixin(Vue) {
	  // shorthands used in render functions
	  Vue.prototype.__h__ = _index2.createElement;
	  Vue.prototype.__d__ = function (id) {
	    return (0, _index.resolveAsset)(this.$options, 'directives', id, true);
	  };
	
	  Vue.prototype._update = function (vnode) {
	    (0, _lifecycle.callHook)(this, 'beforeUpdate');
	    if (!this._vnode) {
	      this.$el = (0, _index2.patch)(this.$el, vnode);
	    } else {
	      this.$el = (0, _index2.patch)(this._vnode, vnode);
	    }
	    this._vnode = vnode;
	    (0, _lifecycle.callHook)(this, 'updated');
	  };
	
	  Vue.prototype._tryUpdate = function (data, children) {
	    this._renderData = data;
	    if (children) {
	      resolveSlots(this, children);
	      this.$forceUpdate();
	      return;
	    }
	    // set props if they have changed.
	    var attrs = data && data.attrs;
	    if (attrs) {
	      for (var key in this.$options.props) {
	        var newVal = (0, _index.hasOwn)(attrs, key) ? attrs[key] : attrs[(0, _index.hyphenate)(key)];
	        if (this[key] !== newVal) {
	          this[key] = newVal;
	        }
	      }
	    }
	  };
	
	  Vue.prototype._render = function () {
	    var prev = renderState.activeInstance;
	    renderState.activeInstance = this;
	    var vnode = this.$options.render.call(this);
	    var data = vnode.data;
	    var parentData = this._renderData;
	    if (parentData) {
	      mergeParentData(this, data, parentData);
	    }
	    renderState.activeInstance = prev;
	    return vnode;
	  };
	
	  Vue.prototype.$mount = function (el) {
	    (0, _lifecycle.callHook)(this, 'beforeMount');
	    this.$el = el && (0, _index.query)(el);
	    if (this.$el) {
	      this.$el.innerHTML = '';
	    }
	    this._watcher = new _watcher2.default(this, this._render, this._update);
	    this._update(this._watcher.value);
	    (0, _lifecycle.callHook)(this, 'mounted');
	    this._mounted = true;
	    return this;
	  };
	
	  Vue.prototype.$forceUpdate = function () {
	    this._watcher.update();
	  };
	}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createElement = exports.patch = undefined;
	
	var _patch = __webpack_require__(30);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	var _createElement = __webpack_require__(33);
	
	var _createElement2 = _interopRequireDefault(_createElement);
	
	var _class = __webpack_require__(35);
	
	var _class2 = _interopRequireDefault(_class);
	
	var _style = __webpack_require__(36);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _props = __webpack_require__(37);
	
	var _props2 = _interopRequireDefault(_props);
	
	var _attrs = __webpack_require__(38);
	
	var _attrs2 = _interopRequireDefault(_attrs);
	
	var _events = __webpack_require__(39);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _directives = __webpack_require__(40);
	
	var _directives2 = _interopRequireDefault(_directives);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Virtual DOM implementation based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * with custom modifications.
	 */
	
	var patch = (0, _patch2.default)([_class2.default, _props2.default, _attrs2.default, _style2.default, _events2.default, _directives2.default]);
	
	exports.patch = patch;
	exports.createElement = _createElement2.default;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = createPatchFunction;
	
	var _vnode = __webpack_require__(31);
	
	var _vnode2 = _interopRequireDefault(_vnode);
	
	var _dom = __webpack_require__(32);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _index = __webpack_require__(15);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var emptyNode = (0, _vnode2.default)('', {}, []);
	var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
	var svgNS = 'http://www.w3.org/2000/svg';
	
	function isUndef(s) {
	    return s === undefined;
	}
	
	function isDef(s) {
	    return s !== undefined;
	}
	
	function sameVnode(vnode1, vnode2) {
	    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
	}
	
	function createKeyToOldIdx(children, beginIdx, endIdx) {
	    var i = void 0,
	        key = void 0;
	    var map = {};
	    for (i = beginIdx; i <= endIdx; ++i) {
	        key = children[i].key;
	        if (isDef(key)) map[key] = i;
	    }
	    return map;
	}
	
	function createPatchFunction(modules, api) {
	    var i = void 0,
	        j = void 0;
	    var cbs = {};
	
	    if (isUndef(api)) api = dom;
	
	    for (i = 0; i < hooks.length; ++i) {
	        cbs[hooks[i]] = [];
	        for (j = 0; j < modules.length; ++j) {
	            if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
	        }
	    }
	
	    function emptyNodeAt(elm) {
	        return (0, _vnode2.default)(api.tagName(elm).toLowerCase(), {}, [], undefined, elm);
	    }
	
	    function createRmCb(childElm, listeners) {
	        return function remove() {
	            if (--listeners === 0) {
	                var parent = api.parentNode(childElm);
	                api.removeChild(parent, childElm);
	            }
	        };
	    }
	
	    function createElm(vnode, insertedVnodeQueue) {
	        var i = void 0,
	            elm = void 0;
	        var data = vnode.data;
	        if (isDef(data)) {
	            if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode);
	            if (isDef(i = data.child)) {
	                return i._vnode.elm;
	            }
	        }
	        var children = vnode.children;
	        var tag = vnode.sel;
	        if (isDef(tag)) {
	            elm = vnode.elm = isDef(data) && data.svg ? api.createElementNS(svgNS, tag) : api.createElement(tag);
	            if (Array.isArray(children)) {
	                for (i = 0; i < children.length; ++i) {
	                    api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
	                }
	            } else if ((0, _index.isPrimitive)(vnode.text)) {
	                api.appendChild(elm, api.createTextNode(vnode.text));
	            }
	            for (i = 0; i < cbs.create.length; ++i) {
	                cbs.create[i](emptyNode, vnode);
	            }i = vnode.data.hook; // Reuse variable
	            if (isDef(i)) {
	                if (i.create) i.create(emptyNode, vnode);
	                if (i.insert) insertedVnodeQueue.push(vnode);
	            }
	        } else {
	            elm = vnode.elm = api.createTextNode(vnode.text);
	        }
	        return vnode.elm;
	    }
	
	    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	        for (; startIdx <= endIdx; ++startIdx) {
	            api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
	        }
	    }
	
	    function invokeDestroyHook(vnode) {
	        var i = void 0,
	            j = void 0;
	        var data = vnode.data;
	        if (isDef(data)) {
	            if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
	            for (i = 0; i < cbs.destroy.length; ++i) {
	                cbs.destroy[i](vnode);
	            }if (isDef(i = vnode.children)) {
	                for (j = 0; j < vnode.children.length; ++j) {
	                    invokeDestroyHook(vnode.children[j]);
	                }
	            }
	            if (isDef(i = data.child)) invokeDestroyHook(i._vnode);
	        }
	    }
	
	    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	        for (; startIdx <= endIdx; ++startIdx) {
	            var _i = void 0,
	                listeners = void 0,
	                rm = void 0;
	            var ch = vnodes[startIdx];
	            if (isDef(ch)) {
	                if (isDef(ch.sel)) {
	                    invokeDestroyHook(ch);
	                    listeners = cbs.remove.length + 1;
	                    rm = createRmCb(ch.elm || ch.data.child._vnode.elm, listeners);
	                    for (_i = 0; _i < cbs.remove.length; ++_i) {
	                        cbs.remove[_i](ch, rm);
	                    }if (isDef(_i = ch.data) && isDef(_i = _i.hook) && isDef(_i = _i.remove)) {
	                        _i(ch, rm);
	                    } else {
	                        rm();
	                    }
	                } else {
	                    // Text node
	                    api.removeChild(parentElm, ch.elm);
	                }
	            }
	        }
	    }
	
	    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
	        var oldStartIdx = 0;
	        var newStartIdx = 0;
	        var oldEndIdx = oldCh.length - 1;
	        var oldStartVnode = oldCh[0];
	        var oldEndVnode = oldCh[oldEndIdx];
	        var newEndIdx = newCh.length - 1;
	        var newStartVnode = newCh[0];
	        var newEndVnode = newCh[newEndIdx];
	        var oldKeyToIdx = void 0,
	            idxInOld = void 0,
	            elmToMove = void 0,
	            before = void 0;
	
	        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	            if (isUndef(oldStartVnode)) {
	                oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	            } else if (isUndef(oldEndVnode)) {
	                oldEndVnode = oldCh[--oldEndIdx];
	            } else if (sameVnode(oldStartVnode, newStartVnode)) {
	                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	                oldStartVnode = oldCh[++oldStartIdx];
	                newStartVnode = newCh[++newStartIdx];
	            } else if (sameVnode(oldEndVnode, newEndVnode)) {
	                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	                oldEndVnode = oldCh[--oldEndIdx];
	                newEndVnode = newCh[--newEndIdx];
	            } else if (sameVnode(oldStartVnode, newEndVnode)) {
	                // Vnode moved right
	                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
	                oldStartVnode = oldCh[++oldStartIdx];
	                newEndVnode = newCh[--newEndIdx];
	            } else if (sameVnode(oldEndVnode, newStartVnode)) {
	                // Vnode moved left
	                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	                oldEndVnode = oldCh[--oldEndIdx];
	                newStartVnode = newCh[++newStartIdx];
	            } else {
	                if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	                idxInOld = oldKeyToIdx[newStartVnode.key];
	                if (isUndef(idxInOld)) {
	                    // New element
	                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	                    newStartVnode = newCh[++newStartIdx];
	                } else {
	                    elmToMove = oldCh[idxInOld];
	                    patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	                    oldCh[idxInOld] = undefined;
	                    api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
	                    newStartVnode = newCh[++newStartIdx];
	                }
	            }
	        }
	        if (oldStartIdx > oldEndIdx) {
	            before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	        } else if (newStartIdx > newEndIdx) {
	            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	        }
	    }
	
	    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
	        var i = void 0,
	            j = void 0,
	            hook = void 0;
	
	        //if prepatch hook is defined, call it.
	        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	            i(oldVnode, vnode);
	        }
	
	        // child component. skip and let it do its own thing.
	        if (isDef(i = oldVnode.data) && isDef(j = vnode.data) && isDef(i = i.child) && isDef(j = j.child) && i === j) {
	            return;
	        }
	
	        /*
	        This step is very important. `vnode.elm = oldVnode.elm`.
	        `oldVnode.elm` is the current DOM node in the DOM tree.
	        Essentially, we are trying to reuse the existing DOM node here.
	        Instead of creating a new DOM node, we modify the existing DOM node to make it align with the new `vnode`.
	        The modification includes attributes, properties, handlers, and children.
	         */
	        var elm = vnode.elm = oldVnode.elm;
	        var oldCh = oldVnode.children;
	        var ch = vnode.children;
	        if (oldVnode === vnode) return;
	
	        /*
	        We mentioned about reusing DOM node. There is on exception though. If the new `vnode` and `oldVnode` is of different
	        type, there is a high chance they are entirely different: different attributes, different children and so on. So in
	        this case, we might as well 
	         */
	        if (!sameVnode(oldVnode, vnode)) {
	            var parentElm = api.parentNode(oldVnode.elm);
	            elm = createElm(vnode, insertedVnodeQueue);
	            api.insertBefore(parentElm, elm, oldVnode.elm);
	            removeVnodes(parentElm, [oldVnode], 0, 0);
	            return;
	        }
	        if (isDef(vnode.data)) {
	            for (i = 0; i < cbs.update.length; ++i) {
	                cbs.update[i](oldVnode, vnode);
	            }i = vnode.data.hook;
	            if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
	        }
	        if (isUndef(vnode.text)) {
	            if (isDef(oldCh) && isDef(ch)) {
	                if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
	            } else if (isDef(ch)) {
	                if (isDef(oldVnode.text)) api.setTextContent(elm, '');
	                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	            } else if (isDef(oldCh)) {
	                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	            } else if (isDef(oldVnode.text)) {
	                api.setTextContent(elm, '');
	            }
	        } else if (oldVnode.text !== vnode.text) {
	            api.setTextContent(elm, vnode.text);
	        }
	        if (isDef(hook) && isDef(i = hook.postpatch)) {
	            i(oldVnode, vnode);
	        }
	    }
	
	    return function patch(oldVnode, vnode) {
	        //locate patch
	        var i, elm, parent;
	        var insertedVnodeQueue = [];
	        for (i = 0; i < cbs.pre.length; ++i) {
	            cbs.pre[i]();
	        }if (!oldVnode) {
	            createElm(vnode, insertedVnodeQueue);
	        } else {
	            /*
	             this condition is true when we have:
	              <div id="app">
	                //something in here.
	             </div>
	              new Vue({
	                el: "#app"
	             });
	              In this case, oldVnode is actually not a vnode, but an actual DOM node #app.
	             During compile phase, the inner content of #app has been removed, and so #app
	             at this point is an "empty node" (no children).
	              And since oldVnode is an actual DOM here, it has no `sel` property. And we make use
	             of this characteristic to identify this pattern.
	              To make it easier to compare the oldVnode and vnode, we call `emptyNodeAt` to convert
	             oldVnode from a DOM node to a vnode.
	             */
	            if (isUndef(oldVnode.sel)) {
	                oldVnode = emptyNodeAt(oldVnode);
	            }
	
	            //if they are of the same type, then we call `patchVnode`.
	            if (sameVnode(oldVnode, vnode)) {
	                patchVnode(oldVnode, vnode, insertedVnodeQueue);
	            } else {
	                elm = oldVnode.elm;
	                parent = api.parentNode(elm);
	
	                createElm(vnode, insertedVnodeQueue);
	
	                if (parent !== null) {
	                    api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
	                    removeVnodes(parent, [oldVnode], 0, 0);
	                }
	            }
	        }
	
	        for (i = 0; i < insertedVnodeQueue.length; ++i) {
	            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
	        }
	        for (i = 0; i < cbs.post.length; ++i) {
	            cbs.post[i]();
	        }return vnode.elm;
	    };
	}

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = VNode;
	function VNode(sel, data, children, text, elm) {
	  return { sel: sel, data: data, children: children, text: text, elm: elm, key: data && data.key };
	}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createElement = createElement;
	exports.createElementNS = createElementNS;
	exports.createTextNode = createTextNode;
	exports.insertBefore = insertBefore;
	exports.removeChild = removeChild;
	exports.appendChild = appendChild;
	exports.parentNode = parentNode;
	exports.nextSibling = nextSibling;
	exports.tagName = tagName;
	exports.setTextContent = setTextContent;
	function createElement(tagName) {
	  return document.createElement(tagName);
	}
	
	function createElementNS(namespaceURI, qualifiedName) {
	  return document.createElementNS(namespaceURI, qualifiedName);
	}
	
	function createTextNode(text) {
	  return document.createTextNode(text);
	}
	
	function insertBefore(parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}
	
	function removeChild(node, child) {
	  node.removeChild(child);
	}
	
	function appendChild(node, child) {
	  node.appendChild(child);
	}
	
	function parentNode(node) {
	  return node.parentElement;
	}
	
	function nextSibling(node) {
	  return node.nextSibling;
	}
	
	function tagName(node) {
	  return node.tagName;
	}
	
	function setTextContent(node, text) {
	  node.textContent = text;
	}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createElement;
	
	var _vnode = __webpack_require__(31);
	
	var _vnode2 = _interopRequireDefault(_vnode);
	
	var _component = __webpack_require__(34);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _render = __webpack_require__(28);
	
	var _index = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createElement(tag, data, children) {
	  children = flatten(children);
	  var parent = _render.renderState.activeInstance;
	  if (typeof tag === 'string') {
	    var Ctor = void 0;
	    if ((0, _index.isReservedTag)(tag)) {
	      return (0, _vnode2.default)(tag, data, children);
	    } else if (Ctor = (0, _index.resolveAsset)(parent.$options, 'components', tag)) {
	      return (0, _component2.default)(Ctor, data, parent, children);
	    } else {
	      if (process.env.NODE_ENV !== 'production') {
	        if (!data.svg && (0, _index.isUnknownElement)(tag)) {
	          (0, _index.warn)('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	      return (0, _vnode2.default)(tag, data, children);
	    }
	  } else {
	    return (0, _component2.default)(tag, data, parent, children);
	  }
	}
	
	function flatten(children) {
	  if ((0, _index.isArray)(children)) {
	    var res = [];
	    for (var i = 0, l = children.length; i < l; i++) {
	      var e = children[i];
	      // flatten nested
	      if ((0, _index.isArray)(e)) {
	        for (var j = 0, k = e.length; j < k; j++) {
	          if (e[j]) {
	            res.push(e[j]);
	          }
	        }
	      } else if ((0, _index.isPrimitive)(e)) {
	        // convert primitive to vnode
	        res.push((0, _vnode2.default)(undefined, undefined, undefined, e));
	      } else if (e) {
	        res.push(e);
	      }
	    }
	    return res;
	  } else {
	    return children;
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = Component;
	
	var _index = __webpack_require__(21);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Component(Ctor, data, parent, children) {
	  if ((typeof Ctor === 'undefined' ? 'undefined' : _typeof(Ctor)) === 'object') {
	    Ctor = _index2.default.extend(Ctor);
	  }
	  // return a placeholder vnode
	  return {
	    sel: 'component',
	    data: {
	      hook: { init: init, prepatch: prepatch, destroy: destroy },
	      Ctor: Ctor, data: data, parent: parent, children: children,
	      key: data && data.key
	    }
	  };
	}
	
	function init(vnode) {
	  var data = vnode.data;
	  var child = new data.Ctor({
	    parent: data.parent,
	    _renderData: data.data,
	    _renderChildren: data.children
	  });
	  child.$mount();
	  data.child = child;
	}
	
	function prepatch(oldVnode, vnode) {
	  var old = oldVnode.data;
	  var cur = vnode.data;
	  if (cur.Ctor !== old.Ctor) {
	    // component changed, teardown and create new
	    // TODO: keep-alive?
	    old.child.$destroy();
	    init(vnode);
	  } else {
	    cur.child = old.child;
	    // try re-render child. the child may optimize it
	    // and just does nothing.
	    old.child._tryUpdate(cur.data, cur.children);
	  }
	}
	
	function destroy(vnode) {
	  vnode.data.child.$destroy();
	}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(15);
	
	function genClass(data) {
	  if (!data) {
	    return '';
	  }
	  if ((0, _index.isObject)(data)) {
	    var res = '';
	    for (var key in data) {
	      if (data[key]) res += key + ' ';
	    }
	    return res.slice(0, -1);
	  }
	  if ((0, _index.isArray)(data)) {
	    var _res = '';
	    for (var i = 0, l = data.length; i < l; i++) {
	      if (data[i]) _res += genClass(data[i]) + ' ';
	    }
	    return _res.slice(0, -1);
	  }
	  if (typeof data === 'string') {
	    return data;
	  }
	}
	
	function updateClass(oldVnode, vnode) {
	  var dynamicClass = vnode.data.class;
	  var staticClass = vnode.data.staticClass;
	  if (staticClass || dynamicClass) {
	    dynamicClass = genClass(dynamicClass);
	    var cls = staticClass ? staticClass + (dynamicClass ? ' ' + dynamicClass : '') : dynamicClass;
	    if (cls !== oldVnode.class) {
	      (0, _index.setClass)(vnode.elm, cls);
	    }
	    vnode.class = cls;
	  }
	}
	
	exports.default = {
	  create: updateClass,
	  update: updateClass
	};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// TODO:
	// - include prefix sniffing of v-bind:style
	
	function updateStyle(oldVnode, vnode) {
	  var cur = void 0,
	      name = void 0;
	  var elm = vnode.elm;
	  var oldStyle = oldVnode.data.style || {};
	  var style = vnode.data.style || {};
	
	  for (name in oldStyle) {
	    if (!style[name]) {
	      elm.style[name] = '';
	    }
	  }
	  for (name in style) {
	    cur = style[name];
	    if (cur !== oldStyle[name]) {
	      elm.style[name] = cur;
	    }
	  }
	}
	
	exports.default = {
	  create: updateStyle,
	  update: updateStyle
	};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function updateProps(oldVnode, vnode) {
	  var key = void 0,
	      cur = void 0,
	      old = void 0;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.props || {};
	  var props = vnode.data.props || {};
	
	  for (key in oldProps) {
	    if (!props[key]) {
	      delete elm[key];
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    old = oldProps[key];
	    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
	      elm[key] = cur;
	    }
	  }
	}
	
	exports.default = {
	  create: updateProps,
	  update: updateProps
	};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var booleanAttrs = ['allowfullscreen', 'async', 'autofocus', 'autoplay', 'checked', 'compact', 'controls', 'declare', 'default', 'defaultchecked', 'defaultmuted', 'defaultselected', 'defer', 'disabled', 'draggable', 'enabled', 'formnovalidate', 'hidden', 'indeterminate', 'inert', 'ismap', 'itemscope', 'loop', 'multiple', 'muted', 'nohref', 'noresize', 'noshade', 'novalidate', 'nowrap', 'open', 'pauseonexit', 'readonly', 'required', 'reversed', 'scoped', 'seamless', 'selected', 'sortable', 'spellcheck', 'translate', 'truespeed', 'typemustmatch', 'visible'];
	
	var booleanAttrsDict = {};
	for (var i = 0, len = booleanAttrs.length; i < len; i++) {
	  booleanAttrsDict[booleanAttrs[i]] = true;
	}
	
	function updateAttrs(oldVnode, vnode) {
	  var key = void 0,
	      cur = void 0,
	      old = void 0;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	
	  // update modified attributes, add new attributes
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      // TODO: add support to namespaced attributes (setAttributeNS)
	      if (booleanAttrsDict[key] && cur == null) {
	        elm.removeAttribute(key);
	      } else {
	        elm.setAttribute(key, cur);
	      }
	    }
	  }
	  // remove removed attributes
	  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
	  // the other option is to remove all attributes with value == undefined
	  for (key in oldAttrs) {
	    if (!(key in attrs)) {
	      elm.removeAttribute(key);
	    }
	  }
	}
	
	exports.default = {
	  create: updateAttrs,
	  update: updateAttrs
	};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function arrInvoker(arr) {
	  return function (ev) {
	    for (var i = 0; i < arr.length; i++) {
	      arr[i](ev);
	    }
	  };
	}
	
	function fnInvoker(o) {
	  return function (ev) {
	    o.fn(ev);
	  };
	}
	
	function updateEventListeners(oldVnode, vnode) {
	  var name = void 0,
	      cur = void 0,
	      old = void 0,
	      event = void 0,
	      capture = void 0;
	  var elm = vnode.elm;
	  var oldOn = oldVnode.data.on || {};
	  var on = vnode.data.on;
	  if (!on) return;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (old === undefined) {
	      capture = name.charAt(0) === '!';
	      event = capture ? name.slice(1) : name;
	      if (Array.isArray(cur)) {
	        elm.addEventListener(event, arrInvoker(cur), capture);
	      } else {
	        cur = { fn: cur };
	        on[name] = cur;
	        elm.addEventListener(event, fnInvoker(cur), capture);
	      }
	    } else if (Array.isArray(old)) {
	      // Deliberately modify old array since it's captured in closure created with `arrInvoker`
	      old.length = cur.length;
	      for (var i = 0; i < old.length; ++i) {
	        old[i] = cur[i];
	      }on[name] = old;
	    } else {
	      old.fn = cur;
	      on[name] = old;
	    }
	  }
	}
	
	exports.default = {
	  create: updateEventListeners,
	  update: updateEventListeners
	};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  create: function create(oldVnode, vnode) {
	    applyDirectives(oldVnode, vnode, 'bind');
	  },
	  update: function update(oldVnode, vnode) {
	    applyDirectives(oldVnode, vnode, 'update', true);
	  },
	  destroy: function destroy(vnode) {
	    applyDirectives(null, vnode, 'unbind');
	  }
	};
	
	
	function applyDirectives(oldVnode, vnode, hook, update) {
	  var dirs = vnode.data.directives;
	  if (dirs) {
	    for (var i = 0; i < dirs.length; i++) {
	      var dir = dirs[i];
	      var fn = dir.def[hook];
	      if (fn) {
	        // only call update if value has changed
	        if (update) {
	          var oldValue = oldVnode.data.directives[i].value;
	          if (oldValue === dir.value) {
	            continue;
	          }
	        }
	        fn(vnode.elm, dir.value, dir.modifiers);
	      }
	    }
	  }
	}

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.callHook = callHook;
	exports.initLifecycle = initLifecycle;
	exports.lifecycleMixin = lifecycleMixin;
	function callHook(vm, hook) {
	  vm.$emit('pre-hook:' + hook);
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(vm);
	    }
	  }
	  vm.$emit('hook:' + hook);
	}
	
	function initLifecycle(vm) {
	  var options = vm.$options;
	  vm.$parent = options.parent;
	  vm.$root = vm.$parent ? vm.$parent.$root : vm;
	  if (vm.$parent) {
	    vm.$parent.$children.push(vm);
	    // TODO: handle ref
	  }
	  vm.$children = [];
	  vm.$refs = {};
	  vm.$els = {};
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}
	
	function lifecycleMixin(Vue) {
	  Vue.prototype.$destroy = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    callHook(this, 'beforeDestroy');
	    this._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // TODO: handle ref
	    }
	    // teardown watchers
	    var i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // call the last hook...
	    this._isDestroyed = true;
	    callHook(this, 'destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initEvents = initEvents;
	exports.eventsMixin = eventsMixin;
	
	var _index = __webpack_require__(15);
	
	function initEvents(vm) {
	  vm._events = Object.create(null);
	}
	
	function eventsMixin(Vue) {
	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    return this;
	  };
	
	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };
	
	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      this._events = Object.create(null);
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Trigger an event on self.
	   *
	   * @param {String} event
	   */
	
	  Vue.prototype.$emit = function (event) {
	    var cbs = this._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? (0, _index.toArray)(cbs) : cbs;
	      var args = (0, _index.toArray)(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(this, args);
	      }
	    }
	  };
	}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(21);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _globalApi = __webpack_require__(44);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _globalApi.initGlobalAPI)(_index2.default);
	
	_index2.default.version = '2.0.0';
	
	exports.default = _index2.default;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initGlobalAPI = initGlobalAPI;
	
	var _config = __webpack_require__(2);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _index = __webpack_require__(15);
	
	var util = _interopRequireWildcard(_index);
	
	var _index2 = __webpack_require__(29);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function initGlobalAPI(Vue) {
	  Vue.h = Vue.createElement = _index2.createElement;
	  Vue.config = _config2.default;
	  Vue.util = util;
	  Vue.set = _index.set;
	  Vue.delete = _index.del;
	  Vue.nextTick = _index.nextTick;
	
	  Vue.options = {
	    directives: Object.create(null),
	    filters: Object.create(null),
	    components: Object.create(null),
	    transitions: Object.create(null)
	
	    /**
	     * Each instance constructor, including Vue, has a unique
	     * cid. This enables us to create wrapped "child
	     * constructors" for prototypal inheritance and cache them.
	     */
	
	  };Vue.cid = 0;
	  var cid = 1;
	
	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */
	
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        (0, _index.warn)('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = (0, _index.mergeOptions)(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    _config2.default._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };
	
	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */
	
	  function createClass(name) {
	    return new Function('return function ' + (0, _index.classify)(name) + ' (options) { this._init(options) }')();
	  }
	
	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */
	
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = (0, _index.toArray)(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };
	
	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */
	
	  Vue.mixin = function (mixin) {
	    Vue.options = (0, _index.mergeOptions)(Vue.options, mixin);
	  };
	
	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */
	
	  _config2.default._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (0, _index.isReservedTag)(id)) {
	            (0, _index.warn)('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && (0, _index.isPlainObject)(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ })
/******/ ])
});
;
//# sourceMappingURL=vue.js.map