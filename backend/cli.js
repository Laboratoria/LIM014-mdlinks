#!/usr/bin/env node

const program = require('commander');
const md_Links = require('./index.js');
const chalk = require('chalk')
const pathNode = process.argv[2];

const arrayprueba = [{
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'D:\\GitHub\\LIM014-mdlinks\\test\\practica\\prueba_directorio\\con_LINKS.md',
    status: 200,
    message: 'OK'
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'D:\\GitHub\\LIM014-mdlinks\\test\\practica\\prueba_directorio\\prueba_directorio2\\pruebalinks.md',
    status: 200,
    message: 'OK'
  },
  {
    href: 'https://node.org/asd',
    text: 'md-links',
    file: 'D:\\GitHub\\LIM014-mdlinks\\backend\\pruebalinks.md',
    status: 404,
    message: 'FAIL'
  },
  {
    href: 'https://es.wiki000000pedia.org/wiki/Markdown',
    text: 'Node.js',
    file: 'D:\\GitHub\\LIM014-mdlinks\\backend\\pruebalinks.md',
    status: 500,
    message: 'FAIL'
  },
  {
    href: 'http://getstatuscode.com/500',
    text: 'Dani se inventa un link parte 2',
    file: 'D:\\GitHub\\LIM014-mdlinks\\backend\\pruebalinks.md',
    status: 500,
    message: 'FAIL'
  }
];

const total = (array) => {
  let totalLinks = array.map((obj) => obj.href)
  return 'Total: ' + totalLinks.length
}

const broken = (array) => {
  let linksMessage = array.map((obj) => obj.message)
  let brokenLinks = linksMessage.filter((obj) => obj === 'FAIL')
  return 'Broken: ' + brokenLinks.length
}

const unique = (array) => {
  let linksHref = array.map((obj) => obj.href)
  let linksUnique = [...new Set(linksHref)];
  return 'Unique: ' + linksUnique.length
}
const options = program.opts();
program
  .arguments("<path-to-file>")
  .option('-s, --stats')
  .option('-v, --validate')
  .option('-s, -v --stats --validate')
  .parse(process.argv)
  .usage('test command', {
    username: 'user to login',
    password: 'password for user, if required'
  })
  function cli(path, options) {
    md_Links.mdLinks(path, {
        validate: true
      })
      .then((res) => {
        if (!options.validate && !options.stats) {
          res.map((elemento) => {
            console.log(
              chalk.rgb(47, 189, 79)(elemento.file) + "  " +
              chalk.rgb(47, 189, 171)(elemento.href) + "  " +
              chalk.rgb(47, 189, 124)(elemento.text)
            )
          })
        } else if (options.validate && !options.stats) {
          res.map((elemento) => {
            if (elemento.message === 'OK') {
              console.log(
                chalk.rgb(47, 189, 79)(elemento.file) + "  " +
                chalk.rgb(47, 189, 171)(elemento.href) + "  " +
                chalk.rgb(216, 238, 53)(elemento.status) + "  " +
                chalk.rgb(216, 238, 53)(elemento.message)
              )
            } else {
              console.log(
                chalk.rgb(47, 189, 79)(elemento.file) + "  " +
                chalk.rgb(47, 189, 171)(elemento.href) + "  " +
                chalk.rgb(238, 126, 53)(elemento.status) + "  " +
                chalk.rgb(238, 126, 53)(elemento.message)
              )
            }
          })

        } else if (!options.validate && options.stats) {
          console.log(chalk.rgb(47, 189, 171)(total(res)));
          console.log(chalk.rgb(47, 189, 79)(unique(res)))
        } else if (options.validate && options.stats) {
          console.log(chalk.rgb(47, 189, 171)((total(res))));
          console.log(chalk.rgb(47, 189, 79)(unique(res)));
          console.log(chalk.rgb(194, 255, 51)(broken(res)))
        }
      })
      .catch((err) => {
        console.log(chalk.rgb(218, 41, 41)('The file, directory or path does not exist or there is no file with .md extension'));
      })
  }

  cli(pathNode, options);