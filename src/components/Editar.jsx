import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

export default function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      const { data, error } = await supabase
        .from("dades_tiquets")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error al obtener el ticket:", error.message);
        return;
      }

      setTicket(data);
      setLoading(false);
    };

    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("dades_tiquets")
      .update({
        descripcion: ticket.descripcion,
        aula: ticket.aula,
        grupo: ticket.grupo,
        ordenador: ticket.ordenador,
      })
      .eq("id", id);

    if (error) {
      console.error("Error al actualizar el ticket:", error.message);
    } else {
      setMensaje("¡Cambios guardados!");
      setTimeout(() => navigate("/Pendents"), 1500); // redirige tras 1.5s
    }
  };

  if (loading) return <p>Cargando datos del ticket...</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Editar Ticket</h2>
              {mensaje && <div className="alert alert-success">{mensaje}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    value={ticket.descripcion || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="aula" className="form-label">
                    Aula
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="aula"
                    name="aula"
                    value={ticket.aula || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="grupo" className="form-label">
                    Grupo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="grupo"
                    name="grupo"
                    value={ticket.grupo || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ordenador" className="form-label">
                    PC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ordenador"
                    name="ordenador"
                    value={ticket.ordenador || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}>
                    Volver
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
