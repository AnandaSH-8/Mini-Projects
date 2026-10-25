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

  const urlState = searchParams.get("state") || "";
  const urlCity = searchParams.get("city") || "";

  const [selectedState, setSelectedState] = useState(urlState);
  const [selectedCity, setSelectedCity] = useState(urlCity);

  const { states, loadingStates, statesError } = useStates();

  const { cities, loadingCities, citiesError } = useCities(selectedState);

  const {
    restaurants,
    loadingRestaurants,
    restaurantsError,
    searchRestaurants,
  } = useRestaurants();

  const { addBooking } = useBookings();

  const [bookingRestaurant, setBookingRestaurant] = useState(null);

  const hasSearched = Boolean(urlState && urlCity);

  function handleStateChange(nextState) {
    setSelectedState(nextState);
    setSelectedCity("");
  }

  function handleCityChange(nextCity) {
    setSelectedCity(nextCity);
  }

  function handleSearch(event) {
    event.preventDefault();

    if (!selectedState || !selectedCity) return;

    if (selectedState === urlState && selectedCity === urlCity) {
      searchRestaurants(selectedState, selectedCity);
      return;
    }

    setSearchParams({
      state: selectedState,
      city: selectedCity,
    });
  }

  useEffect(() => {
    if (!urlState || !urlCity) return;

    searchRestaurants(urlState, urlCity);
  }, [urlState, urlCity, searchRestaurants]);

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
              onChange={handleCityChange}
              disabled={!selectedState}
              loading={loadingCities}
              error={citiesError}
            />

            <button
              type="submit"
              id="searchBtn"
              className="primary-button"
              disabled={!selectedState || !selectedCity || loadingCities}
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
                : `${restaurants.length} restaurants available in ${urlCity}`}
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
                No restaurants found in {urlCity}. Try another location.
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
