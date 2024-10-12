//@ts-nocheck

// app/api/getMovies.ts
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY;
  const years = ["1980", "2000", "2020"]; // Just a few decades
  const movies = [];

  try {
    // Fetch movies by year with fewer requests
    for (const year of years) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=27&primary_release_year=${year}&page=1`
      );
      const data = await response.json();
      

      if (data.results) {
        // Randomly select a few movies to get more details
        const randomSelections = data.results
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);

        for (const movie of randomSelections) {
          const movieDetailsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US&append_to_response=credits`
          );
          const movieDetails = await movieDetailsResponse.json();

          movies.push({
            id: movieDetails.id,
            title: movieDetails.title,
            director: movieDetails.credits?.crew.find(
              (crewMember) => crewMember.job === "Director"
            )?.name,
            plot: movieDetails.overview,
            releaseDate: movieDetails.release_date,
            imageUrl: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
          });

          if (movies.length >= 31) break;
        }
      }

      if (movies.length >= 31) break;
    }

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.error();
  }
}
