import { Link } from "react-router-dom";

export function TiquetsResolts() {
  const tickets = JSON.parse(localStorage.getItem("dades_tiquets")) || [];

  const handleDelete = (codigo) => {
    const filteredTickets = tickets.filter(
      (ticket) => ticket.codigo !== codigo
    );

    localStorage.setItem("dades_tiquets", JSON.stringify(filteredTickets));
    window.location.reload();
  };

  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>Código</th>
          <th>Fecha</th>
          <th>Fecha resuelto</th>
          <th>Aula</th>
          <th>Grupo</th>
          <th>Ordenador</th>
          <th>Descripción</th>
          <th>Alumno</th>
        </tr>
      </thead>
      <tbody>
        {tickets
          .filter((ticket) => ticket.resuelto === true)
          .map((ticket) => (
            <tr key={ticket.codigo}>
              <td>{ticket.codigo}</td>
              <td>{ticket.fecha}</td>
              <td>{ticket.fechaResuelto}</td>
              <td>{ticket.aula}</td>
              <td>{ticket.grupo}</td>
              <td>{ticket.ordenador}</td>
              <td>{ticket.descripcion}</td>
              <td>{ticket.alumno_id}</td>
              <td></td>
              <td>
                {localStorage.getItem("Usuario") &&
                  (JSON.parse(localStorage.getItem("Usuario")).rol ===
                    "Administrador" ||
                    JSON.parse(localStorage.getItem("Usuario")).id ===
                      ticket.alumno_id) && (
                    <Link
                      to={`/Editar/${ticket.codigo}`}
                      className="btn btn-warning"
                      title="Editar ticket">
                      <i className="bi bi-pencil me-2"></i>Editar
                    </Link>
                  )}
              </td>
              <td>
                <Link
                  to={`/Comentaris/${ticket.codigo}`}
                  className="btn btn-info"
                  title="Ver comentarios">
                  <i className="bi bi-chat-left-text me-2"></i>Ver
                </Link>
              </td>
              <td>
                {localStorage.getItem("Usuario") &&
                  (JSON.parse(localStorage.getItem("Usuario")).rol ===
                    "Administrador" ||
                    JSON.parse(localStorage.getItem("Usuario")).id ===
                      ticket.alumno_id) && (
                    <button
                      className="btn btn-danger"
                      title="Eliminar ticket"
                      onClick={() => handleDelete(ticket.codigo)}>
                      <i className="bi bi-trash3 me-2"></i>Eliminar
                    </button>
                  )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
