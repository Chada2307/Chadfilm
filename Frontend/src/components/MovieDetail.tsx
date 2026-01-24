import { X, Star, Clock, Calendar, Play, Plus, Heart, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { addToFavorites, checkIsFavorite, removeFromFavorites } from "../api/favorites";
import { StarRating } from "./StarRating";

interface Cast {
  name: string;
  character: string;
}

interface Review {
  id: number;
  user: {
    username: string;
  };
  rating: number;
  comment: string;
  //date: string; narazie bez
}

interface MovieDetailProps {
  id: string;
  title: string;
  year: string;
  rating: number;
  runtime: string;
  genre: string;
  imageUrl: string;
  backdropUrl?: string;
  director?: string;
  cast?: Cast[];
  plot?: string;
  reviews?: Review[];
  onClose: () => void;
}

export function MovieDetail({
  id,
  title,
  year,
  rating,
  runtime,
  genre,
  imageUrl,
  backdropUrl,
  director,
  cast,
  plot,
  onClose
}: MovieDetailProps) {

  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoadingFav, setIsLoadingFav] = useState(false);
  const [extraData, setExtraData] = useState<any>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [dbMovieInfo, setDbMovieInfo] = useState<any>(null);

  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkIsFavorite(id);
      setIsFavorite(status);
    };

    setIsLoadingDetails(true);
    fetch(`http://localhost:8080/api/movies/${id}/details`)
      .then(res => res.json())
      .then(data => {
        setExtraData(data);
        setIsLoadingDetails(false);
      })
      .catch(err => {
        console.error("Błąd pobierania detali: ", err);
        setIsLoadingDetails(false);
      });
    fetch(`http://localhost:8080/api/reviews/movie/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data));

    fetch(`http://localhost:8080/api/movies/${id}`)
      .then(res => res.json())
      .then(data => setDbMovieInfo(data))
      .catch(err => console.error("Błąd pobierania ratingu:", err));
    checkStatus();
  }, [id]);

  const submitReview = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return alert("Musisz być zalogowany, aby oceniać!");

    try {
      const res = await fetch(`http://localhost:8080/api/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ rating: userRating, comment })
      });

      if (res.ok) {
        alert("Dzięki za ocenę!");
        
        setComment("");
        setUserRating(0);

        fetch(`http://localhost:8080/api/reviews/movie/${id}`)
          .then(res => res.json())
          .then(data => setReviews(data));
          
        fetch(`http://localhost:8080/api/movies/${id}`)
          .then(res => res.json())
          .then(data => setDbMovieInfo(data));

      } else {
        alert("Wystąpił błąd podczas zapisywania oceny.");
      }
    } catch (err) {
      console.error(err);
      alert("Błąd połączenia z serwerem.");
    }
  };
  
  const trailer = extraData?.videos?.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  const realRuntime = extraData?.runtime
    ? `${Math.floor(extraData.runtime / 60)}h ${extraData.runtime % 60}m`
    : runtime;

  const realCast = extraData?.credits?.cast?.slice(0, 12) || [];

  const handleToggleFavourite = async () => {
    setIsLoadingFav(true);
    try {
      if (isFavorite) {
        await removeFromFavorites(id);
        setIsFavorite(false);
      } else {
        await addToFavorites(id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("blad zmiany statusu ulubionych: ", error);
      alert("musisz byc zalogowany");
    } finally {
      setIsLoadingFav(false);
    }
  }


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-sm">
      { }
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-50 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full transition-colors"
        aria-label="Close"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      { }
      <div className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={backdropUrl || imageUrl}
            alt={title}
            className="h-[60vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="flex gap-8 items-end max-w-6xl">
            { }
            <div className="hidden md:block flex-shrink-0">
              <div className="w-64 rounded-lg overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={imageUrl}
                  alt={title}
                  className="w-full h-auto aspect-[2/3] object-cover"
                />
              </div>
            </div>

            { }
            <div className="flex-1 pb-4">
              <Badge variant="outline" className="rounded-full bg-black/70 text-white tracking-wide shadow-lg ring-1 ring-white/10  backdrop-blur-sm">{genre}</Badge>
              <h1 className="text-white mb-2 text-4xl font-bold">{title}</h1>

              <div className="flex items-center gap-6 mb-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span>{rating > 0 ? rating.toFixed(1) : "Not Rated"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{realRuntime}</span>
                </div>
              </div>

              { }
              <div className="flex gap-3 flex-wrap">
                <Button
                  size="lg"
                  className="gap-2 bg-[#f5c518] text-black hover:bg-[#e5b50f] border border-[#f5c518] shadow-md"
                  onClick={() => trailer && window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank")}
                  disabled={!trailer}
                >
                  <Play className="h-5 w-5" fill="currentColor" />
                  {trailer ? "Watch Trailer" : "No Trailer"}
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Plus className="h-5 w-5" />
                  Watchlist
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleToggleFavourite}
                  disabled={isLoadingFav}
                  className={`gap-2 border transition-all ${isFavorite
                      ? "bg-red-500/20 border-red-500 text-red-500 hover:bg-red-500/30" // Styl gdy polubione
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"       // Styl domyślny
                    }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      { }
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          { }
          <div className="lg:col-span-2">
            { }
            <section className="mb-10">
              <h2 className="text-white mb-4 text-2xl font-bold">Plot</h2>
              <p className="text-white/70 leading-relaxed">
                {plot || `${title} is an extraordinary cinematic experience that pushes the boundaries of ${genre.toLowerCase()} storytelling. Set in ${year}, this gripping tale captivates audiences with its masterful direction, stunning visuals, and powerful performances.`}
              </p>
            </section>

            { }
            {realCast.length > 0 && (
              <section className="mb-10">
                <h2 className="text-white mb-6 text-2xl font-bold">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {realCast.map((actor: any) => (
                    <div key={actor.id} className="group text-center">
                      <div className="relative overflow-hidden rounded-xl mb-3 aspect-[2/3] ring-1 ring-white/10 group-hover:ring-yellow-500/50 transition-all">
                        <img
                          src={actor.profile_path
                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                            : "https://placehold.co/185x278?text=No+Photo"}
                          alt={actor.name}
                          className="h-full w-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <p className="text-white text-sm font-semibold truncate">{actor.name}</p>
                      <p className="text-white/50 text-[11px] truncate">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Twoja opinia</h2>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <p className="mb-4 text-gray-400 font-medium">Jak oceniasz ten film?</p>
              <StarRating rating={userRating} setRating={setUserRating} />
              
              <textarea
                className="w-full mt-4 bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-yellow-500 outline-none transition-all"
                placeholder="Napisz kilka słów o filmie (opcjonalnie)..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              
              <Button onClick={submitReview} className="mt-4 bg-yellow-500 text-black font-bold hover:bg-yellow-400">
                Opublikuj ocenę
              </Button>
            </div>

            {/* Lista innych opinii */}
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-bold text-white">Recenzje społeczności</h3>
              {reviews.length === 0 ? (
                <p className="text-gray-500 italic">Bądź pierwszym, który oceni ten film!</p>
              ) : (
                reviews.map((rev) => (
                  <div key={rev.id} className="border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-500 font-bold">{rev.user.username}</span>
                      <StarRating rating={rev.rating} interactive={false} />
                    </div>
                    <p className="text-gray-300">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>
          </section>
          { }
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 sticky top-4">
              <h3 className="text-white mb-6 text-xl font-bold">Movie Info</h3>

              <div className="space-y-4">
                {director && (
                  <div>
                    <dt className="text-sm text-white/50 mb-1">Director</dt>
                    <dd className="text-white">{director}</dd>
                  </div>
                )}

                <div>
                  <dt className="text-sm text-white/50 mb-1">Genre</dt>
                  <dd className="text-white">{genre}</dd>
                </div>

                <div>
                  <dt className="text-sm text-white/50 mb-1">Release Year</dt>
                  <dd className="text-white">{year}</dd>
                </div>

                <div>
                  <dt className="text-sm text-white/50 mb-1">Runtime</dt>
                  <dd className="text-white">{realRuntime}</dd>
                </div>

                <div>
                  <dt className="text-sm text-white/50 mb-1">Rating</dt>
                  <dd className="flex items-center gap-2 text-white">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    {dbMovieInfo?.chadScore ? dbMovieInfo.chadScore.toFixed(1) : "N/A"}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}