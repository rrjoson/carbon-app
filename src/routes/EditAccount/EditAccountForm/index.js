import React, { Component } from 'react';
import { Input, Icon, Button, Row, Col, DatePicker, Radio, Modal } from 'antd';

import {
  Select,
  Typography,
  Form,
  Divider,
  RestrictedComponent,
} from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { H3 } = Typography;

class AddUserForm extends Component {
  handleChangeVendor = data => {
    this.props.form.setFieldsValue({ productName: '' });
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

  showConfirmDeleteModal = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        this.props.onDelete(this.props.user.userid);
      },
    });
  };

  render() {
    const { user, loggedInUser } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <Row>
          <Col span={5}>
            <FormItem label="Full name">
              {getFieldDecorator('fullName', {
                initialValue: user.fullName,
                rules: [
                  {
                    required: true,
                    message: 'This is a required field',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={5}>
            <FormItem label="Username">
              {getFieldDecorator('username', {
                initialValue: user.username,
                rules: [
                  {
                    required: true,
                    message: 'This is a required field',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={5}>
            <FormItem label="Email">
              {getFieldDecorator('email', {
                initialValue: user.email,
                rules: [
                  {
                    required: true,
                    message: 'This is a required field',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={5}>
            <FormItem label="Contact Number">
              {getFieldDecorator('contactNumber', {
                initialValue: user.contactNumber,
                rules: [
                  {
                    required: true,
                    message: 'This is a required field',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span={5}>
            <FormItem label="Position">
              {getFieldDecorator('position', {
                initialValue: user.position,
                rules: [
                  {
                    required: true,
                    message: 'This is a required field',
                  },
                ],
              })(
                <Select
                  disabled={
                    loggedInUser &&
                    loggedInUser.position !== 'Managing Director'
                  }
                >
                  <Select.Option value={'Managing Director'}>
                    Managing Director
                  </Select.Option>
                  <Select.Option value={'Sales Director'}>
                    Sales Director
                  </Select.Option>
                  <Select.Option value={'Sales Manager'}>
                    Sales Manager
                  </Select.Option>
                  <Select.Option value={'Senior Sales Consultant'}>
                    Senior Sales Consultant
                  </Select.Option>
                  <Select.Option value={'Sales Consultant'}>
                    Sales Consultant
                  </Select.Option>
                  <Select.Option value={'Senior Account Manager'}>
                    Senior Account Manager
                  </Select.Option>
                  <Select.Option value={'Account Manager'}>
                    Account Manager
                  </Select.Option>
                  <Select.Option value={'Product Specialist'}>
                    Product Specialist
                  </Select.Option>
                  <Select.Option value={'Business Development Manager'}>
                    Business Development Manager
                  </Select.Option>
                  <Select.Option value={'Corporate Affairs Director'}>
                    Corporate Affairs Director
                  </Select.Option>
                  <Select.Option value={'Project Manager'}>
                    Project Manager
                  </Select.Option>
                  <Select.Option value={'Technical Manager'}>
                    Technical Manager
                  </Select.Option>
                  <Select.Option value={'Team Lead'}>Team Lead</Select.Option>
                  <Select.Option value={'Senior Systems Engineer'}>
                    Senior Systems Engineer
                  </Select.Option>
                  <Select.Option value={'Systems Engineer'}>
                    Systems Engineer
                  </Select.Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <RestrictedComponent action="ADD_USER">
            <If condition={user.position !== 'Managing Director'}>
              <Button
                onClick={this.showConfirmDeleteModal}
                type="danger"
                style={{ marginRight: 8 }}
              >
                Delete
              </Button>
            </If>
          </RestrictedComponent>
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
