$(document).ready( function(){

  //---------- Click event from search button on Search page, seraches podcasts database for terms
  // in the input box----------------------------------------

  $("#searchBtn").on("click", function() {
   event.preventDefault();
    console.log("CLICK!")
    var pCastSearch = $("#searchBox").val();
    pCastSearch = pCastSearch.toLowerCase()
    .trim();
    if (pCastSearch.length < 1) {
      $("#searchAlert").removeClass("hide")
      return};
  console.log(pCastSearch);

  //----------------Checking status of radio buttons then get from database and clear search bar-----------

  var istitle = $('input[name=customRadioInline1]:checked').val()  
    $.get("/api/search/" + pCastSearch + "/" + istitle, function(data) {
      $("#searchResults").empty();
      $("#searchBox").val("");
      $("#searchAlert").addClass("hide")

      console.log(data);

  //---------------for each result, appends to results div-----------------------
  
      data.forEach(searchResult => {
        
      $("#searchResults").append("<img id= 'imgResult' src=" + searchResult.image + "/>");
      var br = $("<br>")
      $("#searchResults").append(br)
      $("#searchResults").append("<h6>Podcast ID: " + searchResult.id + "</h6>");
      $("#searchResults").append("<h6>Title: " + searchResult.title + "</h6>");
      $("#searchResults").append("<h6>Author: " + searchResult.author + "</h6>");

  //------------------renders button in search result to add podcast to collection------------- 

      var saveBtns = $("<button>").addClass("saveBtn micButton fa fa-microphone fa-2x addToBtn")
      .attr("podcastid", searchResult.id);
      $("#searchResults").append(saveBtns)
      var hr = $("<hr>").addClass("my-4")
      $("#searchResults").append(hr)
      
  //--------------Click event for button in results to add podcast to collection.----------
  
      $(".addToBtn").on("click", function() {
        event.preventDefault();
        $('.modal').modal('show')
        console.log("Boom!");
        var NewPodcastID = $(this).attr("podcastid");
        var CollectionID = localStorage.getItem("activeCollectionID");
        $.post("/api/collections/" + CollectionID + "/add/" + NewPodcastID, function(res, err) {
            console.log(res);
            console.log(err);
      })
    });  
       });
     });
     });  
 });