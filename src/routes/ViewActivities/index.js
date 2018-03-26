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
      match,
    } = this.props;

    if (!activities.length) return null;

    return (
      <div className={styles.viewEngineer}>
        <ViewActivitiesHeader
          name={match.params.engineerName}
        />
        <ViewActivitiesList
          data={activities}
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
