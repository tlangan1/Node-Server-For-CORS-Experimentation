/*
    To use this server simply click the Run->Start Debugging menu item.

    To view the website open a browser and enter the URL
    http://www.localhost:8081/index.html for CORS interaction or
    http://www.localhost:8081/index-hold.html for visual feedback
*/
var http = require("http");

var fs = require("fs");

var url = require("url");

// Create a server
http
  .createServer(function (request, response) {
    // Print the name of the file for which request is made.
    console.log("Request for " + request.url + " received.");

    // Read the requested file content from file system

    fs.readFile(request.url.substr(1), function (err, data) {
      if (err) {
        console.log(err);

        // HTTP Status: 404 : NOT FOUND

        // Content Type: text/plain

        response.writeHead(404, { "Content-Type": "text/html" });
      } else {
        //Page found

        // HTTP Status: 200 : OK

        // Content Type: text/plain

        if (request.url == "/XHR-EndPoint.html") {
          response.writeHead(200, {
            "Access-Control-Allow-Origin": "http://www.localhost:8081",
            "Access-Control-Allow-Methods": "Post",
            "Access-Control-Allow-Headrs": "text/html",
          });
        } else {
          response.writeHead(200, {
            "Content-Type": "text/html",
            // "Access-Control-Allow-Origin": "http://www.localhost:8081",
            // "Access-Control-Allow-Methods": "Post",
            // "Access-Control-Allow-Headrs": "text/html",
          });
        }

        // Write the content of the file to response body

        response.write(data.toString());
      }

      // Send the response body

      response.end();
    });
  })
  .listen(8081);
