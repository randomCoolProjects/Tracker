 var database;
 
 function config()
 {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDgp_Jze_9F4M_eIug70736-sAPPqYSTrQ",
        authDomain: "iptracker.firebaseapp.com",
        databaseURL: "https://iptracker.firebaseio.com",
        projectId: "iptracker",
        storageBucket: "iptracker.appspot.com",
        messagingSenderId: "442508990361"
    };
    firebase.initializeApp(config);
    database = firebase.database();
}

function writeUserData(ipaddr, data) {
    while(ipaddr.includes("."))
    {
        ipaddr = ipaddr.replace(".", "_");
    }
    firebase.database().ref('logs/' + ipaddr).set({
      data
    });
  }