var RovingTabindex = require('../index.js');

function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
}

var rovers = [];
var appender = document.getElementById('appender');
var widgetEls = nodeListToArray(document.querySelectorAll('.widget'));
var wrapCheckbox = document.getElementById('wrap');

appender.addEventListener('click', function() {
    widgetEls.forEach(function(el) {
        var listItem = document.createElement('li');
        listItem.innerText = 'Item ' + parseInt(el.querySelectorAll('li').length, 10);
        el.children[0].appendChild(listItem);
    });
});

widgetEls.forEach(function(el) {
    rovers.push(RovingTabindex.createLinear(el, 'li'));
    rovers[0].index = 0;
    el.addEventListener('rovingTabindexChange', function(e) {
        console.log(e);
    });
});

wrapCheckbox.addEventListener('change', function(e) {
    rovers[0].wrap = e.target.checked;
    // rovers[1].options.wrap = e.target.checked;
});
