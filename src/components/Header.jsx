import { Link } from "react-router-dom"; // Asegúrate de usar react-router-dom

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Gestión de incidencias FPLLEFIA</a>
          <div>
            <Link className="btn btn-primary ms-2" aria-current="page" to="/">
              PANEL
            </Link>
            {!localStorage.getItem("Usuario") && (
              <>
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
                </Link>
              </>
            )}
          </div>
          <div>
            <span>
              {JSON.parse(localStorage.getItem("Usuario") || '""').email}
            </span>
          </div>
          {localStorage.getItem("Usuario") && (
            <Link
              className="btn btn-danger ms-2"
              aria-current="page"
              onClick={() => {
                localStorage.removeItem("Usuario");
                window.location.reload();
                window.location.replace("/IniciarSesion");
              }}>
              Cerrar Sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
