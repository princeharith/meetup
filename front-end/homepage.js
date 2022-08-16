$(function() {
    loadHome();
});

const loadHome = async function(){
    homepage_panel = $("#setup-meet")

    $(`#meetup`).on("click", handleMeetup)
    $('.addfriend').on("click", handleAddFriendPanel);
    $('.addfav').on("click", handleAddFavoritePanel);
    $('#logout').on("click", handleLogout);

    

    const result = axios({
        method: 'get',
        url: 'https://secret-brook-97060.herokuapp.com/',
        withCredentials: true
    }).then((user) => {
        let welcome_tag = 
        //fix styline
        `<h5 class="plsenter" style="float: right;" id="welcome">Welcome, ${user.data}</h5>`

        $('#welcome').replaceWith(welcome_tag)
    })

    //handlers for both boxes to autocomplete
    google.maps.event.addDomListener(window, 'load', initializeFirstBox);
    google.maps.event.addDomListener(window, 'load', initializeSecondBox);

}

const handleLogout = async function(event){
    const result = axios({
        method: 'get',
        url: 'https://secret-brook-97060.herokuapp.com/logout',
        withCredentials: true
    }).then((user) => {
        window.location.href='index.html'
    })

}

//for autocomplete
function initializeFirstBox() {
    var input = document.getElementById('search1');
    var autocomplete = new google.maps.places.Autocomplete(input);
 }

 function initializeSecondBox(){
    var input = document.getElementById('search2');
    var autocomplete = new google.maps.places.Autocomplete(input);
 }
 function initializeThirdBox() {
    var input = document.getElementById('search_friend');
    var autocomplete = new google.maps.places.Autocomplete(input);
 }

 function initializeFourthBox(){
    var input = document.getElementById('search_fav');
    var autocomplete = new google.maps.places.Autocomplete(input);
 }


const handleAddFavoritePanel = function (event){
    event.preventDefault();
    let addfavoritepanel = 
            `<div class = "favoritepanel">
                <label class = "label friend-panel" for = "favname">Location Name:</label>
                <input class = "favname text-box" type = "text" name = "favname" value = "Ex: Home">
                <br>
                <br>
                <label  class = "label friend-address"for = "favaddress">Address:</label>
                <input id = "search_fav"  class = "favaddress text-box" type = "text" placeholder = "Type here...">
                <br>
                <br>
                <button class = "createfav button is-dark add-button">Add</button>
                <br>
            </div>`
    $('.addfav').replaceWith(addfavoritepanel);
    $('.createfav').on("click", handleCreateFavorite);
    initializeFourthBox();


}
const handleCreateFavorite = function(event){
    event.preventDefault();
    let favname = $('.favname').val();
    let favaddress = $('.favaddress').val();
    let favorite = 
    `<div style = "display: inline-block; border: 2px solid powderblue; width: 100%; padding: 10px;">
        <div style = "display: inline-block;">
            <label class = "label">${favname}</label>
            <label class = "${favaddress}" id = "${favaddress}">${favaddress}</label>
        </div>
        <br>
        <br>
        <div style = "display: inline-block;">
            <button id = "${favaddress}" style = "display: inline-block;" class = "meetfav button is-dark">Meet!</button>
        </div>
    </div>`
    $('#Favorites').append(favorite);
    let replacementbutton = `<button class = "addfav">Add a Favorite</button>`
    $('.favoritepanel').replaceWith(replacementbutton);
    $('.addfav').on("click", handleAddFavoritePanel);
    $('.meetfav').on("click", handleMeetFavorite);

}
const handleMeetFavorite = function(event){
    let newaddress = $('.autofilladdress').attr("id");
    $('.city1').val(event.target.id);
}

