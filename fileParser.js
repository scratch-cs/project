// give a type of file, create file boiler plate to represent correct information
// regular html file
// let str = "<!doctype html>"

function Boil() {}

Boil.prototype.regular = function(){
  let str = '<!doctype html>';
  str = str + '\n<html lang="en"><!-- head --><html>';
  str = str.split('<!-- head --><html>')[0] + '\n<head>\n<head>\n' + str.split('<!-- head --><html>')[1];
  return str;
};

let boilIndex = new Boil();

console.log(boilIndex.regular());
