//@ts-nocheck
// src/pages/Calendar.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import MovieModal from "@/components/MovieModal"; // Import the MovieModal component
import styles from "../app/Calendar.module.css";
import { useRouter } from "next/navigation";

const Calendar = () => {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [finishedMovies, setFinishedMovies] = useState([]);
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state


    const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("/api/getMovies"); // Use relative path
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
    // Implement the logic for "Already Seen" if needed
    console.log("Already Seen clicked");
  };

  const handleFinished = async (event) => {
    event.preventDefault();
    // Call the newChapter API
    if (selectedDoor && movieInfo) {
      const response = await fetch("/api/newChapter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
        }),
      });

      if (response.ok) {
        const newChapter = await response.json();
        console.log("New Chapter Created:", newChapter); // Log the new chapter for debugging

        // Optionally, you can update state or show a notification here
      } else {
        console.error("Failed to create a new chapter");
      }
    }

    setFinishedMovies((prev) => [...prev, selectedDoor]);
    setSelectedDoor(null);
  };

    const handleClick = (e) => {
      e.preventDefault();
      // Redirect to /calendar page
      router.push("/Profile");
    };


  return (
    <div className={styles.calendarContainer}>
      <h1 className={styles.calendarTitle}>October Horror Calendar</h1>
      <h3 onClick={handleClick}>Profile</h3>
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