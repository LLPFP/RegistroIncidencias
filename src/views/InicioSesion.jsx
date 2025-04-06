/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

export default function InicioSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from("dades_alumnes")
          .select("rol")
          .eq("email", user.user.email)
          .single();

        if (userData) {
          localStorage.setItem("userRole", userData.rol);
          await supabase.auth.updateUser({
            data: { rol: userData.rol },
          });
        }
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Error de autenticación:", error.message);
      setError("Email o contraseña incorrectos");
      return;
    }

    const { data: userData, error: userError } = await supabase
      .from("dades_alumnes")
      .select("id, email, rol")
      .eq("email", email)
      .single();

    if (userError) {
      console.log("Error obteniendo datos del usuario:", userError.message);
      setError("No se pudo obtener información del usuario.");
      return;
    }

    localStorage.setItem("userRole", userData.rol);
    await supabase.auth.updateUser({
      data: { rol: userData.rol },
    });
    console.log("Usuario autenticado:", userData);
    navigate("/");
    window.location.reload();
  };

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="form p-4 border shadow bordered mt-5 mx-auto"
          style={{ width: "400px" }}>
          <label htmlFor="email" className="mt-2 form-label">
            User:
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="usuario@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          {error && <div className="text-danger mt-2">{error}</div>}

          <input
            type="submit"
            className="mt-4 w-100 btn btn-primary"
            value="Entrar"
          />
        </form>
      </div>
    </main>
  );
}
