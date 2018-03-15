import React, { Component } from 'react';
import { connect } from 'dva';

import styles from './styles.css';

import AddActivityHeader from './AddActivityHeader';
import AddActivityForm from './AddActivityForm';
import AddActivityModal from './AddActivityModal';

class AddActivity extends Component {
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
        <AddActivityHeader />
        <AddActivityForm
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

AddActivity.propTypes = {};

export default connect(mapStateToProps)(AddActivity);
