export function getInitialsOrOption(string) {
  string = string.replace(/[^\w\s]/gi, '');
  let letters = string.split(' ');
  if (letters.length > 1) {
    return (letters[0][0] + letters[1][0]).toUpperCase();
  } else {
    return (string[0] + string[1]).toUpperCase();
  }
}
