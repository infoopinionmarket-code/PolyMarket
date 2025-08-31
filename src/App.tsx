import React from "react";
import { Routes, Route } from "react-router-dom";
import { Desktop } from "./screens/Desktop/Desktop";
import { EventDetailsPage } from "./screens/EventDetailsPage/EventDetailsPage";
import { CategoryPage } from "./screens/CategoryPage/CategoryPage";
import { TermsPage } from "./screens/TermsPage";
import { PrivacyPage } from "./screens/PrivacyPage";
import { LegalPage } from "./screens/LegalPage";

export const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Desktop />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route path="/event/:eventId" element={<EventDetailsPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/legal" element={<LegalPage />} />
    </Routes>
  );
};
