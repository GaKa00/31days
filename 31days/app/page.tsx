// src/pages/Home.js
import React from "react";

import { Card, CardContent, CardHeader } from "../components/ui/card";
import styles from "./Home.module.css";

const Home = () => {


  

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>31 Days</h1>
      <Card className={styles.spookyCard}>
        <CardHeader>
          <h2 className={styles.cardTitle}>Welcome to Your Horror Journey</h2>
        </CardHeader>
        <CardContent>
          <p>
            Each day, watch a chilling horror movie and complete the quiz
            afterward to unlock a chapter of your very own horror story.
          </p>
          <p>
            Are you brave enough to face the terrors that await? Let&apos;s find
            out!
          </p>
          <form  className={styles.nameForm}>
            <input
              type="text"
              placeholder="Enter your name"

              className={styles.nameInput}
              required // Ensure input is filled
            />
            <button type="submit" className={styles.submitButton}>
              Start
            </button>
          </form>
        </CardContent>
      </Card>
      <div className={styles.footer}>
        <p>Prepare for a month filled with suspense, fright, and creativity!</p>
      </div>
    </div>
  );
};

export default Home;
