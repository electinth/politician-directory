export function media(minWidth, maxWidth) {
  if (maxWidth) {
    return `@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`
  }
  return `@media (min-width: ${minWidth}px)`
}
