/**
 * Dépendences :
 *
 */
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs').promises;
var sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
var cors = require('cors')


/**
 * Variable utilisté
 */

const secret = 'testtest';
var pool = mysql.createPool({
  host     : "pedago01c.univ-avignon.fr",
  user     : "Conferences_MobApps",
  password : "KuWYMFmO",
  database : "Conferences_MobApps_189314"
});

let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:"testprojetmaster@gmail.com",
        pass:"ProjetMaster2019",
    }
});
const port = 5000;
var responseData = {};

/**
 * Configuration serveur
 *
 * */
var app = express();
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


app.listen(port, () => `Server running on port ${port}`);

/**
 *
 *
 * Utilitaires
 *
 *
 *
 */
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

/**
 * Middleware pour gérer les requete sécurisée avec le token jws
 */
const withAuth = function(req, res, next) {
    const token = req.body.token;

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
}


/**
 *
 *
 * routes d'authentification
 *
 *
 *
 */

/***********************      Token Check  ***********************/


app.post('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});


/***********************      Route qui gére le login  ***********************/
app.post('/login',(request,response)=>{

    usermail = request.body.email;
    password = request.body.password;


    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from users where email = '"+usermail+"' and isEnabled = 1",(err,result)=>{
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

                responseData.token = token;

                //Envoie du token pour le localstorage
                response.send(responseData);
            }
            else {
                //Authentification échoué
                response.send("Authentification réfusé")
            }
        })
    })
});

/**
 *
 *
 * routes d'insertion
 *
 *
 *
 */


/***********************      Route qui ajoute une conferences  ***********************/
app.post('/addConference', (request, response) => {


    let name = request.body.name;
    let id_user = request.body._id;
    let description = request.body.description;
    let logo = "NULL";
    const date_begin = new Date(request.body.date_begin).toMysqlFormat();
    const date_end = new Date(request.body.date_end).toMysqlFormat();
    let topic = request.body.topic


    let sql = "insert into conference (name,description,logo,date_begin,date_end,topic,id_user,valide) values ('" + name + "','" + description + "','" + logo + "','" + date_begin + "','" + date_end + "','" + topic + "','" + id_user + "',0)";

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(sql, (err, result) => {
            connection.release();
            if (err) throw err;
            else {
                response.send();
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

    let sql = "insert into users (email,password,name,username,roles,isEnabled) values ('"+email+"',sha1('"+password+"'),'"+nom+"','"+username+"','ROLE_USER',0)";

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(sql,(err,result) => {
            if(err) throw err;
            else{
                transporter.sendMail({
                    from:'"Administrateur conférence"<testprojetmaster@gmail.com>',
                    to:'<'+email+'>',
                    subject:"Inscription a la plateforme de gestion de conference",
                    text:'Vous venez de vous inscrire pour devenir conférencier, vous aurez accés a votre compte que quand un administrateur confirmera votre inscription'
                });
                response.send();
            }
        })
    })

});

/**************** Creation session ******************/

app.post('/createSession',withAuth,(req,res)=>{

    let titre = req.body.name;
    let location = req.body.location;
    let date_begin = new Date(req.body.date_begin).toMysqlFormat();
    let date_end = new Date(req.body.date_end).toMysqlFormat();
    let id_conf = req.body.selectedConf;
    let id_workshop = req.body.workshopSelected;
    let session_chear = req.body.session_chear;
    let description = req.body.description;
    let heure = req.body.heure_debut;

    let sql ='';

    if (id_workshop === null)
        sql = "insert into session (title,location,session_chear,description,date_begin,date_end,heure_debut,id_conference) values ('"+titre+"','"+location+"','"+session_chear+"','"+description+"','"+date_begin+"','"+date_end+"','"+heure+"','"+id_conf+"')"
    else
        sql = "insert into session (title,location,session_chear,description,date_begin,date_end,heure_debut,id_conference,id_workshop) values ('"+titre+"','"+location+"','"+session_chear+"','"+description+"','"+date_begin+"','"+date_end+"','"+heure+"','"+id_conf+"','"+id_workshop+"')"


    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(sql,(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                res.send();
            }
        })
    })
});
/**************** Creation Workshop ******************/

