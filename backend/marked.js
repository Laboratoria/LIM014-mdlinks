

/////////////////////////////////

fs.readFile(path, 'utf-8', (err, data) => {

    if (err) {
        reject('ERROR - No se puede leer el archivo', err)
    }
    else {
        let links = []
        const renderer = new marked.Renderer()
        renderer.link = (href, title, text) => {
            links.push({
                Link: href,
                Titulo: text,
                Ruta: path,
            })
        }
        marked(data, { renderer: renderer })
        links;
       /*  let resultLinks = filterLinks(links); */
        console.log(links);
/*************************************************************** */

/************************************************************** */    
    }
})

////////////////////////////////////////////////////
//ES PARA DARLE COLOR A MIS RESULTADOS
const chalk = require('chalk');
const emoji = require('node-emoji')

console.log(
chalk.blue.bold('hola kathy'),
chalk.blue.bold('\n'),
chalk.red.bold('hola kathy'),
chalk.red ('\n', 'Links validos:'),
chalk.cyan('\n', 'icono inocente:', (emoji.get('innocent'))),
chalk.cyan('\n', 'icono aliens:', (emoji.get('alien'))),
chalk.magenta('icono diablo:', (emoji.get('imp')),'---')
/*chalk.blue.bold('\n'),
chalk.blue.bold('---------------------------------------------------------------------------------------'),
 */
);