// =====Alert Messege=====

function MessageSuccess(response) {
    $("#alert-message").empty();
    $("#alert-message").append(`<div class="alert alert-success alert-dismissible fade show" role="alert" style="word-break:break-word;">
      <i class="bi bi-check-circle me-1"></i>
      ${response}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`).fadeIn().delay(2000).fadeOut();
  }
  
  function MessageWarning(response) {
    $("#alert-message").empty();
    $("#alert-message").append(`<div class="alert alert-warning alert-dismissible fade show" role="alert" style="word-break:break-word;">
    <i class="bi bi-exclamation-triangle me-1"></i>
      ${response}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`).fadeIn().delay(5000).fadeOut();
  }
  
  function MessageDanger(response) {
    $("#alert-message").empty();
    $("#alert-message").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert" style="word-break:break-word;">
    <i class="bi bi-exclamation-octagon me-1"></i>
      ${response}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`).fadeIn().delay(5000).fadeOut();
  }

  function ShowLoading(){
    $("#overlay.div-loading").fadeIn();
  }

  function HideLoading(){
    $("#overlay.div-loading").fadeOut();
  }

  //======Toggle Sidebar=======
  $(function () {
    $(".sidebar-nav .nav-content a").click(function(){
      $click = $(".sidebar-nav .nav-content a");
      $click.removeClass("highlight");
      $(this).addClass("highlight");
      $("body").addClass("toggle-sidebar");
    })
  });