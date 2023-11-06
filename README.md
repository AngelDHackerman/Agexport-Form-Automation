Por favor, asegúrate de instalar estas dependencias ejecutando

```
npm init
npm i puppeteer jest 
npm i -D prettier 
npm i jest-image-snapshot 
npm i @axe-core/puppeteer
```

Agrega en la sección "scripts" (si no se encuentra en el archivo package.json, de lo contrario ignorar) del archivo package.json el nombre del test a ejecutar. Por ejemplo:

```
  "scripts": {
    "test": "jest --forceExit",
    "prueba": "jest ./__test__/04_web-Tables/02_Previous-Next-Button.test.js"
  },
```

Para ejecutar un script, navega al directorio del proyecto en tu terminal y ejecuta npm run <nombre-del-script.test.js>.
Por ejemplo, para ejecutar el script de pruebas de Google, tendrías que ejecutar npm run google-tests.test.js.
