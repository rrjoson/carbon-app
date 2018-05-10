import React, { Component } from "react";
import { Input, Icon, Button, Row, Col } from "antd";

import { Form } from "./../../../components";
import logo from "./../../../assets/logo.png";

import styles from "./styles.css";

const FormItem = Form.Item;

class EditLicenseForm extends Component {
  handleChangeVendor = data => {
    this.props.form.setFieldsValue({ productName: "" });
    this.props.onSelectVendor(data);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = Object.assign({}, values);

        this.props.onLogin(data);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className={styles.loginForm} onSubmit={this.handleSubmit}>
        <div className={styles.loginForm__header}>
          <img
            src={logo}
            className={styles.loginForm__logo}
            role="presentation"
            alt="logo"
          />
          <div className={styles.loginForm__divider} />
          <div className={styles.loginForm__app}>
            <div className={styles.loginForm__appIcon}>
              <Icon type="eye" />
            </div>
            <div className={styles.loginForm__appName}>IRIS</div>
          </div>
        </div>
        <Row>
          <Col span={24}>
            <FormItem>
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "This is a required field"
                  }
                ]
              })(<Input type="email" placeholder="Email" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "This is a required field"
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters long"
                  }
                ]
              })(<Input type="password" placeholder="Password" />)}
            </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Button
            loading={this.props.loading}
            type="primary"
            className={styles.loginForm__button}
            style={{ width: "100%" }}
            htmlType="submit"
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedEditLicenseForm = Form.create()(EditLicenseForm);

export default WrappedEditLicenseForm;
