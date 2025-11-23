package org.example.chadfilm_projekt.dto.tmdb;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class TmdbMovieResult {

    @JsonProperty("id")
    private Long tmdbId;

    @JsonProperty("title")
    private String title;

    @JsonProperty("overview")
    private String overview;

    @JsonProperty("release_date")
    private String releaseDate;

    @JsonProperty("poster_path")
    private String posterPath;

    @JsonProperty("genre_ids")
    private List<Integer> genreIds;

    public Long getTmdbId() {return tmdbId;}
    public void setTmdbId(Long tmdbId) {this.tmdbId = tmdbId;}
    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}
    public String getOverview() {return overview;}
    public void setOverview(String overview) {this.overview = overview;}
    public String getReleaseDate() {return releaseDate;}
    public void setReleaseDate(String releaseDate) {this.releaseDate = releaseDate;}
    public String getPosterPath() {return posterPath;}
    public void setPosterPath(String posterPath) {this.posterPath = posterPath;}
    public List<Integer> getGenreIds() {return genreIds;}
    public void setGenreIds(List<Integer> genreIds) {this.genreIds = genreIds;}
}
