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
var responseProfil ={};

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

/***********************      Route qui set des conferences  ***********************/


app.post('/addConference',(request,response)=>{

     /**
      * Fonction utilitaire pour rendre en SQL Format
      **/
     function twoDigits(d) {
          if(0 <= d && d < 10) return "0" + d.toString();
          if(-10 < d && d < 0) return "-0" + (-1*d).toString();
          return d.toString();
     }

     /**
      * Fonction qui rend une date en SQL format
      **/
     Date.prototype.toMysqlFormat = function() {
          return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
     };

     let name = request.body.name;
     let id_user = request.body._id;
     let description = request.body.description;
     let logo = "NULL";
     const date_begin = new Date(request.body.date_begin).toMysqlFormat();
     const date_end = new Date(request.body.date_end).toMysqlFormat();
     let topic = request.body.topic


     let sql = "insert into conference (name,description,logo,date_begin,date_end,topic,id_user,valide) values ('"+name+"','"+description+"','"+logo+"','"+date_begin+"','"+date_end+"','"+topic+"','"+id_user+"',0)";

     pool.getConnection((err,connection)=>{
          if(err) throw err;
          connection.query(sql,(err,result)=>{
               connection.release();
               if(err) throw err;
               else{
                    response.send();
               }
          })
     })
});

// TODO: est ce que mon code pour l'importaion du profil est bon?
//Mise à jour de profil
// Affichage des informations enregistrées dans la base
app.post('/profil', function(request, response) {

     identifiant=request.body.id;
     pool.getConnection((err,connection)=>{
          if(err) throw err;
          connection.query("select * from users where id= '"+identifiant+"'",(err,result)=>{
               connection.release();
               if(err) throw err;
               else{
                    response.send(JSON.stringify(result));
                    //responseProfil.email = result.rows[0].email;
                    //responseProfil.prenom = result.rows[0].prenom;
               }
          })
     })

});