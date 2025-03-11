export default function InicioSesion() {
  return (
    <>
      <main class="container mt-5">
        <div class="pt-5">
          <h1 class="w-100 text-center">Login</h1>
          <form
            action=""
            class="form p-4 border shadow bordered mt-5 mx-auto"
            style="width: 400px;">
            <label for="email" class="mt-2 form-label">
              User:{" "}
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="usuario@mail.com"
            />

            <label for="pass" class="mt-2 form-label">
              Contraseña:{" "}
            </label>
            <input type="text" class="form-control" />

            <input
              type="text"
              class="mt-4 w-100 btn btn-primary"
              value="Entrar"
              id="enviar"
            />
          </form>
        </div>
      </main>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Observaciones
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>
                Código incidencia: <span>123546</span>
              </p>
              <label for="comentario" class="form-label">
                Comentario:
              </label>
              <textarea class="form-control">
                Estee es un comentario sobre esta incidencia
              </textarea>
              <p class="small text-end">
                Autor: <span>Pepe Loco</span>
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="button" class="btn btn-primary">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
