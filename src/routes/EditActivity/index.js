import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import { Typography } from './../../components';
import EditActivityForm from './EditActivityForm';

const { H2 } = Typography;

class NewActivity extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'activities/FETCH_ACTIVITY', payload: match.params.activityNo });
    dispatch({ type: 'cases/FETCH_CASE', payload: match.params.caseId });
    dispatch({ type: 'engineers/FETCH_ENGINEERS' });
  }

  render() {
    const {
      dispatch,
      engineers,
      selectedCase,
      selectedActivity,
    } = this.props;

    if (
      !selectedCase ||
      !selectedActivity ||
      !engineers.length
    ) return null;

    return (
      <div className={styles.editAcitivityForm}>
        <H2>Edit Activity</H2>
        <EditActivityForm
          onSave={data => dispatch({ type: 'activities/UPDATE_ACTIVITY', payload: data })}
          engineers={engineers}
          selectedCase={selectedCase}
          selectedActivity={selectedActivity}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    engineers: state.engineers.data,
    selectedActivity: state.activities.selected,
    selectedCase: state.cases.selected,
  };
}

NewActivity.propTypes = {};

export default connect(mapStateToProps)(NewActivity);
