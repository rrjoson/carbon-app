import React from 'react';
import { Select as AntSelect } from 'antd';
import styles from './styles.css';

function Select(props) {
  const { children, ...customProps } = props;

  return (
    <AntSelect
      className={styles.select}
      {...customProps}
    >
      {children}
    </AntSelect>
  );
}

function Option(props) {
  const { children, ...customProps } = props;

  return (
    <Select.Option {...customProps} className={styles.option}>
      {children}
    </Select.Option>
  );
}

Select.Option = Option;

export default Select;
