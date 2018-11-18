$("head").append("<title>Bedroom</title>");

$.get("http://ludvigeriksson.com/home/rgb_web_server/bedroom.html", function(data) {
    $("body").html(data);
});
