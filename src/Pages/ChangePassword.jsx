import React, { useState } from "react";
import { Row, Col, Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { LockOutlined } from "@mui/icons-material";

function ChangePassword(props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const rules = {
    oldpassword: [
      {
        required: true,
        message: "Please enter your password",
      },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject("Password do not match to old password!");
        },
      }),
    ],
    newpassword: [
      {
        required: true,
        message: "Please enter your password",
      },
    ],
    confirm: [
      {
        required: true,
        message: "Please confirm your password!",
      },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue("newpassword") === value) {
            return Promise.resolve();
          }
          return Promise.reject("Passwords do not match!");
        },
      }),
    ],
  };
  const onSend = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("New password has send to your email!");
    }, 1500);
  };
  return (
    <section className="forgot-password">
      <div className="container" style={{ height: "100vh" }}>
        <div className="row d-flex justify-content-center align-items-center h-100 ">
          <div className="col-xl-4 my-2">
            <div className="card" style={{ borderRadius: "10px" }}>
              <div className="my-2">
                <div className="text-center">
                  <img className="img-fluid" src="/img/logo.png" alt="" />
                  <h3 className="mt-3 font-weight-bold">Change Password?</h3>
                  <p className="mb-4">
                    Enter old password and reset your password{" "}
                  </p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      form={form}
                      layout="vertical"
                      name="forget-password"
                      onFinish={onSend}
                    >
                      <Form.Item
                        name="oldpassword"
                        rules={rules.oldpassword}
                        label="Old Password"
                        hasFeedback
                      >
                        <Input
                          placeholder="Old Password"
                          prefix={<MailOutlined className="text-primary" />}
                        />
                      </Form.Item>
                      {/* <br /> */}
                      <Form.Item
                        name="newpassword"
                        label="New Password"
                        rules={rules.newpassword}
                        hasFeedback
                      >
                        <Input.Password
                          placeholder="New Password"
                          prefix={<LockOutlined className="text-primary" />}
                        />
                      </Form.Item>
                      {/* <br /> */}
                      <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        rules={rules.confirm}
                        hasFeedback
                      >
                        <Input.Password
                          placeholder="Confirm Password"
                          prefix={<LockOutlined className="text-primary" />}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          loading={loading}
                          type="primary"
                          htmlType="submit"
                          block
                        >
                          {loading ? "Sending" : "Send"}
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangePassword;
