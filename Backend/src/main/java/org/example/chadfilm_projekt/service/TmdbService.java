package org.example.chadfilm_projekt.service;

import org.example.chadfilm_projekt.dto.tmdb.TmdbMovieResult;
import org.example.chadfilm_projekt.dto.tmdb.TmdbResponse;
import org.example.chadfilm_projekt.model.Movie;
import org.example.chadfilm_projekt.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@Service
public class TmdbService {

    private final MovieRepository movieRepository;
    private final RestTemplate restTemplate;

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.url}")
    private String baseUrl;

    @Value("${tmdb.image-base-url}")
    private String imageBaseUrl;

    public TmdbService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
        this.restTemplate = new RestTemplate();
    }

    @Transactional
    public void importPopularMovies() {

        String url = String.format("%s/movie/popular?api_key=%s&language=pl-PL", baseUrl, apiKey);

        TmdbResponse response = restTemplate.getForObject(url, TmdbResponse.class);

        if (response != null && response.getResults() != null) {
            List<Movie> moviesToSave = new ArrayList<>();

            for (TmdbMovieResult dto : response.getResults()) {
                if (!movieRepository.existsByTmdbId(dto.getTmdbId())) {
                    Movie movie = mapDtoToEntity(dto);
                    moviesToSave.add(movie);
                }
            }
            if (!moviesToSave.isEmpty()) {
                movieRepository.saveAll(moviesToSave);
                System.out.println("Zaimportowano " + moviesToSave.size() + " nowych filmów.");
            } else {
                System.out.println("Brak nowych filmów do zaimportowania.");
            }
        }
    }
    private Movie mapDtoToEntity(TmdbMovieResult dto) {
        Movie movie = new Movie();

        movie.setTmdbId(dto.getTmdbId());
        movie.setTitle(dto.getTitle());
        movie.setOriginalTitle(dto.getTitle());
        movie.setDescription(dto.getOverview());

        if (dto.getPosterPath() != null) {
            movie.setPosterUrl(imageBaseUrl + dto.getPosterPath());
        }

        if (dto.getReleaseDate() != null && !dto.getReleaseDate().isEmpty()) {
            try {
                movie.setReleaseDate(LocalDate.parse(dto.getReleaseDate()));
            } catch (DateTimeParseException e) {
                System.out.println("Nie udało się sparsować daty dla filmu: " + dto.getTitle());
            }
        }

        // Uwaga: Endpoint /popular nie zwraca "DurationMinutes".
        // Do tego potrzebne byłoby oddzielne zapytanie o szczegóły filmu (Details endpoint).
        // Na razie zostawiamy null.

        return movie;
    }
}
