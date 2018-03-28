import React, { Component } from 'react';
import { Typography, Link, Button, Activity } from './../../../components';

import styles from './styles.css';

const { H2 } = Typography;

class ViewActivitiesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: {},
    };
  }

  handleClick = (item, index) => {
    const { selected } = this.state;

    if (selected[index]) {
      delete selected[index];
    } else {
      selected[index] = item;
    }

    this.setState({ selected });
  }

  render() {
    const {
      data,
    } = this.props;

    return (
      <div className={styles.viewActivitiesList}>
        {
          data.map((item, index) => {
            return (
              <Activity
                item={item}
                glocalId={item.glocalId}
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

export default ViewActivitiesList;
