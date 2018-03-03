import React, { Component } from 'react';
import { Collapse } from 'antd';
import { Typography, Link, Status } from './../../../../components';
import classnames from 'classnames';

import styles from './styles.css';

const { H3 } = Typography;
const Panel = Collapse.Panel;

class Activities extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: {}
    };
  }

  handleClick = (item, index) => {
    const { selected } = this.state;

    if (selected[index]) {
      delete selected[index]
    } else {
      selected[index] = item;
    }

    this.setState({ selected });
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <H3>Activities</H3>
        {
          data.map((item, index) => {
            const activityStyle = classnames({
              [styles.activity]: true,
              [styles.open]: this.state.selected[index],
            });

            return (
              <div className={activityStyle}>
                {item.productname}
                {item.productname}
                {item.productname}
                {item.productname}
                {item.productname}
                {item.productname}
                {item.productname}
                <p className={styles.button} onClick={() => this.handleClick(item, index)}>SEE MORE</p>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Activities;
