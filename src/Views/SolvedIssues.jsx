import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Sidebar from "../Components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { DatePicker, Tag } from "antd";
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Badge,
  Menu,
  Form,
  message,
  Alert,
  Spin,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { antdTableSorter, EllipsisDropdown, Flex } from "../Utils/Index";
import axios from "axios";
import moment from "moment";
const { confirm } = Modal;
const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

function SolvedIssues(props) {
  const [data, setData] = useState([]);
  const [row, setRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false)
  const [staffList, setStaffList] = useState([])
  const [selectedStaff, setSelectedStaff] = useState()

  function showConfirm(row) {
    // confirm({
    //   title:
    //     row.length > 0
    //       ? `Do you want to delete these  ${selectedRows.length} employees?`
    //       : row.id
    //       ? `Do you want to delete this employee?`
    //       : `Please first select any employee!`,
    //   async onOk() {
    //     try {
    //     } catch (e) {
    //       return console.log("Oops errors!");
    //     }
    //   },
    //   onCancel() {},
    // });
  }
  const dropdownMenu = (row) => (
    <Menu className="selectElement">
      <Menu.Item
        onClick={() => {
          setOpen(true);
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
          setRow(row);
        }}
      >
        <Flex alignItems="center">
          <DeleteOutlined style={{ fontSize: "15px" }} />
          <span className="mx-2">Reject Issue</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const tableColumns = [
    {
      title: "Posted By",
      dataIndex: "user",
      key: "user",
      render: (user) => {
        return user?.username;
      },
      onFilter: (value, record) => console.log(value, record),
      sorter: (a, b) => antdTableSorter(a, b, "name"),
    },
    {
      title: "Title",
      dataIndex: "issue_title",
      key: "issue_title",
      // sorter: (a, b) => antdTableSorter(a, b, "cardNum"),
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      render: (area) => {
        return area?.area_name;
      },
      sorter: (a, b) => antdTableSorter(a, b, "area"),
    },
    {
      title: "Type",
      dataIndex: "issue_type",
      key: "issue_type",
      render: (issue_type) => {
        return issue_type?.Issue_Type_Name;
      },
      sorter: (a, b) => antdTableSorter(a, b, "type"),
    },
    {
      title: "Posted On",
      dataIndex: "issue_created_time",
      key: "issue_created_time",
      // sorter: (a, b) => antdTableSorter(a, b, "issue_created_time"),
    },
    {
      title: "Status",
      dataIndex: "issue_status",
      key: "issue_status",
      render: (status) => {
        if (status === "R") {
          return <Tag color="success">Recieved</Tag>;
        } else if (status === "A") {
          return <Tag color="yellow">Assigned</Tag>;
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

  const getIssues = () => {
    setLoad(true)
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/issue/AllIssuesGet/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data?.results);
        setLoad(false)
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong while fetching data !")
        setLoad(false)
      });
  };

  const getStaffList = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/StaffList/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data[Object.keys(res.data)[0]]);
        setStaffList(res.data[Object.keys(res.data)[0]]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const assignIssue = (id) => {
    axios
      .patch(`${process.env.REACT_APP_BASE_URL}/api/issue/IssueAssignToStaff/${id}`, { staff: selectedStaff }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res);
        message.success("Issue assigned successfully")
        setOpen(false)
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong")
      });
  }
  useEffect(() => {
    getIssues();
  }, []);

  return (
    <>
      <div style={{
        margin: "24px 16px",
        padding: 24,
      }}>
        <div className="" >
          <Card className="selectElement">
            <div className="search-card">
              <div>
                <label htmlFor=" " className="font16">
                  Name
                </label>

                <Input
                  className="my-2 p-2 selectElement"
                  placeholder="Search user by name"
                  name="empId"
                  prefix={<SearchOutlined />}
                // onChange={(e) => onChangeFilter(e)}
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
                // onChange={(e) => onChangeFilter(e)}
                />
              </div>
              <div>
                <label htmlFor="" className="font16">
                  Date
                </label>
                <RangePicker
                  className="w-100 my-2 p-2 selectElement"
                />
              </div>

              <div>
                <label htmlFor="" className="font16">
                  City
                </label>
                <Select
                  className="w-100 my-2 selectElement"
                  placeholder="Search user by city"
                  // onChange={onChangeFilterDepartId}
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
              className="d-flex align-items-center "
              size="large"
            >
              <DeleteOutlined />
              Delete
            </Button>

            <Button
              type="primary"
              size="large"
              className="d-flex align-items-center"
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
        {load === true && (
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
            <Table
              columns={tableColumns}
              dataSource={data}
              rowKey="id"
            />
          </div>
        </Card>
      </div>

      <Modal
        title="Issue Details"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={1000}
      >
        {row !== "" && (
          <Card>
            <Form>
              <Form.Item className="mb-3" label="Title">
                {row?.issue_title || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Description">
                {row?.User_issue_description || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Type">
                {row?.issue_type?.Issue_Type_Name || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Created On">
                {moment(row?.issue_created_time).format('MMMM Do YYYY, h:mm:ss a') || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Area">
                {row?.area?.area_name || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Landmark">
                {row?.landmark || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Coordinates">
                {row?.latitude ? row.latitude + " , " + row.logitude : "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Site Images">
                {
                  row?.User_Issue_Images.length > 0 ?
                    row?.User_Issue_Images.map((elem) => (
                      <img src={elem.image} width="100%" alt="" key={elem.Issue} />
                    ))
                    :
                    "N/A"
                }
              </Form.Item>
              <Form.Item className="mb-3" label="Site Videos">
                {
                  row?.User_Issue_Videos.length > 0 ?
                    row?.User_Issue_Videos.map((elem) => (
                      <img src={elem.video} width="100%" alt="" key={elem.Issue} />
                    ))
                    :
                    "N/A"
                }
              </Form.Item>
              <Form.Item className="mb-3" label="No. of Votes">
                {row?.issue_votes}
              </Form.Item>
              <Form.Item className="mb-3 " label="Assign this issue to staff member">
                <div className="d-flex gap-5">
                  <Select
                    className="selectElement"
                    placeholder="Select Staff"
                    name="assig_to_staff"
                    onClick={() => getStaffList(row?.id)}
                    onChange={(e) => setSelectedStaff(e)}
                  >
                    {
                      staffList?.map((elem, i) => (
                        <Option key={i} value={elem.id}>{elem.username} {
                          elem.staff_work_status === "F" ? <Tag style={{ float: "right" }} color="green">Available</Tag> : <Tag color="volcano" style={{ float: "right" }}>Angaged</Tag>
                        }</Option>
                      ))
                    }
                  </Select>
                  <Button
                    type="primary"
                    size="large"
                    className="d-flex align-items-center"
                    onClick={() => assignIssue(row?.id)}
                  >
                    Assign
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        )}
      </Modal>
    </>
  );
}

export default SolvedIssues;
