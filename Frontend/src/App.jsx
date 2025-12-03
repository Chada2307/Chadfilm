import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from "./components/header"
import { Hero } from "./components/hero";
import { MovieSection } from "./components/moviesection";
import {LoginModal} from "./components/loginmodal"

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

const topRatedMovies = [
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

const comingSoonMovies = [
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

function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onUserClick={() => setLoginOpen(true)} />
      <Hero />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
      <main className="container mx-auto px-4 py-12">
        <MovieSection title="Trending Now" movies={trendingMovies} />
        <MovieSection title="Top Rated" movies={topRatedMovies} />
        <MovieSection title="Coming Soon" movies={comingSoonMovies} />
      </main>
    </div>
  );
}

export default App
