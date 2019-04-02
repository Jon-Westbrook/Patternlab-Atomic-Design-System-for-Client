export function toggleDates() {
  // get all reporting filters
  const dateFilters = $('.date-filters')

  // check if an active filter is visible
  const activeFilter = dateFilters.filter(':visible')

  if (!activeFilter.length) {
    showDates(dateFilters)
  } else {
    hideDates(activeFilter)
  }

}

function showDates(dateFilters) {
  
  // display flex to all filters
  dateFilters.css({
    display: 'flex'
  })

  // get only filter for currently visible tab
  const activeFilter = dateFilters.filter(':visible')

  // get target height
  const height = activeFilter.css('height')

  // hide filter for invisible tabs
  dateFilters.filter(':not(:visible)').css({
    display: 'none'
  })

  // set filter height to zero as animation prep
  activeFilter.css({
    height: 0
  })

  // animate filter height to target height
  activeFilter.animate({
    height: height
  }, 200)
}

function hideDates(activeFilter) {

  // animate filter height to 0
  activeFilter.animate({
    height: 0
  }, 200, function () {

    // on complete, display none
    // and height auto to prep for next showDates cycle or resize to lg breakpoint
    activeFilter.css({
      display: 'none',
      height: 'auto'
    })
  })
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
