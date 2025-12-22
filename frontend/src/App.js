import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Registration from './component/Registration';
import Login from './component/Login';
import Home from './Data Component/Home';
import Files from './Data Component/Files';
import Star from './Data Component/Star';
import Logout from './component/Logout';
import Error from "./component/Error";
import { useEffect, useState } from 'react';
import Nsw from "./component/Nsw";
import User_dashboard from "./Data Component/User_dashboard";
import ModelFolder from "./Data Component/ModelFolder";
import NotFound from "./component/NotFound";

function Navbar() {
  const [logout, setLogout] = useState(null);
  const location = useLocation();

  function userDesh(){
    
  }
  useEffect(() => {
    if (
  !location.pathname.startsWith("/login") &&
  !location.pathname.startsWith("/registration") &&
  !location.pathname.endsWith("/")

) {
       setLogout(
        <Link
          to="/logout"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Logout
        </Link>
      );
      }

  }, [location]); 

  return (
    <nav className="bg-white shadow-md flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <a href="">
          <img src="favicon.png" width={40} alt="logo" />
        </a>
        <a href="">
          <h3 className="text-lg font-semibold">NSW</h3>
        </a>
      </div>
       <div className="flex gap-2">{logout} </div>
     
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Nsw />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/files/*" element={<ModelFolder />} />
        <Route path="/files" element={<Files/>} />
        <Route path="/star" element={<Star />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/User_dashboard" element={<User_dashboard/>} />
         <Route path="*" element={<Error />} />
         <Route path="/404-NotFound" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
