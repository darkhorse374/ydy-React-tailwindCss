
export interface DashboardCommunity {
  id: string;
  title: string;
  description: string;
  tags: string[];
  members: number;
}

export const dashboardCommunities: DashboardCommunity[] = [
  {
    id: "hopeful-horizons",
    title: "Hopeful Horizons",
    description: "A supportive space for individuals navigating depression together. We share strategies, offer understanding, and build connections.",
    tags: ["Depression", "Anxiety", "Isolation"],
    members: 205
  },
  {
    id: "bipolar-bears",
    title: "Bipolar Bears",
    description: "Focused on sharing experiences, tips, and support for managing bipolar disorder. Join us for weekly check-ins and resource sharing.",
    tags: ["Mood Swings", "Medication"],
    members: 189
  },
  {
    id: "adhd-pals",
    title: "ADHD Pals",
    description: "A space for individuals with ADHD journeying together. Strategies for focus, organization and celebrating our unique strengths.",
    tags: ["Focus"],
    members: 254
  },
  {
    id: "anxiety-allies",
    title: "Anxiety Allies",
    description: "A caring community for those dealing with anxiety and panic disorders. Learn coping techniques and join supportive discussions.",
    tags: ["Anxiety", "Panic", "Stress"],
    members: 312
  },
  {
    id: "trauma-recovery",
    title: "Trauma Recovery",
    description: "Supporting each other through trauma healing and recovery. A safe space for sharing, listening, and growing together.",
    tags: ["PTSD", "Trauma", "Recovery"],
    members: 175
  },
  {
    id: "mindful-meditation",
    title: "Mindful Meditation",
    description: "Practice mindfulness and meditation together. Find peace, reduce stress, and cultivate present-moment awareness.",
    tags: ["Mindfulness", "Meditation", "Stress Relief"],
    members: 238
  },
  {
    id: "eating-disorder-support",
    title: "ED Support",
    description: "A compassionate community for those recovering from eating disorders. Share your journey to healing and body acceptance.",
    tags: ["Recovery", "Body Image", "Nutrition"],
    members: 156
  },
  {
    id: "ocd-warriors",
    title: "OCD Warriors",
    description: "Support for those living with Obsessive-Compulsive Disorder. Share coping strategies and celebrate victories together.",
    tags: ["OCD", "Anxiety", "Treatment"],
    members: 187
  },
  {
    id: "substance-recovery",
    title: "Substance Recovery",
    description: "A judgment-free zone for those in recovery from substance use. Build a supportive network on your journey to sobriety.",
    tags: ["Recovery", "Sobriety", "Support"],
    members: 204
  },
  {
    id: "social-anxiety",
    title: "Social Anxiety Circle",
    description: "Connect with others who understand social anxiety. Practice social skills and build confidence in a safe environment.",
    tags: ["Social Anxiety", "Communication", "Social Skills"],
    members: 193
  },
  {
    id: "grief-support",
    title: "Grief & Loss Support",
    description: "A compassionate space for those experiencing grief and loss. Share memories, find comfort, and heal together.",
    tags: ["Grief", "Loss", "Healing"],
    members: 168
  },
  {
    id: "chronic-illness",
    title: "Chronic Warriors",
    description: "Support for those managing chronic illnesses and invisible disabilities. Share resources and daily coping strategies.",
    tags: ["Chronic Illness", "Pain Management", "Support"],
    members: 226
  }
];
