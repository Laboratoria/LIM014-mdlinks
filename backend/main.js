const {pathNode, rutaExiste,tenerMd,isDirectory,getFiles,readFile,validateLinks,} = require('./index.js');

function mdLinks(path, option) {
    if (rutaExiste(path)) {
        console.log('hola Kathy');
        
        let files = [];
        if (isDirectory(path)) {
            console.log('directorio');
            console.log(files);
        } else {
            console.log('archivo');
        }
    } 
}
console.log(mdLinks(pathNode));


if (path.indexOf("\\") == -1) { //si no lo encuentra, es el nombre del archivo  
    path1 = pathNode.resolve(path); //get the absolute path calculation of a relative path
    fileExists = fs.existsSync(path1);
   if (fileExists === true && path1.slice(-3) === ".md") {   
       console.log('analizar archivo');
       console.log('es un archivo .MD');
       console.log(fileExists);

       if (option === "--validate") {
           console.log("CLI validate");
       } else if (option === "--stats" && option2 === undefined) {
           console.log("CLI stats");
       } else if (option === "--stats" && option2 === "--validate" ) {
           console.log("CLI stats y validate");
       } 

   } else { 
       console.log('no existe archivo o NO es un archivo .MD');
   }
   console.log('es ruta relativa');
} else {
   fileExists = fs.existsSync(path);
   if (fileExists === true) {   
       console.log('analizar archivo 2');    
   } else { 
       console.log('no existe archivo 2');
   }
   console.log('es una ruta absoluta');
}