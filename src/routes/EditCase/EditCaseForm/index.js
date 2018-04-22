import React, { Component } from 'react';
import { Input, Icon, Button, Row, Col, DatePicker, Divider, Modal } from 'antd';
import moment from 'moment';

import { Form, Link, Select, RestrictedComponent } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;

class DynamicFieldSet extends Component {
  handleChangeVendor = (data) => {
    this.props.form.setFieldsValue({ productName: '' });
    this.props.onSelectVendor(data);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      this.props.onSave(values);
    });
  }

  showConfirmDeleteCaseModal = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        this.props.onDeleteCase(this.props.selectedCase.glocalId);
      },
    });
  }

  handleChangeClient = (data) => {
    this.props.form.setFieldsValue({ contact_person: '' });
    console.warn(data)
    this.props.onSelectClient(data);
  }

  render() {
    const { selectedCase } = this.props;
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
              {getFieldDecorator('glocalId', {
                initialValue: selectedCase.glocalId,
              })(
                <Input type="text" disabled />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Vendor Case ID (Optional)">
              {getFieldDecorator('vendorCaseId', {
                initialValue: selectedCase.vendorCaseId,
              })(
                <Input type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date ID Created">
              {getFieldDecorator('dateIdCreated', {
                initialValue: moment(selectedCase.dateIdCreated, 'YYYY-MM-DD'),
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
                initialValue: moment(selectedCase.dateRaised, "YYYY-MM-DD"),
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
                initialValue: selectedCase.case_status,
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
                initialValue: selectedCase.caseTitle,
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
                initialValue: selectedCase.caseDescription,
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
                initialValue: selectedCase.severity,
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
                initialValue: selectedCase.vendor,
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
                initialValue: selectedCase.productName,
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
                initialValue: selectedCase.customer,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select onChange={this.handleChangeClient}>
                  {
                    this.props.clients.map((client) => {
                      return <Option value={client.accountName}>{client.accountName}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Customer Name">
              {getFieldDecorator('contact_person', {
                initialValue: selectedCase.contact_person,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
               <Select disabled={!getFieldValue('customer')}>
                {
                  this.props.customers && this.props.customers[0] && this.props.customers[0].customer_name && this.props.customers[0].customer_name[0].map((customer) => {
                    return <Option value={customer}>{customer}</Option>
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
                initialValue: selectedCase.systemsEngineerLead,
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
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem {...formItemLayoutWithOutLabel}>
          <Button loading={this.props.loading} type="primary" style={{ marginRight: 8 }} htmlType="submit">
            {!this.props.loading ? <Icon type="save" /> : null}
            Save
          </Button>
          <RestrictedComponent action="DELETE_CASE">
            <Button onClick={this.showConfirmDeleteCaseModal} type="danger" style={{ marginRight: 8 }}>Delete</Button>
          </RestrictedComponent>
          <Link to="/cases/all">
            <Button>Cancel</Button>
          </Link>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);

export default WrappedDynamicFieldSet;
