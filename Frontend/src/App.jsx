import { useState, useEffect } from 'react';
import './App.css';
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { MovieSection } from "./components/moviesection";
import { MovieDetail } from "./components/MovieDetail";
import { MyList } from "./components/MyList";
import { MovieCard } from './components/moviecard';

function App() {
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("home"); 
  const [heroMovie, setHeroMovie] = useState(null);
  const [viewTitle, setViewTitle] = useState("");
  const [pagedMovies, setPagedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  const openSeeAll = (title) => {
    setViewTitle(title);
    setCurrentView("see-all");
    window.scrollTo(0,0);
  };

  useEffect(() => {
    setLoading(true);

    const url = searchQuery
      ? `http://localhost:8080/api/movies?query=${searchQuery}`
      : "http://localhost:8080/api/movies";

      fetch(url)
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
          if (!searchQuery && mappedMovies.length > 0) {
              const randomMovie = mappedMovies[Math.floor(Math.random() * mappedMovies.length)];
              setHeroMovie(randomMovie);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Błąd pobierania filmów:", err);
          setLoading(false);
        });
  }, [searchQuery]);


  //usefefekt do wszystkich filmow w movies
  useEffect(() => {
    if(currentView === "all-movies"){
      setLoading(true);
      fetch(`http://localhost:8080/api/movies/paged?page=${currentPage}&size=30`)
        .then((res) => res.json())
        .then((data) => {
          const mapped = data.content.map(movie => ({
            id: movie.movieId,
            title: movie.title,
            year: movie.releaseDate ? new Date(movie.releaseDate).getFullYear().toString() : "N/A",
            rating: movie.voteAverage || 0,
            runtime: "N/A",
            genre: "Movie",
            imageUrl: movie.posterUrl || "https://placehold.co/600x900?text=No+Image",
            plot: movie.description
          }));
          setPagedMovies(mapped);
          setTotalPages(data.totalPages);
          setLoading(false);
        })
        .catch(err => {
          console.error("blad stronicowania", err);
          setLoading(false);
        });
    }
  }, [currentView, currentPage]);

  return (
    <div className="min-h-screen bg-neutral-950 relative text-white">

      <Header 
        onSearch={(q) => { setSearchQuery(q); setCurrentView("home"); }} 
        onNavigate={(view) => { setCurrentView(view); setSearchQuery(""); }}
      />

      
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
      {currentView === "all-movies" ? (
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-bold text-yellow-500">Wszystkie filmy (A-Z)</h2>
            <div className="text-gray-400">Łącznie stron: {totalPages}</div>
          </div>

        {loading ? (
          <div className="text-center text-gray-500 py-20">Ładowanie bazy...</div> 
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {pagedMovies.map(movie => (
                <MovieCard key={movie.id} {...movie} onClick={() => setSelectedMovie(movie)} />
              ))}
            </div>
            <div className="flex justify-center items-center gap-6 mt-16">
              <button
                disabled={currentPage === 0}
                onClick={() => {setCurrentPage(prev => prev - 1); window.scrollTo(0,10);}}
                className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-yellow-500 hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-white/5 disabled:hover:text-white"
              >
                Poprzednia 
              </button>
              
              <div className="text-lg font-medium">
                Strona <span className="text-yellow-500">{currentPage + 1}</span> z {totalPages}
              </div>
              
              <button
                disabled={currentPage >= totalPages -1}
                onClick={() => {setCurrentPage(prev => prev + 1); window.scrollTo(0,0); }}
                className="px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-yellow-500 hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-white/5 disabled:hover:text-white"
              >
                Następna
              </button>
            </div>
          </>
        )}
      </div>
      ) : currentView === "my-list" && localStorage.getItem("auth_token") ? (
        <MyList onMovieClick={setSelectedMovie}/>
      ) : currentView === "see-all" ? (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 border-b border-white/10 pb-4">{viewTitle}</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {movies.map(movie => (
                <MovieCard key={movie.id} {...movie} onClick={()=> setSelectedMovie(movie)}/>
              ))}
          </div>
        </div>
      ) : ( 
      <>
      {!searchQuery && 
        <Hero 
            movie={heroMovie} 
            onInfoClick={() => setSelectedMovie(heroMovie)}
        />}

      <main className="container mx-auto px-4 py-12">
        {loading ? (
           <div className="text-center text-gray-500">Ładowanie filmów z bazy...</div>
        ) : (
          <>
            {/* Jeśli szukamy, zmień tytuł sekcji */}
            <MovieSection
              title={searchQuery ? `Wyniki wyszukiwania: "${searchQuery}"` : "Popularne teraz"}
              movies={movies.slice(0,10)}
              onMovieClick={setSelectedMovie}
              onSeeAll={() => openSeeAll("Popularne teraz")}
            />
            
            {/* Ukrywamy drugą sekcję podczas wyszukiwania, żeby nie robić bałaganu */}
            {!searchQuery && (
              <MovieSection
                title="Top Rated"
                movies={movies.slice(0,10)}
                //movies={movies.filter(m => m.rating > 7).slice(0, 5)}
                onMovieClick={setSelectedMovie}
                onSeeAll={() => openSeeAll("Top Rated")}
              />
            )}
          </>
        )}
      </main>
      </>
      )}
    </div>
  );
}

export default App;