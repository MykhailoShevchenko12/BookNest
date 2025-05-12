import React, { useState } from "react";
import "./Accordion.css";

export const Accordion = ({ title, answer }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className={`accordion-main ${accordionOpen ? "open" : "closed"}`}>
      <button onClick={() => setAccordionOpen(!accordionOpen)}>
        <span>{title}</span>
        {accordionOpen ? <span>-</span> : <span>+</span>}
      </button>
      <div className={`answer-item ${accordionOpen ? "show" : ""}`}>
        <div className="answer-text">{answer}</div>
      </div>
    </div>
  );
};
