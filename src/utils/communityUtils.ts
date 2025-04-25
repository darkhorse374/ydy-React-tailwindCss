
import { stringToColor } from "@/utils/stringUtils";

/**
 * Gets the appropriate badge variant based on the tag name
 */
export const getTagVariant = (tag: string) => {
  const tagLower = tag.toLowerCase();
  if (tagLower.includes("depression")) return "depression";
  if (tagLower.includes("anxiety")) return "anxiety";
  if (tagLower.includes("isolation")) return "isolation";
  if (tagLower.includes("bipolar")) return "bipolar";
  if (tagLower.includes("mood") || tagLower.includes("mood swings")) return "mood";
  if (tagLower.includes("medication")) return "medication";
  if (tagLower.includes("focus") || tagLower.includes("adhd") || tagLower.includes("organization")) return "focus";
  if (tagLower.includes("panic")) return "panic";
  if (tagLower.includes("stress")) return "stress";
  if (tagLower.includes("ptsd")) return "ptsd";
  if (tagLower.includes("trauma")) return "trauma";
  if (tagLower.includes("recovery")) return "recovery";
  if (tagLower.includes("insomnia") || tagLower.includes("sleep")) return "insomnia"; 
  if (tagLower.includes("social")) return "social";
  if (tagLower.includes("ocd") || tagLower.includes("intrusive")) return "depression";
  if (tagLower.includes("eating") || tagLower.includes("body")) return "stress";
  if (tagLower.includes("addiction") || tagLower.includes("sobriety")) return "recovery";
  if (tagLower.includes("sad")) return "depression";
  if (tagLower.includes("autism") || tagLower.includes("sensory")) return "focus";
  if (tagLower.includes("hyper")) return "panic";
  if (tagLower.includes("trust")) return "trauma";
  if (tagLower.includes("perfectionism")) return "anxiety";
  if (tagLower.includes("self-care")) return "recovery";
  if (tagLower.includes("growth")) return "social";
  if (tagLower.includes("wellness")) return "focus";
  if (tagLower.includes("acceptance")) return "insomnia";
  if (tagLower.includes("public") || tagLower.includes("public community")) return "social";
  if (tagLower.includes("private") || tagLower.includes("private community")) return "anxiety";
  if (tagLower.includes("community")) return "recovery";
  
  // For tags that don't match any specific category, rotate through these variants
  const hashCode = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variants = ["depression", "anxiety", "focus", "stress", "social", "recovery", "ptsd"];
  return variants[hashCode % variants.length];
};

/**
 * Gets the appropriate avatar color class based on the community title
 */
export const getAvatarColorClass = (title: string) => {
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = hash % 6;
  
  const colorClasses = [
    'bg-purple-500',
    'bg-blue-500', 
    'bg-green-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
  ];
  
  return colorClasses[colorIndex];
};

/**
 * Generates a linear gradient background style for community cards
 */
export const getCommunityCardBackground = (communityTitle: string, banner: string) => {
  const gradientColor = stringToColor(communityTitle, 85, 75);
  return {
    background: `linear-gradient(135deg, ${banner} 0%, ${gradientColor} 100%)`,
    boxShadow: "inset 0 0 0 2000px rgba(255, 255, 255, 0.15)"
  };
};

/**
 * Gets the appropriate background color class based on tags
 */
export const getBgColorFromTags = (tags: string[]) => {
  const tag = tags[0]?.toLowerCase() || '';
  if (tag.includes('depression')) return 'bg-blue-400';
  if (tag.includes('anxiety')) return 'bg-green-400';
  if (tag.includes('mood') || tag.includes('bipolar')) return 'bg-purple-400';
  if (tag.includes('focus') || tag.includes('adhd')) return 'bg-yellow-400';
  if (tag.includes('trauma') || tag.includes('ptsd')) return 'bg-orange-400';
  return 'bg-indigo-400';
};
