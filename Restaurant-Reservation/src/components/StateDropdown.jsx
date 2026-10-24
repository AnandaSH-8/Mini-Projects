function StateDropdown({
  states,
  selectedState,
  onStateChange,
  loading,
  error,
}) {
  return (
    <div id="state" className="search-field">
      <label htmlFor="state-select">State</label>

      <select
        id="state-select"
        value={selectedState}
        onChange={(event) => onStateChange(event.target.value)}
        disabled={loading}
        required
      >
        <option value="">
          {loading ? "Loading states..." : "Select State"}
        </option>

        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export default StateDropdown;
