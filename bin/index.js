#!/usr/bin/env node

console.log("Boil JS is executing");

const fs = require("fs");
// const logic = require("./lib/greet");

let arguments = process.argv.splice(2);

let command = null;

if (arguments[0] == "--react") {
  let path = "react.js";
  let buffer = new Buffer(
    "import React, { Component } from 'react'\nimport { render } from 'react-dom'\n\nclass App extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {};\n\t}\n}"
  );

  // open the file in writing mode, adding a callback function where we do the actual writing
  fs.open(path, "w", function(err, fd) {
    if (err) {
      throw "could not open file: " + err;
    }

    // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
      if (err) throw "error writing file: " + err;
      fs.close(fd, function() {
        console.log("wrote the file successfully");
      });
    });
  });
}
