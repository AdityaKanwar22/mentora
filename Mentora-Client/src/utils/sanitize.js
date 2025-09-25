export function sanitizeText(input) {
  if (typeof input !== 'string') return input
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function trimOrEmpty(input) {
  return typeof input === 'string' ? input.trim() : ''
}


