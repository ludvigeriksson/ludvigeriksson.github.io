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

    function clickedComb(mode, red, green, blue) {
        var data = [red, green, blue];
        var displayMode = 0;
        switch (mode) {
            case "fire":
                displayMode = 1;
                break;
            case "rainbow":
                displayMode = 2;
                break;
            case "disco":
                displayMode = 3;
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
                break;
        }
        var params;
        if (displayMode === 0) {
            params = [
                'm=' + displayMode,
                'r=' + data[0],
                'g=' + data[1],
                'b=' + data[2]
            ].join('&');
        } else {
            params = 'm=' + displayMode;
        }
        console.log(params);
        var req = new XMLHttpRequest();
        req.open('POST', '?' + params, true);
        req.send();
    }

    $.get('http://ludvigeriksson.com/home/rgb_web_server/honeycombs.html', function(data) {
        $('head').append('<meta name="viewport" content="width=device-width" />');
        $('head').append('<link rel="apple-touch-icon" href="http://ludvigeriksson.com/home/rgb_web_server/icon_iphone.png" />');

        $('.honeycombs').html(data);

        $('.honeycombs').honeycombs({
            combWidth: 220,
            margin: -20,
            threshold: 3
        });

        $('.comb').click(function() {
            clickedComb(this.dataset.mode, this.dataset.red, this.dataset.green, this.dataset.blue);
        });
    });

    $.get('http://10.0.1.4/api/v1/status', function(data) {
        if (data == '1') {
            $('input:checkbox').prop('checked, true');
        }
    });

    $('input:checkbox').change(function() {
        var state = 'off';
        if($(this).is(":checked")) {
            state = 'on';
        }
        var req = new XMLHttpRequest();
        req.open('POST', '/api/v1/' + state, true);
        req.send();
    });

}(jQuery));