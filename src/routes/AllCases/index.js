import React from 'react';
import { connect } from 'dva';

import styles from './styles.css';
import { getCases } from './../../models/cases/selectors';
import AllCasesHeader from './AllCasesHeader';
import AllCasesFilter from './AllCasesFilter';
import AllCasesTable from './AllCasesTable';

function AllCases(props) {
  return (
    <div>
      <AllCasesHeader />
      <AllCasesFilter />
      <AllCasesTable
        data={props.cases}
      />
    </div>
  );
}

function mapStateToProps(state) {
  // getCases(state.cases)
  return {
    cases: state.cases.data
  };
}

AllCases.propTypes = {};

export default connect(mapStateToProps)(AllCases);
