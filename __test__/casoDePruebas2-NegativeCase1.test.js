const puppeteer = require('puppeteer');
const {
  click, 
  type, 
  getText, 
  clickDelayed, 
  pressEnter,
  uploadFile,
} = require('../libs/helpers')
const timeDelay = 600_000_000
let browser 
let page 

describe ('Caso De Pruebas Negativos', () => { 
    // Hook beforeAll
    beforeAll ( async () => { 
      browser = await puppeteer.launch({ 
        headless: false,  // Nos permite ver lo que pasa mientras el robot testea
        defaultViewport: null, // Set default viewport to null
        args: ['--start-maximized'] // inicia el navegador para que use toda la pantalla
      });
  
      // Dandole el valor a page, con la nueva instancia de pagina creada.
      page = await browser.newPage()
  
      await page.goto('https://demoqa.com/automation-practice-form', { waituntil: 'networkidel1' })  // pasandole la URL a testear y debe esperar a que todo cargue para poder testear.
    }, timeDelay);
  
    // Hook afterAll 
    afterAll ( async () => { 
      // espera 3 segundos antes que cierre el navegador, despues de haber hecho el test.
      await new Promise(resolve => setTimeout(resolve, 3_000));
      await browser.close()
    }, timeDelay);   
  
    
    // Ejecutando los casos de prueba. 
    it('Caso De Pruebas 2, Negative Case 1', async () => { 
      // Caso de Uso 2 (Negative Case 1): Un usuario omite un campo obligatorio y trata de enviar el formulario.
      

    }, timeDelay)
})