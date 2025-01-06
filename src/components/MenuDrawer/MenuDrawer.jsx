import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
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
import { GeneralContextProvider} from "../ContextProviders/GeneralContextProvider.jsx";
import { menuDrawerBoxStyle, listItemButtonStyle, selectedListItemButtonStyle } from "./MenuDrawer.styles.js";

const MenuDrawer = () => {
  const { openMenuDrawer, updateOpenMenuDrawer } = useContext(GeneralContextProvider);
  const [ selectedItem, setSelectedItem ] = useState();
  
  const toggleDrawer = (newOpen) => {
    updateOpenMenuDrawer(newOpen);
  };

  const handleSelectMenuItem = (chatMenuItem) => {
    setSelectedItem(chatMenuItem);
  };

  // Set menu items
  const chatMenuItem = "Chat";
  const userMenuItem = "User";
  const contactsMenuItem = "Contacts";
  const settingsMenuItem = "Settings";
  const logoutMenuItem = "Logout";  

  return (
    <>
      <Drawer open={openMenuDrawer} onClose={ () => toggleDrawer(false)}>
        <Box sx={ menuDrawerBoxStyle } role="presentation" onClick={() => toggleDrawer(false)}>
          <List>
            <ListItem>
              <ListItemButton sx={ 
                selectedItem == chatMenuItem ? selectedListItemButtonStyle : listItemButtonStyle } 
                onClick={() => handleSelectMenuItem(chatMenuItem)}
                disabled={selectedItem === chatMenuItem} >
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary={chatMenuItem} />
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton
                sx={ selectedItem == userMenuItem ? selectedListItemButtonStyle : listItemButtonStyle } 
                onClick={() => handleSelectMenuItem(userMenuItem)}
                disabled={selectedItem === userMenuItem} >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={userMenuItem} />
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton 
                sx={ selectedItem == contactsMenuItem ? selectedListItemButtonStyle : listItemButtonStyle } 
                onClick={() => handleSelectMenuItem(contactsMenuItem)}
                disabled={selectedItem === contactsMenuItem} >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={contactsMenuItem} />
              </ListItemButton>
            </ListItem>
            <ListItem >
              <ListItemButton 
                sx={ selectedItem == settingsMenuItem ? selectedListItemButtonStyle : listItemButtonStyle } 
                onClick={() => handleSelectMenuItem(settingsMenuItem)}
                disabled={selectedItem === settingsMenuItem} >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={settingsMenuItem} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton 
                sx={ selectedItem == logoutMenuItem ? selectedListItemButtonStyle : listItemButtonStyle } 
                onClick={() => handleSelectMenuItem(logoutMenuItem)}
                disabled={selectedItem === logoutMenuItem} >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={logoutMenuItem} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>  
      </Drawer>
    </>
  );
};

export default MenuDrawer;