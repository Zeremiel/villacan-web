# Villacán · web

Web de la guardería canina **Villacán** (Moratalaz, Madrid). Es una web estática: HTML, CSS y JavaScript, sin servidor ni base de datos.

## Páginas
- `index.html`: inicio con servicios, precio, instalaciones y contacto
- `fotos.html`: galería de fotos
- `videos.html`: vídeos
- `opiniones.html`: opiniones publicadas y formulario que envía la opinión por WhatsApp

## Cómo añadir contenido
Todo el contenido que cambia a menudo está en **`js/datos.js`**:
- **Fotos:** guarda la imagen en `img/fotos/` y añade una línea en `fotos`.
- **Vídeos:** añade el código de YouTube, o guarda el archivo en `img/videos/` y añádelo en `videos`.
- **Opiniones:** añade solo opiniones reales que los dueños hayan autorizado publicar.

## Publicación
La web se publica con **GitHub Pages** desde la rama `main`, carpeta raíz. Cada vez que se hace *commit* y *push* a `main`, la web se actualiza sola en 1 o 2 minutos.

El archivo `.nojekyll` sirve para que GitHub publique los archivos tal cual, sin procesarlos.
