import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import ViewEngineerHeader from './ViewEngineerHeader';
import ViewEngineerActivities from './ViewEngineerActivities';

class ViewEngineer extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'engineers/FETCH_ENGINEER', payload: match.params.engineerId });
  }

  render() {
    const {
      selectedEngineer,
    } = this.props;

    if (!selectedEngineer) return null;

    return (
      <div className={styles.viewEngineer}>
        <ViewEngineerHeader />
        <ViewEngineerActivities />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedEngineer: state.engineers.selected,
  };
}

ViewEngineer.propTypes = {};

export default connect(mapStateToProps)(ViewEngineer);
