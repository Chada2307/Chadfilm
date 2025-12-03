import { Film, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Film className="h-6 w-6 text-yellow-500" />
              <span className="text-xl">ChadFilm</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your ultimate destination for movie information, ratings, and reviews.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Movies */}
          <div>
            <h3 className="mb-4 text-sm">Movies</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Popular</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Now Playing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Upcoming</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Top Rated</a></li>
            </ul>
          </div>

          {/* TV Shows */}
          <div>
            <h3 className="mb-4 text-sm">TV Shows</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Popular</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Airing Today</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">On TV</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Top Rated</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CineDB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
