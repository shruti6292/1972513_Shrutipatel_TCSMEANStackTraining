const mongo = require('mongodb').MongoClient;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// const client = require('socket.io').listen(4000).sockets;
const mongooseDbOption={       //to avoid warning
    useNewUrlParser: true,
  useUnifiedTopology: true 
}
app.get('/', function(req, res) {
    res.sendfile('chat.html');
 });

// Connect to mongo
mongo.connect("mongodb://localhost:27017/meanstack", function(err, db){
    if(err){
        throw err;
    }

    console.log('MongoDB connected...');

    // Connect to Socket.io
    io.on('connection', function(socket) {
        console.log('A user connected');
        socket.on('setUsername', function(data) {
           console.log(data);
           
           if(users.indexOf(data) > -1) {
              socket.emit('userExists', data + ' username is taken! Try some other username.');
           } else {
              users.push(data);
              socket.emit('userSet', {username: data});
           }
        });
    // client.on('connection', function(socket){
     //   let chat = client.db.collection('chats');

   
        // Create function to send status
        sendStatus = function(s){
            socket.emit('status', s);
        }

        // Get chats from mongo collection
        chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }

            // Emit the messages
            socket.emit('output', res);
        });

        // Handle input events
        socket.on('input', function(data){
            let name = data.name;
            let message = data.message;

            // Check for name and message
            if(name == '' || message == ''){
                // Send error status
                sendStatus('Please enter a name and message');
            } else {
                // Insert message
                chat.insert({name: name, message: message}, function(){
                    client.emit('output', [data]);

                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }
        });

        // Handle clear
        socket.on('clear', function(data){
            // Remove all chats from collection
            chat.remove({}, function(){
                // Emit cleared
                socket.emit('cleared');
            });
        });
    });
});
http.listen(3000, function() {
    console.log('Running on localhost:3000');
 });