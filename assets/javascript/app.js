// var listGift = ['<a href="gifts.html">Gift</a>', 'blah', 'blah'];
// var giftList = Math.floor(Math.random() * listGift.length);

// var listWine = ['<a href="wineDay.html">Wine of the Day</a>', 'blah', 'blah'];
// var wineList = Math.floor(Math.random() * listWine.length);


//     if (document.readyState != 'loading'){
//     start();
// } else {
//     document.addEventListener('DOMContentLoaded', gifting);
// }

// function gifting() {


// drop = new Drop({
//         target: document.querySelector('#gifting'),
//         content: listGift[0],
//         position: 'center center',
//         openOn: 'hover',
//         classes: 'drop-theme-arrows-bounce-dark'
//     });
// };

//     if (document.readyState != 'loading'){
//     start();
// } else {
//     document.addEventListener('DOMContentLoaded', wining);
// }

// function wining() {

// drop = new Drop({
//         target: document.querySelector('#dayWine'),
//         content: dayX,
//         position: 'center center',
//         openOn: 'hover',
//         classes: 'drop-theme-arrows-bounce-dark'
//     });
// console.log("dayX on drop = " + dayX);
// };


// $(document).ready(function() {

var strangeFacts=[
        'Wine bottles were once used as projectiles during the French Revolution',
        'Wine is considered a cure for the hiccups',
        'Wine is red or white',
        'Australians like green wine',
        'Random fact 1',
        'Random fact 2'
];
var matchDrink=[
        {title:'Vodka straight or with water/club soda',like:'vodka-straight',match:'sauvignon-blanc'},
        {title:'Vodka with sweet mixer',like:'vodka-sweet',match:'moscato'},
        {title:'Vodka with sour mixer',like:'vodka-sour',match:'chardonnay'},
        {title:'Scotch straight or with water/club soda',like:'scotch',match:'merlot'},
        {title:'Rum straight or with water/club soda',like:'rum-straight',match:'merlot'},
        {title:'Rum with sweet mixer',like:'rum-sweet',match:'zinfandel'},
        {title:'Rum with sour mixer',like:'rum-sour',match:'cabernet-sauvignon'},
        {title:'Gin straight or with water/club soda',like:'gin-straight',match:'mourvedre'},
        {title:'Gin with sweet mixer',like:'gin-sweet',match:'tannat'},
        {title:'Gin with sour mixer',like:'gin-sour',match:'petite-verdot'},
        {title:'Tequila straight',like:'tequila-straight',match:'syrah'},
        {title:'Tequila with sweet mixer',like:'tequila-sweet',match:'tannat'},
        {title:'Tequila with sour mixer',like:'tequila-sour',match:'petit-verdot'},
        {title:'Lager',like:'lager',match:'cabernet-sauvignon'},
        {title:'Ale',like:'ale',match:'merlot'},
        {title:'Beer',like:'beer',match:'merlot'},
        {title:'Hard Lemonade or Hard Iced Tea',like:'hard-lemonade',match:'zinfandel'},
        ];
var matchFood=[
        {title:'Barbeque',like:'barbeque',match:'malbec'},
        {title:'Poultry',like:'poultry',match:'pinot-noir'},
        {title:'Red Meat',like:'red-meat',match:'bordeaux'},
        {title:'Cream Sauces',like:'cream-sauces',match:'chardonnay'},
        {title:'Cold Dishes',like:'cold-dishes',match:'brachetto'},
        {title:'Curry',like:'curry',match:'reisling'},
        {title:'Spicy',like:'spicy',match:'chenin-blanc'},
        {title:'Lasagna',like:'lasagna',match:'carignane'},
        {title:'Salmon',like:'salmon',match:'pinot-noir'},
        {title:'Halibut',like:'halibut',match:'sangiovese'},
        {title:'Sushi',like:'sushi',match:'dry-rose'},
        {title:'Pork',like:'pork',match:'syrah'},
        {title:'Light (White) Chocolate',like:'white-chocolate',match:'muscat'},
        {title:'Dark Chocolate',like:'dark-chocolate',match:'zinfandel'}
];
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBlMaraNlThfpxmkyToi52NGL2HXuTZjOE",
    authDomain: "corknvine-6d5a8.firebaseapp.com",
    databaseURL: "https://corknvine-6d5a8.firebaseio.com",
    storageBucket: "corknvine-6d5a8.appspot.com",
  };
