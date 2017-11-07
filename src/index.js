'use strict';

const NavigationEmitter = require('makeup-navigation-emitter');
const Util = require('./util.js');

function onModelMutation() {
    this._items = Util.nodeListToArray(this._el.querySelectorAll(this._itemSelector));
    this.updateView();
}

function onModelChange(e) {
    const fromItem = this.items[e.detail.fromIndex];
    const toItem = this.items[e.detail.toIndex];

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

class RovingTabindex {
    constructor(el) {
        this._el = el;
        this.onMutationListener = onModelMutation.bind(this);
        this.onChangeListener = onModelChange.bind(this);

        el.addEventListener('navigationModelMutation', this.onMutationListener);
        el.addEventListener('navigationModelChange', this.onChangeListener);
    }
}

class LinearRovingTabindex extends RovingTabindex {
    constructor(el, itemSelector) {
        super(el);

        this._navigationEmitter = NavigationEmitter.createLinear(el, itemSelector);
        this._itemSelector = itemSelector;
        this._items = Util.nodeListToArray(el.querySelectorAll(this._itemSelector));
    }

    updateView() {
        this.items.forEach(onUpdateEachItem.bind(this));
    }

    get items() {
        return this._items;
    }

    set index(newIndex) {
        this._navigationEmitter.model.index = newIndex;
        this.updateView();
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

function createLinear(el, itemSelector) {
    return new LinearRovingTabindex(el, itemSelector);
}

module.exports = {
    createLinear
};
