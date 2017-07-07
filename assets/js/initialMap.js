
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


   var loadingGif=$("<img src='assets/images/loading.gif' id='loadingGif' class='loading'>");
   loadingGif.css('position','absolute');
   loadingGif.css('top','0');

  var biggestObject=[];

   var modal = document.getElementById('myModal');
   var rmv_add_Overlay = document.getElementById("removeOverlayButton");
   var restore=document.getElementById("restoreMap");
   var span = document.getElementsByClassName("close")[0];
  
   


   var apiKey="AIzaSyBb44GEujIrnkFexqREwJEXfrOvy5MYlJo";
   var neighborhoodOverlay;
   var neighborhoodOverlay2;
   var neighborhoodOverlay3;

   
   var imageBounds = {north: 39.814, south: 39.603, east: -104.7305, west: -105.08 };

  var imageBounds2 = {north: 39.825,south: 39.6055,east: -104.7215,west: -105.128 };

    var overlayOpts = {opacity:0.4 } ;
    var overlayOpts2 = {opacity:0.8 } ;

   var map;
   var denver = {lat: 39.719, lng: -104.94140625};
  
   var heatmap;
  var rmvClicked=false;
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


   span.onclick = function() {
    modal.style.display = "none";
  }


   function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: denver
      
    });

   // makeClickableNeighborhoods();
    makeNeighborhoodOverlays();
    //addOverlayCoordinateListener();
    ZillowAPI();
  

    
  }
  //var heatOn=false;
 
  var heatClickedOnce=false;
  var weedClickedOnce=false;
  var pointsHeatMap=[];
  var heatmap;
  var pointsWeedMap=[];
  var weedmap;
  //var corporateClickedOnce=false;

  function toggleHeatmap() {

    if(!heatClickedOnce){
    
    findPlacesRadar("brewery");
    findPlacesRadar("distillery");
    findPlacesRadar("used bookstore");
    findPlacesRadar("record store");
    findPlacesRadar("bike shop");
    findPlacesRadar("coffee shop");
    findPlacesRadar("vintage");

    $("#hipHeatMapButton").text("Creating Heatmap");
    $('#mapDiv').append(loadingGif);
    heatClickedOnce=true;
    //heatOn=true;

    setTimeout(function(){
      loadingGif.remove();
      $("#hipHeatMapButton").text("Toggle Hipster Heatmap");
      console.log(pointsHeatMap);
      makeHeatMap(pointsHeatMap);
    },4000)
  }

  else{
   heatmap.setMap(heatmap.getMap() ? null : map);
  }
}

function toggleWeedmap(){
    
    if(!weedClickedOnce){
      findPlacesWeed("dispensary");

    $("#weedHeatMapButton").text("Creating Heatmap");
    $('#mapDiv').append(loadingGif);
    weedClickedOnce=true;
    //heatOn=true;
    
    setTimeout(function(){
      loadingGif.remove();
      $("#weedHeatMapButton").text("Toggle 420 Heatmap");
      console.log(pointsWeedMap);
      makeWeedMap(pointsWeedMap);
    },3000)
  }

  else{
   weedmap.setMap(weedmap.getMap() ? null : map);

  }
}

function findPlacesWeed(keyword){
var request = {
      bounds: map.getBounds(),
      keyword: keyword
    };
    service = new google.maps.places.PlacesService(map);

  service.radarSearch(request, usePlaceInfoWeed);
  
}

function usePlaceInfoWeed(results, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  
  for (var i = 0, result; result = results[i]; i++) {
      pointsWeedMap.push(results[i].geometry.location);
   }

}
function makeWeedMap(points){
   weedmap = new google.maps.visualization.HeatmapLayer({
          data: points,
          map: map
        });
    weedmap.set('opacity', 0.6);
    weedmap.setMap(map);
}

function findPlacesRadar(keyword) {
    var request = {
      bounds: map.getBounds(),
      keyword: keyword
    };
    service = new google.maps.places.PlacesService(map);

  service.radarSearch(request, usePlaceInfoRadar);
  
}



function usePlaceInfoRadar(results, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  
  for (var i = 0, result; result = results[i]; i++) {
      pointsHeatMap.push(results[i].geometry.location);
   }
  
  
  console.log(pointsHeatMap.length);

}

