import logo from "./logo.svg";
import "./App.css";


import { BrowserRouter, Route, Routes } from "react-router-dom";

import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Chat from './Components/Chat'
import Groups from "./Components/Groups";
function App() {
  return (
    <BrowserRouter>
      <Routes>
  
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/groups" element={<Groups/>} />
        

     
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
