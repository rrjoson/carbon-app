// EXTERNAL DEPENDENCIES
import React from 'react';

// INTERNAL DEPENDENCIES
import styles from './styles.css';

const Typography = {};

Typography.H1 = props => <span {...props} className={styles.h1}>{props.children}</span>;
Typography.H2 = props => <span {...props} className={styles.h2}>{props.children}</span>;
Typography.H3 = props => <span {...props} className={styles.h3}>{props.children}</span>;
Typography.H4 = props => <span {...props} className={styles.h4}>{props.children}</span>;
Typography.H5 = props => <span {...props} className={styles.h5}>{props.children}</span>;
Typography.H6 = props => <span {...props} className={styles.h6}>{props.children}</span>;

export default Typography;