function makeHeatMap(points){
   heatmap= new google.maps.visualization.HeatmapLayer({
          data: points,
          map: map
        });
    heatmap.set('opacity', 0.6);
}


  var superObject=[];
  
  function makeObject(coorArr,neighArr,avePriceArr){
      
        var realCoorObjectArray=[];
        for (var j=0; j<realCoorArray.length; j++){
          var realCoorObject=[];
          for(var i=0;i<realCoorArray[j].coor.length;i=i+2){
            realCoorObject.push({lat:realCoorArray[j].coor[i],lng:realCoorArray[j].coor[i+1]})

          }
       //   console.log(realCoorArray[j].name);
        realCoorObjectArray.push({name:realCoorArray[j].name,coors:realCoorObject})
      }
      
      realCoorObjectArray.sort(dynamicSort("name"));
      
      //console.log(realCoorObjectArray);
        
        for(var i=0; i<neighArr.length; i++){
          superObject.push({name:neighArr[i] , coor:coorArr[i], home_price:avePriceArr[i],placeInfo:massiveObject[i]});
        }
        
        superObject.sort(dynamicSort("name"));
       // console.log(superObject);
        
        for(var i=0; i<superObject.length; i++){
        biggestObject.push({details:superObject[i],coorInfo:realCoorObjectArray[i]});
        }
        console.log(biggestObject);
        makePolygons();
        
   
        
       

    }

    function hipsterIndex () {
     var hipsterScore = 0;
     console.log("hipster!!!");
    for (i=0; i < 78; i++) {
       
       var bars = massiveObject[i].barCount;
       var restaurants = massiveObject[i].restaurantCount;
       var averagePrice = massiveObject[i].zindex;
       var breweries =  massiveObject[i].brewerieCount;
       var pricepoint = (averagePrice-300000);
       var foodBar = (bars + restaurants);
       // console.log(bars);
        if (breweries > 0) {
            hipsterScore = 3;
        
        } else if (breweries > 5) {
            hipsterScore = 5;
            if (pricepoint > 0) {
                hipsterScore = hipsterScore - (pricepoint/100000)
            }
        } else {
            hipsterScore = (foodBar/15);
        }
        massiveObject[i].hipsterIndex = hipsterScore;
        
     // console.log("new" + massiveObject);
    }
     console.log(massiveObject)
}
hipsterIndex();
  

  function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
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


  function polygonListenerOver(obj, poly) {
    google.maps.event.addListener(poly, 'mouseover', function (event) {
      $("#myModal").css("display", "inline-block");
         // $("#myModay").css("position","absolute")
         var latitude = event.latLng.lat();
         var longitude = event.latLng.lng();
         poly.setOptions({strokeOpacity: .8, fillOpacity: .3});
         $("#neighborhoodTitle").html(obj.details.name);
         $("#modalText").html(obj.details.name);

       }); 
  }

   function polygonListenerOut(obj, poly) {
    google.maps.event.addListener(poly, 'mouseout', function (event) {
      $("#myModal").css("display", "none");
       poly.setOptions({strokeOpacity: 0,fillOpacity: 0});
    
    });  
  }

    function polygonListenerClick(obj, poly) {
    google.maps.event.addListener(poly, 'click', function (event) {
      //var lat = event.latLng.lat();
      //var long = event.latLng.lng();
      
    //localStorage.setItem("neighborhood", obj.Details.name);
    localStorage.setItem("biggestObjectString",JSON.stringify(obj));
    //localStorage.setItem("long",JSON.stringify(long));
    window.location.href="neighborhood.html";
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
  

function makePolygons(){

console.log(biggestObject.length);
   var polyG
    for(var i=0; i<biggestObject.length; i++){
     polyG=new google.maps.Polygon({
         //paths: Barnum,
        paths: biggestObject[i].coorInfo.coors,
        strokeColor: 'blue',
        strokeOpacity: 0,
        strokeWeight: 2,
        fillColor: 'green',
        fillOpacity: 0
      });
       polyG.setMap(map);
    polygonListenerOver(biggestObject[i],polyG);
    polygonListenerOut(biggestObject[i],polyG);
    polygonListenerClick(biggestObject[i],polyG);
   }
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
    
    //$.ajax({url: “https://cors-anywhere.herokuapp.com/yourURLhere
    $.ajax({
        
        url: "https://cors-anywhere.herokuapp.com/"+regionURL,
        method: "GET"
    }).done(function(response){
        console.log("yes");
        var jsonObj = xmlToJson(response);
        var object = jsonObj["RegionChildren:regionchildren"].response.list.region;

     
        var coordinateArray=[];
        var neighborhoodNameArray=[];
        var averageHousePriceArray=[];
        //object.sort(dynamicSort("name['#text']"))
        //console.log(object);
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

function ValidateEmail(mail)  {  
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($("#emailId").val()))  
 {  
  return (true)  
}  
alert("You have entered an invalid email address!")  
return (false)  
}  

$("#validate").on("click", function () {
  ValidateEmail();

  $("#email").text("");
  
      //When firebase is working...we can push to database (could use local storage too), this can be a way to have people leave comments
      
      var modal = document.getElementById('emailModal');
      var span = document.getElementsByClassName("close")[0];

      modal.style.display = "block";

      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }




    })

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
 