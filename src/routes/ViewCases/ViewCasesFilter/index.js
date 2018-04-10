import React from 'react';
import styles from './styles.css';
import { Filter } from './../../../components';

function ViewCasesFilter(props) {
  const {
    filters,
    clients,
    engineers,
    vendors,
    products,
    onFilterCases,
    onResetFilters,
    onRemoveFilter,
    onSelectVendor,
  } = props;

  return (
    <div>
      <Filter
        onFilterCases={onFilterCases}
        onResetFilters={onResetFilters}
        onRemoveFilter={onRemoveFilter}
        onSelectVendor={onSelectVendor}
        filters={filters}
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
