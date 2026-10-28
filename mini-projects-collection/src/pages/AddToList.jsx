import { useState } from "react";
import styles from "../styles/addtoList.module.css";

function AddItemsToList() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  const handleAddItem = (event) => {
    event.preventDefault();

    const trimmedItem = item.trim();

    if (!trimmedItem) return;

    setItems((prevItems) => [
      ...prevItems,
      {
        id: crypto.randomUUID(),
        text: trimmedItem,
      },
    ]);

    setItem("");
  };

  const handleRemoveItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.heading}>Add Items to List</h1>

        <form className={styles.form} onSubmit={handleAddItem}>
          <input
            type="text"
            name="item"
            placeholder="Type something and press Enter"
            value={item}
            onChange={(event) => setItem(event.target.value)}
            className={styles.input}
          />

          <button type="submit" className={styles.addButton}>
            Add
          </button>
        </form>

        {items.length === 0 ? (
          <p className={styles.emptyMessage}>
            No items yet. Add your first one!
          </p>
        ) : (
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.listItem}>
                <span className={styles.itemText}>{item.text}</span>

                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label={`Remove ${item.text}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default AddItemsToList;
