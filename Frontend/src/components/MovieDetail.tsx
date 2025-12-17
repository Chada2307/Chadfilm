import { X, Star, Clock, Calendar, Play, Plus, Heart, Share2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Cast {
  name: string;
  character: string;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
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
  reviews,
  onClose
}: MovieDetailProps) {
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
            className="h-full w-full object-cover"
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
                  <span>{runtime}</span>
                </div>
              </div>

              { }
              <div className="flex gap-3 flex-wrap">
                <Button size="lg" className="gap-2 bg-[#f5c518] text-black hover:bg-[#e5b50f] border border-[#f5c518] shadow-md">
                  <Play className="h-5 w-5" fill="currentColor" />
                  Watch Trailer
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Plus className="h-5 w-5" />
                  Watchlist
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Heart className="h-5 w-5" />
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
            {cast && cast.length > 0 && (
              <section className="mb-10">
                <h2 className="text-white mb-4 text-2xl font-bold">Cast</h2>
                <div className="space-y-3">
                  {cast.map((actor, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-white/10">
                      <span className="text-white">{actor.name}</span>
                      <span className="text-white/60">{actor.character}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

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
                  <dd className="text-white">{runtime}</dd>
                </div>

                <div>
                  <dt className="text-sm text-white/50 mb-1">Rating</dt>
                  <dd className="flex items-center gap-2 text-white">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    {rating > 0 ? `${rating.toFixed(1)}/10` : "Not Rated"}
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