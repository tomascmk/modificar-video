# Modificar Video

Este proyecto te permite modificar un video agregando música de fondo y superponiendo imágenes.

## Instalación

Para comenzar a utilizar este proyecto, sigue estos pasos:

1. Clona el repositorio: `git clone https://github.com/tu-usuario/modificar-video.git`
2. Ingresa al directorio del proyecto: `cd modificar-video`
3. Instala las dependencias: `npm install`

## Uso

1. Modifica el archivo `index.ts` con tu código personalizado.
2. Ejecuta el script de compilación de TypeScript: `npm run build`.
3. Ejecuta el script principal para modificar el video: `npm start`.

## Configuración

El archivo `index.ts` contiene la función `modificarVideo` con los siguientes parámetros:

- `videoURL`: La URL del video a modificar.
- `musicPath`: La ruta al archivo de música de fondo.
- `imagePaths`: Un array con las rutas de las imágenes a superponer.
- `outputVideoPath`: La ruta de salida para el video modificado.
- `languages`: Un array con los idiomas en los que se generará el video.
- `screenSize` (opcional): El tamaño de pantalla deseado (valores disponibles: `MOBILE`, `DESKTOP`).
- `screenFormat`
