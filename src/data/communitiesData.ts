
import { CommunityData, CommunityPost } from "@/types/community";

export const COMMUNITIES: CommunityData[] = [
  {
    id: "1",
    title: "Hopeful Horizons",
    description: "A supportive space for individuals navigating depression together. We share strategies, offer understanding, and build connections.",
    tags: ["Depression", "Anxiety", "Isolation"],
    members: 305,
    articles: 103,
    isFeatured: true,
    banner: "#E6F2FF",
    isPublic: true,
    posts: [
      {
        id: 1,
        title: "Coping strategies that helped me this week",
        content: "This week I tried a new grounding technique...",
        author: {
          name: "MindfulJourney",
          avatar: "",
          date: "2 days ago"
        },
        image: "",
        likes: 12,
        comments: []
      },
      {
        id: 2,
        title: "Finding joy in small victories",
        content: "Today I wanted to share a small win...",
        author: {
          name: "HopefulHeart",
          avatar: "",
          date: "5 days ago"
        },
        image: "",
        likes: 18,
        comments: []
      },
      {
        id: 3,
        title: "Community check-in: How is everyone doing?",
        content: "Just wanted to create a space for us to share...",
        author: {
          name: "SupportCircle",
          avatar: "",
          date: "1 week ago"
        },
        image: "",
        likes: 24,
        comments: []
      }
    ]
  },
  {
    id: "2",
    title: "Bipolar Bears",
    description: "Focused on sharing experiences, tips, and support for managing bipolar disorder. Join us for weekly check-ins and resource sharing.",
    tags: ["Mood Swings", "Medication"],
    members: 202,
    articles: 22,
    isFeatured: true,
    isPublic: true,
    banner: "#FFF0F5",
    posts: [
      {
        id: 1,
        title: "Navigating mood episodes: what helps",
        content: "I've been working on identifying my triggers...",
        author: {
          name: "BalanceFinder",
          avatar: "",
          date: "3 days ago"
        },
        image: "",
        likes: 15,
        comments: []
      },
      {
        id: 2,
        title: "Medication experiences and tips",
        content: "I wanted to share my journey with finding the right medication...",
        author: {
          name: "SteadyProgress",
          avatar: "",
          date: "1 week ago"
        },
        image: "",
        likes: 20,
        comments: []
      },
      {
        id: 3,
        title: "Finding balance: work and self-care",
        content: "I've been struggling with balancing my work life...",
        author: {
          name: "WorkLifeBalance",
          avatar: "",
          date: "2 weeks ago"
        },
        image: "",
        likes: 18,
        comments: []
      }
    ]
  },
  {
    id: "3",
    title: "ADHD Pals",
    description: "A space for individuals with ADHD journeying together. Strategies for focus, organization and celebrating our unique strengths.",
    tags: ["Focus", "Organization", "ADHD"],
    members: 254,
    articles: 87,
    isFeatured: true,
    isPublic: true,
    banner: "#F0FFF4",
    posts: [
      {
        id: 1,
        title: "Executive function wins and struggles",
        content: "Today I finally completed a task I've been putting off...",
        author: {
          name: "FocusFinder",
          avatar: "",
          date: "1 day ago"
        },
        image: "",
        likes: 14,
        comments: []
      },
      {
        id: 2,
        title: "Tool recommendations for staying organized",
        content: "I've been trying different apps and systems...",
        author: {
          name: "OrganizedChaos",
          avatar: "",
          date: "4 days ago"
        },
        image: "",
        likes: 22,
        comments: []
      },
      {
        id: 3,
        title: "ADHD and relationships: communication strategies",
        content: "I wanted to share some communication strategies...",
        author: {
          name: "ClearCommunicator",
          avatar: "",
          date: "1 week ago"
        },
        image: "",
        likes: 19,
        comments: []
      }
    ]
  },
  {
    id: "4",
    title: "Anxiety Allies",
    description: "A caring community for those dealing with anxiety and panic disorders. Learn coping techniques and join supportive discussions.",
    tags: ["Anxiety", "Panic", "Stress"],
    members: 312,
    articles: 65,
    isFeatured: false,
    isPublic: true,
    banner: "#FFF5F5",
    posts: [
      {
        id: 1,
        title: "Grounding techniques for anxiety attacks",
        content: "I wanted to share some grounding techniques...",
        author: {
          name: "CalmBreath",
          avatar: "",
          date: "2 days ago"
        },
        image: "",
        likes: 16,
        comments: []
      },
      {
        id: 2,
        title: "Social anxiety success stories",
        content: "Today I managed to attend a social event...",
        author: {
          name: "BraveStepper",
          avatar: "",
          date: "6 days ago"
        },
        image: "",
        likes: 25,
        comments: []
      },
      {
        id: 3,
        title: "Weekly worry journal sharing",
        content: "This is a space where we can share our worry journal entries...",
        author: {
          name: "JournalJourney",
          avatar: "",
          date: "1 week ago"
        },
        image: "",
        likes: 14,
        comments: []
      }
    ]
  },
  {
    id: "5",
    title: "Trauma Recovery",
    description: "Supporting each other through trauma healing and recovery. A safe space for sharing, listening, and growing together.",
    tags: ["PTSD", "Trauma", "Recovery"],
    members: 175,
    articles: 43,
    isFeatured: false,
    isPublic: true,
    banner: "#F0F4FF",
    posts: [
      {
        id: 1,
        title: "Progress not perfection: recovery journeys",
        content: "I wanted to share my non-linear recovery journey...",
        author: {
          name: "HealingHeart",
          avatar: "",
          date: "3 days ago"
        },
        image: "",
        likes: 18,
        comments: []
      },
      {
        id: 2,
        title: "Boundary setting strategies",
        content: "I've been working on setting healthier boundaries...",
        author: {
          name: "BoundaryBuilder",
          avatar: "",
          date: "1 week ago"
        },
        image: "",
        likes: 22,
        comments: []
      },
      {
        id: 3,
        title: "Celebrating healing milestones",
        content: "Today marks 6 months since I started therapy...",
        author: {
          name: "MilestoneMarker",
          avatar: "",
          date: "2 weeks ago"
        },
        image: "",
        likes: 30,
        comments: []
      }
    ]
  },
  {
    id: "6",
    title: "OCD Support Circle",
    description: "A community dedicated to supporting those with OCD. Share experiences, coping mechanisms, and find understanding.",
    tags: ["OCD", "Intrusive Thoughts", "Anxiety"],
    members: 198,
    articles: 34,
    isFeatured: false,
    isPublic: true,
    banner: "#F3F0FF",
    posts: [
      {
        id: 1,
        title: "ERP therapy experiences",
        content: "I wanted to share my journey with ERP therapy...",
        author: {
          name: "ExposureJourney",
          avatar: "",
          date: "2 days ago"
        },
        image: "",
        likes: 12,
        comments: []
      },
      {
        id: 2,
        title: "Managing intrusive thoughts",
        content: "I've been developing strategies to handle intrusive thoughts...",
        author: {
          name: "ThoughtNavigator",
          avatar: "",
          date: "5 days ago"
        },
        image: "",
        likes: 18,
        comments: []
      },
      {
        id: 3,
        title: "Success stories and progress sharing",
        content: "I wanted to create a space for us to celebrate our wins...",
        author: {
          name: "ProgressTracker",
          avatar: "",
          date: "1 week ago"
        },
        image: "",
        likes: 20,
        comments: []
      }
    ]
  },
  {
    id: "7",
    title: "Eating Disorder Recovery",
    description: "Supporting each other on the journey to a healthier relationship with food and body image.",
    tags: ["Eating Disorders", "Body Image", "Recovery"],
    members: 223,
    articles: 51,
    isFeatured: false,
    isPublic: true,
    banner: "#FFFBEB",
    posts: [
      {
        id: 1,
        title: "Non-scale victories celebration",
        content: "I wanted to share a non-scale victory...",
        author: {
          name: "BeyondNumbers",
          avatar: "",
          date: "1 day ago"
        },
        image: "",
        likes: 24,
        comments: []
      },
      {
        id: 2,
        title: "Navigating social situations",
        content: "I've been working on strategies for social eating...",
        author: {
          name: "SocialEater",
          avatar: "",
          date: "4 days ago"
        },
        image: "",
        likes: 16,
        comments: []
      },
      {
        id: 3,
        title: "Sharing recovery resources",
        content: "I wanted to compile some helpful resources...",
        author: {
          name: "ResourceCollector",
          avatar: "",
          date: "1 week ago"
        },
        image: "",
        likes: 22,
        comments: []
      }
    ]
  },
  {
    id: "8",
    title: "Addiction Recovery",
    description: "A supportive community for those in recovery from addiction. Share experiences, strength, and hope.",
    tags: ["Addiction", "Recovery", "Sobriety"],
    members: 265,
    articles: 37,
    isFeatured: false,
    isPublic: true,
    banner: "#ECFDF5",
    posts: [
      {
        id: 1,
        title: "Daily reflections and gratitude",
        content: "Today I'm grateful for...",
        author: {
          name: "GratefulHeart",
          avatar: "",
          date: "1 day ago"
        },
        image: "",
        likes: 18,
        comments: []
      },
      {
        id: 2,
        title: "Coping with triggers",
        content: "I wanted to share some strategies I've developed...",
        author: {
          name: "TriggerTamer",
          avatar: "",
          date: "3 days ago"
        },
        image: "",
        likes: 20,
        comments: []
      },
      {
        id: 3,
        title: "Celebrating milestones",
        content: "Today marks 6 months of sobriety...",
        author: {
          name: "MilestoneMaker",
          avatar: "",
          date: "1 week ago"
        },
        image: "",
        likes: 35,
        comments: []
      }
    ]
  },
];

export const ALL_TAGS = [
  "Depression", "Anxiety", "Isolation", "Mood Swings", "Medication", 
  "Focus", "Organization", "ADHD", "Panic", "Stress", "PTSD", 
  "Trauma", "Recovery", "OCD", "Intrusive Thoughts", "Eating Disorders", 
  "Body Image", "Addiction", "Sobriety"
];
