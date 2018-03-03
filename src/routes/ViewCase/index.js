import React, { Component } from 'react';
import { connect } from 'dva';
// import PropTypes from 'prop-types';

import { Col, Row, Progress } from 'antd';

import DashboardTable from './components/DashboardTable';
import SelectStatus from './components/SelectStatus';
import Activities from './components/Activities';
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
      dispatch({ type: 'activities/FETCH_ACTIVITIES', payload: nextProps.selectedCase.glocalid });
    }
  }

  render() {
    const {
      selectedCase,
      activities,
    } = this.props;

    if (!selectedCase || !activities) return null;

    return (
      <div className={styles.viewCase}>
        <Row>
          <H2>{selectedCase.casetitle}</H2>
          <Link to={`/cases/${selectedCase.glocalid}/activities/add`}><Button>Add Activity</Button></Link>
          <Link to={`/cases/${selectedCase.glocalid}/edit`}><Button>Edit Case</Button></Link>
        </Row>
        <Row>
          {selectedCase.casedescription}
        </Row>
        <Row>
          <DashboardTable data={[selectedCase]} />
        </Row>
        <Row>
          <SelectStatus />
        </Row>
        <Row>
          <Activities data={activities} />
        </Row>
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


