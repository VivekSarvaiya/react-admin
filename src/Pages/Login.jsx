import React, { useEffect } from "react";
// import { connect } from 'react-redux'
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
// import { signUp, showAuthMessage, showLoading, hideAuthMessage } from 'redux/actions/Auth';
// import { useHistory } from "react-router-dom";
// import { motion } from "framer-motion"

const rules = {
  email: [
    {
      required: true,
      message: "Please enter your email address",
    },
    {
      type: "email",
      message: "Please enter a validate email!",
    },
  ],
  password: [
    {
      required: true,
      message: "Please enter your password",
    },
  ],
  // confirm: [
  //   {
  //     required: true,
  //     message: "Please confirm your password!",
  //   },
  //   ({ getFieldValue }) => ({
  //     validator(rule, value) {
  //       if (!value || getFieldValue("password") === value) {
  //         return Promise.resolve();
  //       }
  //       return Promise.reject("Passwords do not match!");
  //     },
  //   }),
  // ],
};

export const Login = (props) => {
  const { signUp, showLoading, loading } = props;
  const nav = useNavigate();
  const [form] = Form.useForm();
  //   let history = useHistory();

  localStorage.setItem("URL", window.location.pathname);
  const onSignUp = () => {
    form
      .validateFields()
      .then((values) => {
        showLoading();
        signUp(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <>
      <section className="login">
        <div className="container " style={{ height: "100vh" }}>
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-xl-4 my-2">
              <div className="card" style={{ borderRadius: "10px" }}>
                {/* <img
                  src="../assets/images/logo.png"
                  alt="logo"
                  className="main-logo"
                /> */}
                <h3 className="m-5 text-center">Welcome back, Admin</h3>
                <div className="card-body px-5 py-4">
                  <Form
                    form={form}
                    layout="vertical"
                    name="register-form"
                    onFinish={onSignUp}
                  >
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={rules.email}
                      hasFeedback
                    >
                      <Input
                        prefix={<MailOutlined className="text-primary" />}
                      />
                    </Form.Item>
                    <br />
                    <Form.Item
                      name="password"
                      label="Password"
                      rules={rules.password}
                      hasFeedback
                    >
                      <Input.Password
                        prefix={<LockOutlined className="text-primary" />}
                      />
                    </Form.Item>
                    <p
                      className="text-decoration-underline"
                      onClick={() => nav("/forgetpassword")}
                    >
                      Forgot Password ?
                    </p>
                    <br />
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                      >
                        Sing In
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
