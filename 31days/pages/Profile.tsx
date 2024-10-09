// src/pages/Profile.js
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import styles from "../app/Profile.module.css";

const chapters = [
  { id: 1, content: "Chapter 1 content", isLocked: false },
  { id: 2, content: "Chapter 2 content", isLocked: true },
];

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileTitle}>Your Horror Story</h1>
      <div className={styles.chaptersContainer}>
        {chapters.map((chapter) => (
          <Card
            key={chapter.id}
            className={`${styles.chapterCard} ${
              chapter.isLocked ? styles.locked : ""
            }`}
          >
            <CardHeader>
              <CardTitle>Chapter {chapter.id}</CardTitle>
            </CardHeader>
            <CardContent>
              {chapter.isLocked ? (
                <p className={styles.footer}>Locked</p>
              ) : (
                <p>{chapter.content}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Profile;
