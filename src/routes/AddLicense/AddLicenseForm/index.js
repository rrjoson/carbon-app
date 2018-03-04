import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col, DatePicker, Select, TimePicker, Radio } from 'antd';

import { Link, Typography } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { H4, H5 } = Typography;

class DynamicFieldSet extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
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
            <FormItem label="Date Start">
              {getFieldDecorator('date_start', {})(
                <DatePicker format={'MM/DD/YYYY'} />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date End">
              {getFieldDecorator('date_end', {})(
                <DatePicker format={'MM/DD/YYYY'} />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={3}>
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

          <Col span={3}>
            <FormItem label="Product Name">
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

          <Col span={3}>
            <FormItem label="Client">
              {getFieldDecorator('client', {})(
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
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Particulars">
              {getFieldDecorator('particulars', {})(
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
          <Col span={3}>
            <FormItem label="On-site">
              {getFieldDecorator('on_site', {})(
                <Select placeholder={''}>
                  <Option value={''}>8x5</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date Start">
              {getFieldDecorator('support_date_start', {})(
                <DatePicker format={'MM/DD/YYYY'} />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date End">
              {getFieldDecorator('support_date_end', {})(
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
              {getFieldDecorator('man_days', {})(
                <Input />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Remaining Man-Days">
              {getFieldDecorator('remaining_man_days', {})(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>

        <div className={styles.divider} />

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Quarterly HC">
              {getFieldDecorator('quarterly_hc', {})(
                <Select placeholder={''}>
                  <Option value={''}>8x5</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Remarks">
              {getFieldDecorator('remarks', {})(
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
