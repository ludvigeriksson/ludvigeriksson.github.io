$('head').append('<title>Infinity Mirror</title>');

$.get('http://ludvigeriksson.com/home/rgb_web_server/infinitymirror.html', function(data) {
    $('body').html(data);
});