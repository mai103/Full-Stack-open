import { useState } from "react";

const PracticalExprience = () => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [responsibility, setResponsibility] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleEdit() {
    setSubmitted(false);
  }

  return (
    <div className="section">
      <h2>Experience</h2>

      {submitted ? (
        <div className="display">
          <p>
            <b>Company:</b> {company}
          </p>
          <p>
            <b>Position:</b> {position}
          </p>
          <p>
            <b>Responsibilities:</b> {responsibility}
          </p>
          <p>
            <b>Date:</b> {dateFrom}
          </p>
          <p>
            <b>Date:</b> {dateTo}
          </p>

          <button onClick={handleEdit}>Edit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          <input
            placeholder="Responsibilities"
            value={responsibility}
            onChange={(e) => setResponsibility(e.target.value)}
          />

          <div className="Date-input">
            <p style={{alignSelf: "flex-start",}}>
              Date:
              </p>
            <input
              placeholder="From"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <input
              placeholder="To"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default PracticalExprience;
