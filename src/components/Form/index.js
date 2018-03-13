import React from 'react';
import { Form as AntForm } from 'antd';
import styles from './styles.css';

function Form(props) {
  const { children, ...customProps } = props;

  return (
    <AntForm
      className={styles.form}
      hideRequiredMark
      {...customProps}
    >
      {props.children}
    </AntForm>
  );
};

function FormItem(props) {
  const { children, ...customProps } = props;

  return (
    <AntForm.Item colon={false} {...customProps} className={styles.formItem}>
      {props.children}
    </AntForm.Item>
  );
};

Form.create = AntForm.create;
Form.Item = FormItem;

export default Form;
