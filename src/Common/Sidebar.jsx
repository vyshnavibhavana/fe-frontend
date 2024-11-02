import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faCogs, faDatabase, faGear, faSignOut, faSignOutAlt, faTable } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f8f9fa;
  height: 100vh;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#000" : "#6c757d")};
  background-color: ${(props) => (props.active ? "#e9f2ff" : "transparent")};
  
  &:hover {
    background-color: #e9f2ff;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 20px;
`;

const Logout = styled(MenuItem)`
  margin-top: auto;
  color: #dc3545;
`;

const Label = styled.span`
  font-size: 16px;
`;

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Board");
  const navigate = useNavigate();
  const handleItemClick = (item, path) => {
    navigate(path);
    setActiveItem(item);
  };

  return (
    <SidebarContainer>
      <Logo onClick={() => handleItemClick("", '/dashboard')}>Pro Manage</Logo>

      <MenuItem active={activeItem === "Board"} onClick={() => handleItemClick("Board", '/dashboard')}>
        <Icon icon={faTable} />
        <Label>Board</Label>
      </MenuItem>

      <MenuItem active={activeItem === "Analytics"} onClick={() => handleItemClick("Analytics", '/analytics')}>
        <Icon icon={faDatabase} />
        <Label>Analytics</Label>
      </MenuItem>

      <MenuItem active={activeItem === "Settings"} onClick={() => handleItemClick("Settings", '/settings')}>
        <Icon icon={faGear} />
        <Label>Settings</Label>
      </MenuItem>

      <Logout onClick={() => navigate('/auth/login')}>
        <Icon icon={faSignOut} />
        <Label>Log out</Label>
      </Logout>
    </SidebarContainer>
  );
};

export default Sidebar;
