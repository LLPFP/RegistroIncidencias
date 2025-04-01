/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { getDadesAlumnes, setDadesAlumnes } from "../funciones/Funciones";

export function AdminUsuaris() {
  const [usuaris, setUsuaris] = useState(getDadesAlumnes());

  const [rol, setRol] = useState();

  console.log(usuaris);

  const handleChangeRol = (e) => {
    const nuevoRol = e.target.value;

    usuaris.forEach((usuari) => {
      if (usuari.id === e.target.id) {
        usuari.rol = nuevoRol;
        usuaris.push(usuari);
        setDadesAlumnes(usuaris);
        return;
      }
    });

    console.log(nuevoRol);

    console.log(usuaris);
  };

  const eliminarUsuari = (id) => {
    setUsuaris(usuaris.filter((usuari) => usuari.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="mt-3">Panell de Gestió d’Usuaris</h1>
      <table className="table table-striped table-hover table-bordered mt-5">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Accions</th>
          </tr>
        </thead>
        <tbody>
          {usuaris.map((usuari) => (
            <tr key={usuari.id}>
              <td>{usuari.id}</td>
              <td>{usuari.nombre}</td>
              <td>{usuari.email}</td>
              <td>
                <select
                  name=""
                  id=""
                  className="form-select form-select-sm"
                  onChange={handleChangeRol}
                  value={usuari.rol}>
                  <option value="Alumno">Alumno</option>
                  <option value="Profesor">Profesor</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => eliminarUsuari(usuari.id)}
                  className="btn btn-danger btn-sm">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
