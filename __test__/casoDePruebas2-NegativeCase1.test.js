const puppeteer = require('puppeteer');
const {
  click, 
  type,
  typeDelay, 
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
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
      });
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
      // ? Testeando el autocomplete y hobbies
    await click(page, '#subjectsContainer > div > div.subjects-auto-complete__value-container.subjects-auto-complete__value-container--is-multi.css-1hwfws3')
    await type(page, '#subjectsContainer > div > div.subjects-auto-complete__value-container.subjects-auto-complete__value-container--is-multi.css-1hwfws3', 'math')
    await page.waitForTimeout(1000)
    await pressEnter(page)

    await clickDelayed(page, '#hobbies-checkbox-1')
    await clickDelayed(page, '#hobbies-checkbox-2')
    await clickDelayed(page, '#hobbies-checkbox-3')

    // ? Testeando la subida de archivos
    // input de tipo file
    await uploadFile(page, '#uploadPicture', '/home/angel/Imágenes/fondoDePantalla/Programador-puppeteer.png')

    // ? Testeando la seccion de Address
    await type(page, '#currentAddress', '2500 Ave NW, 308 suite', typeDelay)
    await clickDelayed(page, '#state')
    await pressEnter(page)
    await page.waitForTimeout(500)
    await clickDelayed(page, '#city')
    await pressEnter(page)

    // ? Haciendo click en submit
    await clickDelayed(page, '#submit')

    // ? Validacion para estar seguros que el modal de datos NO es visible (Datos obligatorios no enviados)
    const modal = await page.$('body > div.fade.modal.show')
    expect(modal).toBeNull();

    }, timeDelay)
})