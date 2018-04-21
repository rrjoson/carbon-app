import React from 'react';
import styles from './styles.css';
import { Filter } from './../../../../components';

function HomeFilter(props) {
  const {
    filters,
    clients,
    engineers,
    leads,
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
        leads={leads}
        vendors={vendors}
        products={products}
      />
    </div>
  );
}

HomeFilter.propTypes = {};

export default HomeFilter;
