import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export const Footer = (): JSX.Element => {
  const navigate = useNavigate();

  // Categories data
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
    if (categoryId === "all") {
      navigate("/");
    } else {
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <footer className="flex flex-col w-full items-center bg-[#2c2c2c] border-t border-[#545454] py-8 sm:py-12">
      {/* Main footer content */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1440px] items-start gap-8 lg:gap-12 px-4 sm:px-8 lg:px-20 mb-6 sm:mb-8">
        {/* Logo and auth buttons section - mobile first */}
        <div className="flex flex-col sm:flex-row w-full lg:w-auto items-start sm:items-center justify-between gap-4 sm:gap-6">
          <img
            className="w-[90px] h-10"
            alt="Opinion Market Logo"
            src="/logo-footer.png"
          />
          
          {/* Auth buttons - mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              onClick={() => window.location.href = 'https://markets.inout.games/?authToken=7dbe639470ff4f12abd41983601b51db6da74cfcc4af23bf08c7f6c413f4a6b51ab948950eb27b99dccaa23e57ba3a56bfe370715beca72cb302dbd4b59a80d8&operatorId=72e338d0-5b66-4c3a-8976-c31ea5957bc9&currency=INR&lang=en'}
              className="h-8 px-3 text-white font-medium text-sm hover:bg-[#3c3c3c]"
            >
              Login
            </Button>

            <Button 
              onClick={() => window.location.href = 'https://markets.inout.games/?authToken=7dbe639470ff4f12abd41983601b51db6da74cfcc4af23bf08c7f6c413f4a6b51ab948950eb27b99dccaa23e57ba3a56bfe370715beca72cb302dbd4b59a80d8&operatorId=72e338d0-5b66-4c3a-8976-c31ea5957bc9&currency=INR&lang=en'}
              className="h-8 px-3 py-0 bg-[#c7c7c7] hover:bg-[#b7b7b7] rounded-lg text-[#2c2c2c] font-medium text-sm"
            >
              Sign Up
            </Button>
          </div>
        </div>

        {/* Center sections with Categories and Legal */}
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-8 sm:gap-12 lg:gap-16">
          {/* Categories section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-lg">Categories</h3>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="text-[#c7c7c7] hover:text-white text-sm font-medium transition-colors text-left"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Legal links section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-lg">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link 
                to="/terms" 
                className="text-[#c7c7c7] hover:text-white text-sm font-medium transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/privacy" 
                className="text-[#c7c7c7] hover:text-white text-sm font-medium transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/legal" 
                className="text-[#c7c7c7] hover:text-white text-sm font-medium transition-colors"
              >
                Legal Notice
              </Link>
            </div>
          </div>
        </div>

        {/* Auth buttons section - desktop only */}
        <div className="hidden lg:flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => window.location.href = 'https://markets.inout.games/?authToken=7dbe639470ff4f12abd41983601b51db6da74cfcc4af23bf08c7f6c413f4a6b51ab948950eb27b99dccaa23e57ba3a56bfe370715beca72cb302dbd4b59a80d8&operatorId=72e338d0-5b66-4c3a-8976-c31ea5957bc9&currency=INR&lang=en'}
            className="h-9 px-4 text-white font-medium text-[14.2px] hover:bg-[#3c3c3c]"
          >
            Login
          </Button>

          <Button 
            onClick={() => window.location.href = 'https://markets.inout.games/?authToken=7dbe639470ff4f12abd41983601b51db6da74cfcc4af23bf08c7f6c413f4a6b51ab948950eb27b99dccaa23e57ba3a56bfe370715beca72cb302dbd4b59a80d8&operatorId=72e338d0-5b66-4c3a-8976-c31ea5957bc9&currency=INR&lang=en'}
            className="h-10 px-3 py-0 bg-[#c7c7c7] hover:bg-[#b7b7b7] rounded-lg text-[#2c2c2c] font-medium text-base tracking-[-0.07px]"
          >
            Sign Up
          </Button>
        </div>
      </div>

      {/* Copyright section */}
      <div className="w-full max-w-[1440px] px-4 sm:px-8 lg:px-20 pt-6 sm:pt-8 border-t border-[#545454]">
        <div className="flex items-center justify-center">
          <p className="text-[#c7c7c7] text-sm">
            © 2025. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
