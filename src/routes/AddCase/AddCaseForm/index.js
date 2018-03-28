import React, { Component } from 'react';
import { Input, Icon, Button, Row, Col, DatePicker } from 'antd';
import moment from 'moment';

import { Form, Link, Select, Divider } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;

let uuid = 1;

class AddCaseForm extends Component {

  remove = (vendorName, k) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys-${vendorName}`);
    const nextKeys = [];

    if (keys.length === 1) return;
    keys.forEach((key) => {
      if (key.id !== k.id) {
        nextKeys.push(key);
      }
    });
    form.setFieldsValue({ [`keys-${vendorName}`]: nextKeys });
  }

  add = (vendorName) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys-${vendorName}`);

    keys.push({
      id: uuid,
      name: this.props.engineers[0].fullName,
    });
    uuid += 1;
    form.setFieldsValue({ [`keys-${vendorName}`]: keys });
  }

  handleChangeVendor = (data) => {
    this.props.form.setFieldsValue({ productName: '' });
    this.props.onSelectVendor(data);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSave(values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 24 },
      },
    };

    return (
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Glocal ID">
              <Input type="text" disabled value={this.props.nextId} />
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Vendor Case ID (Optional)">
              {getFieldDecorator('vendorCaseId', {})(
                <Input type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date ID Created">
              {getFieldDecorator('dateIdCreated', {
                initialValue: moment(),
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <DatePicker format={'MM/DD/YYYY'} disabled />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date Raised by Client">
              {getFieldDecorator('dateRaised', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <DatePicker format={'MM/DD/YYYY'} />
              )}
            </FormItem>
          </Col>

          <Col span={5} style={{ opacity: '0' }}>
            <FormItem label="Case Status (Hidden)">
              {getFieldDecorator('case_status', {
                initialValue: 'Ongoing',
              })(
                <Input type="text" />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Case Title">
              {getFieldDecorator('caseTitle', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Input type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Description">
              {getFieldDecorator('caseDescription', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Input type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Severity">
              {getFieldDecorator('severity', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select>
                  <Option value={1}>1 - Emergency</Option>
                  <Option value={2}>2 - Critical</Option>
                  <Option value={3}>3 - Major</Option>
                  <Option value={4}>4 - Minor</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <Divider />

        <Row gutter={12}>
          <Col span={5}>
            <FormItem label="Vendor">
              {getFieldDecorator('vendor', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select onChange={this.handleChangeVendor}>
                  {
                    this.props.vendors.map((vendor) => {
                      return <Option value={vendor.principal}>{vendor.principal}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={5}>
           <FormItem label="Product Line">
              {getFieldDecorator('productName', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select disabled={!getFieldValue('vendor')}>
                  {
                    this.props.products.map((product) => {
                      return <Option value={product.productName}>{product.productName}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Client">
              {getFieldDecorator('customer', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select placeholder={this.props.clients[0]['accountName']}>
                  {
                    this.props.clients.map((client) => {
                      return <Option value={client.accountName}>{client.accountName}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col span={5}>
            <FormItem label="Systems Engineer Lead">
              {getFieldDecorator('systemsEngineerLead', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select placeholder={this.props.engineers[0].fullName} style={{ width: '224px', marginRight: 19 }}>
                  {
                    this.props.engineers.map((engineer) => {
                      return <Option value={engineer.fullName}>{engineer.fullName}</Option>;
                    })
                  }
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem {...formItemLayoutWithOutLabel}>
          <Button loading={this.props.loading} type="primary" style={{ marginRight: 8 }} htmlType="submit">
            {!this.props.loading ? <Icon type="save" /> : null}
            Save
          </Button>
          <Link to="/cases/all">
            <Button>Cancel</Button>
          </Link>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddCaseForm = Form.create()(AddCaseForm);

export default WrappedAddCaseForm;
