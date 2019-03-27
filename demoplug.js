"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DemoPlug =
/*#__PURE__*/
function () {
  function DemoPlug(props) {
    _classCallCheck(this, DemoPlug);

    var h = window.virtualDom.h;
    var render = window.virtualDom.render;
    var diff = window.virtualDom.diff;
    var patch = window.virtualDom.patch;
    var create = window.virtualDom.create;
    this.container = document.querySelector(props.container);
    this.plank = {
      className: props.plankClass || false,
      disableStyles: props.disablePlankStyles || false
    };
    this.messageWindow = {
      show: false,
      className: props.messageWindowClass || false,
      disableStyles: props.disableWindowStyles || false
    };
    this.h = h;
    this.render = render;
    this.diff = diff;
    this.patch = patch;
    this.create = create;
    this.tree = {};
    this.root = {};
  }

  _createClass(DemoPlug, [{
    key: "renderPlank",
    value: function renderPlank() {
      var attributes = {
        className: this.plank.className || 'plank',
        style: this.plank.disableStyles || {
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px',
          background: '#0094ff',
          color: 'white',
          fontFamily: 'Helvetica',
          borderTopLeftRadius: '3px',
          cursor: 'pointer'
        }
      };
      return this.h('div', attributes, ['Write to us']);
    }
  }, {
    key: "renderMessageWindow",
    value: function renderMessageWindow(props) {
      var attributes = {
        className: this.messageWindow.className || 'message_window',
        style: this.messageWindow.disableStyles || {
          bottom: props.show ? '0' : '-400px',
          boxSizing: 'border-box',
          right: '5px',
          position: 'absolute',
          width: '300px',
          height: '400px',
          fontFamily: 'Helvetica',
          background: '#f3f3f3',
          border: '1px solid #dedede',
          padding: '10px',
          transition: 'bottom .4s ease-in-out'
        }
      };
      var closeAttributes = {
        className: 'close_message_window',
        style: {
          position: 'relative',
          right: '5px',
          background: 'white',
          borderRadius: '3px',
          border: '1px solid #ededed',
          padding: '5px',
          textAlign: 'center',
          cursor: 'pointer'
        }
      };
      return this.h('div', attributes, [this.h('div', closeAttributes, 'Close Window')]);
    }
  }, {
    key: "formTree",
    value: function formTree() {
      var plank = this.renderPlank();
      var messageWindow = this.renderMessageWindow({
        show: this.messageWindow.show
      });
      var tree = this.h('div', null, [plank, messageWindow]);
      return tree;
    }
  }, {
    key: "update",
    value: function update() {
      var oldTree = this.tree;
      var newTree = this.formTree();
      var patches = this.diff(oldTree, newTree);
      this.root = this.patch(this.root, patches);
      this.tree = newTree;
    }
  }, {
    key: "show",
    value: function show() {
      this.messageWindow.show = true;
      this.update();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.messageWindow.show = false;
      this.update();
    }
  }, {
    key: "init",
    value: function init() {
      var tree = this.tree = this.formTree();
      var root = this.root = this.create(tree);
      this.container.appendChild(root);
    }
  }]);

  return DemoPlug;
}();