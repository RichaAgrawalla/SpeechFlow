
import { Link } from "react-router-dom";
import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  toggleSidebar: () => void;
  userAuthenticated: boolean;
  setUserAuthenticated: (authenticated: boolean) => void;
}

export function Header({ 
  toggleSidebar, 
  userAuthenticated, 
  setUserAuthenticated 
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link to="/" className="flex items-center space-x-2">
            <div className="wave-animation flex h-6 items-center">
              <span style={{ "--i": 1 } as React.CSSProperties} className="h-3"></span>
              <span style={{ "--i": 2 } as React.CSSProperties} className="h-4"></span>
              <span style={{ "--i": 3 } as React.CSSProperties} className="h-6"></span>
              <span style={{ "--i": 4 } as React.CSSProperties} className="h-5"></span>
              <span style={{ "--i": 5 } as React.CSSProperties} className="h-3"></span>
            </div>
            <span className="text-xl font-bold gradient-text">SpeechFlow</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {userAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer text-red-500 focus:text-red-500"
                  onClick={() => setUserAuthenticated(false)}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </header>
  );
}
