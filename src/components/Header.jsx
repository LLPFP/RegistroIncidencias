import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [userRol, setUserRol] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
        setUserRol(user.user_metadata?.rol);
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session?.user;
        setUserEmail(user?.email);
        setUserRol(user?.user_metadata?.rol);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUserEmail(null);
      setUserRol(null);
      navigate("/IniciarSesion");
    }
  };

  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Gestión de incidencias FPLLEFIA</a>
          <div>
            <Link className="btn btn-primary ms-2" aria-current="page" to="/">
              PANEL
            </Link>

            {userEmail && userRol === "Administrador" && (
              <Link
                className="btn btn-primary ms-2"
                aria-current="page"
                to="/AdminUsuaris">
                Admin Usuaris
              </Link>
            )}

            {!userEmail && (
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
            <span>{userEmail}</span>
          </div>
          {userEmail && (
            <button className="btn btn-danger ms-2" onClick={handleSignOut}>
              Cerrar Sesión
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
