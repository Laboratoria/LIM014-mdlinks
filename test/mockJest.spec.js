// 1er paso requerir node-fetch
const fetch = require('node-fetch');
const { getStatusLinks } = require('../src/API/methods.js');

jest.mock('node-fetch');
/* const pathMd = 'test\\links\\readme.md'; */
const arrayLinks = [{
  path: 'test\\links\\readme.md',
  text: 'motor de JavaScript V8 de Chrome',
  href: 'https://developers.google.com/v8/',
}];

const arrayLinksFail = [{
  path: 'test\\links\\test link.md',
  text: 'status code 404',
  href: 'https://httpstat.us/404',
}];

const arrayLinkFailStatus = [{
  href: 'https://httpstat.us/404',
  path: 'test\\links\\test link.md',
  status: 400,
  statusText: 'OK',
  text: 'status code 404',
}];

/* describe('MdLinks', () => {
  it('Resuelve un array de links con status 200', () => {
    fetch.mockImplementation(() => Promise.resolve({ status: 200 }));
    mdLinks(pathMd, { validate: true }).then((e) => expect(e[0].status).toBe(200));
  });
}); */

describe('getStatusLinks', () => {
  it('it is a function', () => {
    expect(typeof getStatusLinks).toBe('function');
  });
  it('Status 200', () => {
    fetch.mockImplementation(() => Promise.resolve({
      status: 200,
      statusText: 'OK',
    }));
    getStatusLinks(arrayLinks).then((e) => expect(e[0].status).toBe(200));
  });
  it('Status 404', () => {
    fetch.mockImplementation(() => Promise.resolve({
      status: 404,
      statusText: 'OK',
    }));
    getStatusLinks(arrayLinksFail).then((e) => expect(e[0].status).toBe(404));
  });
  it('Status 400', () => {
    fetch.mockImplementation(() => Promise.resolve({
      status: 400,
      statusText: 'OK',
    }));
    getStatusLinks(arrayLinksFail).then((e) => expect(e[0].status).toBe(400));
  });
  it('[Arrays] Status 400', () => {
    fetch.mockImplementation(() => Promise.resolve({
      status: 400,
      statusText: 'OK',
    }));
    return expect(getStatusLinks(arrayLinksFail)).resolves.toEqual(arrayLinkFailStatus);
  });
});
