//Récupération des Commentaires depuis la base de données
async function GetCommentaire() {
    let comment = await fetch(`http://localhost:3000/Commentaire?publicationLier=${GetArticleID()}`)
    .then(response => response.json())
    .then(json => json.forEach(element => {
        GenerateComment(element);
    }));
}


//Récupération de l'id de l'article
function GetArticleID()
{
    let param = new URLSearchParams(window.location.search);
    let idArticle = param.get("id");
    return idArticle
}

//Génération Automatique des Commentaires
async function GenerateComment(element){
    console.log("test");
    $(document).ready(function(){
        let commentaires = `
        <div class="d-flex align-items-start justify-content-start m-4 border border-dark  ">
            <img src="images/Connexion.png" alt="User Avatar" class="avatar" style="width: 50px; height: 50px;">
            <div class="comment-details ms-3 p-3">
              <p class="comment-message">${element.Contenu}</p>
            </div>
          </div>`; 
        $("#comment").append(commentaires);
    });
}

//Création du Forum
async function CreateForum(id){
    let publication = await fetch(`http://localhost:3000/Publication?id=${id}`)
    .then(response => response.json())
    .then(json => {return json[0];})
        $(document).ready(function(){
        let article = `
        <img src="images/Etu.png" alt="Bootstrap" class="img-fluid" style="max-width: 100%;">
        <div class="p-3">
            <h5 class="tw-bold">${publication.titre}</h5>
        </div>
        <div class="d-flex flex-column p-3">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse illum sit, qui corporis repudiandae laborum ratione labore culpa similique saepe harum temporibus recusandae vel nostrum veniam tempore voluptate? Odio, cumque!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse illum sit, qui corporis repudiandae laborum ratione labore culpa similique saepe harum temporibus recusandae vel nostrum veniam tempore voluptate? Odio, cumque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, nulla ea facere similique enim incidunt ex ullam voluptatum sequi itaque illo rerum fugiat! Dicta laudantium illo vero quisquam distinctio qui.</p>
        </div>
        <img src="images/Info.jpg" alt="Bootstrap"  class="img-fluid" style= "max-width: 80%; width: 500px;">
        <div class="d-flex flex-column p-3">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse illum sit, qui corporis repudiandae laborum ratione labore culpa similique saepe harum temporibus recusandae vel nostrum veniam tempore voluptate? Odio, cumque! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure eum vero optio voluptates sapiente quidem, a nostrum laborum. Natus quam quas dicta possimus dolore. Quos ullam et odit eum quae.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse illum sit, qui corporis repudiandae laborum ratione labore culpa similique saepe harum temporibus recusandae vel nostrum veniam tempore voluptate? Odio, cumque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, nulla ea facere similique enim incidunt ex ullam voluptatum sequi itaque illo rerum fugiat! Dicta laudantium illo vero quisquam distinctio Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, placeat amet atque culpa commodi voluptas soluta eos, perspiciatis nemo ratione, deserunt quos tenetur eius quaerat ipsum voluptatibus assumenda. Nobis, magni?</p>
        </div>
        <!-- Commentaires-->
        <div class="container">
            <h5 class="d-flex justify-content-start m-3">Commentaires</h5>
            <div class="mb-3">
            <textarea class="form-control" id="userComment" rows="5"></textarea>
            </div>
            <button type="submit" class="btn btn-dark border border-1 border-white float-end btn-lg" onclick="EnvoieCommentaire(GetArticleID())">Envoyer</button>
        </div>
        </div>`; 
        $("#Article").append(article);
    });
}

//Envoie d'un Commentaire//`
async function EnvoieCommentaire(id){

    let contenu = $("#userComment").val();
    var nouveauCommentaire = {
        "publicationLier": id,
        "date": new Date(),
        "Contenu": contenu
    };   
    fetch("http://localhost:3000/Commentaire", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nouveauCommentaire),
    })  
}

//------//
GetCommentaire();
CreateForum(GetArticleID());