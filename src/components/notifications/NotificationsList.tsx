
import React from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
  link: string;
}

interface NotificationsListProps {
  notifications: Notification[];
}

const NotificationsList = ({ notifications }: NotificationsListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="py-6 px-4 text-center">
        <div className="flex justify-center mb-3">
          <Bell className="h-10 w-10 text-gray-300" />
        </div>
        <p className="text-gray-500">No notifications yet</p>
      </div>
    );
  }

  return (
    <div>
      <div className="py-2 px-4 border-b border-gray-100">
        <h2 className="font-medium">Notifications</h2>
      </div>
      <div className="max-h-[350px] overflow-y-auto">
        {notifications.slice(0, 5).map((notification) => (
          <Link
            key={notification.id}
            to={notification.link}
            className={cn(
              "block border-b border-gray-100 last:border-0 py-3 px-4 hover:bg-gray-50 transition-colors",
              !notification.read && "bg-purple-50"
            )}
          >
            <div className="flex justify-between items-start">
              <p className={cn("text-sm", !notification.read && "font-medium")}>
                {notification.message}
              </p>
              {!notification.read && (
                <span className="h-2 w-2 bg-purple-500 rounded-full flex-shrink-0 mt-1.5" />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </Link>
        ))}
      </div>
      {notifications.length > 5 && (
        <div className="py-2 px-4 border-t border-gray-100">
          <Link 
            to="/notifications"
            className="block text-center text-sm text-purple-600 hover:text-purple-700"
          >
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotificationsList;
