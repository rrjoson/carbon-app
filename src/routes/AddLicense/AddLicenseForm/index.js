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
              {getFieldDecorator('accountName', {})(
                <DatePicker format={'MM/DD/YYYY'} />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date End">
              {getFieldDecorator('accountName', {})(
                <DatePicker format={'MM/DD/YYYY'} />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Vendor">
              {getFieldDecorator('accountName', {})(
                <Select placeholder={''}>
                  <Option value={''}>TEST</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Product Name">
              {getFieldDecorator('accountName', {})(
                <Select placeholder={''}>
                  <Option value={''}>TEST</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Client">
              {getFieldDecorator('accountName', {})(
                <Select placeholder={''}>
                  <Option value={''}>TEST</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Particulars">
              {getFieldDecorator('activityPerformed', {})(
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
              {getFieldDecorator('accountName', {})(
                <Select placeholder={''}>
                  <Option value={''}>TEST</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date Start">
              {getFieldDecorator('accountName', {})(
                <DatePicker format={'MM/DD/YYYY'} />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Date End">
              {getFieldDecorator('accountName', {})(
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
              {getFieldDecorator('accountName', {})(
                <Input />
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Remaining Man-Days">
              {getFieldDecorator('accountName', {})(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>

        <div className={styles.divider} />

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Quarterly HC">
              {getFieldDecorator('accountName', {})(
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
              {getFieldDecorator('activityPerformed', {})(
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
