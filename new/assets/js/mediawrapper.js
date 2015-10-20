$(document).ready(function(){
    $("#replayButton").click(function(){
//        var videoPlayer = $("#videoPlayer");
        document.getElementById('videoPlayer').pause();
        document.getElementById('videoPlayer').currentTime = 0;
        document.getElementById('videoPlayer').play();
        $("#replayButton").fadeOut();
    });
    
    document.getElementById('videoPlayer').onended = function(e) {
        $("#replayButton").fadeIn();
    };
});