// src/components/Calendar/CalendarDates.js
import React from "react";
import { Button } from "shadcn-ui";

const CalendarDates = ({ openQuiz }) => {
  return (
    <div className="grid grid-cols-7 gap-4">
      {[...Array(31)].map((_, index) => {
        const day = index + 1;
        return (
          <Button
            key={day}
            style={{ minWidth: "50px", minHeight: "50px" }}
            onClick={() => openQuiz(day)}
          >
            {day}
          </Button>
        );
      })}
    </div>
  );
};

export default CalendarDates;
