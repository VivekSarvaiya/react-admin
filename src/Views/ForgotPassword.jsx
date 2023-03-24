import React, { useState } from "react";
import { Card, Row, Col, Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

function ForgotPassword(props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [sendOTP, setSendOTP] = useState(false);
  const [otp, setOtp] = useState();
  const [otperror, setOtperror] = useState();
  const [username, setUsername] = useState("");
  const nav = useNavigate();

  const onSend = (values) => {
    console.log(values);
    setLoading(true);
    axios
      .post(`http://localhost:8000/api/usersForgotPassword/`, values)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setSendOTP(true);
        message.success("A Email has been sent to your email address !", 2);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        message.error(err.response.data.message);
      });
  };

  const verifyOtp = () => {
    setLoading(true);
    console.log({ username, otp });
    axios
      .post(`http://localhost:8000/api/usersForgotPasswordOTPVerify/`, {
        username,
        otp,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setOtperror(false);
        message.success("OTP verified and Password updated successfully !", 2);
      })
      .catch((err) => {
        console.log(err);
        setOtperror(true);
        setLoading(false);
        message.error(err.response.data.error);
      });
  };

  const inputstyle = {
    width: "40px",
    height: "56px",
    background: "#e9e9e9",
    borderRadius: "3px",
    border: "none",
    fontSize: "20px",
  };

  return (
    <section className="forgot-password">
      <div className="container" style={{ height: "100vh" }}>
        <div className="row d-flex justify-content-center align-items-center h-100 ">
          <div className="col-xl-4 col-lg-6 col-sm-8 col-xs-10 m-2">
            <div className="card" style={{ borderRadius: "10px" }}>
              {!sendOTP ? (
                <div className="m-2">
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
                              message:
                                "Please input your username or email address",
                            },
                          ]}
                        >
                          <Input
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
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
              ) : (
                <div className="m-2">
                  <div className="text-center">
                    <img className="img-fluid" src="/img/logo.png" alt="" />
                    <h3 className="mt-3 font-weight-bold">
                      Verify Your Email !
                    </h3>
                    <p className="mb-4">Enter the OTP recieved in your inbox</p>
                  </div>
                  <Row justify="center">
                    <Col xs={24} sm={24} md={20} lg={20}>
                      <OtpInput
                        value={otp}
                        onChange={(e) => setOtp(e)}
                        numInputs={6}
                        placeholder="000000"
                        inputStyle={inputstyle}
                        isInputNum="true"
                        containerStyle={{
                          margin: "0 1rem",
                          gap: "5px",
                          justifyContent: "center",
                        }}
                        hasErrored={otperror}
                        errorStyle={{ border: "1px solid red" }}
                        // focusStyle={{ border: "1px solid red !important" }}
                        shouldAutoFocus="true"
                      />
                      <br />
                      <Form.Item>
                        <Button
                          loading={loading}
                          type="primary"
                          htmlType="submit"
                          block
                          onClick={verifyOtp}
                        >
                          {loading ? "Verifying" : "Verify"}
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
