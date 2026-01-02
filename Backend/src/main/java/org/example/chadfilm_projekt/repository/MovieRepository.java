package org.example.chadfilm_projekt.repository;

import org.example.chadfilm_projekt.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    boolean existsByTmdbId(Long tmdbId);
    List<Movie> findAllByTitleContainingIgnoreCase(String title);
}