import React, { useEffect, useState } from "react";
// import { connect } from 'react-redux'
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert, message } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { signUp, showAuthMessage, showLoading, hideAuthMessage } from 'redux/actions/Auth';
// import { useHistory } from "react-router-dom";
// import { motion } from "framer-motion"

const rules = {
  username: [
    {
      required: true,
      message: "Please enter your username or email address",
    },
    // {
    //   type: "email",
    //   message: "Please enter a username or valid email",
    // },
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
  // const { signUp, showLoading, loading } = props;
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [form] = Form.useForm();
  //   let history = useHistory();

  localStorage.setItem("URL", window.location.pathname);

  const onSignUp = () => {
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        console.log(process.env.REACT_API_BASE_URL);
        axios
          .post(`http://127.0.0.1:8000/api/admin/login/`, values)
          .then((res) => {
            console.log(res);
            localStorage.setItem("TOKEN", res.data.token.access);
            message.success("Login Successful !", 1, () => {
              nav("/");
            });
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            message.error("Invalid Credentials !");
          });
        // showsetLoading();
        // signUp(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        setLoading(false);
      });
  };

  return (
    <>
      <section className="login">
        <div className="container " style={{ height: "100vh" }}>
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-xl-4 col-lg-6 col-sm-8 col-xs-10 m-2">
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
                    autoComplete="fasle"
                  >
                    <Form.Item
                      name="username"
                      label="Email or Username"
                      rules={rules.username}
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
                      className="text-decoration-underline d-inline-block"
                      onClick={() => nav("/forgetpassword")}
                    >
                      Forgot Password ?
                    </p>
                    <br />
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
