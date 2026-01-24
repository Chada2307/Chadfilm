package org.example.chadfilm_projekt.controller;


import org.example.chadfilm_projekt.dto.ReviewDTO;
import org.example.chadfilm_projekt.model.Movie;
import org.example.chadfilm_projekt.model.Review;
import org.example.chadfilm_projekt.model.User;
import org.example.chadfilm_projekt.repository.MovieRepository;
import org.example.chadfilm_projekt.repository.ReviewRepository;
import org.example.chadfilm_projekt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired private ReviewRepository reviewRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private MovieRepository movieRepository;

    @PostMapping("/{movieId}")
    public ResponseEntity<?> addReview(@PathVariable Integer movieId, @RequestBody ReviewDTO dto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();
        Movie movie = movieRepository.findById(movieId).orElseThrow();

        Review review = reviewRepository.findByUserAndMovie(user,movie).orElse(new Review());
        review.setUser(user);
        review.setMovie(movie);
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setCreatedAt(LocalDateTime.now()); // Odśwież datę

        reviewRepository.save(review);

        updateMovieRating(movie);

        return ResponseEntity.ok("ocena zapisana");
    }

    @GetMapping("/movie/{movieId}")
    public List<Review> getReviews(@PathVariable Integer movieId) {
        return reviewRepository.findAllByMovieMovieId(movieId);
    }
    @GetMapping("/user/{username}")
    public List<Review> getUserReviews(@PathVariable String username) {
        return reviewRepository.findAllByUserUsername(username);
    }

    private void updateMovieRating(Movie movie) {
        List<Review> reviews = reviewRepository.findAllByMovieMovieId(movie.getMovieId());
        if (reviews.isEmpty()) {
            movie.setVoteAverage(0.0);
            movie.setVoteCount(0);
        }else{
            double average = reviews.stream()
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0.0);
            double roundedAverage = Math.round(average * 10.0) /10.0;

            movie.setVoteAverage(roundedAverage);
            movie.setVoteCount(reviews.size());
        }
        movieRepository.save(movie);
    }

}
