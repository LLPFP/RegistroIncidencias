const tickets = [
  {
    codigo: "123460",
    fecha: "19/04/2023",
    aula: "T8",
    grupo: "DAW2",
    ordenador: "PC4",
    descripcion: "Problema de acceso a archivos",
    alumno_id: "1",
    resuelto: false,
    comentarios: {
      Pedro: {
        autor: "Pedro",
        fecha: "19/04/2023",
        texto:
          "Hola, he intentado resolver el problema pero no he conseguido nada. ¿Podrías ayudarme?",
      },
    },
  },
  {
    codigo: "123461",
    fecha: "20/04/2023",
    aula: "T6",
    grupo: "DAW1",
    ordenador: "PC1",
    descripcion: "Aplicación se cierra inesperadamente",
    alumno_id: "2",
    resuelto: false,
    comentarios: {
      Juan: {
        autor: "Juan",
        fecha: "22/04/2023",
        texto:
          "He revisado el equipo y parece ser un problema de configuración de red. Lo investigaré más a fondo.",
      },
      Maria: {
        autor: "Maria",
        fecha: "23/04/2023",
        texto:
          "He comprobado los cables de red y están correctamente conectados. Debe ser un problema de software.",
      },
    },
  },
  {
    codigo: "123462",
    fecha: "21/04/2023",
    aula: "T7",
    grupo: "DAW2",
    ordenador: "PC2",
    descripcion: "Problema de conexión a la red",
    alumno_id: "3",
    resuelto: false,
    comentarios: {
      Ana: {
        autor: "Ana",
        fecha: "21/04/2023",
        texto:
          "He detectado que el cable de red está dañado. Procederé a reemplazarlo.",
      },
      Carlos: {
        autor: "Carlos",
        fecha: "22/04/2023",
        texto: "Cable reemplazado. Por favor verifica si el problema persiste.",
      },
    },
  },
  {
    codigo: "123463",
    fecha: "22/04/2023",
    aula: "T8",
    grupo: "DAW1",
    ordenador: "PC3",
    descripcion: "Archivos corruptos",
    alumno_id: "4",
    resuelto: false,
    comentarios: {
      Pedro: {
        autor: "Pedro",
        fecha: "25/04/2023",
        texto: "He revisado el equipo y necesita actualización de drivers.",
      },
      Laura: {
        autor: "Laura",
        fecha: "26/04/2023",
        texto: "Drivers actualizados, realizando pruebas de funcionamiento.",
      },
    },
  },
  {
    codigo: "123457",
    fecha: "16/04/2023",
    fechaResuelto: "15/05/2023",
    aula: "T7",
    grupo: "DAW2",
    ordenador: "PC1",
    descripcion: "Problema de conexión a Internet",
    alumno_id: "5",
    resuelto: true,
    comentarios: {},
  },
  {
    codigo: "123458",
    fecha: "17/04/2023",
    fechaResuelto: "15/05/2023",
    aula: "T8",
    grupo: "DAW1",
    ordenador: "PC2",
    descripcion: "Pantalla en blanco",
    alumno_id: "6",
    resuelto: true,
    comentarios: {},
  },
  {
    codigo: "123459",
    fecha: "18/04/2023",
    fechaResuelto: "15/05/2023",
    aula: "T8",
    grupo: "DAW1",
    ordenador: "PC3",
    descripcion: "Error de impresora",
    alumno_id: "7",
    resuelto: true,
    comentarios: {},
  },
];

export default tickets;

export const alumnos = [
  {
    id: "1",
    nombre: "Pedro Gómez",
    email: "pedro.gomez@example.com",
    password: "123456",
  },
  {
    id: "2",
    nombre: "Sofía Fernández",
    email: "sofia.fernandez@example.com",
    password: "123456",
  },
  {
    id: "3",
    nombre: "Luis Torres",
    email: "luis.torres@example.com",
    password: "123456",
  },
  {
    id: "4",
    nombre: "Carolina Ramírez",
    email: "carolina.ramirez@example.com",
    password: "123456",
  },
  {
    id: "5",
    nombre: "Maria López",
    email: "maria.lopez@example.com",
    password: "123456",
  },
  {
    id: "6",
    nombre: "Juan Rodríguez",
    email: "juan.rodriguez@example.com",
    password: "123456",
  },
  {
    id: "7",
    nombre: "Ana Martínez",
    email: "ana.martinez@example.com",
    password: "123456",
  },
];
localStorage.setItem("dades_tiquets", JSON.stringify(tickets));
localStorage.setItem("dades_alumnes", JSON.stringify(alumnos));
