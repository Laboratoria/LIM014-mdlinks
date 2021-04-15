const methods = require('../src/API/methods.js');

const realpathMd = 'test\\links\\test link.md';
const fakePath = 'test\\test link.md';
const realPathDirectory = 'test\\links';
const pathMd = 'test\\links\\readme.md';

const arrayLinks = [{
  path: 'test\\links\\readme.md',
  text: 'motor de JavaScript V8 de Chrome',
  href: 'https://developers.google.com/v8/',
}];

const arrayLinksDirectory = [{
  href: 'https://developers.google.com/v8/',
  path: `${__dirname}\\links\\README.md`,
  text: 'motor de JavaScript V8 de Chrome',
},
{
  path: `${__dirname}\\links\\test link.md`,
  text: 'status code 500',
  href: 'https://httpstat.us/500',
},
{
  path: `${__dirname}\\links\\test link.md`,
  text: 'status Fail',
  href: 'https://gdfdfvddfbdfg.comsf',
},
{
  path: `${__dirname}\\links\\test link.md`,
  text: 'status code 404',
  href: 'https://httpstat.us/404',
},
];

const arrayLinksStatus = [{
  href: 'https://developers.google.com/v8/',
  statusText: 'OK',
  path: 'test\\links\\readme.md',
  status: 200,
  text: 'motor de JavaScript V8 de Chrome',
}];

const arrayLinkFail = [{
  path: `${__dirname}\\links\\test link.md`,
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
    expect(methods.validAndResolve(fakePath)).toBeFalsy();
  });
  it('isFile(), Debería retornar true si es un el path de un archivo existente', () => {
    expect(methods.isFile(realpathMd)).toBeTruthy();
  });
  it('isFile(), Debería retornar False si no es un path de un archivo existente', () => {
    expect(methods.isFile(fakePath)).toBeFalsy();
  });
  it('isMd(), Debería retornar true si el path es un archivo .md', () => {
    expect(methods.isMd(realpathMd)).toBeTruthy();
  });
  it('isMd(), Debería retornar False si el path no es un archivo .md', () => {
    expect(methods.isMd('test\\test link.jpg')).toBeFalsy();
  });
  it('isDirectory(), Debería retornar true si el path es un directorio', () => {
    expect(methods.isDirectory(realPathDirectory)).toBeTruthy();
  });
  it('isDirectory(), Debería retornar False si el path no es un directorio', () => {
    expect(methods.isDirectory(realpathMd)).toBeFalsy();
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
        expect(err[0].statusText).toBe('Fail');
        done();
      });
  });
  it('validateLinks(), debería retornar un OK a un enlace disponible', (done) => {
    methods.validateLinks(pathMd).then((links) => {
      const statusText = 'OK';
      expect(links[0].statusText).toBe(statusText);
      done();
    });
  });
});
