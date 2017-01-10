(function($) {
    $.get('honeycombs.html', function(data){
        $('#honeycombs'.html(data);
    });

    $('#honeycombs').honeycombs({
        combWidth: 220,
        margin: -20,
        threshold: 3
    });

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
        switch (parseInt(mode)) {
            case 1:
                // Movie mode
                data[0] = 200;
                data[1] = 0;
                data[2] = 100;
                break;
            case 2:
                // Max brightness
                data[0] = 255;
                data[1] = 255;
                data[2] = 255;
                break;
            case 3:
                // Turn off
                data[0] = 0;
                data[1] = 0;
                data[2] = 0;
                break;
            case 4:
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

    $('.comb').click(function() {
        handleEvent(this.dataset.mode);
    });

}(jQuery));