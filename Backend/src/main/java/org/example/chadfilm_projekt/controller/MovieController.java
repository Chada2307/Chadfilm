package org.example.chadfilm_projekt.controller;


import org.apache.coyote.Response;
import org.example.chadfilm_projekt.dto.tmdb.TmdbMovieResult;
import org.example.chadfilm_projekt.model.Movie;
import org.example.chadfilm_projekt.repository.MovieRepository;
import org.example.chadfilm_projekt.service.TmdbService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {
    private final TmdbService tmdbService;
    private final MovieRepository movieRepository;

    public MovieController(TmdbService tmdbService, MovieRepository movieRepository)
    {
        this.tmdbService = tmdbService;
        this.movieRepository = movieRepository;
    }

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies(){
        return ResponseEntity.ok(movieRepository.findAll());
    }
    
    @PostMapping("/import")
    public ResponseEntity<String> importMovies() {
        tmdbService.importPopularMovies();
        return ResponseEntity.ok("zaimporotwalim filmy");
    }
}
