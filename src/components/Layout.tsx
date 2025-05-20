
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import AppSidebar from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Determine if the current route is a dashboard route that should show the sidebar
  const isDashboard = location.pathname === "/dashboard";
  
  // Check if current route is part of the initial sign-up flow
  const isInitialFlow = location.pathname === "/" || 
                        location.pathname === "/about" || 
                        location.pathname === "/signup" || 
                        location.pathname === "/login" || 
                        location.pathname === "/assess" || 
                        location.pathname === "/profile";
  
  // Only show the sidebar if it's not part of the initial flow
  const showSidebar = !isInitialFlow;
  
  // Only show navbar if it's not part of the initial flow
  const showNavbar = !isInitialFlow;

  // Check if current route is chat or direct message route
  const isChat = location.pathname === "/chat" || location.pathname.startsWith("/direct-message/");

  // Scroll to top on route change, particularly important for mobile
  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Background decorations - now showing on all pages */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url("/images/dashboard-bg.png")',
          height: '100vh'
        }}
      />
      
      {/* Navbar with high z-index */}
      {showNavbar && (
        <div className="h-16 flex-shrink-0 relative z-50">
          <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
        </div>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with high z-index */}
        {showSidebar && (
          <div className="relative z-40">
            <AppSidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)} 
            />
          </div>
        )}
        
        {/* Main content */}
        <main className={`flex-1 relative z-10 ${isChat ? 'overflow-hidden' : 'overflow-auto'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
