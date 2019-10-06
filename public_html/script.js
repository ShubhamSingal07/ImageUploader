$(() => {
  $.get("/upload", data => {
    data.images.map(image => {
      $("#image-container").append(
        $("<img>")
          .attr("src", image.url)
          .attr("height", "200px")
          .attr("width", "200px")
          .css("margin", "1em"),
      );
    });
  });

  function uploadImage(e) {
    const files = e.target.files;
    const fd = new FormData();
    for (let file of files) {
      fd.append("image", file, file.name);
    }
    $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "/upload",
      data: fd,
      processData: false,
      contentType: false,
      success: function(data) {
        data.images.map(image =>
          $("#image-container").append(
            $("<img>")
              .attr("src", image.url)
              .attr("height", "200px")
              .attr("width", "200px")
              .css("margin", "1em"),
          ),
        );
      },
      error: function(err) {
        $("#image-container").append($("<div>").text("Oops! Looks like something went wrong"));
      },
    });
  }

  $("#uploadBtn").change(uploadImage);
});
