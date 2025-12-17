import { Search, Film, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  onUserClick?: () => void;
}

export function Header({ onUserClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          { }
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <Film className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl">ChadFilm</span>
            </a>

            { }
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Movies
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                TV Series
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Top Rated
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                Coming Soon
              </a>
            </nav>
          </div>

          { }
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search movies..."
                className="pl-9 w-64"
              />
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onUserClick}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
