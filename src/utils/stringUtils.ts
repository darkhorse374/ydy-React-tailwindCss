
/**
 * Gets the initials from a name
 * @param name The full name
 * @returns The first letter of each word in the name
 */
export const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

/**
 * Converts a string to an HSL color
 * @param str The string to convert
 * @param saturation The saturation percentage
 * @param lightness The lightness percentage
 * @returns An HSL color string
 */
export const stringToColor = (str: string, saturation = 75, lightness = 65) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
