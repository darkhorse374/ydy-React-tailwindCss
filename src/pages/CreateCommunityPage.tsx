import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PencilIcon, Plus, X, Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RichTextEditor from "@/components/RichTextEditor";

// Mock tag suggestions (in real app would come from database)
const TAG_SUGGESTIONS = [
  "Depression", "Anxiety", "Isolation", "Mood Swings", "Medication", 
  "Focus", "Organization", "ADHD", "Panic", "Stress", "PTSD", 
  "Trauma", "Recovery", "OCD", "Intrusive Thoughts", "Eating Disorders", 
  "Body Image", "Addiction", "Sobriety"
];

// Helper function to get tag variant based on tag content
const getTagVariant = (tag: string) => {
  const tagLower = tag.toLowerCase();
  if (tagLower.includes("depression")) return "depression";
  if (tagLower.includes("anxiety")) return "anxiety";
  if (tagLower.includes("isolation")) return "isolation";
  if (tagLower.includes("mood")) return "bipolar";
  if (tagLower.includes("medication")) return "medication";
  if (tagLower.includes("focus") || tagLower.includes("adhd") || tagLower.includes("organization")) return "focus";
  if (tagLower.includes("panic")) return "panic";
  if (tagLower.includes("stress")) return "stress";
  if (tagLower.includes("ptsd")) return "ptsd";
  if (tagLower.includes("trauma")) return "trauma";
  if (tagLower.includes("recovery")) return "recovery";
  if (tagLower.includes("ocd") || tagLower.includes("intrusive")) return "depression";
  if (tagLower.includes("eating") || tagLower.includes("body")) return "secondary";
  if (tagLower.includes("addiction") || tagLower.includes("sobriety")) return "outline";
  return "default";
};

