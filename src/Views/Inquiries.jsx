import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tag, message } from "antd";
import { Card, Table, Input, Button, Form, Spin } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import Swal from "sweetalert2";
import { antdTableSorter, Flex } from "../Utils/Index";
import axios from "axios";
import { Avatar } from "@mui/material";

function Inquiries(props) {
  const [data, setData] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [row, setRow] = useState(null);
  const [searchusername, setSearchusername] = useState("");
  const [searchArea, setSearchArea] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchphone_no, setSearchphone_no] = useState("");
  const [load, setLoad] = useState(false);

  const tableColumns = [
    {
      title: "User Id",
      dataIndex: "user",
      key: "user",
      // wuserth: 110,
      sorter: (a, b) => antdTableSorter(a, b, "user"),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => antdTableSorter(a, b, "username"),
    },
    {
      title: "Message",
      dataIndex: "details",
      key: "details",
      ellipsis: true,
      // sorter: (a, b) => antdTableSorter(a, b, "username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => antdTableSorter(a, b, "email"),
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
        return area?.area_name;
      },
      // sorter: (a, b) => antdTableSorter(a, b, "area"),
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, elm) => (
        <Button
          type="link"
          className="p-0"
          onClick={() => {
            setOpen1(true);
            setRow(elm);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const fetchData = (api) => {
    setLoad(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/contact/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      })
      .then((res) => {
        console.log(res);
        setData(res.data?.results);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong while fetching data !");
        setLoad(false);
      });
  };

  // const search = () => {
  //   let api = `${process.env.REACT_APP_BASE_URL}/api/UserContactsGet?search=${searchusername}${searchEmail}${searchArea}${searchphone_no}`;
  //   fetchData(api);
  // };

  // const resetSearch = () => {
  //   setSearchusername("");
  //   setSearchArea("");
  //   setSearchEmail("");
  //   setSearchphone_no("");
  //   fetchData(`${process.env.REACT_APP_BASE_URL}/api/UserAllDetails`);
  // };

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_BASE_URL}/api/UserAllDetails`);
  }, []);

  return (
    <>
      <div
        style={{
          margin: "24px 16px",
          padding: 24,
        }}
      >
        {/* <div className="" >
          <Card className="selectElement">
            <div className="search-card">
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
                  Email
                </label>
                <Input
                  className="my-2 p-2 selectElement"
                  placeholder="Search user by email"
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
                  placeholder="Search user by email"
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
                  placeholder="Search user by area name"
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
        </div> */}
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
        <Card className="selectElement ">
          <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
            <Flex className="mb-1" mobileFlex={false}></Flex>
          </Flex>

          <div className="table-responsive ">
            <Table columns={tableColumns} dataSource={data} rowKey="id" />
          </div>
        </Card>
      </div>

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
                background: "linear-gradient(90deg,  #3c56bd 0%, #5a78ef 100%)",
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

export default Inquiries;
