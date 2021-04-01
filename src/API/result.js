/* eslint-disable no-console */
const { mdLinks } = require('./md-links.js');

mdLinks('./readme.md')
  .then((links) => {
    console.log(links);
  })
  .catch(console.error);

mdLinks('./test', { validate: true })
  .then((links) => {
    console.log(links);
  })
  .catch(console.error);

mdLinks('./test')
  .then((links) => {
    console.log(links);
  })
  .catch(console.error);
