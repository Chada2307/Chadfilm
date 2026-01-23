import { Star } from "lucide-react";

export function StarRating({ rating, setRating, interactive = true }: {rating: number, setRating?: (r: number) => void, interactive?: boolean}){
    return (
        <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
                <Star
                    key={i}
                    className={`h-5 w-5 cursor-pointer transition-colors ${
                        i < rating ? " fill-yellow-500 text-yellow-500" : "text-gray-600 hover:text-yellow-400"
                    } ${!interactive && "cursor-default"}`}
                    onClick={() => interactive && setRating?.(i+1)}
                />
            ))}
        </div>
    );
}