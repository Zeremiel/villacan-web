/* =====================================================================
   VILLACÁN · CONTENIDO EDITABLE DE LA WEB
   Aquí se añaden las fotos, los vídeos y las opiniones publicadas.
   ===================================================================== */
window.VILLACAN = {

  /* ---------- FOTOS ----------
     Guarda la foto en la carpeta  img/fotos/  y añade una línea así:
       { archivo: "img/fotos/luna-jugando.jpg", texto: "Luna jugando con la pelota" },
  */
  fotos: [
  ],

  /* ---------- VÍDEOS ----------
     De YouTube (recomendado, carga más rápido):
       { tipo: "youtube", id: "CODIGO_DEL_VIDEO", titulo: "Hora del recreo" },
     El código es lo que va detrás de  watch?v=  en el enlace de YouTube.

     O un archivo de vídeo guardado en  img/videos/ :
       { tipo: "archivo", archivo: "img/videos/siesta.mp4", titulo: "La siesta" },
  */
  videos: [
  ],

  /* ---------- OPINIONES ----------
     Solo opiniones REALES que te hayan enviado los dueños y que hayan
     aceptado que se publiquen. Ejemplo de formato:
       { nombre: "Nombre", perro: "Nombre del perro", estrellas: 5,
         texto: "Lo que escribió el dueño", fecha: "noviembre 2026" },
  */
  opiniones: [
  ],

  /* ---------- PERROS (álbumes) ----------
     Cada perro tiene su álbum en la página de FOTOS: sale su primera foto
     como portada y al pulsarla se abre una galería con todas sus fotos.
     Con  destacado: true  sale además en la página de INICIO (máximo 3).
     Las fotos van en  img/perros/NOMBRE/  y solo con permiso de sus dueños.
  */
  perros: [
    {
      nombre: "Camarón",
      destacado: true,
      descripcion: "Fan de la pelota y de las siestas largas.",
      fotos: [
        { archivo: "img/perros/camaron/camaron-pelota.jpg", texto: "¿Jugamos? ¡La pelota es mía!" },
        { archivo: "img/perros/camaron/camaron-durmiendo.jpg", texto: "Siesta después de jugar" }
      ]
    }
  ]
};
