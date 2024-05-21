
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
    "Aaliyah", // Aaliyah
    "https://codehs.com/sandbox/id/ann-elly-final-bhaddie-project-n0agqO", // Ann and Ellie
    "Anthony and Daniel", // Anthony and Daniel
    "https://codehs.com/sandbox/id/apcs-final-project-t7KPFS", // Bea
    "https://openprocessing.org/sketch/2273550", // Camille
    "Chase and Zade", // Chase and Zade
    "Dane", // Dane
    "Felipe", // Felipe
    "Finnley/index.html", // Finnley
    "https://codehs.com/sandbox/id/html-8h2QWb?collaborate=-Ny6Fese4kxieHgZPlmz", // Gavin and Matthew
    "Ider", // Ider
    "Larissa", // Larissa
    "https://codehs.com/sandbox/id/new-sandbox-program-PvAL46?filepath=MyProgram.java", // Liam
    "Lorenzo and Nikita", // Lorenzo and Nikita
    "Owen", // Owen
    "Sam", // Sam
    "https://codehs.com/sandbox/id/2048-shane-final-project-vujDw9" // Shane
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
