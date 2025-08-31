import React from "react";
import { Button } from "../../../../components/ui/button";

export const StatisticsSection = (): JSX.Element => {
  return (
    <footer className="flex w-full items-center justify-center py-6 bg-[#2c2c2c] border-t border-[#545454]">
      <div className="flex w-full max-w-[1440px] items-center gap-4 px-20">
        <img
          className="w-[90px] h-10"
          alt="Opinion Market Logo"
          src="/image-5-1.png"
        />

        <div className="flex-1" />

        <div className="flex items-center gap-2">
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
    </footer>
  );
};
