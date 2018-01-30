var coursesReady = false;

var courses;

function loadCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            courses = JSON.parse(this.responseText);
            coursesReady = true;
            if (mapReady) {
                initMap();
            }
        }
    };
    xhttp.open('GET', 'https://raw.githubusercontent.com/ludvigeriksson/reflexbanor/master/courses.json' + '?' + new Date().getTime(), true);
    xhttp.send();
}

loadCourses();