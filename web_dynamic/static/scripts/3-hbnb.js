$(document).ready(function() {
    // Initialize an empty array to store Amenity IDs
    var amenityIds = [];

    // Function to update the h4 tag with the list of checked Amenities
    function updateAmenities() {
        // Join the amenityIds array into a comma-separated string
        var amenitiesList = amenityIds.join(', ');
        // Update the text of the h4 tag inside the div with class 'Amenities'
        $('.Amenities h4').text(amenitiesList);
    }

    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function() {
        var amenityId = $(this).data('id'); // Get the Amenity ID from the data-id attribute
        var isChecked = $(this).is(':checked'); // Check if the checkbox is checked

        if (isChecked) {
            // If the checkbox is checked, add the Amenity ID to the array
            amenityIds.push(amenityId);
        } else {
            // If the checkbox is unchecked, remove the Amenity ID from the array
            var index = amenityIds.indexOf(amenityId);
            if (index !== -1) {
                amenityIds.splice(index, 1);
            }
        }

        // Update the h4 tag with the list of checked Amenities
        updateAmenities();
    });

    // Request API status
    $.ajax({
        type: 'GET',
        url: 'http://0.0.0.0:5001/api/v1/status/',
        success: function(response) {
            if (response.status === 'OK') {
                // If status is "OK", add the class "available" to the div#api_status
                $('#api_status').addClass('available');
            } else {
                // Otherwise, remove the class "available" from the div#api_status
                $('#api_status').removeClass('available');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', error);
        }
    });

    // Request places search
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(response) {
            // Loop through the result and create article tags representing places
            response.forEach(function(place) {
                var article = '<article>' +
                                '<div class="title_box">' +
                                    '<h2>' + place.name + '</h2>' +
                                    '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                                '</div>' +
                                '<div class="information">' +
                                    '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
                                    '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                                    '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
                                '</div>' +
                                '<div class="description">' +
                                    place.description +
                                '</div>' +
                            '</article>';
                $('.places').append(article);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error occurred:', error);
        }
    });
});
