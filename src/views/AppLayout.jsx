import { Outlet } from "react-router-dom";
import MenuDrawer from '../components/MenuDrawer/MenuDrawer';
import styles from "./AppLayout.module.css"

const AppLayout = () => {
    return(
        <>
            <MenuDrawer />
            <main className={styles.main}>
                <Outlet/>
            </main>
        </>
    );
};

export default AppLayout;