app.post('/createWorkshop',withAuth,(req,res)=>{

    let titre = req.body.name;
    let location = req.body.location;
    let subject = req.body.subject;
    let id_conf = req.body.selectedConf;
    let id_session = null;

    let sql = "insert into workshop (name,location,subject,id_conference) values ('"+titre+"','"+location+"','"+subject+"','"+id_conf+"')"

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(sql,(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                res.send();
            }
        })
    })
});

/**************** Creation Article ******************/

app.post('/createArticle',withAuth,(req,res)=>{


    let titre = req.body.name;
    let descrip  = req.body.subject;
    let auteur = req.body.auteur;
    let id_session = req.body.selectedSession;

    let sql = "insert into article (title,description,id_session,auteur) values ('"+titre+"','"+descrip+"','"+id_session+"','"+auteur+"')"

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(sql,(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                res.send();
            }
        })
    })
});

/**
 *
 *
 * routes de supression
 *
 *
 *
 */

/**************** Suppression conférencier ******************/

app.post('/delConferencier',withAuth,(req,res)=>{

    let id = req.body.id;

    let sql = "update users set isEnabled = -1 WHERE id = "+id+";";

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(sql,(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                res.send();
            }
        })
    })
});
/**************** Suppression Conference ******************/
app.post('/delConference',withAuth,(req,res)=>{

    let id = req.body.conf_id;

    let sql = "update conference set valide = -1 WHERE id = "+id+";";

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(sql,(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                res.send();
            }
        })
    })
});

/**************** Suppression Session ******************/
app.post('/delSession',withAuth,(req,res)=>{

    let id = req.body.session_id;

    let sql = "delete from session WHERE id = "+id+";";

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(sql,(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                res.send();
            }
        })
    })
});

/**************** Suppression Workshop ******************/
app.post('/delWorkshop',withAuth,(req,res)=>{

    let id = req.body.workshop_id;

    let sql = "delete from workshop WHERE id = "+id+";";

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(sql,(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                res.send();
            }
        })
    })
});

/**************** Suppression Article ******************/
app.post('/delArticle',withAuth,(req,res)=>{

    let id = req.body.article_id;

    let sql = "delete from article WHERE id = "+id+";"

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(sql,(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                res.send();
            }
        })
    })
});

/**************** Suppression Users ******************/
app.post('/delUser',withAuth,(req,res)=>{

    let id = req.body.user_id;

    let sql = "update user set status = -1 WHERE email = '"+id+"';"

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(sql,(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                res.send();
            }
        })
    })
});

/**
 *
 *
 * routes de récuprération
 *
 *
 *
 */

/***********************      Route qui import tout les utilisateurs  ***********************/
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

/***********************      Route qui import toutes les conferences  ***********************/
app.post('/conferences',withAuth,(request,response)=>{


    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from conference;",(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                response.send(JSON.stringify(result));
            }
        })
    })
});

/***********************      Route qui import les conferences confirmé  ***********************/
app.post('/conferencesC',withAuth,(request,response)=>{


    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from conference where valide = 1;",(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                response.send(JSON.stringify(result));
            }
        })
    })
});

/***********************      Route qui import les conferences non confirmé  ***********************/
app.post('/conferencesN',withAuth,(request,response)=>{


    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from conference where valide = 0",(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                response.send(JSON.stringify(result));
            }
        })
    })
});

/***********************      Route qui import les utilisateurs confirmé  ***********************/
app.post('/usersConfirme',withAuth,(request,response)=>{


    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from users where isEnabled = 1;",(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                response.send(JSON.stringify(result));
            }
        })
    })
});

