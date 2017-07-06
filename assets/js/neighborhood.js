//console.log(localStorage.getItem("lat"));
//console.log(localStorage.getItem("long"));
//console.log(localStorage.getItem("neighborhood"));


//SEND THESE TO APIS!!!
 var bigObject=JSON.parse(localStorage.getItem("biggestObjectString"));
 var centerCoors=bigObject.details.coor;
 var outlineCoors=bigObject.coorInfo.coors;
 var name= bigObject.details.name;
$("#neighborhoodName").html(name);
 // var long=JSON.parse(localStorage.getItem("long"));
 // var neighborhood=localStorage.getItem("neighborhood");
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
        console.log(query);
        findPlacesText(centerCoors,query);
     });

  //  findPlaces(centerCoors, 'restaurant');

}

function makePolygon(){

  
     polyG=new google.maps.Polygon({
         //paths: Barnum,
        paths: outlineCoors,
        strokeColor: 'blue',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'green',
        fillOpacity: 0
      });
       polyG.setMap(map);
    //polygonListenerOver(biggestObject[i],polyG);
    //polygonListenerOut(biggestObject[i],polyG);
    //polygonListenerClick(biggestObject[i],polyG);

   
} 


function findPlacesText(coor,searchText){
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
 var request = {
    location: coor,
   // radius: 1609,
   bounds: map.getBounds(),
   rankBy: google.maps.places.RankBy.DISTANCE,
    query: searchText
  };


  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, usePlaceInfoText);
}
function usePlaceInfoText(results, status, pagination) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  pagination.nextPage();
  
      console.log(results.length);
      display(results);
      return results;
      //console.log(results);
  }
}
function display(results){
  console.log(results);
}


  function findPlaces(coor, type){
      infowindow = new google.maps.InfoWindow();

  var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: coor,
      radius: 1609,//meters in mile
      rankBy: google.maps.places.RankBy.PROMINENCE,
      //rankBy: google.maps.places.RankBy.DISTANCE,
      type: [type],
      //query:'brewery'
    }, usePlaceInfo);
  }

  

  function usePlaceInfo(results, status, pagination) {
     if (status === google.maps.places.PlacesServiceStatus.OK) {
      
      var numBusinesses=Object.keys(results).length;
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      pagination.nextPage();
  
      console.log(results.length);
    }
  }
//var markerArray;
  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
    //markerArray.push(marker);
  }

// Changes XML to JSON
function xmlToJson(xml) {
    
    // Create the return object
    var obj = {};
    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }
// do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};

 $("#initialSubmit").on("click", function() {
    event.preventDefault();
    console.log("click working");
// function that calculates optimal fit
// adds points to user match..... neighborhoods with the highest match number are the top 3
    var userMatch = 0;
    var matchArray = [];
    // var userHipster =  $("#").val().trim();
    // var houseMax = $("#").val().trim();
    // var userParks = $("#").val().trim();
    // var nighLife = $("#").val().trim();
    var userHipster =  4;
    var houseMax = 550000;
    var userParks = 3;
    var nighLife = true;
    for (i=0; i < 78; i++) {
        userMatch = 0;
        
        var bars = massiveObject[i].barCount;
        var restaurants = massiveObject[i].restaurantCount;
        var averagePrice = massiveObject[i].zindex;
        var breweries =  massiveObject[i].brewerieCount;
        var parks = massiveObject[i].parks;
        var hipsterIndex = massiveObject[i].hipsterIndex;
        var foodBar = (bars + restaurants);
        // multiplies user input times neighborhood value
        userMatch += userHipster * hipsterIndex ;
        userMatch += userParks * parks;
        
        if (nighLife) {
            userMatch += (foodBar/2) 
        } else {
            userMatch -= (foodBar/10)
        }
        if (averagePrice > houseMax) {
            userMatch -= 30;
        } ;
        massiveObject[i].userMatch = userMatch;
        matchArray.push(userMatch);
    }
    console.log(massiveObject);
    var maxMatch = Math.max.apply(null, matchArray); 
    var closeMatch = maxMatch - 1;
    console.log(maxMatch);
    for (i=0; i < 78; i++) {
        var neighborhoodMatch = massiveObject[i].userMatch;
        if (neighborhoodMatch > closeMatch) {
            console.log(i+massiveObject[i]);
            // print out button that takes to link
        }
    }
 });