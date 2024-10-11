// app/api/newChapter.ts

import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import clientPromise from "../../../lib/mongodb";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export async function POST(req: Request) {
  const { movieTitle } = await req.json();

  // Connect to MongoDB
  const client = await clientPromise;
  const db = client.db("horrorCalendar");
  const storyCollection = db.collection("story");

  // Get the most recent chapter
  const lastChapter = await storyCollection
    .find()
    .sort({ chapterNumber: -1 })
    .limit(1)
    .toArray();
  const previousChapterText =
    lastChapter[0]?.text || "This is the beginning of a chilling tale...";
  const nextChapterNumber = (lastChapter[0]?.chapterNumber || 0) + 1;

  const prompt = `
  You are writing Chapter ${nextChapterNumber} of a 31-chapter horror story inspired by the movie "${movieTitle}". The story is building towards a final climax, which will only occur in Chapter 31. This chapter should be around 2000 words, and it should continue from the previous chapter:

  Previous Chapter:
  "${previousChapterText}"

  In this chapter, develop the suspense further, adding new horror elements, and leave some loose ends for the next chapters. The story should be eerie, mysterious, and unsettling, as it leads up to the ultimate horror in the final chapter.
  `;

  const aiResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 4000,
  });

  const newChapterText = aiResponse.data.choices[0].text?.trim();

  const newChapter = {
    chapterNumber: nextChapterNumber,
    movieTitle,
    text: newChapterText,
    createdAt: new Date(),
  };

  // Save the new chapter in MongoDB
  await storyCollection.insertOne(newChapter);

  return NextResponse.json(newChapter);
}
