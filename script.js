const form_data = document.getElementById("form");

form_data.addEventListener('submit',function(event){
    //Empêcher la page de se recharger avant la soumission.
    event.preventDefault();

    //Recupérer les informations dans le formulaire.
    const nom = document.getElementById("nom").value;
    const telephone = document.getElementById("telephone").value;
    const email = document.getElementById("email").value;
   
    // Afficher dans le console pour être sûr de les avoir bien recupérer.
    console.log(`nom et prenom : ${nom}`, 
        `numéro de telephone : ${telephone}`,
        `Email : ${email}`);

    console.log("formulaire soumis");

    /*
     Appeller la fonction qui va envoiyer me informations
     du formulaire vers mon server node.
    */
    sendToServer(nom, telephone, email);

});

async function sendToServer(nom, telephone, email){
    try{
        //Le fameux methode POST que j'ai enfin reussi pour la première fois.
        const response = await fetch('/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nom, telephone, email})
        });

        //Affiche la reponse envoyer, pour voir si on a bien envoiyer .
        const result = await response.json();
        console.log(result);

    }catch (error) {
        console.error(error);
    };
};

