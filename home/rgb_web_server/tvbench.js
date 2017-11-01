$('head').append('<title>TV Bench</title>');

$.get('http://ludvigeriksson.com/home/rgb_web_server/tvbench.html', function(data) {
    $('body').html(data);
});