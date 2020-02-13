
$(document).ready( function(){
    $("CollectionBtn").on("click", function() {
     event.preventDefault();
      console.log("CLICKED TO CREATE COLLECTION!")
      var CollectionName = $("#colNameIn").val();
      var CollectionDescription = $("#colDescriptionIn").val();
     // pCastSearch = pCastSearch.toLowerCase()
     // .trim();
    console.log("collection is " + CollectionDescription, " and name is " + CollectionName);
      $.post("/api/collections/" + CollectionName + CollectionDescription, function(NewCollection) {
       localStorage.setItem("activeCollectionID",NewCollection.id);
      });
    }) 

    $("#addToBtn").on("click", function() {
      event.preventDefault();
      var NewPodcastID = $(this).data("podcastId");
      var CollectionID = localStorage.getItem("activeCollectionID");
      $.post("/api/collections/" + CollectionID + "/add/" + NewPodcastID, function(res) {
          console.log(res);
    })
});
})



    // localStorage.getItem("activeCollectioID") in order to keep using active collection