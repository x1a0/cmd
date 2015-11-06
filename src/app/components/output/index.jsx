import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';

import styles from './styles.scss';

@connect(
  (state) => ({
    lines: state.output,
  })
)
class Output extends Component {
  static propTypes = {
    lines: PropTypes.arrayOf(React.PropTypes.string).isRequired,
  }

  render() {
    const { lines } = this.props;

    return (
      <div className={styles.output}>
        {lines.map((line, nu) => {
          return <pre className={styles.line} key={nu}>{line}</pre>;
        })}
      </div>
    );
  }
}

export default Output;
