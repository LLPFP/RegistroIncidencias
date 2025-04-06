import { Link } from "react-router-dom";
import { useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";
export default function Registro() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si el email ya existe
    const { data: existingUser } = await supabase
      .from("dades_alumnes")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      setMensaje("Error: El email ya está registrado");
      return;
    }

    // Registrar usuario en Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMensaje(`Error: ${error.message}`);
      return;
    }

    // Cerrar sesión inmediatamente para que no se guarde token en localStorage
    supabase.auth.signOut();
    navigate("/IniciarSesion");
    // Guardar datos adicionales
    const { error: dbError } = await supabase.from("dades_alumnes").insert([
      {
        id: data.user.id,
        nombre,
        email,
        password,
        rol: "Alumno",
      },
    ]);

    if (dbError) {
      setMensaje(`Error al guardar en la base de datos: ${dbError.message}`);
      return;
    }

    setEmail("");
    setNombre("");
    setPassword("");
  };
  return (
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
            required
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
            required
          />

          <label htmlFor="pass" className="mt-2 form-label">
            Contraseña:
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="mt-4 w-100 btn btn-primary">
            Registrarse
          </button>
        </form>
      </div>
    </main>
  );
}
