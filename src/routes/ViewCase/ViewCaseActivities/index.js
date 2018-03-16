import React, { Component } from 'react';
import { Collapse } from 'antd';
import { Typography, Link, Status, Activity } from './../../../components';

import styles from './styles.css';

const { H3 } = Typography;

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
            return (
              <Activity
                item={item}
                onClick={() => this.handleClick(item, index)}
                open={this.state.selected[index]}
              />
            );
          })
        }
      </div>
    );
  }
}

export default Activities;
