import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col, DatePicker, Select } from 'antd';
import moment from 'moment';

import { Link, Typography } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { H4 } = Typography;

let uuid = 1;

class DynamicFieldSet extends Component {
  componentDidMount() {
    uuid = this.props.selectedCase.assignedsystemsengineer.length
  }

  remove = (vendorName, k) => {
    const { form } = this.props;
    console.warn(vendorName)
    const keys = form.getFieldValue(`keys-${vendorName}`);
    const nextKeys = [];

    console.warn(222, keys)
    if (keys.length === 1) return;
    keys.forEach((key) => {
      console.warn(333, key, k)
      if (key.id !== k.id) {
        nextKeys.push(key);
      }
    });
    form.setFieldsValue({ [`keys-${vendorName}`]: nextKeys });
  }

  add = (vendorName) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys-${vendorName}`);

    console.warn(keys)

    // keys.push([`${this.props.engineers[0]['firstname']} ${this.props.engineers[0]['lastname']}`]);
    keys.push({
      id: uuid,
      name: `${this.props.engineers[0]['firstname']} ${this.props.engineers[0]['lastname']}`,
    });
    uuid += 1;
    console.warn(keys)
    form.setFieldsValue({ [`keys-${vendorName}`]: keys });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      const data = Object.assign({}, values);

      if (!err) {
        console.log('Received values of form: ', values);
      }

      delete data['keys-assignedSystemsEngineer']
      data['assignedSystemsEngineer'] = values.assignedSystemsEngineer.map((item) => (
        [item]
      ))
      console.log('Received values of form: ', data);
      this.props.onSave(data)
    });
  }

  render() {
    const { selectedCase } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;


    const vendors = [
      {
        label: 'Assigned System Engineer',
        name: 'assignedSystemsEngineer',
        products: selectedCase.assignedsystemsengineer.map((item, index) => {
          return {
            id: index,
            name: item[0],
          }
        })
      },
    ];

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
      <Form className={styles.form} onSubmit={this.handleSubmit} hideRequiredMark>
        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Glocal ID">
              {getFieldDecorator('glocalId', {
                initialValue: selectedCase.glocalid
              })(
                <Input type="text" disabled />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Vendor Case ID (Optional)">
              {getFieldDecorator('vendorCaseId', {
                initialValue: selectedCase.vendorcaseid
              })(
                <Input type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date ID Created">
              {getFieldDecorator('dateIdCreated', {
                initialValue: moment(selectedCase.dateidcreated, "YYYY-MM-DD"),
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <DatePicker format={'MM/DD/YYYY'} />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date Raised by Client">
              {getFieldDecorator('dateRaised', {
                initialValue: moment(selectedCase.dateraised, "YYYY-MM-DD"),
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
                initialValue: selectedCase.casetitle,
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
                initialValue: selectedCase.casedescription,
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
                <Select placeholder="severity">
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <div className={styles.divider} />

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
                <Select placeholder={this.props.vendors[0]['principal']}>
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
                initialValue: selectedCase.productname,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select placeholder={this.props.products[0]['productname']}>
                  {
                    this.props.products.map((product) => {
                      return <Option value={product.productname}>{product.productname}</Option>
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
                <Select placeholder={this.props.clients[0]['accountname']}>
                  {
                    this.props.clients.map((client) => {
                      return <Option value={client.accountname}>{client.accountname}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Customer Name">
              {getFieldDecorator('customerName', {
                initialValue: selectedCase.customername,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select placeholder={this.props.customers[0]['contact_person']}>
                  {
                    this.props.customers.map((customer) => {
                      return <Option value={customer.contact_person}>{customer.contact_person}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <div className={styles.divider} />

        <Row>
        {
            vendors.map((vendor) => {
              getFieldDecorator(
                `keys-${vendor.name}`,
                { initialValue: vendor.products },
              );

              const keys = getFieldValue(`keys-${vendor.name}`);
              console.warn(keys, 8888)

              const formItems = keys.map((k, index) => {
                return (
                  <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    required={false}
                    key={k.id}
                  >
                    {getFieldDecorator(`${vendor.name}[${index}]`, {
                      initialValue: k.name,
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [{
                        required: true,
                        whitespace: true,
                        message: 'Please add a vendor name or delete this field.',
                      }],
                    })(
                      <Select placeholder={`${this.props.engineers[0]['firstname']} ${this.props.engineers[0]['lastname']}`} style={{ width: '224px', marginRight: 19 }}>
                        {
                          this.props.engineers.map((engineer) => {
                            return <Option value={`${engineer.firstname} ${engineer.lastname}`}>{`${engineer.firstname} ${engineer.lastname}`}</Option>
                          })
                        }
                      </Select>
                    )}
                    {keys.length > 1 ? (
                      <Link onClick={() => this.remove(vendor.name, k)} to="#">Delete</Link>
                    ) : null}
                  </FormItem>
                );
              });

              return (
                <Col span={6} key={vendor.name}>
                  <div className={styles.title}>
                    <H4>{vendor.label}</H4>
                  </div>
                  {formItems}
                  <FormItem {...formItemLayoutWithOutLabel}>
                    <Button onClick={() => this.add(vendor.name)} style={{ width: '132px' }}>
                      <Icon type="plus" /> Add SE
                    </Button>
                  </FormItem>
                </Col>
              );
            })
          }
        </Row>
        <div className={styles.divider} />
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" style={{ marginRight: 8 }} htmlType="submit">
            <Icon type="save" />
            Save
          </Button>
          <Button>Cancel</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);

export default WrappedDynamicFieldSet;
