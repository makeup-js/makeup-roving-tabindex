'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavigationEmitter = require('makeup-navigation-emitter');
var Util = require('./util.js');

var defaultOptions = {
    autoReset: null,
    index: 0,
    wrap: false
};

function onModelMutation() {
    var modelIndex = this._navigationEmitter.model.index;

    this._items.forEach(function (el, index) {
        if (index !== modelIndex) {
            el.setAttribute('tabindex', '-1');
        } else {
            el.setAttribute('tabindex', '0');
        }
    });
}

function onModelInit(e) {
    this._index = e.detail.toIndex;

    this._items.forEach(function (el) {
        el.setAttribute('tabindex', '-1');
    });

    this._items[e.detail.toIndex].setAttribute('tabindex', '0');
}

function onModelReset(e) {
    this._index = e.detail.toIndex;

    this._items.forEach(function (el) {
        el.setAttribute('tabindex', '-1');
    });

    this._items[e.detail.toIndex].setAttribute('tabindex', '0');
}

function onModelChange(e) {
    var fromItem = this._items[e.detail.fromIndex];
    var toItem = this._items[e.detail.toIndex];

    if (fromItem) {
        fromItem.setAttribute('tabindex', '-1');
    }

    if (toItem) {
        toItem.setAttribute('tabindex', '0');
        toItem.focus();
    }

    this._el.dispatchEvent(new CustomEvent('rovingTabindexChange', {
        detail: {
            toIndex: e.detail.toIndex,
            fromIndex: e.detail.fromIndex
        }
    }));
}

var RovingTabindex = function () {
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
        key: 'destroy',
        value: function destroy() {
            this._el.removeEventListener('navigationModelMutation', this._onMutationListener);
            this._el.removeEventListener('navigationModelChange', this._onChangeListener);
            this._el.removeEventListener('navigationModelInit', this._onInitListener);
            this._el.removeEventListener('navigationModelReset', this._onResetListener);
        }
    }]);

    return RovingTabindex;
}();

var LinearRovingTabindex = function (_RovingTabindex) {
    _inherits(LinearRovingTabindex, _RovingTabindex);

    function LinearRovingTabindex(el, itemSelector, selectedOptions) {
        _classCallCheck(this, LinearRovingTabindex);

        var _this = _possibleConstructorReturn(this, (LinearRovingTabindex.__proto__ || Object.getPrototypeOf(LinearRovingTabindex)).call(this, el));

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
        key: 'destroy',
        value: function destroy() {
            this._navigationEmitter.destroy();
        }
    }, {
        key: 'wrap',
        set: function set(newWrap) {
            this._navigationEmitter.model.options.wrap = newWrap;
        }

        // we cannot use a cached version of the items in question since the DOM may change without notice

    }, {
        key: '_items',
        get: function get() {
            return Util.nodeListToArray(this._el.querySelectorAll(this._itemSelector));
        }
    }]);

    return LinearRovingTabindex;
}(RovingTabindex);

/*
class GridRovingTabindex extends RovingTabindex {
    constructor(el, rowSelector, cellSelector) {
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
