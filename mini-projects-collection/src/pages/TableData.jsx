import { useState } from "react";
import styles from "../styles/tableData.module.css";

function TableData() {
  const [place, setPlace] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [people, setPeople] = useState([]);

  const handleAdd = (event) => {
    event.preventDefault();

    const trimmedPlace = place.trim();
    const trimmedName = name.trim();
    const trimmedAge = age.trim();

    if (!trimmedPlace || !trimmedName || !trimmedAge) {
      return;
    }

    const newPerson = {
      id: crypto.randomUUID(),
      place: trimmedPlace,
      name: trimmedName,
      age: trimmedAge,
    };

    setPeople((previousPeople) => [...previousPeople, newPerson]);

    handleClear();
  };

  const handleClear = () => {
    setPlace("");
    setName("");
    setAge("");
  };

  const handleRemove = (id) => {
    setPeople((previousPeople) =>
      previousPeople.filter((person) => person.id !== id),
    );
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1>Add People to Table</h1>
          <p>Enter Place, Name, and Age, then click Add.</p>
        </header>

        <form onSubmit={handleAdd}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="place">Place</label>
              <input
                id="place"
                type="text"
                name="place"
                placeholder="e.g. Mumbai"
                value={place}
                onChange={(event) => setPlace(event.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g. Akash"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                name="age"
                placeholder="e.g. 24"
                min="1"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.addButton}>
              Add
            </button>

            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>

        <div className={styles.tableContainer}>
          {people.length === 0 ? (
            <p className={styles.emptyMessage}>
              No entries yet. Add your first row!
            </p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {people.map((person) => (
                  <tr key={person.id}>
                    <td>{person.place}</td>
                    <td>{person.name}</td>
                    <td>{person.age}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => handleRemove(person.id)}
                        aria-label={`Remove ${person.name}`}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}

export default TableData;
