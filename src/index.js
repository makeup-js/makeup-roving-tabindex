'use strict';

const NavigationEmitter = require('makeup-navigation-emitter');
const Util = require('./util.js');

const defaultOptions = {
    autoReset: null,
    index: 0,
    wrap: false
};

function onModelMutation() {
    const modelIndex = this._navigationEmitter.model.index;

    this._items = Util.nodeListToArray(this._el.querySelectorAll(this._itemSelector));

    this._items.forEach(function(el, index) {
        if (index !== modelIndex) {
            el.setAttribute('tabindex', '-1');
        } else {
            el.setAttribute('tabindex', '0');
        }
    });
}

function onModelInit(e) {
    this._index = e.detail.toIndex;

    this._items.forEach(function(el) {
        el.setAttribute('tabindex', '-1');
    });

    this._items[e.detail.toIndex].setAttribute('tabindex', '0');
}

function onModelReset(e) {
    this._index = e.detail.toIndex;

    this._items.forEach(function(el) {
        el.setAttribute('tabindex', '-1');
    });

    this._items[e.detail.toIndex].setAttribute('tabindex', '0');
}

function onModelChange(e) {
    const fromItem = this._items[e.detail.fromIndex];
    const toItem = this._items[e.detail.toIndex];

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

class RovingTabindex {
    constructor(el) {
        this._el = el;
        this._onMutationListener = onModelMutation.bind(this);
        this._onChangeListener = onModelChange.bind(this);
        this._onInitListener = onModelInit.bind(this);
        this._onResetListener = onModelReset.bind(this);

        el.addEventListener('navigationModelMutation', this._onMutationListener);
        el.addEventListener('navigationModelChange', this._onChangeListener);
        el.addEventListener('navigationModelInit', this._onInitListener);
        el.addEventListener('navigationModelReset', this._onResetListener);
    }
}

class LinearRovingTabindex extends RovingTabindex {
    constructor(el, itemSelector, selectedOptions) {
        super(el);

        this._options = Object.assign({}, defaultOptions, selectedOptions);

        this._itemSelector = itemSelector;
        this._items = Util.nodeListToArray(el.querySelectorAll(itemSelector));

        this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector, {
            autoInit: this._options.index,
            autoReset: this._options.autoReset,
            wrap: this._options.wrap
        });
    }

    set wrap(newWrap) {
        this._navigationEmitter.model.options.wrap = newWrap;
    }
}

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
    createLinear
};
