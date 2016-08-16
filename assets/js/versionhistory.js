function updateButtonText() {
    if ($('#olderUpdates').is(":visible")) {
        $('#showMoreButton').html('Show less');
    } else {
        $('#showMoreButton').html('Show more');
    }
}

$(document).ready(function(){
    $('#showMoreButton').click(function(){
        $('#olderUpdates').toggle(200, function() {
            updateButtonText();
        });
        $('#moreIndicator').toggle(200, function() {
            updateButtonText();
        });
    });
});