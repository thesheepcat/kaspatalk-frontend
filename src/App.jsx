import HomeView from "./views/HomeView.jsx";
import LoginView from "./views/LoginView.jsx";
import ChatView from "./views/ChatView.jsx";
import UserProfileView from "./views/UserProfileView.jsx";
import ContactsView from "./views/ContactsView.jsx";
import SettingsView from "./views/SettingsView.jsx";
import LogoutView from "./views/LogoutView.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styles from "./App.module.css"
import GeneralContextProvider from './components/ContextProviders/GeneralContextProvider.jsx'
import AppLayout from "./views/AppLayout.jsx";
 
function App() {  
  // Create routing between all available views
  const router = createBrowserRouter([
    { path: "/", 
      element: <AppLayout/>,
      children: [
        {path: "/", element: <HomeView/>},
        {path: "/login", element: <LoginView/>},
        {path: "/logout", element: <LogoutView/>},
        {path: "/chat", element: <ChatView/>},
        {path: "/user-profile", element: <UserProfileView/>},
        {path: "/contacts", element: <ContactsView/>},    
        {path: "/settings", element: <SettingsView/>}
        
      ]
    }
  ])

  return (
      <GeneralContextProvider>
        <main className={styles.main}>
            <RouterProvider router={router} />
        </main>
      </GeneralContextProvider>
  )
}

export default App
