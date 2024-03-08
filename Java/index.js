
//Récupération des Publications depuis la BD
function GetPublication() {
    fetch("http://localhost:3000/Publication")
    .then(response => response.json())
    .then(json => json.reverse().forEach(Publication => {
        CreatePublication(Publication);
    }));
}

//Création Automatique des Publications
function CreatePublication(Publication){
    $(document).ready(function(){
        let article = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card m-2">
                    <img src="images/Etu.png" class="card-img-top img-fluid>" alt="Image 1" >
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${Publication.titre}</h5>
                        <p class="card-text m-3 text-truncate-2">${Publication.Contenu}</p>
                        <a href="Forum.html?id=${Publication.id}" class="btn btn-primary">Lire la suite</a>
                    </div>
            </div> 
        </div>`; 
        $("#card").append(article);
    });
}
//Confirmation de la publication (et publication)
function confirmerPublication() {
    $("#AddPublication").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        dialogClass: 'custom-dialog',
        modal: true,
        buttons: {
            "Confirmer la publication": function () {
                let titre = $("#titre").val();
                let auteur = $("#auteur").val();
                let contenu = $("#contenu").val();

                var nouvellePublication = {
                    "titre": titre,
                    "auteur": auteur,
                    "date de publication": new Date(),
                    "Contenu": contenu
                };     
                fetch("http://localhost:3000/Publication", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nouvellePublication),
                })
                $(this).dialog("close");
            },
            "Annuler": function () {
                $(this).dialog("close");
            }
        }
    });
}


//--------//
GetPublication();








