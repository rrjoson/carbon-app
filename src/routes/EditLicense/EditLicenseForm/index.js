import React, { Component } from 'react';
import moment from 'moment';
import { Input, Icon, Button, Row, Col, DatePicker, Radio, Modal } from 'antd';

import { Form, Typography, Divider, Select, RestrictedComponent } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;
const { H3 } = Typography;

class EditLicenseForm extends Component {
  handleChangeVendor = (data) => {
    this.props.form.setFieldsValue({ productName: '' });
    this.props.onSelectVendor(data);
  }

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

  showConfirmDeleteLicenseModal = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        this.props.onDeleteLicense(this.props.selectedLicense.licenseId);
      },
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
              {getFieldDecorator('date_start', {
                initialValue: moment(this.props.selectedLicense.date_start, 'YYYY-MM-DD'),
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
                initialValue: moment(this.props.selectedLicense.date_end, 'YYYY-MM-DD'),
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
                initialValue: this.props.selectedLicense.client,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select placeholder={this.props.clients[0]['accountName']}>
                  {
                    this.props.clients.map((client) => {
                      return <Option value={client.accountName}>{client.accountName}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem label="Vendor">
              {getFieldDecorator('vendor', {
                initialValue: this.props.selectedLicense.vendor,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select onChange={this.handleChangeVendor}>
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
                initialValue: this.props.selectedLicense.productName,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Select disabled={!getFieldValue('vendor')}>
                  {
                    this.props.products.map((product) => {
                      return <Option value={product.productName}>{product.productName}</Option>
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
                initialValue: this.props.selectedLicense.particulars,
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

        <Divider />

        <Row gutter={12}>
          <div className={styles.addLicenseForm__sectionTitle}>
            <H3>Level of Support</H3>
          </div>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="On-Site Support">
              {getFieldDecorator('on_site', {
                initialValue: this.props.selectedLicense.on_site,
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
                  <Radio.Button value="NONE">None</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        </Row>

        {
          (getFieldValue('on_site') === 'Other')
          ? <Row gutter={12}>
              <Col span={3}>
                <FormItem label="Customized Support">
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
                initialValue: moment(this.props.selectedLicense.support_date_start, 'YYYY-MM-DD'),
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
                initialValue: moment(this.props.selectedLicense.support_date_end, 'YYYY-MM-DD'),
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
          <div className={styles.addLicenseForm__sectionTitle}>
            <H3>Pre-paid Support</H3>
          </div>
        </Row>

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Number of Man-Days">
              {getFieldDecorator('man_days', {
                initialValue: this.props.selectedLicense.man_days,
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
                    initialValue: this.props.selectedLicense.remaining_man_days,
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

        <Divider />

        <Row gutter={12}>
          <Col span={3}>
            <FormItem label="Quarterly HC">
              {getFieldDecorator('quarterly_hc', {
                initialValue: this.props.selectedLicense.quarterly_hc,
                rules: [{
                  required: true,
                  message: 'This is a required field',
                }],
              })(
                <Radio.Group>
                  <Radio.Button value={true}>Yes</Radio.Button>
                  <Radio.Button value={false}>No</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <FormItem label="Remarks">
              {getFieldDecorator('remarks', {
                initialValue: this.props.selectedLicense.remarks,
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
          <Button loading={this.props.loading} type="primary" style={{ marginRight: 8 }} htmlType="submit">
            {!this.props.loading ? <Icon type="save" /> : null}
            Save
          </Button>
          <RestrictedComponent action="DELETE_LICENSE">
            <Button onClick={this.showConfirmDeleteLicenseModal} type="danger" style={{ marginRight: 8 }}>Delete</Button>
          </RestrictedComponent>
          <Button>Cancel</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedEditLicenseForm = Form.create()(EditLicenseForm);

export default WrappedEditLicenseForm;
