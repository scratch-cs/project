var fs = require('fs');

const metaDefaults = {
  'charset' : 'UTF-8', 
  'description' : 'Web Page Description', 
  'author' : 'John Doe',
  'viewport' : 'width=device-width, initial-scale=1.0'
}


function head (title = 'App', linkHref = './assets/style.css', metaOptions = {}){
    this.title = `<title>${title}</title>`
    this.link = `<link rel="stylesheet" type="text/css" href="${linkHref}">`
    this.meta = {...metaDefaults, ...metaOptions};
    this.boiler = `\t<head>\n\t\t${this.title}\n\t\t${this.link}\t<!--meta-->\n\t</head>`;
    this.create();
}

head.prototype.create = function(){
  let template = ``;
  // handle/create meta data
  for (let [key, value] of Object.entries(this.meta)){
    console.log(key, value);
    if (key === 'charset'){
      template += `\n\t\t<meta ${key}="${value}">`;
    }
    else {
      template += `\n\t\t<meta name="${key}" content="${value}">`;
    }
  }
  this.boiler = this.boiler.split('<!--meta-->')[0] 
                + template 
                + this.boiler.split('<!--meta-->')[1];
}

function body (type) {
  this.boiler = '';
  this.create(type);
}

body.prototype.create = function(type){
  // additional functionality for body
  if (type === 'basic') {
    this.boiler = `\t<body>\n\t\t<h1>Hello World (Basic)</h1>\n\t</body>`;
  }
  else if (type === 'react') [
    this.boiler = `\t<body>\n\t\t<h1>Hello World (React)</h1>\n\t\t<div id="app"></div>\n\t\t<script src="bundle.js"></script>\n\t</body>`
  ]
}


function HTML(lang = "en-US") {
  this.children = [];
  this.head = null,
  this.boiler = `<!DOCTYPE html>\n<html lang="${lang}">\n<!--head-->\n<!--body-->\n<html>`;
}

HTML.prototype.addHead = function(title, linkHref, metaOptions) {
  // add head node
  this.head = new head(title, linkHref, metaOptions);
}

HTML.prototype.addBody = function(type = 'basic') {
  // add body node
  this.body = new body(type);
}

// HTML.prototype.addFooter = () => {
//   // parse through nodes and add footer
// }

const create = (htmlObj) => {
  if(htmlObj.head){
    htmlObj.boiler = htmlObj.boiler.split('<!--head-->')[0] + htmlObj.head.boiler + htmlObj.boiler.split('<!--head-->')[1];
  }
  if(htmlObj.body){
    htmlObj.boiler = htmlObj.boiler.split('<!--body-->')[0] + htmlObj.body.boiler + htmlObj.boiler.split('<!--body-->')[1];
  }

  let buff = new Buffer.from(htmlObj.boiler);
  return buff;

  // fs.open('index.html', 'w', function(err, file) {
  //   if (err) throw err;

  //   // go through children array, grab child boiler and insert into html boiler
  //   fs.write(file, buff, 0, buff.length, null, function(err){
  //     if (err) throw 'error writing file: ' + err;
  //     fs.close(file, function () {
  //       console.log('wrote the file successfully');
  //     });
  //   });
  // });
}

let h = new HTML();
h.addHead('My App', undefined, {'description':'My Custom Template','author':'Tayvon'});
h.addBody();
create(h);