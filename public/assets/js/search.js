$(document).ready( function(){
  //---------- Click event from search button on Search page, seraches podcasts database for terms
  // in the input box----------------------------------------
  $("#searchBtn").on("click", function() {
   event.preventDefault();
    console.log("CLICK!")
    var pCastSearch = $("#searchBox").val();
    pCastSearch = pCastSearch.toLowerCase()
    .trim();
  console.log(pCastSearch);

  //----------------Checking status of radio buttons then get from database-----------------
  var istitle = $('input[name=customRadioInline1]:checked').val()  
    $.get("/api/search/" + pCastSearch + "/" + istitle, function(data) {
      $("#searchResults").empty();
      console.log(data);

  //---------------for each result, appends to results div-----------------------
  
      data.forEach(searchResult => {
        
      $("#searchResults").append(searchResult.id);
      $("#searchResults").append("<img id= 'imgResult' src=" + searchResult.image + "/>");
      $("#searchResults").append("<h6>Title: " + searchResult.title + "</h6>");
      // $("#searchResults").append("<h6>Language: " + searchResult.language + "</h6>");
      // $("#searchResults").append("<h6>Author: " + searchResult.author + "</h6>");

  //------------------renders button in search result to add podcast to collection------------- 

      var saveBtns = $("<button>").addClass("saveBtn micButton fa fa-microphone fa-2x addToBtn")
      .attr("podcastid", searchResult.id);
      $("#searchResults").append(saveBtns)

  //--------------Click event for button in results to add podcast to collection.----------
      $(".addToBtn").on("click", function() {
        event.preventDefault();
        console.log("Boom!");
        var NewPodcastID = $(this).attr("podcastid");
        var CollectionID = localStorage.getItem("activeCollectionID");
        $.post("/api/collections/" + CollectionID + "/add/" + NewPodcastID, function(res, err) {
            console.log(res);
            console.log(err);
      })
    });
      var hr = $("<hr>").addClass("my-4")
      $("#searchResults").append(hr)
  
        });
      });
    });  
  });
  


// id: 20
// title: "Rocket"
// image: "http://is5.mzstatic.com/image/thumb/Music71/v4/15/b4/40/15b440b0-1fa5-cb82-fa82-f7174a77e69a/source/600x600bb.jpg"
// description: "Countdown to excitement! Every week Christina Warren, Brianna Wu and Simone de Rochefort have accelerated geek conversation. Tech, comics, movies, games and books, no galaxy is off limits! Hosted by Brianna Wu, Christina Warren, and Simone De Rochefort."
// language: "English"
// categories: "Technology | Gadgets"
// website: "https://www.relay.fm/rocket"
// author: "Relay FM"
// itunes_id: 959773870
// createdAt: "2020-02-02T12:00:00.000Z"
// updatedAt: "2020-02-02T12:00:00.000Z"

// .attr("id", blocks[i] + "save")




