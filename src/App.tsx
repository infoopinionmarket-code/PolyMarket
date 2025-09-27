import React from "react";
import { Routes, Route } from "react-router-dom";
import { Desktop } from "./screens/Desktop/Desktop";
import { EventDetailsPage } from "./screens/EventDetailsPage/EventDetailsPage";
import { CategoryPage } from "./screens/CategoryPage/CategoryPage";
import { TermsPage } from "./screens/TermsPage";
import { PrivacyPage } from "./screens/PrivacyPage";
import { LegalPage } from "./screens/LegalPage";
import { GoogleAnalytics } from "./components/Analytics";
import { ScrollToTop } from "./components/ScrollToTop";

export const App = (): JSX.Element => {
  // Google Analytics Measurement ID - замените на ваш реальный ID
  // Пример: const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

  return (
    <>
      {/* Google Analytics */}
      <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/event/:eventId" element={<EventDetailsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/legal" element={<LegalPage />} />
      </Routes>

      {/* Scroll to top button */}
      <ScrollToTop />
    </>
  );
};
