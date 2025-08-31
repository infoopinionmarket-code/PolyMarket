import React from "react";
import { useState } from "react";
import { MainContentSection } from "./sections/MainContentSection";
import { QuestionCardSection } from "./sections/QuestionCardSection/QuestionCardSection";
import { StatisticsSection } from "./sections/StatisticsSection";

export const Desktop = (): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="bg-[#3d3d3d] flex flex-col items-center w-full">
      <div className="bg-[#3d3d3d] w-full">
        <MainContentSection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <QuestionCardSection activeCategory={activeCategory} showMainCard={true} />
        <StatisticsSection />
      </div>
    </div>
  );
};
