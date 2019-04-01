const fs = require("fs"); 

module.exports.mongo = function (){
    // Create mongoDB database
    let mongoPath = "./project/server/mongo_db.js";
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