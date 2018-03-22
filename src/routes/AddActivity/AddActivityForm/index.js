import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col, DatePicker, Select, Radio } from 'antd';

import { generatePDF } from './../../../utils/pdf';
import { Link, Typography } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { H4 } = Typography;

let uuid = 1;

class AddActivityForm extends Component {

  remove = (vendorName, k) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys-${vendorName}`);
    const nextKeys = [];

    if (keys.length === 1) return;
    keys.forEach((key) => {
      if (key.id !== k.id) {
        nextKeys.push(key);
      }
    });
    form.setFieldsValue({ [`keys-${vendorName}`]: nextKeys });
  }

  add = (vendorName) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys-${vendorName}`);

    keys.push({
      id: uuid,
      name: `${this.props.engineers[0]['firstName']} ${this.props.engineers[0]['lastName']}`,
    });
    uuid += 1;
    form.setFieldsValue({ [`keys-${vendorName}`]: keys });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // const engineers = this.props.engineers;
        // const engineerIndex = values.engineerIndex;

        const data = Object.assign({}, values);
        // data.engineerName = `${engineers[engineerIndex]['firstName']} ${engineers[engineerIndex]['lastName']}`;
        // data.engid = engineers[engineerIndex]['engId'];
        delete data['keys-assignedSystemsEngineer'];

        console.log('Received values of form: ', data);

        this.props.onSave(data);
      }
    });
  }

  exportToPDF = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        generatePDF(values);
      }
    });

  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

     const vendors = [
      {
        label: 'Assigned System Engineer',
        name: 'assignedSystemsEngineer',
        products: [
          { name: `${this.props.engineers[0]['firstName']} ${this.props.engineers[0]['lastName']}`, id: 0 }
        ]
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
              {getFieldDecorator('trackingNo', {
                initialValue: this.props.selectedCase.glocalId
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
                initialValue: this.props.selectedCase.productName
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
                initialValue: this.props.selectedCase.customer,
              })(
                <Input disabled type="text" />
              )}
            </FormItem>
          </Col>

          <Col span={5}>
            <FormItem label="Address">
              {getFieldDecorator('addres', {
                initialValue: this.props.selectedClient.company_address,
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
                initialValue: 'Onsite',
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
              {getFieldDecorator('recommendations', {})(
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
                      <Select placeholder={`${this.props.engineers[0]['firstName']} ${this.props.engineers[0]['lastName']}`} style={{ width: '224px', marginRight: 19 }}>
                        {
                          this.props.engineers.map((engineer) => {
                            return <Option value={`${engineer.firstName} ${engineer.lastName}`}>{`${engineer.firstName} ${engineer.lastName}`}</Option>
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

        {/* <Row>
          <FormItem label="Assigned System Engineer">
            {getFieldDecorator('engineerIndex', {
              initialValue: 0,
            })(
              <Select placeholder={`${this.props.engineers[0]['firstName']} ${this.props.engineers[0]['lastName']}`} style={{ width: '224px', marginRight: 19 }}>
                {
                  this.props.engineers.map((engineer, index) => {
                    return <Option value={index}>{`${engineer.firstName} ${engineer.lastName}`}</Option>
                  })
                }
              </Select>
            )}
          </FormItem>
        </Row> */}
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

const WrappedAddActivityForm = Form.create()(AddActivityForm);

export default WrappedAddActivityForm;
