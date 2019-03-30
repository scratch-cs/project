var fs = require('fs');

// let buffer = new Buffer.from('<!doctype html>\n<html lang="en">\n<!-- head -->\n<html>');
function head (){
    this.boiler = `\t<head>\n\t</head>`;
}

function HTML() {
  this.children = [];
  this.head = null,
  this.fileRef = null,
  this.boiler = `<!doctype html>\n<html lang="en">\n<!-- head -->\n<html>`;
  // this.boiler = new Buffer
  //                     .from(`<!doctype html>\n
  //                           <html lang="en">\n
  //                           <!-- head -->\n
  //                           <html>`);
  // this.create = () => {
  //   fs.open('index.html', 'w', function(err, file) {
  //     if (err) throw err;
  //     this.fileRef = 'index.html';
  //     console.log('index created')
  //     fs.write(file, this.boiler, 0, buffer.length, null, function(err){
  //       if (err) throw 'error writing file: ' + err;
  //       fs.close(file, function () {
  //         console.log('wrote the file successfully');
  //       });
  //     });
  //   });
  // }
}

HTML.prototype.addHead = function() {
  // parse through nodes and add head
  console.log('add head')
  this.head = new head();
  console.log(this.head)

}

HTML.prototype.addBody = () => {
  // parse through nodes and add body
}

HTML.prototype.addFooter = () => {
  // parse through nodes and add footer
}

let create = (htmlObj) => {
  fs.open('index.html', 'w', function(err, file) {
    if (err) throw err;

    htmlObj.fileRef = 'index.html';

    console.log('index created')
    console.log(htmlObj.head)

    // go through children array, grab child boiler and insert into html boiler
    // if(htmlObj.head){
    for (let node of this.children){
      console.log('a child exist')

      htmlObj.boiler = htmlObj.boiler.split('<!-- head -->')[0] + node.boiler + htmlObj.boiler.split('<!-- head -->')[1];
    }

    console.log(htmlObj.boiler)

    let buff = new Buffer.from(htmlObj.boiler);

    fs.write(file, buff, 0, buff.length, null, function(err){
      if (err) throw 'error writing file: ' + err;
      fs.close(file, function () {
        console.log('wrote the file successfully');
      });
    });
  });
}

let h = new HTML();
h.addHead()
console.log(h.head);
create(h);