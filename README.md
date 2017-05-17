# react-sizer
Simple React HOC to get the size of a component

## installation

```
npm install react-sizer
```

## example

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sizer from 'react-sizer';

class MyComponent extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { width, height } = this.props;

    return (
      <div style={{width, height, background: '#f00'}}>
        Hello World
      </div>
    );
  }
}

const MySizedComponent = sizer()(MyComponent);

```
