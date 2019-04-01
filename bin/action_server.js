const fs = require("fs");

module.exports.createServer  =  function ( PORT = 3000) {

   fs.mkdirSync("./project/server", { recursive: true }, err => {
      if (err) throw err;
    });
    // Create server
    let serverPath = "./project/server/server.js";
    let serverCode = `
    const express = require('express');
    const path = require('path');
    
    const cors = require('cors');
    const app = express();
    
    app.use(cors);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.get('/', (req, res) => {
        res.status(200);
        return res.sendFile(path.join(__dirname, '../index.html'));
        });
    
    
    app.get('/bundle.js', (req, res) => {
        res.type('application/javascript');
        res.status(200);
        return res.sendFile(path.join(__dirname, './../build/bundle.js'));
    });
    
    if (process.env.NODE_ENV === 'production') {
        // statically serve everything in the build folder on the route '/build'
    
        app.use('/build', express.static(path.join(__dirname, '../build')));
    
        // serve index.html on the route '/'\n\tapp.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../index.html'));
        });
    }
    
    
    app.use((req, res) => {
        return res.status(404).send('Page not found.');
    });
    
    app.listen(${PORT});
    `
  
    fs.writeFile(serverPath, serverCode, err => {
      if (err) throw err;
    });
  
}