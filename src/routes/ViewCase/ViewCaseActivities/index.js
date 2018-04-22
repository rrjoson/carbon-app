import React, { Component } from 'react';
import { Typography, Link, Button, Activity, RestrictedComponent } from './../../../components';

import styles from './styles.css';

const { H2 } = Typography;

class Activities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: {},
    };
  }

  handleDelete = (data) => {
    this.props.onDelete(data);
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
          <RestrictedComponent action="ADD_ACTIVITY">
            <div className={styles.viewCaseActivities__actions}>
              <Link to={`/cases/${glocalId}/activities/add`}><Button>Add Activity</Button></Link>
            </div>
          </RestrictedComponent>
        </div>
        {
          data.map((item, index) => {
            return (
              <Activity
                item={item}
                glocalId={glocalId}
                onClick={() => this.handleClick(item, index)}
                onDelete={() => this.handleDelete(item)}
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
