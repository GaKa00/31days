// src/components/Calendar/Calendar.js
import React, { useState } from "react";
import CalendarDates from "./CalendarDates";
import DailyQuiz from "./DailyQuiz";
import { Card } from "@shadcn-ui";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const openQuiz = (date) => {
    setSelectedDate(date);
  };

  const closeQuiz = () => {
    setSelectedDate(null);
  };

  return (
    <div className="container">
      <h1>Monthly Quiz Calendar</h1>
      <Card>
        <Card.Body>
          <CalendarDates openQuiz={openQuiz} />
          {selectedDate && (
            <DailyQuiz date={selectedDate} onClose={closeQuiz} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Calendar;
