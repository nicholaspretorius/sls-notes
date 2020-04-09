import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";

export default function Home(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function renderNotesList() {
    return null;
  }

  function renderLanding() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
      </div>
    );
  }

  return <div className="Home">{props.isAuthenticated ? renderNotes() : renderLanding()}</div>;
}
