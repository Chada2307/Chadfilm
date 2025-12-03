import { ChevronRight } from "lucide-react";
import { MovieCard } from "./MovieCard";
import { Button } from "./ui/button";

interface Movie {
  id: string;
  title: string;
  year: string;
  rating: number;
  runtime?: string;
  genre: string;
  imageUrl: string;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

export function MovieSection({ title, movies }: MovieSectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">{title}</h2>
        <Button variant="ghost" className="gap-1 text-muted-foreground hover:text-foreground">
          View All
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </section>
  );
}
