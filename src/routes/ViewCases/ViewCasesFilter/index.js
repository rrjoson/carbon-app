import React from 'react';
import styles from './styles.css';
import { Filter } from './../../../components';

function ViewCasesFilter(props) {
  const {
    clients,
    engineers,
    onFilterCases,
  } = props;

  return (
    <div>
      <Filter
        onFilterCases={onFilterCases}
        clients={clients}
        engineers={engineers}
      />
    </div>
  );
}

ViewCasesFilter.propTypes = {};

export default ViewCasesFilter;
