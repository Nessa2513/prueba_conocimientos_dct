// QUESTION #1:

/*
    OBJECTIVE:
    With this code, a GET request is made to the specified URL, 
    the received object is cleared and the modified object is  
    displayed in the console as a String. 

    TO EXECUTE:
    1. In the terminal write: node first_question.js
    2. Install this package to use node-fetch: npm install node-fetch
        a) If it sends error, uninstall it with: npm uninstall node-fetch
        b) download a new version: npm install node-fetch@2.6.1
        c)  It will send a vulnerability error, to fix it automatically: npm audit fix --force
            But using "npm audit fix --force" may disable certain security options!
        NOTE: If security matters, though, run: npm audit,
         which will display a list of detected security issues  
         in the project, along with recommendations on how to fix them.
    3. Execute the program with: node first_question.js
*/

const fetch = require('node-fetch').default; //función fetch para realizar solicitudes HTTP. 

fetch('https://coderbyte.com/api/challenges/json/json-cleaning')
  .then(response => response.json()) // Convertir la respuesta a JSON para leer y analizar la respuesta. 
  .then(data => {
    const cleaned_object = cleanObject(data);
    console.log("\n ------ CLEANED RESULT AS STRING ------");
    console.log(JSON.stringify(cleaned_object) + "\n");
  })

  // Muestra cualquier error que pueda ocurrir durante el GET request.
  .catch(error => { 
    console.error('GET request failed:', error);
  });

  console.log("\n ------ ORIGINAL DATA ------");
function cleanObject(object) {
  const copy_cleaned_Obj = JSON.parse(JSON.stringify(object)); // Crear una copia del objeto para evitar modificar el original.
  console.log(copy_cleaned_Obj);

  // Recorrer todas las propiedades del objeto y devolverlas como un arreglo para modificar/operar.
  Object.keys(copy_cleaned_Obj).forEach(key => {
    const item_value = copy_cleaned_Obj[key];

    // Eliminar propiedades iguales a item_value
    if (item_value === 'N/A' || item_value === '-' || item_value === '') {
      delete copy_cleaned_Obj[key];
    // Filtrar y eliminar los elementos de un arreglo
    } else if (Array.isArray(item_value)) {
      copy_cleaned_Obj[key] = item_value.filter(item => item !== 'N/A' && item !== '-' && item !== '');
    // Limpieza recursiva (repetitiva) de objetos aninados
    } else if (typeof item_value === 'object') {
      copy_cleaned_Obj[key] = cleanObject(item_value);
    }
  }); 
  return copy_cleaned_Obj;
 } 
