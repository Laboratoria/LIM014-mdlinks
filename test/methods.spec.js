const methods = require('../src/API/methods.js');

const realpathMd = 'test\\links\\test link.md';
const fakePath = 'test\\test link.md';
const realPathDirectory = 'test\\links';
/* const pathMdFail = 'C:\\Users\\MILUSKA\\Documents\\GitH
ub\\LIM014-mdlinks\\test\\links\\test link.md';
 */
const pathMd = 'test\\links\\readme.md';
const arrayLinks = [{
  path: 'test\\links\\readme.md',
  text: 'motor de JavaScript V8 de Chrome',
  href: 'https://developers.google.com/v8/',
}];

const arrayLinksDirectory = [{
  href: 'https://developers.google.com/v8/',
  path: 'C:\\Users\\MILUSKA\\Documents\\GitHub\\LIM014-mdlinks\\test\\links\\README.md',
  text: 'motor de JavaScript V8 de Chrome',
},
{
  path: 'C:\\Users\\MILUSKA\\Documents\\GitHub\\LIM014-mdlinks\\test\\links\\test link.md',
  text: 'status code 500',
  href: 'https://httpstat.us/500',
},
{
  path: 'C:\\Users\\MILUSKA\\Documents\\GitHub\\LIM014-mdlinks\\test\\links\\test link.md',
  text: 'status Fail',
  href: 'https://gdfdfvddfbdfg.comsf',
},
{
  path: 'C:\\Users\\MILUSKA\\Documents\\GitHub\\LIM014-mdlinks\\test\\links\\test link.md',
  text: 'status code404',
  href: 'https://httpstat.us/404',
},
];

const arrayLinksStatus = [{
  href: 'https://developers.google.com/v8/',
  message: 'OK',
  path: 'test\\links\\readme.md',
  status: 200,
  text: 'motor de JavaScript V8 de Chrome',
}];

const arrayLinkFail = [{
  path: 'C:\\Users\\MILUSKA\\Documents\\GitHub\\LIM014-mdlinks\\test\\links\\test link.md',
  text: 'status code 500',
  href: 'https://httpstat.us/500',
}];

describe('Métodos para trabajar con rutas', () => {
  it('validAndResolve(), es una función', () => {
    expect(typeof methods.validAndResolve).toBe('function');
  });
  it('validAndResolve(), debería retornar una ruta absoluta existente', () => {
    const result = 'C:\\Users\\MILUSKA\\Documents\\GitHub\\LIM014-mdlinks\\test\\links\\test link.md';
    expect(methods.validAndResolve(realpathMd)).toBe(result);
  });
  it('validAndResolve(), debería retornar false si es una ruta no existente', () => {
    expect(methods.validAndResolve(fakePath)).toBe(false);
  });
  it('isFile(), Debería retornar true si es un el path de un archivo existente', () => {
    expect(methods.isFile(realpathMd)).toBe(true);
  });
  it('isFile(), Debería retornar False si no es un path de un archivo existente', () => {
    expect(methods.isFile(fakePath)).toBe(false);
  });
  it('isMd(), Debería retornar true si el path es un archivo .md', () => {
    expect(methods.isMd(realpathMd)).toBe(true);
  });
  it('isMd(), Debería retornar False si el path no es un archivo .md', () => {
    expect(methods.isMd('test\\test link.jpg')).toBe(false);
  });
  it('isDirectory(), Debería retornar true si el path es un directorio', () => {
    expect(methods.isDirectory(realPathDirectory)).toBe(true);
  });
  it('isDirectory(), Debería retornar False si el path no es un directorio', () => {
    expect(methods.isDirectory(realpathMd)).toBe(false);
  });
  it('arrayDirectory(), Debería retornar un objeto', () => {
    expect(typeof methods.arrayDirectory('test\\links')).toBe('object');
  });
  it('arrayDirectory(), Debería retornar un objeto', () => {
    expect(typeof methods.arrayDirectory('test\\links')).toBe('object');
  });
});

describe('Métodos necesarios para MdLinks', () => {
  it('getLinks(), es una función', () => {
    expect(typeof methods.getLinks).toBe('function');
  });
  it('getLinks(), debería retornar un array de links dentro de un archivo Markdown', () => {
    expect(methods.getLinks(pathMd)).toEqual(arrayLinks);
  });
  it('getLinks(), debería retornar un array de links si el directorio contiene archivos Markdown', () => {
    expect(methods.getLinks(realPathDirectory)).toEqual(arrayLinksDirectory);
  });
  it('getLinksArray(), debería retornar un array de links si el directorio contiene archivos Markdown', () => {
    expect(methods.getLinksArray(pathMd)).toEqual(arrayLinks);
  });
  it('getStatusLinks(), debería retornar un array de links y sus status', (done) => {
    methods.getStatusLinks(arrayLinks).then((links) => {
      expect(links).toEqual(arrayLinksStatus);
      done();
    });
  });
  it('getStatusLinks(), debería retornar un array de links y sus status', (done) => {
    methods.getStatusLinks(arrayLinkFail)
      .then((err) => {
        console.log(err[0].message);
        expect(err[0].message).toBe('Internal Server Error');
        done();
      });
  });
  it('validateLinks(), debería retornar un OK a un enlace disponible', (done) => {
    methods.validateLinks(pathMd).then((links) => {
      const message = 'OK';
      expect(links[0].message).toBe(message);
      done();
    });
  });
});
