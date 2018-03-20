import React, { Component } from 'react';
import { Input, Icon, Button, Row, Col, Select, Modal } from 'antd';

import { Link, Typography, Form, Divider } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;

const vendors = [
  {
    name: 'contact_details',
    items: [
      { "Customer_Name": "", "Email": "", "Contact_Number": "" }
    ],
  },
];

let uuid = 1;

class AddClientForm extends Component {
  remove = (vendorName, k) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys-${vendorName}`);

    if (keys.length === 1) return;
    form.setFieldsValue({ [`keys-${vendorName}`]: keys.filter(key => key !== k) });
  }

  add = (vendorName) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys-${vendorName}`);

    const nextKeys = keys.concat({ "Customer_Name": "", "Email": "", "Contact_Number": "" });

    uuid += 1;
    form.setFieldsValue({ [`keys-${vendorName}`]: nextKeys });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = Object.assign({}, values);

        const contact_details = values['keys-contact_details'].map((item, index) => {
          return (
            [
              values[`contact_details-${index}-Customer_Name`],
              values[`contact_details-${index}-Email`],
              values[`contact_details-${index}-Contact_Number`],
            ]
          );
        });

        values['keys-contact_details'].forEach((item, index) => {
          delete data[`contact_details-${index}-Customer_Name`]
          delete data[`contact_details-${index}-Email`]
          delete data[`contact_details-${index}-Contact_Number`]
        });

        data.contact_details = contact_details;
        delete data['keys-contact_details']

        console.log('Received values of form: ', data);
        this.props.onSave(data);
      }
    });
  }

  showConfirmDeleteModal = (vendorName, k) => {
    Modal.confirm({
      title: 'Are you sure you want to delete ___ from ___?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        this.remove(vendorName, k);
      },
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    return (
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Client">
              {getFieldDecorator('accountName', {
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

        <Row>
          {
            vendors.map((vendor) => {
              getFieldDecorator(
                `keys-${vendor.name}`,
                { initialValue: vendor.items },
              );

              const keys = getFieldValue(`keys-${vendor.name}`);

              const formItems = keys.map((k, index) => {
                return (
                  <Row gutter={12}>
                    <Col span={4}>
                      <FormItem
                        label='Customer Name'
                        required={false}
                        key={k}
                      >
                        {getFieldDecorator(`contact_details-${index}-Customer_Name`, {
                          initialValue: k['Customer_Name'],
                          validateTrigger: ['onChange', 'onBlur'],
                          rules: [{
                            required: true,
                            message: 'This is a required field',
                          }],
                        })(
                          <Input type="text" />
                        )}
                      </FormItem>
                    </Col>

                    <Col span={4}>
                      <FormItem
                        label='Email'
                        required={false}
                        key={k}
                      >
                        {getFieldDecorator(`contact_details-${index}-Email`, {
                          initialValue: k['Email'],
                          validateTrigger: ['onChange', 'onBlur'],
                          rules: [{
                            required: true,
                            message: 'This is a required field',
                          }],
                        })(
                          <Input type="text" />
                        )}
                      </FormItem>

                    </Col>

                    <Col span={4}>
                      <FormItem
                        label='Contact Number'
                        required={false}
                        key={k}
                      >
                        {getFieldDecorator(`contact_details-${index}-Contact_Number`, {
                          initialValue: k['Contact_Number'],
                          validateTrigger: ['onChange', 'onBlur'],
                          rules: [{
                            required: true,
                            message: 'This is a required field',
                          }],
                        })(
                          <Input type="text" />
                        )}
                      </FormItem>

                    </Col>
                    <Col span={4} className={styles.addClientForm__link}>
                      {keys.length > 1 ? (
                        <Link onClick={() => this.showConfirmDeleteModal(vendor.name, k)} to="#">Delete</Link>
                      ) : null}
                    </Col>
                  </Row>
                );
              });

              return (
                <Col span={24} key={vendor.name}>
                  {formItems}
                  <FormItem>
                    <Button onClick={() => this.add(vendor.name)} style={{ width: '152px' }}>
                      <Icon type="plus" /> Add Customer
                    </Button>
                  </FormItem>
                </Col>
              );
            })
          }
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <FormItem label="Company Address">
              {getFieldDecorator('company_address', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Input.TextArea autosize={{ minRows: 4, maxRows: 6 }} />
              )}
            </FormItem>
          </Col>
        </Row>

        <Divider />

        <Row gutter={12}>
          <Col span={6}>
            <FormItem label="Account Manager">
              {getFieldDecorator('accountManager', {
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select placeholder={`${this.props.engineers[0]['firstName']} ${this.props.engineers[0]['lastName']}`}>
                  {
                    this.props.engineers.map((engineer) => {
                      return <Option value={`${engineer.firstName} ${engineer.lastName}`}>{`${engineer.firstName} ${engineer.lastName}`}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <Divider />

        <FormItem>
          <Button className={styles.addClientForm__save} type="primary" htmlType="submit">
            <Icon type="save" />
            Save
          </Button>
          <Button className={styles.addClientForm__cancel}>Cancel</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddClientForm = Form.create()(AddClientForm);

export default WrappedAddClientForm;
