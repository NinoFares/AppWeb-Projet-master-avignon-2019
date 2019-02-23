//Dépendences :
const express = require('express');
var mysql = require('mysql');

//Variable utilisté
const app = express();
var mySqlClient = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "",
  database : "confypcs_conference"
});
const port = 5000;

//Configuration serveur
app.listen(port, () => `Server running on port ${port}`);


//Code :

//EXEMPLE POUR UTILISER LA BASE DE DONNEE
var selectQueryTest = 'Select * from sponsor'
var sqlQueryTest = mySqlClient.query(selectQueryTest);
sqlQueryTest.on("result",(row)=>{
     console.log(row);
})
sqlQuery.on("end",()=>{
     mySqlClient.end();
})
sqlQuery.on("error",(error)=>{
     console.log(error);
})
