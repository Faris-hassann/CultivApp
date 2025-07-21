import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import { getAuth } from "../utils/auth";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GroupIcon from "@mui/icons-material/Group";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [userRole, setUserRole] = useState("");
  const [fullname, setUserfulname] = useState("");

  useEffect(() => {
    const { role, fullname } = getAuth(); // fixed destructuring
    setUserRole(role?.toLowerCase() || "");
    setUserfulname(fullname || "");
  }, []); // run only once

  const canView = {
    dashboard: true,
    users: true,
    forms: true,
    members: true,
    branches: ["companymanager", "admin", "superadmin"].includes(userRole),
    subCompanies: ["admin", "superadmin"].includes(userRole),
    companies: ["superadmin"].includes(userRole),
    categories: ["superadmin"].includes(userRole),
    chats: ["superadmin"].includes(userRole),
    faq: ["superadmin"].includes(userRole),
    UsersData: ["superadmin"].includes(userRole),
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  Rwafi
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <AccountCircleOutlinedIcon
                  sx={{ fontSize: 100, color: colors.grey[100], cursor: "pointer" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold">
                  {fullname}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {userRole}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item title="Dashboard" to="/Dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Employees" to="/Employees" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
            {canView.members && <Item title="Members" to="/Members" icon={<GroupIcon />} selected={selected} setSelected={setSelected} />}
            {canView.forms && <Item title="Forms" to="/Forms" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />}
            {canView.branches && <Item title="Branches" to="/Branches" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />}
            {canView.subCompanies && <Item title="Sub Company" to="/SubCompany" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />}
            {canView.companies && <Item title="Company" to="/Company" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />}
            {canView.categories && <Item title="Category" to="/Category" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />}
            {/* {canView.chats && <Item title="Chats" to="/Chats" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} />} */}
            {canView.faq && <Item title="FAQ Page" to="/FAQ" icon={<HelpOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} />}
            
            {canView.UsersData && (
              <>
                <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                  Users
                </Typography>
                <Item title="Type" to="/TypeUser" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
                <Item title="Supplier" to="/Supplier" icon={<PieChartOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} />
              </>
            )}
         </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
