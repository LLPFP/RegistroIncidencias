import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Panel from "./views/Panel";
import Registro from "./views/Registro";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Panel />} />
            <Route path="juego" element={<Registro />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
