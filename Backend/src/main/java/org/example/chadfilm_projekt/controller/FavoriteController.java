package org.example.chadfilm_projekt.controller;


import org.example.chadfilm_projekt.model.Movie;
import org.example.chadfilm_projekt.model.User;
import org.example.chadfilm_projekt.repository.MovieRepository;
import org.example.chadfilm_projekt.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final UserRepository userRepository;
    private final MovieRepository movieRepository;


    public FavoriteController(UserRepository userRepository, MovieRepository movieRepository){
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }

    private User getLoggedUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("user not found"));
    }

    @GetMapping
    public ResponseEntity<Set<Movie>> getFavorites(){
        User user = getLoggedUser();
        return ResponseEntity.ok(user.getFavorites());
    }

    @PostMapping("/{movieId}")
    public ResponseEntity<?> addFavorite(@PathVariable Integer movieId){
        User user = getLoggedUser();
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        user.addFavorite(movie);
        userRepository.save(user);
        return ResponseEntity.ok("Usunięto z ulubionych");
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<?> removeFavorite(@PathVariable Integer movieId){
        User user = getLoggedUser();
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("movie not found"));

        user.removeFavorite(movie);
        userRepository.save(user);
        return ResponseEntity.ok("usunieto z ulubionych");
    }

    @GetMapping("/check/{movieId}")
    public ResponseEntity<Boolean> isFavorite(@PathVariable Integer movieId){
        User user = getLoggedUser();
        boolean exists = user.getFavorites().stream()
                .anyMatch(m -> m.getMovieId().equals(movieId));
        return ResponseEntity.ok(exists);
    }
}
