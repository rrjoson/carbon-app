// EXTERNAL DEPENDENCIES
import React from 'react';

// INTERNAL DEPENDENCIES
import styles from './styles.css';

const Typography = {};

Typography.H1 = props => <div className={styles.h1}>{props.children}</div>;
Typography.H2 = props => <div className={styles.h2}>{props.children}</div>;
Typography.H3 = props => <div className={styles.h3}>{props.children}</div>;
Typography.H4 = props => <div className={styles.h4}>{props.children}</div>;
Typography.H5 = props => <div className={styles.h5}>{props.children}</div>;
Typography.H6 = props => <div className={styles.h6}>{props.children}</div>;

export default Typography;
