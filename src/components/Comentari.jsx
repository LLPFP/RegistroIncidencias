import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import supabase from "../utils/supabase";

export function Comentari() {
  const [comentario, setComentario] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 16)); // Formato datetime-local
  const [mensaje, setMensaje] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setMensaje({ tipo: "error", texto: "Usuario no identificado." });
      return;
    }

    const { data: ticket, error: ticketError } = await supabase
      .from("dades_tiquets")
      .select()
      .eq("id", id)
      .single();

    if (ticketError || !ticket) {
      setMensaje({ tipo: "error", texto: "El ticket no existe." });
      return;
    }

    const nuevoComentario = {
      ticket_id: ticket.id,
      autor: user.email,
      fecha,
      texto: comentario,
    };

    const { error } = await supabase
      .from("comentarios")
      .insert([nuevoComentario]);

    if (error) {
      console.error("Error al insertar comentario:", error.message);
      setMensaje({ tipo: "error", texto: "No se pudo guardar el comentario." });
    } else {
      setMensaje({ tipo: "exito", texto: "Comentario añadido con éxito." });
      setTimeout(() => navigate(`/Comentaris/${id}`), 1500);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex mt-5 justify-content-between">
        <h1>Añadir comentario</h1>
        <Link className="btn btn-secondary mb-5" to={`/Comentaris/${id}`}>
          Volver
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="form card p-3 shadow">
        {mensaje && (
          <div
            className={`alert ${
              mensaje.tipo === "error" ? "alert-danger" : "alert-success"
            }`}>
            {mensaje.texto}
          </div>
        )}

        <label htmlFor="comentario" className="form-label">
          Comentario:
        </label>
        <textarea
          name="comentario"
          id="comentario"
          className="form-control"
          rows="3"
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
