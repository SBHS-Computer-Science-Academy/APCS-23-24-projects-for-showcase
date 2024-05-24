
var names = 
[
    "Aaliyah",
    "Ann and Elly",
    "Anthony and Daniel",
    "Bea",
    "Camille",
    "Chase and Zade",
    "Dane",
    "Felipe",
    "Finnley",
    "Gavin and Matthew",
    "Ider",
    "Larissa",
    "Liam",
    "Lorenzo and Nikita",
    "Owen",
    "Sam",
    "Shane"
             
];

var urls = 
[
    "Aaliyah/index.html", // Aaliyah
    "https://codehs.com/sandbox/id/ann-elly-final-bhaddie-project-n0agqO/run", // Ann and Ellie
    "https://codehs.com/sandbox/id/mario-final-6pYkA3/run", // Anthony and Daniel
    "https://codehs.com/sandbox/id/apcs-final-project-t7KPFS/run", // Bea
    "https://openprocessing.org/sketch/2273550", // Camille
    "https://codehs.com/sandbox/id/new-sandbox-program-1S2f6f/run", // Chase and Zade
    "Dane/index.html", // Dane
    "https://e133ba4a-0e67-4bd0-b00c-037c60df2ade-00-2i899cz9fawdt.kirk.replit.dev/", // Felipe
    "Finnley/index.html", // Finnley
    "https://html-10202801.codehs.me/index.html", // Gavin and Matthew
    "Ider/index.html", // Ider
    "https://codehs.com/sandbox/id/game-96s8Ch/run", // Larissa
    "https://codehs.com/sandbox/id/blackjack-1c9aYo/run", // Liam
    "https://html-10202809.codehs.me/index.html", // Lorenzo and Nikita
    "https://codehs.com/sandbox/id/new-sandbox-program-SQrP7Q/run", // Owen
    "https://codehs.com/sandbox/id/chatbot-C9ZUe0/run", // Sam
    "https://codehs.com/sandbox/id/2048-shane-final-project-vujDw9/run" // Shane
];

var gridWidth = 4;
var gridHtml = "";
var idx = 0;

makeGrid();

function generateCard(names, imageName, altText, url)
{
    return '<div class="card text-center"> <div class="card-body"> <h5 class="card-title">'
    + names
    + '</h5> <p class="card-text"> <a href="'
    + url
    + '" target="_blank" rel="noopener noreferrer"> <img src="images/'
    + imageName
    + '" alt="'
    + altText
    + '" class="screenshots"> </a> </p> </div> </div>';
}

function makeCard() {
    if (idx >= names.length) return;
    var name = names[idx];
    var file = name.replaceAll(" ","").replaceAll(",","").replace("and","");
    var url = urls[idx];
    var card = generateCard(name, file + ".png", name + " Project", url);
    gridHtml += card; //not elegant, but it works
    
    idx++;
}


function makeGrid() {
    
    for (var i = 0; i < names.length; i++) {
        if (i % gridWidth == 0) {
            gridHtml += '<div class="row">';
        }
        gridHtml += '<div class="col-md-3 p-3">';
        makeCard();
        gridHtml += '</div>';
        if (i % gridWidth == (gridWidth - 1)) {
            gridHtml += '</div>';
        }
    }
    
    if (names.length % gridWidth != 0) {
        gridHtml += '</div>';
    }
    
    document.getElementById("grid").innerHTML += gridHtml;
    
}
