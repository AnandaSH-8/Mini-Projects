import { useState } from "react";

export default function CityDropdown({
  cities = [],
  value,
  onChange,
  disabled = false,
  loading = false,
  error = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="city" className="search-field">
      <button
        type="button"
        className="dropdown-trigger"
        disabled={disabled}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        {value || "Select City"}
      </button>

      {isOpen && !disabled && (
        <ul className="dropdown-options">
          {loading && <li>Loading cities...</li>}
          {error && <li>{error}</li>}

          {!loading &&
            !error &&
            cities.map((city) => (
              <li
                key={city}
                onClick={() => {
                  console.log("State selected:", city);
                  console.log("onChange type:", typeof onChange);

                  if (typeof onChange !== "function") {
                    console.error(
                      "StateDropdown requires an onChange function",
                    );
                    return;
                  }

                  onChange(city);
                  setIsOpen(false);
                }}
              >
                {city}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
