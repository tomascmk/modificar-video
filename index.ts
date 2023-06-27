// index.ts
import ffmpeg from 'fluent-ffmpeg';
import got from 'got';
import cheerio from 'cheerio';

// Enums

enum ScreenSize {
  MOBILE = '640x480',
  DESKTOP = '1920x1080',
}

enum ScreenFormat {
  WIDE = '16:9',
  STANDARD = '4:3',
}

enum Language {
  ENGLISH = 'eng',
  SPANISH = 'spa',
  GERMAN = 'ger',
  FRANCE = 'fra',
}

async function obtenerVideoURL(url: string): Promise<string> {
  const response = await got(url);
  const $ = cheerio.load(response.body);
  const videoSrc = $('video').attr('src');
  return videoSrc;
}

async function modificarVideo(
  videoURL: string,
  outputVideoPath: string,
  languages: Language[],
  screenSize?: ScreenSize,
  screenFormat?: ScreenFormat,
  musicPath?: string,
  imagePaths?: string[]
) {
  const totalVideos = languages.length;

  const inputVideoPath = await obtenerVideoURL(videoURL);

  await Promise.all(
    languages.map(async (lang) => {
      const videoPath = `${outputVideoPath}_${lang}.mp4`;

      await new Promise<void>((resolve, reject) => {
        let ffmpegCommand = ffmpeg()
          .input(inputVideoPath)
          .inputOptions('-loop 1')
          .input(imagePaths[0])
          .input(imagePaths[1])
          .complexFilter([
            '[1:a]adelay=1000|1000[delayed_audio]',
            '[0:a][delayed_audio]amix=inputs=2:duration=first[final_audio]',
          ])
          .outputOptions('-shortest')
          .output(videoPath);

        if (screenSize && screenFormat) {
          ffmpegCommand = ffmpegCommand.size(screenSize).aspect(screenFormat);
        }

        ffmpegCommand
          .on('end', () => {
            console.log(`¡Video modificado en ${lang} generado exitosamente!`);
            resolve();
          })
          .on('error', (err) => {
            console.error(`Error al modificar el video en ${lang}:`, err);
            reject(err);
          })
          .run();
      });
    })
  );

  console.log('Todos los videos se han procesado.');
}

// Ejemplo de uso de la función modificarVideo con TypeScript y enumerados
const videoURL = 'https://www.youtube.com/watch?v=Vwakmn58ERI'; // URL del video a modificar
const musicPath = undefined; //'ruta/a/la/cancion.mp3';
const imagePaths = undefined; // ['ruta/a/la/imagen1.jpg', 'ruta/a/la/imagen2.jpg'];
const outputVideoPath = './videos';
const languages: Language[] = [Language.SPANISH, Language.FRANCE];
const screenSize: ScreenSize = ScreenSize.MOBILE;
const screenFormat: ScreenFormat = ScreenFormat.WIDE;

modificarVideo(
  videoURL,
  outputVideoPath,
  languages,
  screenSize,
  screenFormat,
  musicPath,
  imagePaths
).catch((err) => {
  console.error('Error al procesar los videos:', err);
});
