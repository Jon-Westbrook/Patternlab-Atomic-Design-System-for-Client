// Inject jQuery-UI Datepickers
export function initDatepickers() {
  $(".date").datepicker({
    showOn: "both",
    buttonImage: "../../images/icons/calendar.svg",
    dateFormat: "M d, yy"
  });
}

// Prevent Submit and Validate Form Fields
export function initFormValidation() {
  var forms = document.getElementsByClassName("needs-validation");
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, form => {
    form.addEventListener(
      "submit",
      event => {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
}
