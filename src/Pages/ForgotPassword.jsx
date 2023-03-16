import React, { useState } from "react";
import { Card, Row, Col, Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword(props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const onSend = (values) => {
    console.log(values);
    setLoading(true);
    axios.post(`http://127.0.0.1:8000/api/admin/forgot_password/`, values).then((res) => {
      console.log(res);
      setLoading(false);
      message.success("A Email has been sent to your email address !", 2);
    }).catch((err) => {
      console.log(err);
      setLoading(false)
      message.error(err.message);
    })
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
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username or email address",
                          },
                        ]}
                      >
                        <Input
                          placeholder=" Enter username or email address"
                          prefix={<MailOutlined className="text-primary" />}
                        />
                      </Form.Item>
                      <br />
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
