#!/usr/bin/env node

const program = require('commander');
const { mdLinks } = require('../API/md-links.js');
const md = require('./methods.js');

/* const {
  getStatusLinks,
} = require('../API/methods.js'); */

program
  .arguments('<path>')
  .option('-v, --validate', 'Validar links con peticiones HTTP')
  .option('-s, --stats', 'Mostrar las estadísticas básicas de los links')
  .parse(process.argv);

const options = {
  validate: program.opts().validate,
  stats: program.opts().stats,
};

const myPath = program.args[0] ? program.args[0] : 'Error';
const inputs = process.argv.length;

const cli = (route) => {
  if (options.validate && inputs === 4) {
    mdLinks(route, { validate: true })
      .then((obj) => console.table(md.showResult(obj)));
  } else if (options.stats && inputs === 4) {
    mdLinks(route, { validate: true })
      .then((obj) => md.showStats(obj, false));
  } else if (options.validate && options.stats && inputs === 5) {
    mdLinks(route, { validate: true })
      .then((obj) => md.showStats(obj, true));
  } else {
    mdLinks(route)
      .then((obj) => console.table(md.showResult(obj)))
      .catch(console.error);
  }
};

cli(myPath);
console.log(process.argv.length);
