import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Panel from "./views/Panel";
import InicioSesion from "./views/InicioSesion";
import Registro from "./views/Registro";
import { Comentaris } from "./components/Comentaris";
import { Comentari } from "./components/Comentari";
import { Tiquet } from "./views/Tiquet";
import { AdminUsuaris } from "./views/AdminUsuaris";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Panel />} />
        <Route path="/IniciarSesion" element={<InicioSesion />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Comentaris/:codigo" element={<Comentaris />} />
        <Route path="/Comentari/:codigo" element={<Comentari />} />
        <Route path="/Tiquet" element={<Tiquet />} />
        <Route path="/AdminUsuaris" element={<AdminUsuaris />} />
      </Routes>
    </Router>
  );
}

export default App;
