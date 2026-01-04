import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard } from "./moviecard";
import { useRef } from "react";
import { Button } from "./ui/button";

interface Movie {
  id: string | number;
  title: string;
  year: string;
  rating: number;
  runtime?: string;
  genre: string;
  imageUrl: string;
  plot?: string;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onSeeAll?: () => void;
}

export function MovieSection({ title, movies, onMovieClick, onSeeAll }: MovieSectionProps) {
  
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: "left" | "right") => {
    if(scrollRef.current){
      const { scrollLeft, clientWidth} = scrollRef.current;
      const scrollTo = direction === "left"
        ? scrollLeft - clientWidth * 0.8
        : scrollLeft + clientWidth * 0.8;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth"});
    }
  };

  return (
    <section className="py-8 relative group">
      <div className="mb-4 flex items-center justify-between px-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <button 
          onClick={onSeeAll}
          className="text-sm font-medium text-yellow-500 hover:text-yellow-400 transition-colors"
        >
          Zobacz wszystkie
        </button>
      </div>
      
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 text-white hover:bg-black/80 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      
        <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-4 pb-8 scrollbar-hide snap-x scroll-smooth"
        >
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="min-w-[160px] sm:min-w-[200px] md:min-w-[240px] snap-start"
            >
              <MovieCard
                title={movie.title}
                year={movie.year}
                rating={movie.rating}
                runtime={movie.runtime}
                genre={movie.genre}
                imageUrl={movie.imageUrl}
                onClick={() => onMovieClick(movie)}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 text-white hover:bg-black/80 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}