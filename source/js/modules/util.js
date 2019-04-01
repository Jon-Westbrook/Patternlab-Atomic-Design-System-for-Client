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

// breakpoints defined in bootstrap
// currently, default bootstrap
// if overridden in scss, replace these
export const bootstrapBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

// Close the Carousel
export function hideCarousel() {
  $(".carousel-home-cont").fadeOut(200);
}
