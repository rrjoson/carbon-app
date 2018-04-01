import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import ViewActivitiesHeader from './ViewActivitiesHeader';
import ViewActivitiesList from './ViewActivitiesList';

class ViewEngineer extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'activities/FETCH_ACTIVITIES_BY_ENGINEER_NAME', payload: match.params.engineerName });
  }

  render() {
    const {
      activities,
      dispatch,
      match,
    } = this.props;

    return (
      <div className={styles.viewEngineer}>
        <ViewActivitiesHeader
          name={match.params.engineerName}
        />
        <ViewActivitiesList
          data={activities}
          onDelete={data => dispatch({ type: 'activities/DELETE_ACTIVITY', payload: data })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: state.activities.data,
  };
}

ViewEngineer.propTypes = {};

export default connect(mapStateToProps)(ViewEngineer);