const handleAddFriendPanel = function (event){
    event.preventDefault();
    let addfriendpanel = 
            `<div class = "friendpanel">
                <label class = "label friend-panel" for = "friendname">Name:</label>
                <input class = "friendname text-box" type = "text" name = "friendname" value = "John Doe">
                <br>
                <br>
                <label class = "label friend-address" for = "friendaddress">Address:</label>
                <input id = "search_friend" class = "friendaddress text-box" type = "text" placeholder = "Type here...">
                <br>
                <br>
                <button class = "createfriend button is-dark add-button">Add</button>
                <br>
            </div>`
    $('.addfriend').replaceWith(addfriendpanel);
    $('.createfriend').on("click", handleCreateFriend);
    initializeThirdBox();

}
const handleCreateFriend = function(event){
    event.preventDefault();
    let friendname = $('.friendname').val();
    let friendaddress = $('.friendaddress').val();
    let friend = 
    `<div style = "display: inline-block; border: 2px solid powderblue; width: 100%; padding: 10px;">
        <div style = "display: inline-block;">
            <label class = "label">${friendname}</label>
            <label class = "${friendaddress}" id = "${friendaddress}">${friendaddress}</label>
        </div>
        <br>
        <br>
        <div style = "display: inline-block;">
            <button id = "${friendaddress}" style = "display: inline-block;" class = "meetfriend button is-dark">Meet!</button>
        </div>
    </div>`
    $('#Friends').append(friend);
    let replacementbutton = `<button class = "addfriend">Add a Friend</button>`
    $('.friendpanel').replaceWith(replacementbutton);
    $('.addfriend').on("click", handleAddFriendPanel);
    $('.meetfriend').on("click", handleMeetFriend);

}

const handleMeetFriend = function(event){
    let newaddress = $('.autofilladdress').attr("id");
    $('.city2').val(event.target.id);
}

const getMidpoint = function(lats, longs){

    let sum_lats = 0;
    let sum_longs = 0;

    for (let i=0; i<lats.length; i++){
        sum_lats = sum_lats + lats[i];
        sum_longs = sum_longs + longs[i];

    }
    
   

    let avg_lat = sum_lats/(lats.length);
    let avg_long = sum_longs/(longs.length);

    let coords = [avg_lat, avg_long];
    

    return coords;

    
}

