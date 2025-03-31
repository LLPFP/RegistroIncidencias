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
                <button className="btn btn-warning" title="Añadir comentario">
                  <i
                    className="bi bi-pencil"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"></i>
                  Editar
                </button>
              </td>
              <td>
                <button className="btn btn-info" title="Ver comentarios">
                  <i className="bi bi-chat-left-text"></i>
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  title="Eliminar ticket"
                  onClick={() => handleDelete(ticket.codigo)}>
                  <i className="bi bi-trash3"></i>Eliminar
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
