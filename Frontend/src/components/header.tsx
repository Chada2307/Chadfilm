import { useState, useEffect } from "react";
import { Search, Film, User, Menu, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LoginModal } from "./loginmodal";
import { RegisterModal } from "./RegisterModal";

export function Header() {

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUsername(null);
    window.location.reload();
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-2">
                <Film className="h-8 w-8 text-yellow-500" />
                <span className="text-2xl font-bold tracking-tight">ChadFilm</span>
              </a>

              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  Movies
                </a>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  TV Series
                </a>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  Top Rated
                </a>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  Coming Soon
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search movies..."
                  className="pl-9 w-64 bg-gray-50"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>

              {username ? (
                <div className="flex items-center gap-2">
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {username}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleLogout}
                    title="Wyloguj się"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLoginOpen(true)}
                  title="Zaloguj się"
                >
                  <User className="h-5 w-5" />
                </Button>
              )}

              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setLoginOpen(false)} 
        switchToRegister={() => {
            setLoginOpen(false);
            setRegisterOpen(true);
        }}
      />

      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setRegisterOpen(false)} 
        switchToLogin={() => {
            setRegisterOpen(false);
            setLoginOpen(true);
        }}
      />
    </>
  );
}