const handleMeetup = async function(event){
    event.preventDefault();

    // let address1 = $('.streetname1').val() +",+"+$('.city1').val()+ ",+"+$('.state1').val();
    // let formatted_address1 = address1.replace(/ /g,'+')

    // let address2 = $('.streetname2').val() +", "+$('.city2').val()+ ", "+$('.state2').val();
    // let formatted_address2 = address2.replace(/ /g,'+')

    let address1 = $("#search1").val()
    let formatted_address1 = address1.replace(/ /g,'+')

    let address2 = $('#search2').val()
    let formatted_address2 = address2.replace(/ /g, '+')




    let meettype = $('input:radio[name=meetingplace]:checked').val();
    let stars = $('input:radio[name=stars]:checked').val();
    let price = $('input:radio[name=price]:checked').val();

    let latitudes = [];
    let longitudes = [];

    const coords1 = await axios({
        method: 'post',
        //url: 'https://maps.googleapis.com/maps/api/geocode/json?address=425+Hillsborough+St,+Chapel+Hill,+NC&key=AIzaSyDqsQo7CiLijMo6QDo56K2Q_pvjb3-ImH4',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${formatted_address1}&key=AIzaSyDqsQo7CiLijMo6QDo56K2Q_pvjb3-ImH4`
    }).then((results)=> {
        let coords = results['data']['results'][0]['geometry']['location']
        let lat1 = coords.lat;
        latitudes.push(lat1);

        let long1 = coords.lng;
        longitudes.push(long1);

    })

    const coords2 = await axios({
        method: 'post',
        //url: 'https://maps.googleapis.com/maps/api/geocode/json?address=425+Hillsborough+St,+Chapel+Hill,+NC&key=AIzaSyDqsQo7CiLijMo6QDo56K2Q_pvjb3-ImH4',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${formatted_address2}&key=AIzaSyDqsQo7CiLijMo6QDo56K2Q_pvjb3-ImH4`
    }).then((results)=> {
        let coords = results['data']['results'][0]['geometry']['location']
        let lat2 = coords.lat;
        latitudes.push(lat2);

        let long2 = coords.lng;
        longitudes.push(long2);
        
    })
    console.log(latitudes);

    let mid_lat = getMidpoint(latitudes, longitudes)[0];
    let mid_lng = getMidpoint(latitudes, longitudes)[1];

    let request;

    //create request for the meetup and the api to handle

    if(meettype == "Restaurant") {
        if (stars <= 1.5) {
            request = {
                location: new google.maps.LatLng(mid_lat, mid_lng),
                radius: 1000,
                keyword: 'cheap food',
                type: 'restaraunt',
                rating: 1.0
            };
        } else if (stars > 1.51 && stars <2.5) {
            request = {
                location: new google.maps.LatLng(mid_lat, mid_lng),
                radius: 1000,
                keyword: 'cheap food',
                type: 'restaraunt',
                rating: 2.0
            };
        } else if (stars > 2.51 && stars <3.5 && price == "$$$") {
            console.log("here")
            request = {
                location: new google.maps.LatLng(mid_lat, mid_lng),
                radius: 1000,
                keyword: 'food',
                type: 'restaraunt',
                rating: 3.0,
                price_level: 3,
            };
        } else if (stars > 3.51 && stars <4.3) {
            request = {
                location: new google.maps.LatLng(mid_lat, mid_lng),
                radius: 1000,
                keyword: 'quality food',
                type: 'restaraunt',
                rating: 4.0
            };
        } else {
            request = {
                location: new google.maps.LatLng(mid_lat, mid_lng),
                radius: 1000,
                keyword: 'expensive food',
                type: 'restaraunt',
                rating: 5.0
            };
        }
    } else if( meettype == "Mall/Shopping Center") {
        request = {
            location: new google.maps.LatLng(mid_lat, mid_lng),
            radius: 1000,
            keyword: 'shopping',
            type: "shopping_mall"
        };
    } else if(meettype == "Retail") {
        if (stars <= 2.5 || price == '$' || (stars <=3.25 && price == '$$')) {
            request = {
                location: new google.maps.LatLng(mid_lat, mid_lng),
                radius: 1000,
                keyword: 'cheap shopping',
                type: "store",
                price_level: 4
            };
        } else if ((stars == 4 && price == '$$') || (stars == 5 && price == '$$' )) {
            request = {
                location: new google.maps.LatLng(mid_lat, mid_lng),
                radius: 1000,
                keyword: 'quality shopping',
                type: "store",
                price_level: 4
            };
        } else {
            request = {
                location: new google.maps.LatLng(mid_lat, mid_lng),
                radius: 1000,
                keyword: 'expensive shopping',
                type: "store",
                price_level: 4
            };
        }
        
    } else if(meettype == "Recreation") {
        request = {
            location: new google.maps.LatLng(mid_lat, mid_lng),
            radius: 1000,
            keyword: 'recreation',
            type: "park"
        };
    } else if (meettype == "Movie") {
        request = {
            location: new google.maps.LatLng(mid_lat, mid_lng),
            radius: 1000,
            keyword: 'movies',
            type: "movie_theatre"
        };
    } else {
        console.log('edge case')
        request = {
            location: new google.maps.LatLng(mid_lat, mid_lng),
            radius: 1000,
            keyword: 'shopping',
            type: "store"
        };
    };

    let map = $("<div/>", {html: `<div id="map_div"><div id="meet-map"></div>
                            <div id="right-panel">
                            <h2>Results</h2>
                            <ul id="places"></ul>
                            </div>
                            <div id=selector>
                            <div><div id=place></div></div>
                            <div><div id=select-buttons></div</div>
                            </div>
                            </div>`});


    $('#setup-meet').replaceWith(map);

    handleCreateMap(request, mid_lat, mid_lng);

    let meetuppanel = 
        `<div class = "meetuppanel" style = "display: inline-block; border: 2px solid powderblue; width: 100%; padding: 10px;">
            <h3 class = "label">You Meet Between: </h3>
            <label>${address1}</label>
            <h3 class = "label">and</h3>
            <label>${address2}</label>
            <h4 class = "label">With the following prefernces: </h4>
            <label>${meettype}, </label>
            <label>${stars}, </label>
            <label">${price}</label>
        </div>`
        $('#Recents').append(meetuppanel);
}

const handleCreateMap = function(meeting_place, mid_lat, mid_lng){
    initMap(meeting_place, mid_lat, mid_lng);
}

function initMap(request, mid_lat, mid_lng) {
    // Create the map.
    const place = { lat: mid_lat, lng: mid_lng };
    
    const map = new google.maps.Map(document.getElementById("meet-map"), {
        center: place,
        zoom: 15,
        clickableIcons: false,
    });

    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    
    service.search(request, (results, status, pagination) => {
        if (status !== "OK") {console.log("error"); return;}
        createMarkers(results, map, place);

        if (pagination.hasNextPage) {
        getNextPage = pagination.nextPage;
        }
    })

}

