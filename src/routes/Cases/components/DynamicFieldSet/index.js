import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col, DatePicker, Select } from 'antd';
import moment from 'moment';

import { Link, Typography } from './../../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { H4 } = Typography;

let uuid = 1;

class DynamicFieldSet extends Component {

  remove = (vendorName, k) => {
    const { form } = this.props;
    const keys = form.getFieldValue(vendorName);

    if (keys.length === 1) return;
    form.setFieldsValue({ [`keys-${vendorName}`]: keys.filter(key => key !== k) });
  }

  add = (vendorName) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys-${vendorName}`);

    keys.push([`${this.props.engineers[0]['firstname']} ${this.props.engineers[0]['lastname']}`]);
    uuid += 1;
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
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const vendors = [
      {
        label: 'Assigned System Engineer',
        name: 'assignedSystemsEngineer',
        products: [[`${this.props.engineers[0]['firstname']} ${this.props.engineers[0]['lastname']}`]]
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
              {getFieldDecorator('dateIdCreated')(
                <DatePicker format={'MM/DD/YYYY'} />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date Raised by Client">
              {getFieldDecorator('dateRaised')(
                <DatePicker format={'MM/DD/YYYY'} />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Case Status (Hidden)">
              {getFieldDecorator('case_status', {})(
                <Input type="text" />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Case Title">
              {getFieldDecorator('caseTitle', {})(
                <Input type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Description">
              {getFieldDecorator('caseDescription', {})(
                <Input type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Severity">
              {getFieldDecorator('severity', {})(
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
              {getFieldDecorator('vendor', {})(
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
              {getFieldDecorator('productName', {})(
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
              {getFieldDecorator('customer', {})(
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
              {getFieldDecorator('customerName', {})(
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

              const formItems = keys.map((k, index) => {
                return (
                  <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    required={false}
                    key={k}
                  >
                    {getFieldDecorator(`${vendor.name}[${index}]`, {
                      initialValue: k[0],
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
