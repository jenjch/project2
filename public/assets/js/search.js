// wrap; make sure we wait to attach our handlers until the DOM is fully loaded.


$("#searchBtn").on("click", function() {
  var pCastSearch = $("#searchBox")
  pCastSearch = pCastSearch.replace(/\s+/g, "").toLowerCase();
  .val()
  .trim();
  $.get("/api/search/" + pCastSearch, function(data) {
    console.log(data);

    $("#searchResults").empty();

    $("#searchResults").append("<h2" + data.title + "</h2>");

  });
});






