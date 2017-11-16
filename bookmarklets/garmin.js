(function() {

    var activeRows = document.querySelectorAll('tr.active');
    var sumTime = 0.0;
    var sumDistance = 0.0;

    for (var i = 0; i < activeRows.length; i++) {
        var textTime = activeRows[i].children[1].innerHTML.trim();
        var minutes = parseInt(textTime.split(':')[0]);
        var seconds = parseFloat(textTime.split(':')[1]);
        sumTime += minutes*60;
        sumTime += seconds;

        var textDistance = activeRows[i].children[4].innerHTML.trim();
        sumDistance += parseFloat(textDistance);
    }

    var totalTimeDate = new Date(null);
    totalTimeDate.setMilliseconds(sumTime*1000);
    var totalTimeString = totalTimeDate.toISOString().substr(11, 11);
    var totalDistanceString = String(sumDistance);

    var mpk = (sumTime / 60) / sumDistance;
    var mpkSeconds = Math.round((mpk - Math.floor(mpk)) * 60);

    alert('Summary of ' + activeRows.length + ' laps' + '\n\n' + 
          'Time: ' + totalTimeString + '\n' + 
          'Distance: ' + totalDistanceString + 'km' + '\n' +
          'Tempo: ' + Math.floor(mpk) + ':' + mpkSeconds + 'min/km'
         );

})();