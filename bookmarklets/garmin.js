(function() {

    // Get all the selected (active) rows
    var activeRows = document.querySelectorAll('tr.active');
    var sumTime = 0.0;
    var sumDistance = 0.0;

    for (var i = 0; i < activeRows.length; i++) {
        // The time is in column 1
        var textTime = activeRows[i].children[1].innerHTML.trim();
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
        sumTime += hours*60*60;
        sumTime += minutes*60;
        sumTime += seconds;

        // The distance is in column 4
        var textDistance = activeRows[i].children[4].innerHTML.trim();
        sumDistance += parseFloat(textDistance);
    }

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

    alert('Summary of ' + activeRows.length + ' laps' + '\n\n' + 
          'Time: ' + totalTimeString + '\n' + 
          'Distance: ' + totalDistanceString + 'km' + '\n' +
          'Tempo: ' + Math.floor(mpk) + ':' + mpkSecondsString + 'min/km'
         );

})();