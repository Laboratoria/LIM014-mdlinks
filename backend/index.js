const paths = require('path');
const fs = require('fs');
const marked = require('marked');
const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;
const fetch = require('node-fetch');
const fsPromises = require('fs').promises;

// FUNCIÓN QUE VALIDA SI LA RUTA EXISTE Y LA CONVIERTE EN ABSOLUTA CON 1 SOLO BACK SLASH
const rutaExiste = (data) =>
  fs.existsSync(data) ? paths.normalize(paths.resolve(data)) : "The path doesn't exist";
/* 
  console.log(rutaExiste(__dirname+'/pruebalinks.md'));
  console.log(__dirname); */

//FUNCIÓN QUE FILTRA LOS ARCHIVOS .MD
const tenerMd = (data) => paths.extname(data) === ".md";

//FUNCIÓN QUE VERIFICA SI ES UNA CARPETA O DIRECTORIO
const isDirectory = (data) => fs.lstatSync(data).isDirectory(); //devuelve true or false  

//FUNCIÓN RECURSIVA CUANDO EL USUARIO PASA COMO RUTA UN DIRECTORIO O CARPETA
const getFiles = (ruta) => {
  let files = [];
  if (isDirectory(ruta)) {
    fs.readdirSync(ruta).forEach(function (file) {
      let subpath = ruta + '/' + file;
      if (isDirectory(subpath)) {
        return files.push(getFiles(rutaExiste(subpath)));
      } else if (tenerMd(subpath)) {
        return files.push(rutaExiste(subpath));
      }
    });
  } else {
    if (tenerMd(ruta)) {
      files.push(rutaExiste(ruta));
    }
  }
  return files.flat();
};

const leeUnArchivo = (path) => {
  const leerMd = fs.readFileSync(path, 'utf8');
  const tokens = marked.lexer(leerMd); //The Lexer builds an array of tokens, which will be passed to the Parser.
  const html = marked.parser(tokens); //The Parser processes each token in the token array. takes tokens as input and calls the renderer functions.
  const dom = new JSDOM(html);
  let ref = dom.window.document.querySelectorAll("a"); //busco en el dom todos q tengan referencia <a href="wwww....">
  let longitud = ref.length;
  let arrayLinks = [];
  if (longitud != 0) {
    let validateLink = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    ref.forEach((ref) => {
      if (validateLink.test(ref.href)) {
        arrayLinks.push({
          href: ref.href,
          text: ref.textContent,
          file: path,
        });
      }
    })
  } 
  return arrayLinks
}

//FUNCIÓN QUE DA LECTURA A UN ARCHIVO .MD, LA CONVIERTE EN HTML Y OBTIENES LOS LINKS - RESULTADO ES UN ARREGLO
const readFile = (ruta) => {
  let arrayLinks = ruta.map((elemento) => {
    return leeUnArchivo(elemento)
  })
  return arrayLinks.flat();
};

//FUNCIÓN QUE VALIDA SI LOS LINKS ESTÁN 'OK' O 'FAIL'
const validateLinks = (data) => data.map((obj) => {
  return fetch(obj.href)
    .then((res) => {
      return {
        href: obj.href,
        text: obj.text,
        file: obj.file,
        status: res.status,
        message: res.status === 200 ? 'OK' : 'FAIL'
      }
    })
    .catch((error) => {
      return {
        href: obj.href,
        text: obj.text,
        file: obj.file,
        status: 500,
        message: "FAIL",
      }
    });
});

//FUNCIÓN MDLINKS QUE RETORNA UNA PROMESA
function mdLinks(path, option) {
  return new Promise((resolve, reject) => {
    if (rutaExiste(path)) {
      if (isDirectory(path)) {
        let files = getFiles(path);
        let arrayLinks = readFile(files);
        if (option.validate === true) {
          Promise.all(validateLinks(arrayLinks))
            .then((res) => {
              resolve(res) //creo la promesa
            })
            //es necesario ingresar un catch aquí cuando el validatelinks ya tiene el catch
        } else {
          resolve(arrayLinks)
        }
      } else {
        let files = getFiles(path);
        let arrayLinks = readFile(files);
        if (option.validate === true) {
          Promise.all(validateLinks(arrayLinks))
          .then((res) => {
            resolve(res)
          })
        } else {
          resolve(arrayLinks)
        }
      }
    } else {
      reject(console.log(chalk.rgb(218, 41, 41)('The file, directory or path does not exist or there is no file with .md extension')))
    }
  });
}

module.exports = {
  rutaExiste,
  tenerMd,
  isDirectory,
  getFiles,
  leeUnArchivo,
  readFile,
  validateLinks,
  mdLinks
};