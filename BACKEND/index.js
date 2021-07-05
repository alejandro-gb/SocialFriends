const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var aws = require('aws-sdk');
let awsconfig = {
    'region':'us-east-2',
    'endpoint':'http://dynamodb.us-east-2.amazonaws.com',
    'accessKeyId':'ACCESS KEY','secretAccessKey':'SECRET ACCESS KEY'
};
aws.config.update(awsconfig);
const app = express();
const port = 3200;
const host = '127.0.0.1';
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let docClient = new aws.DynamoDB.DocumentClient();

let mensaje = {
    user:'',
    mensaje:''
};

app.post('/nuevo', function (req, res) {

    var params = {
        TableName: "Mensajes",
        Item: {
            "Usuario": req.body.nombre,
            "Mensaje": req.body.mensaje
        }
    };
    docClient.put(params, function(err, data) {
       if (err) {
           respuesta = {
            error: true,
            codigo: 400,
            mensaje: 'Error'
           };
        res.send(respuesta)
       } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Mensaje agregado'
           };
        res.send(respuesta)
       }
    });
    
});

app.post('/newuser', function (req, res) {
    var params = {
        TableName: "Usuarios",
        Item: {
            "username": req.body.nombre,
            "password": req.body.password
        }
    };
    docClient.put(params, function(err, data) {
       if (err) {
           respuesta = {
            error: true,
            codigo: 400,
            mensaje: 'Error'
           };
        res.send(respuesta)
       } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Usuario registrado'
           };
        res.send(respuesta)
       }
    });
});

app.post('/newlike', function (req, res) {
    var params = {
        TableName: "Mensajes",
        Key: {
            "Usuario": req.body.user,
            "Mensaje": req.body.mensaje
        },
        UpdateExpression: "set likes = likes + :val",
        ExpressionAttributeValues:{
            ":val": 1
        },
        ReturnValues:"UPDATED_NEW"
    };
    docClient.update(params, function(err, data) {
       if (err) {
           respuesta = {
            error: true,
            codigo: 400,
            mensaje: 'Error'
           };
        res.send(respuesta)
       } else {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Usuario registrado'
           };
        res.send(respuesta)
       }
    });
});

app.get('/usuarios',function(req,res){
    var params = {
        TableName: "Usuarios"
    };
    docClient.scan(params,onScan);
    function onScan(err,data){
        if(err){
            console.log("Error al mostrar los usuarios",JSON.stringify(err,null,2));
        }else{
            res.send(data.Items)
        if(typeof data.LastEvaluatedKey != 'undefined'){
            console.log("Scanning for more");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params,onScan);
        }
        }
    }
});



app.get('/mensajes', function (req, res) {
    var params = {
        TableName: "Mensajes"
    };
    docClient.scan(params, onScan);
    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send(data.Items)
        if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
        }
    }
});


app.get('/',(req,res) => {
    res.send("Servidor funcionando");
});

app.listen(port,()=>{
    console.log(`Servidor corriendo en http://${host}:${port}`)
})
