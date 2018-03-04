import React, { Component } from 'react';
import { Table, Menu, Dropdown, Button, Icon, Select, Form } from 'antd';
import { Typography, Link, Status } from './../../../../components';

import styles from './styles.css';

const { H3 } = Typography;
const FormItem = Form.Item;

class SelectStatus extends Component {
  render() {
    const { form, status, onSelectChange } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Status">
            {getFieldDecorator('confirm', {
              initialValue: status
            })(
              <Select onChange={onSelectChange} style={{ width: 200 }}>
                <Option value="Resolved">Resolved</Option>
                <Option value="Ongoing">Ongoing</Option>
                <Option value="Pending (Client)">Pending (Client)</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedSelectStatus = Form.create()(SelectStatus);

export default WrappedSelectStatus;
