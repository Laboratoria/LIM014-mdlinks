const mdLinks = require('./md-links.js');
/*
mdLinks('./some/example.md')
  .then((links) => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks('./some/example.md', { validate: true })
  .then((links) => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks('./some/dir')
  .then((links) => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

const arrayObj = [
  {
    path: 'README copy 3.md',
    text: 'motor de JavaScript V8 de Chrome',
    href: 'https://developers.google.com/v8/',
  },
  {
    path: 'README copy.md',
    text: 'otherLink',
    href: 'https://google.com',
  },
  {
    path: 'README copy.md',
    text: 'otherLink2',
    href: 'https://google.com',
  },
  {
    path: 'README.md',
    text: 'motor de JavaScript V8 de Chrome',
    href: 'https://developers.google.com/v8/',
  },
];
*/
// const example = methods.getStatusLinks(arrayObj).then((res) => (console.log(res)));
// const arr = arrayObj.map((link) => (link.href));
mdLinks('./')
  .then((links) => {
    console.log('false', links);
    // => [{ href, text, file }]
  })
  .catch(console.error);
// console.log('example', example);
// mdLinks('./', { validate: false });
