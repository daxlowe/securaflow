export function capitalize(str: string): string {
  return str.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase());
}
