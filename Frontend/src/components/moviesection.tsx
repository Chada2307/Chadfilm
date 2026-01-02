import { ChevronRight } from "lucide-react";
import { MovieCard } from "./moviecard";
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
}

export function MovieSection({ title, movies, onMovieClick }: MovieSectionProps) {
  return (
    <section className="py-8">
      <div className="mb-4 flex items-center justify-between px-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <button className="text-sm font-medium text-yellow-500 hover:text-yellow-400 transition-colors">
          Zobacz wszystkie
        </button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto px-4 pb-8 scrollbar-hide snap-x">
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
    </section>
  );
}