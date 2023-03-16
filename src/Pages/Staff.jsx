import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import MOCK_DATA from "../Components/MOCK_DATA.json";
import { Dropdown, Tag } from "antd";
import { DatePicker } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Badge,
  Menu,
  Form,
  Spin,
} from "antd";
import {
  EyeOutlined,
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
// import NumberFormat from "react-number-format";
// import { useHistory } from "react-router-dom";
// import utils from "utils";
import { Modal } from "antd";
import moment from "moment/moment";
import { AddCircleOutlineOutlined, Block } from "@mui/icons-material";
import Swal from "sweetalert2";
import { antdTableSorter, EllipsisDropdown, Flex } from "../Utils/Index";
import axios from "axios";
// import axios from "axios";
const { confirm } = Modal;
const { Option } = Select;

const { RangePicker } = DatePicker;

function Staff() {
  const [open, setOpen] = useState(true);
  // const [selectedRowKeys, setSelectedRowKeys] = useState();
  // const [selectedRows, setSelectedRows] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [row, setRow] = useState(null);
  const [data, setData] = useState([]);
  // const [form] = Form.useForm();

  const [load, setLoad] = useState(false);

  function showConfirm(row) {
    console.log(row);
    Swal.fire({
      title: `Do you want to Block ${row.name}`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(`${row.name} has been blocked`, "", "success");
      }
    });
  }

  const dropdownMenu = (row) => (
    <Menu className="selectElement">
      <Menu.Item
        onClick={() => {
          setOpen1(true);
          setRow((prev) => (prev = row));
        }}
      >
        <Flex alignItems="center">
          <EyeOutlined style={{ fontSize: "15px" }} />
          <span className="mx-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item
        style={{
          color: "#cf1322",
          background: "#fff1f0",
          borderColor: "#ffa39e",
        }}
        onClick={() => {
          showConfirm(row);
          setRow(row);
        }}
      >
        <Flex alignItems="center">
          <Block style={{ fontSize: "15px" }} />
          <span className="mx-2">Block</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      onFilter: (value, record) => console.log(value, record),
      sorter: (a, b) => antdTableSorter(a, b, "name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      // sorter: (a, b) => antdTableSorter(a, b, "cardNum"),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      sorter: (a, b) => antdTableSorter(a, b, "city"),
    },
    {
      title: "Joining Date",
      dataIndex: "jdate",
      key: "jdate",
      sorter: (a, b) => antdTableSorter(a, b, "jdate"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "Active") {
          return <Tag color="success">Active</Tag>;
        } else {
          return <Tag color="red">Blocked</Tag>;
        }
      },
      // sorter: (a, b) => antdTableSorter(a, b, "jdate"),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/staff/details").then((res) => {
      console.log(res);
      setData(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div>
      <div className="h-100">
        {/* <GoogleMap /> */}
        <Sidebar setClose={setOpen} />
        <div
          className="content-bg"
          style={open ? { margin: "65px 0 0 240px" } : { margin: "65px 0 0 0" }}
        >
          <div className="px-5">
            <span className="page-title">Staff</span>
            <Card className="selectElement">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 5,
                }}
                className="search-card"
              >
                <div>
                  <label htmlFor=" " className="font16">
                    Name
                  </label>

                  <Input
                    className="my-2 p-2 selectElement"
                    placeholder="Search staff member by name"
                    name="empId"
                    prefix={<SearchOutlined />}
                  />
                </div>
                <div>
                  <label htmlFor="" className="font16">
                    Email
                  </label>
                  <Input
                    className="my-2 p-2 selectElement"
                    placeholder="Search staff member by email-id"
                    name="empName"
                    prefix={<SearchOutlined />}
                  />
                </div>
                <div>
                  <label htmlFor="" className="font16">
                    Date
                  </label>
                  <RangePicker
                    className="w-100 my-2 p-2 selectElement"
                  //   defaultValue={[
                  // moment("2015/01/01", dateFormat),
                  // moment("2015/01/01", dateFormat)
                  //   ]}
                  //   format={dateFormat}
                  />
                </div>

                <div>
                  <label htmlFor="" className="font16">
                    Designation
                  </label>
                  <Select
                    className="w-100 my-2 selectElement"
                    placeholder="Search staff member by city"
                    name="deptId"
                  >
                    <Option value="Active">Active</Option>;
                    <Option value="Blocked">Blocked</Option>;
                  </Select>
                </div>
                <div>
                  <label htmlFor="" className="font16">
                    City
                  </label>
                  <Select
                    className="w-100 my-2 selectElement"
                    placeholder="Search staff member by city"
                    name="deptId"
                  ></Select>
                </div>
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "2%",
                  marginTop: "30px",
                }}
              >
                {" "}
                <Button
                  type="primary"
                  size="large"
                  className="d-flex align-items-center "
                >
                  <ReloadOutlined />
                  Reset
                </Button>
                <Button
                  type="primary"
                  size="large"
                  className="d-flex align-items-center "
                >
                  <SearchOutlined />
                  Search
                </Button>
              </div>
            </Card>
            <br />
            <div
              style={{
                display: "flex",
                gap: "2%",
                marginBottom: 20,
              }}
            >
              <Button
                type="primary"
                size="large"
                className="d-flex align-items-center "
                onClick={() => setOpenAdd(true)}
              >
                <AddCircleOutlineOutlined />
                Add Staff member
              </Button>
              <Button
                type="primary"
                size="large"
                className="d-flex align-items-center "
              // onClick={() => {
              //   // exportTableData(list);
              //   const excel = new Excel();
              //   excel
              //     .addSheet("test")
              //     .addColumns([
              //       { title: "Driver Name", dataIndex: "name" },
              //       { title: "Driver ID", dataIndex: "uuid" },
              //       { title: "Staff Pass ID", dataIndex: "cardNo" },
              //       { title: "Department", dataIndex: "deptName" },
              //     ])
              //     .addDataSource(exportTableData(list))
              //     .saveAs("Drivers.xlsx");
              // }}
              >
                <DownloadOutlined />
                Export
              </Button>
            </div>
          </div>
          {/* {load === true && (
        <Spin
          tip="Loading..."
          style={{
            justifyContent: "center",
            display: "flex",
            padding: "20px 0px",
          }}
        ></Spin>
      )} */}
          <Card className="selectElement mx-5">
            <Flex
              alignItems="center"
              justifyContent="between"
              mobileFlex={false}
            >
              <Flex className="mb-1" mobileFlex={false}></Flex>
            </Flex>

            <div className="table-responsive ">
              <Table
                columns={tableColumns}
                dataSource={data}
                rowKey="id"
              />
            </div>
          </Card>
          <Modal
            title="Add Employee"
            open={openAdd}
            // onSubmit={() => setOpen(false)}
            onCancel={() => {
              setOpenAdd(false);
            }}
            footer={[
              <Button key="back">Add</Button>,
              <Button
                key="submit"
                type="primary"
                onClick={() => setOpenAdd(false)}
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
          <Modal
            title="Staff member Details"
            open={open1}
            onCancel={() => setOpen1(false)}
            footer={null}
            width={1000}
          >
            {row !== "" && (
              <Card>
                <Form.Item name="name" label="Name">
                  {row?.name}
                </Form.Item>
                <Form.Item name="email" label="Email ID ">
                  {row?.email}
                </Form.Item>
                <Form.Item name="address" label="Address">
                  {row?.address}
                </Form.Item>
                <Form.Item name="city" label="City">
                  {row?.city}
                </Form.Item>
                <Form.Item name="jdate" label="Joining Date">
                  {row?.jdate}
                </Form.Item>
              </Card>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Staff;
