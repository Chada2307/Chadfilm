import { Play, Info, Heart, Star } from "lucide-react"; // Zmieniono Plus na Heart
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";
import { addToFavorites, checkIsFavorite, removeFromFavorites } from "../api/favorites"; // Import API

interface HeroProps {
  movie?: {
    id: number | string;
    title: string;
    plot: string;
    imageUrl: string;
    year: string;
    rating: number;
    genre: string;
  } | null;
  onInfoClick?: () => void;
}

export function Hero({ movie, onInfoClick }: HeroProps) {
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoadingFav, setIsLoadingFav] = useState(false);

  useEffect(() => {
    if (movie?.id) {
      checkIsFavorite(movie.id).then((status) => setIsFavorite(status));
    }
  }, [movie]);

  const handleToggleFavorite = async () => {
    if (!movie) return;
    
    setIsLoadingFav(true);
    try {
      if (isFavorite) {
        await removeFromFavorites(movie.id);
        setIsFavorite(false);
      } else {
        await addToFavorites(movie.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Błąd zmiany statusu ulubionych:", error);
      alert("Zaloguj się, aby dodać do listy!");
    } finally {
      setIsLoadingFav(false);
    }
  };

  if (!movie) {
    return (
      <div className="relative h-[70vh] min-h-[600px] w-full bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-black">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-top transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${movie.imageUrl}')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative h-full flex items-center z-10">
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
          
          {/* Badges */}
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">
              Featured
            </Badge>
            <Badge variant="outline" className="rounded-full bg-black/40 text-white tracking-wide shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
               {movie.year || "2024"}
            </Badge>
            <Badge variant="outline" className="rounded-full bg-black/40 text-white tracking-wide shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
               {movie.genre || "Movie"}
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl mb-4 text-white font-bold tracking-tight drop-shadow-xl leading-tight">
            {movie.title}
          </h1>
          
          {/* Info Line */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
              <span className="text-white font-bold">{movie.rating.toFixed(1)}</span>
              <span className="text-white/60 text-sm">/10</span>
            </div>
            <span className="text-white/60">•</span>
            <span className="text-white/80">Trending</span>
            <span className="text-white/60">•</span>
            <span className="text-white/80">HD</span>
          </div>

          <p className="text-lg text-gray-200 mb-8 max-w-xl line-clamp-3 drop-shadow-md">
            {movie.plot}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="gap-2 bg-[#f5c518] text-black hover:bg-[#e5b50f] border border-[#f5c518] shadow-md font-bold transition-transform hover:scale-105">
              <Play className="h-5 w-5 fill-black" />
              Watch Trailer
            </Button>
            
            <Button 
                size="lg" 
                variant="outline" 
                onClick={onInfoClick}
                className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-transform hover:scale-105"
            >
              <Info className="h-5 w-5" />
              More Info
            </Button>
            
            {/* 👇 4. NOWY PRZYCISK MY LIST (SERDUSZKO) */}
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleToggleFavorite}
              disabled={isLoadingFav}
              className={`gap-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                isFavorite 
                  ? "bg-red-500/20 border-red-500 text-red-500 hover:bg-red-500/30" // Styl gdy aktywne
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"       // Styl domyślny
              }`}
            >
              {/* Ikona zmienia się w wypełnioną */}
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "Saved" : "My List"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}