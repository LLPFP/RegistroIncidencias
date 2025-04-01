export function getDadesTiquets() {
  try {
    const dades = localStorage.getItem("dades_tiquets");
    return dades ? JSON.parse(dades) : null;
  } catch (error) {
    console.error("Error al parsejar dades_tiquets:", error);
    return null;
  }
}

export function setDadesTiquets(dades) {
  try {
    localStorage.setItem("dades_tiquets", JSON.stringify(dades));
  } catch (error) {
    console.error("Error al serialitzar dades_tiquets:", error);
  }
}

export function getDadesAlumnes() {
  try {
    const dades = localStorage.getItem("dades_alumnes");
    return dades ? JSON.parse(dades) : null;
  } catch (error) {
    console.error("Error al parsejar dades_alumnes:", error);
    return null;
  }
}

export function setDadesAlumnes(dades) {
  try {
    localStorage.setItem("dades_alumnes", JSON.stringify(dades));
  } catch (error) {
    console.error("Error al serialitzar dades_tiquets:", error);
  }
}
