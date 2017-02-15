import React, { Component, createElement } from 'react';
import { findDOMNode } from 'react-dom';
import hoistStatics from 'hoist-non-react-statics';
import raf from 'raf';

const defaultGetSize = domElement => ({width: domElement.clientWidth, height: domElement.clientHeight});
const defaultWidthProp = 'width';
const defaultHeightProp = 'height';
const defaultGetDisplayName = name => `Sizer(${name})`;

const placeholderStyle = {
  overflow: 'visible',
  height: 0,
  width: 0
};

class Placeholder extends Component {
  render() {
    return createElement('div', { style: placeholderStyle });
  }
}

export default function sizer({
  getSize = defaultGetSize,
  widthProp = defaultWidthProp,
  heightProp = defaultHeightProp,
  getDisplayName = defaultGetDisplayName
} = {}) {
  return function _sizer(WrappedComponent) {
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    const displayName = getDisplayName(wrappedComponentName);

    class Sizer extends Component {

      constructor(props) {
        super(props);
        this.state = {width: null, height: null};
        this.parentDOMNode = null;
        this.setWrappedInstance = this.setWrappedInstance.bind(this);
        this.onResize = this.onResize.bind(this);
      }

      setWrappedInstance(ref) {
        this.wrappedInstance = ref;
        if (ref) {
          this.parentDOMNode = findDOMNode(ref).parentNode;
        }
        else {
          this.parentDOMNode = null;
        }
      }

      onResize() {
        if (!this.rafId) {
          this.rafId = raf(() => {
            this.rafId = null;
            this.updateSize();
          });
        }
      };

      updateSize() {
        if (this.parentDOMNode) {
          const { width: oldWidth, height: oldHeight } = this.state;
          const { width, height } = getSize(this.parentDOMNode);
          if (width !== oldWidth || height !== oldHeight) {
            this.setState({width, height});
          }
        }
      }

      componentDidMount () {
        this.updateSize();
        window.addEventListener('resize', this.onResize, false);
      }

      componentWillUnmount () {
        window.removeEventListener('resize', this.onResize);
      }

      render() {
        const props = this.props;
        const { width, height } = this.state;
        if (width || height) {
          return createElement(WrappedComponent, {...props, [widthProp]: width, [heightProp]: height, ref: this.setWrappedInstance});
        }
        else {
          return createElement(Placeholder, {ref: this.setWrappedInstance});
        }
      }
    }

    Sizer.displayName = displayName;
    Sizer.WrappedComponent = WrappedComponent;

    return hoistStatics(Sizer, WrappedComponent);
  }
}
