import React, { useState } from "react";
import { Card, Row, Col, Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

function ForgotPassword(props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
                  <h3 className="mt-3 font-weight-bold">Forgot Password?</h3>
                  <p className="mb-4">Enter your Email to reset password</p>
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
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email address",
                          },
                          {
                            type: "email",
                            message: "Please enter a validate email!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Email Address"
                          prefix={<MailOutlined className="text-primary" />}
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

export default ForgotPassword;
