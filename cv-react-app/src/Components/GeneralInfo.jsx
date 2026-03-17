import { useState } from "react";

const GeneralInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
      <h2>General Information</h2>

      {submitted ? (
        <div className="display">
          <p>
            <b>Name:</b> {firstName} {lastName}
          </p>
          <p>
            <b>Email:</b> {email}
          </p>
          <p>
            <b>Phone:</b> {phone}
          </p>

          <button onClick={handleEdit}>Edit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default GeneralInfo;
