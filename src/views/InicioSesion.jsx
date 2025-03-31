import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InicioSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("Usuario");
    if (Usuario) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos introducidos:", { email, password });
    const usuariValid = JSON.parse(localStorage.getItem("dades_alumnes")).find(
      (Usuario) => Usuario.email === email && Usuario.password === password
    );

    if (usuariValid) {
      console.log("Usuario válido:", usuariValid);
      setError("");
      localStorage.setItem("user", JSON.stringify(usuariValid));
      navigate("/");
    } else {
      console.log("Error de autenticación: credenciales incorrectas");
      setError("Email o contrasenya incorrectes");
    }
  };

  return (
    <>
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
              onChange={(e) => {
                setEmail(e.target.value);
                console.log("Email introducido:", e.target.value);
              }}
            />

            <label htmlFor="pass" className="mt-2 form-label">
              Contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                console.log("Contraseña introducida:", e.target.value);
              }}
            />

            {error && <div className="text-danger mt-2">{error}</div>}

            <input
              type="submit"
              className="mt-4 w-100 btn btn-primary"
              value="Entrar"
              id="enviar"
            />
          </form>
        </div>
      </main>
    </>
  );
}
