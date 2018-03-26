import React from 'react';
import styles from './styles.css';
import { Filter } from './../../../components';

function HomeFilter(props) {
  const {
    clients,
    onFilterCases,
  } = props;

  return (
    <div>
      <Filter
        onFilterCases={onFilterCases}
        clients={clients}
      />
    </div>
  );
}

HomeFilter.propTypes = {};

export default HomeFilter;
