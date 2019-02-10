function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component, createElement } from 'react'; // eslint-disable-line no-unused-vars

import { findDOMNode } from 'react-dom';
import hoistStatics from 'hoist-non-react-statics';
import raf from 'raf';

var DEFAULT_GET_SIZE = function DEFAULT_GET_SIZE(domElement) {
  return {
    width: domElement.clientWidth,
    height: domElement.clientHeight
  };
};

var DEFAULT_PLACEHOLDER_STYLE = {
  overflow: 'visible',
  height: 0,
  width: 0
};
var DEFAULT_WIDTH_PROP = 'width';
var DEFAULT_HEIGHT_PROP = 'height';
var DEFAULT_RESIZE_PROPS = [];

var DEFAULT_UPDATE_SIZE_CALLBACK = function DEFAULT_UPDATE_SIZE_CALLBACK() {};

var DEFAULT_UPDATE_SIZE_CALLBACK_PROP = 'updateSizeCallback';

var DEFAULT_GET_DISPLAY_NAME = function DEFAULT_GET_DISPLAY_NAME(name) {
  return "Sizer(".concat(name, ")");
};

export default function sizer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$getSize = _ref.getSize,
      getSize = _ref$getSize === void 0 ? DEFAULT_GET_SIZE : _ref$getSize,
      _ref$placeholderStyle = _ref.placeholderStyle,
      placeholderStyle = _ref$placeholderStyle === void 0 ? DEFAULT_PLACEHOLDER_STYLE : _ref$placeholderStyle,
      _ref$widthProp = _ref.widthProp,
      widthProp = _ref$widthProp === void 0 ? DEFAULT_WIDTH_PROP : _ref$widthProp,
      _ref$heightProp = _ref.heightProp,
      heightProp = _ref$heightProp === void 0 ? DEFAULT_HEIGHT_PROP : _ref$heightProp,
      _ref$resizeProps = _ref.resizeProps,
      resizeProps = _ref$resizeProps === void 0 ? DEFAULT_RESIZE_PROPS : _ref$resizeProps,
      _ref$updateSizeCallba = _ref.updateSizeCallback,
      updateSizeCallback = _ref$updateSizeCallba === void 0 ? DEFAULT_UPDATE_SIZE_CALLBACK : _ref$updateSizeCallba,
      _ref$updateSizeCallba2 = _ref.updateSizeCallbackProp,
      updateSizeCallbackProp = _ref$updateSizeCallba2 === void 0 ? DEFAULT_UPDATE_SIZE_CALLBACK_PROP : _ref$updateSizeCallba2,
      _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === void 0 ? DEFAULT_GET_DISPLAY_NAME : _ref$getDisplayName;

  return function _sizer(WrappedComponent) {
    var wrappedComponentName = WrappedComponent && (WrappedComponent.displayName || WrappedComponent.name) || 'Component';
    var displayName = wrappedComponentName ? getDisplayName(wrappedComponentName) : 'sizer-none';

    var Placeholder =
    /*#__PURE__*/
    function (_Component) {
      _inherits(Placeholder, _Component);

      function Placeholder() {
        _classCallCheck(this, Placeholder);

        return _possibleConstructorReturn(this, _getPrototypeOf(Placeholder).apply(this, arguments));
      }

      _createClass(Placeholder, [{
        key: "render",
        value: function render() {
          return createElement('span', {
            style: placeholderStyle,
            ref: this.props.placeholderRef
          });
        }
      }]);

      return Placeholder;
    }(Component);

    var Sizer =
    /*#__PURE__*/
    function (_Component2) {
      _inherits(Sizer, _Component2);

      function Sizer(props) {
        var _this;

        _classCallCheck(this, Sizer);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Sizer).call(this, props));
        _this.state = {
          width: null,
          height: null
        };
        _this.DOMNode = null;
        _this.parentDOMNode = null;
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.onResize = _this.onResize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        return _this;
      }

      _createClass(Sizer, [{
        key: "setWrappedInstance",
        value: function setWrappedInstance(ref) {
          this.wrappedInstance = ref;

          if (ref) {
            this.DOMNode = findDOMNode(ref);
            this.parentDOMNode = this.DOMNode ? this.DOMNode.parentNode : null;
          } else {
            this.DOMNode = null;
            this.parentDOMNode = null;
          }
        }
      }, {
        key: "getWindow",
        value: function getWindow() {
          return this.DOMNode ? this.DOMNode.ownerDocument.defaultView || window : window; // eslint-disable-line no-undef
        }
      }, {
        key: "onResize",
        value: function onResize() {
          var _this2 = this;

          if (!this.rafId) {
            this.rafId = raf(function () {
              _this2.rafId = null;

              _this2.updateSize();
            });
          }
        }
      }, {
        key: "updateSize",
        value: function updateSize() {
          var _this3 = this;

          if (this.parentDOMNode) {
            var _this$state = this.state,
                oldWidth = _this$state.width,
                oldHeight = _this$state.height;

            var _getSize = getSize(this.parentDOMNode),
                width = _getSize.width,
                height = _getSize.height;

            if (width !== oldWidth || height !== oldHeight) {
              this.setState({
                width: width,
                height: height
              }, function () {
                updateSizeCallback();

                if (updateSizeCallbackProp && _this3.props[updateSizeCallbackProp]) {
                  _this3.props[updateSizeCallbackProp](width, height);
                }
              });
            }
          }
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.updateSize();
          this.getWindow().addEventListener('resize', this.onResize, false);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.getWindow().removeEventListener('resize', this.onResize);
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          var nextProps = this.props;

          if (resizeProps.some(function (resizeProp) {
            return nextProps[resizeProp] !== prevProps[resizeProp];
          })) {
            this.onResize();
          }
        }
      }, {
        key: "render",
        value: function render() {
          var props = this.props;
          var _this$state2 = this.state,
              width = _this$state2.width,
              height = _this$state2.height;

          if (WrappedComponent && (width || height)) {
            var _objectSpread2;

            return createElement(WrappedComponent, _objectSpread({}, props, (_objectSpread2 = {}, _defineProperty(_objectSpread2, widthProp, width), _defineProperty(_objectSpread2, heightProp, height), _defineProperty(_objectSpread2, "ref", this.setWrappedInstance), _objectSpread2)));
          } else {
            return createElement(Placeholder, {
              placeholderRef: this.setWrappedInstance
            });
          }
        }
      }]);

      return Sizer;
    }(Component);

    Sizer.displayName = displayName;
    Sizer.WrappedComponent = WrappedComponent;
    return WrappedComponent ? hoistStatics(Sizer, WrappedComponent) : Sizer;
  };
}