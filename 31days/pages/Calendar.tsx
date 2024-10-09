//@ts-nocheck
// src/pages/Calendar.tsx
"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import styles from "../app/Calendar.module.css";

const Calendar = () => {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [movieInfo, setMovieInfo] = useState(null);
  const [finishedMovies, setFinishedMovies] = useState([]);

  const openDoor = (day) => {
    if (day <= new Date().getDate()) {
      setSelectedDoor(day);
      fetchMovie(day);
    }
  };

  const fetchMovie = (day) => {
    const newMovie = {
      title: `Movie Title for Day ${day}`,
      description: "Movie Description",
      posterUrl: "/path-to-movie-poster.jpg",
    };
    setMovieInfo(newMovie);
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

      {selectedDoor && movieInfo && (
        <Dialog open={true} onOpenChange={() => setSelectedDoor(null)}>
          <DialogContent className={styles.modal}>
            <CardTitle>{movieInfo.title}</CardTitle>
            <img
              src={movieInfo.posterUrl}
              alt={`${movieInfo.title} Poster`}
              className="mb-4 rounded"
            />
            <CardContent>{movieInfo.description}</CardContent>
            <Button onClick={handleFinished} className="mr-2">
              Finished
            </Button>
            <Button variant="secondary" onClick={handleAlreadySeen}>
              Already Seen
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Calendar;