function createMarkers(places, map, placeLoc) {
    const bounds = new google.maps.LatLngBounds();
    const placesList = document.getElementById("places");

    let markers = []

    for (let i = 0, place; (place = places[i]); i++) {
        const image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
        };

        let marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location,
        }).addListener('click', (event) => { 
            hideMarkers(event, markers, map);
            addChosenPlace(event);
            addUndoConfirmButtons(placeLoc, markers, map);
        });
        markers.push(marker);

        const li = document.createElement("li");
        li.addEventListener('click', (event) => { 
            hideMarkers(event, markers, map);
            addChosenPlace(event);
            addUndoConfirmButtons(event, markers, map);
        });
        
        li.textContent = place.name;
        placesList.appendChild(li);
        bounds.extend(place.geometry.location);
    }
}

function handleMeetingPlace(event, place) {
    let parse_string = event[0]['innerText'].split(': ');
    let place_name = parse_string[1];

    let html_code = `<div id=confirmation-page>
                        <div>
                        <h5 class="plsenter" style = "float: right; margin-right: 100px;";>Congrats you've chosen to meet your friend at <strong>${place_name}</strong></h1>
                        <br>
                        <div style="text-align: center">
                        <br>
                        <button class="map-buttons"id=google-maps-button>Go to Google Maps</button>
                        </div>
                        </div>
                        </div>`

    let nameArray = place_name.split(' ')
    
    let nameForHtml='';

    for(let i = 0; i < nameArray.length - 1; i++) {
        if (nameArray.length - 2 == i) {
            nameForHtml += nameArray[i]
        } else {
            nameForHtml += nameArray[i]
            nameForHtml += '+'
        }
    }

    let placeLat = place['lat'];
    let placeLng = place['lng'];
    
    let confirmationPage = $('<div/>', {html: html_code})
    $('#meet-map').replaceWith(confirmationPage);
    $('#google-maps-button').on('click', function () {
       window.location.href = `https://www.google.com/maps/place/${nameForHtml}/@${placeLat},${placeLng},17z/`
    })
}

function addUndoConfirmButtons(place, markers, map) {
    let newButtons = $('<div/>')
    let select = $('#select-buttons')

    let backButton = $('<button class="map-buttons" id=back-to-home>Back</button>')
    let undoButton = $('<button class="map-buttons" id=undo-button>Undo</button>')
    let confirmButton = $('<button class="map-buttons" id=confirm-button>Confirm Meeting Place</button>')
    
    newButtons.append(backButton)
    newButtons.append(undoButton)
    newButtons.append(confirmButton)
    select.replaceWith(newButtons)

    $('#confirm-button').on('click', function() {
        $('#selector').hide()
        $('#right-panel').hide()
        handleMeetingPlace($('#chosen-place'), place)})

    $('#undo-button').on('click', function() {
        unhideMarkers(markers, map)
        $('#chosen-place').replaceWith('<div id=place></div>')
    })

    $('#back-to-home').on("click",function(){
        $('#map_div').replaceWith(homepage_panel);
        loadHome();

    } )
}

function hideMarkers(event, markers, map) {
    if(event['path'] == null) {
        for(let i = 0; i < markers.length; i++) {
            markers[i]['j'].setMap(null)
        }
        for(let i = 0; i < markers.length; i++) {
            if (event['nb']["path"][1]['ariaLabel'] == markers[i]['j']['title'] || event['nb']["path"][0]['ariaLabel'] == markers[i]['j']['title']) {
                markers[i]['j'].setMap(map)
            }
        }
    
    } else {
        for(let i = 0; i < markers.length; i++) {
            markers[i]['j'].setMap(null)
        }
        for(let i = 0; i < markers.length; i++) {
            if (event["path"][0]['innerText'] == markers[i]['j']['title']) {
                markers[i]['j'].setMap(map)
            }
        }
    }
}

function unhideMarkers (markers, map) {
    for(let i = 0; i < markers.length; i++) {
        markers[i]['j'].setMap(map);
    }
}

function addChosenPlace(event) {
    let newButtons = $('<div/>')
    let select = $('#place')
    let chosenPlace;
    if(event['path'] == null) {
        if(event['nb']["path"][0]['ariaLabel'] == undefined) {
            chosenPlace = $(`<h5 class="plsenter" id=chosen-place>You have chosen: ${event['nb']["path"][1]['ariaLabel']} </h5>`)
        } else {
            chosenPlace = $(`<h5 class="plsenter" id=chosen-place>You have chosen: ${event['nb']["path"][0]['ariaLabel']} </h5>`)
        }
    } else {
        chosenPlace = $(`<h5 class="plsenter" id=chosen-place>You have chosen: ${event["path"][0]['innerText']}</h5>`);
    }
    newButtons.append(chosenPlace)
    select.replaceWith(newButtons)
}