import { Link } from "react-router-dom";
import { useState } from "react";

const dades_usuaris = [
  { email: "user@mail.com", password: "1234" },
  { email: "admin@mail.com", password: "admin" },
];

export default function InicioSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuariValid = dades_usuaris.find(
      (user) => user.email === email && user.password === password
    );

    if (usuariValid) {
      setError("");
      // Aquí podríem redirigir o fer login
    } else {
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
              onChange={(e) => setEmail(e.target.value)}
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
