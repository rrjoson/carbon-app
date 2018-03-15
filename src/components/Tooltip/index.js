import React from 'react';
import { Tooltip as AntTooltip } from 'antd';

import styles from './styles.css';

const Tooltip = (props) => {
  const { children, ...customProps } = props;

  return (
    <AntTooltip {...customProps}>
      {children}
    </AntTooltip>
  );
};

export default Tooltip;
