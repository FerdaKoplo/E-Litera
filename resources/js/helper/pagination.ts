export function getVisiblePages(links: { label: string; active: boolean }[]) { // Input: an array of pagination link objects from Laravel
  const pageNumbers: (number | string)[] = [] // Initialize page numbers: Start with an empty array. This will hold visible pages and '...'

  // Determine total pages and current page:
  // totalPages = count how many of the links are actual numbers. Ignore "Previous"/"Next". currentPage = the number of the active page.
  const totalPages = links.filter(l => !isNaN(Number(l.label))).length
  const currentPage = Number(links.find(l => l.active)?.label)

 //  Loop through all page numbers: Loop from 1 to totalPages to decide which numbers should be visible.
  for (let i = 1; i <= totalPages; i++) {

    // Decide which numbers to show: Case 1: Always show
    // Always show: i === 1 → first page, i === totalPages → last page, Math.abs(i - currentPage) <= 1 → pages next to the current page (current ±1)

    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      pageNumbers.push(i)
    } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
      pageNumbers.push('...')
    }
  }

  return pageNumbers
}
