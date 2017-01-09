(function($) {
    $('.honeycombs').honeycombs({
        combWidth: 220,
        margin: -20,
        threshold: 3
    });

    function handleEvent(mode) {
        var data = [];
        switch (mode) {
            case 1:
                // Movie mode
                data[0] = 200;
                data[1] = 0;
                data[2] = 100;
            case 2:
                // Max brightness
                data[0] = 255;
                data[1] = 255;
                data[2] = 255;
            case 3:
                // Match ambient
                data[0] = 0;
                data[1] = 255;
                data[2] = 0;
            case 4:
                // Custom
                data[0] = 0;
                data[1] = 0;
                data[2] = 0;
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