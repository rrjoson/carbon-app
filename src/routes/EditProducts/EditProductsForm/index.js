import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col, Modal } from 'antd';

import { Link, Typography } from './../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const { H4 } = Typography;

let uuid = 1;

class EditProductsForm extends Component {

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
        const data = Object.assign({}, values);

        console.log('Received values of form: ', values);
        console.log('Received data of form: ', data);

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

      vendors[vendorIndex].list.push({ name: product.productname });

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
                    {keys.length > 1 ? (
                      // <Link onClick={() => this.remove(vendor.name, k)} to="#">Delete</Link>
                    <Link onClick={() => this.showConfirmDeleteModal(vendor.name, k)} to="#">Delete</Link>
                    ) : null}
                  </FormItem>
                );
              });

              return (
                <Col span={6} key={vendor.name}>
                  <div className={styles.title}>
                    <H4>{vendor.name}</H4>
                  </div>
                  {formItems}
                  <FormItem {...formItemLayoutWithOutLabel}>
                    <Button onClick={() => this.add(vendor.name)} style={{ width: '132px' }}>
                      <Icon type="plus" /> Add Product
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

const WrappedEditProductsForm = Form.create()(EditProductsForm);

export default WrappedEditProductsForm;
