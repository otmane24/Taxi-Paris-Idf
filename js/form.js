function generateRandomCode() {
    const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const randomNumbers = '0123456789';

    let code = '';


    // Ajouter trois chiffres aléatoires
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * randomNumbers.length);
        code += randomNumbers.charAt(randomIndex);
    }

    return code;
}

const form = document.getElementById("Reservation-Formulaire");

form.addEventListener("submit", (e) => {
    var erreur;
    var inputs = document.getElementById("Reservation-Formulaire").getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
        console.log(inputs[i])
        if (!inputs[i].value) {
            erreur = "Enter tout les champs du formulaire SVP !";
        }
    }
    if (erreur) {
        e.preventDefault();
        document.getElementById("erreur").innerHTML = erreur;
        return false;
    } else {
        e.preventDefault();
        var Destination = document.getElementById("Destination").value;
        var Depart = document.getElementById("Depart").value;
        var phone = document.getElementById("phone").value;
        var date = document.getElementById("date").value;
        var passenger = document.getElementById("passenger").value;
        var code_course = generateRandomCode();

        var my_text = ` Code course: ${code_course}
                        %0A  
                        %0ARéservation le: ${date}
                        %0A               
                        %0A Adresse départ: ${Depart} 
                        %0A   
                        %0A Adresse de arivée: ${Destination} 
                        %0A      
                        %0A Numéro du client: ${phone}
                        %0A         
                        %0A Nombre de passager: ${passenger}
                       
                    `;

        var token = "6022740417:AAFnC9vt8m4oGNGvWCcXMZxsFC6CQ6zQbi4";
        var chat_id = -4057359205;
        var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${my_text}`;
         

        let api = new XMLHttpRequest();
        api.open("GET", url, true);
        api.send();
        api.onload = function () {
            if (api.status === 200) {
                console.log("Message sent successfully!");

                // Création d'un overlay flou
                var overlayElement = document.createElement('div');
                overlayElement.className = 'overlay';
                document.body.appendChild(overlayElement);

                // Utiliser le même message pour la boîte de dialogue personnalisée
                var popupMessage = "Préparez-vous à recevoir un appel de notre téléconseillère sur le numéro affiché dans les prochains instants : " + phone + ".";

                // Création d'un élément HTML pour afficher la boîte de dialogue personnalisée
                var popupElement = document.createElement('div');
                popupElement.className = 'popup';
                popupElement.innerHTML = `
                    <p>${popupMessage}</p>
                    <button class="ok" id="okButton">OK</button>
                `;
                document.body.appendChild(popupElement);

                // Ajouter un gestionnaire d'événements pour le bouton "OK"
                document.getElementById("okButton").addEventListener("click", function() {
                    // Soumettre le formulaire si l'utilisateur clique sur "OK"
                    document.getElementById("Reservation-Formulaire").submit();
                    
                    // Supprimer l'overlay et la boîte de dialogue personnalisée
                    document.body.removeChild(overlayElement);
                    document.body.removeChild(popupElement);

                    // Rafraîchir la page
                    location.reload();
                });
            } else {
                console.error("Failed to send message. Please try again later.");
            }
        };
    }
});
