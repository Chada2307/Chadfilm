import { Play, Plus, Star, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Hero() {
  return (
    <div className="relative h-[800px] w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://m.media-amazon.com/images/S/pv-target-images/ff6bfe1f03b54690c9ac93f940443d921a9446787b09dc23cb834139008d9aff.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative h-full flex items-center">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">
              Featured
            </Badge>
            <Badge variant="outline" className="rounded-full bg-black/70 text-white tracking-wide shadow-lg ring-1 ring-white/10  backdrop-blur-sm">2004</Badge>
            <Badge variant="outline" className="rounded-full bg-black/70 text-white tracking-wide shadow-lg ring-1 ring-white/10  backdrop-blur-sm">Drama</Badge>
          </div>

          <h1 className="text-5xl md:text-7xl mb-4 text-white">
            House
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
              <span className="text-white">10</span>
              <span className="text-white/60 text-sm">/10</span>
            </div>
            <span className="text-white/60">•</span>
            <span className="text-white/80">117 episodes</span>
            <span className="text-white/60">•</span>
            <span className="text-white/80">PG-13</span>
          </div>

          <p className="text-lg text-white/90 mb-8 max-w-xl">
            Dr. Gregory House, a drug-addicted, unconventional, misanthropic medical genius, leads a team of diagnosticians at the fictional Princeton–Plainsboro Teaching Hospital in New Jersey.  
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="gap-2 bg-[#f5c518] text-black hover:bg-[#e5b50f] border border-[#f5c518] shadow-md">
              <Play className="h-5 w-5" />
              Watch Trailer
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
              <Info className="h-5 w-5" />
              More Info
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
              <Plus className="h-5 w-5" />
              My List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
