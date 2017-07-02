
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBBoyZvc0BR5QIoIoBGD7wepn5wHsZHiNs",
  authDomain: "cool-f0a13.firebaseapp.com",
  databaseURL: "https://cool-f0a13.firebaseio.com",
  projectId: "cool-f0a13",
  storageBucket: "cool-f0a13.appspot.com",
  messagingSenderId: "633106733016"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
   // var coorRef = firebase.database().ref("coor");

   var coorObjectArray =[];

 

   var modal = document.getElementById('myModal');

   
   var rmv_add_Overlay = document.getElementById("removeOverlayButton");

   var restore=document.getElementById("restoreMap");
   var rmvClicked=false;
   

   var span = document.getElementsByClassName("close")[0];

    
   var neighborhoods;
   var neighborhoodArray=[];
   var apiKey="AIzaSyBb44GEujIrnkFexqREwJEXfrOvy5MYlJo";
   var neighborhoodOverlay;
   var neighborhoodOverlay2;
   var neighborhoodOverlay3;
   var neighborhoodOverlayShape;
   
   var imageBounds = {north: 39.814, south: 39.603, east: -104.7305, west: -105.08 };

  var imageBounds2 = {north: 39.825,south: 39.6055,east: -104.7215,west: -105.128 };

    var overlayOpts = {opacity:0.4 } ;
    var overlayOpts2 = {opacity:0.8 } ;

   var map
   var denver = {lat: 39.719, lng: -104.94140625};
   var infowindow;

   rmv_add_Overlay.onclick = function() {
      if(!rmvClicked){
     neighborhoodOverlay3.setMap(null);
     rmv_add_Overlay.innerHTML="Add Overlay";
     rmvClicked=true;
      }
      else{
        rmvClicked=false;
        neighborhoodOverlay3.setMap(map);
        rmv_add_Overlay.innerHTML="Remove Overlay";
      }
   }

    restore.onclick = function() {
      location.reload();
  }

   span.onclick = function() {
    modal.style.display = "none";
  }



   neighborhoodCoordinates();


   function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: denver
      
    });

    makeClickableNeighborhoods();
    makeNeighborhoodOverlays();
    addOverlayCoordinateListener();

    infowindow = new google.maps.InfoWindow();
    //findPlaces(denver, "restaurant");
    
  }

  function findPlaces(coor, type){
  var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: coor,
      radius: 1609,//meters in mile
      rankBy: google.maps.places.RankBy.PROMINENCE,
      //rankBy: google.maps.places.RankBy.DISTANCE,
      type: [type]
    }, usePlaceInfo);
  }

  

  function usePlaceInfo(results, status, pagination) {
     if (status === google.maps.places.PlacesServiceStatus.OK) {
      
      var numBusinesses=Object.keys(results).length;
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      pagination.nextPage();
      // for (var i = 0; i < results.length; i++) {
      //   createMarker(results[i]);
      // }
      //pagination.nextPage();
      // for (var i = 0; i < results.length; i++) {
      //   createMarker(results[i]);
      // }

      console.log(results.length);
    }
  }

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
  }
  var superObject=[];
  function makeObject(coorArr,neighArr,avePriceArr){
        //console.log(coorArr);
        //console.log(neighArr);
        //console.log(avePriceArr);
        console.log(coorArr[1].lat);
        console.log(coorArr[1].lng);
        
        findPlaces(coorArr[9],"restaurant" );

        //Push more items into superObject as needed-work needs to be done to get a number of business
        for(var i=0; i<neighArr.length; i++){
          superObject.push({name:neighArr[i] , coor:coorArr[i], home_price:avePriceArr[i]});
        }
        console.log(superObject);
        //}
  }

  function addOverlayCoordinateListener(){
    google.maps.event.addListener(neighborhoodOverlay3, 'click', function(event) {
      var latitude = event.latLng.lat();
      var longitude = event.latLng.lng();
      console.log( latitude + ', ' + longitude );

      radius = new google.maps.Circle({map: map,
        radius: 100,
        center: event.latLng,
        fillColor: '#777',
        fillOpacity: 0.1,
        strokeColor: '#AA0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
            draggable: true,    // Dragable
            editable: true      // Resizable
          });
    });
  }

  function makeNeighborhoodOverlays(){

    

    neighborhoodOverlay = new google.maps.GroundOverlay(
      'assets/images/neighborhood.png',
      imageBounds, overlayOpts);
   //neighborhoodOverlay.setMap(map)

   neighborhoodOverlay2 = new google.maps.GroundOverlay(
    'assets/images/neighborhood2.png',
    imageBounds2, overlayOpts);
   //neighborhoodOverlay2.setMap(map);

   neighborhoodOverlay3 = new google.maps.GroundOverlay(
    'assets/images/neighborhood3.png',
    imageBounds2, overlayOpts2);
   neighborhoodOverlay3.setMap(map);
 }




  

  function addListenersOnRectangleOver(objectRect, rectangle) {
    google.maps.event.addListener(rectangle, 'mouseover', function (event) {
      $("#myModal").css("display", "inline-block");
         // $("#myModay").css("position","absolute")
         var latitude = event.latLng.lat();
         var longitude = event.latLng.lng();
         $("#neighborhoodTitle").html(objectRect.name);
         $("#modalText").html(objectRect.name+"<p>latitude:"+latitude+"</p><p>longitude:"+longitude+"</p>");

       }); 
  }


 
    function addListenersOnRectangleClick(objectRect, rectangle) {
    google.maps.event.addListener(rectangle, 'click', function (event) {
      var lat = event.latLng.lat();
      var long = event.latLng.lng();
      
    localStorage.setItem("neighborhood", objectRect.name);
    localStorage.setItem("lat",JSON.stringify(lat));
    localStorage.setItem("long",JSON.stringify(long));
    window.location.href="neighborhood.html";
    }); 
    
  } 
  
  function addListenersOnRectangleOut(objectRect, rectangle) {
    google.maps.event.addListener(rectangle, 'mouseout', function (event) {
      $("#myModal").css("display", "none");
      
    });  
  }



  function neighborhoodCoordinates(){
    var j=0;
    for (var i=0;i<neighborhoods.length; i++){

      coorObjectArray.push({name:neighborhoods[i],north:coorArray[j],west:coorArray[j+1], south:coorArray[j+2], east:coorArray[j+3]});
      j=j+4;


    }

    console.log(coorObjectArray);
  }

  function makeClickableNeighborhoods(){
  var rectangle;
  for(var i=0; i<coorObjectArray.length; i++){
    rectangle = new google.maps.Rectangle({
      strokeColor: '#FF0000',
      strokeOpacity: 0,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0,
      map: map,
      bounds: {
        north: coorObjectArray[i].north,
        west:  coorObjectArray[i].west,
        south: coorObjectArray[i].south,
        east: coorObjectArray[i].east
      }
  
      });

    rectangle.setMap(map);
    addListenersOnRectangleOver(coorObjectArray[i],rectangle);
    
    addListenersOnRectangleOut(coorObjectArray[i],rectangle);
    addListenersOnRectangleClick(coorObjectArray[i],rectangle);
    }
  }


