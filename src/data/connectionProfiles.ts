export interface ConnectionProfile {
  id: number;
  name: string;
  feeling: string;
  status: string;
  bio: string;
  struggles: string[];
  interests: string[];
  image: string;
}

export const connectionProfiles: ConnectionProfile[] = [
  {
    id: 1,
    name: "Robin",
    feeling: "😊",
    status: "Riding the highs, preparing for the lows",
    bio: "Hey, I'm Robin. Living with bipolar means navigating intense highs and difficult lows. Looking for understanding friends who get the journey.",
    struggles: ["mood swings", "medication"],
    interests: ["Surfing", "Hiking"],
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Alex",
    feeling: "🌱",
    status: "One day at a time",
    bio: "I've been dealing with depression for a few years now. Looking to connect with others who understand the daily challenges and small victories.",
    struggles: ["Depression", "Anxiety"],
    interests: ["Reading", "Photography"],
    image: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    name: "Jamie",
    feeling: "🤔",
    status: "Finding my way through the fog",
    bio: "Living with ADHD and anxiety. Some days are a challenge, but I'm learning to embrace my unique brain. Looking for friends who get it.",
    struggles: ["ADHD", "Focus"],
    interests: ["Art", "Running"],
    image: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    name: "Casey",
    feeling: "🌤️",
    status: "Growing through what I'm going through",
    bio: "Recovering from trauma and rebuilding my life. Seeking connections with others on a similar journey. Compassion and understanding are my values.",
    struggles: ["PTSD", "Trauma"],
    interests: ["Yoga", "Meditation"],
    image: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: 5,
    name: "Morgan",
    feeling: "🌊",
    status: "Ebbs and flows, staying afloat",
    bio: "Navigating life with OCD and depression. Passionate about mental health advocacy and breaking stigmas. Looking for understanding friends.",
    struggles: ["OCD", "Depression"],
    interests: ["Painting", "Chess"],
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 6,
    name: "Taylor",
    feeling: "💫",
    status: "Rebuilding day by day",
    bio: "Recovering from burnout and learning to set boundaries. Seeking connections with people who understand the importance of self-care.",
    struggles: ["Burnout", "Stress"],
    interests: ["Baking", "Movies"],
    image: "https://i.pravatar.cc/150?img=6"
  },
  {
    id: 7,
    name: "Jordan",
    feeling: "🌈",
    status: "Finding color in a gray world",
    bio: "Living with bipolar II and seasonal affective disorder. Using art as therapy and looking to build meaningful connections.",
    struggles: ["Bipolar", "SAD"],
    interests: ["Sculpture", "Poetry"],
    image: "https://i.pravatar.cc/150?img=7"
  },
  {
    id: 8,
    name: "Riley",
    feeling: "🧩",
    status: "Piecing things together",
    bio: "Autism spectrum and anxiety. Passionate about technology and finding others who appreciate direct communication and shared interests.",
    struggles: ["Autism", "Social Anxiety"],
    interests: ["Programming", "Gaming"],
    image: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: 9,
    name: "Harper",
    feeling: "🧠",
    status: "Learning to embrace my neurodiversity",
    bio: "Diagnosed with ADHD last year and it's been quite the journey. Looking to connect with others who understand the unique challenges and gifts of a neurodivergent mind.",
    struggles: ["ADHD", "Executive function", "Focus"],
    interests: ["Music production", "Psychology", "Nature walks"],
    image: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 10,
    name: "Quinn",
    feeling: "⚖️",
    status: "Finding balance in recovery",
    bio: "In recovery from an eating disorder. Working through it one day at a time and hoping to find friends who get the ups and downs of this journey.",
    struggles: ["Eating disorder", "Body image", "Anxiety"],
    interests: ["Cooking", "Photography", "Dance"],
    image: "https://i.pravatar.cc/150?img=10"
  },
  {
    id: 11,
    name: "Sasha",
    feeling: "🌿",
    status: "Healing from trauma, growing through it",
    bio: "Survivor of childhood trauma working on healing and finding joy again. Looking for understanding connections with others on similar paths.",
    struggles: ["PTSD", "Depression", "Trust issues"],
    interests: ["Gardening", "Writing", "Support groups"],
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 12,
    name: "Devon",
    feeling: "💭",
    status: "Managing intrusive thoughts one day at a time",
    bio: "Living with OCD has taught me resilience and patience. Looking to connect with others who understand the daily battles with intrusive thoughts.",
    struggles: ["OCD", "Intrusive thoughts", "Anxiety"],
    interests: ["Chess", "Hiking", "Mindfulness"],
    image: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 13,
    name: "Phoenix",
    feeling: "🔄",
    status: "Rebuilding after burnout",
    bio: "Recovering from severe burnout after years in a high-stress career. Learning to set boundaries and rediscover what brings me joy.",
    struggles: ["Burnout", "Stress", "Work-life balance"],
    interests: ["Pottery", "Reading", "Travel"],
    image: "https://i.pravatar.cc/150?img=13"
  },
  {
    id: 14,
    name: "Rowan",
    feeling: "🎭",
    status: "Behind the mask of BPD",
    bio: "Diagnosed with Borderline Personality Disorder and working on therapy and growth. Seeking friends who understand emotional intensity and identity struggles.",
    struggles: ["BPD", "Emotional regulation", "Relationships"],
    interests: ["Theater", "Art therapy", "Philosophy"],
    image: "https://i.pravatar.cc/150?img=14"
  }
];
