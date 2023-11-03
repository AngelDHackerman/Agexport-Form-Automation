const puppeteer = require('puppeteer');
const {click, type, getText} = require('../libs/helpers')
const timeDelay = 600_000_000  // 
let browser 
let page 

describe('Automatizacion del formulario de DemoQa', () => { 
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
    await new Promise(resolve => setTimeout(resolve, 30_000));
    await browser.close()
  }, timeDelay);   

  
  // Ejecutando los casos de prueba. 
  it('Caso de uso 1, Happy path', async () => { 
    
    // Dandole un delay al type para poder visualizarlo
    let typeDelay = {delay: 100}

    await page.waitForSelector('#submit')

    await type(page, '#firstName', 'Angel', typeDelay)
    await type(page, '#lastName', 'Hackerman', typeDelay)
    await type(page, '#userEmail', 'AngelHackerman@emailsecreto.com', typeDelay)
  }, timeDelay)
})
