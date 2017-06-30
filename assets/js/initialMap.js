
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC99Z9-GcrrRun9oInxLQfMetAvSpA7M30",
    authDomain: "movetodenver-ec302.firebaseapp.com",
    databaseURL: "https://movetodenver-ec302.firebaseio.com",
    projectId: "movetodenver-ec302",
    storageBucket: "",
    messagingSenderId: "772964444237"
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
      zoomNeighborhoodMap(lat,long);
      var overlayOpts3 = {opacity:1 } ;
      // for (var i=0; i<neighborhoods.length;i++){
      //   neighborhoodOverlayShape = new google.maps.GroundOverlay(
      //     'assets/images/'+objectRect.name+'.png',
      //     imageBounds2, overlayOpts2);
      //   //neighborhoodOverlayShape.setOpacity(.3);
      //   neighborhoodOverlayShape.setMap(map2);
      // }
   //    neighborhoodOverlay4 = new google.maps.GroundOverlay(
   //  'assets/images/neighborhood3.png',
   //  imageBounds2, overlayOpts3);
   // neighborhoodOverlay4.setMap(map2);

   neighborhoodOverlay3.setMap(map2);
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






    