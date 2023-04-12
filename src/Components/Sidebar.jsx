// import React, { useContext, useEffect, useState } from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import {
//   AccountCircle,
//   Engineering,
//   GridView,
//   Logout,
//   MapOutlined,
//   PeopleAlt,
//   Rule,
//   Settings,
// } from "@mui/icons-material";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
// import { AuthContext } from "../Context/userContext";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { Badge } from "antd";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     // width: `calc(100% - ${drawerWidth}px)`,
//     // marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: 1000,
//     }),
//   }),
// }));

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   // justifyContent: "flex-end",
// }));

// function Sidebar(props) {
//   const nav = useNavigate();
//   const [open, setOpen] = React.useState(true);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [width, setWidth] = useState();
//   const { authState } = useContext(AuthContext);
//   const openmenu = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const theme = createTheme({
//     components: {
//       MuiButtonBase: {
//         defaultProps: {
//           disableRipple: true,
//         },
//       },
//     },
//   });
//   const SideListItems = [
//     {
//       path: "/",
//       text: "Dashboard",
//       icon: <GridView />,
//     },
//     {
//       path: "/users",
//       text: "Users",
//       icon: <PeopleAlt />,
//     },
//     {
//       path: "/staff",
//       text: "Staff",
//       icon: <Engineering />,
//     },
//     {
//       path: "/recentissues",
//       text: "Recent Issues",
//       icon: <Rule />,
//     },
//     {
//       path: "/map",
//       text: "City Map",
//       icon: <MapOutlined />,
//     },
//   ];

//   // useEffect(() => {
//   //   setWidth(window.innerWidth);
//   //   window.addEventListener("resize", () => setWidth(window.innerWidth));
//   //   return () => {
//   //     window.removeEventListener("resize", () => setWidth(window.innerWidth));
//   //   };
//   // }, []);

//   // useEffect(() => {
//   //   if (width < 1200) setOpen(false);
//   // }, [width]);

//   const handleLogout = () => {
//     Swal.fire({
//       title: `Are you sure , you want to Logout`,
//       icon: "question",
//       showDenyButton: true,
//       confirmButtonText: "Yes",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .post(
//             ` ${process.env.REACT_APP_BASE_URL}/api/usersLogOut/`,
//             {},
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
//               },
//             }
//           )
//           .then((res) => {
//             console.log(res);
//             localStorage.clear();
//             nav("/login");
//           })
//           .catch((err) => {
//             console.log(err);
//             Swal.fire(`Something went wrong !`, "", "error");
//           });
//       }
//     });
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open} sx={{ zIndex: "auto" }}>
//         <Toolbar style={{ backgroundColor: "rgb(104 131 237)" }}>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={() => {
//               setOpen(!open);
//               props.setClose(!open);
//             }}
//             edge="start"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             noWrap={true}
//             component="div"
//             style={{ cursor: "pointer" }}
//             onClick={() => nav("/")}
//           >
//             <img src="../assets/images/logo.png" alt="logo" width={50} />
//             Make My City
//           </Typography>
//           {/* <div> */}

//           <div className="profile-icon">
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 textAlign: "center",
//               }}
//             >
//               <Badge title="5">
//                 <IconButton>
//                   <NotificationsNoneOutlinedIcon color="action" />
//                 </IconButton>
//               </Badge>
//               <Tooltip title="Account">
//                 <IconButton
//                   onClick={handleClick}
//                   size="small"
//                   sx={{ ml: 2 }}
//                   aria-controls={open ? "account-menu" : undefined}
//                   aria-haspopup="true"
//                   aria-expanded={open ? "true" : undefined}
//                 >
//                   <Avatar size="large" sx={{ backgroundColor: "#3c56bd" }} />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//             <Menu
//               anchorEl={anchorEl}
//               id="account-menu"
//               open={openmenu}
//               onClose={handleClose}
//               onClick={handleClose}
//               PaperProps={{
//                 elevation: 0,
//                 sx: {
//                   overflow: "visible",
//                   filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//                   mt: 1.5,
//                   "& .MuiAvatar-root": {
//                     width: 32,
//                     height: 32,
//                     ml: -0.5,
//                     mr: 1,
//                   },
//                   "&:before": {
//                     content: '""',
//                     display: "block",
//                     position: "absolute",
//                     top: 0,
//                     right: 14,
//                     width: 10,
//                     height: 10,
//                     bgcolor: "background.paper",
//                     transform: "translateY(-50%) rotate(45deg)",
//                     zIndex: 0,
//                   },
//                 },
//               }}
//               transformOrigin={{ horizontal: "right", vertical: "top" }}
//               anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//             >
//               <div className="d-flex m-3 align-items-center">
//                 <div className="d-flex flex-column fs-5">
//                   <span className="text-dark"> {authState?.username}</span>
//                   <span className="fs-6 fw-light"> {authState?.email}</span>
//                 </div>
//               </div>
//               <Divider />
//               <MenuItem onClick={() => nav("/profile")}>
//                 <ListItemIcon>
//                   <AccountCircle fontSize="small" />
//                 </ListItemIcon>
//                 My Profile
//               </MenuItem>
//               <MenuItem onClick={() => nav("/changepassword")}>
//                 <ListItemIcon>
//                   <Settings fontSize="small" />
//                 </ListItemIcon>
//                 Change Password
//               </MenuItem>
//               <MenuItem onClick={handleLogout}>
//                 <ListItemIcon>
//                   <Logout fontSize="small" />
//                 </ListItemIcon>
//                 Logout
//               </MenuItem>
//             </Menu>
//           </div>
//           {/* </div> */}
//           <Drawer
//             sx={{
//               width: 240,
//               flexShrink: 0,
//               "& .MuiDrawer-paper": {
//                 width: 240,
//                 boxSizing: "border-box",
//                 zIndex: -1,
//               },
//             }}
//             // transitionDuration={500}
//             variant="persistent"
//             anchor="left"
//             open={open}
//           >
//             <DrawerHeader />
//             <Divider />
//             <List className="listItem">
//               {SideListItems.map((item, index) => (
//                 <ListItem disablePadding key={index}>
//                   <NavLink to={item.path} className="navlink">
//                     <ThemeProvider theme={theme}>
//                       <ListItemButton>
//                         <ListItemIcon>{item.icon}</ListItemIcon>
//                         <ListItemText primary={item.text} />
//                       </ListItemButton>
//                     </ThemeProvider>
//                   </NavLink>
//                 </ListItem>
//               ))}
//             </List>
//             <Divider />
//           </Drawer>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

// export default Sidebar;
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

const profileImg = "";

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
        <div className="d-flex">
          <Avatar size={45} src={profileImg} />
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
      <Sider theme="" trigger={null} collapsible collapsed={collapsed}>
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
          defaultSelectedKeys={["1"]}
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
      <Layout className="site-layout">
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px",
            background: colorBgContainer,
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
                  <Avatar src={profileImg} className="w-[25px] h-[25px]" />
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
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
