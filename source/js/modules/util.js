// Extend jQuery to Toggle Text in the Filter Button on Mobile
$.fn.extend({
  toggleText(a, b) {
    return this.text(this.text() === b ? a : b);
  }
});

export function toggleDates() {
  $(".from, .to").slideToggle(500);
}

// Debouncer
export const debounce = (fn, time) => {
  let timeout;
  return (...args) => {
    const functionCall = () => fn.apply(this, args);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
