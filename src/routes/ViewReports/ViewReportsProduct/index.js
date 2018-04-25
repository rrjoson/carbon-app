import React from 'react';
import techSvg from 'assets/tech.svg';

import styles from './styles.css';

function ViewReportsProduct(props) {
  const { data } = props;

  return (
    <div className={styles.viewReportsProduct}>
      <img src={techSvg} width="62" height="62" />
      <div className={styles.content}>
        <div className={styles.title}>PRODUCT WITH MOST CASES</div>
        <div className={styles.value}>{data}</div>
      </div>
    </div>
  );
}

ViewReportsProduct.propTypes = {};

export default ViewReportsProduct;
