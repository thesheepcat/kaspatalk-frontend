import { Outlet } from "react-router-dom";
import MenuDrawer from '../components/MenuDrawer/MenuDrawer';

const AppLayout = () => {
    return(
        <>
            <MenuDrawer />
            <Outlet/>
        </>
    );
};

export default AppLayout;
