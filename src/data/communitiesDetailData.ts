
import { CommunityData } from "@/types/community";

// A mapping of community IDs to their full data
export const communitiesData: Record<string, CommunityData> = {
  "ydy": {
    id: "ydy",
    title: "You Do You",
    description: "A supportive community focused on individual growth and self-acceptance. We celebrate our unique journeys, share personal victories, and lift each other up during challenges.",
    tags: ["Self-Care", "Growth", "Acceptance", "Wellness"],
    members: 352,
    articles: 287,
    isFeatured: true,
    isPublic: true,
    website: "https://youdoyou.org",
    facebook: "facebook.com/youdoyou",
    instagram: "instagram.com/youdoyou",
    twitter: "twitter.com/youdoyou",
    owners: [
      { name: "Sarah", avatar: "https://i.pravatar.cc/150?u=sarah" },
      { name: "James", avatar: "https://i.pravatar.cc/150?u=james" }
    ],
    bulletPoints: [
      "Self-Acceptance – Learn to embrace your authentic self.",
      "Personal Growth – Strategies for becoming your best self.",
      "Mindfulness – Practices for staying present and aware.",
      "Support & Encouragement – A place where you're valued just as you are."
    ],
    upcomingEvents: [
      {
        id: 1,
        title: "Self-Care Sunday Workshop",
        date: "June 15, 2023",
        description: "Join us for a virtual workshop focused on developing your personal self-care routine with practical tips you can implement immediately."
      }
    ],
    posts: [
      {
        id: 1,
        author: {
          name: "Sarah",
          avatar: "https://i.pravatar.cc/150?u=sarah",
          date: "May 12"
        },
        title: "How I Learned to Embrace My Authentic Self",
        content: "This journey has taught me that being your authentic self is the greatest gift you can give to yourself and the world. Here's how I learned to quiet the inner critic and embrace who I truly am...",
        image: "https://images.unsplash.com/photo-1520463319385-a53a9a8c5c34?q=80&w=2680&auto=format&fit=crop",
        likes: 42,
        comments: [
          {
            id: 1,
            author: {
              name: "Alex",
              avatar: "https://i.pravatar.cc/150?u=alex",
              date: "May 12"
            },
            content: "Thank you for sharing your journey! It's so inspiring to hear how you overcame those inner battles."
          }
        ]
      }
    ]
  },
  "gm": {
    id: "gm",
    title: "Growth Mindset",
    description: "A community dedicated to developing a growth mindset in all aspects of life. We believe that abilities and intelligence can be developed through dedication, hard work, and learning from failures.",
    tags: ["Learning", "Development", "Mindset", "Challenges"],
    members: 245,
    articles: 198,
    isFeatured: true,
    isPublic: true,
    website: "https://growthmindset.org",
    facebook: "facebook.com/growthmindset",
    instagram: "instagram.com/growthmindset",
    twitter: "twitter.com/growthmindset",
    owners: [
      { name: "Michael", avatar: "https://i.pravatar.cc/150?u=michael" },
      { name: "Emma", avatar: "https://i.pravatar.cc/150?u=emma" }
    ],
    bulletPoints: [
      "Embrace Challenges – View obstacles as opportunities to grow.",
      "Persist Through Setbacks – Develop resilience and grit.",
      "Learn from Criticism – Use feedback as a tool for improvement.",
      "Find Inspiration – Get motivated by the success of others."
    ],
    posts: [
      {
        id: 1,
        author: {
          name: "Michael",
          avatar: "https://i.pravatar.cc/150?u=michael",
          date: "May 3"
        },
        title: "Turning Failure into Growth",
        content: "Last month, I failed at launching my first online course. Here's how I turned that experience into valuable lessons that are making my second attempt much stronger...",
        image: "https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?q=80&w=2680&auto=format&fit=crop",
        likes: 31,
        comments: []
      }
    ]
  },
  "sc": {
    id: "sc",
    title: "Self Care",
    description: "A nurturing community focused on the importance of self-care practices for mental, emotional, and physical wellbeing. We share practical tips and support each other in prioritizing our own needs.",
    tags: ["Wellness", "Mental Health", "Self-Care", "Balance"],
    members: 321,
    articles: 276,
    isFeatured: true,
    isPublic: true,
    website: "https://selfcare.org",
    facebook: "facebook.com/selfcare",
    instagram: "instagram.com/selfcare",
    twitter: "twitter.com/selfcare",
    owners: [
      { name: "Olivia", avatar: "https://i.pravatar.cc/150?u=olivia" },
      { name: "Noah", avatar: "https://i.pravatar.cc/150?u=noah" }
    ],
    bulletPoints: [
      "Daily Routines – Simple practices to incorporate into everyday life.",
      "Boundary Setting – Learning to say no and prioritize your wellbeing.",
      "Mindful Practices – Meditation, journaling, and other reflective activities.",
      "Physical Care – Nutrition, movement, and rest for optimal health."
    ],
    upcomingEvents: [
      {
        id: 1,
        title: "Mindful Monday Meditation",
        date: "June 3, 2023",
        description: "Join our weekly virtual meditation session to start your week with intention and calm."
      }
    ],
    posts: [
      {
        id: 1,
        author: {
          name: "Olivia",
          avatar: "https://i.pravatar.cc/150?u=olivia",
          date: "May 10"
        },
        title: "Creating a Self-Care Routine That Actually Works",
        content: "After years of struggling to stick with self-care practices, I've finally found an approach that works for my busy schedule. Here's my framework for creating sustainable self-care habits...",
        image: "https://images.unsplash.com/photo-1574279606130-09958dc756f7?q=80&w=2680&auto=format&fit=crop",
        likes: 56,
        comments: [
          {
            id: 1,
            author: {
              name: "Jessica",
              avatar: "https://i.pravatar.cc/150?u=jessica",
              date: "May 10"
            },
            content: "I've been struggling with this exact issue! Thank you for sharing these practical tips."
          }
        ]
      }
    ]
  },
  // Add dashboard communities
  "hopeful-horizons": {
    id: "hopeful-horizons",
    title: "Hopeful Horizons",
    description: "A supportive space for individuals navigating depression together. We share strategies, offer understanding, and build connections.",
    tags: ["Depression", "Anxiety", "Isolation"],
    members: 205,
    articles: 126,
    isFeatured: true,
    isPublic: true,
    owners: [
      { name: "Taylor", avatar: "https://i.pravatar.cc/150?u=taylor" }
    ],
    bulletPoints: [
      "Share Experiences – Learn from others who understand.",
      "Coping Strategies – Discover techniques that work for diverse situations.",
      "Support Network – Build connections with people who get it."
    ],
    posts: []
  },
  "bipolar-bears": {
    id: "bipolar-bears",
    title: "Bipolar Bears",
    description: "This community is a safe space for those living with bipolar disorder to share experiences, coping strategies, and support. Whether you're navigating medication, therapy, mood swings, or daily challenges, you'll find understanding and encouragement here.",
    tags: ["Mood Swings", "Medication", "Bipolar", "Support", "Therapy"],
    members: 189,
    articles: 143,
    isFeatured: true,
    isPublic: true,
    website: "https://youdoyou.org/c/bb",
    facebook: "facebook.com/bipolarbears",
    instagram: "instagram.com/bipolarbears",
    twitter: "twitter.com/bipolarbears",
    owners: [
      { name: "Graham", avatar: "https://i.pravatar.cc/150?u=graham" },
      { name: "Fjori", avatar: "https://i.pravatar.cc/150?u=fjori" },
      { name: "CP", avatar: "https://i.pravatar.cc/150?u=cp" }
    ],
    bulletPoints: [
      "Personal Stories & Advice – Connect with others who truly understand.",
      "Coping Strategies – Tips for managing mood swings, stress, and routines.",
      "Treatment Information – Resources on medication, therapy, and holistic care.",
      "Support & Encouragement – A place to uplift and be uplifted."
    ],
    posts: []
  },
  "adhd-pals": {
    id: "adhd-pals",
    title: "ADHD Pals",
    description: "A space for individuals with ADHD journeying together. Strategies for focus, organization and celebrating our unique strengths.",
    tags: ["Focus", "ADHD", "Organization"],
    members: 254,
    articles: 198,
    isFeatured: false,
    isPublic: true,
    owners: [
      { name: "Jamie", avatar: "https://i.pravatar.cc/150?u=jamie" }
    ],
    bulletPoints: [
      "Focus Strategies – Tips and tools for improving concentration.",
      "Organization Hacks – Systems that work for the ADHD brain.",
      "Celebrate Strengths – Embracing the positive aspects of ADHD."
    ],
    posts: []
  },
  "anxiety-allies": {
    id: "anxiety-allies",
    title: "Anxiety Allies",
    description: "A caring community for those dealing with anxiety and panic disorders. Learn coping techniques and join supportive discussions.",
    tags: ["Anxiety", "Panic", "Stress"],
    members: 312,
    articles: 267,
    isFeatured: false,
    isPublic: true,
    owners: [
      { name: "Avery", avatar: "https://i.pravatar.cc/150?u=avery" }
    ],
    bulletPoints: [
      "Anxiety Management – Techniques for calming the mind and body.",
      "Trigger Awareness – Identifying and preparing for anxiety triggers.",
      "Daily Practices – Building routines that reduce overall anxiety."
    ],
    posts: []
  }
};

// Function to get a community by its ID
export const getCommunityById = (id: string): CommunityData | undefined => {
  return communitiesData[id];
};

// For backward compatibility with the dashboard
export const communityList = Object.values(communitiesData);
