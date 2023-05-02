// =====Alert Messege=====
function Message(response) {
  $("#alert-message").empty();
  if (response.Message.MessageType == "E") {
    $("#alert-message").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <h4 class="alert-heading"><i class="bi bi-exclamation-octagon me-1"></i> ${response.Message?.Code} - ${response.Message?.Message}</h4>
  <p>${response.Message?.MessageDetail}</p>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`).fadeIn().delay(2000).fadeOut();
  } else if (response.Message.MessageType == "W") {
    $("#alert-message").append(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <h4 class="alert-heading"><i class="bi bi-exclamation-triangle me-1"></i> ${response.Message?.Code} - ${response.Message?.Message}</h4>
  <p>${response.Message?.MessageDetail}</p>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`).fadeIn().delay(2000).fadeOut();
  } else if (response.Message.MessageType == "S") {
    $("#alert-message").append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
  <h4 class="alert-heading"><i class="bi bi-check-circle me-1"></i> ${response.Message?.Code} - ${response.Message?.Message}</h4>
  <p>${response.Message?.MessageDetail}</p>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`).fadeIn().delay(2000).fadeOut();
  }
}

function ShowLoading() {
  $("#overlay.div-loading").fadeIn();
}

function HideLoading() {
  $("#overlay.div-loading").fadeOut();
}

//======Toggle Sidebar=======
$(function () {
  $(".sidebar-nav .nav-content a").click(function () {
    $click = $(".sidebar-nav .nav-content a");
    $click.removeClass("highlight");
    $(this).addClass("highlight");
    $("body").addClass("toggle-sidebar");
  })
});