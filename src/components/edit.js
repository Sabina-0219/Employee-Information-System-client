import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
    records: [],
  });

  const params = useParams();
  const navigate = useNavigate();

  // Fetch the record with the specific id from the database.
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();

      const response = await fetch(
        `http://localhost:5050/record/${id}`
      );
      
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();
  }, [params.id, navigate]);

  // Update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      position: form.position,
      level: form.level,
    };

    // Send a post request to update the data in the database.
    await fetch(`http://localhost:5050/record/${params.id.toString()}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    navigate("/");
  }

  // Display the form that takes input from the user to update the data.
  return (
    <div className="container">
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="position" className="form-label">
            Position:
          </label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Level:</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionIntern"
              value="Intern"
              checked={form.level === "Intern"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionIntern" className="form-check-label">
              Intern
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionJunior"
              value="Junior"
              checked={form.level === "Junior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionJunior" className="form-check-label">
              Junior
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionSenior"
              value="Senior"
              checked={form.level === "Senior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="positionSenior" className="form-check-label">
              Senior
            </label>
          </div>
        </div>
        <br />

        <div className="mb-3">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
