import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function Comentaris() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    // Get ticket data from localStorage
    const tickets = JSON.parse(localStorage.getItem("dades_tiquets")) || [];
    const foundTicket = tickets.find((ticket) => ticket.codigo === id);

    if (foundTicket) {
      setTicket(foundTicket);

      // Convert the comentarios object to an array
      if (foundTicket.comentarios) {
        const comentariosArray = Object.values(foundTicket.comentarios);
        setComentarios(comentariosArray);
      } else {
        setComentarios([]);
      }
    }
  }, [id]);

  return (
    <div className="container">
      <div className="d-flex mt-5 justify-content-between">
        <h1>Comentarios</h1>
        <Link className="btn btn-secondary" to="/">
          Volver
        </Link>
      </div>
      <h2 className="my-4">
        Código ticket: <span>{ticket?.codigo || "Cargando..."}</span>
      </h2>

      <div className="text-end">
        <Link className="btn btn-success" to={`/Comentari/${id}`}>
          Añadir comentario
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
