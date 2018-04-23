import React, { PureComponent } from 'react';
import { Input, Icon, Button, Row, Col, Modal } from 'antd';

import { Form, Link, Select, RestrictedComponent } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;

let vendors = [
  {
    name: 'contact_details',
    items: [
      { "Customer_Name": "N/A", "Email": "N/A", "Contact_Number": "N/A", "Position": "N/A" }
    ]
  }
];

let uuid = 1;

class EditClientForm extends PureComponent {
  componentDidMount() {
    const { client } = this.props;

    vendors[0].items = [];

    for (let i = 0; i < client.customer_name[0].length; i += 1) {
      vendors[0].items[i] = {
        ...vendors[0].items[i],
        Customer_Name: client.customer_name[0][i],
      };
    }

    for (let i = 0; i < client.email[0].length; i += 1) {
      vendors[0].items[i] = {
        ...vendors[0].items[i],
        Email: client.email[0][i],
      };
    }

    for (let i = 0; i < client.contact_number[0].length; i += 1) {
      vendors[0].items[i] = {
        ...vendors[0].items[i],
        Contact_Number: client.contact_number[0][i],
      };
    }

    for (let i = 0; i < client.position[0].length; i += 1) {
      vendors[0].items[i] = {
        ...vendors[0].items[i],
        Position: client.position[0][i],
      };
    }
  }

  remove = (vendorName, k) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys-${vendorName}`);

    if (keys.length === 1) return;
    form.setFieldsValue({ [`keys-${vendorName}`]: keys.filter(key => key !== k) });
  }

  add = (vendorName) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys-${vendorName}`);

    const nextKeys = keys.concat({ "Customer_Name": "N/A", "Email": "N/A", "Contact_Number": "N/A", "Position": "N/A" });

    uuid += 1;
    form.setFieldsValue({ [`keys-${vendorName}`]: nextKeys });
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

  showConfirmDeleteClientModal = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        this.props.onDeleteClient(this.props.client.accountName);
      },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = Object.assign({}, values);

        data.contact_details = [[], [], [], []];

        values['keys-contact_details'].forEach((item, index) => {
          data.contact_details[0].push(values[`contact_details-${index}-Customer_Name`]);
          data.contact_details[1].push(values[`contact_details-${index}-Email`]);
          data.contact_details[2].push(values[`contact_details-${index}-Contact_Number`]);
          data.contact_details[3].push(values[`contact_details-${index}-Position`]);
        });

        values['keys-contact_details'].forEach((item, index) => {
          delete data[`contact_details-${index}-Customer_Name`]
          delete data[`contact_details-${index}-Email`]
          delete data[`contact_details-${index}-Contact_Number`]
          delete data[`contact_details-${index}-Position`]
        });

        delete data['keys-contact_details'];

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
            <FormItem label="Client">
              {getFieldDecorator('accountName', {
                initialValue: this.props.client.accountName,
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
                        label="Customer Name"
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

                    <Col span={4}>
                      <FormItem
                        label='Position'
                        required={false}
                        key={k}
                      >
                        {getFieldDecorator(`contact_details-${index}-Position`, {
                          initialValue: k['Position'],
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
                    <Col span={4} className={styles.addClient__link}>
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
                  <FormItem {...formItemLayoutWithOutLabel}>
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
                initialValue: this.props.client.company_address,
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
          <Col span={6}>
            <FormItem label="Account Manager">
              {getFieldDecorator('accountManager', {
                initialValue: this.props.client.accountManager,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select>
                  {
                    this.props.accountManagers.map((accountManager) => {
                      return <Option value={accountManager.fullName}>{accountManager.fullName}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <div className={styles.divider} />

        <FormItem {...formItemLayoutWithOutLabel}>
          <Button loading={this.props.loading} type="primary" style={{ marginRight: 8 }} htmlType="submit">
            {!this.props.loading ? <Icon type="save" /> : null}
            Save
          </Button>
          <RestrictedComponent action="DELETE_CLIENT">
            <Button onClick={this.showConfirmDeleteClientModal} type="danger" style={{ marginRight: 8 }}>Delete</Button>
          </RestrictedComponent>
          <Button>Cancel</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedEditClientForm = Form.create()(EditClientForm);

export default WrappedEditClientForm;
