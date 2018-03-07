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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const engineers = this.props.engineers;
        const engineerIndex = values.engineerIndex;

        const data = Object.assign({}, values);
        data.engineerName = `${engineers[engineerIndex]['firstname']} ${engineers[engineerIndex]['lastname']}`;
        data.engid = engineers[engineerIndex]['engid']
        delete data.engineerIndex;

        console.log('Received values of form: ', data);

        this.props.onSave(data);
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
              {getFieldDecorator('trackingNo', {
                initialValue: this.props.selectedCase.glocalid
              })(
                <Input disabled type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Vendor Case ID">
              <Input disabled type="text" value={this.props.selectedCase.vendorcaseid} />
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Time In">
              {getFieldDecorator('timeIn')(
                <DatePicker
                  style={{ width: '270px' }}
                  showTime={{use12Hours: true, format: 'HH:mm'}}
                  placeholder="Select date and time"
                  format="MM-DD-YYYY LT"
                />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Time Out">
              {getFieldDecorator('timeOuts')(
                <DatePicker
                  style={{ width: '270px' }}
                  showTime={{use12Hours: true, format: 'HH:mm'}}
                  placeholder="Select date and time"
                  format="MM-DD-YYYY LT"
                />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Product Name">
              {getFieldDecorator('productName', {
                initialValue: this.props.selectedCase.productname
              })(
                <Input disabled type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Client">
              {getFieldDecorator('client', {
                initialValue: this.props.selectedCase.customer
              })(
                <Input disabled type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Customer Name">
              {getFieldDecorator('contactCustomer', {
                initialValue: this.props.selectedCase.customername,
              })(
                <Input disabled type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Address">
              {getFieldDecorator('addres', {
                initialValue: this.props.selectedClient.company_address
              })(
                <Input disabled type="text" />
              )}
            </FormItem>
          </Col>
        </Row>

        <div className={styles.divider} />

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Type of Activity">
              {getFieldDecorator('typeOfActivity')(
                <Radio.Group>
                  <Radio.Button value="Onsite">Onsite</Radio.Button>
                  <Radio.Button value="Implementation">Implementation</Radio.Button>
                  <Radio.Button value="POC">POC</Radio.Button>
                  <Radio.Button value="Remote">Remote</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Purpose of Visit">
              {getFieldDecorator('purposeOfVisit', {})(
                <Input type="text" />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Activity Performed">
              {getFieldDecorator('activityPerformed', {})(
                <Input.TextArea rows={4} />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Next Activity">
              {getFieldDecorator('nextActivity', {})(
                <Input.TextArea rows={4} />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Recommendation (Optional)">
              {getFieldDecorator('recommendations', {})(
                <Input.TextArea rows={4} />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row>
          <FormItem label="Assigned System Engineer">
            {getFieldDecorator('engineerIndex', {
              initialValue: 0,
            })(
              <Select placeholder={`${this.props.engineers[0]['firstname']} ${this.props.engineers[0]['lastname']}`} style={{ width: '224px', marginRight: 19 }}>
                {
                  this.props.engineers.map((engineer, index) => {
                    return <Option value={index}>{`${engineer.firstname} ${engineer.lastname}`}</Option>
                  })
                }
              </Select>
            )}
          </FormItem>
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
