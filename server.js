const express = require('express');
const app = express();



const http = require('./rx_http'); // hello world 출력 

app.use('/js', express.static(__dirname + '/js'));



// var serverObservable = http.createServer();
// var port = 3000;
// serverObservable.server.listen(port);
// console.log("Server listening on port: " + port);





app.listen(80, function(){
    console.log('listening on 80')
});

app.get('/', function(요청, 응답){

    응답.sendFile(__dirname + '/index.html')
}); 
