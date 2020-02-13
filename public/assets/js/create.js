$(document).ready( function(){
  $("#collectionBtn").on("click", function() {
    event.preventDefault();
    console.log("CLICKED TO CREATE COLLECTION!")
    var CollectionName = $("#colNameIn").val();
    var CollectionDescription = $("#colDescriptionIn").val();
    console.log("collection is " + CollectionDescription, " and name is " + CollectionName);
    $.post("/api/collections/", { collection_name: CollectionName, description: CollectionDescription }, function(NewCollection) {
      console.log("Collection was saved");
     localStorage.setItem("activeCollectionID",NewCollection.id);
     window.location.href="search";
    });
  }) 
  $("#addToBtn").on("click", function() {
    event.preventDefault();
    console.log("Boom!");
    var NewPodcastID = $(this).data("podcastId");
    var CollectionID = localStorage.getItem("activeCollectionID");
    $.post("/api/collections/" + CollectionID + "/add/" + NewPodcastID, function(res) {
        console.log(res);
  })
});
})



    // localStorage.getItem("activeCollectioID") in order to keep using active collection