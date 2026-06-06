//les besion exterieur ...
const express = require('express');
const mysql = require('mysql2');

//l'utilisation de express apporter . 
const app = express();
const port = 3000;

/*
les informations qu'on à besoin pour assure 
la connexion de notre base avec notre server ... 
*/
const host = 'localhost';
const user = 'dihyath';
const password = 'dihyath292';
const database = 'contacts_db';

//indique ou trouver notre fameux outil express.
app.use(express.static('.'));
app.use(express.json());

//créer la connexion avec mysql.
const connection = mysql.createConnection({host,user,password,database});

//Tester la connection. 
connection.connect(function(err){
    if(err) {
        console.error('Erreur de connexion :', err);
    } else {
        console.log('Connecté à MySQL !');
    }
});


//La route de soumission.
app.post('/contacts', function(req,res){

    //recupération des information soutirer.
    const nom = req.body.nom;
    const telephone = req.body.telephone;
    const email = req.body.email;

    /*
    Les données qu'on veut inserer,
    et les requête pour les inserer dans notre bases de données
    */
    const sql = 'INSERT INTO contacts (nom, telephone, email) VALUES (?, ?, ?)';
    const valeurs = [nom, telephone, email];

    //insertion et verification .
    connection.query(sql, valeurs, function(err, result) {
        if (err) {
            res.json({ succes: false, erreur: err.message });
        } else {
            res.json({ succes: true });
        }
    });

});

//Recupération de mes données dans ma bases de données .
app.get('/contacts', function (req, res){

    const sql = 'SELECT * FROM contacts';

    connection.query(sql, function(err, result) {
        if (err) {
            res.json({ succes: false, erreur: err.message });
        } else {
            res.json(result);
        }
    });

});

//le routeur pour supprimer un contact viser.
app.delete('/contacts/:id',function(req,res){
    //d'abord récupérer l'id du contacts .
    const id = req.params.id;
    //et enfin l'ancer la réquête pour le supprimer de nos contacts.
    const sql = 'DELETE FROM contacts WHERE id = ?';

    //utiliser cette requête pour le supprimer .
    //et vérifier si tout va bien avec notre demande.
    connection.query(sql,[id], function(err, result){
        if (err) {
            res.json({succes: false, erreur: err.message });
        } else {
            res.json(result);
        }
    });

});

//Indique au serveur quelle port écouter.
app.listen(port, function(){
    console.log(`le server http://localhost:${port} est prêt`);
});

