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
          <span className="mx-2">Block User</span>
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
        if (status === "active") {
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

  const search = () => {};

  useEffect(() => {
    setLoad(true);
    const fetchData = () => {
      axios
        .get("http://localhost:8000/api/v1/users")
        .then((res) => {
          console.log(res);
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoad(true);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  return (
    <div>
      <div className="h-100">
        <Sidebar setClose={setOpen} />
        <div
          className="content-bg"
          style={open ? { margin: "65px 0 0 240px" } : { margin: "65px 0 0 0" }}
        >
          <div className="px-5">
            {/* <span className="page-title">Users</span> */}
            {/* <Card className="selectElement">
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
                    placeholder="Search user by name"
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
                    placeholder="Search user by email-id"
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
                  onClick={search}
                >
                  <SearchOutlined />
                  Search
                </Button>
              </div>
            </Card> */}
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

export default Users;
