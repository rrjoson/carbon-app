import React from 'react';
import { Input, Icon } from 'antd';

import styles from './styles.css';

const Search = (props) => {
  const { onTextChange } = props;

  return (
    <span className={styles.search}>
      <Icon type="search" />
      <Input
        placeholder="Search a case..."
        onChange={e => onTextChange(e.target.value)}
        style={{ width: 200 }}
      />
    </span>
  );
};

export default Search;
