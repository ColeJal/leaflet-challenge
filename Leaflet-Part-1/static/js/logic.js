var earthMap = L.map("map", {
    center: [40.7,-94.5],
    zoom:3
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
}).addTo(earthMap);

var earthGeoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

function getRadius(mag){
    if (mag == 0){
        return 10;
    }
    return mag * 10;
}

function createColor(depth){
    if (depth > 90) {
        return "red"
    }
    else if(depth > 70){
        return "orangered"
    }
    else if(depth > 50){
        return "orange"
    }
    else if(depth > 30){
        return "yellow"
    }
    else if(depth > 10){
        return "greenyellow"
    }
    else {
        return "green"
    }
}

function createStyle(feature){
    console.log("Called create style")
    console.log(feature.properties.mag * 10)
    return {
        fillColor: createColor(feature.geometry.coordinates[2]), 
        color: 'black',
        radius: getRadius(feature.properties.mag),
        fillOpacity: .75,
        stroke: false
    }
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then(geoEarth=>{
    L.geoJSON(geoEarth,{
        pointToLayer: function(feature, coordinates){
            return L.circleMarker(coordinates)
        }
        
        , style: createStyle
        , onEachFeature: function(feature, layer){
            // layer.bindPopup("")
            let date = moment(feature.properties.time);
let formattedDate = date.format("MM/DD/YY HH: mm");
layer.bindPopup(`<h4>${feature.properties.place}</h4>
${formattedDate}<br/>
<b>Magnitude</b> ${feature.properties.mag} 
`)


        }
    }).addTo(earthMap)
})


