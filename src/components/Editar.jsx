import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Editar() {
  const { codigo } = useParams(); // Obtén el código del ticket desde la URL
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem("dades_tiquets")) || [];
    const foundTicket = tickets.find((ticket) => ticket.codigo === codigo);

    if (foundTicket) {
      setTicket(foundTicket); // Establece el ticket encontrado en el estado
    }
  }, [codigo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!ticket) {
    return <p>Cargando datos del ticket...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Editar Ticket</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    value={ticket.descripcion}
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
                    value={ticket.aula}
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
                    value={ticket.grupo}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="grupo" className="form-label">
                    PC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pc"
                    name="pc"
                    value={ticket.ordenador}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
