import { useState } from "react";

export default function CityDropdown({
  cities = [],
  value = "",
  onChange,
  disabled = false,
  loading = false,
  error = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const showOptions = isOpen && !disabled;

  return (
    <div id="city" className="search-field">
      <button
        type="button"
        className="dropdown-trigger"
        disabled={disabled}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {value || "Select City"}
      </button>

      {showOptions && (
        <ul className="dropdown-options">
          {loading && <li>Loading cities...</li>}

          {!loading && error && <li>{error}</li>}

          {!loading &&
            !error &&
            cities.map((city) => (
              <li
                key={city}
                onClick={() => {
                  onChange(city);
                  setIsOpen(false);
                }}
              >
                {city}
              </li>
            ))}

          {!loading && !error && cities.length === 0 && (
            <li>No cities available</li>
          )}
        </ul>
      )}
    </div>
  );
}
