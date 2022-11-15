import {MongoClient, ObjectId} from "mongodb";
import {Connection} from "../connection.js";
import {User} from "../modules/user.js";
import express from 'express';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bodyParser from "body-parser";
import Websocket, {WebSocketServer} from 'ws';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const modules = {
    client: User,
}

app.use(express.static('public'));



app.use(bodyParser.json());
app.all('/api/:controller/:method',(req,res)=> {
    if (req.params.controller){
        modules[req.params.controller][req.params.method].call(null,req,res,req.body);
    }
})

app.get(['/*','/'],(req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(8088,() => {
    console.log('App is running...');
});


MongoClient.connect('mongodb://database:27017', (error, client) => {
    if (error) {
        return console.error(error);
    }

    Connection.set(client.db('bog_test'));

    console.log('Connected to database....');
});




const wss = new WebSocketServer({port:8082});
wss.on('connection', client => {
    client.on('message', (message) => {
        [...wss.clients]
            .filter(c => c !== client)
            .forEach(c => c.send( message,{binary: false}));
    });
});







