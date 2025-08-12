package dev.app.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Movie> findAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        for (Movie movie : movies) {
            List<Review> reviews = reviewRepository.findAllById(movie.getReviewIds());
            movie.setReviews(reviews);
        }
        return movies;
    }

    public Optional<Movie> findMovieByImdbId(String imdbId) {
        Optional<Movie> movieOpt = movieRepository.findMovieByImdbId(imdbId);
        if (movieOpt.isPresent()) {
            Movie movie = movieOpt.get();
            List<Review> reviews = reviewRepository.findAllById(movie.getReviewIds());
            movie.setReviews(reviews);
            return Optional.of(movie);
        }
        return Optional.empty();
    }
}
