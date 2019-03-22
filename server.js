//Dépendences :
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs').promises;
var sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


//Variable utilisté
var app = express();
app.use(cookieParser());
const secret = 'testtest';
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

const withAuth = function(req, res, next) {
     const token =
         req.body.token ||
         req.query.token ||
         req.headers['x-access-token'] ||
         req.cookies.token;

     if (!token) {
          res.status(401).send('Unauthorized: No token provided');
     } else {
          jwt.verify(token, secret, function(err, decoded) {
               if (err) {
                    res.status(401).send('Unauthorized: Invalid token');
               } else {
                    req.email = decoded.email;
                    next();
               }
          });
     }
}



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


                    let token = jwt.sign({usermail},secret,{
                         expiresIn:'1h'
                    });
                    response.cookie('token',token,{httpOnly:true}).send(responseData);
               }
               else {
                    //Authentification échoué
                    response.send("Authentification réfusé")
               }
          })
     })
});

/***********************      Route qui import des utilisateurs  ***********************/
app.post('/users',withAuth,(request,response)=>{


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
app.post('/conferences',withAuth,(request,response)=>{


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

/***********************      Route qui import des conferences  ***********************/
app.post('/getUserConference',(request,response)=>{

     user_id = request.body.user_id;

     pool.getConnection((err,connection)=>{
          if(err) throw err;
          connection.query("select * from conference where id_user = '"+user_id+"';",(err,result)=>{
               connection.release();
               if(err) throw err;
               else{
                    response.send(JSON.stringify(result));
               }
          })
     })
});

/***********************      Route qui enregistre un utilisateur  ***********************/
app.post('/register',(request,response) => {

     let nom = request.body.nom;
     let username = request.body.username;
     let email = request.body.email;
     let password = request.body.password;

     let sql = "insert into users (email,password,name,username,roles) values ('"+email+"',sha1('"+password+"'),'"+nom+"','"+username+"','ROLE_USER')";

     pool.getConnection((err,connection)=>{
          if(err) throw err;
          connection.query(sql,(err,result) => {
               if(err) throw err;
               else{
                    response.send();
               }
          })
     })

});


/***********************      Token Check  ***********************/

app.post('/checkToken', withAuth, function(req, res) {
     res.sendStatus(200);
});

/***********************      LogOut  ***********************/
app.post('/logout',withAuth,function(req,res){
     res.cookies.destroy();
})

// TODO: est ce que mon code pour l'importaion du profil est bon?
//Mise à jour de profil
// Affichage des informations enregistrées dans la base
