$_mod.installed("makeup-roving-tabindex$0.2.0", "custom-event-polyfill", "1.0.7");
$_mod.installed("makeup-roving-tabindex$0.2.0", "nodelist-foreach-polyfill", "1.2.0");
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
$_mod.installed("makeup-roving-tabindex$0.2.0", "makeup-navigation-emitter", "0.2.0");
$_mod.installed("makeup-navigation-emitter$0.2.0", "custom-event-polyfill", "1.0.7");
$_mod.installed("makeup-navigation-emitter$0.2.0", "nodelist-foreach-polyfill", "1.2.0");
$_mod.installed("makeup-key-emitter$0.1.0", "custom-event-polyfill", "1.0.7");
$_mod.installed("makeup-exit-emitter$0.1.0", "custom-event-polyfill", "1.0.7");
$_mod.def("/makeup-roving-tabindex$0.2.0/index", function(require, exports, module, __filename, __dirname) { 'use strict';
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

var NavigationEmitter = require('/makeup-navigation-emitter$0.2.0/index'/*'makeup-navigation-emitter'*/);

var defaultOptions = {
  autoReset: null,
  index: 0,
  wrap: false
};

var nodeListToArray = function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
};

function onModelMutation() {
  var modelIndex = this._navigationEmitter.model.index;

  this._items.forEach(function (el, index) {
    return el.setAttribute('tabindex', index !== modelIndex ? '-1' : '0');
  });
}

function onModelInit(e) {
  this._index = e.detail.toIndex; // seems unused internally. scheduled for deletion.

  var items = this._items;
  nodeListToArray(items).filter(function (el, i) {
    return i !== e.detail.toIndex;
  }).forEach(function (el) {
    return el.setAttribute('tabindex', '-1');
  });
  items[e.detail.toIndex].setAttribute('tabindex', '0');
}

function onModelReset(e) {
  this._index = e.detail.toIndex; // seems unused internally. scheduled for deletion.

  var items = this._items;
  nodeListToArray(items).filter(function (el, i) {
    return i !== e.detail.toIndex;
  }).forEach(function (el) {
    return el.setAttribute('tabindex', '-1');
  });
  items[e.detail.toIndex].setAttribute('tabindex', '0');
}

function onModelChange(e) {
  var items = this._items;
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
      wrap: _this._options.wrap
    });
    return _this;
  }

  _createClass(LinearRovingTabindex, [{
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
    } // we cannot use a cached version of the items in question since the DOM may change without notice

  }, {
    key: "_items",
    get: function get() {
      return this._el.querySelectorAll(this._itemSelector);
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