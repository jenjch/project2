$(document).ready(function() {
  // window.location.href="./collections"

  // for controlling plus/minus symbols added to the bootstrap accordion
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

  // on click event for sending a specific collection via nodemailer to email
  $(".sendCollection").on("click", function(event) {
    event.preventDefault();

    console.log("testing send collection click!");

    // grab the value of the nameInput and emailInput (define the relationship of the sendCollection button to the actual input field) .first() is jquery to select to select first matching element (just to be safe)
    var emailInput = $(this)
      .parent()
      .find(".emailInput")
      .first()
      .val()
      .trim();
    var nameInput = $(this)
      .parent()
      .find(".nameInput")
      .first()
      .val()
      .trim();
    console.log(emailInput);
    console.log(nameInput);

    // make sure users type at least one character in input
    if (emailInput.length < 1) {
      return alert("enter email failed");
    }

    if (nameInput.length < 1) {
      return alert("enter name failed");
    }

    // hides the name/email input fields and "Send Collection button" from collection when emailing the content  (will apear again on page reload)
    $(this)
      .parent()
      .hide();

    // hides the delete collection button when clicking it (will appear again on page reload)
    $(this)
      .parent()
      .parent()
      .find(".deleteCollection")
      .hide();

    // grabs the html of where the specific Collection parent starts (so will include all children podcasts in collection)
    var collectionContent = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .html();

    // var for data sent to api-route for sending email (key values)
    var emailDeets = {
      enteredEmail: emailInput,
      enteredName: nameInput,
      collectionBody: collectionContent
    };

    //using .always instead of .then (single call back)
    //($.post is one of jquery's ways of writing the post)
    $.post("api/send", emailDeets).always(function() {
      console.log("Email sent!");

      // alert("saved!");

      // reload the page after sending the collection information to get the updated list (and have the input fields and buttons rebuilt with html-route and handlebars upon refresh)
      location.reload();
    });
  });

  //on click event for deleting a chosen collection
  $(".deleteCollection").on("click", deleteButtonCollection);
  // Function for handling what happens when the delete button is pressed
  console.log("clicked");

  // function runs for what happends upon delete click
  function deleteButtonCollection(event) {
    // will grab the data attribute (data-collectionId) set in collections handlebars file for specific delete button. Handlebars changed the camelCase to lowercase in actual html for the data attribute
    var id = $(this).data("collectionid");
    console.log(id);

    // runs ajax to delete collection and reload page
    $.ajax({
      url: "/api/collections/" + id,
      type: "DELETE",
      success: function() {
        location.reload();
      }
    });
  }

  // closing document.ready
});
