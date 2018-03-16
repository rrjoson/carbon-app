import React, { Component } from 'react';
import { Typography, Link, Button, Activity } from './../../../components';

import styles from './styles.css';

const { H2 } = Typography;

class Activities extends Component {
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
      glocalId,
      data,
    } = this.props;

    return (
      <div className={styles.viewCaseActivities}>
        <div className={styles.viewCaseActivities__section}>
          <div className={styles.viewCaseActivities__title}>
            <H2>Activities</H2>
          </div>
          <div className={styles.viewCaseActivities__actions}>
            <Link to={`/cases/${glocalId}/activities/add`}><Button>Add Activity</Button></Link>
          </div>
        </div>
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
