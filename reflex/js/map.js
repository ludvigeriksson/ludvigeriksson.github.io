let map;
let infoWindow;
var mapReady = false;

function initMap() {
    if (!coursesReady) { mapReady = true; return; }
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(0, 0),
        zoom: 4
    });
    map.data.addGeoJson(courses);

    // When the user clicks, open an infowindow
    infoWindow = new google.maps.InfoWindow();
    map.data.addListener('click', function(event) {
        openInfoWindowForFeature(event.feature);
    }); 

    zoom(map);
}

let infoWindowTitle = `
<h1>{name}</h1>
`;
let infoWindowVariant = `
<div class="variant">
<h2>{name}</h2>
<p>{distance}km</p>
</div>
`;

function openInfoWindowForFeature(feature) {
    let myHTML = infoWindowTitle.replace('{name}', feature.getProperty('name'));
    let variants = feature.getProperty('variants');
    for (let variant of variants) {
        myHTML += infoWindowVariant
            .replace('{name}', variant.name)
            .replace('{distance}', variant.distance);
    }
    infoWindow.setContent('<div class="infoWindow">' + myHTML + '</div>');
    infoWindow.setPosition(feature.getGeometry().get());
    infoWindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
    infoWindow.open(map);
}

/**
 * Update a map's viewport to fit each geometry in a dataset
 * @param {google.maps.Map} map The map to adjust
 */
function zoom(map) {
    var bounds = new google.maps.LatLngBounds();
    map.data.forEach(function(feature) {
        processPoints(feature.getGeometry(), bounds.extend, bounds);
    });
    map.fitBounds(bounds);
}

/**
 * Process each point in a Geometry, regardless of how deep the points may lie.
 * @param {google.maps.Data.Geometry} geometry The structure to process
 * @param {function(google.maps.LatLng)} callback A function to call on each
 *     LatLng point encountered (e.g. Array.push)
 * @param {Object} thisArg The value of 'this' as provided to 'callback' (e.g.
 *     myArray)
 */
function processPoints(geometry, callback, thisArg) {
    if (geometry instanceof google.maps.LatLng) {
        callback.call(thisArg, geometry);
    } else if (geometry instanceof google.maps.Data.Point) {
        callback.call(thisArg, geometry.get());
    } else {
        geometry.getArray().forEach(function(g) {
            processPoints(g, callback, thisArg);
        });
    }
}