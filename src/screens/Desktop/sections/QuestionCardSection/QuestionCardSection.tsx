import { BarChartIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

interface QuestionCardSectionProps {
  activeCategory?: string;
  showMainCard?: boolean;
}

export const QuestionCardSection = ({ activeCategory = "all", showMainCard = true }: QuestionCardSectionProps): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [selectedBets, setSelectedBets] = useState<{[key: string]: 'yes' | 'no' | null}>({});
  const [betAmounts, setBetAmounts] = useState<{[key: string]: number}>({});

  // Main featured questions data for carousel - all events from all categories
  const mainQuestions = [
    // Economy
    {
      id: 'economy-0',
      image: "https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India remain the fastest‑growing major economy in 2025 with ~6.5% GDP growth?",
      yesPercentage: 65,
      noPercentage: 35,
      chartData: "0,180 60,150 120,120 180,100 240,110 300,105 360,95 420,90 480,85 540,80 600,75",
      chartColor: "#b2d33a",
      poolAmount: "₹4,25,000",
      deadline: "Dec 31, 2025",
      category: "economy",
      type: "binary" as const
    },
    {
      id: 'economy-1',
      image: "https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will RBI hold the policy rate at 5.50% throughout August 2025?",
      yesPercentage: 72,
      noPercentage: 28,
      chartData: "0,120 60,125 120,120 180,118 240,122 300,120 360,119 420,121 480,120 540,118 600,120",
      chartColor: "#b2d33a",
      poolAmount: "₹3,15,000",
      deadline: "Aug 31, 2025",
      category: "economy",
      type: "binary" as const
    },
    {
      id: 'economy-2',
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will the India–UK Free Trade Agreement be ratified and implemented by end of 2025?",
      yesPercentage: 42,
      noPercentage: 58,
      chartData: "0,140 60,130 120,145 180,135 240,150 300,140 360,155 420,145 480,160 540,150 600,165",
      chartColor: "#ffa500",
      poolAmount: "₹5,85,000",
      deadline: "Dec 31, 2025",
      category: "economy",
      type: "binary" as const
    },
    {
      id: 'economy-3',
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India secure comprehensive trade deal with US by October 2025?",
      yesPercentage: 38,
      noPercentage: 62,
      chartData: "0,130 60,140 120,135 180,145 240,140 300,150 360,145 420,155 480,150 540,160 600,170",
      chartColor: "#ff6b6b",
      poolAmount: "₹6,25,000",
      deadline: "Oct 31, 2025",
      category: "economy",
      type: "binary" as const
    },
    {
      id: 'economy-4',
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will the India Circular Economy Forum lead to national sustainability mandates?",
      yesPercentage: 55,
      noPercentage: 45,
      chartData: "0,160 60,150 120,140 180,135 240,130 300,125 360,120 420,115 480,110 540,105 600,100",
      chartColor: "#ffa500",
      poolAmount: "₹2,85,000",
      deadline: "Jul 31, 2025",
      category: "economy",
      type: "binary" as const
    },
    {
      id: 'economy-5',
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will investments pledged at the Invest Kerala Global Summit exceed ₹50,000 crore?",
      yesPercentage: 68,
      noPercentage: 32,
      chartData: "0,170 60,160 120,150 180,140 240,130 300,120 360,110 420,100 480,90 540,85 600,80",
      chartColor: "#b2d33a",
      poolAmount: "₹4,75,000",
      deadline: "Dec 31, 2025",
      category: "economy",
      type: "multiple" as const,
      options: [
        { label: "₹60,000+ crore", percentage: 35 },
        { label: "₹50,000-60,000 crore", percentage: 33 },
        { label: "₹40,000-50,000 crore", percentage: 32 }
      ]
    },
    // Politics
    {
      id: 'politics-0',
      image: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will delimitation of parliamentary seats proceed before the 2026 freeze expiration?",
      yesPercentage: 45,
      noPercentage: 55,
      chartData: "0,120 60,125 120,130 180,135 240,140 300,145 360,150 420,155 480,160 540,165 600,170",
      chartColor: "#ffa500",
      poolAmount: "₹3,85,000",
      deadline: "Dec 31, 2026",
      category: "politics",
      type: "binary" as const
    },
    {
      id: 'politics-1',
      image: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Modi face a significant backlash over electoral map changes in southern states?",
      yesPercentage: 52,
      noPercentage: 48,
      chartData: "0,140 60,130 120,135 180,125 240,130 300,120 360,125 420,115 480,120 540,110 600,115",
      chartColor: "#ffa500",
      poolAmount: "₹4,15,000",
      deadline: "Dec 31, 2025",
      category: "politics",
      type: "binary" as const
    },
    {
      id: 'politics-2',
      image: "https://images.pexels.com/photos/8828597/pexels-photo-8828597.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Monsoon Session 2025 debate new military strategy related to Operation Sindoor?",
      yesPercentage: 38,
      noPercentage: 62,
      chartData: "0,150 60,155 120,160 180,165 240,170 300,175 360,180 420,175 480,170 540,175 600,180",
      chartColor: "#ff6b6b",
      poolAmount: "₹2,95,000",
      deadline: "Sep 30, 2025",
      category: "politics",
      type: "binary" as const
    },
    {
      id: 'politics-3',
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India–UK FTA signal a shift from protectionism to liberal trade policy?",
      yesPercentage: 48,
      noPercentage: 52,
      chartData: "0,135 60,140 120,145 180,150 240,145 300,140 360,145 420,150 480,155 540,150 600,155",
      chartColor: "#ffa500",
      poolAmount: "₹3,65,000",
      deadline: "Dec 31, 2025",
      category: "politics",
      type: "binary" as const
    },
    {
      id: 'politics-4',
      image: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will policy statements during TRIMA-2025 influence Kerala's leadership trajectory?",
      yesPercentage: 42,
      noPercentage: 58,
      chartData: "0,145 60,150 120,155 180,160 240,155 300,150 360,155 420,160 480,165 540,160 600,165",
      chartColor: "#ffa500",
      poolAmount: "₹2,25,000",
      deadline: "Dec 31, 2025",
      category: "politics",
      type: "binary" as const
    },
    {
      id: 'politics-5',
      image: "https://images.pexels.com/photos/8828597/pexels-photo-8828597.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India-Pakistan engagement remain limited to military rhetoric despite Asia Cup ties?",
      yesPercentage: 72,
      noPercentage: 28,
      chartData: "0,100 60,95 120,90 180,85 240,80 300,75 360,70 420,75 480,80 540,85 600,90",
      chartColor: "#b2d33a",
      poolAmount: "₹3,45,000",
      deadline: "Dec 31, 2025",
      category: "politics",
      type: "multiple" as const,
      options: [
        { label: "Military rhetoric only", percentage: 45 },
        { label: "Limited diplomatic talks", percentage: 32 },
        { label: "Significant engagement", percentage: 23 }
      ]
    },
    // Sustainability
    {
      id: 'sustainability-0',
      image: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India announce sweeping climate legislation post the 2025 heat wave?",
      yesPercentage: 68,
      noPercentage: 32,
      chartData: "0,160 60,150 120,140 180,130 240,120 300,110 360,100 420,90 480,85 540,80 600,75",
      chartColor: "#b2d33a",
      poolAmount: "₹4,85,000",
      deadline: "Dec 31, 2025",
      category: "sustainability",
      type: "binary" as const
    },
    {
      id: 'sustainability-1',
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Circular Economy Forum in Gurugram trigger policy shifts across industries?",
      yesPercentage: 55,
      noPercentage: 45,
      chartData: "0,150 60,145 120,140 180,135 240,130 300,125 360,120 420,115 480,110 540,105 600,100",
      chartColor: "#ffa500",
      poolAmount: "₹2,85,000",
      deadline: "Jul 31, 2025",
      category: "sustainability",
      type: "binary" as const
    },
    {
      id: 'sustainability-2',
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Social Impact Summit 2025 result in a national digital inclusion program?",
      yesPercentage: 62,
      noPercentage: 38,
      chartData: "0,140 60,135 120,130 180,125 240,120 300,115 360,110 420,105 480,100 540,95 600,90",
      chartColor: "#b2d33a",
      poolAmount: "₹3,25,000",
      deadline: "Dec 31, 2025",
      category: "sustainability",
      type: "binary" as const
    },
    {
      id: 'sustainability-3',
      image: "https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India launch a nationwide green hydrogen or solar scale‑up by end of 2025?",
      yesPercentage: 75,
      noPercentage: 25,
      chartData: "0,150 60,140 120,130 180,120 240,110 300,100 360,90 420,80 480,75 540,70 600,65",
      chartColor: "#b2d33a",
      poolAmount: "₹5,45,000",
      deadline: "Dec 31, 2025",
      category: "sustainability",
      type: "binary" as const
    },
    {
      id: 'sustainability-4',
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will the Rising Northeast Investors Summit lead to infrastructure plans in the region?",
      yesPercentage: 58,
      noPercentage: 42,
      chartData: "0,145 60,140 120,135 180,130 240,125 300,120 360,115 420,110 480,105 540,100 600,95",
      chartColor: "#ffa500",
      poolAmount: "₹2,95,000",
      deadline: "Dec 31, 2025",
      category: "sustainability",
      type: "binary" as const
    },
    {
      id: 'sustainability-5',
      image: "https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Kumbh Mela 2025 attendance exceed 650 million pilgrims?",
      yesPercentage: 82,
      noPercentage: 18,
      chartData: "0,120 60,115 120,110 180,105 240,100 300,95 360,90 420,85 480,80 540,75 600,70",
      chartColor: "#b2d33a",
      poolAmount: "₹6,85,000",
      deadline: "Dec 31, 2025",
      category: "sustainability",
      type: "multiple" as const,
      options: [
        { label: "700+ million", percentage: 42 },
        { label: "650-700 million", percentage: 40 },
        { label: "600-650 million", percentage: 18 }
      ]
    },
    // Technology
    {
      id: 'tech-0',
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will the 'AI for Bharat' initiative be rolled out nationally before end‑2025?",
      yesPercentage: 65,
      noPercentage: 35,
      chartData: "0,180 60,170 120,160 180,150 240,140 300,130 360,120 420,110 480,100 540,90 600,80",
      chartColor: "#b2d33a",
      poolAmount: "₹4,75,000",
      deadline: "Dec 31, 2025",
      category: "tech",
      type: "binary" as const
    },
    {
      id: 'tech-1',
      image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will ET Soonicorns Summit lead to at least ₹500 crore in AI investments?",
      yesPercentage: 58,
      noPercentage: 42,
      chartData: "0,150 60,145 120,140 180,135 240,130 300,125 360,120 420,115 480,110 540,105 600,100",
      chartColor: "#ffa500",
      poolAmount: "₹3,85,000",
      deadline: "Dec 31, 2025",
      category: "tech",
      type: "binary" as const
    },
    {
      id: 'tech-2',
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will media‑tech deals worth over ₹1,300 crore stem from WAVES Summit 2025?",
      yesPercentage: 48,
      noPercentage: 52,
      chartData: "0,140 60,145 120,150 180,155 240,150 300,145 360,150 420,155 480,160 540,155 600,160",
      chartColor: "#ffa500",
      poolAmount: "₹4,25,000",
      deadline: "Dec 31, 2025",
      category: "tech",
      type: "binary" as const
    },
    {
      id: 'tech-3',
      image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India establish at least one major regional AI data centre by late 2025?",
      yesPercentage: 72,
      noPercentage: 28,
      chartData: "0,160 60,150 120,140 180,130 240,120 300,110 360,100 420,90 480,85 540,80 600,75",
      chartColor: "#b2d33a",
      poolAmount: "₹5,15,000",
      deadline: "Dec 31, 2025",
      category: "tech",
      type: "binary" as const
    },
    {
      id: 'tech-4',
      image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Kerala summit 2025 catalyze startup seed‑funding in emerging sectors?",
      yesPercentage: 62,
      noPercentage: 38,
      chartData: "0,145 60,140 120,135 180,130 240,125 300,120 360,115 420,110 480,105 540,100 600,95",
      chartColor: "#b2d33a",
      poolAmount: "₹2,95,000",
      deadline: "Dec 31, 2025",
      category: "tech",
      type: "binary" as const
    },
    {
      id: 'tech-5',
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India launch a national tech‑infrastructure policy including Film‑gaming‑animation sectors?",
      yesPercentage: 55,
      noPercentage: 45,
      chartData: "0,150 60,145 120,140 180,135 240,130 300,125 360,120 420,115 480,110 540,105 600,100",
      chartColor: "#ffa500",
      poolAmount: "₹3,65,000",
      deadline: "Dec 31, 2025",
      category: "tech",
      type: "multiple" as const,
      options: [
        { label: "Full policy by Q4 2025", percentage: 35 },
        { label: "Partial framework only", percentage: 38 },
        { label: "Delayed to 2026", percentage: 27 }
      ]
    },
    // Culture
    {
      id: 'culture-0',
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will WAVES Summit 2025 produce projects exceeding ₹1,300 crore in deals?",
      yesPercentage: 48,
      noPercentage: 52,
      chartData: "0,140 60,145 120,150 180,155 240,150 300,145 360,150 420,155 480,160 540,155 600,160",
      chartColor: "#ffa500",
      poolAmount: "₹4,25,000",
      deadline: "Dec 31, 2025",
      category: "culture",
      type: "binary" as const
    },
    {
      id: 'culture-1',
      image: "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Divya Deshmukh's chess victory spark promotion of chess in Indian youth policy?",
      yesPercentage: 68,
      noPercentage: 32,
      chartData: "0,160 60,150 120,140 180,130 240,120 300,110 360,100 420,90 480,85 540,80 600,75",
      chartColor: "#b2d33a",
      poolAmount: "₹2,85,000",
      deadline: "Dec 31, 2025",
      category: "culture",
      type: "binary" as const
    },
    {
      id: 'culture-2',
      image: "https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Kumbh Mela 2025 attract over 600 million pilgrims?",
      yesPercentage: 82,
      noPercentage: 18,
      chartData: "0,120 60,115 120,110 180,105 240,100 300,95 360,90 420,85 480,80 540,75 600,70",
      chartColor: "#b2d33a",
      poolAmount: "₹6,85,000",
      deadline: "Dec 31, 2025",
      category: "culture",
      type: "binary" as const
    },
    {
      id: 'culture-3',
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will WAVES Summit launch a national entertainment‑innovation fund in 2025?",
      yesPercentage: 52,
      noPercentage: 48,
      chartData: "0,145 60,140 120,135 180,130 240,125 300,120 360,115 420,110 480,105 540,100 600,95",
      chartColor: "#ffa500",
      poolAmount: "₹3,45,000",
      deadline: "Dec 31, 2025",
      category: "culture",
      type: "binary" as const
    },
    {
      id: 'culture-4',
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Social Impact Summit influence cultural CSR initiatives nation‑wide?",
      yesPercentage: 58,
      noPercentage: 42,
      chartData: "0,150 60,145 120,140 180,135 240,130 300,125 360,120 420,115 480,110 540,105 600,100",
      chartColor: "#ffa500",
      poolAmount: "₹2,75,000",
      deadline: "Dec 31, 2025",
      category: "culture",
      type: "binary" as const
    },
    {
      id: 'culture-5',
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Bollywood‑tech collaborations emerge out of WAVES 2025 event deals?",
      yesPercentage: 45,
      noPercentage: 55,
      chartData: "0,140 60,145 120,150 180,155 240,160 300,155 360,150 420,155 480,160 540,165 600,170",
      chartColor: "#ffa500",
      poolAmount: "₹3,15,000",
      deadline: "Dec 31, 2025",
      category: "culture",
      type: "multiple" as const,
      options: [
        { label: "Major collaborations", percentage: 28 },
        { label: "Limited partnerships", percentage: 45 },
        { label: "No significant deals", percentage: 27 }
      ]
    },
    // Sports
    {
      id: 'sports-0',
      image: "https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India host the final of the ICC Women's Cricket World Cup 2025?",
      yesPercentage: 78,
      noPercentage: 22,
      chartData: "0,140 60,130 120,120 180,110 240,100 300,90 360,85 420,80 480,75 540,70 600,65",
      chartColor: "#b2d33a",
      poolAmount: "₹7,25,000",
      deadline: "Dec 31, 2025",
      category: "sports",
      type: "binary" as const
    },
    {
      id: 'sports-1',
      image: "https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India face Pakistan in Asia Cup 2025 match scheduled on September 14?",
      yesPercentage: 85,
      noPercentage: 15,
      chartData: "0,130 60,120 120,110 180,100 240,90 300,85 360,80 420,75 480,70 540,65 600,60",
      chartColor: "#b2d33a",
      poolAmount: "₹6,45,000",
      deadline: "Sep 14, 2025",
      category: "sports",
      type: "binary" as const
    },
    {
      id: 'sports-2',
      image: "https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India win the Women's ODI series against England before the World Cup?",
      yesPercentage: 62,
      noPercentage: 38,
      chartData: "0,150 60,145 120,140 180,135 240,130 300,125 360,120 420,115 480,110 540,105 600,100",
      chartColor: "#b2d33a",
      poolAmount: "₹4,85,000",
      deadline: "Nov 30, 2025",
      category: "sports",
      type: "binary" as const
    },
    {
      id: 'sports-3',
      image: "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Divya Deshmukh be elevated to Grandmaster status post‑World Cup win?",
      yesPercentage: 72,
      noPercentage: 28,
      chartData: "0,140 60,130 120,120 180,110 240,100 300,95 360,90 420,85 480,80 540,75 600,70",
      chartColor: "#b2d33a",
      poolAmount: "₹3,25,000",
      deadline: "Dec 31, 2025",
      category: "sports",
      type: "binary" as const
    },
    {
      id: 'sports-4',
      image: "https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will the first Kho Kho World Cup held in Jan 2025 become a recurring event?",
      yesPercentage: 58,
      noPercentage: 42,
      chartData: "0,150 60,145 120,140 180,135 240,130 300,125 360,120 420,115 480,110 540,105 600,100",
      chartColor: "#ffa500",
      poolAmount: "₹2,45,000",
      deadline: "Jan 31, 2025",
      category: "sports",
      type: "binary" as const
    },
    {
      id: 'sports-5',
      image: "https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India‑UK sports economy collaboration double sports revenue by 2027?",
      yesPercentage: 48,
      noPercentage: 52,
      chartData: "0,145 60,150 120,155 180,160 240,155 300,150 360,155 420,160 480,165 540,160 600,165",
      chartColor: "#ffa500",
      poolAmount: "₹4,15,000",
      deadline: "Dec 31, 2027",
      category: "sports",
      type: "multiple" as const,
      options: [
        { label: "Double by 2027", percentage: 32 },
        { label: "50-100% increase", percentage: 41 },
        { label: "Less than 50% growth", percentage: 27 }
      ]
    }
  ];

  const totalSlides = mainQuestions.length;

  // Data for the grid of smaller question cards
  // Convert main questions to card format for grid display
  const questionCards = mainQuestions.map(question => ({
    ...question,
    type: question.type || "binary" as const
  }));

  // Перемешиваем карточки при каждом рендере для разнообразия
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Calculate potential income based on bet amount and odds
  const calculatePotentialIncome = (questionId: string, betType: 'yes' | 'no') => {
    const betAmount = betAmounts[questionId] || 100;
    const currentQuestion = mainQuestions[currentSlide];
    
    if (betType === 'yes') {
      const odds = 100 / currentQuestion.yesPercentage;
      return Math.round(betAmount * odds);
    } else {
      const odds = 100 / currentQuestion.noPercentage;
      return Math.round(betAmount * odds);
    }
  };

  // Handle bet selection
  const handleBetSelection = (questionId: string, betType: 'yes' | 'no') => {
    setSelectedBets(prev => ({
      ...prev,
      [questionId]: prev[questionId] === betType ? null : betType
    }));
    
    // Set default bet amount if not set
    if (!betAmounts[questionId]) {
      setBetAmounts(prev => ({
        ...prev,
        [questionId]: 100
      }));
    }
  };

  // Generate category-specific content
  const generateCategoryContent = (category: string) => {
    // Filter events by category
    const filtered = mainQuestions.filter(question => {
      // Handle both "tech" and "technology" for backward compatibility
      if (category === "technology") {
        return question.category === "technology" || question.category === "tech";
      }
      return question.category === category;
    });
    
    console.log(`Category: ${category}, Found events:`, filtered.length);
    
    return filtered.map(question => ({
      ...question,
      type: question.type || "binary" as const
    }));
  };

  useEffect(() => {
    // Функция для перемешивания массива
    const shuffleArray = (array: any[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    if (activeCategory === "all") {
      setFilteredQuestions(shuffleArray(questionCards));
    } else {
      console.log(`Filtering for category: ${activeCategory}`);
      setFilteredQuestions(shuffleArray(generateCategoryContent(activeCategory)));
    }
  }, [activeCategory]);

  const mainQuestion = mainQuestions[currentSlide];
  const selectedBet = selectedBets[mainQuestion.id];
  const currentBetAmount = betAmounts[mainQuestion.id] || 100;
  const potentialIncome = selectedBet ? calculatePotentialIncome(mainQuestion.id, selectedBet) : 0;

  // Handle bet button click
  const handleMakeBet = () => {
    window.location.href = 'https://markets.inout.games/?authToken=7dbe639470ff4f12abd41983601b51db6da74cfcc4af23bf08c7f6c413f4a6b51ab948950eb27b99dccaa23e57ba3a56bfe370715beca72cb302dbd4b59a80d8&operatorId=72e338d0-5b66-4c3a-8976-c31ea5957bc9&currency=INR&lang=en';
  };

  // Chart Y-axis labels
  const yAxisLabels = ["30", "25", "20", "15", "10", "5", "0"];

  // Chart X-axis labels
  const xAxisLabels = ["12", "15", "18", "21", "11", "03", "06", "08"];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleCardClick = (questionId: string) => {
    navigate(`/event/${questionId}`);
  };

  const handleMainCardClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking on interactive elements
    e.stopPropagation();
  };
  return (
    <section className="flex flex-col w-full items-center gap-6 sm:gap-8 lg:gap-10 py-8 sm:py-12">
      <div className="flex flex-col w-full max-w-[1440px] items-start gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-8 lg:px-20">
      {/* Main featured question card with carousel - only show on "all" category */}
      {showMainCard && activeCategory === "all" && (
      <div className="relative w-full">
        <Card 
          className="w-full bg-[#2c2c2c] rounded-lg overflow-hidden border border-solid border-[#545454] shadow-[0px_3px_6px_#0000000a,0px_6px_12px_#0000000a]"
        >
          <CardContent className="p-4 sm:p-6 lg:p-10">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-0">
              {/* Left side - Question details */}
              <div className="flex flex-col w-full lg:w-[480px] items-start gap-4 lg:gap-6">
                <div className="flex items-center gap-3 sm:gap-4 w-full">
                  <img
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-cover rounded-lg flex-shrink-0"
                    alt="Question image"
                    src={mainQuestion.image}
                  />
                  <h2 className="font-semibold text-white text-lg sm:text-xl lg:text-2xl leading-tight flex-1">
                    {mainQuestion.title}
                  </h2>
                </div>

                <div className="flex flex-col items-start gap-4 w-full">
                  <p className="font-medium text-white text-base font-['Inter',Helvetica] leading-[21px]">
                    Event Outcome
                  </p>

                  <div className="flex items-center gap-6 w-full">
                    <button 
                      onClick={(e) => {
                        handleMainCardClick(e);
                        handleBetSelection(mainQuestion.id, 'yes');
                      }}
                      className={`h-12 justify-between flex-1 flex items-center px-4 py-0 rounded-lg border-2 transition-all ${
                        selectedBet === 'yes' 
                          ? 'bg-[#c7e055] border-white text-[#1a1a1a] shadow-lg' 
                          : 'bg-[#b2d33a] border-[#8fb11e] text-[#2c2c2c] hover:bg-[#c0e040] hover:text-[#1a1a1a]'
                      }`}
                    >
                      <span className="font-bold text-lg font-['Inter',Helvetica] leading-[21px] whitespace-nowrap">
                        Yes
                      </span>
                      <span className="font-bold text-[#2c2c2c] text-lg font-['Inter',Helvetica] leading-[21px] whitespace-nowrap">
                        {mainQuestion.yesPercentage}%
                      </span>
                    </button>

                    <button 
                      onClick={(e) => {
                        handleMainCardClick(e);
                        handleBetSelection(mainQuestion.id, 'no');
                      }}
                      className={`h-12 justify-between flex-1 flex items-center px-4 py-0 rounded-lg border-2 transition-all ${
                        selectedBet === 'no' 
                          ? 'bg-[#e63946] border-white text-white shadow-lg' 
                          : 'bg-[#d82737] border-[#d82737] text-white hover:bg-[#e03040]'
                      }`}
                    >
                      <span className="font-bold text-lg font-['Inter',Helvetica] leading-[21px] whitespace-nowrap">
                        No
                      </span>
                      <span className="font-bold text-white text-lg font-['Inter',Helvetica] leading-[21px] whitespace-nowrap">
                        {mainQuestion.noPercentage}%
                      </span>
                    </button>
                  </div>

                  <div className="flex h-12 items-center justify-between w-full">
                    <span className="font-medium text-white text-base font-['Inter',Helvetica] leading-[21px] whitespace-nowrap">
                      Potential Return
                    </span>
                    <span className="font-bold text-[#b2d33a] text-3xl font-['Inter',Helvetica] leading-[21px] whitespace-nowrap">
                      {selectedBet ? `₹${potentialIncome}` : '₹0'}
                    </span>
                  </div>
                </div>

                <Button 
                  onClick={(e) => {
                    handleMainCardClick(e);
                    handleMakeBet();
                  }}
                  className="h-14 w-full bg-[#e4e4e4] hover:bg-[#d4d4d4] border-[#f3f3f3] text-[#2c2c2c] font-bold text-lg font-['Inter',Helvetica] leading-[21px] rounded-lg border border-solid cursor-pointer"
                >
                  Place Bet
                </Button>
              </div>

              {/* Right side - Chart */}
              <div className="flex flex-col flex-1 items-end gap-6 ml-8">
                <div className="flex w-full items-center justify-end gap-6">
                  <div className="flex items-center gap-6">
                    <div className="inline-flex items-center gap-1">
                      <BarChartIcon className="w-4 h-4 text-white" />
                      <span className="font-medium text-white text-xs font-['Inter',Helvetica] leading-[21px] whitespace-nowrap">
                        {mainQuestion.poolAmount}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1">
                      <ClockIcon className="w-4 h-4 text-white" />
                      <span className="font-medium text-white text-xs font-['Inter',Helvetica] leading-[21px] whitespace-nowrap">
                        {mainQuestion.deadline}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col h-80 items-start w-full">
                  <div className="flex items-center w-full flex-1">
                    {/* Y-axis labels */}
                    <div className="inline-flex flex-col items-end justify-between px-2 py-0 h-full w-8">
                      {yAxisLabels.map((label, index) => (
                        <span
                          key={`y-label-${index}`}
                          className="font-normal text-[#ffffffb2] text-sm font-['Inter',Helvetica]"
                        >
                          {label}
                        </span>
                      ))}
                    </div>

                    {/* Chart grid and line */}
                    <div className="relative flex-1 h-full bg-[#1a1a1a] rounded border border-[#333] ml-2">
                      <div className="flex-col w-full h-full justify-between px-px py-1.5 flex items-start">
                        {Array(7)
                          .fill(0)
                          .map((_, index) => (
                            <div
                              key={`h-line-${index}`}
                              className="w-full h-px bg-[#333]"
                            />
                          ))}
                      </div>

                      <div className="flex w-full h-full items-start justify-between px-px py-1.5 absolute top-0 left-0">
                        {Array(9)
                          .fill(0)
                          .map((_, index) => (
                            <div
                              key={`v-line-${index}`}
                              className="h-full w-px bg-[#333]"
                            />
                          ))}
                      </div>

                      {/* Chart line - simplified version */}
                      <div className="absolute inset-3">
                        <svg className="w-full h-full" viewBox="0 0 600 240">
                          <polyline
                            fill="none"
                            stroke="#b2d33a"
                            strokeWidth="3"
                            points="0,180 60,150 120,120 180,100 240,110 300,105 360,95 420,90 480,85 540,80 600,75"
                          />
                          {/* Dotted line extension */}
                          <polyline
                            fill="none"
                            stroke="#b2d33a"
                            strokeWidth="3"
                            strokeDasharray="5,5"
                            points="600,75 660,70"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* X-axis labels */}
                  <div className="pl-10 pr-0 pt-3 pb-0 w-full flex items-start justify-between">
                    {xAxisLabels.map((label, index) => (
                      <span
                        key={`x-label-${index}`}
                        className="font-normal text-[#ffffffb2] text-sm font-['Inter',Helvetica]"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          {/* Carousel navigation inside card */}
          <CardFooter className="px-10 pb-6 pt-0">
            <div className="flex items-center justify-between w-full">
              {/* Left arrow */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  handleMainCardClick(e);
                  prevSlide();
                }}
                className="w-10 h-10 p-0 text-white hover:bg-white/10 rounded border border-[#545454] bg-[#3c3c3c]"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </Button>

              {/* Dots indicator */}
              <div className="flex items-center gap-2">
                {Array(totalSlides)
                  .fill(0)
                  .map((_, index) => (
                    <button
                      key={`dot-${index}`}
                      onClick={(e) => {
                        handleMainCardClick(e);
                        setCurrentSlide(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-white" : "bg-white/30"
                      }`}
                    />
                  ))}
              </div>

              {/* Right arrow */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  handleMainCardClick(e);
                  nextSlide();
                }}
                className="w-10 h-10 p-0 text-white hover:bg-white/10 rounded border border-[#545454] bg-[#3c3c3c]"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      )}

      {/* Grid of smaller question cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-[30px] w-full">
        {filteredQuestions.map((card, index) => (
          <Card
            key={card.id}
            className="bg-[#2c2c2c] rounded-lg border border-solid border-[#545454] shadow-[0px_3px_6px_#00000005,0px_6px_12px_#00000005] cursor-pointer hover:border-[#666] transition-colors"
            onClick={() => handleCardClick(card.id)}
          >
            <CardContent className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
              {/* Card header with image and title */}
              <div className="flex items-start gap-2 sm:gap-[9px] w-full">
                <img
                  className="w-8 h-8 sm:w-[42px] sm:h-[42px] object-cover rounded flex-shrink-0"
                  alt="Question image"
                  src={card.image}
                />
                <h3 className="font-medium text-white text-sm sm:text-[15px] font-['Inter',Helvetica] leading-5 sm:leading-[21px] line-clamp-3">
                  {card.title}
                </h3>
              </div>

              <Separator className="bg-white/10" />

              {/* Card content - either binary or multiple choice */}
              {card.type === "binary" ? (
                <div className="flex flex-col items-start justify-center gap-6 w-full">
                  {/* Progress bar */}
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-medium text-white text-xs font-['Inter',Helvetica] leading-[21px] whitespace-nowrap min-w-[24px]">
                      {card.yesPercentage}%
                    </span>
                    <div className="relative flex-1 h-2 bg-[#d82737] rounded-full overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-[#b2d33a] rounded-full"
                        style={{ width: `${card.yesPercentage}%` }}
                      />
                    </div>
                    <span className="font-medium text-white text-xs font-['Inter',Helvetica] leading-[21px] whitespace-nowrap min-w-[24px]">
                      {card.noPercentage}%
                    </span>
                  </div>

                  {/* Yes/No buttons */}
                  <div className="flex items-center gap-2 sm:gap-3 w-full">
                    {/* Yes option */}
                    <div className="flex-col gap-1 flex-1 flex items-center">
                      <button 
                        onClick={() => handleBetSelection(card.id, 'yes')}
                        className={`h-8 sm:h-10 w-full font-bold text-sm sm:text-base font-['Inter',Helvetica] leading-[21px] rounded-lg border-2 transition-all ${
                          selectedBets[card.id] === 'yes' 
                            ? 'bg-[#c7e055] border-white text-[#1a1a1a] shadow-lg' 
                            : 'bg-[#b2d33a] border-[#8fb11e] text-[#2c2c2c] hover:bg-[#c0e040]'
                        }`}
                      >
                        Yes
                      </button>
                      <div className="flex w-full items-center justify-between text-xs">
                        <span className="font-medium text-[#c7c7c7] font-['Inter',Helvetica] leading-[21px]">
                          ₹100
                        </span>
                        <span className="text-[#666]">→</span>
                        <span className="font-medium text-[#b2d33a] font-['Inter',Helvetica] leading-[21px]">
                          ₹{Math.round(100 * (100 / card.yesPercentage))}
                        </span>
                      </div>
                    </div>

                    {/* No option */}
                    <div className="flex-col gap-1 flex-1 flex items-center">
                      <button 
                        onClick={() => handleBetSelection(card.id, 'no')}
                        className={`h-8 sm:h-10 w-full font-bold text-sm sm:text-base font-['Inter',Helvetica] leading-[21px] rounded-lg border-2 transition-all ${
                          selectedBets[card.id] === 'no' 
                            ? 'bg-[#e63946] border-white text-white shadow-lg' 
                            : 'bg-[#d82737] border-[#d82737] text-white hover:bg-[#e03040]'
                        }`}
                      >
                        No
                      </button>
                      <div className="flex w-full items-center justify-between text-xs">
                        <span className="font-medium text-[#c7c7c7] font-['Inter',Helvetica] leading-[21px]">
                          ₹100
                        </span>
                        <span className="text-[#666]">→</span>
                        <span className="font-medium text-[#b2d33a] font-['Inter',Helvetica] leading-[21px]">
                          ₹{Math.round(100 * (100 / card.noPercentage))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start gap-3 w-full">
                  {card.options?.map((option, optionIndex) => (
                    <div
                      key={`option-${index}-${optionIndex}`}
                      className="relative flex h-10 items-center justify-between px-3 py-0 w-full bg-[#1a1a1a] rounded-lg border border-solid border-[#545454] overflow-hidden cursor-pointer hover:border-[#666] transition-colors"
                    >
                      <div
                        className="absolute left-0 top-0 h-full bg-[#b2d33a] rounded-l-lg transition-all duration-300"
                        style={{ width: `${option.percentage}%` }}
                      />
                      <span className="relative z-10 font-normal text-white text-sm font-['Inter',Helvetica] leading-[16.8px] whitespace-nowrap">
                        {option.label}
                      </span>
                      <span className="relative z-10 font-medium text-white text-sm font-['Inter',Helvetica] leading-[21px] whitespace-nowrap">
                        {option.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <Separator className="bg-white/10" />

              {/* Card footer with pool amount and deadline */}
              <div className="flex items-center justify-between w-full">
                <div className="inline-flex items-center gap-1">
                  <BarChartIcon className="w-4 h-4 text-white" />
                  <span className="font-medium text-white text-xs font-['Inter',Helvetica] leading-[21px] whitespace-nowrap">
                    {card.poolAmount}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1">
                  <ClockIcon className="w-4 h-4 text-white" />
                  <span className="font-medium text-white text-xs font-['Inter',Helvetica] leading-[21px] whitespace-nowrap">
                    {card.deadline}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </section>
  );
};