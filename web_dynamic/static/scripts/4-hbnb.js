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

    // Listen for click event on the button tag
    $('button').click(function() {
        // Send a POST request to places_search endpoint with the list of checked amenities
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: amenityIds }),
            success: function(response) {
                // Handle the response and update the places section accordingly
                console.log('Places search response:', response);
                // Here you can update the places section based on the response
            },
            error: function(xhr, status, error) {
                console.error('Error occurred during places search:', error);
            }
        });
    });
});
