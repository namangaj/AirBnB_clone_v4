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
});
