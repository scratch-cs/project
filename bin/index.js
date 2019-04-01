#!/usr/bin/env node
/* The above code tells the operating system what interpreter/application to
pass the file to for execution */

const fs = require("fs");
var inquirer = require("inquirer");
const clear = require("clear");

const webpack = require("./action_webpack");
const createServer = require("./action_server");
const react = require("./action_react");
const pg = require("./action_pg");
const mongo = require("./action_mongo");
const fullConfig = require("./fullConfig");

const actions = {
  react: react.react,
  webpack: webpack.webpack,
  server: createServer,
  fullConfig: fullConfig
};

/*Using slice below we ensure we are obtaining only the arguments after the first
two elements in the process.argv array.*/
let arguments = process.argv.slice(2);

const action = arguments[0];

if (!(action in actions)) {
  return console.log(
    `"${action}" is not YET implemented. \n availble commands are : ${Object.keys(
      actions
    )}`
  );
}

if (action == "fullConfig") {
  fullConfig.fullConfig();
}

// function userInterface() {
//   const setupServer = {
//     PORT: 3000,
//     bodyParser: false,
//     cors: false,
//     mongoose: {}
//   };

//   const serverQuestions = [
//     {
//       // PORT
//       type: "input",
//       name: "PORT",
//       message: "PORT (default:3000) ",
//       default: 3000,
//       validate: value => {
//         if (Number.isInteger(parseInt(value)) && value > 0) {
//           return true;
//         } else {
//           return "please enter a valid number";
//         }
//       }
//     },
//     {
//       // App Middleware
//       type: "checkbox",
//       name: "AppMiddleware",
//       mesasge: "Would you like to include the following App Middleware?",
//       choices: [
//         { name: "Body Parser", value: "bodyParser", checked: true },
//         { name: "cors", value: `cors`, checked: true }
//       ]
//       //, default: ['bodyParser','cors']
//     },
//     {
//       // mongoose ? yes/no
//       type: "list",
//       name: "mongoose",
//       message: "Would you like to include MongoDB?",
//       choices: [{ name: "Yes", value: true }, { name: "No", value: false }]
//     },
//     {
//       // further setup mongoose ?
//       type: "list",
//       name: "setupMongoose",
//       message: "Do you want to configure/setup MongoDB?",
//       choices: [{ name: "Yes", value: true }, { name: "No", value: false }],
//       when: answers => answers.mongoose // only ask if User includes Mongoose
//     },
//     {
//       // Mongoose collection name
//       type: "input",
//       name: "collectionName",
//       message: "Enter your mongo collection name: ",
//       default: "collection",
//       when: answers => answers.setupMongoose // only ask if User wants to SETUP mongoose
//     },
//     {
//       // Mongoose URI , collection
//       type: "input",
//       name: "uri - Mongoose connection string ",
//       default: answers => "mongodb://localhost:27017/" + answers.collectionName,
//       message: "Change the URI if you want",
//       when: answers => answers.setupMongoose // only ask if User wants to SETUP mongoose
//     },
//     {
//       // React ? yes/no
//       type: "list",
//       name: "React",
//       message: "Would you like to include React?",
//       choices: [{ name: "Yes", value: true }, { name: "No", value: false }]
//     },
//     {
//       // Webpack ? yes/no
//       type: "list",
//       name: "Webpack",
//       message: "Would you like to include Webpack?",
//       choices: [{ name: "Yes", value: true }, { name: "No", value: false }]
//     }
//   ];

//   const serverPromt = inquirer.createPromptModule();

//   let userInput = {};

//   async function processInput() {
//     await createServer.createServer(userInput.PORT);
//     if (userInput.mongoose) await mongo.mongo();
//   }

//   //promt user ....
//   serverPromt(serverQuestions)
//     .then(answers => (userInput = answers))
//     .then(() => {
//       processInput();
//     })
//     .then(() => console.log(userInput))
//     .catch(err => console.log("OhOh: ", err));
// }
/* The "bin" object key in package.json, in our case "boil", is the CLI command
associated with our CLI tool. Its value is the file to be executed, in our case
./bin/index.js */

/* The bin directory includes all executable js files, in our case index.js */

/* The lib folder contains other files which index.js might use. These files
should contain all CLI tool logic. We have not yet modularized our code to follow
this practice. */

// Could require in below file, and/or others, containing further logic
// const logic = require("./lib/greet");

/* When we execute a js file with Node, Node provides a process variable
which contains information about the executing process. Process.argv returns
an array of arguments used while executing a js file with Node. The first
element of that array is the path of the Node interpreter, and the second
element is the path of the file being executed. Later elements are space
separated text values added after the command, in our case, "boil".


/* On command "boil react" boil creates a project and a client directory, and inside
client directory: App, container component, babel rc file, and index.html file*/
if (action == "react") {
  react.react();
}

/* On command "boil server" boil creates a server directory within the project
directory, and within the server directory: a server file. Optional second
commands are "boil server pg", which creates a postgresQL database file,
and "boil server mongo", which creates a mongoDB database file.*/
if (action == "server") {
  createServer.createServer();

  if (arguments[1] == "pg") {
    pg.pg();
  }
  if (arguments[1] == "mongo") {
    mongo.mongo();
  }
}

/* On command "boil webpack" boil creates a webpack configuration file within the root directory.*/
if (action == "webpack") {
  webpack.webpack();
}
