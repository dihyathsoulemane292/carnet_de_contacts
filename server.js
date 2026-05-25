const express = require('express'); // 1. On appelle l'assistant Express
const app = express();             // 2. On crée l'application serveur
const port = 3000;                 // 3. On choisit une "porte" d'entrée

// 4. On dit au serveur : "Quand on te demande un fichier, cherche dans le dossier actuel"
app.use(express.static('.'));

// 5. On demande au serveur d'écouter les requêtes sur le port 3000
app.listen(port, () => {
    console.log(`Serveur actif sur http://localhost:${port}`);
});