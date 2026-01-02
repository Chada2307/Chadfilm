import { useState, useEffect } from 'react';
import './App.css';
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { MovieSection } from "./components/moviesection";
import { MovieDetail } from "./components/MovieDetail";

function App() {
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [selectedMovie, setSelectedMovie] = useState(null);

  
  useEffect(() => {
    fetch("http://localhost:8080/api/movies")
      .then((res) => res.json())
      .then((data) => {
        
        const mappedMovies = data.map(movie => ({
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
        console.error("Błąd pobierania filmów:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 relative text-white">

      <Header />

      
      {selectedMovie && (
        <MovieDetail
          id={selectedMovie.id}
          title={selectedMovie.title}
          year={selectedMovie.year}
          rating={selectedMovie.rating}
          runtime={selectedMovie.runtime}
          genre={selectedMovie.genre}
          imageUrl={selectedMovie.imageUrl}
          
          onClose={() => setSelectedMovie(null)}
          
          backdropUrl={selectedMovie.imageUrl}
          plot={selectedMovie.plot}
          cast={[

            { name: "Obsada", character: "Wkrótce" },
          ]}
        />
      )}

      <Hero />

      <main className="container mx-auto px-4 py-12">
        {loading ? (
           <div className="text-center text-gray-500">Ładowanie filmów z bazy...</div>
        ) : (
          <>
            {/* Sekcja 1: Dane z bazy */}
            <MovieSection
              title="Popularne teraz (z Bazy Danych)"
              movies={movies}
              onMovieClick={setSelectedMovie}
            />

            {/* Sekcja 2: Na razie duplikujemy to samo, żeby strona nie była pusta
                Docelowo zrobisz endpoint /api/movies/top-rated */}
            <MovieSection
              title="Top Rated"
              movies={movies}
              //movies={movies.filter(m => m.rating > 7).slice(0, 5)} // Przykładowy filtr
              onMovieClick={setSelectedMovie}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;