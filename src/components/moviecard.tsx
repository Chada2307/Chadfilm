import { Star, Calendar, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MovieCardProps {
  title: string;
  year: string;
  rating: number;
  runtime?: string;
  genre: string;
  imageUrl: string;
}

export function MovieCard({ title, year, rating, runtime, genre, imageUrl }: MovieCardProps) {
  return (
    <Card className="group overflow-hidden border-0 bg-transparent transition-transform hover:scale-105">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs text-white">{rating.toFixed(1)}</span>
          </div>

          {/* Genre Badge */}
          <Badge className="absolute top-3 left-3 rounded-full bg-black/70 text-white px-3 py-1 text-[11px] font-semibold tracking-wide shadow-lg ring-1 ring-white/60  backdrop-blur-sm">
            {genre}
          </Badge>

          {/* Info on Hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
            {runtime && (
              <div className="flex items-center gap-1 text-white/80 text-xs mb-2">
                <Clock className="h-3 w-3" />
                <span>{runtime}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Title and Year */}
        <div className="mt-3 px-1">
          <h3 className="line-clamp-1 text-sm">{title}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3" />
            <span>{year}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
