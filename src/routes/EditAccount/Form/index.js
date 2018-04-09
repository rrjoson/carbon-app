import React, { Component } from 'react';
import { Input, Icon, Button, Row, Col, DatePicker, Radio } from 'antd';

import { Select, Typography, Form, Divider } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { H3 } = Typography;

class AddUserForm extends Component {
  handleChangeVendor = (data) => {
    this.props.form.setFieldsValue({ productName: '' });
    this.props.onSelectVendor(data);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = Object.assign({}, values);

        if (values.on_site_other) {
          data.on_site = values.on_site_other;
          delete data.on_site_other;
        }

        console.warn(data)

        this.props.onSave(data);
      }
    });
  }

  render() {
    const { user } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <Row>
          <Col span={5}>
            <FormItem label="Full name">
              {getFieldDecorator('fullName', {
                initialValue: user.fullName,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>


        <Row>
          <Col span={5}>
            <FormItem label="Username">
              {getFieldDecorator('username', {
                initialValue: user.username,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>

        {/* <Row>
          <Col span={5}>
            <FormItem label="Password">
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Input type="password" />
              )}
            </FormItem>
          </Col>
        </Row> */}

        <Row>
          <Col span={5}>
            <FormItem label="Email">
              {getFieldDecorator('email', {
                initialValue: user.email,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={5}>
            <FormItem label="Contact Number">
              {getFieldDecorator('contactNumber', {
                initialValue: user.contactNumber,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={5}>
            <FormItem label="Position">
              {getFieldDecorator('position', {
                initialValue: user.position,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select>
                  <Select.Option value={'Director'}>Director</Select.Option>
                  <Select.Option value={'Technical Manager'}>Technical Manager</Select.Option>
                  <Select.Option value={'System Engineer'}>System Engineer</Select.Option>
                  <Select.Option value={'Sales Manager'}>Sales Manager</Select.Option>
                  <Select.Option value={'Account Manager'}>Account Manager</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button loading={this.props.loading} type="primary" style={{ marginRight: 8 }} htmlType="submit">
            {!this.props.loading ? <Icon type="save" /> : null}
            Save
          </Button>
          <Button>Cancel</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddUserForm = Form.create()(AddUserForm);

export default WrappedAddUserForm;
