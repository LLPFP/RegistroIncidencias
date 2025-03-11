import { Link } from "react-router-dom"; // Asegúrate de usar react-router-dom

export default function Header() {
  return (
    <>
      <header>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand">Gestión de incidencias FPLLEFIA</a>
            <div>
              <Link className="btn btn-primary ms-2" aria-current="page" to="/">
                PANEL
              </Link>{" "}
              <Link
                className="btn btn-primary ms-2"
                aria-current="page"
                to="/IniciarSesion">
                LOGIN
              </Link>
              <Link
                className="btn btn-primary ms-2"
                aria-current="page"
                to="/Registro">
                REGISTRO
              </Link>{" "}
            </div>
            <div>
              <span>administrador@fpllefia.com</span>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
