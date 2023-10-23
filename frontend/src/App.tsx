import React from 'react';
import {  BrowserRouter,  Route,  Routes} from "react-router-dom";
import Landing from "./pages/Landing";
import ChatBot from "./pages/ChatBot";
import NavBar from "./components/NavBar";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/chat" element={<ChatBot />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
