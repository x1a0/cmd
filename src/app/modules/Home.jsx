import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';

import Output from '../components/output';
import Prompt from '../components/prompt';
import { print, runCmd } from '../actions';

const asciiHelloCmd = `
 _____     _ _                      _
|  |  |___| | |___      ___ _____ _| |
|     | -_| | | . |_   |  _|     | . |
|__|__|___|_|_|___| |  |___|_|_|_|___|
                  |_|
`;

@connect(
  undefined,
  {doRunCmd: runCmd}
)
class Home extends Component {
  static propTypes = {
    doRunCmd: PropTypes.func.isRequired,
  }

  static fetchData(getState, dispatch) {
    return new Promise((resolve) => {
      dispatch(print(asciiHelloCmd));
      resolve();
    });
  }

  run = (input) => {
    this.props.doRunCmd(input);
  }

  render() {
    return (
      <div>
        <Output />
        <Prompt run={this.run} />
      </div>
    );
  }
}

export default Home;
