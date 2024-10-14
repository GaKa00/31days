// src/pages/Profile.js
//@ts-nocheck
"use client"; // Add this line to enable client-side rendering in Next.js
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import styles from "../app/Profile.module.css";

const Profile = () => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const response = await fetch("/api/getStory");
      if (response.ok) {
        const data = await response.json();
        setChapters(data);
      } else {
        console.error("Failed to fetch chapters");
      }
    };

    fetchChapters();
  }, []);

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileTitle}>Your Horror Story</h1>
      <div className={styles.chaptersContainer}>
        {chapters.map((chapter) => (
          <Card
            key={chapter.chapterNumber} // Use chapterNumber as key
            className={`${styles.chapterCard} ${
              chapter.isLocked ? styles.locked : ""
            }`}
          >
            <CardHeader>
              <CardTitle>Chapter {chapter.chapterNumber}</CardTitle>
            </CardHeader>
            <CardContent>
              {chapter.isLocked ? (
                <p className={styles.footer}>Locked</p>
              ) : (
                <p>{chapter.text}</p> // Assuming chapter text is stored in 'text'
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Profile;
