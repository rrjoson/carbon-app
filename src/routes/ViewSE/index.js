import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import ViewSEHeader from './ViewSEHeader';
import ViewSETable from './ViewSETable';

class ViewCases extends Component {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch({ type: 'engineers/FETCH_ENGINEERS' });
  }

  render() {
    const {
      engineers,
    } = this.props;

    console.warn(engineers)

    return (
      <div className={styles.viewCases}>
        <ViewSEHeader />
        <ViewSETable
          data={engineers}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    engineers: state.engineers.data,
  };
}

ViewCases.propTypes = {};

export default connect(mapStateToProps)(ViewCases);
