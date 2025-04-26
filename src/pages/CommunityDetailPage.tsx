import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Heart,
  Calendar,
  Copy,
  Image,
  Sticker,
  Send,
  BookMarked,
  ArrowLeft,
  BookOpen
} from "lucide-react";
import { getCommunityById } from "@/data/communitiesDetailData";
import { CommunityData, CommunityPost } from "@/types/community";
import { toast } from "sonner";
import CommunityTagBadge from "@/components/community/CommunityTagBadge";
import { useIsMobile } from "@/hooks/use-mobile";

const COMMUNITY_DATA: CommunityData = {
  id: "bipolar-bears",
  title: "Bipolar Bears",
  description: "This community is a safe space for those living with bipolar disorder to share experiences, coping strategies, and support. Whether you're navigating medication, therapy, mood swings, or daily challenges, you'll find understanding and encouragement here.",
  tags: ["Mood Swings", "Medication", "Bipolar", "Support", "Therapy"],
  members: 208,
  articles: 221,
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
  upcomingEvents: [
    {
      id: 1,
      title: "Meeting of the Minds",
      date: "January 31, 2023",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ],
  posts: []
};

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 1,
    author: {
      name: "Greg",
      avatar: "https://i.pravatar.cc/150?u=greg",
      date: "Jan 4"
    },
    title: "When Mania Feels Like a Superpower—Until It Doesn't",
    content: "Hey everyone, I'm Greg. Lately, I've been feeling that familiar rush of energy—the kind where I have a million ideas, barely need sleep, and feel like I can take on the world. At first, it feels amazing, but I know from experience that the crash is coming....",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2680&auto=format&fit=crop",
    likes: 7,
    comments: [
      {
        id: 1,
        author: {
          name: "Greg",
          avatar: "https://i.pravatar.cc/150?u=greg",
          date: "Jan 4"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        id: 2,
        author: {
          name: "Jen",
          avatar: "https://i.pravatar.cc/150?u=jen",
          date: "Jan 4"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    ]
  },
  {
    id: 2,
    author: {
      name: "Sarah",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      date: "Jan 2"
    },
    title: "Finding Balance During Mixed Episodes",
    content: "I've been struggling with mixed episodes lately - feeling both manic energy and depressive thoughts at the same time. It's like my mind is racing with negative thoughts. Has anyone else experienced this? What helps you find balance?",
    image: "",
    likes: 12,
    comments: [
      {
        id: 3,
        author: {
          name: "Tom",
          avatar: "https://i.pravatar.cc/150?u=tom",
          date: "Jan 2"
        },
        content: "I experience this often. What helps me is having a very structured routine and being extra vigilant about sleep. Even when my mind is racing, I force myself to do my wind-down routine at the same time every night."
      }
    ]
  },
  {
    id: 3,
    author: {
      name: "Michael",
      avatar: "https://i.pravatar.cc/150?u=michael",
      date: "Dec 30"
    },
    title: "Medication Change Success Story",
    content: "After struggling with side effects for years, I finally found a medication combination that works for me with minimal issues! It took trying 7 different medications over 5 years, but I finally feel stable without feeling like a zombie. Don't give up hope if you're still searching for the right combination!",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2830&auto=format&fit=crop",
    likes: 23,
    comments: []
  }
];

const CommunityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [communityData, setCommunityData] = useState<CommunityData | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [postInput, setPostInput] = useState("");
  const [visibleComments, setVisibleComments] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [showReplyInputFor, setShowReplyInputFor] = useState<string | null>(null);
  const loader = useRef(null);
  
  useEffect(() => {
    if (id) {
      console.log("Looking for community with ID:", id);
      const communityData = getCommunityById(id);
      if (communityData) {
        console.log("Community found:", communityData.title);
        setCommunityData(communityData);
        setPosts(communityData.posts && communityData.posts.length > 0 
          ? communityData.posts 
          : INITIAL_POSTS);
      } else {
        console.log("Community not found for ID:", id);
        setCommunityData(COMMUNITY_DATA);
        setPosts(INITIAL_POSTS);
      }
    }
  }, [id]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting && !loading) {
      loadMorePosts();
    }
  };
  
  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      const newPosts = [...INITIAL_POSTS].map(post => ({
        ...post,
        id: post.id + (page * INITIAL_POSTS.length)
      }));
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPage(page + 1);
      setLoading(false);
    }, 800);
  };
  
  const toggleComments = (postId: number) => {
    if (visibleComments.includes(postId)) {
      setVisibleComments(visibleComments.filter(id => id !== postId));
    } else {
      setVisibleComments([...visibleComments, postId]);
    }
  };
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postInput.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: {
          name: "You",
          avatar: "https://i.pravatar.cc/150?u=you",
          date: "Just now"
        },
        title: "",
        content: postInput,
        image: "",
        likes: 0,
        comments: []
      };
      setPosts([newPost, ...posts]);
      setPostInput("");
    }
  };

  const handleReplySubmit = (postId: number) => {
    const replyText = replyInputs[`post-${postId}`] || "";
    if (replyText.trim()) {
      setPosts(currentPosts => 
        currentPosts.map(post => {
          if (post.id === postId) {
            const newComment = {
              id: (post.comments.length > 0 ? Math.max(...post.comments.map(c => c.id)) : 0) + 1,
              author: {
                name: "You",
                avatar: "https://i.pravatar.cc/150?u=you",
                date: "Just now"
              },
              content: replyText
            };
            return {
              ...post,
              comments: [...post.comments, newComment]
            };
          }
          return post;
        })
      );

      setReplyInputs(prev => ({
        ...prev,
        [`post-${postId}`]: ""
      }));
      setShowReplyInputFor(null);
    }
  };

  const handleShowReplyInput = (postId: number) => {
    setShowReplyInputFor(`post-${postId}`);
    if (!visibleComments.includes(postId)) {
      setVisibleComments([...visibleComments, postId]);
    }
  };
  
  const getTagVariant = (tag: string) => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes("mood")) return "bipolar";
    if (tagLower.includes("medication")) return "medication";
    if (tagLower.includes("bipolar")) return "bipolar";
    if (tagLower.includes("support")) return "recovery";
    if (tagLower.includes("therapy")) return "depression";
    if (tagLower.includes("mental")) return "anxiety";
    if (tagLower.includes("wellness")) return "recovery";
    if (tagLower.includes("self-care")) return "default";
    if (tagLower.includes("growth")) return "purple";
    return "default";
  };

  const handleJournalEntry = (postTitle: string) => {
    console.log("Navigating to journal with post title:", postTitle);
    navigate('/journal', { 
      state: { 
        newEntry: true, 
        title: postTitle || "Reflection on a community post" 
      } 
    });
  };

  if (!communityData) {
    return (
      <div className="p-4 md:p-6 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-lg">Loading community...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[10%] -left-32 w-[600px] h-[600px] rounded-full bg-purple-100 opacity-40 blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-blue-100 opacity-40 blur-3xl"></div>
        <div className="absolute -bottom-64 left-1/4 w-[700px] h-[500px] rounded-full bg-pink-100 opacity-30 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <div className="rounded-lg overflow-hidden shadow-lg mb-6">
          <div className="h-48 md:h-64 relative">
            <div 
              className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"
            ></div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex items-center">
                <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                  <AvatarFallback style={{ backgroundColor: "#8B5CF6" }}>
                    {communityData.title.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold text-white ml-4">{communityData.title}</h1>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6">
            <p className="text-gray-700 mb-4">
              {communityData.description}
            </p>
            
            {communityData.bulletPoints && communityData.bulletPoints.length > 0 && (
              <ul className="list-disc pl-6 mb-6 space-y-1 text-gray-700">
                {communityData.bulletPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            )}
            
            <p className="text-gray-700 mb-6">
              Join us to share, learn, and find support as we navigate the journey together.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {communityData.tags.map((tag, index) => (
                <CommunityTagBadge key={index} tag={tag} />
              ))}
            </div>
            
            <div className={`flex ${isMobile ? 'flex-col' : 'items-center justify-between'} border-t border-gray-200 pt-4`}>
              <div className="flex flex-wrap items-center gap-3">
                <div className="text-sm text-gray-600">{communityData.members}+ Members</div>
                <div className="text-sm text-gray-600">{communityData.articles} Articles</div>
                <CommunityTagBadge
                  tag={communityData.isPublic ? "Public Community" : "Private Community"}
                  className=""
                />
              </div>
              
              {isMobile && <div className="h-3"></div>}
              
              <Button variant="blue-custom" size="sm" className={isMobile ? "mt-3 w-full" : ""}>
                {communityData.members ? "Join" : "Create"}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {communityData.website && (
                <a href={communityData.website} target="_blank" className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50 transition-colors">
                  <Globe className="mb-2 text-gray-600" />
                  <span className="text-sm">Website</span>
                </a>
              )}
              
              {communityData.facebook && (
                <a href={`https://${communityData.facebook}`} target="_blank" className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50 transition-colors">
                  <Facebook className="mb-2 text-blue-600" />
                  <span className="text-sm">Facebook</span>
                </a>
              )}
              
              {communityData.instagram && (
                <a href={`https://${communityData.instagram}`} target="_blank" className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50 transition-colors">
                  <Instagram className="mb-2 text-pink-600" />
                  <span className="text-sm">Instagram</span>
                </a>
              )}
              
              {communityData.twitter && (
                <a href={`https://${communityData.twitter}`} target="_blank" className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-gray-50 transition-colors">
                  <Twitter className="mb-2 text-blue-400" />
                  <span className="text-sm">X</span>
                </a>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <Button variant="outline" size="sm" className="gap-2">
                  <Copy size={14} /> Copy Link
                </Button>
              </div>
              
              <div>
                <Button variant="subtle" size="sm">Report Community</Button>
              </div>
            </div>
          </div>
          
          {communityData.owners && communityData.owners.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-medium mb-4">Owners:</h3>
              <div className="space-y-3">
                {communityData.owners.map((owner, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={owner.avatar} alt={owner.name} />
                      <AvatarFallback>{owner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{owner.name}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                Request Ownership
              </Button>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          
          {communityData.upcomingEvents && communityData.upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {communityData.upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 bg-blue-50">
                      <div className="flex items-start gap-4">
                        <div className="bg-white p-2 rounded-md text-center min-w-16">
                          <Calendar className="mx-auto mb-1" size={18} />
                          <div className="text-xs font-semibold">{event.date}</div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 text-right border-t">
                      <Button variant="blue-custom" size="sm">Register</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No upcoming events</p>
              <Button variant="subtle-blue" size="sm" className="mt-4">
                Suggest an Event
              </Button>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handlePostSubmit}>
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?u=you" alt="Your Avatar" />
                <AvatarFallback>YA</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <Input 
                  placeholder="Share your thoughts or journey..."
                  value={postInput}
                  onChange={(e) => setPostInput(e.target.value)}
                  className="mb-3"
                />
                
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Button type="button" variant="ghost" size="icon" className="text-gray-500">
                      <Image size={18} />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="text-gray-500">
                      <Sticker size={18} />
                    </Button>
                  </div>
                  
                  <Button type="submit" disabled={!postInput.trim()} variant="blue-custom">
                    <Send size={16} className="mr-2" /> Post
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <div className="space-y-6 mb-8">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-xs text-gray-500">{post.author.date}</div>
                  </div>
                </div>
                
                {post.title && (
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                )}
                
                <p className="text-gray-700 mb-4">{post.content}</p>
                
                {post.image && (
                  <div className="mb-4 rounded-md overflow-hidden">
                    <img 
                      src={post.image} 
                      alt="Post" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`gap-1 ${post.likes > 0 ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    <Heart size={16} /> {post.likes || ''} {post.likes === 1 ? 'like' : post.likes > 1 ? 'likes' : ''}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500"
                      onClick={() => toggleComments(post.id)}
                    >
                      {post.comments.length > 0 ? `${post.comments.length} Comments` : 'Comment'}
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <BookMarked size={16} />
                    </Button>
                  </div>
                </div>
                
                {visibleComments.includes(post.id) && (
                  <div className="mt-4 pt-4 border-t">
                    {post.comments.length > 0 && (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Comments</h4>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-purple-500 hover:text-purple-700 hover:bg-purple-50"
                            onClick={() => handleJournalEntry(post.title)}
                            title="Add to journal"
                          >
                            <BookOpen size={16} />
                          </Button>
                        </div>
                        
                        <ScrollArea className="max-h-80 pr-4">
                          <div className="space-y-4">
                            {post.comments.map((comment) => (
                              <div key={comment.id} className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                  <AvatarFallback>{comment.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{comment.author.name}</span>
                                    <span className="text-xs text-gray-500">{comment.author.date}</span>
                                  </div>
                                  <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        
                        {post.comments.length > 2 && (
                          <button 
                            className="text-blue-500 text-sm hover:underline mt-2"
                            onClick={() => {}}
                          >
                            Show 7 More Comments
                          </button>
                        )}
                      </>
                    )}
                    
                    {showReplyInputFor === `post-${post.id}` ? (
                      <div className="mt-4 pt-4 border-t flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://i.pravatar.cc/150?u=you" alt="Your Avatar" />
                          <AvatarFallback>YA</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 relative">
                          <Input 
                            placeholder="Reply..." 
                            className="pr-10"
                            value={replyInputs[`post-${post.id}`] || ''}
                            onChange={(e) => setReplyInputs(prev => ({
                              ...prev,
                              [`post-${post.id}`]: e.target.value
                            }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleReplySubmit(post.id);
                              }
                            }}
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => handleReplySubmit(post.id)}
                          >
                            <Send size={16} />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button 
                        variant="blue-custom" 
                        size="sm"
                        className="mt-4"
                        onClick={() => handleShowReplyInput(post.id)}
                      >
                        Add a reply
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          <div ref={loader} className="flex justify-center p-4">
            {loading && <div className="animate-pulse">Loading more posts...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailPage;
