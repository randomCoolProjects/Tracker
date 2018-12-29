String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

var latitude = 0;
var longitude = 0;
var IPv4;
var BatteryLevel;
var _data;

config();

var findIP = new Promise(r => { var w = window, a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }), b = () => { }; a.createDataChannel(""); a.createOffer(c => a.setLocalDescription(c, b, b), b); a.onicecandidate = c => { try { c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r) } catch (e) { } } })

/*Usage example*/
findIP.then(ip => IPv4 = ip).catch(e => console.error(e))

navigator.getBattery().then(function (battery) {

    BatteryLevel = battery.level;

    console.log(BatteryLevel);
});

function showLoc()
{
    document.getElementById("lat").innerText = latitude;
    document.getElementById("lng").innerText = longitude;;
}

function initMap() {
    var point = { lat: latitude, lng: longitude };
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 5, center: point });
    var marker = new google.maps.Marker({ position: point, map: map });
    showLoc();
}

function addTableItem(k, value) {
    var key = k;
    while (key.includes("_")) {
        key = key.replace("_", " ");
    }
    key = key.replaceAt(0, key.charAt(0).toUpperCase());

    var el = document.createElement("tr");
    console.log(key, value);
    el.innerText = key + ": " + value;
    document.getElementById("t_data").appendChild(el);
    el.outerHTML = "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
}

function buildTable(data) {
    for (var key in data) {
        if (key == "latitude" || key == "longitude")
        continue;
        var value = data[key];
        addTableItem(key, value);
    }

}

function ShowBrowserLocation(pos) {
    var crd = pos.coords;

    console.log('Sua posição atual é:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('Mais ou menos ' + crd.accuracy + ' metros.');
    latitude = crd.latitude;
    longitude = crd.longitude;
    initMap();
};

function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

$.getJSON('https://ipapi.co/json/', function (data) {
    _data = data;
    addTableItem("IPv4", IPv4);
    addTableItem("Battery:", (BatteryLevel * 100) + "%");
    addTableItem("Browser:", window.navigator.userAgent);

    latitude = Number(data.latitude);
    longitude = Number(data.longitude);

    if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(ShowBrowserLocation);

    console.log(longitude);
    console.log(latitude);
    buildTable(data);
    console.log(JSON.stringify(data, null, 2));
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCpNfnlmtCTyoPYnyN5YRYjGpQ8AzOCjBc&callback=initMap",function () {});
});
