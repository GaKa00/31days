// app/api/getStory.ts

import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("horrorCalendar");
  const storyCollection = db.collection("story");

  try {
    const chapters = await storyCollection
      .find()
      .sort({ chapterNumber: 1 })
      .toArray();
    return NextResponse.json(chapters);
  } catch (error) {
    console.error("Error fetching story chapters:", error);
    return NextResponse.error();
  }
}
