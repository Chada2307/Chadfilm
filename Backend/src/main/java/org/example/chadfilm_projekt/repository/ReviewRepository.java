package org.example.chadfilm_projekt.repository;

import org.example.chadfilm_projekt.model.Movie;
import org.example.chadfilm_projekt.model.Review;
import org.example.chadfilm_projekt.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByMovieMovieId(Integer movieId);
    List<Review> findAllByUserUsername(String username);
    Optional<Review> findByUserAndMovie(User user, Movie movie);
}