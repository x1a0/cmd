import React, {
  Component,
  PropTypes,
} from 'react';

import styles from './styles.scss';

export default class Shell extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className={styles.shell}>
        { this.props.children }
      </div>
    );
  }
}
