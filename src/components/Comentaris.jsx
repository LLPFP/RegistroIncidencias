import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function Comentaris() {
  const { codigo } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem("dades_tiquets")) || [];
    const foundTicket = tickets.find((ticket) => ticket.codigo === codigo);

    if (foundTicket) {
      setTicket(foundTicket);

      if (foundTicket.comentarios) {
        const comentariosArray = Object.values(foundTicket.comentarios);
        setComentarios(comentariosArray);
      } else {
        setComentarios([]);
      }
    }
  }, [codigo]);

  return (
    <div className="container">
      <div className="d-flex mt-5 justify-content-between">
        <h1>Comentarios</h1>
        <Link
          className="btn btn-secondary d-flex align-items-center gap-2"
          to="/">
          <i className="bi bi-arrow-left"></i>
          Volver
        </Link>{" "}
      </div>
      <h2 className="my-4">
        Código ticket: <span>{ticket?.codigo || "Cargando..."}</span>
      </h2>
      {/* Información adicional del ticket */}
      {ticket && (
        <div className="mb-4 card p-4 bg-light">
          <h3 className="border-bottom pb-2 mb-4">Información del Ticket</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <strong className="text-primary">Problema:</strong>
                <p className="ms-2">{ticket.descripcion || "No disponible"}</p>
              </div>
              <div className="mb-3">
                <strong className="text-primary">Estado:</strong>
                <span
                  className={`ms-2 badge ${
                    ticket.resuelto ? "bg-success" : "bg-warning"
                  }`}>
                  {ticket.resuelto ? "Resuelto" : "Pendiente"}
                </span>
              </div>
              <div className="mb-3">
                <strong className="text-primary">Fecha de creación:</strong>
                <p className="ms-2">{ticket.fecha || "No disponible"}</p>
              </div>
              <div className="mb-3">
                <strong className="text-primary">Alumno ID:</strong>
                <p className="ms-2">{ticket.alumno_id || "No disponible"}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <strong className="text-primary">Aula:</strong>
                <p className="ms-2">{ticket.aula || "No disponible"}</p>
              </div>
              <div className="mb-3">
                <strong className="text-primary">Grupo:</strong>
                <p className="ms-2">{ticket.grupo || "No disponible"}</p>
              </div>
              <div className="mb-3">
                <strong className="text-primary">Ordenador:</strong>
                <p className="ms-2">{ticket.ordenador || "No disponible"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-end">
        <Link
          to={`/Comentari/${ticket?.codigo}`}
          className="btn btn-success"
          title="Comentar">
          <i className="bi bi-chat-left-text"></i>Añadir comentario
        </Link>
        <div className="mt-4">
          {comentarios.length > 0 ? (
            comentarios.map((comentario, index) => (
              <div key={index} className="card p-3 mb-3">
                <h5 className="text-end">
                  Autor: <span>{comentario.autor}</span>
                  <span className="ms-4">{comentario.fecha}</span>
                </h5>
                <p>{comentario.texto}</p>
              </div>
            ))
          ) : (
            <p>No hay comentarios para este ticket.</p>
          )}
        </div>
      </div>
    </div>
  );
}
