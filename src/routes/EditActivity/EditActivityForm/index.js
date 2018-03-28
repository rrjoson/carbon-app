import React, { Component } from 'react';
import { Input, Icon, Button, Row, Col, DatePicker, Radio, Modal } from 'antd';
import moment from 'moment';

import { generatePDF } from './../../../utils/pdf';
import { Form, Select, Link, Typography } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { H5 } = Typography;

const vendors = [
  { name: 'Assigned System Engineer', products: ['Richard'] },
];
let uuid = 1;

class DynamicFieldSet extends Component {
  componentDidMount() {
    uuid = this.props.selectedActivity.assignedSystemsEngineer.length;
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
      name: `${this.props.engineers[0]['firstName']} ${this.props.engineers[0]['lastName']}`,
    });
    uuid += 1;
    form.setFieldsValue({ [`keys-${vendorName}`]: keys });
  }

  showConfirmDeleteModal = (vendorName, k) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        this.remove(vendorName, k);
      },
    });
  }

  exportToPDF = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        generatePDF(values);
      }
    });
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
      this.props.onSave(data);
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const vendors = [
      {
        label: 'Assigned System Engineer',
        name: 'assignedSystemsEngineer',
        products: this.props.selectedActivity.assignedSystemsEngineer.map((item, index) => {
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
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Glocal ID">
              {getFieldDecorator('glocalId', {
                initialValue: this.props.selectedActivity.glocalId,
              })(
                <Input disabled type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Vendor Case ID">
              <Input disabled type="text" value={this.props.selectedCase.vendorCaseId} />
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Time In">
              {getFieldDecorator('timeIn', {
                initialValue: moment(this.props.selectedActivity.timeIn, 'YYYY-MM-DD'),
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
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
              {getFieldDecorator('timeOuts', {
                initialValue: moment(this.props.selectedActivity.timeOuts, 'YYYY-MM-DD'),
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
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
                initialValue: this.props.selectedActivity.productName,
              })(
                <Input disabled type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Client">
              {getFieldDecorator('client', {
                initialValue: this.props.selectedActivity.client,
              })(
                <Input disabled type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Address">
              {getFieldDecorator('addres', {
                initialValue: this.props.selectedActivity.addres,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
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
              {getFieldDecorator('typeOfActivity', {
                initialValue: this.props.selectedActivity.typeOfActivity,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
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
              {getFieldDecorator('purposeOfVisit', {
                initialValue: this.props.selectedActivity.purposeOfVisit,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Input type="text" />
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Activity Performed">
              {getFieldDecorator('activityPerformed', {
                initialValue: this.props.selectedActivity.activityPerformed,
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

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Next Activity">
              {getFieldDecorator('nextActivity', {
                initialValue: this.props.selectedActivity.nextActivity,
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

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Recommendation (Optional)">
              {getFieldDecorator('recommendations', {
                initialValue: this.props.selectedActivity.recommendations,
              })(
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
                      <Select placeholder={this.props.engineers[0].fullName} style={{ width: '224px', marginRight: 19 }}>
                        {
                          this.props.engineers.map((engineer) => {
                            return <Option value={engineer.fullName}>{engineer.fullName}</Option>;
                          })
                        }
                      </Select>
                    )}
                    {keys.length > 1 ? (
                      <Link onClick={() => this.showConfirmDeleteModal(vendor.name, k)} to="#">Delete</Link>
                    ) : null}
                  </FormItem>
                );
              });

              return (
                <Col span={6} key={vendor.name}>
                  <div className={styles.title}>
                    <H5>{vendor.label}</H5>
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
          <Button style={{ marginRight: 8 }} onClick={this.exportToPDF}>
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
