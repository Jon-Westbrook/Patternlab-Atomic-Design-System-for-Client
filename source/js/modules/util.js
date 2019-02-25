// Debouncer
export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;

    var args = arguments;
    var later () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

// Extend jQuery to Toggle Text in the Filter Button on Mobile
$.fn.extend({
  toggleText(a, b) {
    return this.text(this.text() === b ? a : b);
  }
});

export function toggleDates() {
  $(".from, .to").slideToggle(500);
}
