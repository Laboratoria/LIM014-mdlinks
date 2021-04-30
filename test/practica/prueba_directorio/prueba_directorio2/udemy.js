'use strict'

var mongoose = require('mongoose'); // estoy importando el módulo de mongoose
mongoose.Promise = global.Promise; // para realizar la conexión a la bd
mongoose.connect ('mongodb://localhost:27017/udemy') //conexión a la bd

var div_usuarios = document.querySelector('#usuarios');
/* var usuarios = []; */
var div_janet = document.querySelector('#janet');

/* fetch('https://reqres.in/api/users') //accede a unos datos remotos, hace la petición y se queda a la espera */

getUsuarios()
  .then((data) => {data.json()}) // y cuando recibamos esos datos, con esta 1ra promesa capturamos los datos y lo convertimos a un objeto json
  //se cumple esa promesa y queda en espera para la sgte
  .then((user) => { //ya tenemos los datos recogidos y en la variable usuarios la guardamos
    /* usuarios = user.data; */
    /* console.log(usuarios); */

    listadoUsuarios(user.data);
    return getJanet();
 
  })
  .then(data => data.json())
  .then(user => {
    mostrarJanet(user);
  })

function getUsuarios () {
  return fetch('https://reqres.in/api/users')
}

function getJanet () {
  return fetch('https://reqres.in/api/users/2')
}

function listadoUsuarios (usuarios) {
    usuarios.map ((user, i) => {
      let nombre = document.createElement('h2');
      nombre.innerHTML = i +"-" + user.first_name;
      div_usuarios.appendChild(nombre);
      document.querySelector('.loading').style.display ='none';
    })
  }

function mostrarJanet (user) {
      let nombre = document.createElement('h4');
      let avatar = document.createElement('img');
      nombre.innerHTML = user.first_name;
      avatar.src = user.avatar;
      avatar.width = '100';
      div_janet.appendChild(nombre);
      div_janet.appendChild(avatar);
      document.querySelector('.loading').style.display ='none';
    
  }

//EXPRESIONES REGULARES

var r = new RegExp('^(?:[a-z]+:)?//', 'i');
// expresión regular es más universal, independiente del protocolo y, con la ‘i’ del segundo parámetro,
// se le indica que no distinga entre mayúsculas y minúsculas. Esta expresión regular es la que define 
//la estructura inicial de una ruta o URL absoluta.
//La explicación de cada uno de los elementos de la expresión regular utilizada (^(?:[a-z]+:)?//) es la siguiente:

r.test('http://ejemplo.com'); // true - URL absoluta típica del protocolo http
r.test('HTTP://EJEMPLO.COM'); // true - URL absoluta del protocolo http en mayúsculas
r.test('https://www.ejemplo.com'); // true - URL absoluta del protocolo https (secure http)
r.test('ftp://ejemplo.com/fichero.txt'); // true - URL absoluta, protocolo FTP (file transfer protocol)
r.test('//cdn.ejemplo.com/lib.js'); // true - URL absoluta, relativa al protocolo
r.test('/directorio/prueba.txt'); // false - URL relativa
r.test('test'); // false - URL relativa