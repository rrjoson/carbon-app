import React, { Component } from 'react';
import { Table, Menu, Dropdown, Button, Icon, Select, Form } from 'antd';
import { Typography, Link, Status } from './../../../../components';

import styles from './styles.css';

const { H3 } = Typography;
const FormItem = Form.Item;

class SelectStatus extends Component {
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Status">
            {getFieldDecorator('confirm', { initialValue: 'Pending (Client)' })(
              <Select style={{ width: 200 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
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
