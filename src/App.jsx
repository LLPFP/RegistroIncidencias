import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Panel from "./views/Panel";
import InicioSesion from "./views/InicioSesion";
import Registro from "./views/Registro";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Panel />} />
        <Route path="/IniciarSesion" element={<InicioSesion />} />
        <Route path="/Registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
