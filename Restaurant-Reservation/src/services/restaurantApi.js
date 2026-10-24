const BASE_URL = "https://restaurantdata.onrender.com";

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export function fetchStates() {
  return fetchJson(`${BASE_URL}/states`);
}

export function fetchCities(state) {
  return fetchJson(`${BASE_URL}/cities/${encodeURIComponent(state)}`);
}

export function fetchRestaurants(state, city) {
  const params = new URLSearchParams({ state, city });

  return fetchJson(`${BASE_URL}/restaurants?${params.toString()}`);
}
