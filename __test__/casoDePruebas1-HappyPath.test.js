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

describe('Caso De Pruebas 1, Happy Path', () => { 
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
  it('Caso de uso 1, Happy path', async () => { 
    
    // Dandole un delay al type para poder visualizarlo
    let typeDelay = {delay: 100}

    await page.waitForSelector('#submit')

    // ? Testeando los primeros text inputs
    await type(page, '#firstName', 'Angel', typeDelay)
    await type(page, '#lastName', 'Hackerman', typeDelay)
    await type(page, '#userEmail', 'AngelHackerman@emailsecreto.com', typeDelay)
    await clickDelayed(page, '#gender-radio-1')
    await type(page, '#userNumber', '5025658970', typeDelay)

    // ? Testeando los campos de date of birth
    await clickDelayed(page, '#dateOfBirthInput')
    // abrir el dropdown de años 
    await clickDelayed(page, '#dateOfBirth > div.react-datepicker__tab-loop > div.react-datepicker-popper > div > div > div.react-datepicker__month-container > div.react-datepicker__header > div.react-datepicker__header__dropdown.react-datepicker__header__dropdown--select > div.react-datepicker__year-dropdown-container.react-datepicker__year-dropdown-container--select > select')
    // Escribe el año 1995 para facilitar busqueda
    await type(page, '#dateOfBirth > div.react-datepicker__tab-loop > div.react-datepicker-popper > div > div > div.react-datepicker__month-container > div.react-datepicker__header > div.react-datepicker__header__dropdown.react-datepicker__header__dropdown--select > div.react-datepicker__year-dropdown-container.react-datepicker__year-dropdown-container--select > select','1995')
    // Crea un evento "enter" para seleccionar el año 
    await page.waitForTimeout(1000)
    await pressEnter(page)
    // click en el dropdown para los meses
    await clickDelayed(page, '#dateOfBirth > div.react-datepicker__tab-loop > div.react-datepicker-popper > div > div > div.react-datepicker__month-container > div.react-datepicker__header > div.react-datepicker__header__dropdown.react-datepicker__header__dropdown--select > div.react-datepicker__month-dropdown-container.react-datepicker__month-dropdown-container--select > select')
    // escribe 'november' para seleccionar noviembre
    await type(page, '#dateOfBirth > div.react-datepicker__tab-loop > div.react-datepicker-popper > div > div > div.react-datepicker__month-container > div.react-datepicker__header > div.react-datepicker__header__dropdown.react-datepicker__header__dropdown--select > div.react-datepicker__month-dropdown-container.react-datepicker__month-dropdown-container--select > select', 'november')
    // crea un evento 'enter'
    await page.waitForTimeout(1000)
    await pressEnter(page)
    // Selecciona el dia 20 de noviembre
    await click(page, '#dateOfBirth > div.react-datepicker__tab-loop > div.react-datepicker-popper > div > div > div.react-datepicker__month-container > div.react-datepicker__month > div:nth-child(4) > div.react-datepicker__day.react-datepicker__day--020')
    
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

    // ? Validacion para estar seguros que el modal de datos es visible
    try {
      await page.waitForSelector('body > div.fade.modal.show', { timeout: 5000 });
      console.log('El Modal es visible');
    } catch (error) {
      console.error('Modal no aparecio', error);
    }
    

  }, timeDelay)
})
