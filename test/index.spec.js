const {
  rutaExiste,
  tenerMd,
  isDirectory,
  getFiles,
  readFile,
  validateLinks,
  mdLinks} = require('../backend/index.js');

//FUNCIÓN QUE VALIDA SI UNA RUTA EXISTE Y LA DEVUELVE ABSOLUTA DE SER ASÍ
  describe('Función que debe determinar si la ruta existe y de ser así, cambiarla a absoluta', () => {
    it("Debe retornar la ruta existente y convertirla en absoluta", () => {
      console.log(__dirname+'/../practica');
      expect(rutaExiste(__dirname + '/../practica')).toEqual('D://GitHub//LIM014-mdlinks//practica');
    });
  
    it("Debe retornar un mensaje si se pasa una ruta no existente", () => {
      expect(rutaExiste('./pruebalinks2.md')).toEqual("The path doesn't exist");
    });
  });

//FUNCIÓN QUE VALIDA/FILTRARÁ LOS ARCHIVOS .MD
describe('Función que valida si los archivos son markdown o extensión .md', () => {
  it('debería ser una función', () => {
    expect(typeof tenerMd).toBe('function');
  });
  it('debería retornar TRUE si el archivo tiene extensión .md', () => {
    expect(tenerMd('D:\\GitHub\\LIM014-mdlinks\\backend\\pruebalinks.md')).toBe(true);
  });
  it('debería retornar FALSE si el archivo NO tiene extensión .md', () => {
    expect(tenerMd('D:\\GitHub\\LIM014-mdlinks\\backend\\cli.js')).toBe(false);
  });
});


//FUNCIÓN QUE VERIFICA SI ES UNA CARPETA O DIRECTORIO
describe('Función que valida si la ruta pertenece a una carpeta o directorio', () => {
  it('debería ser una función', () => {
    expect(typeof isDirectory).toBe('function');
  });
  it('debería retornar TRUE si la ruta es un directorio', () => {
    expect(isDirectory('D:\\GitHub\\LIM014-mdlinks\\practica')).toBe(true);
  });
  it('debería retornar FALSE si la ruta no existe', () => {
    expect(isDirectory('D:\\GitHub\\LIM014-mdlinks\\backend\\pruebalinks.md')).toBe(false);
  });
}); 


//FUNCIÓN RECURSIVA CUANDO EL USUARIO PASA COMO RUTA UN DIRECTORIO O CARPETA
describe('Función que lee un directorio recursivamente', () => {
  it('Debe leer el directorio y sus subcarpetas. También, filtra y devuelve solo los archivos .md', () => {
    expect(getFiles(__dirname + "/practica")).toEqual([
      'D:\\GitHub\\LIM014-mdlinks\\practica\\prueba_directorio\\con_LINKS.md',
      'D:\\GitHub\\LIM014-mdlinks\\practica\\prueba_directorio\\sin_LINKS.md',
      'D:\\GitHub\\LIM014-mdlinks\\practica\\prueba_directorio\\prueba_directorio2\\pruebalinks.md',
      'D:\\GitHub\\LIM014-mdlinks\\practica\\prueba_directorio\\prueba_directorio2\\sin_LINKS.md',
    ]);
  });
});


//VALIDAR QUE LA RUTA RELATIVA SE CONVIERTA EN ABSOLUTA
/* describe('Función que convierte una ruta relativa en absoluta', () => {
  const a = "D:\\GitHub\\LIM014-mdlinks\\README.md";
  const b = "README.md";
  it('debería ser una función', () => {
    expect(typeof getAbsolute).toBe('function');
  });
  it('debería convertir la ruta relativa en absoluta', () => {
    expect(getAbsolute(b)).toEqual(a);
  });
  it('no debería convertir una ruta absoluta, se debe quedar igual', () => {
    expect(getAbsolute(a)).toEqual(a);
  });
}); */


/* describe('cipher', () => {

    it('should be an object', () => {
      expect(typeof cipher).toBe('object');
    });
  
    describe('esAbsoluta', () => {
  
      it('should be a function', () => {
        expect(typeof esAbsoluta).toBe('function');
      });
  
      it('should throw TypeError when invoked with wrong argument types', () => {
        expect(() => esAbsoluta()).toThrow(TypeError);
        expect(() => esAbsoluta(0)).toThrow(TypeError);
        expect(() => esAbsoluta(null, [])).toThrow(TypeError);
        expect(() => esAbsoluta(0, 0)).toThrow(TypeError);
      });
  
      it('should return "HIJKLMNOPQRSTUVWXYZABCDEFG" for "ABCDEFGHIJKLMNOPQRSTUVWXYZ" with offset 33', () => {
        expect(esAbsoluta(33, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe('HIJKLMNOPQRSTUVWXYZABCDEFG');
      });
      
        const a = 'D:\\GitHub\\LIM014-mdlinks\\practica\\prueba_directorio\\CARP CON LINKS.md';
  const b = 'practica\prueba_directorio\CARP CON LINKS.md';
      
      */