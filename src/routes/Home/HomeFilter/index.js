import React from 'react';
import styles from './styles.css';
import { Filter } from './../../../components';

function HomeFilter(props) {
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

HomeFilter.propTypes = {};

export default HomeFilter;
