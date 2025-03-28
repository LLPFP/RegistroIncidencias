import { TiquetsPendents } from "../components/TiquetsPendents";
import { TiquetsResolts } from "../components/TiquetsResolts";

export default function Panel() {
  return (
    <>
      <main className="container mt-5">
        <h1>Administración de incidencias</h1>
        <h2 className="mt-5">Tickets pendientes</h2>
        <TiquetsPendents />
        <h2 className="mt-5">Tickets resueltos</h2>
        <TiquetsResolts />
      </main>
    </>
  );
}
