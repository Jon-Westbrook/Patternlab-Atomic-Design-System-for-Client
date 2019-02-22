// Open Sidebar
export function openSidebar() {
  $("#sidebar").toggleClass("active");
  $(".overlay").addClass("active");
  document.getElementById("closeMenu").focus();
}

// Close Sidebar
export function closeSidebar() {
  $("#sidebar").removeClass("active");
  // hide overlay
  $(".overlay").removeClass("active");
}
