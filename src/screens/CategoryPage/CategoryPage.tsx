import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MainContentSection } from "../Desktop/sections/MainContentSection";
import { StatisticsSection } from "../Desktop/sections/StatisticsSection";
import { QuestionCardSection } from "../Desktop/sections/QuestionCardSection/QuestionCardSection";

export const CategoryPage = (): JSX.Element => {
  const { categoryId } = useParams();
  const [activeCategory, setActiveCategory] = useState(categoryId || "all");

  return (
    <div className="bg-[#3d3d3d] flex flex-col items-center w-full">
      <div className="bg-[#3d3d3d] w-full">
        <MainContentSection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <QuestionCardSection activeCategory={activeCategory} showMainCard={false} />
        <StatisticsSection />
      </div>
    </div>
  );
};