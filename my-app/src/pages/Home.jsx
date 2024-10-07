// src/pages/Home.js
import React from "react";
import { Button, Card } from "shadcn-ui";

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      <Card>
        <Card.Header>
          <h2>Latest Updates</h2>
        </Card.Header>
        <Card.Body>
          <p>This is where you can showcase recent updates or announcements.</p>
          <Button onClick={() => alert("Button clicked!")}>Learn More</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
