import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DatePicker, Pagination, Tag } from "antd";
import { Card, Table, Select, Button, Form, message, Spin } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { antdTableSorter, Flex } from "../Utils/Index";
import axios from "axios";
import moment from "moment";
import { Carousel } from "antd";
import { Excel } from "antd-table-saveas-excel";
import { Avatar } from "@mui/material";
const { Option } = Select;
const { RangePicker } = DatePicker;

function RecentIssues(props) {
  const [data, setData] = useState([]);
  const [issueView, setIssueView] = useState(null);
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState();
  // const [allIssueTypse, setAllIssueTypes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [searchIssueType, setSearchIssueType] = useState("");
  const [searchDates, setSearchDates] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");
  const [assign, setAssign] = useState(false);
  const [openStaffModal, setOpenStaffModal] = useState(false);
  const [staffView, setStaffView] = useState({});
  const [openUserModal, setOpenUserModal] = useState(false);
  const [userView, setUserView] = useState({});
  const [openSolvedIssueView, setOpenSolvedIssue] = useState(false);
  const [count, setCount] = useState(0)

  const tableColumns = [
    {
      title: "Issue Id",
      dataIndex: "id",
      key: "id",
      // width: 110,
      sorter: (a, b) => antdTableSorter(a, b, "id"),
    },
    {
      title: "Posted By",
      dataIndex: "user",
      key: "user",
      fixed: "center",
      render: (name, elem) => {
        return (
          <Button
            type="link"
            className="p-0"
            onClick={() => getUsersDetails(elem?.user?.id)}
          >
            {name?.first_name + " " + name?.last_name}
          </Button>
        );
      },
      // sorter: (a, b) => antdTableSorter(a, b, "uname"),
    },
    {
      title: "Title",
      dataIndex: "issue_title",
      key: "issue_title",
      // ellipsis: true,
      // width: 200,
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      render: (area) => {
        return area?.area_name;
      },
    },
    {
      title: "Type",
      dataIndex: "issue_type",
      key: "issue_type",
      render: (issue_type) => {
        return issue_type?.Issue_Type_Name;
      },
    },
    {
      title: "Votes",
      dataIndex: "issue_votes",
      key: "issue_votes",
      // width: 90,
      render: (issue_votes) => {
        return issue_votes;
      },
      sorter: (a, b) => antdTableSorter(a, b, "issue_votes"),
    },
    {
      title: "Posted On",
      dataIndex: "issue_created_time",
      key: "issue_created_time",
      render: (issue_created_time) => {
        return moment(issue_created_time).format("Do MMMM YYYY");
      },
      sorter: (a, b) => antdTableSorter(a, b, "issue_created_time"),
    },
    {
      title: "Status",
      dataIndex: "issue_status",
      key: "issue_status",
      render: (status) => {
        if (status === "R") {
          return <Tag color="magenta">Recieved</Tag>;
        } else if (status === "A") {
          return <Tag color="yellow">Assigned</Tag>;
        } else if (status === "S") {
          return <Tag color="volcano">Ready for Review</Tag>;
        } else if (status === "VA") {
          return <Tag color="success">Verified</Tag>;
        } else if (status === "RJ") {
          return <Tag color="red">Rejected</Tag>;
        }
      },
      sorter: (a, b) => antdTableSorter(a, b, "issue_status"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      // width: 100,
      render: (_, elm) => (
        <Button
          type="link"
          className="p-0"
          onClick={() => {
            setOpen(true);
            setIssueView(elm);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const getIssues = (api) => {
    setLoad(true);
    // console.log(api);
    axios
      .get(api, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res);
        count === 0 && setCount(res.data.count)
        setData(res.data.results)
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong while fetching data !");
        setLoad(false);
      });
  };

  const handlePagination = (page) => {
    setLoad(true);
    // console.log(api);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/issue/AllIssuesGet/?page=${page}`, {
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



  const getStaffList = (id) => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/StaffList/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res);
        // console.log(res.data[Object.keys(res.data)[0]]);
        setStaffList(res.data.Staff_List);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const assignIssue = (id) => {
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/api/issue/IssueAssignToStaff/${id}`,
        { staff: selectedStaff },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getIssues(`${process.env.REACT_APP_BASE_URL}/api/issue/AllIssuesGet/`);
        message.success("Issue assigned successfully");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong");
      });
  };

  const changeIssueStatus = (id, status) => {
    console.log(id, status);
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/api/issue/IssueStatusChange/${id}`,
        {
          issue_status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getIssues(`${process.env.REACT_APP_BASE_URL}/api/issue/AllIssuesGet/`);
        if (status === "RJ") {
          message.success("Issue has been rejected");
        }
        if (status === "VA") {
          message.success("Issue verified succesfully !");
        }
        setOpen(false);
        setOpenSolvedIssue(false);
        setOpenStaffModal(false);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response?.data?.error);
      });
  };

  const search = () => {
    let api = `${process.env.REACT_APP_BASE_URL}/api/issue/AllIssuesGet/`;
    if (searchIssueType !== undefined) {
      api = api + `?search=${searchIssueType}`;
    }
    if (selectedArea !== undefined) {
      api = api + `?search=${selectedArea}`;
    }
    if (searchDates?.length > 0) {
      api =
        api +
        `?start_date=${moment(searchDates[0].$d).format(
          "YYYY-MM-DD"
        )}&end_date=${moment(searchDates[1].$d).format("YYYY-MM-DD")}`;
    }
    if (searchStatus) {
      api = api + `?issue_status=${searchStatus}`;
    }
    getIssues(api);
  };

  const exportTableData = (users) => {
    let arr = [];
    // console.log(users);
    data.map((item) => {
      arr.push({
        id: item?.id,
        name: item?.user?.first_name + " " + item?.user?.last_name,
        title: item?.issue_title,
        description: item?.User_issue_description,
        type: item?.issue_type.Issue_Type_Name,
        area: item?.area.area_name,
        city: item?.city.city_name,
        state: item?.state.state_name,
        created_on: moment(item?.issue_created_time).format(
          "MMMM Do YYYY, h:mm:ss a"
        ),
        votes: item?.issue_votes,
        coordinates: item?.latitude + " , " + item?.logitude,
      });
    });
    return arr.flatMap((item) => item);
  };

  const contentStyle = {
    margin: 0,
    // height: "80%",
    color: "#364d79",
    lineHeight: "160px",
    textAlign: "center",
    aspectRatio: "16/9",
  };
  const resetSearch = () => {
    getIssues(`${process.env.REACT_APP_BASE_URL}/api/issue/AllIssuesGet/`);
    setSearchIssueType(undefined);
    setSelectedArea(undefined);
    setSearchStatus(undefined);
    searchDates([]);
  };
  const fetchAreaDetails = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL
        }/api/details/areaDetail/${localStorage.getItem("CITY_ID")}`
      )
      .then((res) => {
        console.log(res);
        setAreas(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStaffDetails = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/StaffDetail/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setStaffView(res.data);
        setOpenStaffModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUsersDetails = (id) => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/UserDetail/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res, "user");
        setUserView(res.data);
        setOpenUserModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getIssues(`${process.env.REACT_APP_BASE_URL}/api/issue/AllIssuesGet/`);
    // fetchIssueTypes();
    fetchAreaDetails();
    setSearchIssueType(undefined);
    setSelectedArea(undefined);
    setSearchStatus(undefined);
  }, []);

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
                <label htmlFor="" className="font16">
                  Issue Type
                </label>
                <Select
                  className="w-100 mar10 selectElement"
                  placeholder="Select an Issue Type"
                  onChange={(e) => setSearchIssueType(e)}
                  allowClear
                  style={{ width: 200 }}
                  value={searchIssueType}
                >
                  {["Potholes", "Road", "Drainage", "Oil Leakeage"].map(
                    (elem, i) => (
                      <Option key={i} value={elem}>
                        {elem}
                      </Option>
                    )
                  )}
                </Select>
              </div>
              <div>
                <label htmlFor="" className="font16">
                  Area Name
                </label>
                <Select
                  className="w-100 mar10 selectElement"
                  placeholder="Select an area name"
                  onChange={(e) => setSelectedArea(e)}
                  allowClear
                  style={{ width: 200 }}
                  value={selectedArea}
                >
                  {areas.map((elem) => (
                    <Option key={elem.id} value={elem.area_name}>
                      {elem.area_name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <label htmlFor="" className="font16">
                  Search issues between two dates
                </label>
                <br />
                <RangePicker
                  className="mar10 selectElement"
                  onChange={(e) => setSearchDates(e)}
                  format="YYYY-MM-DD"
                  style={{ height: "39px" }}
                />
              </div>
              <div>
                <label htmlFor="" className="font16">
                  Status
                </label>
                <Select
                  className="w-100 mar10 selectElement"
                  placeholder="Search issues by status"
                  onChange={(e) => setSearchStatus(e)}
                  allowClear
                  style={{ width: 200 }}
                  value={searchStatus}
                >
                  <Option value="RJ">Rejected</Option>
                  <Option value="R">Recieved</Option>
                  <Option value="A">Assigned</Option>
                  <Option value="S">Solved</Option>
                  <Option value="VA">Verified</Option>
                </Select>
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
                className="d-flex align-items-center"
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
              className="d-flex align-items-center"
              onClick={() => {
                const excel = new Excel();
                excel
                  .addSheet("MMC")
                  .addColumns([
                    { title: "ID", dataIndex: "id" },
                    { title: "User Name", dataIndex: "name" },
                    { title: "Title", dataIndex: "title" },
                    { title: "Description", dataIndex: "description" },
                    { title: "Type", dataIndex: "type" },
                    { title: "Area", dataIndex: "area" },
                    { title: "State", dataIndex: "state" },
                    { title: "Issue created on", dataIndex: "created_on" },
                    { title: "Votes", dataIndex: "votes" },
                    { title: "Coordinates", dataIndex: "coordinates" },
                  ])
                  .addDataSource(exportTableData(data))
                  .saveAs("issues.xlsx");
              }}
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
              // scroll="x"
              pagination={false}

            />
            <Pagination className="my-4" defaultCurrent={1} total={count} onChange={handlePagination} style={{ float: "right" }} />
          </div>
        </Card>
      </div>

      <Modal
        title="Issue Details"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      // width={1000}
      >
        {issueView !== "" && (
          <Card>
            <Carousel autoplay>
              {issueView?.User_Issue_Images.length > 0 ? (
                issueView?.User_Issue_Images.map((elem) => (
                  <div>
                    <img
                      src={elem.image}
                      // width="100%"
                      alt=""
                      key={elem.Issue}
                      className="rounded mx-auto d-block"
                      style={contentStyle}
                    />
                  </div>
                ))
              ) : (
                <div>
                  <h3 style={contentStyle}>No Images Available</h3>
                </div>
              )}
            </Carousel>
            <Form>
              <Form.Item className="mb-3" label="Title">
                {issueView?.issue_title || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Description">
                {issueView?.User_issue_description || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Type">
                {issueView?.issue_type?.Issue_Type_Name || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Created On">
                {moment(issueView?.issue_created_time).format(
                  "MMMM Do YYYY, h:mm:ss a"
                ) || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Area">
                {issueView?.area?.area_name || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Landmark">
                {issueView?.landmark || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Coordinates">
                {issueView?.latitude
                  ? issueView.latitude + " , " + issueView.logitude
                  : "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="No. of Votes">
                {issueView?.issue_votes}
              </Form.Item>
              {issueView?.issue_status === "R" && (
                <div className="d-flex gap-3">
                  {!assign ? (
                    <>
                      <Button
                        type="primary"
                        danger
                        onClick={() => changeIssueStatus(issueView.id, "RJ")}
                      >
                        Reject This Issue
                      </Button>
                      <Button type="primary" onClick={() => setAssign(true)}>
                        Assign This Issue To Staff
                      </Button>
                    </>
                  ) : (
                    <>
                      <div>
                        <Form.Item
                          className="mb-1"
                          label="Assign this issue to staff member"
                        ></Form.Item>

                        <Select
                          className="selectElement mb-2"
                          placeholder="Select Staff"
                          name="assig_to_staff"
                          onClick={() => getStaffList(issueView?.id)}
                          onChange={(e) => setSelectedStaff(e)}
                          style={{ width: 300 }}
                        >
                          {staffList?.map((elem, i) => (
                            <Option key={i} value={elem.id}>
                              {elem.username}{" "}
                              {elem.staff_work_status === "F" ? (
                                <Tag style={{ float: "right" }} color="green">
                                  Available
                                </Tag>
                              ) : (
                                <Tag color="volcano" style={{ float: "right" }}>
                                  Angaged
                                </Tag>
                              )}
                            </Option>
                          ))}
                        </Select>
                        <br />
                        <Button
                          type="primary"
                          size="large"
                          className="d-flex align-items-center"
                          onClick={() => assignIssue(issueView?.id)}
                        >
                          Assign
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {issueView?.issue_status === "A" && (
                <Form.Item label="This issue has been assigned to">
                  <Button
                    type="link"
                    onClick={() => getStaffDetails(issueView?.staff?.id)}
                  >
                    {issueView?.staff?.first_name +
                      " " +
                      issueView?.staff?.last_name}
                  </Button>
                  {issueView?.isssue_assign_date_and_time && (
                    <>
                      On
                      {moment(issueView?.isssue_assign_date_and_time).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </>
                  )}
                </Form.Item>
              )}
              {issueView?.issue_status === "S" && (
                <div className="d-flex gap-3">
                  <Button
                    type="primary"
                    size="large"
                    // className="d-flex align-items-center"
                    onClick={() => setOpenSolvedIssue(true)}
                  >
                    Check solved issue
                  </Button>
                  {/* <Button
                    type="primary"
                    size="large"
                    // className="d-flex align-items-center"
                    onClick={() => changeIssueStatus(issueView?.id, "VA")}
                  >
                    Verify this issue
                  </Button> */}
                </div>
              )}
              {issueView?.issue_status === "VA" && (
                <Form.Item label="This issue has been solved by">
                  <Button
                    type="link"
                    onClick={() => getStaffDetails(issueView?.staff?.id)}
                  >
                    {issueView?.staff?.first_name +
                      " " +
                      issueView?.staff?.last_name}
                  </Button>
                </Form.Item>
              )}
            </Form>
          </Card>
        )}
      </Modal>
      <Modal
        title="Solved Issue Details"
        open={openSolvedIssueView}
        onCancel={() => setOpenSolvedIssue(false)}
        footer={null}
      // width={1000}
      >
        {issueView !== "" && (
          <Card>
            <Carousel autoplay>
              {issueView?.Staff_Issue_Images.length > 0 ? (
                issueView?.Staff_Issue_Images.map((elem) => (
                  <div>
                    <img
                      src={elem.image}
                      // width="100%"
                      alt=""
                      key={elem.Issue}
                      className="rounded mx-auto d-block"
                      style={contentStyle}
                    />
                  </div>
                ))
              ) : (
                <div>
                  <h3 style={contentStyle}>No Images Available</h3>
                </div>
              )}
            </Carousel>
            <Form>
              <Form.Item className="mb-3" label="Title">
                {issueView?.issue_title || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Staff's Description">
                {issueView?.Staff_issue_solved_description || "N/A"}
              </Form.Item>
              {/* <Form.Item className="mb-3" label="Type">
                {issueView?.issue_type?.Issue_Type_Name || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Created On">
                {moment(issueView?.issue_created_time).format(
                  "MMMM Do YYYY, h:mm:ss a"
                ) || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Solved On">
                {moment(issueView?.issue_solved_date_and_time).format(
                  "MMMM Do YYYY, h:mm:ss a"
                ) || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Area">
                {issueView?.area?.area_name || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Landmark">
                {issueView?.landmark || "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="Coordinates">
                {issueView?.latitude
                  ? issueView.latitude + " , " + issueView.logitude
                  : "N/A"}
              </Form.Item>
              <Form.Item className="mb-3" label="No. of Votes">
                {issueView?.issue_votes}
              </Form.Item> */}

              <div className="d-flex gap-3">
                <Button
                  type="primary"
                  size="large"
                  // className="d-flex align-items-center"
                  onClick={() => changeIssueStatus(issueView?.id, "VA")}
                >
                  Verify this issue
                </Button>
              </div>
            </Form>
          </Card>
        )}
      </Modal>
      <Modal
        title="Staff member Details"
        open={openStaffModal}
        onCancel={() => setOpenStaffModal(false)}
        footer={null}
      >
        <Card>
          <Avatar
            sx={{
              m: 1,
              width: "8rem",
              height: "8rem",
              background: "linear-gradient(90deg,  #3c56bd 0%, #5a78ef 100%)",
            }}
            src={staffView?.image}
          />
          <Form>
            <Form.Item name="name" label="Username">
              {staffView?.username}
            </Form.Item>
            <Form.Item name="email" label="Email ID ">
              {staffView?.email}
            </Form.Item>
            <Form.Item name="name" label="Firstname">
              {staffView?.first_name}
            </Form.Item>
            <Form.Item name="name" label="Lastname">
              {staffView?.last_name}
            </Form.Item>
            <Form.Item name="address" label="State">
              {staffView?.state?.state_name}
            </Form.Item>
            <Form.Item name="city" label="City">
              {staffView?.city?.city_name}
            </Form.Item>
            <Form.Item name="jdate" label="Date Of Birth">
              {staffView?.Date_of_birth}
            </Form.Item>
            <Form.Item name="jdate" label="Aadhar Card Number">
              {staffView?.aadhar_no}
            </Form.Item>
            <Form.Item name="jdate" label="Phone Number">
              {staffView?.phone_no}
            </Form.Item>
          </Form>
        </Card>
      </Modal>
      <Modal
        title="User Details"
        open={openUserModal}
        onCancel={() => setOpenUserModal(false)}
        footer={null}
      // width={1000}
      >
        <Card>
          <Avatar
            sx={{
              m: 1,
              width: "8rem",
              height: "8rem",
              background: "linear-gradient(90deg,  #3c56bd 0%, #5a78ef 100%)",
            }}
            src={userView?.image}
          />
          <Form>
            <Form.Item name="name" label="Username">
              {userView?.username}
            </Form.Item>
            <Form.Item name="email" label="Email ID ">
              {userView?.email}
            </Form.Item>
            <Form.Item name="name" label="Firstname">
              {userView?.first_name}
            </Form.Item>
            <Form.Item name="name" label="Lastname">
              {userView?.last_name}
            </Form.Item>
            <Form.Item name="address" label="State">
              {userView?.state?.state_name}
            </Form.Item>
            <Form.Item name="city" label="City">
              {userView?.city?.city_name}
            </Form.Item>
            <Form.Item name="jdate" label="Date Of Birth">
              {userView?.Date_of_birth}
            </Form.Item>
            <Form.Item name="jdate" label="Aadhar Card Number">
              {userView?.aadhar_no}
            </Form.Item>
            <Form.Item name="jdate" label="Phone Number">
              {userView?.phone_no}
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
}

export default RecentIssues;
