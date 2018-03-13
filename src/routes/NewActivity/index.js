import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import { Typography } from './../../components';
import DynamicFieldSet from './components/DynamicFieldSet';
import AddActivityModal from './AddActivityModal';

const { H2 } = Typography;

class NewActivity extends Component {
  componentDidMount() {
    const {
      dispatch,
      match,
    } = this.props;

    dispatch({ type: 'cases/FETCH_CASE', payload: match.params.caseId });
    dispatch({ type: 'engineers/FETCH_ENGINEERS' });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.selectedCase !== this.props.selectedCase) {
      dispatch({ type: 'clients/FETCH_CLIENT', payload: nextProps.selectedCase.customer });
    }
  }

  render() {
    const {
      dispatch,
      engineers,
      selectedCase,
      selectedClient,
      serviceReportNumber,
    } = this.props;

    if (!selectedCase || !selectedClient || !engineers.length) return null;

    return (
      <div className={styles.vendors}>
        <H2>New Activity</H2>
        <DynamicFieldSet
          onSave={(data) => dispatch({ type: 'activities/ADD_ACTIVITY', payload: data })}
          engineers={engineers}
          selectedCase={selectedCase}
          selectedClient={selectedClient}
        />
        <AddActivityModal
          visible={serviceReportNumber}
          serviceReportNumber={serviceReportNumber}
          closeModal={() => dispatch({ type: 'activities/CLEAR_SERVICE_REPORT_NUMBER' })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    engineers: state.engineers.data,
    selectedCase: state.cases.selected,
    selectedClient: state.clients.selected,
    serviceReportNumber: state.activities.serviceReportNumber,
  };
}

NewActivity.propTypes = {};

export default connect(mapStateToProps)(NewActivity);
