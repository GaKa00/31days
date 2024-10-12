//@ts-nocheck
// src/pages/Calendar.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import MovieModal from "@/components/MovieModal"; // Import the MovieModal component
import styles from "../app/Calendar.module.css";

const Calendar = () => {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [finishedMovies, setFinishedMovies] = useState([]);
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("http://localhost:3000/api/getMovies");
      const data = await response.json();
      console.log("API Response:", data); // Check API response data
      setMovies(data);
      setLoading(false); // Set loading to false once movies are fetched
    };

    fetchMovies();
    console.log("Movies fetched successfully");
  }, []);

  const openDoor = (day) => {
    if (!loading && day <= new Date().getDate()) {
      setSelectedDoor(day);
      setMovieInfo(movies[day - 1]);
      console.log("Selected Movie:", movies[day - 1]); // Log to check if the correct movie is being set
    }
  };

  const handleAlreadySeen = () => {
    fetchMovie(selectedDoor);
  };

  const handleFinished = () => {
    setFinishedMovies([...finishedMovies, selectedDoor]);
    setSelectedDoor(null);
  };

  return (
    <div className={styles.calendarContainer}>
      <h1 className={styles.calendarTitle}>October Horror Calendar</h1>
      <div className={styles.doorsContainer}>
        {[...Array(31).keys()].map((day) => (
          <Card
            key={day}
            className={`${styles.door} ${
              finishedMovies.includes(day + 1) ? styles["door-open"] : ""
            }`}
          >
            <CardHeader onClick={() => openDoor(day + 1)}>
              <CardTitle>Day {day + 1}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      {selectedDoor && (
        <MovieModal
          open={true}
          onClose={() => setSelectedDoor(null)}
          movieInfo={movieInfo}
          onFinished={handleFinished}
          onAlreadySeen={handleAlreadySeen}
        />
      )}
    </div>
  );
};

export default Calendar;
