import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Tooltip,
  Typography,
} from "antd";
import Sidebar from "../Components/Sidebar";
import { AuthContext } from "../Context/userContext";
import axios from "axios";
import { MailOutlined, Verified } from "@mui/icons-material";
import OtpInput from "react-otp-input";
import moment from "moment";
const { Text } = Typography;

const rules = {
  require: [
    {
      required: true,
      message: "This field cannot be empty",
    },
  ],
};

const Profile = () => {
  const { authState, setAuthflag, authflag } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const [openEditModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(authState?.image);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState("");
  const [otp, setOtp] = useState();
  const [otperror, setOtperror] = useState();
  const [pageState, setPageState] = useState("");
  const [imagePreview, setImagePreview] = useState()
  const [data, setData] = useState({
    fname: authState?.first_name,
    lname: authState?.last_name,
    dob: authState?.Date_of_birth,
    email: authState?.email,
    phone: authState?.phone_no,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
    // console.log(data);
  };

  // const convertImageToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  const handleImageChange = async (event) => {
    console.log(event, "image");
    setImagePreview(URL.createObjectURL(event.target.files[0]));
    const file = event.target.files[0];
    setImage(file)
    // const base64 = await convertImageToBase64(file);
    // setImage(base64);
    // console.log(base64);
  };

  const handleUpdate = () => {

    const bodyFormData = new FormData();
    data.fname && bodyFormData.append("first_name", data.fname);
    data.lname && bodyFormData.append("last_name", data.lname);
    data.dob && bodyFormData.append("Date_of_birth", data.dob);
    image && bodyFormData.append("image", image);
    data.email && bodyFormData.append("email", data.email);
    data.phone && bodyFormData.append("phone_no", data.phone);

    for (const value of bodyFormData.values()) {
      console.log(value);
    }
    axios
      .patch(
        ` ${process.env.REACT_APP_BASE_URL
        }/api/usersDetailsUpdate/`,
        bodyFormData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
        }
      )
      .then((res) => {
        console.log(res);
        setOpenModal(false);
        message.success("Details Updated Successfully !");
        setImagePreview()
        setAuthflag(!authflag);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response?.data?.message);
      });
  };


  const onSendEmail = () => {
    console.log(email);
    setLoading(true);
    axios
      .post(
        ` ${process.env.REACT_APP_BASE_URL}/api/UsersEmailVerifySendOTP/`,
        { email },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        message.success("OTP has been sent to your email address !");
        setPageState("VerifyOtp");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        message.error(err.response.data.message);
      });
  };

  const verifyOtp = () => {
    setLoading(true);
    console.log({ email, otp });
    axios
      .post(
        ` ${process.env.REACT_APP_BASE_URL}/api/UsersEmailVerifyOTPVerify/`,
        {
          email,
          otp: Number(otp),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        setOtperror(false);
        setPageState("");
        setAuthflag(!authflag);
        message.success("OTP verified successfully !", 1, () =>
          setOpenVerifyModal(false)
        );
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setOtperror(true);
        setOtp();
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
  useEffect(() => {
    console.log(authState, "profile");
  }, [authState])

  return (
    <>
      <div className="card p-3" style={{
        borderRadius: "10px",
        margin: "24px 16px",
        padding: 24,
      }}>
        <div className="d-flex align-items-center flex-wrap gap-5">
          <div>
            <Avatar
              sx={{
                width: "8rem",
                height: "8rem",
                background: "linear-gradient(90deg,  #3c56bd 0%, #5a78ef 100%)",
              }}
              src={authState?.image}
            />
          </div>
          <div className="col-md-5 mx-4">
            <dt className="text-sm font-medium text-gray-500">
              {authState?.username || "N/A"}{" "}
              {authState?.is_email_verified ? (
                <Tooltip title="Verified">
                  <Verified sx={{ color: "green" }} />
                </Tooltip>
              ) : (
                <Button
                  // type="link"
                  danger
                  // onClick={onSendEmail}
                  onClick={() => setOpenVerifyModal(true)}
                >
                  Verify now
                </Button>
              )}
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {authState.email || "N/A"}
            </dd>
            <Button
              type="link"
              icon={<EditOutlined style={{ fontSize: "20px" }} />}
              style={{ paddingLeft: 0 }}
              onClick={() => setOpenModal(true)}
            >
              Edit Details
            </Button>
          </div>
        </div>
        <br />
        <div>
          <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-gray-500 font-medium fs-5 mb-0">
              Personal Details
            </h1>
            <br />
            <dl className="row row-cols-1 gap-4 gap-md-0 g-md-3">
              <div className="col-md-5 mt-3">
                <dt className="text-sm font-medium text-gray-500">
                  First Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {authState.first_name || "N/A"}
                </dd>
              </div>
              <div className="col-md-5 mt-3">
                <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {authState.last_name || "N/A"}
                </dd>
              </div>
              <div className="col-md-5 mt-3">
                <dt className="text-sm font-medium text-gray-500">
                  Administrative State
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {authState?.state?.state_name || "N/A"}
                </dd>
              </div>
              <div className="col-md-5 mt-3">
                <dt className="text-sm font-medium text-gray-500">
                  Administrative City
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {authState?.city?.city_name || "N/A"}
                </dd>
              </div>
              <div className="col-md-5 mt-3">
                <dt className="text-sm font-medium text-gray-500">
                  Contact Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {authState.phone_no || "N/A"}
                </dd>
              </div>
              <div className="col-md-5 mt-3">
                <dt className="text-sm font-medium text-gray-500">
                  Adhar Card Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {authState?.aadhar_no?.replace(/\d{4}(?=\d)/g, "$&-") ||
                    "N/A"}
                </dd>
              </div>
              <div className="col-md-5 mt-3">
                <dt className="text-sm font-medium text-gray-500">
                  Date Of Birth
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {authState?.Date_of_birth || "N/A"}
                </dd>
              </div>
              <div className="col-md-5 mt-3">
                <dt className="text-sm font-medium text-gray-500">
                  Joining Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {moment(authState?.date_joined).format('MMMM Do YYYY, h:mm:ss a') || "N/A"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <Modal
        title="Edit Personal Information"
        open={openEditModal}
        maskClosable={false}
        // onSubmit={() => setOpen(false)}
        onCancel={() => setOpenModal(false)}
        zIndex={100}
        footer={[
          <Button key="submit" onClick={handleUpdate}>
            Save
          </Button>,
          <Button
            key="cancel"
            type="primary"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>,
        ]}
      >
        <Card>
          <Form
            name="edit details"
            layout="vertical"
            style={{ textAlign: "-webkit-center" }}
          >
            <div className="">
              <Avatar
                sx={{
                  width: "8rem",
                  height: "8rem",
                  background:
                    "linear-gradient(90deg,  #3c56bd 0%, #5a78ef 100%)",
                }}
                src={imagePreview || authState?.image}
              />
              <input
                type="file"
                id="upload"
                hidden
                onChange={handleImageChange}
              />
              <label className="image_upload" htmlFor="upload">
                <UploadOutlined /> Upload
              </label>
            </div>
            <Form.Item
              name="fname"
              label="First Name"
              initialValue={authState?.first_name}
            >
              <Input
                rules={rules.require}
                onChange={handleChange}
                value={data.fname}
                name="fname"
                className="selectElement"
              />
            </Form.Item>

            <Form.Item
              name="lname"
              label="Last Name"
              initialValue={authState?.last_name}
            >
              <Input
                rules={rules.require}
                onChange={handleChange}
                value={data.lname}
                name="lname"
                className="selectElement"
              />
            </Form.Item>
            <Form.Item
              name="dob"
              label="Date Of Birth"
              initialValue={authState?.Date_of_birth}
            >
              <Input
                rules={rules.require}
                onChange={handleChange}
                value={data.dob}
                type="date"
                name="dob"
                className="selectElement"
              />
            </Form.Item>

            <Text type="secondary">
              <b>Note :- </b> If you want to update email or phone number, then
              you will have to reverify yourself !
            </Text>
            <br />
            <br />
            <Form.Item
              name="email"
              label="Registered Email"
              initialValue={authState?.email}
            >
              <Input
                rules={rules.require}
                onChange={handleChange}
                value={data.email}
                name="email"
                className="selectElement"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              initialValue={authState?.phone_no}
            >
              <Input
                rules={rules.require}
                onChange={handleChange}
                value={data.phone}
                type="number"
                name="phone"
                className="selectElement"
              />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
      <Modal
        open={openVerifyModal}
        centered
        onCancel={() => {
          setOpenVerifyModal(false);
          setPageState("");
        }}
        footer={false}
      >
        {pageState !== "VerifyOtp" ? (
          <div className="m-2">
            <div className="text-center">
              <img className="img-fluid" src="/img/logo.png" alt="" />
              <h3 className="mt-3 font-weight-bold">Verify Admin</h3>
              <p className="mb-4">
                Admin, please enter your Email to verify yourself !
              </p>
            </div>
            <Row justify="center">
              <Col xs={24} sm={24} md={20} lg={20}>
                <Form
                  layout="vertical"
                  name="forget-password"
                  onFinish={onSendEmail}
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
                        message: "Please enter valid email address",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => setemail(e.target.value)}
                      value={email}
                      placeholder=" Enter email address"
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
              <h3 className="mt-3 font-weight-bold">Verify Admin</h3>
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
      </Modal>
    </>
  );
};

export default Profile;
