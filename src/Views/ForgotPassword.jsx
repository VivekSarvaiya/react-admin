import React, { useState } from "react";
import { Card, Row, Col, Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { IconButton } from "@mui/material";
import { KeyboardBackspaceRounded, LockOutlined } from "@mui/icons-material";

function ForgotPassword(props) {
  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState("SendOtp");
  const [otp, setOtp] = useState();
  const [otperror, setOtperror] = useState();
  const [username, setUsername] = useState("");
  const nav = useNavigate();

  const onSend = () => {
    console.log(username);
    setLoading(true);
    axios
      .post(`http://localhost:8000/api/usersForgotPassword/`, { username })
      .then((res) => {
        console.log(res);
        setLoading(false);
        message.success("OTP has been sent to your email address !", 1, () => setPageState("VerifyOtp"));
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
        otp: Number(otp),
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setOtperror(false);
        message.success("OTP verified successfully !", 1, () => setPageState("SetPassword"));

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setOtperror(true);
        setOtp()
        message.error(err.response.data.error);
      });
  };

  const rules = {
    password: [
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
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject("Passwords do not match!");
        },
      }),
    ],
  };

  const setNewPassword = (values) => {
    console.log(values);
    setLoading(true);
    axios.post(`http://localhost:8000/api/usersForgotPasswordChange/`, { username, password: values.password }).then((res) => {
      setLoading(false)
      message.success("Password changed successfully !", 1, () => nav('/login'))
    }).catch((err) => {
      console.log(err);
      setLoading(false)
      message.error(err.response.data.error);
    })
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
              {
                pageState === "SendOtp" && (
                  <div className="m-2">
                    <div className="text-center">
                      <img className="img-fluid" src="/img/logo.png" alt="" />
                      <h3 className="mt-3 font-weight-bold">
                        <IconButton onClick={() => nav("/login")}>
                          <KeyboardBackspaceRounded />
                        </IconButton>Forgot Password?</h3>
                      <p className="mb-4">Enter your Email to reset password</p>
                    </div>
                    <Row justify="center">
                      <Col xs={24} sm={24} md={20} lg={20}>
                        <Form
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
                )}

              {
                pageState === "VerifyOtp" && (
                  <div className="m-2">
                    <div className="text-center">
                      <img className="img-fluid" src="/img/logo.png" alt="" />
                      <h3 className="mt-3 font-weight-bold">
                        <IconButton onClick={() => setPageState("SendOtp")}>
                          <KeyboardBackspaceRounded />
                        </IconButton> Verify Your Email !
                      </h3>
                      <p className="mb-4">Enter the OTP recieved in your inbox</p>
                    </div>
                    <Row justify="center">
                      <Col xs={24} sm={24} md={20} lg={20}>
                        <OtpInput
                          value={otp}
                          onChange={(e) => setOtp(e)}
                          numInputs={6}
                          placeholder="••••••"
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

              {
                pageState === "SetPassword" &&
                <div className="my-2">
                  <div className="text-center">
                    <img className="img-fluid" src="/img/logo.png" alt="" />
                    <h3 className="mt-3 font-weight-bold">
                      <IconButton onClick={() => setPageState("SendOtp")}>
                        <KeyboardBackspaceRounded />
                      </IconButton>Set New Password</h3>
                    <p className="mb-4">
                      Enter the new password for logging in !
                    </p>
                  </div>
                  <Row justify="center">
                    <Col xs={24} sm={24} md={20} lg={20}>
                      <Form
                        layout="vertical"
                        name="change-password"
                        onFinish={setNewPassword}
                      >
                        <Form.Item
                          name="password"
                          label="Password"
                          rules={rules.password}

                        >
                          <Input.Password
                            prefix={<LockOutlined className="text-primary" />}
                          />
                        </Form.Item>
                        <br />
                        <Form.Item
                          name="confirm"
                          label="Confirm Password"
                          rules={rules.confirm}

                        >
                          <Input.Password
                            prefix={<LockOutlined className="text-primary" />}
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
                            {loading ? "Saving" : "Save"}
                          </Button>
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>
                </div>

              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
