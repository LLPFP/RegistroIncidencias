import { Link } from "react-router-dom";
import { useState } from "react";

export default function Registro() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosExistentes =
      JSON.parse(localStorage.getItem("dades_alumnes")) || [];
    const userExists = datosExistentes.some((user) => user.email === email);

    if (userExists) {
      setMensaje("El usuario ya existe. Por favor, utilice otro email.");
      return;
    }

    const datosUsuario = {
      id: String(datosExistentes.length + 1),
      nombre,
      email,
      password,
      rol: "Alumno",
    };

    datosExistentes.push(datosUsuario);
    localStorage.setItem("dades_alumnes", JSON.stringify(datosExistentes));
    setMensaje("¡Registro completado con éxito!");

    // Limpiar los campos del form del registro
    setEmail("");
    setNombre("");
    setPassword("");
  };
  return (
    <>
      <main className="container mt-5">
        <div className="pt-5">
          <h1 className="w-100 text-center">Registro</h1>
          {mensaje && (
            <div
              className={`mt-5 alert ${
                mensaje.includes("éxito") ? "alert-success" : "alert-danger"
              } text-center`}>
              {mensaje}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="form p-4 border shadow bordered mt-5 mx-auto"
            style={{ width: "400px" }}>
            <label htmlFor="email" className="mt-2 form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="usuario@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="nombre" className="mt-2 form-label">
              Nombre:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <label htmlFor="pass" className="mt-2 form-label">
              Contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="mt-4 w-100 btn btn-primary">
              Registrarse
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
