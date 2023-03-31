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
import { Block } from "@mui/icons-material";
import Swal from "sweetalert2";
import { antdTableSorter, EllipsisDropdown, Flex } from "../Utils/Index";
import axios from "axios";
import { Avatar } from "@mui/material";
import { Excel } from "antd-table-saveas-excel";
const { confirm } = Modal;
const { Option } = Select;

const { RangePicker } = DatePicker;

function Users(props) {
  const [open, setOpen] = useState(true);
  // const [selectedRowKeys, setSelectedRowKeys] = useState();
  // const [selectedRows, setSelectedRows] = useState();
  const [data, setData] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [row, setRow] = useState(null);
  const [searchusername, setSearchusername] = useState();
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
  console.log(searchusername);
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
          <span className="mx-2">Block User</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const tableColumns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      onFilter: (value, record) => console.log(value, record),
      sorter: (a, b) => antdTableSorter(a, b, "name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_no",
      key: "phone_no",
      // sorter: (a, b) => antdTableSorter(a, b, "cardNum"),
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      render: (area) => {
        return area.area_name;
      },
      sorter: (a, b) => antdTableSorter(a, b, "area"),
    },
    {
      title: "Date of Birth",
      dataIndex: "Date_of_birth",
      key: "Date_of_birth",
      sorter: (a, b) => antdTableSorter(a, b, "jdate"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        // if (status === "active") {
        return <Tag color="success">Active</Tag>;
        // } else {
        //   return <Tag color="red">Blocked</Tag>;
        // }
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

  const fetchData = (api) => {
    axios
      .get(api,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
        }
      )
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoad(true);
  };

  const exportTableData = (users) => {
    let arr = [];
    // console.log(users);
    users.map((item) => {
      arr.push({
        username: item.username,
        email: item.email,
        first_name: item.first_name,
        last_name: item.last_name,
        state_name: item.state.state_name,
        city_name: item.city.city_name,
        Date_of_birth: item.Date_of_birth,
        aadhar_no: item.aadhar_no,
        phone_no: item.phone_no,
      });
    });
    return arr.flatMap((item) => item);
  };

  const search = () => {
    let api = searchusername ? `http://localhost:8000/api/UserAllDetails/${localStorage.getItem("USERID")}/?username=${searchusername}` : `http://localhost:8000/api/UserAllDetails/${localStorage.getItem("USERID")}`
    fetchData(api)
  }

  const resetSearch = () => {
    setSearchusername("")
  }

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <div className="h-100">
        <Sidebar setClose={setOpen} />
        <div
          className="content-bg"
          style={open ? { margin: "65px 0 0 240px" } : { margin: "65px 0 0 0" }}
        >
          <div className="px-5 py-3">
            <Card className="selectElement">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 5,
                }}
                className="search-card"
              >
                <div>
                  <label htmlFor=" " className="font16">
                    Username
                  </label>

                  <Input
                    className="my-2 p-2 selectElement"
                    placeholder="Search user by username"
                    name="username"
                    value={searchusername}
                    onChange={(e) => setSearchusername(e.target.value)}
                    prefix={<SearchOutlined />}
                  />
                </div>
                <div>
                  <label htmlFor="" className="font16">
                    Area
                  </label>
                  <Input
                    className="my-2 p-2 selectElement"
                    placeholder="Search user by area name"
                    name="empName"
                    prefix={<SearchOutlined />}
                  />
                </div>
                {/* <div>
                  <label htmlFor="" className="font16">
                    Date
                  </label>
                  <RangePicker
                    className="w-100 my-2 p-2 selectElement"
                  
                  />
                </div>

                <div>
                  <label htmlFor="" className="font16">
                    Status
                  </label>
                  <Select
                    className="w-100 my-2 selectElement"
                    placeholder="Search user by city"
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
                    placeholder="Search user by city"
                    name="deptId"
                  ></Select>
                </div> */}
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
                  className="d-flex align-items-center"
                  onClick={resetSearch}
                >
                  <ReloadOutlined />
                  Reset
                </Button>
                <Button
                  type="primary"
                  size="large"
                  className="d-flex align-items-center "
                  onClick={search}
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
                onClick={() => {
                  // exportTableData(list);
                  const excel = new Excel();
                  excel
                    .addSheet("MMC")
                    .addColumns([
                      { title: "Username", dataIndex: "username" },
                      { title: "Email ID", dataIndex: "email" },
                      { title: "Firstname", dataIndex: "first_name" },
                      { title: "Lastname", dataIndex: "last_name" },
                      { title: "State", dataIndex: "state_name" },
                      { title: "City", dataIndex: "city_name" },
                      { title: "Date Of Birth", dataIndex: "Date_of_birth" },
                      { title: "Aadhar Card Number", dataIndex: "aadhar_no" },
                      { title: "Phone Number", dataIndex: "phone_no" },
                    ])
                    .addDataSource(exportTableData(data))
                    .saveAs("Users.xlsx");
                }}
              >
                <DownloadOutlined />
                Export
              </Button>
            </div>
          </div>
          {!load && (
            <Spin
              tip="Loading..."
              style={{
                justifyContent: "center",
                display: "flex",
                padding: "20px 0px",
              }}
            ></Spin>
          )}
          <Card className="selectElement mx-5">
            <Flex
              alignItems="center"
              justifyContent="between"
              mobileFlex={false}
            >
              <Flex className="mb-1" mobileFlex={false}></Flex>
            </Flex>

            <div className="table-responsive ">
              <Table columns={tableColumns} dataSource={data} rowKey="id" />
            </div>
          </Card>

          <Modal
            title="User Details"
            open={open1}
            onCancel={() => setOpen1(false)}
            footer={null}
          // width={1000}
          >
            {row !== "" && (
              <Card>
                <Avatar
                  sx={{
                    m: 1,
                    width: "8rem",
                    height: "8rem",
                    background:
                      "linear-gradient(90deg,  #3c56bd 0%, #5a78ef 100%)",
                  }}
                  src={row?.image}
                />
                <Form.Item name="name" label="Username">
                  {row?.username}
                </Form.Item>
                <Form.Item name="email" label="Email ID ">
                  {row?.email}
                </Form.Item>
                <Form.Item name="name" label="Firstname">
                  {row?.first_name}
                </Form.Item>
                <Form.Item name="name" label="Lastname">
                  {row?.last_name}
                </Form.Item>
                <Form.Item name="address" label="State">
                  {row?.state?.state_name}
                </Form.Item>
                <Form.Item name="city" label="City">
                  {row?.city?.city_name}
                </Form.Item>
                <Form.Item name="jdate" label="Date Of Birth">
                  {row?.Date_of_birth}
                </Form.Item>
                <Form.Item name="jdate" label="Aadhar Card Number">
                  {row?.aadhar_no}
                </Form.Item>
                <Form.Item name="jdate" label="Phone Number">
                  {row?.phone_no}
                </Form.Item>
              </Card>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Users;
