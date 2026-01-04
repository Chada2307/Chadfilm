package org.example.chadfilm_projekt.controller;

import org.apache.coyote.Response;
import org.example.chadfilm_projekt.dto.tmdb.TmdbMovieResult;
import org.example.chadfilm_projekt.model.Movie;
import org.example.chadfilm_projekt.repository.MovieRepository;
import org.example.chadfilm_projekt.service.TmdbService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<Movie>> getAllMovies(@RequestParam(required = false) String query) {
        if (query != null && !query.isBlank()) {
            return ResponseEntity.ok(movieRepository.findAllByTitleContainingIgnoreCase(query));
        }
        return ResponseEntity.ok(movieRepository.findAll());
    }
    //na windowsie nie wiem czemu musialem zmienic na GetMapping??
    @PostMapping("/import")
    public ResponseEntity<String> importMovies(@RequestParam(defaultValue = "1") int pages) {
        tmdbService.importPopularMovies(pages);
        return ResponseEntity.ok("zaimporotwalim filmy na " + (pages * 20) + " tytulow");
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<Object> getDetails(@PathVariable Integer id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("nie znaleziono filmu"));
        return ResponseEntity.ok(tmdbService.getMovieDetails(movie.getTmdbId()));
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<Movie>> getMoviesPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size
    ){
        return ResponseEntity.ok(movieRepository.findAll(
                PageRequest.of(page, size, Sort.by("title").ascending())
        ));
    }


}
