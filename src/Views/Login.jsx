import React, { useContext, useEffect, useState } from "react";
// import { connect } from 'react-redux'
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert, message, Typography } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AuthContext, } from "../Context/userContext";

// import { signUp, showAuthMessage, showLoading, hideAuthMessage } from 'redux/actions/Auth';
// import { useHistory } from "react-router-dom";
// import { motion } from "framer-motion"

const rules = {
  username: [
    {
      required: true,
      message: "Please enter your username or email address",
    },
  ],
  password: [
    {
      required: true,
      message: "Please enter your password",
    },
  ],
};

export const Login = (props) => {
  // const { signUp, showLoading, loading } = props;
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [form] = Form.useForm();
  const { authState, setAuthflag, authflag } = useContext(AuthContext);
  //   let history = useHistory();

  const onSignUp = () => {
    setLoading(true);
    console.log(loading);
    form
      .validateFields()
      .then((values) => {
        console.log(loading);
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/api/usersLogin/`, values)
          .then((res) => {
            console.log(res);
            localStorage.setItem("TOKEN", res.data.token.access);
            localStorage.setItem("REFRESH", res.data.token.refresh);
            var decoded = jwt_decode(res.data.token.access);
            localStorage.setItem("USERID", decoded.user_id);
            setAuthflag(!authflag)
            setLoading(false)
            message.success("Login Successful !", 1, () => {
              nav("/");
            });
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            message.error(err.response?.data?.error);
          });
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
                <Typography
                  variant="h6"
                  noWrap={true}
                  component="div"
                  style={{ margin: "1em auto" }}
                >
                  <img src="../assets/images/logo.png" alt="logo" width={100} style={{ filter: "invert(1)" }} />
                </Typography>
                <h3 className="my-3 mx-5 text-center">Welcome back, Admin</h3>
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
