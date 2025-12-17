import { useState } from 'react';
import './App.css';
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { MovieSection } from "./components/moviesection";
import { LoginModal } from "./components/loginmodal";
import { MovieDetail } from "./components/MovieDetail";

const trendingMovies = [
  {
    id: "1",
    title: "Joker",
    year: "2019",
    rating: 8.2,
    runtime: "2h 2min",
    genre: "Drama",
    imageUrl: "https://image.tmdb.org/t/p/w1280/opwCl56Zi8mextLETtM3d0ryVFU.jpg"
  },
  {
    id: "2",
    title: "The Dark Knight",
    year: "2008",
    rating: 9.2,
    runtime: "2h 32min",
    genre: "Action",
    imageUrl: "https://image.tmdb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    id: "3",
    title: "The Shawshank Redemption",
    year: "1995",
    rating: 9.7,
    runtime: "2h 22min",
    genre: "Drama",
    imageUrl: "https://image.tmdb.org/t/p/w1280/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"
  },
  {
    id: "4",
    title: "Fight Club",
    year: "1999",
    rating: 8.7,
    runtime: "2h 19min",
    genre: "Drama",
    imageUrl: "https://image.tmdb.org/t/p/w1280/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
  },
  {
    id: "5",
    title: "Forest Gump",
    year: "1994",
    rating: 8.7,
    runtime: "2h 22min",
    genre: "Comedy",
    imageUrl: "https://image.tmdb.org/t/p/w1280/9wlYJy01XgvIhdf651FgyJkau07.jpg"
  },
  {
    id: "6",
    title: "Bee Movie",
    year: "2007",
    rating: 6.7,
    runtime: "1h 31min",
    genre: "Family",
    imageUrl: "https://image.tmdb.org/t/p/w1280/aWe27GmvfVYAd7p0KEtJZWwLWk5.jpg"
  }
];

const topRatedMovies = trendingMovies;
const comingSoonMovies = trendingMovies;

function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="min-h-screen bg-background relative">
      <Header onUserClick={() => setLoginOpen(true)} />

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      />

      { }
      {selectedMovie && (
        <MovieDetail
          id={selectedMovie.id}
          title={selectedMovie.title}
          year={selectedMovie.year}
          rating={selectedMovie.rating}
          runtime={selectedMovie.runtime || "N/A"}
          genre={selectedMovie.genre}
          imageUrl={selectedMovie.imageUrl}

          onClose={() => setSelectedMovie(null)}

          backdropUrl={selectedMovie.imageUrl}
          plot={`To jest przykładowy opis dla filmu ${selectedMovie.title}. W pełnej aplikacji te dane będą pobierane z bazy danych lub API po kliknięciu w film.`}
          cast={[
            { name: "Główny Aktor", character: "Postać" },
            { name: "Drugi Aktor", character: "Postać" },
            { name: "Trzeci Aktor", character: "Postać" }
          ]}
        />
      )}

      <Hero />

      <main className="container mx-auto px-4 py-12">
        <MovieSection
          title="Trending Now"
          movies={trendingMovies}
          onMovieClick={setSelectedMovie}
        />
        <MovieSection
          title="Top Rated"
          movies={topRatedMovies}
          onMovieClick={setSelectedMovie}
        />
        <MovieSection
          title="Coming Soon"
          movies={comingSoonMovies}
          onMovieClick={setSelectedMovie}
        />
      </main>
    </div>
  );
}

export default App;