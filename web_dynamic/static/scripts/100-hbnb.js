$(document).ready(function() {
    // Initialize an empty array to store State and City IDs
    var locationIds = [];

    // Function to update the h4 tag with the list of checked Locations
    function updateLocations() {
        // Join the locationIds array into a comma-separated string
        var locationsList = locationIds.join(', ');
        // Update the text of the h4 tag inside the div with class 'Locations'
        $('.Locations h4').text(locationsList);
    }

    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function() {
        var locationId = $(this).data('id'); // Get the State or City ID from the data-id attribute
        var isChecked = $(this).is(':checked'); // Check if the checkbox is checked

        if (isChecked) {
            // If the checkbox is checked, add the State or City ID to the array
            locationIds.push(locationId);
        } else {
            // If the checkbox is unchecked, remove the State or City ID from the array
            var index = locationIds.indexOf(locationId);
            if (index !== -1) {
                locationIds.splice(index, 1);
            }
        }

        // Update the h4 tag with the list of checked Locations
        updateLocations();
    });

    // Listen for click on the button tag
    $('button').click(function() {
        // Make a POST request to places_search endpoint with the list of Amenities, Cities, and States checked
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            contentType: 'application/json',
            data: JSON.stringify({
                amenities: amenityIds,
                cities: locationIds,
                states: locationIds
            }),
            success: function(response) {
                // Handle the response here
                console.log(response);
            },
            error: function(xhr, status, error) {
                console.error('Error occurred:', error);
            }
        });
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
});
