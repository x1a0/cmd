import React from 'react';
import { connect } from 'react-redux';

import {
  print
} from '../actions';

const asciiHelloCmd =`
 _____     _ _                      _
|  |  |___| | |___      ___ _____ _| |
|     | -_| | | . |_   |  _|     | . |
|__|__|___|_|_|___| |  |___|_|_|_|___|
                  |_|
`;

class Home extends React.Component {
  static fetchData(getState, dispatch, location, params) {
    return new Promise((resolve) => {
      dispatch(print(asciiHelloCmd));
      resolve()
    });
  }

  render() { return null; }
}

export default connect(state => ({}), {
  print
})(Home);

