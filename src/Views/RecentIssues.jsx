import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DatePicker, Tag } from "antd";
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
  const [searchDates, setSearchDates] = useState();
  searchDates &&
    console.log(
      moment(searchDates[0].$d).format("DD-MM-YYYY"),
      moment(searchDates[1].$d).format("DD-MM-YYYY")
    );
  const tableColumns = [
    {
      title: "Posted By",
      dataIndex: "user",
      key: "user",
      fixed: "center",
      render: (name, elem) => {
        return (
          <Button type="link" className="p-0">
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
      ellipsis: true,
      width: 200,
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
        }
      },
      sorter: (a, b) => antdTableSorter(a, b, "issue_status"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
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
    console.log(api);
    axios
      .get(api, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
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

  const getStaffList = (id) => {
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
        message.success("Issue assigned successfully");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong");
      });
  };

  const changeIssueStatus = (id) => {
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/api/issue/IssueStatusChange/${id}`,
        {
          issue_status: "VA",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        message.success("Issue verified succesfully !");
      })
      .catch((err) => {
        console.log(err);
        message.error("Issue verification failed !");
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
    if (searchDates) {
      api =
        api +
        `?startdate=${moment(searchDates[0].$d).format(
          "DD-MM-YYYY"
        )}&enddate=${moment(searchDates[1].$d).format("DD-MM-YYYY")}`;
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
    height: "80%",
    color: "#364d79",
    lineHeight: "160px",
    textAlign: "center",
  };

  const resetSearch = () => {
    getIssues(`${process.env.REACT_APP_BASE_URL}/api/issue/AllIssuesGet/`);
    setSearchIssueType(undefined);
    setSelectedArea(undefined);
  };
  const fetchAreaDetails = async () => {
    await axios
      .get(
        `${
          process.env.REACT_APP_BASE_URL
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

  useEffect(() => {
    getIssues(`${process.env.REACT_APP_BASE_URL}/api/issue/AllIssuesGet/`);
    // fetchIssueTypes();
    fetchAreaDetails();
    setSearchIssueType(undefined);
    setSelectedArea(undefined);
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
                <RangePicker
                  className="mar10 selectElement"
                  onChange={(e) => setSearchDates(e)}
                  format="DD-MM-YYYY"
                  style={{ height: "39px" }}
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
            <Table columns={tableColumns} dataSource={data} rowKey="id" />
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
        {issueView !== "" && (
          <Card>
            <Carousel autoplay>
              {issueView?.User_Issue_Images.length > 0 ? (
                issueView?.User_Issue_Images.map((elem) => (
                  <div>
                    <img
                      src={elem.image}
                      width="100%"
                      alt=""
                      key={elem.Issue}
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

              {/* <Form.Item className="mb-3" label="Site Videos">
                {issueView?.User_Issue_Videos.length > 0
                  ? issueView?.User_Issue_Videos.map((elem) => (
                      <img
                        src={elem.video}
                        width="100%"
                        alt=""
                        key={elem.Issue}
                      />
                    ))
                  : "N/A"}
              </Form.Item> */}
              <Form.Item className="mb-3" label="No. of Votes">
                {issueView?.issue_votes}
              </Form.Item>
              {issueView?.issue_status === "R" ? (
                <Form.Item
                  className="mb-3 "
                  label="Assign this issue to staff member"
                >
                  <div className="d-flex gap-5">
                    <Select
                      className="selectElement"
                      placeholder="Select Staff"
                      name="assig_to_staff"
                      onClick={() => getStaffList(issueView?.id)}
                      onChange={(e) => setSelectedStaff(e)}
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
                    <Button
                      type="primary"
                      size="large"
                      className="d-flex align-items-center"
                      onClick={() => assignIssue(issueView?.id)}
                    >
                      Assign
                    </Button>
                  </div>
                </Form.Item>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  className="d-flex align-items-center"
                  onClick={() => changeIssueStatus(issueView?.id)}
                >
                  Verify this issue
                </Button>
              )}
            </Form>
          </Card>
        )}
      </Modal>
    </>
  );
}

export default RecentIssues;
