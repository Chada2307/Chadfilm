package org.example.chadfilm_projekt.repository;

import org.example.chadfilm_projekt.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    boolean existsByTmdbId(Long tmdbId);
}