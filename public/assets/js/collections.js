$(document).ready(function() {
  // window.location.href="./collections"

  // adds the minus icon for collapse which is open by default
  $(".collapse.show").each(function() {
    $(this)
      .prev(".card-header")
      .find(".fa")
      .addClass("fa-minus")
      .removeClass("fa-plus");
  });

  // this updates the toggle icon to show minus icon when collection is clicked
  $(".collapse")
    .on("show.bs.collapse", function() {
      $(this)
        .prev(".card-header")
        .find(".fa")
        .removeClass("fa-plus")
        .addClass("fa-minus");
    })
    .on("hide.bs.collapse", function() {
      $(this)
        .prev(".card-header")
        .find(".fa")
        .removeClass("fa-minus")
        .addClass("fa-plus");
    });

  var nameInput = $(".nameInput");

  // var authorList = $("tbody");
  // var authorContainer = $(".author-container");

  $(".sendCollection").on("click", function(event) {
    var emailInput = $(this).parent().find(".emailInput").first().val().trim();
    var nameInput = $(this).parent().find(".nameInput").first().val().trim();
    console.log(emailInput);
    event.preventDefault();
    if (emailInput.length<1) {
        return alert ("enter email failed")
    }
    console.log("testing");
    // hides the buttons from collection 
    $(this).parent().hide();
    $(this).parent().parent().find(".deleteCollection").hide();
    var collectionContent = $(this).parent().parent().parent().parent().html()

    var emailDeets = { 
        enteredEmail: emailInput, 
        enteredName: nameInput,
        collectionBody: collectionContent
     };
    // var email = {enteredEmail: emailInput};

    $.post("api/send", emailDeets).always(function() {
      console.log("Added " +"Jenny!");
      alert("saved!");
      // reload the page after addition to get the updated list
      location.reload();
    });

    /**
         * , function(err, data) {

            console.log (data);
            console.log ("success!");
            
            location.reload();
        }
         */

    // $.post("api/send", {name: "Jenny"}, function(data) {

    //     console.log (data);
    //     console.log ("success!")
    // })

    // $.ajax("/api/send", {
    //     type: "POST",
    //     data: "Jenny"
    //   }).then(function() {
    //     console.log("Added " + "Jenny!");
    // alert("saved!");
    // reload the page after addition to get the updated list
    //     location.reload();
    //   });
    // });
  });

  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author

  // $(document).on("click", ".deleteCollection", handleDeleteButtonPress);

  //     $(".deleteCollection").on("click", deleteButtonCollection);
  //     // Function for handling what happens when the delete button is pressed
  //   function deleteButtonCollection(event) {

  //     // need to edit these parent variables
  //     // rather than using  var id = $(this).attr("id") ?
  //     var listItemData = $(this).parent("td").parent("tr").data("author");
  //     var id = listItemData.id;

  //       $.ajax({
  //         url: "/api/collections/" + id,
  //         type: "DELETE",
  //         success: function() {
  //           location.reload();
  //         }
  //     });
  //   }
  // experiment with how to send data with ajax to the backend

  // closing document.ready
});
