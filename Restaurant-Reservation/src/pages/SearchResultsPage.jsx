import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

import useStates from "../hooks/useRestData";
import useCities from "../hooks/useCities";
import useRestaurants from "../hooks/useRestaurants";
import useBookings from "../hooks/useBookings";

import StateDropdown from "../components/StateDropdown";
import CityDropdown from "../components/CityDropdown";
import RestaurantCard from "../components/RestaurantCard";
import BookingModal from "../components/BookingModal";
import AppDownloadSection from "../components/AppDownloadSection";

import "../styles/search-results.css";
import "../styles/home-sections.css";

function SearchResultsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const state = searchParams.get("state") || "";
  const city = searchParams.get("city") || "";

  const { states, loadingStates, statesError } = useStates();
  const { cities, loadingCities, citiesError } = useCities(state);

  const {
    restaurants,
    loadingRestaurants,
    restaurantsError,
    searchRestaurants,
  } = useRestaurants();

  const { addBooking } = useBookings();

  const [selectedState, setSelectedState] = useState(state);
  const [selectedCity, setSelectedCity] = useState(city);
  const [bookingRestaurant, setBookingRestaurant] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    function fetch() {
      setSelectedState(state);
      setSelectedCity(city);
    }
    fetch();
  }, [state, city]);

  useEffect(() => {
    async function loadRestaurants() {
      if (!state || !city) {
        setHasSearched(false);
        return;
      }

      setHasSearched(true);
      await searchRestaurants(state, city);
    }

    loadRestaurants();
  }, [state, city, searchRestaurants]);

  function handleStateChange(nextState) {
    setSelectedState(nextState);
    setSelectedCity("");
  }

  function handleSearch(event) {
    event.preventDefault();

    if (!selectedState || !selectedCity) return;

    setSearchParams({
      state: selectedState,
      city: selectedCity,
    });
  }

  function handleConfirmBooking(bookingData) {
    addBooking(bookingData);
    setBookingRestaurant(null);
    navigate("/my-bookings");
  }

  return (
    <>
      <section className="search-page">
        <div className="search-page-banner">
          <p className="search-page-eyebrow">Discover your next dining spot</p>
          <h1>Find Your Restaurant</h1>
          <p>Search restaurants by state and city.</p>

          <form className="results-search-form" onSubmit={handleSearch}>
            <StateDropdown
              states={states}
              value={selectedState}
              onChange={handleStateChange}
              loading={loadingStates}
              error={statesError}
            />

            <CityDropdown
              cities={cities}
              value={selectedCity}
              onChange={setSelectedCity}
              disabled={!selectedState}
              loading={loadingCities}
              error={citiesError}
            />

            <button
              type="submit"
              id="searchBtn"
              className="primary-button"
              disabled={!selectedState || !selectedCity}
            >
              <Search size={14} />
              Search
            </button>
          </form>
        </div>

        <div className="search-results-container">
          {hasSearched && (
            <h1 className="results-count">
              {loadingRestaurants
                ? "Loading restaurants..."
                : `${restaurants.length} restaurants available in ${city}`}
            </h1>
          )}

          {loadingRestaurants && (
            <p className="results-message" role="status">
              Loading restaurants. The service may take a moment to respond.
            </p>
          )}

          {!loadingRestaurants && restaurantsError && (
            <p className="results-error" role="alert">
              {restaurantsError}
            </p>
          )}

          {!hasSearched && (
            <p className="results-message">
              Select a state and city above to find restaurants.
            </p>
          )}

          {!loadingRestaurants &&
            !restaurantsError &&
            hasSearched &&
            restaurants.length === 0 && (
              <p className="results-message">
                No restaurants found in {city}. Try another location.
              </p>
            )}

          {!loadingRestaurants && !restaurantsError && (
            <div className="restaurant-results-grid">
              {restaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={`${restaurant.restaurantName}-${index}`}
                  restaurant={restaurant}
                  onBook={setBookingRestaurant}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <AppDownloadSection />

      {bookingRestaurant && (
        <BookingModal
          restaurant={bookingRestaurant}
          onClose={() => setBookingRestaurant(null)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </>
  );
}

export default SearchResultsPage;
