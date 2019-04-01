const fs = require("fs");

module.exports.pg = function (){
    // Create postgreSQL database
   
    let pgPath = "./project/server/pg_db.js";
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