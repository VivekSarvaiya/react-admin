import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pagination, Tag, message } from "antd";
import { DatePicker } from "antd";
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
import { Avatar } from "@mui/material";
import { Modal } from "antd";
import moment from "moment/moment";
import { AddCircleOutlineOutlined, Block } from "@mui/icons-material";
import Swal from "sweetalert2";
import { antdTableSorter, Flex } from "../Utils/Index";
import axios from "axios";
import { Excel } from "antd-table-saveas-excel";
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
  const [load, setLoad] = useState(false);
  const [department, setDepartment] = useState([]);
  const [areas, setAreas] = useState([]);
  const [staff_department, setstaff_department] = useState();
  const [area, setArea] = useState();
  const [addData, setAddData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    phone_no: "",
    aadhar_no: "",
    is_staff_verified: false,
  });
  const [searchusername, setSearchusername] = useState("");
  const [searchArea, setSearchArea] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchphone_no, setSearchphone_no] = useState("");
  const [Date_of_birth, setDate_of_birth] = useState();
  const [searchStatus, setSearchStatus] = useState("");
  const [count, setCount] = useState(0)

  const changehandler = (event) => {
    const { name, value } = event.target;
    setAddData({ ...addData, [name]: value || event });
  };

  const tableColumns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      onFilter: (value, record) => console.log(value, record),
      sorter: (a, b) => antdTableSorter(a, b, "username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department",
      dataIndex: "staff_department",
      key: "staff_department",
      render: (staff_department) => {
        return staff_department?.department_name;
      },
      // sorter: (a, b) => antdTableSorter(a, b, "staff_department"),
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      render: (area) => {
        return area?.area_name;
      },
      // sorter: (a, b) => antdTableSorter(a, b, "area"),
    },
    {
      title: "Joining Date",
      dataIndex: "date_joined",
      key: "date_joined",
      render: (date_joined) => {
        return moment(date_joined).format("Do MMMM YYYY");
      },
      sorter: (a, b) => antdTableSorter(a, b, "date_joined"),
    },
    {
      title: "Status",
      dataIndex: "staff_work_status",
      key: "staff_work_status",
      render: (status) => {
        if (status === "F") {
          return <Tag color="success">Available</Tag>;
        } else if (status === "W") {
          return <Tag color="red">Angaged</Tag>;
        }
      },
      // sorter: (a, b) => antdTableSorter(a, b, "jdate"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, elm) => (
        <Button type="link" className="p-0" onClick={() => {
          setOpen1(true);
          setRow(elm);
        }}>
          View
        </Button>
      ),
    },
  ];

  const search = () => {
    let api = `${process.env.REACT_APP_BASE_URL}/api/StaffAllDetails/?search=${searchusername}${searchEmail}${searchArea}${searchphone_no}`;
    fetchData(api);
  };

  const resetSearch = () => {
    setSearchusername("");
    setSearchArea("");
    setSearchEmail("");
    setSearchphone_no("");
    setSearchStatus();
    fetchData(`${process.env.REACT_APP_BASE_URL}/api/StaffAllDetails`);
  };

  const fetchAreaDetails = async () => {
    await axios
      .get(
        `http://127.0.0.1:8000/api/details/areaDetail/${localStorage.getItem(
          "CITY_ID"
        )}`
      )
      .then((res) => {
        console.log(res);
        setAreas(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchDepartmentDetails = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/details/departmentDetail/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res, "department");
        setDepartment(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchData = (api) => {
    setLoad(true);
    axios
      .get(api, {
        headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      })
      .then((res) => {
        console.log(res);
        count === 0 && setCount(res.data.count)
        setData(res.data.results);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
        message.error("Something went wrong while fetching data !");
      });
  };
  const handlePagination = (page) => {
    setLoad(true);
    // console.log(api);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/StaffAllDetails/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.results)
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong while fetching data !");
        setLoad(false);
      });
  };

  const submitStaffDetails = (event) => {
    setLoad(true)
    setOpenAdd(false)
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/StaffCreate/`,
        {
          ...addData,
          staff_department,
          area,
          Date_of_birth: moment(Date_of_birth).format("YYYY-MM-DD"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        message.success(res.data.success);
        setOpenAdd(false);
        fetchData(`${process.env.REACT_APP_BASE_URL}/api/StaffAllDetails`);
        setLoad(false)
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong while creating new staff !");
        setLoad(false)
      });
  };

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_BASE_URL}/api/StaffAllDetails`);
    fetchDepartmentDetails();
    fetchAreaDetails();
  }, []);

  const exportTableData = (users) => {
    let arr = [];
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
  return (
    <>
      <div
        style={{
          margin: "24px 16px",
          padding: 24,
        }}
      >
        <div className="">
          <Card className="selectElement">
            <div className="search-card">
              <div>
                <label htmlFor=" " className="font16">
                  Username
                </label>

                <Input
                  className="my-2 p-2 selectElement"
                  placeholder="Search by username"
                  name="username"
                  value={searchusername}
                  onChange={(e) => setSearchusername(e.target.value)}
                  prefix={<SearchOutlined />}
                />
              </div>
              <div>
                <label htmlFor="" className="font16">
                  Email
                </label>
                <Input
                  className="my-2 p-2 selectElement"
                  placeholder="Search by email"
                  name="email"
                  onChange={(e) => setSearchEmail(e.target.value)}
                  value={searchEmail}
                  prefix={<SearchOutlined />}
                />
              </div>
              <div>
                <label htmlFor="" className="font16">
                  Phone Number
                </label>
                <Input
                  className="my-2 p-2 selectElement"
                  placeholder="Search by email"
                  name="phono"
                  onChange={(e) => setSearchphone_no(e.target.value)}
                  value={searchphone_no}
                  prefix={<SearchOutlined />}
                />
              </div>
              <div>
                <label htmlFor="" className="font16">
                  Area
                </label>
                <Input
                  className="my-2 p-2 selectElement"
                  placeholder="Search by area"
                  name="area"
                  onChange={(e) => setSearchArea(e.target.value)}
                  value={searchArea}
                  prefix={<SearchOutlined />}
                />
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
                onClick={resetSearch}
                className="d-flex align-items-center"
              >
                <ReloadOutlined /> Reset
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={search}
                className="d-flex align-items-center"
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
                  .saveAs("Staff.xlsx");
              }}
            >
              <DownloadOutlined />
              Export
            </Button>
          </div>
        </div>
        {load && (
          <Spin
            tip="Loading..."
            style={{
              justifyContent: "center",
              display: "flex",
              padding: "20px 0px",
            }}
          ></Spin>
        )}
        <Card className="selectElement">
          <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
            <Flex className="mb-1" mobileFlex={false}></Flex>
          </Flex>
          <div className="table-responsive">
            <Table columns={tableColumns} dataSource={data} rowKey="id" pagination={false} />
            <Pagination className="my-4" defaultCurrent={1} total={count} onChange={handlePagination} style={{ float: "right" }} />
          </div>
        </Card>
      </div>
      <Modal
        title="Add New Staff Member"
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        maskClosable={false}
        footer={[
          <Button onClick={() => submitStaffDetails(true)}>Add</Button>,
          <Button key="submit" type="primary" onClick={() => setOpenAdd(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Card>
          <Form>
            <Form.Item name="first_name" label="First Name" required>
              <Input
                onChange={changehandler}
                name="first_name"
                value={addData.first_name}
                className="selectElement"
              />
            </Form.Item>
            <Form.Item name="last_name" label="Last Name" required>
              <Input
                onChange={changehandler}
                value={addData.last_name}
                name="last_name"
                className="selectElement"
              />
            </Form.Item>
            <Form.Item name="username" label="Username">
              <Input
                onChange={changehandler}
                value={addData.username}
                name="username"
                className="selectElement"
              />
            </Form.Item>
            <Form.Item name="email" label="Email ID">
              <Input
                type="email"
                onChange={changehandler}
                value={addData.email}
                name="email"
                className="selectElement"
              />
            </Form.Item>
            <Form.Item name="Date_of_birth" label="Date of Birth">
              <DatePicker
                format="YYYY/MM/DD"
                onChange={(e) => setDate_of_birth(e)}
                value={addData.Date_of_birth}
                name="Date_of_birth"
                className="selectElement"
              />
            </Form.Item>
            <Form.Item name="staff_department" label="Staff working department">
              <Select
                className="w-100 mar10 selectElement"
                placeholder="Select department"
                onChange={(e) => setstaff_department(e)}
                // value={department}
                name="staff_department"
              >
                {department.map((elem) => (
                  <Option key={elem.id} value={elem.id}>
                    {elem.department_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="area" label="Staff Working area">
              {/* <Input
                onChange={changehandler}
                value={addData.area}
                name="area"
                className="selectElement"
              /> */}
              <Select
                className="w-100 mar10 selectElement"
                placeholder="Select department"
                onChange={(e) => setArea(e)}
                value={area}
                name="area"
              >
                {areas.map((elem) => (
                  <Option key={elem.id} value={elem.id}>
                    {elem.area_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="phone_no" label="Phone Number">
              <Input
                type="number"
                onChange={changehandler}
                value={addData.phone_no}
                name="phone_no"
                className="selectElement"
              />
            </Form.Item>
            <Form.Item name="aadhar_no" label="Addhar Card Number">
              <Input
                type="number"
                onChange={changehandler}
                value={addData.aadhar_no}
                name="aadhar_no"
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
            <Form>
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
            </Form>
          </Card>
        )}
      </Modal>
    </>
  );
}
export default Staff;