firebase.initializeApp(config);
var database = firebase.database();
var choiceRef = database.ref("/choices");
var eventRef = database.ref("/events");
// var locationRef = database.ref("/locations");

$(document).ready(function() {
        // populate drink match list
        populateMenu('drinkmatchlist',matchDrink,'drinkMatch');
        // populate food match list
        populateMenu('right-side',matchFood,'foodMatch');

  $('#addLocation').on('click', function(){
      var searchTerm="https://www.googleapis.com/customsearch/v1?key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&cx=005427488377789592791:mcug_u68wl4&q=vineyard+";
      var terms=$('#location-input').val().trim();
      terms=terms.replace(/[!@#$%^&*()+=\[\]\{\}\:\;\'\",.<>?/\\|`~]/g,'');
      terms=terms.replace(/ /g,'+');
      searchTerm+=terms;
      console.log(searchTerm);
              $.ajax({url: searchTerm, method: "GET"})
                      .done(function(RETURN) {
                      var title=[];
                      console.log('got here');
                      for (var j=0;j<10;j++){
                              title[j] = {
                               name:RETURN.items[j].title,
                               url:RETURN.items[j].link
                              };
                              console.log(title[j]);
                      }
                              eventRef.set(title);
              });
              setTimeout("pageRedirect('events.html')",2000);
              return false;
  });
});

function populateMenu(menuId,itemId,classId){
        for (var i=0;i<itemId.length;i++){
                $('#'+menuId).append($('<li>').html($('<a>').attr({'class':classId,'value':itemId[i].like})
                        .html(itemId[i].title)));
        }
        $('.'+classId).on('click',function(){
                for (var i=0;i<itemId.length;i++){
                        if ($(this).attr('value')==itemId[i].like){
                                console.log('You like '+($(this).attr('value'))+', so we think you\'ll like '+itemId[i].match);
                                var searchTerm="https://www.googleapis.com/customsearch/v1?key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&cx=005427488377789592791:p7w1yrvn9co&q=";
                                var terms=itemId[i].match;
                                terms=terms.replace(/[!@#$%^&*()+=\[\]\{\}\:\;\'\",.<>?/\\|`~]/g,'');
                                terms=terms.replace(/ /g,'+');
                                searchTerm+=terms;
                                // console.log(searchTerm);
                                        $.ajax({url: searchTerm, method: "GET"})
                                                .done(function(RETURN) {
                                                var title=[];
                                                for (var j=0;j<10;j++){
                                                        title[j] = {
                                                         name:RETURN.items[j].title,
                                                         url:RETURN.items[j].link
                                                        };
                                                        console.log(title[j]);
                                                }
                                                        choiceRef.set(title);
                                        });
                        }
                }
                setTimeout("pageRedirect('pairings.html')",2000);
                // pageRedirect('pairings.html');
                });
}

function pageRedirect(destination){
  console.log('page redirect');
        window.location.href=destination;
        return false;
}

$('#strange').on('click', function(){
        var select=Math.floor(Math.random()*strangeFacts.length);
        console.log(select);
        alert(strangeFacts[select]);
        return false;
});
// $('#addLocation').on('click', function(){
//     var searchTerm="https://www.googleapis.com/customsearch/v1?key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&cx=005427488377789592791:mcug_u68wl4&q=vineyard+";
//     var terms=$('#location-input').val().trim();
//     terms=terms.replace(/[!@#$%^&*()+=\[\]\{\}\:\;\'\",.<>?/\\|`~]/g,'');
//     terms=terms.replace(/ /g,'+');
//     searchTerm+=terms;
//     console.log(searchTerm);
//             $.ajax({url: searchTerm, method: "GET"})
//                     .done(function(RETURN) {
//                     var title=[];
//                     console.log('got here');
//                     for (var j=0;j<10;j++){
//                             title[j] = {
//                              name:RETURN.items[j].title,
//                              url:RETURN.items[j].link
//                             };
//                             console.log(title[j]);
//                     }
//                             // locationRef.set(title);
//             });
//             return false;

// });




// });