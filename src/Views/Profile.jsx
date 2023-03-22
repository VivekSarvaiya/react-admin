import React, { useState } from "react";
import { Avatar } from "@mui/material";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Select, Upload } from "antd";
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
  const [openEditModal, setOpenModal] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const [file, setFile] = useState();
  const [data, setData] = useState({
    username: "asdsad",
    fname: "fname",
    lname: "lname",
    phone: "phone",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };
  const handleSave = (e) => {
    console.log(data);
    setEditmode(false);
  };
  const handleImageChange = (e) => {
    // console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <section className="login">
        <div className="container " style={{ height: "100vh" }}>
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-xl-8">
              <div className="card p-4" style={{ borderRadius: "10px" }}>
                <Form
                  // form={form}
                  // layout="vertical"
                  name="register-form"
                  onFinish={handleSave}
                  autoComplete="fasle"
                >
                  <div className="d-flex align-items-center flex-wrap gap-5">
                    <div>
                      <Avatar
                        sx={{
                          width: "8rem",
                          height: "8rem",
                          background:
                            "linear-gradient(90deg,  #3c56bd 0%, #5a78ef 100%)",
                        }}
                        src={file}
                      />
                      {editmode && (
                        <Upload onChange={handleImageChange}>
                          <Button name="file" icon={<UploadOutlined />}>
                            Click to Upload
                          </Button>
                        </Upload>
                      )}
                      {/* <Button name="file" icon={<UploadOutlined />}>
                          Upload
                          <input
                            hidden
                            type="file"
                            onChange={handleImageChange}
                          />
                        </Button> */}
                    </div>
                    <div className="col-md-6 mx-4">
                      <dt className="text-sm font-medium text-gray-500">
                        {editmode ? (
                          <Form.Item
                            name="username"
                            rules={rules.require}
                            hasFeedback
                            initialValue={data.username}
                          >
                            <Input
                              name="username"
                              value={data.username}
                              onChange={handleChange}
                            />
                          </Form.Item>
                        ) : (
                          data.username
                        )}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">Remote</dd>
                      <Button
                        type="link"
                        className="px-0"
                        icon={<EditOutlined className="fs-5" />}
                        onClick={() => setEditmode(true)}
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
                            {editmode ? (
                              <Form.Item
                                name="fname"
                                rules={rules.require}
                                hasFeedback
                                initialValue={data.fname}
                              >
                                <Input
                                  name="fname"
                                  value={data.fname}
                                  onChange={handleChange}
                                />
                              </Form.Item>
                            ) : (
                              data.fname
                            )}
                          </dd>
                        </div>
                        <div className="col-md-6 mt-3">
                          <dt className="text-sm font-medium text-gray-500">
                            Last Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {editmode ? (
                              <Form.Item
                                name="lname"
                                rules={rules.require}
                                hasFeedback
                                initialValue={data.lname}
                              >
                                <Input
                                  name="lname"
                                  value={data.lname}
                                  onChange={handleChange}
                                />
                              </Form.Item>
                            ) : (
                              data.lname
                            )}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  {editmode && (
                    <>
                      <Button type="primary" htmlType="submit" className="mx-3">
                        Save
                      </Button>
                      <Button type="primary" onClick={() => setEditmode(false)}>
                        Cancel
                      </Button>
                    </>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Add Employee"
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
          width={1000}
        >
          <Card>
            <Form
              name="login-form"
              //  onFinish={onLogin}
            >
              <Form.Item name="name" label="Employee Name" required>
                <Input
                  // onChange={(e) => handleChangeADD(e)}
                  name="name"
                  className="selectElement"
                />
              </Form.Item>
              <Form.Item name="cardNos" label="Staff Pass ID" required>
                <Input
                  // onChange={(e) => handleChangeADD(e)}
                  // value={dataAdd.cardNos}
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
      </section>
    </>
  );
};

export default Profile;
