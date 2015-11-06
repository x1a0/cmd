import React, {
  Component,
  PropTypes,
} from 'react';

import styles from './styles.scss';

export default class Prompt extends Component {

  static propTypes = {
    run: PropTypes.func.isRequired,
  }

  onKeyPress = (event) => {
    if (event.which === 13) { // Enter
      this.props.run(this.refs.input.value);
      this.refs.input.value = '';
    }
  }

  render() {
    return (
      <div className={styles.prompt}>
        <div className={styles.prefix}>></div>
        <input ref="input" type="text" autoFocus onKeyPress={this.onKeyPress} />
      </div>
    );
  }
}
