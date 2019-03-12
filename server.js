//Dépendences :
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs').promises;
var sha1 = require('sha1');


//Variable utilisté
var app = express();
var pool = mysql.createPool({
  host     : "localhost",
  user     : "root",
  password : "",
  database : "confypcs_conference"
});
const port = 5000;
var responseData = {};

//Configuration serveur
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json())

app.listen(port, () => `Server running on port ${port}`);


//Code :

//EXEMPLE POUR UTILISER LA BASE DE DONNEE
// mySqlClient.connect((err)=>{
//      if(err) throw err;
//      mySqlClient.query('select email,password from users',(err,result,fields)=>{
//           if(err) throw err;
//           console.log(result)
//      })
// })


//Routes :
/***********************      Route qui gére le login  ***********************/
app.post('/login',(request,response)=>{

     usermail = request.body.email;
     password = request.body.password;


     pool.getConnection((err,connection)=>{
          if(err) throw err;
          connection.query("select * from users where email = '"+usermail+"'",(err,result)=>{
               connection.release();
               if(err) throw err;
               else if ((result.length != 0) && (result[0].password == sha1(password))) {
                    //Authentification réussi
                    responseData._id = result[0].id;
                    responseData.name = result[0].name;
                    responseData.role = result[0].roles;
                    responseData.isEnabled = result[0].isEnabled;
                    responseData.statusMsg = 'Connexion réussie : bonjour '+result[0].name;
                    responseData.connexionStatut = true;

                    response.send(JSON.stringify(responseData));
               }
               else {
                    //Authentification échoué
                    response.send("Authentification réfusé")
               }
          })
     })
});

/***********************      Route qui import des utilisateurs  ***********************/
app.post('/users',(request,response)=>{


     pool.getConnection((err,connection)=>{
          if(err) throw err;
          connection.query("select * from users",(err,result)=>{
               connection.release();
               if(err) throw err;
               else{
                    response.send(JSON.stringify(result));
               }
          })
     })
});

/***********************      Route qui import des conferences  ***********************/
app.post('/conferences',(request,response)=>{


     pool.getConnection((err,connection)=>{
          if(err) throw err;
          connection.query("select * from conference",(err,result)=>{
               connection.release();
               if(err) throw err;
               else{
                    response.send(JSON.stringify(result));
               }
          })
     })
});