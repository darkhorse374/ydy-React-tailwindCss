
import { stringToColor } from "./stringUtils";

/**
 * Gets a consistent background color based on user initials
 * @param initials The user's initials
 * @returns A tailwind-compatible background color style
 */
export const getAvatarColor = (initials: string) => {
  const colors = [
    "bg-blue-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-teal-400",
    "bg-green-400",
    "bg-amber-400",
    "bg-orange-400",
    "bg-rose-400",
    "bg-cyan-400",
  ];
  
  // Generate a consistent color based on the initials
  const index = initials.split("").reduce(
    (sum, char) => sum + char.charCodeAt(0), 0
  ) % colors.length;
  
  return colors[index];
};

/**
 * Gets a consistent text color that pairs well with the background
 * @param initials The user's initials
 * @returns A tailwind-compatible text color style
 */
export const getAvatarTextColor = (initials: string) => {
  // Almost all backgrounds look good with white text
  return "text-white";
};
