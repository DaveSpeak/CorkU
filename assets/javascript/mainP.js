$(document).ready(function() {
  var dayX = "";
  var imageX;
  var nameX;
  var wineX;
  var linkX;


    $.ajax({
            url: 'https://api.snooth.com/wines/?akey=wy1wfb4xvzcqbqhvvxf5yay3z8yt9vynuftd6n80bi9y9f56&q=wine&n=1&sr',
            method: 'GET',
        }).done(function(response) {
           console.log(JSON.parse(response));

      wineX = JSON.parse(response);

      console.log("long version image =" + wineX.wines[0].image);
      console.log("long version name =" + wineX.wines[0].name);

      nameX = ("<h3>" + wineX.wines[0].name + "</h3>");
      imageX = ('<img src="' + wineX.wines[0].image + '">');
      linkX = ('<a href="' + wineX.wines[0].link + '"><h2 id="region">-LINK-</h2></a>');


      console.log("link = " + imageX);
      console.log("Wine: " + nameX + " image: " + imageX + " Link: " + linkX);

        dayX = (imageX + nameX +  linkX);
        console.log("dayX = " + dayX);

    wining();
        });

        function wining() {

          drop = new Drop({
            target: document.querySelector('#dayWine'),
            content: dayX,
            position: 'center center',
            openOn: 'hover',
            classes: 'drop-theme-arrows-bounce-dark'
          });

          console.log("dayX on drop = " + dayX);
          };

          console.log("dayX = " + dayX);

      var quotes = ['“In victory, you deserve Champagne. In defeat you need it.” ― Napoleon Bonaparte',
       '“Beer is made by men, wine by God.”― Martin Luther',
       '“I cook with wine, sometimes I even add it to the food.” ― W.C. Fields',
       '“It takes a lot of good beer to make great wine” ― Brian O’Donnell, Winemaker of Belle Pente',
       '“Either give me more wine or leave me alone.” - Rumi',
       '“What wine goes with Captain Crunch?” - George Carlin',
       '“Wine is the most healthful and most hygienic of beverages.” -  Louis Pasteur',
       '“Anyone who tries to make you believe that he knows all about wines is obviously a fake.” -  Leon Adams',
       '“A man will be eloquent if you give him good wine.” – Ralph Waldo Emerson',
       '“One of the disadvanages of wine is that it makes a man mistake words for thoughts.” – Samuel Johnson',
       '“When it came to writing about wine, I did what almost everybody does – faked it” – Art Buchwald',
       '“Wine makes daily living easier, less hurried, with fewer tensions and more tolerance.” – Benjamin Franklin',
       '“My only regret in life is that I did not drink more wine.” – Ernest Hemingway',
       '“There can never be any substitute for your own palate nor any better education than tasting the wine yourself.” – Robert Parker'];

        $('#randomQ').on('mouseover', function(){
            choices = Math.floor(Math.random() * quotes.length);
            quote = quotes[choices];

            $("#quote-back").html(quote);
        });
  });