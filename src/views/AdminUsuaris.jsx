/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { getDadesAlumnes, setDadesAlumnes } from "../funciones/Funciones";

export function AdminUsuaris() {
  const [usuaris, setUsuaris] = useState(getDadesAlumnes());
  const [rol, setRol] = useState();

  console.log(usuaris);

  const handleChangeRol = (e, id) => {
    const nuevoRol = e.target.value;

    const usuariosActualizado = usuaris.map((usuari) => {
      if (usuari.id === id) {
        return { ...usuari, rol: nuevoRol };
      }
      return usuari;
    });

    setUsuaris(usuariosActualizado);
    setDadesAlumnes(usuariosActualizado);

    console.log(nuevoRol);
    console.log(usuariosActualizado);
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
                  className="form-select form-select-sm"
                  value={usuari.rol}
                  onChange={(e) => handleChangeRol(e, usuari.id)}>
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
