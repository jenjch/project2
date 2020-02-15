$(document).ready( function(){
  $("#collectionBtn").on("click", function() {
    event.preventDefault();
    console.log("CLICKED TO CREATE COLLECTION!")
    $("#nameAlert").addClass("hide")
    $("#descAlert").addClass("hide")
    var CollectionName = $("#colNameIn").val();
    var CollectionDescription = $("#colDescriptionIn").val();
    if (CollectionName.length < 1) {
      $("#nameAlert").removeClass("hide")
      return;
    };
    if (CollectionDescription.length < 1) {
      $("#descAlert").removeClass("hide")
      return;
    };
    console.log("collection is " + CollectionDescription, " and name is " + CollectionName);
    $.post("/api/collections/", { collection_name: CollectionName, description: CollectionDescription }, function(NewCollection) {
      console.log("Collection was saved");
     localStorage.setItem("activeCollectionID",NewCollection.id);
     window.location.href="search";
    });
  }) 

})



    // localStorage.getItem("activeCollectioID") in order to keep using active collection