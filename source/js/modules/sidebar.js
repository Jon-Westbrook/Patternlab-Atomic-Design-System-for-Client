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

// Activate (Hightlight) Current Menu Item
export function activateMenuItem(current_path) {
  const sidebarLinks = [...document.querySelectorAll(".main-link a")];
  sidebarLinks.forEach(link => {
    const fullLink = link.getAttribute("href");
    const lastPart = fullLink.split("/");
    if (
      current_path[current_path.length - 2] === lastPart[lastPart.length - 2]
    ) {
      link.parentNode.classList.add("active");
    }
  });
}
