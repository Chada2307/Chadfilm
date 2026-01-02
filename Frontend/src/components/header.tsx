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

  //scrooll efekt
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUsername(storedUser);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUsername(null);
    window.location.reload();
  };

  return (
    <>
      
      <header 
        className={`sticky top-0 z-50 w-full border-b border-white/10 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-gradient-to-b from-black/80 to-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            
            {/* LOGO */}
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-2 group">
                
                <Film className="h-8 w-8 text-yellow-500 group-hover:rotate-12 transition-transform" />
                <span className="text-2xl font-bold tracking-tight text-white group-hover:text-yellow-500 transition-colors">
                  ChadFilm
                </span>
              </a>

              
              <nav className="hidden md:flex items-center gap-6">
                {["Movies", "TV Series", "Top Rated", "Coming Soon"].map((item) => (
                  <a 
                    key={item}
                    href="#" 
                    className="text-sm font-medium text-gray-300 hover:text-white hover:underline decoration-yellow-500 underline-offset-4 transition-all"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* prawa strona */}
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block group">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                
                <Input
                  type="search"
                  placeholder="Search movies..."
                  className="pl-9 w-64 bg-white/10 border-transparent text-white placeholder:text-gray-400 focus:bg-white/20 focus:ring-1 focus:ring-yellow-500 transition-all rounded-full"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Search className="h-5 w-5" />
              </Button>

              {username ? (
                <div className="flex items-center gap-3">
                  <span className="hidden md:block text-sm font-medium text-yellow-500">
                    {username}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-500 hover:bg-white/5"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLoginOpen(true)}
                  className="text-white hover:text-yellow-500 hover:bg-white/5"
                >
                  <User className="h-5 w-5" />
                </Button>
              )}
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