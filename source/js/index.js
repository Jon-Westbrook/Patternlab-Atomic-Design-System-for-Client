$(document).ready(function() {
  $('#sidebarCollapse').on('click', function() {
    $('#sidebar').toggleClass('active');
    $('.overlay').addClass('active');
  });
  $('#dismiss, .overlay').on('click', function() {
    // hide sidebar
    $('#sidebar').removeClass('active');
    // hide overlay
    $('.overlay').removeClass('active');
  });

  // Listen for Submit Events and Validate Form Field
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');

        if (form.find(".form-control").hasClass(":invalid")) {
          console.log("Somethin is wrong")
          // form.querySelector('.primary-2').style.color = ("green");
        }

      }, false);
    });
  }, false);

});
