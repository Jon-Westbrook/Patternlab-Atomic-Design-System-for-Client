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
