import { ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

interface MainContentSectionProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const MainContentSection: React.FC<MainContentSectionProps> = ({ activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();

  // Categories data for the navigation menu
  const categories = [
    { name: "All Categories", id: "all" },
    { name: "Economy", id: "economy" },
    { name: "Politics", id: "politics" },
    { name: "Sustainability", id: "sustainability" },
    { name: "Technology", id: "technology" },
    { name: "Culture", id: "culture" },
    { name: "Sports", id: "sports" },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      navigate("/");
    } else {
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <header className="flex flex-col w-full items-center gap-4 sm:gap-6 py-4 sm:py-6 bg-[#2c2c2c] border-b border-[#545454]">
      {/* Top section with logo and auth buttons */}
      <div className="flex w-full max-w-[1440px] items-center gap-4 relative px-4 sm:px-8 lg:px-20">
        <img
          className="relative w-[90px] h-[40px] sm:w-[117px] sm:h-[52px]"
          alt="Opinion Market Logo"
          src="/logo.svg"
        />

        <div className="flex-1" />

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            onClick={() => window.location.href = 'https://markets.inout.games/?authToken=7dbe639470ff4f12abd41983601b51db6da74cfcc4af23bf08c7f6c413f4a6b51ab948950eb27b99dccaa23e57ba3a56bfe370715beca72cb302dbd4b59a80d8&operatorId=72e338d0-5b66-4c3a-8976-c31ea5957bc9&currency=INR&lang=en'}
            className="h-8 sm:h-9 px-2 sm:px-4 rounded-[5.6px] text-white font-medium text-sm sm:text-base"
          >
            Login
          </Button>

          <Button 
            onClick={() => window.location.href = 'https://markets.inout.games/?authToken=7dbe639470ff4f12abd41983601b51db6da74cfcc4af23bf08c7f6c413f4a6b51ab948950eb27b99dccaa23e57ba3a56bfe370715beca72cb302dbd4b59a80d8&operatorId=72e338d0-5b66-4c3a-8976-c31ea5957bc9&currency=INR&lang=en'}
            className="h-8 sm:h-10 px-2 sm:px-3 py-0 bg-[#c7c7c7] hover:bg-[#b8b8b8] rounded-lg"
          >
            <span className="font-medium text-[#2c2c2c] text-sm sm:text-base tracking-[-0.07px]">
              Sign Up
            </span>
          </Button>
        </div>
      </div>

      {/* Categories navigation */}
      <NavigationMenu className="w-full max-w-[1440px] px-4 sm:px-8 lg:px-20">
        <NavigationMenuList className="flex flex-wrap sm:flex-nowrap w-full min-h-10 items-center justify-center sm:justify-start gap-2 sm:gap-4 lg:gap-6 sm:overflow-x-auto sm:scrollbar-hide">
          {categories.map((category) => (
            <NavigationMenuItem key={category.id}>
              {category.id === "all" ? (
                <Button 
                  onClick={() => handleCategoryClick(category.id)}
                  className={`h-8 sm:h-10 px-3 sm:px-3 py-0 rounded-full sm:rounded-lg transition-colors whitespace-nowrap ${
                    activeCategory === category.id 
                      ? "bg-[#b2d33a] hover:bg-[#c0e040]" 
                      : "bg-transparent hover:bg-[#3c3c3c]"
                  }`}
                >
                  <span className={`font-semibold text-xs sm:text-base tracking-[-0.07px] ${
                    activeCategory === category.id ? "text-[#2c2c2c]" : "text-[#c7c7c7]"
                  }`}>
                    {category.name}
                  </span>
                </Button>
              ) : (
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={`font-medium text-xs sm:text-base tracking-[-0.07px] transition-colors px-3 py-2 rounded-full sm:rounded whitespace-nowrap ${
                    activeCategory === category.id 
                      ? "text-[#2c2c2c] bg-[#b2d33a]" 
                      : "text-[#c7c7c7] hover:text-white hover:bg-[#3c3c3c]"
                  }`}
                >
                  {category.name}
                </button>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};