package org.example.chadfilm_projekt.service;

import org.example.chadfilm_projekt.dto.tmdb.TmdbMovieResult;
import org.example.chadfilm_projekt.dto.tmdb.TmdbResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class TmdbService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.url}")
    private String baseUrl;

    private final RestTemplate restTemplate;

    public TmdbService() {
        this.restTemplate = new RestTemplate();
    }

    public List<TmdbMovieResult> fetchPopularMovies(){
        String url = baseUrl + "/movie/popular?api_key=" + apiKey + "&language=pl-PL&page=1";

        TmdbResponse response = restTemplate.getForObject(url, TmdbResponse.class);

        if(response != null && response.getResults() != null){
            return response.getResults();
        }
        return new ArrayList<>();

    }
}
