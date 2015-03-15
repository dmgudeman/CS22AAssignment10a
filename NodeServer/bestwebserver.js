/*
* CIS 22A Assignment08 Webserver
* David Gudeman
* February 26, 2015
*/
// Load the file system module
var fs = require("fs");
// load the http module
var http = require("http");
// load the url module
var url = require("url");
// load the path module
var path = require("path");
 
// declare server variable
var server;

//The following function will be called when the server
// is handling a request
function servePage(request, response) {
    // The file is read asynchronously

    // resource extracts the pathname to an object
    var resource = "." + url.parse(request.url).pathname;
  
    //if there is no pathname route to homepage
    if (resource === "./") {
        resource = './html/home.html';
    }
    //otherwise read from file defined in resource object
    fs.readFile(resource, function( err, content) {
        
        // extract only the path extension
        var extension = path.extname(resource);
         // intialize variable to hold the content type to be used in callback
        var contentType = "";
        
        if (err) { // If there is an error, set the status code
            response.writeHead( 404,
                               {'Content-Type': 'text/plain; charset = UTF-8'});
            response.write( err.message); // Include the error message body
            response.end(); // Done
        
        } else { // Otherwise, the file was read successfully. 
             // determine which content type to use
            if (extension === ".html"){
                contentType = 'text/html; charset = UTF-8';
            }
            if (extension === ".js"){
               contentType = 'application/javascript; charset = UTF-8';
            }
            if (extension === ".css"){
                contentType = 'text/css; charset = UTF-8';
            }
            if (extension === ".gif"){
                contentType = 'image/gif';
            }  
       
            response.writeHead( 200, // Set the status code
                               {'Content-Type': contentType});
            
            response.write(content); // Send file contents as response body
            response.end(); //done
        }
    });   
}

// create a server object
server = http.createServer(servePage);
server.listen(8080);
console.log('Server running at http://localhost:8080');
