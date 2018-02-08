import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col } from 'antd';

import { Link, Typography } from './../../../../components';

import styles from './styles.css';

const FormItem = Form.Item;
const { H4 } = Typography;

const vendors = [
  { name: 'Veritas', products: ['Veritas 1', 'Veritas 2', 'Veritas 3'] },
  { name: 'Symantec', products: ['Symantec 1', 'Symantec 2'] },
  { name: 'ASG', products: [] },
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
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
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
                      <Link onClick={() => this.remove(vendor.name, k)} to="#">Delete</Link>
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
