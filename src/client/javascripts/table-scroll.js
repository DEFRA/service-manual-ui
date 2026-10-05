/**
 * Wide tables sit in a box that scrolls sideways. The server marks every box
 * as a named, focusable region, so keyboard and screen reader users can scroll
 * it even without JavaScript. Here, a box whose table fits loses those again:
 * a region and a tab stop for something that does not scroll is noise, and a
 * page with several tables would list each one as a landmark. Checked again
 * on resize, because a table that fits on a laptop may not fit on a phone.
 */

const CONTAINER = '.app-table-container'

/**
 * Makes one box a named, focusable region only while its table overflows.
 * @param {HTMLElement} container - An .app-table-container
 */
function updateTableContainer (container) {
  // aria-label is not allowed on a plain div, so it goes with the role and
  // is kept aside to put back.
  if (!('tableLabel' in container.dataset)) {
    container.dataset.tableLabel = container.getAttribute('aria-label') || ''
  }

  const region = {
    role: 'region',
    'aria-label': container.dataset.tableLabel,
    tabindex: '0'
  }
  const overflows = container.scrollWidth > container.clientWidth

  for (const [name, value] of Object.entries(region)) {
    if (overflows) {
      container.setAttribute(name, value)
    } else {
      container.removeAttribute(name)
    }
  }
}

function initTableScroll () {
  const containers = [...document.querySelectorAll(CONTAINER)]

  if (!containers.length) {
    return
  }

  const updateAll = () => containers.forEach(updateTableContainer)

  updateAll()
  // Web fonts can change a table's width after the first check.
  window.addEventListener('load', updateAll)

  // A box changes size with the window and with zoom. Where ResizeObserver
  // is missing, the window's resize event covers the common case.
  if ('ResizeObserver' in window) {
    const observer = new window.ResizeObserver(updateAll)
    containers.forEach((container) => observer.observe(container))
  } else {
    window.addEventListener('resize', updateAll)
  }
}

export { initTableScroll, updateTableContainer }
