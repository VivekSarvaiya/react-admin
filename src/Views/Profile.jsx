import React, { useContext, useState } from "react";
import { Avatar } from "@mui/material";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Select, Upload } from "antd";
import Sidebar from "../Components/Sidebar";
import { AuthContext } from "../Context/userContext";
const { Option } = Select;

const rules = {
  require: [
    {
      required: true,
      message: "This field cannot be empty",
    },
  ],
};

const Profile = () => {
  const { authState } = useContext(AuthContext)
  const [open, setOpen] = useState(true);
  const [openEditModal, setOpenModal] = useState(false);
  const [file, setFile] = useState();
  const [data, setData] = useState({});
  // const [efitData, setEditData] = ({})
  // const handleChange = (e) => {
  //   const { value, name } = e.target;
  //   setData({ ...data, [name]: value });
  //   console.log(data);
  // };
  const handleImageChange = async (e) => {
    // await console.log(e.target.file[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };


  return (
    <>
      <div className="h-100">
        <Sidebar setClose={setOpen} />
        <section className="login">
          <div className="container " style={{ height: "100vh" }}>
            <div className="row d-flex justify-content-center align-items-center h-100 ">
              <div className="col-xl-8">
                <div className="card p-4" style={{ borderRadius: "10px" }}>
                  <div className="d-flex align-items-center flex-wrap gap-5">
                    <div>
                      <Avatar
                        sx={{
                          width: "8rem",
                          height: "8rem",
                          background:
                            "linear-gradient(90deg,  #3c56bd 0%, #5a78ef 100%)",
                        }}
                        src={authState.image}
                      />
                      {/* <Button
                        variant="outlined"
                        component="label"
                        className="m-4"
                      >
                        <UploadOutlined /> Upload
                        <input
                          hidden
                          accept="image/*"
                          multiple
                          type="file"
                          onChange={handleImageChange}
                        />
                      </Button> */}
                    </div>
                    <div className="col-md-6 mx-4">
                      <dt className="text-sm font-medium text-gray-500">
                        {authState?.username || "N/A"}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">{authState.email || "N/A"}</dd>
                      {/* <Button
                        variant="text"
                        className="px-0"
                      // onClick={() => }
                      >
                        <EditOutlined className="fs-5" />{" "} Edit Details
                      </Button> */}
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
                    <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
                      <h1 className="text-gray-500 font-medium fs-5 mb-0">
                        Personal Details
                      </h1>
                      <br />
                      <dl className="row row-cols-1 gap-4 gap-md-0 g-md-3">
                        <div className="col-md-6 mt-3">
                          <dt className="text-sm font-medium text-gray-500">
                            First Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {authState.first_name || "N/A"}
                          </dd>
                        </div>
                        <div className="col-md-6 mt-3">
                          <dt className="text-sm font-medium text-gray-500">
                            Last Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {authState.last_name || "N/A"}
                          </dd>
                        </div>
                        <div className="col-md-6 mt-3">
                          <dt className="text-sm font-medium text-gray-500">
                            Administrative State
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {authState?.state?.state_name || "N/A"}
                          </dd>
                        </div>
                        <div className="col-md-6 mt-3">
                          <dt className="text-sm font-medium text-gray-500">
                            Administrative City
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {authState?.city?.city_name || "N/A"}
                          </dd>
                        </div>
                        <div className="col-md-6 mt-3">
                          <dt className="text-sm font-medium text-gray-500">
                            Contact Number
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {authState.phone_no || "N/A"}
                          </dd>
                        </div>
                        <div className="col-md-6 mt-3">
                          <dt className="text-sm font-medium text-gray-500">
                            Adhar Card Number
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {authState?.aadhar_no?.replace(/\d{4}(?=\d)/g, '$&-') || "N/A"}
                          </dd>
                        </div>
                        <div className="col-md-6 mt-3">
                          <dt className="text-sm font-medium text-gray-500">
                            Date Of Birth
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {authState?.Date_of_birth || "N/A"}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal
        title="Edit Personal Information"
        open={openEditModal}
        // onSubmit={() => setOpen(false)}
        onCancel={() => {
          setOpenModal(false);
        }}
        footer={[
          <Button key="back">Save</Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>,
        ]}
      // width={1000}
      >
        <Card>
          <Form
            name="edit details"
          //  onFinish={onLogin}
          >
            <Form.Item name="name" label="First Name" required>
              <Input
                // onChange={(e) => handleChangeADD(e)}
                name="name"
                className="selectElement"
              />
            </Form.Item>
            <Form.Item name="cardNos" label="Staff Pass ID" required>
              <Input
                // onChange={(e) => handleChangeADD(e)}
                // value={authStateAdd.cardNos}
                name="cardNos"
                className="selectElement"
              />
            </Form.Item>
            <Form.Item name="driverID" label="Driver ID">
              <Input
                // onChange={(e) => handleChangeADD(e)}
                // value={dataAdd.driverID}
                name="driverID"
                className="selectElement"
              />
            </Form.Item>
            <Form.Item name="job" label="Job">
              <Input
                // onChange={(e) => handleChangeADD(e)}
                name="job"
                className="selectElement"
              />
            </Form.Item>
            <Form.Item name="deptId" label="Department Name " required>
              <Select
                className="w-100 mar10 selectElement"
                placeholder="Select department Name"
                // onChange={handleChange}
                name="deptId"
              >
                {/* {departId !== "" &&
                      departId.map((data) => {
                        return <Option value={data.id}>{data.name}</Option>;
                      })} */}
              </Select>
            </Form.Item>
            <Form.Item name="gender" label="Gender">
              <Select
                className="w-100 mar10 selectElement"
                placeholder="Select gender"
                // onChange={handleChangeGender}
                name="gender"
              >
                <Option value="0">Male</Option>
                <Option value="1">Female</Option>
                <Option value="-1">unKnown</Option>
              </Select>
            </Form.Item>

            <Form.Item name="phoneNumber" label="Phone Number">
              <Input
                // onChange={(e) => handleChangeADD(e)}
                name="phone"
                className="selectElement"
              />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
};

export default Profile;
