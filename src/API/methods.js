// modulo para trabajar con ficheros y directorios
const fs = require('fs');
// modulo para trabajar con rutas
const path = require('path');
// modulo para usar fetch en nodejs
const fetch = require('node-fetch');

const arrayRegex = {
  regexMdLinks: new RegExp(/\[([\w\s\d/.]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#-&_%~,.:]+)\)/mg),
  regxLink: new RegExp(/\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg),
  regxText: new RegExp(/\[([\w\s\d.()]+)\]/g),
};

const getLinksArray = ((route) => {
  // fs.readFileSync lee el contenido de un archivo y lo transforma a string
  const contentMD = fs.readFileSync(route, 'utf-8');
  const arrayContentURL = contentMD.match(arrayRegex.regexMdLinks);
  const linksArray = [];
  if (arrayContentURL) {
    arrayContentURL.forEach((element) => {
      const linkObject = {
        path: route,
        text: element.match(arrayRegex.regxText).join().slice(1, -1),
        href: element.match(arrayRegex.regxLink).join().slice(1, -1),
      };
      linksArray.push(linkObject);
    });
  }
  return linksArray.filter((element) => element !== undefined);
});

const getStatusLinks = (arrayLinks) => {
  const arr = arrayLinks.map((link) => fetch(link.href)
    .then((url) => (
      { status: url.status, statusText: url.statusText === 'OK' ? url.statusText : 'Fail', ...link }))
    .catch((url) => (
      { status: url.status ? url.status : 'Not defined', message: 'Fail', ...link })));
  return Promise.all(arr);
};

// función que normaliza el path y si es relativo lo convierte
// a ruta absoluta (ruta completa) y comprueba que existe, retorna boolean
const validAndResolve = (route) => {
  const pathNormalize = path.normalize(route);
  const isExist = fs.existsSync(pathNormalize) ? path.resolve(pathNormalize) : false;
  return isExist;
};

// función que verifica si es un archivo y existe
const isFile = (route) => {
  try {
    if (fs.statSync(route).isFile()) {
      return fs.existsSync(route);
    }
  } catch (err) {
    return false;
  }
  return false;
};

// función que verifica si es un archivo .md
const isMd = (route) => (path.extname(route) === '.md');

// la ruta de los archivos dentro del directorio. Devuelve un array de rutas.
const arrayDirectory = (route) => fs.readdirSync(route);

// función sincrona que recibe una ruta y verifica si es un directorio, retorna un boolean.
const isDirectory = (route) => fs.statSync(route).isDirectory();

const getLinks = (route) => {
  let arrayResult = [];
  if (isFile(route) && isMd(route)) {
    return getLinksArray(route);
  }
  if (isDirectory(route)) {
    const arrayRoutes = arrayDirectory(route);
    arrayRoutes.forEach((mdlink) => {
      if (mdlink) {
        const pathElement = validAndResolve(`${route}/${mdlink}`);
        const result = getLinks(pathElement);
        arrayResult = arrayResult.concat(result);
      }
    });
  }
  return arrayResult.filter((element) => element !== undefined);
};

const validateLinks = (url) => {
  const arrayLinks = getLinks(url);
  const result = getStatusLinks(arrayLinks);

  return result;
};

const pathRelative = (from, to) => path.relative(from, to);

module.exports = {
  pathRelative,
  isMd,
  isDirectory,
  getLinksArray,
  arrayDirectory,
  validAndResolve,
  isFile,
  getStatusLinks,
  validateLinks,
  getLinks,
};
