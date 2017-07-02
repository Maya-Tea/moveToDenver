console.log(localStorage.getItem("lat"));
console.log(localStorage.getItem("long"));
console.log(localStorage.getItem("neighborhood"));


//SEND THESE TO APIS!!!
 var lat=JSON.parse(localStorage.getItem("lat"));
 var long=JSON.parse(localStorage.getItem("long"));
 var neighborhood=localStorage.getItem("neighborhood");




function initMap() {
     map2 = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,

      center: {lat: lat, lng: long}

      
    });
    
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
function ZillowAPI (id) {
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
    }).done(function(responce){
        console.log("yes");
        var jsonObj = xmlToJson(responce);
        var object = jsonObj["RegionChildren:regionchildren"].response.list.region;
        
        var name = object[id].name["#text"] ;
        var averagePrice = object[id].zindex["#text"] ;
        var latitude = object[id].latitude["#text"] ;
        var longitude = object[id].longitude["#text"] ;
        // var jsonObj = xmlToJson(responce);
        // var object = xmlToJson(responce);
        console.log(object);
        console.log(name);
        console.log(averagePrice);
        console.log(latitude);
        console.log(longitude);
        // var neighborhoods =[];
    
        
        // object = JSON.parse(object);
        // console.log('this is json', object);
        // $("#data").html(object);
        
    }).fail((err) => {
        console.log('err', err);
    });
}
ZillowAPI(19);