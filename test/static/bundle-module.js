$_mod.installed("makeup-roving-tabindex$0.2.3", "custom-event-polyfill", "1.0.7");
$_mod.installed("makeup-roving-tabindex$0.2.3", "nodelist-foreach-polyfill", "1.2.0");
$_mod.main("/nodelist-foreach-polyfill$1.2.0", "");
$_mod.def("/nodelist-foreach-polyfill$1.2.0/index", function(require, exports, module, __filename, __dirname) { if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

});
$_mod.installed("makeup-roving-tabindex$0.2.3", "makeup-navigation-emitter", "0.3.0");
$_mod.installed("makeup-navigation-emitter$0.3.0", "custom-event-polyfill", "1.0.7");
$_mod.installed("makeup-navigation-emitter$0.3.0", "nodelist-foreach-polyfill", "1.2.0");
$_mod.installed("makeup-key-emitter$0.1.0", "custom-event-polyfill", "1.0.7");
$_mod.installed("makeup-exit-emitter$0.2.0", "custom-event-polyfill", "1.0.7");
$_mod.main("/nanoid$2.0.3", "");
$_mod.remap("/nanoid$2.0.3/index", "/nanoid$2.0.3/index.browser");
$_mod.builtin("process", "/process$0.6.0/browser");
$_mod.def("/process$0.6.0/browser", function(require, exports, module, __filename, __dirname) { // shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.once = noop;
process.off = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

});
$_mod.def("/nanoid$2.0.3/index.browser", function(require, exports, module, __filename, __dirname) { var process=require("process"); if (process.env.NODE_ENV !== 'production') {
  if (typeof self === 'undefined' || (!self.crypto && !self.msCrypto)) {
    throw new Error(
      'Your browser does not have secure random generator. ' +
      'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}

var crypto = self.crypto || self.msCrypto

/*
 * This alphabet uses a-z A-Z 0-9 _- symbols.
 * Symbols order was changed for better gzip compression.
 */
var url = 'Uint8ArdomValuesObj012345679BCDEFGHIJKLMNPQRSTWXYZ_cfghkpqvwxyz-'

module.exports = function (size) {
  size = size || 21
  var id = ''
  var bytes = crypto.getRandomValues(new Uint8Array(size))
  while (0 < size--) {
    id += url[bytes[size] & 63]
  }
  return id
}

});
$_mod.def("/makeup-roving-tabindex$0.2.3/index", function(require, exports, module, __filename, __dirname) { 'use strict';
/* Requires following polyfills or transforms for IE11
 * Object.assign
 * NodeList.forEach
 * CustomEvent
*/

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NavigationEmitter = require('/makeup-navigation-emitter$0.3.0/index'/*'makeup-navigation-emitter'*/);

var defaultOptions = {
  autoReset: null,
  index: 0,
  wrap: false,
  axis: 'both'
};

var nodeListToArray = function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
};

function onModelMutation() {
  var modelIndex = this._navigationEmitter.model.index;
  this.filteredItems.forEach(function (el, index) {
    return el.setAttribute('tabindex', index !== modelIndex ? '-1' : '0');
  });
}

function onModelInit(e) {
  var items = e.detail.items;
  nodeListToArray(items).filter(function (el, i) {
    return i !== e.detail.toIndex;
  }).forEach(function (el) {
    return el.setAttribute('tabindex', '-1');
  });
  items[e.detail.toIndex].setAttribute('tabindex', '0');
}

function onModelReset(e) {
  this._index = e.detail.toIndex; // seems unused internally. scheduled for deletion.

  var items = this.filteredItems;
  nodeListToArray(items).filter(function (el, i) {
    return i !== e.detail.toIndex;
  }).forEach(function (el) {
    return el.setAttribute('tabindex', '-1');
  });
  items[e.detail.toIndex].setAttribute('tabindex', '0');
}

function onModelChange(e) {
  var items = this.filteredItems;
  var fromItem = items[e.detail.fromIndex];
  var toItem = items[e.detail.toIndex];

  if (fromItem) {
    fromItem.setAttribute('tabindex', '-1');
  }

  if (toItem) {
    toItem.setAttribute('tabindex', '0');
    toItem.focus();
  }

  this._el.dispatchEvent(new CustomEvent('rovingTabindexChange', {
    detail: {
      fromIndex: e.detail.fromIndex,
      toIndex: e.detail.toIndex
    }
  }));
}

var RovingTabindex =
/*#__PURE__*/
function () {
  function RovingTabindex(el) {
    _classCallCheck(this, RovingTabindex);

    this._el = el;
    this._onMutationListener = onModelMutation.bind(this);
    this._onChangeListener = onModelChange.bind(this);
    this._onInitListener = onModelInit.bind(this);
    this._onResetListener = onModelReset.bind(this);

    this._el.addEventListener('navigationModelMutation', this._onMutationListener);

    this._el.addEventListener('navigationModelChange', this._onChangeListener);

    this._el.addEventListener('navigationModelInit', this._onInitListener);

    this._el.addEventListener('navigationModelReset', this._onResetListener);
  }

  _createClass(RovingTabindex, [{
    key: "destroy",
    value: function destroy() {
      this._el.removeEventListener('navigationModelMutation', this._onMutationListener);

      this._el.removeEventListener('navigationModelChange', this._onChangeListener);

      this._el.removeEventListener('navigationModelInit', this._onInitListener);

      this._el.removeEventListener('navigationModelReset', this._onResetListener);
    }
  }]);

  return RovingTabindex;
}();

var LinearRovingTabindex =
/*#__PURE__*/
function (_RovingTabindex) {
  _inherits(LinearRovingTabindex, _RovingTabindex);

  function LinearRovingTabindex(el, itemSelector, selectedOptions) {
    var _this;

    _classCallCheck(this, LinearRovingTabindex);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LinearRovingTabindex).call(this, el));
    _this._options = _extends({}, defaultOptions, selectedOptions);
    _this._itemSelector = itemSelector;
    _this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector, {
      autoInit: _this._options.index,
      autoReset: _this._options.autoReset,
      wrap: _this._options.wrap,
      axis: _this._options.axis
    });
    return _this;
  }

  _createClass(LinearRovingTabindex, [{
    key: "reset",
    value: function reset() {
      this._navigationEmitter.model.reset();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._navigationEmitter.destroy();
    }
  }, {
    key: "index",
    get: function get() {
      return this._navigationEmitter.model.index;
    },
    set: function set(newIndex) {
      this._navigationEmitter.model.index = newIndex;
    }
  }, {
    key: "wrap",
    set: function set(newWrap) {
      this._navigationEmitter.model.options.wrap = newWrap;
    }
  }, {
    key: "filteredItems",
    get: function get() {
      return this._navigationEmitter.model.filteredItems;
    }
  }, {
    key: "items",
    get: function get() {
      return this._navigationEmitter.model.items;
    } // backwards compat

  }, {
    key: "_items",
    get: function get() {
      return this.items;
    }
  }]);

  return LinearRovingTabindex;
}(RovingTabindex);
/*
class GridRovingTabindex extends RovingTabindex {
    constructor(el, rowSelector, cellSelector, selectedOptions) {
        super(el);
    }
}
*/


function createLinear(el, itemSelector, selectedOptions) {
  return new LinearRovingTabindex(el, itemSelector, selectedOptions);
}

module.exports = {
  createLinear: createLinear
};

});