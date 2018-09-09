(function() {

    var activeRows = document.querySelectorAll('tr.active');
    if (activeRows.length === 0) {
        alert('No selected rows.');
        return;
    }

    var table = document.querySelector('#tab-splits table');

    var timeRow;
    var distanceRow;
    var pulseRow;
    table.querySelectorAll('th').forEach((th, i) => {
        switch (th.innerHTML.trim().toLowerCase()) {
            case 'time':
            case 'tid':
                timeRow = i;
                break;
            case 'distance':
            case 'sträcka':
                distanceRow = i;
                break;
            case 'avg hr':
            case 'medelpuls':
                pulseRow = i;
                break;
            default:
                break;
        }
    });

    var sumTime = 0.0;
    var sumDistance = 0.0;
    var sumPulse = 0.0;

    activeRows.forEach(tr => {
        var textTime = tr.children[timeRow].innerHTML.trim();
        var timeParts = textTime.split(':');
        var hours = 0;
        var minutes = 0;
        var seconds = 0.0;
        if (timeParts.length === 3) {
            hours = parseInt(timeParts[0]);
            timeParts.splice(0, 1);
        }
        minutes = parseInt(timeParts[0]);
        seconds = parseFloat(timeParts[1]);
        var time = hours*60*60 + minutes*60 + seconds;
        sumTime += time;

        if (distanceRow) {
            var textDistance = tr.children[distanceRow].innerHTML.trim();
            sumDistance += parseFloat(textDistance);
        }

        if (pulseRow) {
            var textPulse = tr.children[pulseRow].innerHTML.trim();
            sumPulse += parseInt(textPulse) * time;
        }
    });

    var totalTimeDate = new Date(null);
    totalTimeDate.setMilliseconds(sumTime*1000);
    var totalTimeString = totalTimeDate.toISOString().substr(11, 11);
    var totalDistanceString = sumDistance.toFixed(2);

    var mpk = (sumTime / 60) / sumDistance;
    var mpkSeconds = Math.round((mpk - Math.floor(mpk)) * 60);
    var mpkSecondsString = String(mpkSeconds);
    if (mpkSeconds < 10) {
        mpkSecondsString = '0' + mpkSecondsString;
    }

    var avgPulse = sumPulse / sumTime;
    var avgPulseString = avgPulse.toFixed(0);

    var message = '';

    message += `Summary of ${activeRows.length} laps\n\n`;
    message += `Time: ${totalTimeString}\n`;
    message += `Distance: ${totalDistanceString}km\n`;
    message += `Tempo: ${Math.floor(mpk)}:${mpkSecondsString}min/km\n`;
    if (avgPulse) {
        message += `Average pulse: ${avgPulseString}bpm`;
    }

    alert(message);
})();