// modulo para trabajar con ficheros y directorios
const fs = require('fs');
// modulo para trabajar con rutas
const path = require('path');
// modulo para usar fetch en nodejs
const fetch = require('node-fetch');
// función sincrona que recibe una ruta y verifica si es un directorio, retorna un boolean.
const isDirectory = (route) => fs.statSync(route).isDirectory();

// función que lee el contenido de un archivo y lo transforma a string
const readFile = (route) => fs.readFileSync(route, 'utf-8');

const arrayRegex = {
  regexMdLinks: new RegExp(/\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#-&_%~,.:]+)\)/mg),
  regxLink: new RegExp(/\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg),
  regxText: new RegExp(/\[([\w\s\d.()]+)\]/g),
};

const getLinksArray = ((route) => {
  const contentMD = readFile(route);
  const arrayContentURL = contentMD.match(arrayRegex.regexMdLinks);
  const linksArray = [];
  if (arrayContentURL) {
    arrayContentURL.forEach((element) => {
      const linkObject = {
        path: route,
        text: element.match(arrayRegex.regxText).join().slice(1, -1),
        href: element.match(arrayRegex.regxLink).join().slice(1, -1),
      //     text: text,
      };
      linksArray.push(linkObject);
    });
    return linksArray;
  }
  return linksArray.filter((element) => element !== undefined);
});

const getStatusLinks = (arrayLinks) => {
  const arr = arrayLinks.map((link) => fetch(link.href)
    .then((url) => ({ status: url.status, message: url.statusText, ...link }))

    .catch((url) => ({ status: url.status ? url.status : 'Not defined', message: 'FAIL', ...link })));
  return Promise.all(arr);
};

const validAndResolve = (route) => {
  const pathNormalize = path.normalize(route);
  const isExist = fs.existsSync(pathNormalize) ? path.resolve(pathNormalize) : false;
  return isExist;
};

const isFile = (route) => {
  if (fs.statSync(route).isFile()) {
    return fs.existsSync(route);
  }
  return false;
};
// función que verifica si es un archivo .md
const isMd = (route) => (path.extname(route) === '.md');

// la ruta de los archivos dentro del directorio. Devuelve un array de rutas.
const arrayDirectory = (route) => fs.readdirSync(route);

const getLinks = (route) => {
  let arrayResult = [];
  if (isFile(route) && isMd(route)) {
    return getLinksArray(route);
  }
  if (isDirectory(route)) {
    const arrayRoutes = arrayDirectory(route);
    const routesMD = arrayRoutes.filter((file) => file.endsWith('.md'));
    routesMD.forEach((mdlink) => {
      if (mdlink) {
        const result = getLinks(mdlink);
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

module.exports = {
  isMd,
  isDirectory,
  getLinksArray,
  arrayDirectory,
  readFile,
  validAndResolve,
  isFile,
  getStatusLinks,
  validateLinks,
  getLinks,
};
