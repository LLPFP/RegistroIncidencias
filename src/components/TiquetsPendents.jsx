import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../utils/supabase";

export function TiquetsPendents() {
  const [tickets, setTickets] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from("dades_tiquets")
      .select("*, dades_alumnes(email)")
      .eq("resuelto", false);
    if (!error) setTickets(data);
  };

  useEffect(() => {
    fetchTickets();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUsuario(user);

      if (user) {
        // Buscar el rol del usuario en la tabla "dades_alumnes"
        const { data: alumno, error } = await supabase
          .from("dades_alumnes")
          .select("rol")
          .eq("email", user.email)
          .single();

        if (!error) {
          setUserRole(alumno.rol);
        } else {
          console.error(
            "Error obteniendo rol desde dades_alumnes:",
            error.message
          );
        }
      }
    };

    getUser();

    const channel = supabase
      .channel("realtime-tiquets-pendents")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "dades_tiquets",
        },
        (payload) => {
          console.log("Cambio detectado en tickets:", payload);
          fetchTickets();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleDelete = async (id) => {
    await supabase.from("dades_tiquets").delete().eq("id", id);
  };

  const handleResolver = async (id) => {
    try {
      const fechaResuelto = new Date().toISOString().split("T")[0];
      const { error } = await supabase
        .from("dades_tiquets")
        .update({ resuelto: true, fecha_resuelto: fechaResuelto })
        .eq("id", id);

      if (error) {
        console.error("Error al resolver ticket:", error.message);
        return;
      }

      fetchTickets(); // Actualizar la lista después de resolver
    } catch (error) {
      console.error("Error al resolver ticket:", error);
    }
  };

  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>Código</th>
          <th>Fecha</th>
          <th>Aula</th>
          <th>Grupo</th>
          <th>Ordenador</th>
          <th>Descripción</th>
          <th>Alumno</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id}>
            <td>{ticket.id}</td>
            <td>{ticket.fecha}</td>
            <td>{ticket.aula}</td>
            <td>{ticket.grupo}</td>
            <td>{ticket.ordenador}</td>
            <td>{ticket.descripcion}</td>
            <td>{ticket.dades_alumnes?.email}</td>
            <td>
              {userRole === "Administrador" && (
                <button
                  className="btn btn-success"
                  title="Resolver ticket"
                  onClick={() => handleResolver(ticket.id)}>
                  <i className="bi bi-check-circle me-2"></i>
                  Resolver
                </button>
              )}
            </td>
            <td>
              {(userRole === "Administrador" ||
                usuario?.id === ticket.alumno_id) && (
                <Link
                  to={`/Editar/${ticket.id}`}
                  className="btn btn-warning"
                  title="Editar ticket">
                  <i className="bi bi-pencil me-2"></i>Editar
                </Link>
              )}
            </td>
            <td>
              <Link
                to={`/Comentaris/${ticket.id}`}
                className="btn btn-info"
                title="Ver comentarios">
                <i className="bi bi-chat-left-text me-2"></i>Ver
              </Link>
            </td>
            <td>
              {(userRole === "Administrador" ||
                usuario?.id === ticket.alumno_id) && (
                <button
                  className="btn btn-danger"
                  title="Eliminar ticket"
                  onClick={() => handleDelete(ticket.id)}>
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
