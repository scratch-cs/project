"use strict";

const inquirer = require("inquirer");
const clear = require("clear");
const webpack = require("./action_webpack");
const createServer = require("./action_server");
const react = require("./action_react");
const pg = require("./action_pg");
const mongo = require("./action_mongo");

module.exports.fullConfig = function() {
  // const setupServer = {
  //   PORT: 3000,
  //   bodyParser: false,
  //   cors: false,
  //   mongoose: {}
  // };

  const serverQuestions = [
    {
      // PORT
      type: "input",
      name: "PORT",
      message: "PORT (default:3000) ",
      default: 3000,
      validate: value => {
        if (Number.isInteger(parseInt(value)) && value > 0) {
          return true;
        }
        return "please enter a valid number";
      }
    },
    {
      // App Middleware
      type: "checkbox",
      name: "AppMiddleware",
      mesasge: "Would you like to include the following App Middleware ?",
      choices: [
        { name: "Body Parser", value: "bodyParser", checked: true },
        { name: "cors", value: "cors", checked: true }
      ]
      // , default: ['bodyParser','cors']
    },
    {
      // mongoose ? yes/no
      type: "list",
      name: "pg",
      message: "Would you like to include PostgreSQL?",
      choices: [{ name: "Yes", value: true }, { name: "No", value: false }]
    },
    {
      // mongoose ? yes/no
      type: "list",
      name: "mongoose",
      message: "Would you like to Include MongoDB ?",
      choices: [{ name: "Yes", value: true }, { name: "No", value: false }]
    },
    {
      // further setup mongoose ?
      type: "list",
      name: "setupMongoose",
      message: "Do you want to configure/setup MongooDB ?",
      choices: [{ name: "Yes", value: true }, { name: "No", value: false }],
      when: answers => answers.mongoose // only ask if User includes Mongoose
    },
    {
      // Mongoose collection name
      type: "input",
      name: "collectionName",
      message: "Enter your mongo collection name: ",
      default: "collection",
      when: answers => answers.setupMongoose // only ask if User wants to SETUP mongoose
    },
    {
      // Mongoose URI , collection
      type: "input",
      name: "uri - Mongoose connection string ",
      default: answers => "mongodb://localhost:27017/" + answers.collectionName,
      message: "Change the URI if you want",
      when: answers => answers.setupMongoose // only ask if User wants to SETUP mongoose
    },
    {
      // React ? yes/no
      type: "list",
      name: "react",
      message: "Would you like to include React?",
      choices: [{ name: "Yes", value: true }, { name: "No", value: false }]
    },
    {
      // Webpack ? yes/no
      type: "list",
      name: "webpack",
      message: "Would you like to include Webpack?",
      choices: [{ name: "Yes", value: true }, { name: "No", value: false }]
    }
  ];

  const serverPromt = inquirer.createPromptModule();

  let userInput = {};

  async function processInput() {
    await createServer.createServer(userInput.PORT);
    if (userInput.pg) await pg.pg();
    if (userInput.mongoose) await mongo.mongo();
    if (userInput.react) await react.react();
    if (userInput.webpack) await webpack.webpack();
  }

  // promt user ....
  serverPromt(serverQuestions)
    .then(answers => (userInput = answers))
    .then(() => {
      processInput();
    })
    .then(() => console.log(userInput))
    .catch(err => console.log("OhOh: ", err));
};
