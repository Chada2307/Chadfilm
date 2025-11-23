package org.example.chadfilm_projekt.controller;


import org.example.chadfilm_projekt.dto.tmdb.TmdbMovieResult;
import org.example.chadfilm_projekt.service.TmdbService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class ImportController {
    private final TmdbService tmdbService;

    public ImportController(TmdbService tmdbService) {
        this.tmdbService = tmdbService;
    }

    @GetMapping("/test-fetch")
    public List<TmdbMovieResult> testFetch() {
        return tmdbService.fetchPopularMovies();
    }
}
