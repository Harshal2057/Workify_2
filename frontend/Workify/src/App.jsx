import {Route, Routes} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Accounttype from "./pages/Accounttype"
import { StoreContext } from "./context/StoreContext";
import { useContext } from "react";
import ProfilePage from "./pages/ProfilePage";
import Back_picUpload from "./components/Back_picUpload";
function App() {
 
  const{setShowLogin , showLogin} = useContext(StoreContext);

  return (
    <>
    <div className= "w-full min-h-screen overflow-x-hidden absolute -z-20">

   
    <Navbar />
    <ToastContainer  position="top-right" autoClose={3000} />
    <div className="h-[85px] lg:hidden"></div> 
    
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auth" element={<Auth />} />
        <Route path="/accountType" element={<Accounttype />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/edit-background" element={<Back_picUpload />} />
    </Routes>

    </div>
    
    </>
  )
}

export default App
