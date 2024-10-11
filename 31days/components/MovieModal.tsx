

//@ts-nocheck
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const MovieModal = ({
  open,
  onClose,
  movieInfo,
  onFinished,
  onAlreadySeen,
}) => {
  if (!movieInfo) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <CardTitle>{movieInfo.title}</CardTitle>
        <Image
          src={movieInfo.imageUrl}
          alt={`${movieInfo.title} Poster`}
          className="mb-4 rounded"
        />
        <CardContent>
          <p>{movieInfo.plot}</p>
          <p>
            <strong>Director:</strong> {movieInfo.director}
          </p>
          <p>
            <strong>Release Date:</strong> {movieInfo.releaseDate}
          </p>
        </CardContent>
        <Button onClick={onFinished} className="mr-2">
          Finished
        </Button>
        <Button variant="secondary" onClick={onAlreadySeen}>
          Already Seen
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MovieModal;
