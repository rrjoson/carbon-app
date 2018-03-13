import React from 'react';
import { Button as AntButton } from 'antd';
import classnames from 'classnames';

import styles from './styles.css';

const Button = (props) => {
  const { children, ...customProps } = props;

  const buttonStyle = classnames({
    [styles.button]: true,
  });

  return (
    <AntButton
      {...customProps}
      className={buttonStyle}
    >
      {props.children}
    </AntButton>
  );
};

export default Button;
