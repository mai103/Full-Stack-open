import { useState } from "react";

const EducationInfo = () => {
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
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
      <h2>Education</h2>

      {submitted ? (
        <div className="display">
          <p>
            <b>School:</b> {school}
          </p>
          <p>
            <b>Degree:</b> {degree}
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
            placeholder="School Name"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />

          <input
            placeholder="Degree"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
          <div className="Date-input">
            <p>Date</p>
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

export default EducationInfo;
