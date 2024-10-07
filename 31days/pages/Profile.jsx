// src/pages/Profile.js
import React from "react";
import { Avatar, Card } from "@shadcn/ui";

const Profile = () => {
  return (
    <div className="container">
      <h1>User Profile</h1>
      <Card>
        <Card.Body>
          <Avatar src="https://via.placeholder.com/150" alt="User avatar" />
          <h2>Username</h2>
          <p>Email: user@example.com</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
