import { User, Film, Star, MessageSquare, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getMyList } from "../api/favorites";
import { MovieCard } from "./moviecard";
import { Movie } from "../../types";

interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt?: string;
  movie: {
    title: string;
    posterUrl: string;
    movieId: number;
  };
}

interface ProfileProps {
  username?: string;
  onNavigate?: (view: "home" | "my-list" | "all-movies") => void;
  onMovieClick?: (movie: Movie) => void;
}

export function Profile({ username = "User", onNavigate, onMovieClick }: ProfileProps) {
  const [user, setUser] = useState(username);
  const [myList, setMyList] = useState<Movie[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser || username;
    if (storedUser) {
      setUser(storedUser);
    }

    // Fetch user's list
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
        setMyList(mappedMovies);
        setLoadingList(false);
      })
      .catch((err) => {
        console.error("Error fetching my list:", err);
        setLoadingList(false);
      });
      setLoadingReviews(true);
    fetch(`http://localhost:8080/api/reviews/user/${currentUser}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoadingReviews(false);
      })
      .catch(err => {
        console.error("Error fetching user reviews:", err);
        setLoadingReviews(false);
      });
  }, [username]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Left Column: User Info */}
          <div className="md:w-1/3 lg:w-1/4 flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`}
                  alt="Profile"
                  className="w-full h-full object-cover bg-neutral-800"
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-neutral-900 rounded-full p-2 border border-white/10">
                <User className="w-5 h-5 text-yellow-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">{user}</h1>
            <p className="text-gray-400 text-sm mb-8">Member since 2024</p>

            <div className="w-full bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4 border-b border-white/10 pb-2">Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Movies Watched</span>
                  <span className="font-medium">{myList.length}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Comments</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Reviews</span>
                  <span className="font-medium">{reviews.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content Sections */}
          <div className="md:w-2/3 lg:w-3/4 space-y-10">

            {/* My List Section */}
            <section className="relative group">
              <div className="flex items-center gap-3 mb-6">
                <Film className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold">My List <span className="text-gray-500 text-lg font-normal ml-2">({myList.length})</span></h2>
              </div>

              {loadingList ? (
                <div className="text-center text-gray-500 py-10">Loading your list...</div>
              ) : myList.length > 0 ? (
                <div className="relative">
                  {/* Navigation Buttons */}
                  <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-black/50 hover:bg-yellow-500 text-white hover:text-black p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {myList.map(movie => (
                      <div key={movie.id} className="w-[160px] sm:w-[200px] md:w-[240px] flex-shrink-0 snap-start">
                        <MovieCard
                          {...movie}
                          onClick={() => onMovieClick?.(movie)}
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-black/50 hover:bg-yellow-500 text-white hover:text-black p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <div className="bg-white/5 rounded-xl border border-white/10 p-8 text-center min-h-[200px] flex flex-col items-center justify-center dashed-border">
                  <div className="bg-neutral-900 p-4 rounded-full mb-4">
                    <Film className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-300 mb-2">Your list is empty</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">Start adding movies to your list to track what you want to watch next.</p>
                  <button
                    onClick={() => onNavigate?.("all-movies")}
                    className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors"
                  >
                    Browse Movies
                  </button>
                </div>
              )}
            </section>

            {/* Favourites Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold">Favourites</h2>
              </div>

              <div className="bg-white/5 rounded-xl border border-white/10 p-8 text-center min-h-[150px] flex flex-col items-center justify-center">
                <p className="text-gray-500">No favourites yet.</p>
              </div>
            </section>

            {/* Reviews Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold">Your Reviews <span className="text-gray-500 text-lg font-normal ml-2">({reviews.length})</span></h2>
              </div>

              {loadingReviews ? (
                 <div className="text-center text-gray-500 py-10">Loading reviews...</div>
              ) : reviews.length > 0 ? (
                <div className="grid gap-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white/5 rounded-xl border border-white/10 p-4 flex gap-4 hover:bg-white/10 transition-colors">
                      {/* Miniaturka filmu */}
                      <div className="flex-shrink-0 w-16 h-24 rounded-lg overflow-hidden bg-neutral-800">
                         {review.movie && (
                            <img 
                              src={review.movie.posterUrl || "https://placehold.co/100x150?text=No+Img"} 
                              alt={review.movie.title} 
                              className="w-full h-full object-cover"
                            />
                         )}
                      </div>
                      
                      {/* Treść recenzji */}
                      <div className="flex-grow">
                         <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-lg text-white">
                                {review.movie ? review.movie.title : "Unknown Movie"}
                            </h4>
                            <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded text-yellow-500 text-sm font-bold">
                               <Star className="w-3 h-3 fill-yellow-500" />
                               {review.rating}/10
                            </div>
                         </div>
                         
                         {review.createdAt && (
                           <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                             <Calendar className="w-3 h-3" />
                             {new Date(review.createdAt).toLocaleDateString()}
                           </div>
                         )}

                         <p className="text-gray-300 text-sm leading-relaxed">
                            "{review.comment}"
                         </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 rounded-xl border border-white/10 p-8 text-center min-h-[150px] flex flex-col items-center justify-center">
                  <p className="text-gray-500">You haven't written any reviews yet.</p>
                </div>
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
