import React, { Component } from 'react';
import { Input, Icon, Button, Row, Col, DatePicker, Select, Radio } from 'antd';

import { Link, Typography, Form } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { H4, H5 } = Typography;

class DynamicFieldSet extends Component {
  handleSubmit = (e) => {
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
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const onSite = getFieldValue('on_site');

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
            <FormItem label="Date Start">
              {getFieldDecorator('date_start', {
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
            <FormItem label="Date End">
              {getFieldDecorator('date_end', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <DatePicker format={'MM/DD/YYYY'} />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Client">
              {getFieldDecorator('client', {
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

          <Col span={3}>
            <FormItem label="Vendor">
              {getFieldDecorator('vendor', {
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

          <Col span={3}>
            <FormItem label="Product Name">
              {getFieldDecorator('productName', {
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
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Particulars">
              {getFieldDecorator('particulars', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Input.TextArea rows={4} />
              )}
            </FormItem>
          </Col>
        </Row>

        <div className={styles.divider} />

        <Row gutter={12}>
          <H5>Level of Support</H5>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="On-site">
              {getFieldDecorator('on_site', {
                initialValue: '8x5',
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Radio.Group>
                  <Radio.Button value="8x5">8x5</Radio.Button>
                  <Radio.Button value="24x7">24x7</Radio.Button>
                  <Radio.Button value="12x6">12x6</Radio.Button>
                  <Radio.Button value="Other">Other</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        </Row>

        {
          (onSite === 'Other')
          ? <Row gutter={12}>
              <Col span={3}>
                <FormItem label="On-site">
                  {getFieldDecorator('on_site_other', {
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
          : null
        }

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Date Start">
              {getFieldDecorator('support_date_start', {
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
            <FormItem label="Date End">
              {getFieldDecorator('support_date_end', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <DatePicker format={'MM/DD/YYYY'} />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <H5>Pre-paid Support</H5>
        </Row>

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Number of Man-Days">
              {getFieldDecorator('man_days', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
                <FormItem label="Remaining Man-Days">
                  {getFieldDecorator('remaining_man_days', {
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

        <div className={styles.divider} />

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Quarterly HC">
              {getFieldDecorator('quarterly_hc', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select placeholder={''}>
                  <Option value={'8x5'}>8x5</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Remarks">
              {getFieldDecorator('remarks', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Input.TextArea rows={4} />
              )}
            </FormItem>
          </Col>
        </Row>

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
