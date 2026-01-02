import { Star, Calendar, Clock } from "lucide-react";
import { Badge } from "./ui/badge"; 
import { Card, CardContent } from "./ui/card"; 

interface MovieCardProps {
  title: string;
  year: string;
  rating: number;
  runtime?: string;
  genre: string;
  imageUrl: string;
  onClick?: () => void;
}

export function MovieCard({ title, year, rating, runtime, genre, imageUrl, onClick }: MovieCardProps) {
  return (
    <Card
      onClick={onClick}
      className="group overflow-hidden border-0 bg-transparent transition-transform hover:scale-105 cursor-pointer"
    >
      <CardContent className="p-0">
        {/* konterner obrazka */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-neutral-800">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* ocena */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-bold text-white">{rating.toFixed(1)}</span>
          </div>

          {/*gatunek  */}
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-yellow-500/90 text-black text-[10px] font-bold tracking-wide shadow-lg">
            {genre}
          </div>

          {/* czas trwaania po najechaniu sie pojawia */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            {runtime && (
              <div className="flex items-center gap-1 text-gray-300 text-xs">
                <Clock className="h-3 w-3 text-yellow-500" />
                <span>{runtime}</span>
              </div>
            )}
          </div>
        </div>

        {/* tytul i rok  */}
        <div className="mt-3 px-1">
          <h3 className="line-clamp-1 text-sm font-medium text-gray-100 group-hover:text-yellow-500 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <Calendar className="h-3 w-3" />
            <span>{year}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}