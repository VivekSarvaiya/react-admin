import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Assessment,
  Engineering,
  GridView,
  Logout,
  PeopleAlt,
  Report,
  Rule,
  Settings,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: 1000,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  // justifyContent: "flex-end",
}));

function Sidebar(props) {
  const nav = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const openmenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
  });

  const SideListItems = [
    {
      path: "/",
      text: "Dashboard",
      icon: <GridView />,
    },
    {
      path: "/users",
      text: "Users",
      icon: <PeopleAlt />,
    },
    {
      path: "/staff",
      text: "Staff",
      icon: <Engineering />,
    },
    {
      path: "/recentissues",
      text: "Recent Issues",
      icon: <Rule />,
    },
    {
      path: "/reports",
      text: "Reports",
      icon: <Assessment />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ backgroundColor: "rgb(104 131 237)" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setOpen(!open);
              props.setClose(!open);
            }}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ cursor: "pointer" }}
            onClick={() => nav("/")}
          >
            <img src="../assets/images/logo.png" alt="logo" width={50} />
            Make My City
          </Typography>
          <div className="profile-icon">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar size="large" sx={{ backgroundColor: "#3c56bd" }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openmenu}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <div className="d-flex m-3 align-items-center">
                <div className="d-flex flex-column fs-5">
                  <span className="text-dark"> Admin</span>
                  <span className="fs-6 fw-light"> mmcsurat@gmail.com</span>
                </div>
              </div>
              <Divider />
              <MenuItem onClick={() => nav("/changepassword")}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Change Password
              </MenuItem>
              <MenuItem onClick={() => {}}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            {/* <button className=" px-5 btn btn-success" onClick={logout}>
                Logout
              </button> */}
          </div>

          <Drawer
            sx={{
              width: 240,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
                zIndex: -1,
              },
            }}
            // transitionDuration={500}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader />
            <Divider />
            <List className="listItem">
              {SideListItems.map((item, index) => (
                <ListItem disablePadding key={item.text}>
                  <NavLink to={item.path} className="navlink">
                    <ThemeProvider theme={theme}>
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    </ThemeProvider>
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Sidebar;
