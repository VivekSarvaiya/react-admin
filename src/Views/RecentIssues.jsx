import React, { useState } from "react";
import { Box } from "@mui/system";
import Sidebar from "../Components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
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
const { confirm } = Modal;
const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

function RecentIssues(props) {
  const [open, setOpen] = useState(true);
  const [list, setList] = useState();

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
      // onClick={() => {
      // setOpen1(true);
      // setRow((prev) => (prev = row));
      // }}
      >
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item
      // onClick={() => {
      //   setOpenEdit(true);
      //   setRow((prev) => (prev = row));
      // }}
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
      title: "Name",
      dataIndex: ["name", "updateTime"],
      onFilter: (value, record) => console.log(value, record),
      sorter: (a, b) => antdTableSorter(a, b, "name"),
    },
    {
      title: "Email",
      dataIndex: "uuid",

      render: (uuid, elm) => {
        console.log(uuid, "driver");

        return <span>{uuid !== "" ? uuid : "No Driver ID"}</span>;
      },
    },
    {
      title: "Address",
      dataIndex: ["cardNo", "createTime"],

      sorter: (a, b) => antdTableSorter(a, b, "cardNum"),
    },
    {
      title: "City",
      dataIndex: "deptName",

      sorter: (a, b) => antdTableSorter(a, b, "department"),
    },
    {
      title: "Joining Date",
      dataIndex: "deptName",
      sorter: (a, b) => antdTableSorter(a, b, "department"),
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
  // Store the current URL in the history state
  window.history.replaceState(
    { url: window.location.href },
    "",
    window.location.href
  );

  // Get the previous URL from the history state
  var previousUrl = window.history.state.url;

  // Output the previous URL
  console.log(previousUrl);
  const rowSelection = {
    // onChange: (key, rows) => {
    //   setSelectedRows(rows);
    //   setSelectedRowKeys(key);
    // },
  };

  return (
    <>
      <div className="">
        <Card className="selectElement">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              //   gap: "2",
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
          {/* <Button
                type="primary"
                className="d-flex align-items-center "
                size="large"
              >
                <PlusCircleOutlined />
                Add Employee
              </Button> */}

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

          <Modal
            title="Add Employee"
            // visible={open}
            // onSubmit={() => setOpen(false)}
            onCancel={() => {
              // formRef.current.resetFields();
              // setOpen(false);
              // setOpenAdd(true);
              // console.log("notjkjkjk");
            }}
            footer={[
              <Button
                key="back"
                onClick={() => {
                  // setOpen(false);
                  // formRef.current.resetFields();
                }}
              >
                Cancel
              </Button>,
              <Form.Item>
                <Button
                  key="submit"
                  htmlType="submit"
                  type="primary"
                  //   onClick={onSubmitAdd}
                >
                  Add
                </Button>
              </Form.Item>,
            ]}
            width={1000}
          >
            <Card>
              <Form name="login-form">
                {/* <Input onChange={(e) => handleChangeADD(e)} name="deptId" /> */}
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
                    className="w-100 my-2 p-2 selectElement"
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
                    className="w-100 my-2 p-2 selectElement"
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

                {/* <Form.Item name="deptUuid" label="Department UUID ">
                  <Input onChange={(e) => handleChangeADD(e)} name="deptUuid" />
                </Form.Item> */}
              </Form>
            </Card>
          </Modal>

          <Modal
            title="Edit Driver Details"
            // visible={openEdit}
            // onCancel={() => setOpenEdit(false)}
            footer={[
              <Button
                key="back"
                // onClick={() => {
                //   setOpenEdit(false);
                // }}
              >
                Cancel
              </Button>,
              <Button key="submit" type="primary">
                Save
              </Button>,
            ]}
            width={1000}
          >
            <Card>
              <Form
              // fields={[
              //   {
              //     name: ["name"],
              //     value: editDriverName,
              //   },
              //   {
              //     name: ["driverId"],
              //     value: editDriverId,
              //   },
              //   {
              //     name: ["cardNos"],
              //     value: editStaffId,
              //   },
              //   {
              //     name: ["deptId"],
              //     value: editDeptId,
              //   },
              // ]}
              >
                <Form.Item name="driverId" label="Driver ID">
                  <Input
                    name="driverId"
                    // onChange={(e) => setEditDriverId(e.target.value)}
                  />
                </Form.Item>
                <Form.Item name="name" label="Employee Name" required>
                  <Input
                    // onChange={(e) => handleChangeEdit(e)}
                    name="name"
                    className="selectElement"
                  />
                </Form.Item>
                <Form.Item name="cardNos" label="Staff Pass ID" required>
                  <Input
                    // onChange={(e) => handleChangeEditCardNo(e)}
                    name="cardNos"
                    className="selectElement"
                  />
                </Form.Item>
                <Form.Item name="deptId" label="Department Name ">
                  <Select
                    disabled
                    className="w-100 my-2 p-2 selectElement"
                    placeholder="Select department Name"
                    // onChange={(value) => setEditDeptId(value)}
                    name="deptId"
                  >
                    {/* {departId !== "" &&
                      departId.map((data) => (
                        <Option value={data.id}>{data.name}</Option>
                      ))} */}
                  </Select>
                </Form.Item>
              </Form>
            </Card>
          </Modal>
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
            dataSource={list}
            rowKey="id"
            rowSelection={{
              // selectedRowKeys: selectedRowKeys,
              type: "checkbox",
              preserveSelectedRowKeys: false,
              ...rowSelection,
            }}
          />
          {/* //#c1dbe7#def4ff */}
          {/* #cbdaf5 */}
        </div>
      </Card>

      <Modal
        title="Employee Details"
        // visible={open1}
        // onCancel={() => setOpen1(false)}
        footer={null}
        width={1000}
      >
        {/* {row !== "" && (
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
        )} */}
      </Modal>
    </>
  );
}

export default RecentIssues;
