Please make sure to install these dependencies by running
npm init
npm i puppeteer jest 
npm i -D prettier 
npm i jest-image-snapshot 
npm i @axe-core/puppeteer


add in the package.json in the section "scripts" the name of the test to run. e.g: 
```
  "scripts": {
    "test": "jest --forceExit",
    "TC1-TextBox": "jest ./__test__/01_Text-Box/*.test.js --runInBand --verbose",
    "TC2-CheckBox": "jest ./__test__/02_Check-Box/*.test.js --runInBand --verbose",
    "TC3-RadioButton": "jest ./__test__/03_Radio-Button/*.test.js --runInBand --verbose",
    "prueba": "jest ./__test__/04_web-Tables/02_Previous-Next-Button.test.js"
  },
```

To run a script, navigate to the project directory in your terminal and run npm run <script-name.test.js>. 
For example, to run the Google tests script, you would run npm run google-tests.test.js.