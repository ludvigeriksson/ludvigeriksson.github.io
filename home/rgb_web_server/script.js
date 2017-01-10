(function($) {
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function handleEvent(mode) {
        var data = [];
        switch (mode) {
            case "white":
                data[0] = 255;
                data[1] = 255;
                data[2] = 255;
                break;
            case "movie_mode":
                data[0] = 58;
                data[1] = 34;
                data[2] = 4;
                break;
            case "warm":
                data[0] = 255;
                data[1] = 104;
                data[2] = 0;
                break;
            case "cold":
                data[0] = 56;
                data[1] = 122;
                data[2] = 255;
                break;
            case "ice":
                data[0] = 36;
                data[1] = 238;
                data[2] = 255;
                break;
            case "romantic":
                data[0] = 147;
                data[1] = 17;
                data[2] = 25;
                break;
            case "lavender":
                data[0] = 63;
                data[1] = 2;
                data[2] = 255;
                break;
            case "turn_off":
                // Turn off
                data[0] = 0;
                data[1] = 0;
                data[2] = 0;
                break;
            case "custom":
                // Custom
                var hex = $('#customInput').val();
                var rgb = hexToRgb(hex);
                data[0] = rgb.r;
                data[1] = rgb.g;
                data[2] = rgb.b;
                break;
            default:
                return;
        }
        var params = [
            'r=' + data[0],
            'g=' + data[1],
            'b=' + data[2]
        ].join('&');
        var req = new XMLHttpRequest();
        req.open('POST', '?' + params, true);
        req.send();
        console.log('sent: ' + req);
    }

    $.get('http://ludvigeriksson.com/home/rgb_web_server/honeycombs.html', function(data) {
        $('.honeycombs').html(data);

        $('.honeycombs').honeycombs({
            combWidth: 220px,
            margin: -20,
            threshold: 3
        });

        $('.comb').click(function() {
            handleEvent(this.dataset.mode);
        });

        $(window).trigger('resize');
    });

}(jQuery));