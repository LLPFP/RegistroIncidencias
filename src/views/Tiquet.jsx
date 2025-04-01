/* eslint-disable no-unused-vars */
import { useState } from "react";
import { getDadesTiquets, setDadesTiquets } from "../funciones/Funciones";

export function Tiquet() {
  const [codigo, setCodigo] = useState();
  const [fecha, setFecha] = useState();
  const [aula, setAula] = useState("");
  const [grupo, setGrupo] = useState("");
  const [ordenador, setOrdenador] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [alumno_id, setAlumno_id] = useState();
  const [resuelto, setResuelto] = useState(false);
  const [comentarios, setComentarios] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tickets = JSON.parse(localStorage.getItem("dades_tiquets")) || [];

    const fechaActual = new Date().toLocaleDateString();

    let codigoGenerado = tickets.length + 1;

    const usuario = JSON.parse(localStorage.getItem("Usuario"));
    const alumnoId = usuario?.id;
    setCodigo(codigoGenerado);
    setFecha(fechaActual);
    setAlumno_id(alumnoId);

    console.log(alumnoId);
    console.log("Datos introducidos:", {
      codigo: String(codigoGenerado),
      fecha: fechaActual,
      aula,
      grupo,
      comentarios,
      ordenador,
      descripcion,
      alumno_id: alumnoId,
      resuelto,
    });

    const datosTiquetNuevo = {
      codigo: String(codigoGenerado),
      fecha: fechaActual,
      aula,
      grupo,
      comentarios,
      ordenador,
      descripcion,
      alumno_id: alumnoId,
      resuelto,
    };

    tickets.push(datosTiquetNuevo);
    setDadesTiquets(tickets);

    console.log(getDadesTiquets());
  };

  return (
    <>
      <div className="container mt-5">
        <h1>Crear tiquet</h1>
        <div className="pt-5">
          <form
            onSubmit={handleSubmit}
            className="form p-4 border shadow bordered mt-5 mx-auto"
            style={{ width: "400px" }}>
            <label htmlFor="email" className="mt-2 form-label">
              Aula:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="T7"
              value={aula}
              onChange={(e) => {
                setAula(e.target.value);
              }}
            />

            <label htmlFor="pass" className="mt-2 form-label">
              Grupo:
            </label>
            <input
              type="text"
              className="form-control"
              value={grupo}
              onChange={(e) => {
                setGrupo(e.target.value);
              }}
            />
            <label htmlFor="pass" className="mt-2 form-label">
              Ordenador:
            </label>
            <input
              type="text"
              className="form-control"
              value={ordenador}
              onChange={(e) => {
                setOrdenador(e.target.value);
              }}
            />
            <label htmlFor="pass" className="mt-2 form-label">
              Ordenador:
            </label>
            <textarea
              type="text"
              className="form-control"
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
            />

            <input
              type="submit"
              className="mt-4 w-100 btn btn-primary"
              value="Crear"
            />
          </form>
        </div>
      </div>
    </>
  );
}
