var module = require('./module');
var url = require('url');
 querystring = require('querystring');
var http = require('http');

http.createServer(function(request, response) {
var data1 = '';

request.on('data', function(chunk) {
            data1 += chunk;
        });

request.on('end', function() {
var name = querystring.parse(data1)["username"];
console.log(name);
var email = querystring.parse(data1)["email"];
console.log(email);
var empid = querystring.parse(data1)["empid"];
console.log(empid);
var job = querystring.parse(data1)["job"];
console.log(job);
var branch = querystring.parse(data1)["branch"];
console.log(branch);
if (request.url === '/show') {
module.showData(email,empid,job,branch, response);
            } 
else if (request.url === '/save') {
module.saveData(name,email,empid,job,branch,response);
            } 
else if(request.url==='/update'){
      module.updateData(empid,job,branch,response);
}
else if(request.url==='/delete'){
      module.deleteData(empid,response);
}
  });
    
}).listen(3000);
console.log("Server started");