function facebookSignin() {
   firebase.auth().signInWithPopup(provider)
   
   .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
    
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
   });
}

function facebookSignout() {
   firebase.auth().signOut()
   
   .then(function() {
      console.log('Signout successful!')
   }, function(error) {
      console.log('Signout failed')
   });
}

   $(document).ready(function() {FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
})});
     // FB.login() 
    // console.log(response);

    // /w/api.php?action=query&format=json&prop=info&titles=Albert+Einstein
 
    var queryURL = "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&origin=*&exintro=&titles=Denver";

      $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      //will need to create var or method to dynamically pull page id, this was just to test API
        console.log(response.query.pages[8522].extract);
        //can put stringify into the .html or .text
        JSON.stringify({response});
        // $("#neighborhoodResults").text(response.query.pages[8522].extract);
        $("#neighborhoodResults").append(response.query.pages[8522].extract);
        
    })


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
// sample  url code "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz194ui711ssr_64j9s&address=2114+Bigelow+Ave&citystatezip=Seattle+Washington"
// adderss need to be in url format example ("2114+bigelow+ave") same with city state ()
function ZillowAPI () {
    console.log('in xizilloe api');
        // var adress = ("&address=" + address);
    // var adressCity = ("&citystatezip=" + city + "+" + state);
    var apiKey = "X1-ZWz194ui711ssr_64j9s";
    // var queryURL = ("http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + key + adress + adressCity);
    // regional url gives out 1.) average house price 2.)neighborhood link 3.)latitude&longitude 4.)
    var regionURL = ("http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=" + apiKey + "&state=Co&city=denver&childtype=neighborhood");
    
    
    $.ajax({
        
        url: regionURL,
        method: "GET"
    }).done(function(response){
        console.log("yes");
        var jsonObj = xmlToJson(response);
        var object = jsonObj["RegionChildren:regionchildren"].response.list.region;

        // var name = object[id].name["#text"] ;
        //var averagePrice = object[id].zindex["#text"] ;
        // var latitude = object[id].latitude["#text"] ;
        // var longitude = object[id].longitude["#text"] ;
        //console.log(Object.keys(object).length);
        console.log(object.length);
        // var jsonObj = xmlToJson(responce);
        // var object = xmlToJson(responce);
        console.log(object);
        //console.log(name);
        //console.log(averagePrice);
        //console.log(latitude);
        //console.log(longitude);
        // var neighborhoods =[];
        var coordinateArray=[];
        var neighborhoodNameArray=[];
        var averageHousePriceArray=[];
        for(var i=0; i<object.length; i++){
          var name = object[i].name["#text"] ;
      
          var latitude = parseFloat(object[i].latitude["#text"]) ;
          var longitude = parseFloat(object[i].longitude["#text"]) ;
          
          neighborhoodNameArray.push(name);
         
          coordinateArray.push({lat:latitude , lng:longitude})
          if (object[i].zindex != undefined ){
          var averagePrice = parseInt(object[i].zindex["#text"]) ;
          
          averageHousePriceArray.push(averagePrice);
          }
          else{
          averageHousePriceArray.push("No Data")
          }
 
        }

    
        makeObject(coordinateArray,neighborhoodNameArray,averageHousePriceArray);
        // object = JSON.parse(object);
        // console.log('this is json', object);
        // $("#data").html(object);
        
    }).fail((err) => {
        console.log('err', err);
    });
}
ZillowAPI();
    
 