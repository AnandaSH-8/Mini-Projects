import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  MapPin,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import useRestData from "../hooks/useRestData";
import useCities from "../hooks/useCities";
import StateDropdown from "../components/StateDropdown";
import CityDropdown from "../components/CityDropdown";
import SectionHeading from "../components/SectionHeading";
import AppDownloadSection from "../components/AppDownloadSection";

import "../styles/landing-page.css";
import "../styles/home-sections.css";

const categories = [
  {
    title: "Restaurants",
    description: "Find a place for your next meal.",
    image: "photo-1517248135467-4c7edcad34c4",
  },
  {
    title: "Locations",
    description: "Discover dining around your city.",
    image: "photo-1514933651103-005eec06c04b",
  },
  {
    title: "Reservations",
    description: "Plan ahead and reserve your table.",
    image: "photo-1414235077428-338989a2e8c0",
  },
];

const foodSlides = [
  {
    title: "Discover something delicious",
    description:
      "Explore dining spaces for casual meals, special occasions, and everything in between.",
    image: "photo-1414235077428-338989a2e8c0",
  },
  {
    title: "Make your next meal special",
    description:
      "Find a restaurant that suits your plans and book your table in a few simple steps.",
    image: "photo-1517248135467-4c7edcad34c4",
  },
  {
    title: "Your city, your next favourite place",
    description:
      "Browse restaurants by state and city to find somewhere new to enjoy.",
    image: "photo-1514933651103-005eec06c04b",
  },
];

const newsItems = [
  {
    title: "How to choose the right restaurant",
    description:
      "Consider the occasion, location, menu, and atmosphere before choosing your next dining spot.",
    image: "photo-1517248135467-4c7edcad34c4",
  },
  {
    title: "Make dining out stress-free",
    description:
      "Planning ahead can make your dining experience smoother, especially during busy hours.",
    image: "photo-1414235077428-338989a2e8c0",
  },
  {
    title: "Explore your local food scene",
    description:
      "Try a new neighbourhood and discover restaurants you might otherwise miss.",
    image: "photo-1514933651103-005eec06c04b",
  },
];

function photoUrl(id, width = 700) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
}

function LandingPage() {
  const navigate = useNavigate();
  const { states, loadingStates, statesError } = useRestData();

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const { cities, loadingCities, citiesError } = useCities(selectedState);

  function handleStateChange(state) {
    setSelectedState(state);
    setSelectedCity("");
  }

  function handleSearch(event) {
    event.preventDefault();

    if (!selectedState || !selectedCity) return;

    const params = new URLSearchParams({
      state: selectedState,
      city: selectedCity,
    });

    navigate(`/search?${params.toString()}`);
  }

  function goToSearch() {
    document.getElementById("restaurant-search")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">Skip the wait! Reserve online</p>
            <h1>
              Table <span>Reservation</span>
            </h1>
            <p className="hero-description">
              Discover restaurants, explore dining options, and reserve your
              next table with ease.
            </p>
            <button
              type="button"
              className="primary-button"
              onClick={goToSearch}
            >
              Find Restaurants <ArrowRight size={14} />
            </button>
          </div>

          <div className="hero-illustration">
            <img
              src={photoUrl("photo-1517248135467-4c7edcad34c4", 900)}
              alt="Comfortable restaurant dining area"
            />
          </div>
        </div>

        <div className="restaurant-search-panel" id="restaurant-search">
          <div className="search-panel-heading">
            <h2>Find the perfect restaurant</h2>
            <p>Select your location to explore available restaurants.</p>
          </div>

          <form className="restaurant-search-form" onSubmit={handleSearch}>
            <StateDropdown
              states={states}
              selectedState={selectedState}
              onStateChange={handleStateChange}
              loading={loadingStates}
              error={statesError}
            />

            <CityDropdown
              cities={cities}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              stateSelected={Boolean(selectedState)}
              loading={loadingCities}
              error={citiesError}
            />

            <button
              type="submit"
              id="searchBtn"
              className="primary-button search-button"
              disabled={!selectedState || !selectedCity}
            >
              <Search size={14} />
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="content-section" id="locations">
        <SectionHeading
          eyebrow="Explore with us"
          title="Find your next dining experience"
          description="Browse locations and discover dining options for your next outing."
        />

        <div className="feature-grid">
          {categories.map((category) => (
            <article className="feature-card" key={category.title}>
              <img
                src={photoUrl(category.image)}
                alt={category.title}
                loading="lazy"
              />
              <div className="feature-card-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <button
                  className="text-link-button"
                  type="button"
                  onClick={goToSearch}
                >
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="food-carousel-section" id="special-menus">
        <div className="food-carousel-inner">
          <SectionHeading
            eyebrow="A taste of discovery"
            title="Good food starts with a great place"
            description="Explore dining options and make plans for your next meal."
          />

          <Swiper
            className="food-carousel"
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            loop
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
          >
            {foodSlides.map((slide) => (
              <SwiperSlide key={slide.title}>
                <article className="food-slide">
                  <img
                    src={photoUrl(slide.image, 1200)}
                    alt=""
                    loading="lazy"
                  />
                  <div className="food-slide-copy">
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                    <button
                      type="button"
                      className="primary-button"
                      onClick={goToSearch}
                    >
                      Find Restaurants <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="content-section" id="services">
        <SectionHeading
          eyebrow="Latest from our guide"
          title="Dining tips and inspiration"
          description="Helpful ideas to make your next restaurant visit more enjoyable."
        />

        <div className="feature-grid">
          {newsItems.map((item) => (
            <article className="feature-card news-card" key={item.title}>
              <img src={photoUrl(item.image)} alt="" loading="lazy" />
              <div className="feature-card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="booking-info content-section" id="reservations">
        <SectionHeading
          eyebrow="How it works"
          title="Reserve your table in three steps"
          description="From discovery to confirmation, keep your dining plans organised."
        />

        <div className="booking-info-grid">
          <article className="booking-info-item">
            <span>
              <MapPin size={21} />
            </span>
            <h3>1. Choose a location</h3>
            <p>
              Select a state and city to find restaurants in your preferred
              area.
            </p>
          </article>

          <article className="booking-info-item">
            <span>
              <CalendarCheck size={21} />
            </span>
            <h3>2. Pick a date and time</h3>
            <p>
              Choose from the dates and time slots presented in the booking
              form.
            </p>
          </article>

          <article className="booking-info-item">
            <span>
              <ShieldCheck size={21} />
            </span>
            <h3>3. Manage your booking</h3>
            <p>Review saved reservations from your My Bookings page.</p>
          </article>
        </div>
      </section>

      <section className="content-section" id="faq">
        <SectionHeading
          eyebrow="Need help?"
          title="Frequently asked questions"
        />

        <div className="faq-list">
          <details className="faq-item">
            <summary>How do I find restaurants?</summary>
            <p>
              Select a state and city on the homepage and press Search to view
              matching restaurants.
            </p>
          </details>

          <details className="faq-item">
            <summary>How do I make a reservation?</summary>
            <p>
              Choose a restaurant, select a date and available time option, then
              confirm the booking in the form.
            </p>
          </details>

          <details className="faq-item">
            <summary>Where can I view my reservations?</summary>
            <p>
              Open My Bookings from the navigation bar to search and manage the
              bookings saved in your browser.
            </p>
          </details>

          <details className="faq-item">
            <summary>Will my bookings appear on another device?</summary>
            <p>
              Not currently. Reservations are saved in this browser's local
              storage and are not synchronised to a server.
            </p>
          </details>
        </div>
      </section>

      <AppDownloadSection />
    </>
  );
}

export default LandingPage;
