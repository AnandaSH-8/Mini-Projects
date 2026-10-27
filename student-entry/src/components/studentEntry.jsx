import { useState } from "react";
import "../styles/studentEntry.css";

export function StudentEntry() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [students, setStudents] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !age || !grade) {
      return;
    }

    const newStudent = {
      id: crypto.randomUUID(),
      name: name.trim(),
      age,
      grade,
    };

    setStudents((prevStudents) => [...prevStudents, newStudent]);

    handleClear();
  };

  const handleClear = () => {
    setName("");
    setAge("");
    setGrade("");
  };

  const handleRemove = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id),
    );
  };

  return (
    <main className="page-container">
      <section className="student-card">
        <header className="card-header">
          <h1>Student Entry Form</h1>
          <p>Add students and review the list below.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. MS Dhoni"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                placeholder="e.g. 14"
                min="1"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="grade">Grade</label>
              <select
                id="grade"
                name="grade"
                value={grade}
                onChange={(event) => setGrade(event.target.value)}
                required
              >
                <option value="">Select grade</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="add-button">
              Add Student
            </button>

            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>

        <section className="student-list">
          {students.length === 0 ? (
            <p className="empty-message">No students added yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Grade</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.grade}</td>
                    <td>
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => handleRemove(student.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </section>
    </main>
  );
}
