import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, useMediaQuery, Drawer, SwipeableDrawer } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import { getAuth } from "../utils/auth";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DomainOutlinedIcon from "@mui/icons-material/DomainOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

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

const SidebarContent = ({ isCollapsed, selected, setSelected, canView, fullname, userRole, colors, setIsCollapsed }) => (
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
      <Item title="Dashboard" to="/Dashboard" icon={<DashboardCustomizeOutlinedIcon />} selected={selected} setSelected={setSelected} />
      {canView.Employees && <Item title="Employees" to="/Employees" icon={<Groups2OutlinedIcon />} selected={selected} setSelected={setSelected} />}
      {canView.forms && <Item title="Forms" to="/Forms" icon={<AssignmentTurnedInOutlinedIcon />} selected={selected} setSelected={setSelected} />}
      {canView.branches && <Item title="Branches" to="/Branches" icon={<StoreMallDirectoryOutlinedIcon />} selected={selected} setSelected={setSelected} />}
      {canView.subCompanies && <Item title="Sub Company" to="/SubCompany" icon={<BusinessOutlinedIcon />} selected={selected} setSelected={setSelected} />}
      {canView.companies && <Item title="Company" to="/Company" icon={<DomainOutlinedIcon />} selected={selected} setSelected={setSelected} />}
      {canView.categories && <Item title="Category" to="/Category" icon={<CategoryOutlinedIcon />} selected={selected} setSelected={setSelected} />}
      {canView.faq && <Item title="FAQ Page" to="/FAQ" icon={<LiveHelpOutlinedIcon />} selected={selected} setSelected={setSelected} />}
      {canView.UsersData && (
        <>
          {!isCollapsed && (
            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Users
            </Typography>
          )}
          <Item title="Type" to="/TypeUser" icon={<SupervisedUserCircleOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Supplier" to="/Supplier" icon={<LocalShippingOutlinedIcon />} selected={selected} setSelected={setSelected} />
        </>
      )}
    </Box>
  </Menu>
);

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [userRole, setUserRole] = useState("");
  const [fullname, setUserfulname] = useState("");
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const { role, fullname } = getAuth();
    const rawRole = localStorage.getItem('userRole');
    setUserRole(role?.toLowerCase() || "");
    setUserfulname(fullname || "");
    console.log('Sidebar userRole:', role, 'as lower:', role?.toLowerCase(), 'raw localStorage:', rawRole);
  }, []);

  const canView = {
    dashboard: true,
    Employees: ["branchmanager", "companymanager", "admin", "superadmin"].includes(userRole),
    forms: true,
    branches: ["companymanager", "admin", "superadmin"].includes(userRole),
    subCompanies: ["admin", "superadmin"].includes(userRole),
    companies: ["superadmin"].includes(userRole),
    categories: ["superadmin"].includes(userRole),
    chats: ["superadmin"].includes(userRole),
    faq: ["superadmin"].includes(userRole),
    UsersData: ["superadmin"].includes(userRole?.toLowerCase()),
  };
  console.log('Sidebar canView.UsersData:', canView.UsersData, 'userRole:', userRole);

  // Responsive sidebar: Drawer for mobile, sticky/fixed for desktop
  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1301,
            background: colors.primary[400],
            color: colors.grey[100],
            boxShadow: 2,
            '&:hover': { background: colors.primary[500] },
          }}
        >
          <MenuOutlinedIcon />
        </IconButton>
        <SwipeableDrawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          onOpen={() => setMobileOpen(true)}
          PaperProps={{
            sx: {
              width: 260,
              background: colors.primary[400],
              border: 0,
              height: '100vh',
              overflow: 'hidden',
              '::-webkit-scrollbar': { display: 'none' },
            },
          }}
        >
          <Box sx={{ height: '100vh', overflow: 'hidden', width: 260 }}>
            <ProSidebar collapsed={false} style={{ height: '100vh', overflow: 'hidden' }}>
              <SidebarContent
                isCollapsed={false}
                selected={selected}
                setSelected={setSelected}
                canView={canView}
                fullname={fullname}
                userRole={userRole}
                colors={colors}
                setIsCollapsed={setIsCollapsed}
              />
            </ProSidebar>
          </Box>
        </SwipeableDrawer>
      </>
    );
  }

  // Desktop: sticky/fixed sidebar, no scrollbars
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
        width: 260,
        zIndex: 1200,
        overflow: "hidden",
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
          height: '100vh',
          overflow: 'hidden',
        },
        '& .pro-sidebar': {
          height: '100vh',
          overflow: 'hidden',
        },
        '& .pro-menu': {
          height: '100vh',
          overflow: 'hidden',
        },
        '& .pro-menu-item': {
          overflow: 'hidden',
        },
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <ProSidebar collapsed={isCollapsed} style={{ height: '100vh', overflow: 'hidden' }}>
        <SidebarContent
          isCollapsed={isCollapsed}
          selected={selected}
          setSelected={setSelected}
          canView={canView}
          fullname={fullname}
          userRole={userRole}
          colors={colors}
          setIsCollapsed={setIsCollapsed}
        />
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
