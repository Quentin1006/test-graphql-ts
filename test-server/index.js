const http = require("http");

http
  .createServer(function (req, res) {
    console.log(req.headers);
    res.write("Hello World!"); //write a response to the client
    res.end(); //end the response
  })
  .listen(4444); //the server object listens on port 8080
