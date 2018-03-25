import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col, Modal } from 'antd';

import { Link, Typography } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const { H5 } = Typography;

let uuid = 1;

class EditVendorsForm extends Component {

  remove = (vendorName, k) => {
    const { form } = this.props;
    const keys = form.getFieldValue(vendorName);

    if (keys.length === 1) return;
    form.setFieldsValue({ [vendorName]: keys.filter(key => key !== k) });
  }

  add = (vendorName) => {
    const { form } = this.props;
    const keys = form.getFieldValue(vendorName);
    const nextKeys = keys.concat(`New Product ${uuid}`);

    uuid += 1;
    form.setFieldsValue({ [vendorName]: nextKeys });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      this.props.onSave(values);
    });
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

    const products = [];
    this.props.vendors.forEach((vendor) => {
      products.push(vendor.principal);
    });

    const vendors = [
      { name: 'vendors', label: 'Vendors', products },
    ];

    return (
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <Row>
          {
            vendors.map((vendor) => {
              getFieldDecorator(
                vendor.name,
                { initialValue: vendor.products },
              );

              const keys = getFieldValue(vendor.name);

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
                      <Input placeholder="Product name" style={{ width: '224px', marginRight: 19 }} />,
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
                      <Icon type="plus" /> Add Vendor
                    </Button>
                  </FormItem>
                </Col>
              );
            })
          }
        </Row>
        <div className={styles.divider} />
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button loading={this.props.loading} type="primary" style={{ marginRight: 8 }} htmlType="submit">
            {!this.props.loading ? <Icon type="save" /> : null}
            Save
          </Button>
          <Button>Cancel</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedEditVendorsForm = Form.create()(EditVendorsForm);

export default WrappedEditVendorsForm;
