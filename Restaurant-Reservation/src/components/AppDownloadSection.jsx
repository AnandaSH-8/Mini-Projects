import { Smartphone, ArrowRight } from "lucide-react";

function AppDownloadSection() {
  return (
    <section className="app-download-section" id="download-app">
      <div className="app-download-content">
        <p className="section-eyebrow">Dining made simple</p>
        <h2>Your next favourite restaurant is just a few clicks away.</h2>
        <p>
          Discover restaurants, explore new places, and manage your reservations
          from one convenient place.
        </p>
        <a href="/#locations" className="primary-button">
          Explore Restaurants <ArrowRight size={15} />
        </a>
      </div>

      <div className="app-download-visual" aria-hidden="true">
        <Smartphone size={100} strokeWidth={1.2} />
      </div>
    </section>
  );
}

export default AppDownloadSection;
