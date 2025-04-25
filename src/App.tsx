
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AssessPage from "./pages/AssessPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import JournalPage from "./pages/JournalPage";
import AccountPage from "./pages/AccountPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import CreateCommunityPage from "./pages/CreateCommunityPage";
import CommunityDetailPage from "./pages/CommunityDetailPage";
import FindConnectionsPage from "./pages/FindConnectionsPage";
import UserProfilePage from "./pages/UserProfilePage";
import ChatPage from "./pages/ChatPage";
import DirectMessagePage from "./pages/DirectMessagePage";
import MessageBoardPage from "./pages/MessageBoardPage";
import PostDetailPage from "./pages/PostDetailPage";
import ResourcesPage from "./pages/ResourcesPage";
import NotFound from "./pages/NotFound";
import RaePage from "./pages/RaePage";
import RaeChatPage from "./pages/RaeChatPage";
import VideoMeetingsPage from "./pages/VideoMeetingsPage";
import VideoMeetingRoom from "./pages/VideoMeetingRoom";

// Temporary component for routes that are coming soon
const ComingSoonPage = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 text-lg">This feature is coming soon!</p>
    </div>
  );
};

const App = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth routes without layout */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Redirect from /home to /dashboard */}
            <Route path="/home" element={<Navigate to="/dashboard" replace />} />
            
            {/* Routes with persistent layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<AboutPage />} />
              <Route path="/assess" element={<AssessPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/communities" element={<CommunitiesPage />} />
              <Route path="/communities/create" element={<CreateCommunityPage />} />
              <Route path="/communities/:id" element={<CommunityDetailPage />} />
              <Route path="/connections" element={<FindConnectionsPage />} />
              <Route path="/user-profile/:id?" element={<UserProfilePage />} />
              
              {/* Using FindConnectionsPage for People route as well */}
              <Route path="/people" element={<FindConnectionsPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/direct-message/:userId" element={<DirectMessagePage />} />
              <Route path="/message-board" element={<MessageBoardPage />} />
              <Route path="/message-board/posts/:id" element={<PostDetailPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/rae" element={<RaePage />} />
              <Route path="/rae-chat" element={<RaeChatPage />} />
              <Route path="/video-meetings" element={<VideoMeetingsPage />} />
              <Route path="/video-meeting/:meetingId" element={<VideoMeetingRoom />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
