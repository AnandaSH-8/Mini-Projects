import { useState } from "react";

export default function StateDropdown({
  states = [],
  value,
  onChange,
  loading = false,
  error = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="state" className="search-field">
      <button
        type="button"
        className="dropdown-trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        {value || "Select State"}
      </button>

      {isOpen && (
        <ul className="dropdown-options">
          {loading && <li>Loading states...</li>}
          {error && <li>{error}</li>}

          {!loading &&
            !error &&
            states.map((state) => (
              <li
                key={state}
                onClick={() => {
                  console.log("State selected:", state);
                  console.log("onChange type:", typeof onChange);

                  if (typeof onChange !== "function") {
                    console.error(
                      "StateDropdown requires an onChange function",
                    );
                    return;
                  }

                  onChange(state);
                  setIsOpen(false);
                }}
              >
                {state}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
