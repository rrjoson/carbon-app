import React, { Component } from 'react';
import { connect } from 'dva';
// import PropTypes from 'prop-types';

import { Col, Row, Progress } from 'antd';

import ViewCaseHeader from './ViewCaseHeader';
import ViewCaseTable from './ViewCaseTable';
import ViewCaseSelectStatus from './ViewCaseSelectStatus';
import ViewCaseActivities from './ViewCaseActivities';
import { Typography, Link, Card, Button } from './../../components';

import styles from './styles.css';

const { H1, H2, H3, H4 } = Typography;

class ViewCase extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'cases/FETCH_CASE', payload: match.params.caseId });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.selectedCase !== this.props.selectedCase) {
      dispatch({ type: 'activities/FETCH_ACTIVITIES', payload: nextProps.selectedCase.glocalId });
    }
  }

  render() {
    const {
      dispatch,
      selectedCase,
      activities,
    } = this.props;

    if (!selectedCase || !activities) return null;

    return (
      <div className={styles.viewCase}>
        <ViewCaseHeader
          glocalId={selectedCase.glocalId}
          caseTitle={selectedCase.caseTitle}
          caseDescription={selectedCase.caseDescription}
        />
        <ViewCaseTable
          data={[selectedCase]}
        />
        <ViewCaseSelectStatus
          status={selectedCase.case_status}
          onSelectChange={(data) => dispatch({ type: 'cases/UPDATE_STATUS', payload: data })}
        />
        <ViewCaseActivities
          data={activities}
          glocalId={selectedCase.glocalId}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedCase: state.cases.selected,
    activities: state.activities.data,
  };
}

ViewCase.propTypes = {};

export default connect(mapStateToProps)(ViewCase);
