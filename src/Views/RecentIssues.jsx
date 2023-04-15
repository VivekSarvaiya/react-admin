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
  PlusCircleOutlined,
  ReloadOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";
// import NumberFormat from "react-number-format";
// import { useHistory } from "react-router-dom";
// import utils from "utils";
import { Modal } from "antd";
// import axios from "axios";
import { antdTableSorter, EllipsisDropdown, Flex } from "../Utils/Index";
import axios from "axios";
import moment from "moment";
const { confirm } = Modal;
const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

function RecentIssues(props) {
  // const [list, setList] = useState();
  const [data, setData] = useState([]);
  const [row, setRow] = useState(null);
  const [open, setOpen] = useState(false);

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
    <Menu>
      <Menu.Item
        onClick={() => {
          setOpen(true);
          setRow((prev) => (prev = row));
        }}
      >
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          // setOpenEdit(true);
          setRow((prev) => (prev = row));
        }}
      >
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Edit Details</span>
        </Flex>
      </Menu.Item>
      {/* onClick={() => deleteRow(row)}  */}
      <Menu.Item onClick={() => showConfirm(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {/* {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : "Delete"} */}
            Delete
          </span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const tableColumns = [
    {
      title: "Posted By",
      dataIndex: "username",
      key: "username",
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
      title: "Landmark",
      dataIndex: "landmark",
      key: "landmark",
      sorter: (a, b) => antdTableSorter(a, b, "landmark"),
    },
    {
      title: "Posted On",
      dataIndex: "issue_created_time",
      key: "issue_created_time",
      sorter: (a, b) => antdTableSorter(a, b, "issue_created_time"),
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

  const rowSelection = {
    //   onChange: (key, rows) => {
    //     setSelectedRows(rows);
    //     setSelectedRowKeys(key);
    //   },
  };

  const getIssues = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/issue/AllIssuesGet/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // getIssues();
  }, []);

  return (
    <>
      <div className="">
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
                // onChange={(e) => console.log(moment().date(e[0].$d))}
                // value={}
                //   defaultValue={[
                // moment("2015/01/01", dateFormat),
                // moment("2015/01/01", dateFormat)
                //   ]}
                //   format={dateFormat}
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
      <Card className="selectElement">
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false}></Flex>
        </Flex>

        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={data}
            rowKey="id"
            // rowSelection={{
            //   // selectedRowKeys: selectedRowKeys,
            //   type: "checkbox",
            //   preserveSelectedRowKeys: false,
            //   ...rowSelection,
            // }}
          />
        </div>
      </Card>

      <Modal
        title="Employee Details"
        // visible={open}
        // onCancel={() => setOpen(false)}
        footer={null}
        width={1000}
      >
        {row !== "" && (
          <Card>
            <Form.Item name="name" label="Community ID">
              {row?.communityId}
            </Form.Item>
            <Form.Item name="name" label="Department ID ">
              {row?.deptId}
            </Form.Item>
            <Form.Item name="name" label="Department UUID ">
              {row?.uuid}
            </Form.Item>
            <Form.Item name="name" label="Employee Name">
              {row?.name}
            </Form.Item>
            <Form.Item name="name" label="Card Number">
              {row?.cardNo}
            </Form.Item>
            <Form.Item name="name" label="Job ">
              {row?.job}
            </Form.Item>
            <Form.Item name="name" label="Gender">
              {row?.gender === 1
                ? "Female"
                : row?.gender === 0
                ? "Male"
                : row?.gender === -1
                ? "Unknown"
                : ""}
            </Form.Item>
            <Form.Item name="name" label="Phone Number">
              {row?.phone ? row?.phone : ""}
            </Form.Item>
          </Card>
        )}
      </Modal>
    </>
  );
}

export default RecentIssues;
