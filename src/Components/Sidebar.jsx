import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/userContext";
import {
  AccountCircle,
  Engineering,
  GridView,
  Logout,
  MapOutlined,
  PeopleAlt,
  Rule,
  Settings,
} from "@mui/icons-material";
import FormatIndentIncreaseRoundedIcon from "@mui/icons-material/FormatIndentIncreaseRounded";
import FormatIndentDecreaseRoundedIcon from "@mui/icons-material/FormatIndentDecreaseRounded";
import { Badge, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Dropdown, Avatar } from "antd";
import Swal from "sweetalert2";
import axios from "axios";

const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { authState } = useContext(AuthContext);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const nav = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: `Are you sure , you want to Logout`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            ` ${process.env.REACT_APP_BASE_URL}/api/usersLogOut/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            localStorage.clear();
            nav("/login");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(`Something went wrong !`, "", "error");
          });
      }
    });
  };
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex gap-2">
          <Avatar size={45} src={authState.image} />
          <div className="pl-3">
            <h4 className="mb-0"> {authState?.username}</h4>
            <span className="text-muted">{authState?.email}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          <Menu.Item onClick={() => nav("/profile")}>
            <span>
              <AccountCircle color="action" className="mr-5" />
              <span className="font-weight-normal"> Profile</span>
            </span>
          </Menu.Item>
          <Menu.Item onClick={() => nav("/changepassword")}>
            <span>
              <Settings color="action" className="mr-5" />
              <span className="font-weight-normal"> Change Password</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Layout>
      <Sider
        theme=""
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <div className="logo">
          <img
            src="../assets/images/logo.png"
            alt="logo"
            width={50}
            onClick={() => nav("/")}
          />
          {!collapsed ? <p>Make My City</p> : ""}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: "1",
              icon: <GridView />,
              label: "Dashboard",
              onClick: () => nav("/"),
            },
            {
              key: "2",
              icon: <PeopleAlt />,
              label: "Users",
              onClick: () => nav("/users"),
            },
            {
              key: "3",
              icon: <Engineering />,
              label: "Staff",
              onClick: () => nav("/staff"),
            },
            {
              key: "4",
              icon: <Rule />,
              label: "Recent Issues",
              onClick: () => nav("/recentissues"),
            },
            {
              key: "5",
              icon: <MapOutlined />,
              label: "City Map",
              onClick: () => nav("/map"),
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout" style={{ backgroundColor: "aliceblue" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px",
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ cursor: "pointer" }}>
            {collapsed ? (
              <FormatIndentIncreaseRoundedIcon
                color="action"
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : (
              <FormatIndentDecreaseRoundedIcon
                color="action"
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton>
              <Badge count={5}>
                <NotificationsNoneOutlinedIcon color="action" />
              </Badge>
            </IconButton>
            <Dropdown
              placement="bottomRight"
              overlay={profileMenu}
              trigger={["click"]}
            >
              <Menu className="d-flex align-item-center" mode="horizontal">
                <Menu.Item>
                  <Avatar src={authState.image} className="w-[25px] h-[25px]" />
                </Menu.Item>
              </Menu>
            </Dropdown>
            <IconButton onClick={handleLogout}>
              <Logout color="action" />
            </IconButton>
          </div>
        </Header>
        <Content
          style={{
            // margin: "24px 16px",
            // padding: 24,
            // height: "90vh",
            backgroundColor: "aliceblue",
            overflow: "hidden",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