// Form schema
const formSchema = z.object({
  name: z.string().min(3, { message: "Community name must be at least 3 characters" }),
  shortName: z.string().min(2, { message: "Short name must be at least 2 characters" })
    .max(20, { message: "Short name must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: "Only letters, numbers, hyphens and underscores allowed" }),
  description: z.string().min(10, { message: "Please provide a longer description" }),
  isPublic: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const CreateCommunityPage = () => {
  // Using null as initial state to use a gradient as fallback
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [owners, setOwners] = useState<{id: number, name: string}[]>([
    { id: 1, name: "User 1" } // Mock owner data
  ]);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortName: "",
      description: "",
      isPublic: true
    }
  });

  // Filter tag suggestions based on input
  const filteredTagSuggestions = TAG_SUGGESTIONS.filter(tag => 
    tag.toLowerCase().includes(tagInput.toLowerCase()) && 
    !selectedTags.includes(tag)
  );

  // Add a tag
  const addTag = (tag: string) => {
    if (tag.trim() === "") return;
    
    // Check if tag already exists
    if (selectedTags.includes(tag)) {
      toast({
        title: "Tag already added",
        description: `The tag "${tag}" is already in your list.`,
        variant: "destructive"
      });
      return;
    }
    
    setSelectedTags([...selectedTags, tag]);
    setTagInput("");
    setShowTagSuggestions(false);
    if (tagInputRef.current) tagInputRef.current.focus();
  };

  // Handle key press events in tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  // Form submission
  const onSubmit = (values: FormValues) => {
    // Combine form values with selected tags and images
    const communityData = {
      ...values,
      tags: selectedTags,
      bannerImage,
      profileImage,
      owners: owners.map(owner => owner.id)
    };
    
    console.log("Community creation data:", communityData);
    
    toast({
      title: "Community Created",
      description: `Successfully created "${values.name}" community!`,
    });
    
    // In a real app, you would send this data to your backend
  };

  return (
    <div className="p-6 md:p-8 relative overflow-hidden">
      {/* Stylized background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-64 -left-32 w-[600px] h-[600px] rounded-full bg-indigo-100 opacity-40 blur-3xl"></div>
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-purple-100 opacity-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-[700px] h-[500px] rounded-full bg-blue-100 opacity-40 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Create a Community</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Banner Image */}
            <div className="relative h-40 rounded-lg overflow-hidden mb-8">
              {bannerImage ? (
                <img 
                  src={bannerImage} 
                  alt="Community banner" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 flex items-center justify-center">
                  {!profileImage && (
                    <span className="text-white text-opacity-70 flex items-center">
                      <Image className="h-8 w-8 mr-2 text-white text-opacity-80" />
                      Add a banner image
                    </span>
                  )}
                </div>
              )}
              
              {/* Profile picture overlay */}
              <div className="absolute left-4 bottom-4 flex items-end">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-4 border-white shadow-md">
                    <AvatarFallback className="bg-indigo-400 text-white">
                      {profileImage ? null : "C"}
                    </AvatarFallback>
                    {profileImage && (
                      <img src={profileImage} alt="Community profile" className="object-cover" />
                    )}
                  </Avatar>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full shadow-md" 
                    onClick={() => document.getElementById('profile-upload')?.click()}
                  >
                    <PencilIcon className="h-3 w-3" />
                  </Button>
                  <input 
                    id="profile-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // In a real app, upload the file to a server and get the URL
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setProfileImage(event.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>
              
              {/* Banner change button */}
              <Button 
                variant="secondary" 
                size="sm"
                className="absolute right-2 bottom-2 shadow-md" 
                onClick={() => document.getElementById('banner-upload')?.click()}
              >
                <PencilIcon className="h-3 w-3 mr-1" />
                Change Banner
              </Button>
              <input 
                id="banner-upload" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // In a real app, upload the file to a server and get the URL
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setBannerImage(event.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            
            <Card className="p-6 shadow-md">
              <div className="space-y-6">
                {/* Community Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Community Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Community Name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {/* Short Name */}
                <FormField
                  control={form.control}
                  name="shortName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Community Short Name</FormLabel>
                      <div className="flex items-center">
                        <FormControl>
                          <Input placeholder="Community Short Name" {...field} />
                        </FormControl>
                        <div className="ml-2 flex items-center">
                          <span className="text-gray-500 text-sm px-2">https://youdoyou.org/c/</span>
                          <span className="font-medium">{field.value || "yourshortname"}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="ml-1 h-8 w-8"
                            onClick={() => {
                              navigator.clipboard.writeText(`https://youdoyou.org/c/${field.value || "yourshortname"}`);
                              toast({
                                title: "Copied to clipboard",
                                description: "The community URL has been copied to your clipboard.",
                              });
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                
                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <RichTextEditor 
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Describe what your community is about..."
                          className="min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Add Owners */}
                <div className="space-y-2">
                  <FormLabel>Add Owners</FormLabel>
                  <div className="flex flex-wrap items-center gap-2">
                    <Input
                      placeholder="Add owners by username or email"
                      className="w-[250px] flex-shrink-0"
                    />
                    {owners.map(owner => (
                      <Avatar key={owner.id} className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-indigo-400 text-white">
                          {owner.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="space-y-2">
                  <FormLabel>Tags</FormLabel>
                  <div className="relative">
                    <Input
                      ref={tagInputRef}
                      placeholder="Add tags..."
                      value={tagInput}
                      onChange={(e) => {
                        setTagInput(e.target.value);
                        setShowTagSuggestions(true);
                      }}
                      onKeyDown={handleTagKeyDown}
                      onFocus={() => setShowTagSuggestions(true)}
                      onBlur={() => {
                        // Delay hiding suggestions to allow clicking on them
                        setTimeout(() => setShowTagSuggestions(false), 200);
                      }}
                    />
                    
                    {showTagSuggestions && filteredTagSuggestions.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                        <div className="p-2">
                          {filteredTagSuggestions.map((tag) => (
                            <div
                              key={tag}
                              className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                              onClick={() => addTag(tag)}
                            >
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Selected Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={getTagVariant(tag)}
                        className="px-3 py-1 flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-xs rounded-full p-0.5 hover:bg-black/10"
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                    {selectedTags.length === 0 && (
                      <div className="text-sm text-gray-500">
                        Type tags and press Enter or select from suggestions
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Public/Private */}
                <FormField
                  control={form.control}
                  name="isPublic"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Public
                        </FormLabel>
                        <p className="text-sm text-gray-500">
                          Anyone can find and join your community
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </Card>
            
            <div className="flex justify-center">
              <Button 
                type="submit" 
                variant="purple" 
                size="lg"
                className="px-8"
              >
                Create Community
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCommunityPage;
