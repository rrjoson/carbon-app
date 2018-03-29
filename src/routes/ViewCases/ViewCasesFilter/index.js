import React from 'react';
import styles from './styles.css';
import { Filter } from './../../../components';

function ViewCasesFilter(props) {
  const {
    clients,
    engineers,
    vendors,
    products,
    onFilterCases,
  } = props;

  return (
    <div>
      <Filter
        onFilterCases={onFilterCases}
        clients={clients}
        engineers={engineers}
        vendors={vendors}
        products={products}
      />
    </div>
  );
}

ViewCasesFilter.propTypes = {};

export default ViewCasesFilter;
