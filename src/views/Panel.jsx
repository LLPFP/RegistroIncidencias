import { TiquetsPendents } from "../components/TiquetsPendents";
import { TiquetsResolts } from "../components/TiquetsResolts";
import { Link } from "react-router-dom";

export default function Panel() {
  return (
    <>
      <main className="container mt-5">
        <h1>Administración de incidencias</h1>
        <div className="d-flex mt-5 justify-content-between">
          <h2 className="">Tickets pendientes</h2>
          <Link className="btn btn-success mb-2" to={`/Tiquet`}>
            Crear tiquet
          </Link>
        </div>
        <TiquetsPendents />
        <h2 className="mt-5">Tickets resueltos</h2>
        <TiquetsResolts />
      </main>
    </>
  );
}
