import React from 'react';

import styles from './styles.scss';

export default class Shell extends React.Component {
  render() {
    return (
      <div className={styles.shell}>
        { this.props.children }
      </div>
    );
  }
}
