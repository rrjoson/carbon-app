import React, { Component } from "react";
import { Table, Menu, Dropdown, Button, Icon, Select } from "antd";
import { Typography, Link, Status, Form } from "./../../../components";

import styles from "./styles.css";

const { H3 } = Typography;
const FormItem = Form.Item;

class SelectStatus extends Component {
  render() {
    const { form, status, onSelectChange, disabled } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Status">
            {getFieldDecorator("confirm", {
              initialValue: status
            })(
              <Select
                disabled={disabled}
                onChange={onSelectChange}
                style={{ width: 200 }}
              >
                <Option value="Ongoing">Ongoing</Option>
                <Option value="Resolved">Resolved</Option>
                <Option value="Pending (Client)">Pending (Client)</Option>
                <Option value="Pending (Glo-cal)">Pending (Glo-cal)</Option>
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
