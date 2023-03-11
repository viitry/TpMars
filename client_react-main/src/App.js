import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Single from "./components/Single";
import Login from "./components/Login";
import Register from "./components/Register";

import Forum from "./components/Forum";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
       <Route path="/" element={<Home/>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/single/:id" element={<Single/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/forum" element={<Forum/>}/>
      </Routes>
    </BrowserRouter>
    );
}

