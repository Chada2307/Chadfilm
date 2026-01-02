import { useEffect, useState } from "react";
import { getMyList } from "../api/favorites";
import { MovieCard } from "./moviecard";
import { Movie } from "../../types"

interface MyListProps{
    onMovieClick: (movie: Movie) => void;
}

export function MyList ({ onMovieClick }: MyListProps){
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyList()
        .then((data) => {
            const mappedMovies = data.map((movie: any) => ({
                id: movie.movieId,
                title: movie.title,
                year: movie.releaseDate ? new Date(movie.releaseDate).getFullYear().toString() : "N/A",
                rating: movie.voteAverage || 0,
                runtime: "N/A",
                genre: "Movie",
                imageUrl: movie.posterUrl || "https://placehold.co/600x900?text=No+Image",
                plot: movie.description || "Brak opisu."
            }));
            setMovies(mappedMovies);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Blad pobierania danych", err);
            setLoading(false);
        });
    },[]);
    return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">
        Moja Lista <span className="text-yellow-500 text-lg ml-2">({movies.length})</span>
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Ładowanie Twojej kolekcji...</div>
      ) : movies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl mb-4">Twoja lista jest pusta.</p>
          <p className="text-gray-600">Dodaj filmy klikając serduszko w szczegółach filmu.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
              runtime={movie.runtime}
              genre={movie.genre}
              imageUrl={movie.imageUrl}
              onClick={() => onMovieClick(movie)}
            />
          ))}
        </div>
      )}
    </div>
  );
}