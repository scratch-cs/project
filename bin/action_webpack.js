const fs = require("fs");


module.exports.webpack =  function (){

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
  })
  
} 
