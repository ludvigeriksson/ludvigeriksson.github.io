$('head').append('<title>Test123</title>');

$.get('http://ludvigeriksson.com/home/rgb_web_server/linda-kristian.html', function(data) {
    $('body').html(data);
});