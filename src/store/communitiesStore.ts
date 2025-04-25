
import { Community } from "@/types/sidebar";

// Use localStorage to persist joined communities
const STORAGE_KEY = 'joined_communities';

// Fixed communities that should always appear in the sidebar (reduced to ONLY "You Do You")
const FIXED_COMMUNITIES = [
  { id: "ydy", name: "You Do You", color: "bg-indigo-400" },
];

// Load initial state from localStorage, but ensure fixed communities are always included
const loadJoinedCommunities = (): Community[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  let storedCommunities: Community[] = [];
  
  if (stored) {
    try {
      storedCommunities = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse joined communities from localStorage', e);
    }
  }
  
  // Filter out fixed communities from the stored communities to avoid duplicates
  const userJoinedCommunities = storedCommunities.filter(
    c => !FIXED_COMMUNITIES.some(fixed => fixed.id === c.id)
  );
  
  // Return fixed communities first, then user joined communities
  return [...FIXED_COMMUNITIES, ...userJoinedCommunities];
};

// Save state to localStorage (only save non-fixed communities)
const saveJoinedCommunities = (communities: Community[]) => {
  // Filter out fixed communities before saving
  const userJoinedCommunities = communities.filter(
    c => !FIXED_COMMUNITIES.some(fixed => fixed.id === c.id)
  );
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userJoinedCommunities));
};

// Global state to track joined communities (fixed + user joined)
const globalJoinedCommunities: Community[] = loadJoinedCommunities();

export const getJoinedCommunities = (): Community[] => {
  return globalJoinedCommunities;
};

export const getFixedCommunities = (): Community[] => {
  return FIXED_COMMUNITIES;
};

export const isFixedCommunity = (communityId: string | number): boolean => {
  return FIXED_COMMUNITIES.some(c => c.id === communityId);
};

export const addJoinedCommunity = (community: Community) => {
  // Don't allow adding fixed communities again
  if (isFixedCommunity(community.id)) {
    return;
  }
  
  const exists = globalJoinedCommunities.some(c => c.id === community.id);
  if (!exists) {
    globalJoinedCommunities.push(community);
    saveJoinedCommunities(globalJoinedCommunities);
  }
};

export const removeJoinedCommunity = (communityId: string | number) => {
  // Don't allow removing fixed communities
  if (isFixedCommunity(communityId)) {
    return;
  }
  
  const index = globalJoinedCommunities.findIndex(c => c.id === communityId);
  if (index !== -1) {
    globalJoinedCommunities.splice(index, 1);
    saveJoinedCommunities(globalJoinedCommunities);
  }
};

export const isJoinedCommunity = (communityId: string | number): boolean => {
  // Fixed communities always appear as joined
  if (isFixedCommunity(communityId)) {
    return true;
  }
  
  return globalJoinedCommunities.some(c => c.id === communityId);
};
