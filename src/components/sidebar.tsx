
import { Link, useLocation } from "react-router-dom";
import { 
  Upload, 
  Mic, 
  BarChart3, 
  History, 
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/dashboard"
    },
    {
      title: "Upload Speech",
      icon: Upload,
      path: "/upload"
    },
    {
      title: "Real-time Analysis",
      icon: Mic,
      path: "/analysis"
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/analytics"
    },
    {
      title: "History",
      icon: History,
      path: "/history"
    }
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 flex h-full w-72 flex-col border-r bg-background pt-16 transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col space-y-2 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              location.pathname === item.path ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      <div className="mt-auto p-4">
        <div className="rounded-lg bg-navy-100 dark:bg-navy-900 p-4">
          <h3 className="font-medium text-navy-800 dark:text-navy-100">Tip of the day</h3>
          <p className="mt-2 text-xs text-navy-700 dark:text-navy-200">
            Eliminate filler words by pausing instead of saying "um" or "uh". A moment of silence is more powerful than a filler word.
          </p>
        </div>
      </div>
    </aside>
  );
}
