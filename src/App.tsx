import React from "react";
import { Routes, Route } from "react-router-dom";
import { Desktop } from "./screens/Desktop/Desktop";
import { EventDetailsPage } from "./screens/EventDetailsPage/EventDetailsPage";
import { CategoryPage } from "./screens/CategoryPage/CategoryPage";

export const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Desktop />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route path="/event/:eventId" element={<EventDetailsPage />} />
    </Routes>
  );
};
