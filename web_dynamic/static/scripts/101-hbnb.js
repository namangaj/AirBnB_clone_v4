$(document).ready(function() {
    // Initialize an empty array to store State and City IDs
    var selectedStates = [];
    var selectedCities = [];

    // Function to update the h4 tag with the list of checked States or Cities
    function updateLocations() {
        // Join the selectedStates array into a comma-separated string
        var statesList = selectedStates.join(', ');
        // Update the text of the h4 tag inside the div with class 'Locations'
        $('.Locations h4').text(statesList);

        // Join the selectedCities array into a comma-separated string
        var citiesList = selectedCities.join(', ');
        // Update the text of the h4 tag inside the div with class 'Locations'
        $('.Locations h4').append(", " + citiesList);
    }

    // Listen to changes on each input checkbox tag for States
    $('input[type="checkbox"][data-type="state"]').change(function() {
        var stateId = $(this).data('id'); // Get the State ID from the data-id attribute
        var isChecked = $(this).is(':checked'); // Check if the checkbox is checked

        if (isChecked) {
            // If the checkbox is checked, add the State ID to the array
            selectedStates.push(stateId);
        } else {
            // If the checkbox is unchecked, remove the State ID from the array
            var index = selectedStates.indexOf(stateId);
            if (index !== -1) {
                selectedStates.splice(index, 1);
            }
        }

        // Update the h4 tag with the list of checked States
        updateLocations();
    });

    // Listen to changes on each input checkbox tag for Cities
    $('input[type="checkbox"][data-type="city"]').change(function() {
        var cityId = $(this).data('id'); // Get the City ID from the data-id attribute
        var isChecked = $(this).is(':checked'); // Check if the checkbox is checked

        if (isChecked) {
            // If the checkbox is checked, add the City ID to the array
            selectedCities.push(cityId);
        } else {
            // If the checkbox is unchecked, remove the City ID from the array
            var index = selectedCities.indexOf(cityId);
            if (index !== -1) {
                selectedCities.splice(index, 1);
            }
        }

        // Update the h4 tag with the list of checked Cities
        updateLocations();
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

    // Toggle reviews visibility when span is clicked
    $('#showReviews').click(function() {
        var buttonText = $(this).text();
        if (buttonText === 'show') {
            // Fetch and display reviews
            $.ajax({
                type: 'GET',
                url: 'http://0.0.0.0:5001/api/v1/reviews/',
                success: function(response) {
                    // Display reviews
                    response.forEach(function(review) {
                        $('.reviews').append('<li>' + review.text + '</li>');
                    });
                    // Change button text to "hide"
                    $('#showReviews').text('hide');
                },
                error: function(xhr, status, error) {
                    console.error('Error occurred:', error);
                }
            });
        } else if (buttonText === 'hide') {
            // Remove all Review elements from the DOM
            $('.reviews').empty();
            // Change button text to "show"
            $('#showReviews').text('show');
        }
    });
});
