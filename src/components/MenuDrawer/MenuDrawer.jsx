import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext, useState } from 'react';
import { GeneralContext} from "../ContextProviders/GeneralContextProvider.jsx";
import { menuDrawerBoxStyle, listItemButtonStyle, selectedListItemButtonStyle } from "./MenuDrawer.styles.js";
import { useNavigate } from "react-router-dom";


class DrawerItem {
  constructor(itemName, route) {
    this.itemName = itemName;
    this.route = route;
}};

const MenuDrawer = () => {
  const { openMenuDrawer, setOpenMenuDrawer, selectedMenuDrawerItem, setselectedMenuDrawerItem } = useContext(GeneralContext);
  const navigateViews = useNavigate();
  
  const toggleDrawer = (newOpen) => {
    setOpenMenuDrawer(newOpen);
  };

  const handleSelectMenuItem = (menuItem) => {
    setselectedMenuDrawerItem(menuItem.itemName);
    navigateViews(menuItem.route);
  };

  // Set menu items
  const chatMenuItem = new DrawerItem("Chat", "/chat");
  const userMenuItem = new DrawerItem("User profile", "/user-profile");
  const contactsMenuItem = new DrawerItem("Contacts", "/contacts");
  const settingsMenuItem = new DrawerItem("Settings", "/settings");
  const logoutMenuItem = new DrawerItem("Logout", "/logout");

  return (
    <>
      <Drawer open={openMenuDrawer} onClose={ () => toggleDrawer(false)}>
        <Box sx={ menuDrawerBoxStyle } role="presentation" onClick={() => toggleDrawer(false)}>
          <List>
            <ListItem>
              <ListItemButton sx={ 
                selectedMenuDrawerItem == chatMenuItem.itemName ? selectedListItemButtonStyle : listItemButtonStyle } 
                onClick={() => handleSelectMenuItem(chatMenuItem)}
                disabled={selectedMenuDrawerItem === chatMenuItem.itemName} >
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary={chatMenuItem.itemName} />
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton
                sx={ selectedMenuDrawerItem == userMenuItem.itemName ? selectedListItemButtonStyle : listItemButtonStyle } 
                onClick={() => handleSelectMenuItem(userMenuItem)}
                disabled={selectedMenuDrawerItem === userMenuItem.itemName} >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={userMenuItem.itemName} />
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton 
                sx={ selectedMenuDrawerItem == contactsMenuItem.itemName ? selectedListItemButtonStyle : listItemButtonStyle } 
                onClick={() => handleSelectMenuItem(contactsMenuItem)}
                disabled={selectedMenuDrawerItem === contactsMenuItem.itemName} >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={contactsMenuItem.itemName} />
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton 
                sx={ selectedMenuDrawerItem == settingsMenuItem.itemName ? selectedListItemButtonStyle : listItemButtonStyle } 
                onClick={() => handleSelectMenuItem(settingsMenuItem)}
                disabled={selectedMenuDrawerItem === settingsMenuItem} >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={settingsMenuItem.itemName} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton 
                sx={ selectedMenuDrawerItem == logoutMenuItem.itemName ? selectedListItemButtonStyle : listItemButtonStyle } 
                onClick={() => handleSelectMenuItem(logoutMenuItem)}
                disabled={selectedMenuDrawerItem === logoutMenuItem.itemName} >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={logoutMenuItem.itemName} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>  
      </Drawer>
    </>
  );
};

export default MenuDrawer;