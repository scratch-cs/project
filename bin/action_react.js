const fs = require("fs");

module.exports.react =  function () {
 // Create client directory
  fs.mkdirSync("./project/client", { recursive: true }, err => {
    if (err) throw err;
  });

  // Create App
  let appPath = "./project/client/App.jsx";
  let appCode =
    "import React, { Component } from 'react';\nimport { render } from 'react-dom';\n\n" +
    "class App extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t\t" +
    "this.state = {};\n\t}\n\n\trender() {\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t" +
    "<Container />\n\t\t\t</div>\n\t\t);\n\t}\n}\n\nexport default App;";

  fs.writeFile(appPath, appCode, err => {
    if (err) throw err;
  });

  // Create container component
  let cointainerPath = "./project/client/container.jsx";
  let containerCode =
    "import React, { Component } from 'react';\nimport { render } from 'react-dom';\n\n" +
    "class Container extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t\t" +
    "this.state = {};\n\t}\n\n\trender() {\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t" +
    "<Display />\n\t\t\t</div>\n\t\t);\n\t}\n}\n\nexport default Container;";

  fs.writeFile(cointainerPath, containerCode, err => {
    if (err) throw err;
  });

  // Create babel rc file
  let babelPath = ".babelrc";
  let babelCode =
    '{\n\t"presets": ["@babel/preset-env", "@babel/preset-react"],\n\t"env": {\n\t\t' +
    '"development": {\n\t\t\t"presets": [["@babel/preset-react", { "development": true }]]\n\t\t' +
    '}\n\t},\n\t"plugins": ["react-hot-loader/babel"]\n}';

  fs.writeFile(babelPath, babelCode, err => {
    if (err) throw err;
  });

  //Create public directory
  fs.mkdirSync("./project/public", { recursive: true }, err => {
    if (err) throw err;
  });

  // Create index html file
  let indexPath = "./project/public/index.html";
  let indexCode =
    '<!DOCTYPE html>\n<html lang="en">\n\t<head>\n\t\t<meta charset="UTF-8" />\n\t\t' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n\t\t' +
    '<meta http-equiv="X-UA-Compatible" content="ie=edge" />\n\t\t<title>App</title>\n\t' +
    '</head>\n\t<body>\n\t\t<div id="root"></div>\n\t\t<div id="app"></div>\n\t\t' +
    '<script src="bundle.js"></script>\n\t</body>\n\t</html>';

  fs.writeFile(indexPath, indexCode, err => {
    if (err) throw err;
  });  
} 