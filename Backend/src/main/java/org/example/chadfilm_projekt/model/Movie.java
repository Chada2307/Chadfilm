package org.example.chadfilm_projekt.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "Movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MovieID")
    private Integer movieId;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "OriginalTitle")
    private String originalTitle;

    @Column(name = "Description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "ReleaseDate")
    private LocalDate releaseDate;

    @Column(name = "DurationMinutes")
    private Integer durationMinutes;

    @Column(name = "PosterURL")
    private String posterUrl;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "Movie_Genres",
            joinColumns = @JoinColumn(name = "MovieID"),
            inverseJoinColumns = @JoinColumn(name = "GenreID")
    )
    private Set<Genre> genres;

    public Integer getMovieId() {
        return movieId;
    }

    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOriginalTitle() {
        return originalTitle;
    }

    public void setOriginalTitle(String originalTitle) {
        this.originalTitle = originalTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }
}