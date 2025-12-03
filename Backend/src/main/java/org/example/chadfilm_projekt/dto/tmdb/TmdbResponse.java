package org.example.chadfilm_projekt.dto.tmdb;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class TmdbResponse {

    @JsonProperty("results")
    private List<TmdbMovieResult> results;

    public List<TmdbMovieResult> getResults() {
        return results;
    }

    public void setResults(List<TmdbMovieResult> results) {
        this.results = results;
    }
}
