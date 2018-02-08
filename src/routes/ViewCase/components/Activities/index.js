import React, { Component } from 'react';
import { Collapse } from 'antd';
import { Typography, Link, Status } from './../../../../components';
import classnames from 'classnames';

import styles from './styles.css';

const { H3 } = Typography;
const Panel = Collapse.Panel;

const list = [
  { id: 1, content: 'HELLO WORLD 1' },
  { id: 2, content: 'HELLO WORLD 2' },
  { id: 3, content: 'HELLO WORLD 3' },
];

class Activities extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: {}
    };
  }

  handleClick = (item, index) => {
    const selected = this.state.selected;
    const isSelected = selected[index];

    if (isSelected)
      delete selected[index]
    else
    selected[index] = item;

    console.warn(selected)

    this.setState({ selected });
  }

  render() {
    return (
      <div>
        <H3>Activities</H3>
        {
          list.map((item, index) => {
            const activityStyle = classnames({
              [styles.activity]: true,
              [styles.open]: this.state.selected[index],
            });

            return (
              <div className={activityStyle}>
                {item.content}
                {item.content}
                {item.content}
                {item.content}
                {item.content}
                {item.content}
                {item.content}
                {item.content}
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
