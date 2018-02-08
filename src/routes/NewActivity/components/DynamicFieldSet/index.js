import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col, DatePicker, Select, TimePicker, Radio } from 'antd';

import { Link, Typography } from './../../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { H4 } = Typography;

const vendors = [
  { name: 'Assigned System Engineer', products: ['Richard'] },
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
            <FormItem label="Vendor Case ID">
              {getFieldDecorator('password', {})(
                <Input type="password" />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Time In">
              {getFieldDecorator('date-picker')(
                <DatePicker />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Time Out">
              {getFieldDecorator('date-picker')(
                <DatePicker />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Product Line">
              {getFieldDecorator('password', {})(
                <Input type="password" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Client">
              {getFieldDecorator('password', {})(
                <Input type="password" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Customer Name">
              {getFieldDecorator('password', {})(
                <Input type="password" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Address">
              {getFieldDecorator('password', {})(
                <Input type="password" />
              )}
            </FormItem>
          </Col>
        </Row>

        <div className={styles.divider} />

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Type of Activity">
              {getFieldDecorator('radio-group')(
                <Radio.Group>
                  <Radio.Button value="a">Onsite</Radio.Button>
                  <Radio.Button value="b">Implementation</Radio.Button>
                  <Radio.Button value="c">POC</Radio.Button>
                  <Radio.Button value="d">Remote</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Purpose of Visit">
              {getFieldDecorator('password', {})(
                <Input type="password" />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Activity Performed">
              {getFieldDecorator('password', {})(
                <Input.TextArea rows={4} />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Next Activity">
              {getFieldDecorator('password', {})(
                <Input.TextArea rows={4} />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Recommendation (Optional)">
              {getFieldDecorator('password', {})(
                <Input.TextArea rows={4} />
              )}
            </FormItem>
          </Col>
        </Row>

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
          <Button style={{ marginRight: 8 }}>
            <Icon type="download" />
            Export to PDF
          </Button>
          <Button>Cancel</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);

export default WrappedDynamicFieldSet;
