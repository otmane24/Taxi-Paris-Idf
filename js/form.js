function generateRandomCode() {
  const randomLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const randomNumbers = "0123456789";

  let code = "";

  // Ajouter trois chiffres aléatoires
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * randomNumbers.length);
    code += randomNumbers.charAt(randomIndex);
  }

  return code;
}

function getPhoneFormat(countryCode) {
  switch (countryCode) {
    case "(US)":
      return { regex: /(\d{0,3})(\d{0,3})(\d{0,4})/, format: "$1-$2-$3" };
    case "(FR)":
      return {
        regex: /(\d{0,1})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/,
        format: "$1 $2 $3 $4 $5",
      };
    case "(GB)":
      return {
        regex: /(\d{0,2})(\d{0,4})(\d{0,4})/,
        format: "$1 $2 $3",
      };
    // Add more countries as needed
    default:
      return { regex: /(\d+)/, format: "$1" };
  }
}

document.getElementById("phone").addEventListener("input", function (e) {
  // Get the selected country code
  var countryCode = document
    .querySelector(".dropdown-selected")
    .textContent.split(" ")[1];

  // Get the regular expression and the format based on the country code
  var { regex, format } = getPhoneFormat(countryCode);

  var x = e.target.value.replace(/\D/g, "").match(regex);

  if (x[1] === "0") {
    x[1] = "";
    document.getElementById("phoneError").textContent =
      "Le premier chiffre ne doit pas être zéro '0'.";
  } else {
    document.getElementById("phoneError").textContent = "";
  }
  e.target.value = x.slice(1).join(" ").trim();
});
// document.getElementById("phone").addEventListener("input", function (e) {
//   var x = e.target.value
//     .replace(/\D/g, "")
//     .match(/(\d{0,1})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/);

// if (x[1] === "0") {
//   x[1] = "";
//   document.getElementById("phoneError").textContent =
//     "Le premier chiffre ne doit pas être zéro '0'.";
// } else {
//   document.getElementById("phoneError").textContent = "";
// }
//   e.target.value =
//     x[1] +
//     (x[2] ? " " + x[2] : "") +
//     (x[3] ? " " + x[3] : "") +
//     (x[4] ? " " + x[4] : "") +
//     (x[5] ? " " + x[5] : "");
// });


// Get the dropdown container
var dropdown = document.querySelector(".dropdown");

// Get the selected option display
var selected = dropdown.querySelector(".dropdown-selected");

// Get the options container
var options = dropdown.querySelector(".dropdown-options");

// Get the option elements
var optionElements = options.querySelectorAll(".dropdown-option");

// Show/hide options when the selected option display is clicked
selected.addEventListener("click", function () {
  options.style.display = options.style.display === "none" ? "block" : "none";
});

// Update the selected option display when an option is clicked
optionElements.forEach(function (option) {
  option.addEventListener("click", function () {
    selected.textContent = this.textContent;

    options.style.display = "none";
  });
});
// Get the input field
var input = document.getElementById("Depart");

// Get the button
var button = document.getElementById("startGeolocation");

// Function to start geolocation
function startGeolocation() {
  // Check if the Geolocation API is supported
  if (navigator.geolocation) {
    // Get the current position
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Use OpenStreetMap's Nominatim API to get the address
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            // Update the input field with the current address
            input.value = data.display_name;
          })
          .catch((error) => console.error("Error:", error));
      },
      function (error) {
        // Handle error
        console.error("Error obtaining geolocation", error);
      }
    );
  } else {
    // Handle case where Geolocation API is not supported
    console.error("Geolocation API not supported");
  }
}

// Add event listener to the button
button.addEventListener("click", startGeolocation);

const form = document.getElementById("Reservation-Formulaire");

form.addEventListener("submit", (e) => {
  var erreur;
  var inputs = document
    .getElementById("Reservation-Formulaire")
    .getElementsByTagName("input");

  for (var i = 0; i < inputs.length; i++) {
    console.log(inputs[i]);
    if (!inputs[i].value) {
      erreur = "Enter tout les champs du formulaire SVP !";
    }
  }
  if (erreur) {
    e.preventDefault();
    document.getElementById("erreur").innerHTML = erreur;
    return false;
  } else {
    gtag("event", "conversion", {
      send_to: "AW-11274013815/Z12XCIG30YgZEPeY7_8p",
    });
    e.preventDefault();
    var Destination = document.getElementById("Destination").value;
    var Depart = document.getElementById("Depart").value;
    var phone = document.getElementById("phone").value;
    var date = document.getElementById("date").value;
    var passenger = document.getElementById("passenger").value;
    var code_course = generateRandomCode();
    var plus = "%2B";
    var str =
      "Numéro du clients: " + plus + selected.textContent.split(" ")[0] + phone;
    console.log(str);
    var my_text = `     Taxi Paris Idf
                        %0A
                        %0ACode course: ${code_course}
                        %0A  
                        %0ARéservation le: ${date}
                        %0A               
                        %0A Adresse départ: ${Depart} 
                        %0A   
                        %0A Adresse de arivée: ${Destination} 
                        %0A      
                        %0A ${str}
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
        var overlayElement = document.createElement("div");
        overlayElement.className = "overlay";
        document.body.appendChild(overlayElement);

        // Utiliser le même message pour la boîte de dialogue personnalisée
        var popupMessage =
          "Préparez-vous à recevoir un appel de notre téléconseillère sur le numéro affiché dans les prochains instants : " +
          phone +
          ".";

        // Création d'un élément HTML pour afficher la boîte de dialogue personnalisée
        var popupElement = document.createElement("div");
        popupElement.className = "popup";
        popupElement.innerHTML = `
                    <p>${popupMessage}</p>
                    <button class="ok" id="okButton">OK</button>
                `;
        document.body.appendChild(popupElement);

        // Ajouter un gestionnaire d'événements pour le bouton "OK"
        document
          .getElementById("okButton")
          .addEventListener("click", function () {
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
