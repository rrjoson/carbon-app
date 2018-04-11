import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col, Modal } from 'antd';

import { Link, Typography, RestrictedComponent } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const { H5 } = Typography;

let uuid = 1;

class EditProductsForm extends Component {

  remove = (vendorName, k) => {
    const { form } = this.props;
    const keys = form.getFieldValue(`keys-${vendorName}`);
    const nextKeys = [];

    keys.forEach((key) => {
      if (key.name !== k.name) {
        nextKeys.push(key);
      }
    });

    form.setFieldsValue({ [`keys-${vendorName}`]: nextKeys });
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
        const data = Object.assign({}, values);

        console.log('Received values of form: ', values);
        console.log('Received data of form: ', data);

        this.props.onSave(data);
      }
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

    const vendors = this.props.vendors.map((vendor) => (
      { name: vendor.principal, list: [] }
    ));

    this.props.products.map((product) => {
      let found = false;
      let vendorIndex = null;
      for(let i = 0; i < vendors.length; i += 1) {
        if (product.vendor === vendors[i]['name']) {
          vendorIndex = i
          found = true;
          break;
        }
      }

      vendors[vendorIndex].list.push({ name: product.productName });

      // if (found) {

      // } else {
      //   vendors.push({
      //     name: product.vendor,
      //     list: [{ name: product.productname }]
      //   });
      // }
    });

    return (
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <Row>
          {
            vendors.map((vendor) => {
              getFieldDecorator(
                `keys-${vendor.name}`,
                { initialValue: vendor.list },
              );

              const keys = getFieldValue(`keys-${vendor.name}`);

              const formItems = keys.map((k, index) => {
                return (
                  <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    required={false}
                    key={k}
                  >
                    {getFieldDecorator(`${vendor.name}[${k.name ? k.name : index}]`, {
                      initialValue: k['name'],
                      validateTrigger: ['onChange', 'onBlur'],
                      rules: [{
                        required: true,
                        whitespace: true,
                        message: 'Please add a product name or delete this field.',
                      }],
                    })(
                      <Input placeholder="Product name" style={{ width: '224px', marginRight: 19 }} />,
                    )}
                    <RestrictedComponent action="DELETE_PRODUCT">
                      <Link onClick={() => this.showConfirmDeleteModal(vendor.name, k)} to="#">Delete</Link>
                    </RestrictedComponent>
                  </FormItem>
                );
              });

              return (
                <Col span={6} key={vendor.name}>
                  <div className={styles.title}>
                    <H5>{vendor.name}</H5>
                  </div>
                  {formItems}
                  <RestrictedComponent action="ADD_PRODUCT">
                    <FormItem {...formItemLayoutWithOutLabel}>
                      <Button onClick={() => this.add(vendor.name)} style={{ width: '132px' }}>
                        <Icon type="plus" /> Add Product
                      </Button>
                    </FormItem>
                  </RestrictedComponent>
                </Col>
              );
            })
          }
        </Row>
        <RestrictedComponent action="EDIT_PRODUCT">
          <div className={styles.divider} />
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button loading={this.props.loading} type="primary" style={{ marginRight: 8 }} htmlType="submit">
              {!this.props.loading ? <Icon type="save" /> : null}
              Save
            </Button>
            <Button>Cancel</Button>
          </FormItem>
        </RestrictedComponent>
      </Form>
    );
  }
}

const WrappedEditProductsForm = Form.create()(EditProductsForm);

export default WrappedEditProductsForm;
