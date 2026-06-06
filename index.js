/*
La fonction qui va me permet de recupérer mes données 
de la bases pour l'affichage dans ma pages index.html.
*/
async function afficherContacts(){
    try {
        
        const tbody = document.getElementById("tbody");
        // vider le table avant de le remplir pour evité les doublons.
        tbody.innerHTML = '';

        //le fetch get qui va m'importer mes informations,
        const response = await fetch('/contacts');
        const contacts = await response.json();//la traduction en json()

        //pour chaque élément du tableau l'opération à effectuer .
        contacts.forEach(contact => {
            
            //creation d'une ligne pour chaque éléments avec les données.
            const tr = document.createElement('tr');
            tr.innerHTML =` 
            <td>${contact.nom}</td>
            <td>${contact.telephone}</td>
            <td>${contact.email}</td>
            <td>
                <button data-id="${contact.id}">🗑 Supprimer</button>
                <button>🗒️Modifier</button>
            </td>`;

            //ajouter les données de la tables.
            tbody.appendChild(tr);

            const button = tr.querySelector('button');
            button.addEventListener('click', function() {
                const id = button.dataset.id;
                supprimerContact(id);
            });
        });

    } catch (error) {

        console.error('Erreur : ', error);

    };
};

//appele de la fonction afficheContact() pour l'execution.
afficherContacts();

//la fonction pour supprimer le contacts .
async function supprimerContact(id) {
    try {
        //le fetch vers notre routeur /contacts/id/ pour l'execusion.
        const response = await fetch(`/contacts/${id}`,{
            method : 'DELETE'
        });
        const result = await response.json();
        //reafficher nos contacts dans notre pages web après la suppression du contact.
        afficherContacts();

    } catch (error) {
        //afficher l'erreur en cas d'échec.
        console.error('erreur :', error);

    };
};