function CityDropdown({
  cities,
  selectedCity,
  onCityChange,
  stateSelected,
  loading,
  error,
}) {
  return (
    <div id="city" className="search-field">
      <label htmlFor="city-select">City</label>

      <select
        id="city-select"
        value={selectedCity}
        onChange={(event) => onCityChange(event.target.value)}
        disabled={!stateSelected || loading}
        required
      >
        <option value="">
          {!stateSelected
            ? "Select a state first"
            : loading
              ? "Loading cities..."
              : "Select City"}
        </option>

        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export default CityDropdown;
