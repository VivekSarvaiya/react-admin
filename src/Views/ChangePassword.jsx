import React, { useContext, useState } from "react";
import { Row, Col, Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { LockOutlined } from "@mui/icons-material";
import { AuthContext } from "../Context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword(props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { authState } = useContext(AuthContext);
  const nav = useNavigate()
  const rules = {
    oldpassword: [
      {
        required: true,
        message: "Please enter your password",
      },
      // ({ getFieldValue }) => ({
      //   validator(rule, value) {
      //     if (!value || getFieldValue("password") === value) {
      //       return Promise.resolve();
      //     }
      //     return Promise.reject("Password do not match to old password!");
      //   },
      // }),
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
    axios.post(`http://localhost:8000/api/UsersChangePassword/`, { password: values.newpassword },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }).then((res) => {
        setLoading(false)
        message.success("Password Changed Successfully !", 2, () => nav("/"))
      }).catch((err) => {
        console.log(err);
        setLoading(false)
        message.error(err?.response?.data?.error)
      })
  };
  return (
    <section className="forgot-password">
      <div className="container" style={{ height: "100vh" }}>
        <div className="row d-flex justify-content-center align-items-center h-100 ">
          <div className="col-xl-4 col-lg-6 col-sm-8 col-xs-10 m-2">
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
