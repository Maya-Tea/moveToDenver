
var bigObject=JSON.parse(localStorage.getItem("biggestObjectString"));
var centerCoors=bigObject.details.coor;
var outlineCoors=bigObject.coorInfo.coors;
var name= bigObject.details.name;
var price= bigObject.details.home_price;
var imgSource=bigObject.details.placeInfo.imgSource;
console.log(imgSource);
var img=$('<img class="neighborhoodImg" src='+imgSource+'>');

$("#neighborhoodImage").append(img);
$("#neighborhoodName").html(name);

$(".homePrice").append("$"+price);
 
 console.log(bigObject);

 var map;
 var polyG;
 var infowindow;

 function initMap() {
   map= new google.maps.Map(document.getElementById('map'), {
      zoom: 13,

      center: centerCoors
  });

   makePolygon();
   google.maps.Polygon.prototype.getBounds = function() {
    var bounds = new google.maps.LatLngBounds();
    var paths = this.getPaths();
    var path;        
    for (var i = 0; i < paths.getLength(); i++) {
        path = paths.getAt(i);
        for (var ii = 0; ii < path.getLength(); ii++) {
            bounds.extend(path.getAt(ii));
        }
    }
    return bounds;
}
map.fitBounds(polyG.getBounds());
$("#searchPlacesButton").click(function(){
    var query=$("#searchPlacesText").val();
    findPlacesText(centerCoors,query);
});

  findPlaces(centerCoors, 'restaurant');

}

function makePolygon(){

   polyG=new google.maps.Polygon({
         
         paths: outlineCoors,
         strokeColor: 'blue',
         strokeOpacity: 0.8,
         strokeWeight: 2,
         fillColor: 'green',
         fillOpacity: 0
     });
   polyG.setMap(map);
} 

var placeArray=[];
function findPlaces(coor, type){
  infowindow = new google.maps.InfoWindow();

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
      location: coor,
      radius: 1609,//meters in mile
      rankBy: google.maps.places.RankBy.PROMINENCE,
      //rankBy: google.maps.places.RankBy.DISTANCE,
      type: [type],
   
  }, usePlaceInfo);
}

var topRated=[];

function usePlaceInfo(results, status) {
   if (status === google.maps.places.PlacesServiceStatus.OK) {

      var numBusinesses=Object.keys(results).length;
      for (var i = 0; i < results.length; i++) {
        placeArray.push(results[i])
    }
    
    setTimeout(function(){
        topRated=placeArray.sort(dynamicSort("rating"));
        var numToSplice=topRated.length-10;
        topRated.splice(10,numToSplice);
               
        displayTopRestaurants(topRated);
    
    },1000)
}

}
function displayTopRestaurants(top){
    for(var i=0; i<top.length; i++){
        if(!top[i].price_level){
            top[i].price_level="?";
        }
 
    var restItem=$('<div class="topRestaurant">');
    var restName=$('<span class="topName">');
    var restRating=$('<span class="topRate">');
    var restPrice=$('<span class="topPrice">');
    var restLoc=$('<span class="topLocation">');
    restRating.text("Rating: "+top[i].rating+", ");
    restPrice.text(" Price Level: "+top[i].price_level+", ");
    restLoc.text(" Location: "+top[i].vicinity)
    restName.text("#"+(i+1)+". "+top[i].name+"- ");
    restItem.append(restName, restRating, restPrice, restLoc);

    $(".topRestaurants").append(restItem);
    }
}



  function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


if(bigObject.details.placeInfo.query){

  var queryURL = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&origin=*&exintro=&titles=" + bigObject.details.placeInfo.query + "";

  //create variable to pull neighborhood name from Local Storage
  var name = localStorage.getItem("neighborhood");
  $.ajax({

    url: queryURL,
    method: "GET"
  }).done(function(response) {
  JSON.stringify({response});
  //console.log(bigObject.details.placeInfo.pageId)
    
      
      $("#neighborhoodInfo").append(response.query.pages[bigObject.details.placeInfo.pageId].extract);
  });
}
else{
  $("#neighborhoodInfo").append(name+" is a neighborhood in Denver Colorado");
}

