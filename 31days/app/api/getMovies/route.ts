//@ts-nocheck


// app/api/getMovies.ts
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.OMDB_API_KEY;
  const years = ["1980", "1990", "2000", "2010", "2020"]; // Variety across decades
  const pages = [1, 2,]; // Multiple pages for more results
  const moviePromises = [];

  try {
    // Fetch movies from different years and pages for variety
    for (const year of years) {
      for (const page of pages) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=horror&type=movie&y=${year}&page=${page}`);
        const data = await response.json();
        console.log(data);
        
        if (data.Search) {
          // Map to format data, and push to the moviePromises array
          data.Search.forEach((movie) => {
            moviePromises.push(
              fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
                .then((movieDetailsResponse) => movieDetailsResponse.json())
                .then((movieDetails) => ({
                  id: movieDetails.imdbID,
                  title: movieDetails.Title,
                  director: movieDetails.Director,
                  plot: movieDetails.Plot,
                  releaseDate: movieDetails.Released,
                  imageUrl: movieDetails.Poster,
                }))
            );
          });
        }
      }
    }

    // Wait for all movie details to be fetched and then select a random 31 from the results
    const movies = await Promise.all(moviePromises);
    const randomMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 31);

    return NextResponse.json(randomMovies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.error();
  }
}
