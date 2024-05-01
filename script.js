function generateCard(names, imageName, altText, url)
{
  return '<div class="card text-center"> <div class="card-body"> <h5 class="card-title">'
    + names  
    + '</h5> <p class="card-text"> <a href="'
    + url 
    + '"> <img src="images/' 
    + imageName 
    + '" alt="'
    + altText
    + '" class="screenshots"> </a> </p> </div> </div>';
}