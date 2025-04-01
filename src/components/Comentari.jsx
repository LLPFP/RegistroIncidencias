/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";

import React, { useState } from "react";

export function Comentari() {
  const [comentario, setComentario] = useState("");
  const [fecha, setFecha] = useState("");
  const [autor, setAutor] = useState("");

  const { codigo } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDatos = {
      autor: JSON.parse(localStorage.getItem("Usuario") || "{}").nombre,
      fecha: e.target.fecha.value,
      texto: e.target.comentario.value,
    };

    const tiquets = JSON.parse(localStorage.getItem("dades_tiquets")) || [];

    tiquets.forEach((tiquet) => {
      if (tiquet.codigo === codigo) {
        console.log("Tiquet encontrado:", tiquet);
        if (!Array.isArray(tiquet.comentarios)) {
          tiquet.comentarios = [];
        }
        tiquet.comentarios.push(formDatos);
        localStorage.setItem("dades_tiquets", JSON.stringify(tiquets));
        console.log("Tiquets actualizados:", tiquets);
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex mt-5 justify-content-between">
        <h1>Añadir comentario</h1>
        <Link className="btn btn-secondary mb-5" to={`/Comentaris/${codigo}`}>
          Volver
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="form card p-3 shadow">
        <label htmlFor="comentario" className="form-label">
          Comentario:
        </label>
        <textarea
          name="comentario"
          id="comentario"
          className="form-control"
          cols="3"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required></textarea>

        <label htmlFor="fecha" className="form-label me-2 mt-3">
          Fecha:
        </label>
        <div className="d-flex align-items-center">
          <input
            type="datetime-local"
            name="fecha"
            id="fecha"
            className="form-control w-25"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success ms-auto">
            Añadir comentario
          </button>
        </div>
      </form>
    </div>
  );
}