/***********************      Route qui import les utilisateurs non confirmé  ***********************/
app.post('/usersNConfirme',withAuth,(request,response)=>{


    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from users where isEnabled = 0;",(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                response.send(JSON.stringify(result));
            }
        })
    })
});

/***********************      Route qui import les conferences d'un utilisateur  ***********************/
app.post('/getUserConference',(request,response)=>{

    user_id = request.body.user_id;

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from conference where id_user = "+user_id+" and valide = 1;",(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                response.send(JSON.stringify(result));
            }
        })
    })
});

/***********************      Route qui import les Sessions d'une conference  ***********************/
app.post('/getUserSession',(request,response)=>{

    let conf_id = request.body.conf_id;

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from session where id_conference = '"+conf_id+"';",(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                response.send(JSON.stringify(result));
            }
        })
    })
});


/***********************      Route qui import les Sessions d'un workshop  ***********************/
app.post('/getSessionWorkshop',(request,response)=>{

    let workshop_id = request.body.workshop_id;

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from session where id_workshop = '"+workshop_id+"';",(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                response.send(JSON.stringify(result));
            }
        })
    })
});

/***********************      Route qui import des workshop d'une conference  ***********************/
app.post('/getUserWorkshop',(request,response)=>{

    let conf_id = request.body.conf_id;

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from workshop where id_conference = '"+conf_id+"';",(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                response.send(JSON.stringify(result));
            }
        })
    })
});

/***********************      Route qui import des articles d'une session  ***********************/
app.post('/getArticle',(request,response)=>{

    session_id = request.body.session_id;

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from article where id_session = '"+session_id+"';",(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                response.send(JSON.stringify(result));
            }
        })
    })
});

/***********************      Affichage Profil utilisateurs  ***********************/
app.post('/getProfil',(request,response)=>{

    let user_id = request.body.user_id;


    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from users where id = '"+user_id+"';",(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                response.send(JSON.stringify(result));
            }
        })
    })
});

/***********************      Affichage des Utilisateurs d'une conference  ***********************/
app.post('/getListUsersConf',(request,response)=>{

    let conf_id = request.body.conf_id;


    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("SELECT * FROM user where idConf = '"+conf_id+"' and status = 1 ;",(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                response.send(JSON.stringify(result));
            }
        })
    })
});

/***********************      Affichage des Utilisateurs d'une conference  ***********************/
app.post('/getListUsersConfN',(request,response)=>{

    let conf_id = request.body.conf_id;


    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("SELECT * FROM user where idConf = '"+conf_id+"' and status = 0;",(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                response.send(JSON.stringify(result));
            }
        })
    })
});

/**
 *
 *
 * routes de mise a jour et confirmation
 *
 *
 *
 */



/***********************      Route confirme une conference  ***********************/
app.post('/confirmeConference', withAuth, (request, response) => {

    let conf_id = request.body.conf_id;

    let sql = "update conference set valide = 1 where id = " + conf_id + ";"

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(sql, (err, result) => {
            connection.release();
            if (err) throw err;
            else {
                response.send(JSON.stringify(result));
            }
        })
    });
});

/**************** Confirmation conférencier ******************/

app.post('/confirmationConferencier',withAuth,(req,res)=>{

    let id = req.body.value.id;
    let email = req.body.value.email

    let sql = "update users set isEnabled = 1 WHERE id = "+id+";";

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(sql,(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                transporter.sendMail({
                    from:'"Administrateur conférence"<testprojetmaster@gmail.com>',
                    to:'<'+email+'>',
                    subject:"Confirmation a la plateforme de gestion de conference",
                    text:'Un administrateur vient de confirmer votre inscription !'
                });
                res.send();
            }
        })
    })
});
/**************** Confirmer Users ******************/
app.post('/confirmerUser',withAuth,(req,res)=>{

    let id = req.body.user_id;

    let sql = "update user set status = 1 WHERE email = '"+id+"';"

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(sql,(err,result)=>{
            connection.release();
            if(err) throw err;
            else{
                res.send();
            }
        })
    })
});

