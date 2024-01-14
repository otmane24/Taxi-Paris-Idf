




const form = document.getElementById("Reservation-Formulaire")

form.addEventListener("submit",(e)=>{
    var erreur ;
    var inputs =document.getElementById("Reservation-Formulaire").getElementsByTagName("input");
    
    for (var i = 0 ; i< inputs.length ; i++){
        console.log(inputs[i])
        if (!inputs[i].value){
            erreur="Enter tout les champs du formulaire SVP !"
        }
    }
    if (erreur) {e.preventDefault();
    document.getElementById("erreur").innerHTML = erreur
return false;}
else{
    
    e.preventDefault();
    var Destination = document.getElementById("Destination").value;
    var Depart = document.getElementById("Depart").value;
    var phone = document.getElementById("phone").value;
    var date = document.getElementById("date").value;
    var passenger = document.getElementById("passenger").value;
 

    
    
    
    var my_text = ` Réservation le: ${date}
                    %0A               
                    %0A Adresse départ: ${Depart} 
                    %0A   
                    %0A Adresse de arivée: ${Destination} 
                    %0A      
                    %0A Numéro du client: ${phone}
                    %0A         
                    %0A Nombre de passager: ${passenger}
                    %0A

                    `
                    ;  var token="6022740417:AAFnC9vt8m4oGNGvWCcXMZxsFC6CQ6zQbi4";
                    var chat_id =-4057359205;
                    var url= `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${my_text}`;
                   
                    gtag('event', 'conversion', {'send_to': 'AW-11274013815/Z12XCIG30YgZEPeY7_8p'});      
   let api = new XMLHttpRequest();
    api.open("GET",url,true);
    api.send();
    api.onload = function () {
        if (api.status === 200) {
            console.log("Message sent successfully!");
            location.reload(); // Reload the page after successful form submission
        } else {
            console.error("Failed to send message. Please try again later.");
        }
        alert(" Préparez-vous à recevoir un appel de notre téléconseillère sur le numéro affiché dans les prochains instants : "  +phone+ "!" );
    };}
})