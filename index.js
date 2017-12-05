$(document).ready(function() {
    $.ajax({
       url: "https://api.myjson.com/bins/2sadq?pretty=1",
        dataType: "json",
        success: function(response) { 
            $.each(response.apartments, function(index, apartment){
                var $apartmentClass = apartment.city.toLowerCase().replace(" ","-");
                
                var $listing = "<a href='#' id='" +apartment.id+ "' class='list-group-item "+$apartmentClass+" listings'><h4 class='list-group-item-heading'>" +apartment.description+ "</h4><p class='list-group-item-text'></p></a>"
                
                $(".apartments").append($listing);
            });     
        },
        error: function(error) {
            console.log(error);
        }
    });
    
    $(".filter").click(function(){  
        /*remove bootstrap active from from ALL tag*/
        $(".filter").removeClass("active");        
        /*add the bootstrap active class to the clicked tab*/
        $(this).addClass("active");
        
        /*show all the cities first*/
        $(".listings").show();
        
        var $city = $(this).attr("id");
        if($city !== "all") {
            /*hide ones not in the filter*/
            $(".listings").not("." + $city).css("display", "none");   
        }
    });
    
    /*to click on an item and go to google maps*/
    $(document).on('click', '.listings', function(){
        var $id = $(this).attr("id");
        
        $.ajax({
        url: "https://api.myjson.com/bins/2sadq?pretty=1",
        dataType: "json",
        success: function(response) { 
            var $selectedApartment = $.grep(response.apartments, function(apartment){
                return apartment.id == $id;
            });
            
            var $address = $selectedApartment[0].address;
            
            /*open maps in new window*/
            window.open("http://maps.google.com/?q=" + $address);
        },
        error: function(error) {
            console.log(error);
        }
    });
    });
});


