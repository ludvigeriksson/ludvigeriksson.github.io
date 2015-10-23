$(document).ready(function(){  
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS === false) {
        console.log("Not iOS.");
        $("#cydia-link").hide();
    } else {
        console.log("iOS.")
        $("#bigboss-link").hide();
    }
});