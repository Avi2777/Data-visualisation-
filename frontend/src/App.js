import './App.css';
import Applications from './pages/applications';
import EditApplication from './pages/editApplication';
import Bootcamps from './pages/bootcamps';
import Home from './pages/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react';
import '../src/tailwind.css';
import Sidebar from './components/sidebar';
import EditBootcamp from './pages/editBootcamp';
import Landing_page from "./pages/Landing_page";

function App() {
  return (
    <BrowserRouter>
            <Sidebar>
              <Routes>
                <Route path="/" element={<Landing_page />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/editApplication/:id" element={<EditApplication />} />
                <Route path="/bootcamps" element={<Bootcamps />} />
                <Route path="/editBootcamp/:id" element={<EditBootcamp />} />
              </Routes>
            </Sidebar>
    </BrowserRouter>
  );
}


export default App;
