import React, { Component } from "react";
import { Input, Icon, Button, Row, Col, DatePicker, Radio } from "antd";

import { Select, Typography, Form, Divider } from "./../../../components";

import styles from "./styles.css";

const FormItem = Form.Item;
const Option = Select.Option;
const { H3 } = Typography;

class AddUserForm extends Component {
  handleChangeVendor = data => {
    this.props.form.setFieldsValue({ productName: "" });
    this.props.onSelectVendor(data);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = Object.assign({}, values);

        if (values.on_site_other) {
          data.on_site = values.on_site_other;
          delete data.on_site_other;
        }

        this.props.onSave(data);
      }
    });
  };

  render() {
    const { user } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <Row>
          <Col span={5}>
            <FormItem label="New Password">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "This is a required field"
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters long"
                  }
                ]
              })(<Input type="password" />)}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button
            loading={this.props.loading}
            type="primary"
            style={{ marginRight: 8 }}
            htmlType="submit"
          >
            {!this.props.loading ? <Icon type="save" /> : null}
            Save
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddUserForm = Form.create()(AddUserForm);

export default WrappedAddUserForm;
