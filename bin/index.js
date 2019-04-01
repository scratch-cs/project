#!/usr/bin/env node

/* The above code tells the operating system what interpreter/application to
pass the file to for execution */

/* The "bin" object key in package.json, in our case "boil", is the CLI command
associated with our CLI tool. Its value is the file to be executed, in our case
./bin/index.js */

/* The bin directory includes all executable js files, in our case index.js */

/* The lib folder contains other files which index.js might use. These files
should contain all CLI tool logic. We have not yet modularized our code to follow
this practice. */

const fs = require("fs");

// Could require in below file, and/or others, containing further logic
// const logic = require("./lib/greet");

/* When we execute a js file with Node, Node provides a process variable
which contains information about the executing process. Process.argv returns
an array of arguments used while executing a js file with Node. The first
element of that array is the path of the Node interpreter, and the second
element is the path of the file being executed. Later elements are space
separated text values added after the command, in our case, "boil".

Using slice below we ensure we are obtaining only the arguments after the first
two elements in the process.argv array.*/
let arguments = process.argv.slice(2);

/* On command "boil react" boil creates a project and a client directory, and inside
client directory: App, container component, babel rc file, and index.html file*/
if (arguments[0] == "react") {
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
    "class App extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t\t" +
    "this.state = {};\n\t}\n\n\trender() {\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t" +
    "<Container />\n\t\t\t</div>\n\t\t);\n\t}\n}\n\nexport default App;";

  fs.writeFile(cointainerPath, containerCode, err => {
    if (err) throw err;
  });

  // Create babel rc file
  let babelPath = ".babelrc";
  let babelCode =
    '{\n\t"presets": ["@babel/preset-env", "@babel/preset-react"],\n\t"env": {\n\t\t' +
    'development": {\n\t\t\t"presets": [["@babel/preset-react", { "development": true }]]\n\t\t' +
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

/* On command "boil server" boil creates a server directory within the project
directory, and within the server directory: a server file. Optional second
commands are "boil server pg", which creates a postgresQL database file,
and "boil server mongo", which creates a mongoDB database file.*/
if (arguments[0] == "server") {
  fs.mkdirSync("./project/server", { recursive: true }, err => {
    if (err) throw err;
  });
  // Create server
  let serverPath = "./project/server/server.js";
  let serverCode =
    "const express = require('express');\nconst path = require('path');\n" +
    "const cors = require('cors');\n\nconst app = express();\n\napp.use(cors);\n" +
    "app.use(express.json());\napp.use(express.urlencoded({ extended: false }));\n\n" +
    "app.get('/', (req, res) => {\n\tres.status(200);\n\t" +
    "return res.sendFile(path.join(__dirname, '../index.html'));\n});\n\n" +
    "app.get('/bundle.js', (req, res) => {\n\tres.type('application/javascript');\n\t" +
    "res.status(200);\n\treturn res.sendFile(path.join(__dirname, './../build/bundle.js'));\n" +
    "});\n\nif (process.env.NODE_ENV === 'production') {\n\t" +
    "// statically serve everything in the build folder on the route '/build'\n\t" +
    "app.use('/build', express.static(path.join(__dirname, '../build')));\n\t" +
    "// serve index.html on the route '/'\n\tapp.get('/', (req, res) => {\n\t\t" +
    "res.sendFile(path.join(__dirname, '../index.html'));\n\t});\n}\n\n" +
    "app.use((req, res) => {\n\treturn res.status(404).send('Page not found.');\n" +
    "});\n\napp.listen(3000)";

  fs.writeFile(serverPath, serverCode, err => {
    if (err) throw err;
  });

  if (arguments[1] == "pg") {
    // Create postgreSQL database
    let pgPath = "./project/server/db.js";
    let pgCode =
      "const { Pool } = require('pg');\n\n" +
      "const connectionString = 'postgresql://USER:PASSWORD@HOST:PORT/DATABASE';\n\n" +
      "const pool = new Pool({\n\tconnectionString\n});\n\npool.on('connect', () => {\n\t" +
      "console.log('connected to psql db');\n});\n\nmodule.exports = {\n\t" +
      "query: (text, params, callback) => pool.query(text, params, callback)\n};";

    fs.writeFile(pgPath, pgCode, err => {
      if (err) throw err;
    });
  }

  if (arguments[1] == "mongo") {
    // Create mongoDB database
    let mongoPath = "./project/server/db.js";
    let mongoCode =
      "const mongoose = require('mongoose');\n\n" +
      "const { Schema } = mongoose;\n\nmongoose.connect('mongodb://localhost/DATABASE');\n\n" +
      "mongoose.connection.once('open', () => {\n\tconsole.log('Connected with mongoDB');\n" +
      "});\n\nconst schema = new Schema({\n\n});\n\nconst Event = mongoose.model('Event', schema);\n\n" +
      "module.exports = Event;";

    fs.writeFile(mongoPath, mongoCode, err => {
      if (err) throw err;
    });
  }
}

/* On command "boil webpack" boil creates a webpack configuration file within the root directory.*/
if (arguments[0] == "webpack") {
  // Create webpack configuration file
  let webpackPath = "webpack.config.js";
  let webpackCode =
    "const webpack = require('webpack');\n" +
    "const path = require('path');\n\nmodule.exports = {\n\t" +
    "entry: './src/App.js',\n\toutput: {\n\t\tfilename: 'main.js',\n\t\t" +
    "path: path.resolve(__dirname, 'dist')\n\t},\n\tmode: 'development',\n\t" +
    "module: {\n\t\trules: [\n\t\t\t{\n\t\t\t\ttest: /.(js|jsx)$/,\n\t\t\t\t" +
    "use: 'babel-loader',\n\t\t\t\texclude: /node_modules/\n\t\t\t}\n\t\t]\n\t" +
    "},\n\tresolve: {\n\t\textensions: ['.js', '.jsx'],\n\t\talias: {\n\t\t\t" +
    "App: path.resolve(__dirname, 'src/app/')\n\t\t}\n\t},\n\tdevServer: {\n\t\t" +
    "contentBase: path.join(__dirname, './dist'),\n\t\tproxy: {\n\t\t\t" +
    "'/api': 'http://localhost:3000'\n\t\t}\n\t}\n};";

  fs.writeFile(webpackPath, webpackCode, err => {
    if (err) throw err;
  });
}
