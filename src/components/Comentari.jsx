export function Comentari() {
  return (
    <form action="" className="form card p-3 shadow">
      <label htmlFor="comentario" className="form-label">
        Comentario:
      </label>
      <textarea className="form-control" cols="3"></textarea>
      <label htmlFor="fecha" className="form-label me-2 mt-3">
        Fecha:
      </label>
      <div className="d-flex align-items-center">
        <input type="datetime-local" className="form-control w-25" />
        <button className="btn btn-success ms-auto">Añadir comentario</button>
      </div>
    </form>
  );
}
