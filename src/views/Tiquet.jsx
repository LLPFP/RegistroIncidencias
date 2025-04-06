import { useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";

export function Tiquet() {
  const [aula, setAula] = useState("");
  const [grupo, setGrupo] = useState("");
  const [ordenador, setOrdenador] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const alumnoId = user?.id;

    if (!alumnoId) {
      setMensaje("No se pudo obtener el ID del alumno.");
      return;
    }

    const fechaActual = new Date().toLocaleDateString();

    const { data, error } = await supabase.from("dades_tiquets").insert([
      {
        fecha: fechaActual,
        aula,
        grupo,
        ordenador,
        descripcion,
        alumno_id: alumnoId,
        resuelto: false,
      },
    ]);

    if (error) {
      console.error("Error al insertar tiquet:", error);
      setMensaje("Error al crear el tiquet.");
    } else {
      console.log("Tiquet creado:", data);
      setMensaje("¡Tiquet creado con éxito!");
      setAula("");
      setGrupo("");
      setOrdenador("");
      setDescripcion("");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Crear tiquet</h1>
      {mensaje && (
        <div
          className={`alert mt-4 ${
            mensaje.includes("éxito") ? "alert-success" : "alert-danger"
          }`}>
          {mensaje}
        </div>
      )}
      <div className="pt-5">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/")}>
          Volver
        </button>
        <form
          onSubmit={handleSubmit}
          className="form p-4 border shadow bordered mt-5 mx-auto"
          style={{ width: "400px" }}>
          <label className="mt-2 form-label">Aula:</label>
          <input
            type="text"
            className="form-control"
            placeholder="T7"
            value={"T" + aula}
            onChange={(e) => setAula(e.target.value)}
            required
          />

          <label className="mt-2 form-label">Grupo:</label>
          <input
            type="text"
            className="form-control"
            value={"G" + grupo}
            onChange={(e) => setGrupo(e.target.value)}
            required
          />

          <label className="mt-2 form-label">Ordenador:</label>
          <input
            type="text"
            className="form-control"
            value={"PC" + ordenador}
            onChange={(e) => setOrdenador(e.target.value)}
            required
          />

          <label className="mt-2 form-label">Descripción:</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />

          <input
            type="submit"
            className="mt-4 w-100 btn btn-primary"
            value="Crear"
          />
        </form>
      </div>
    </div>
  );
}
