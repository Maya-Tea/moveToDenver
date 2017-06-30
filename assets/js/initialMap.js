
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

   var neighborhoods;
   var geoCodingAPI= "AIzaSyBaw-4l7qS4b_L7kXhuHViE2smEu1k34Dw";
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



   neighborhoodCoordinates();


   function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: {lat: 39.719, lng: -104.94140625}
      
    });

    makeClickableNeighborhoods();
    makeNeighborhoodOverlays();
    addOverlayCoordinateListener();
    
  }

  function zoomNeighborhoodMap(lat, long) {
     map2 = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: lat, lng: long}
      
    });
    
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

 function makeClickableNeighborhoods(){
  var rectangle;
  for(var i=0; i<coorObjectArray.length; i++){
    rectangle = new google.maps.Rectangle({
      //strokeColor: '#FF0000',
      strokeOpacity: 0,
      //strokeWeight: 2,
      //fillColor: '#FF0000',
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



    