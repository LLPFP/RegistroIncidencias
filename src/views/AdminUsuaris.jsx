import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase";

export function AdminUsuaris() {
  const [usuaris, setUsuaris] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuaris = async () => {
      const { data, error } = await supabase.from("dades_alumnes").select("*");
      if (error) {
        console.error("Error cargando usuarios:", error.message);
      } else {
        setUsuaris(data);
      }
      setLoading(false);
    };

    fetchUsuaris();
  }, []);

  const handleChangeRol = async (e, id) => {
    const nuevoRol = e.target.value;

    const { error } = await supabase
      .from("dades_alumnes")
      .update({ rol: nuevoRol })
      .eq("id", id);

    if (error) {
      console.error("Error actualizando rol:", error.message);
      return;
    }

    setUsuaris((prev) =>
      prev.map((usuari) =>
        usuari.id === id ? { ...usuari, rol: nuevoRol } : usuari
      )
    );
  };

  const handleChangeField = async (e, id, field) => {
    const newValue = e.target.value;

    const { error } = await supabase
      .from("dades_alumnes")
      .update({ [field]: newValue })
      .eq("id", id);

    if (error) {
      console.error(`Error actualizando ${field}:`, error.message);
      return;
    }

    setUsuaris((prev) =>
      prev.map((usuari) =>
        usuari.id === id ? { ...usuari, [field]: newValue } : usuari
      )
    );
  };

  const eliminarUsuari = async (id) => {
    const { error } = await supabase
      .from("dades_alumnes")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("Error eliminando usuario:", error.message);
      return;
    }

    setUsuaris((prev) => prev.filter((usuari) => usuari.id !== id));
  };

  if (loading) return <p className="mt-5">Cargando usuarios...</p>;

  return (
    <div className="container mt-5">
      <h1 className="mt-3">Panell de Gestió d'Usuaris</h1>
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
              <td>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={usuari.nombre}
                  onChange={(e) => handleChangeField(e, usuari.id, "nombre")}
                />
              </td>
              <td>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  value={usuari.email}
                  onChange={(e) => handleChangeField(e, usuari.id, "email")}
                />
              </td>
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
