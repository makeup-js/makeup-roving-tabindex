'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavigationEmitter = require('makeup-navigation-emitter');
var Util = require('./util.js');

function onModelMutation() {
    this._items = Util.nodeListToArray(this._el.querySelectorAll(this._itemSelector));
    this.updateView();
}

function onModelChange(e) {
    var fromItem = this.items[e.detail.fromIndex];
    var toItem = this.items[e.detail.toIndex];

    if (fromItem) {
        fromItem.setAttribute('tabindex', '-1');
    }
    toItem.setAttribute('tabindex', '0');
    toItem.focus();
    this._el.dispatchEvent(new CustomEvent('rovingTabindexChange', {
        detail: {
            toIndex: e.detail.toIndex,
            fromIndex: e.detail.fromIndex
        }
    }));
}

function onUpdateEachItem(item, index) {
    if (index !== this._navigationEmitter.model.index) {
        item.setAttribute('tabindex', '-1');
    } else {
        item.setAttribute('tabindex', '0');
    }
}

var RovingTabindex = function RovingTabindex(el) {
    _classCallCheck(this, RovingTabindex);

    this._el = el;
    this.onMutationListener = onModelMutation.bind(this);
    this.onChangeListener = onModelChange.bind(this);

    el.addEventListener('navigationModelMutation', this.onMutationListener);
    el.addEventListener('navigationModelChange', this.onChangeListener);
};

var LinearRovingTabindex = function (_RovingTabindex) {
    _inherits(LinearRovingTabindex, _RovingTabindex);

    function LinearRovingTabindex(el, itemSelector) {
        _classCallCheck(this, LinearRovingTabindex);

        var _this = _possibleConstructorReturn(this, (LinearRovingTabindex.__proto__ || Object.getPrototypeOf(LinearRovingTabindex)).call(this, el));

        _this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector);
        _this._itemSelector = itemSelector;
        _this._items = Util.nodeListToArray(el.querySelectorAll(_this._itemSelector));
        return _this;
    }

    _createClass(LinearRovingTabindex, [{
        key: 'updateView',
        value: function updateView() {
            this.items.forEach(onUpdateEachItem.bind(this));
        }
    }, {
        key: 'items',
        get: function get() {
            return this._items;
        }
    }, {
        key: 'index',
        set: function set(newIndex) {
            this._navigationEmitter.model.index = newIndex;
            this.updateView();
        }
    }, {
        key: 'wrap',
        set: function set(newWrap) {
            this._navigationEmitter.model.options.wrap = newWrap;
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

function createLinear(el, itemSelector) {
    return new LinearRovingTabindex(el, itemSelector);
}

module.exports = {
    createLinear: createLinear
};
