import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col, DatePicker, Select } from 'antd';

import { Link, Typography } from './../../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { H4 } = Typography;

const vendors = [
  { name: 'Assigned System Engineer', products: ['Veritas 1', 'Veritas 2', 'Veritas 3'] },
];
let uuid = 1;

class DynamicFieldSet extends Component {

  remove = (vendorName, k) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys-${vendorName}`);

    if (keys.length === 1) return;
    form.setFieldsValue({ [`keys-${vendorName}`]: keys.filter(key => key !== k) });
  }

  add = (vendorName) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys-${vendorName}`);
    const nextKeys = keys.concat(`New Product ${uuid}`);

    uuid += 1;
    form.setFieldsValue({ [`keys-${vendorName}`]: nextKeys });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
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
              {getFieldDecorator('password', {})(
                <Input type="password" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Vendor Case ID (Optional)">
              {getFieldDecorator('password', {})(
                <Input type="password" />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date ID Created">
              {getFieldDecorator('date-picker')(
                <DatePicker />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date Raised by Client">
              {getFieldDecorator('date-picker')(
                <DatePicker />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Case Title">
              {getFieldDecorator('password', {})(
                <Input type="password" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Description">
              {getFieldDecorator('password', {})(
                <Input type="password" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Severity" hasFeedback>
              {getFieldDecorator('select', {})(
                <Select placeholder="Please select severity">
                  <Option value="1">Level 1 - System Down</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <div className={styles.divider} />

        <Row gutter={12}>
          <Col span={5}>
            <FormItem label="Vendor" hasFeedback>
              {getFieldDecorator('select', {})(
                <Select placeholder="Symantec">
                  <Option value="1">Symantec</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={5}>
           <FormItem label="Product Line" hasFeedback>
              {getFieldDecorator('select', {})(
                <Select placeholder="SFVVR">
                  <Option value="1">SFVVR</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Client" hasFeedback>
              {getFieldDecorator('select', {})(
                <Select placeholder="Bangko Sentral">
                  <Option value="1">Bangko Sentral</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Customer Name" hasFeedback>
              {getFieldDecorator('select', {})(
                <Select placeholder="Mareeah Koochenera">
                  <Option value="1">Mareeah Koochenera</Option>
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
                    {getFieldDecorator(`names[${k}]`, {
                      initialValue: k,
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [{
                        required: true,
                        whitespace: true,
                        message: 'Please add a vendor name or delete this field.',
                      }],
                    })(
                      <Select placeholder="Mareeah Koochenera" style={{ width: '224px', marginRight: 19 }}>
                        <Option value="1">Mareeah Koochenera</Option>
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
                    <H4>{vendor.name}</H4>
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
