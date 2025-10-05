import { BarChartIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { useMarkets } from "../../../../hooks/useMarkets";

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
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Autoplay state
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fetch markets from API
  const { markets: apiMarkets, loading: apiLoading, error: apiError } = useMarkets({
    limit: 100,
    'filter.status': 'active',
    'filter.sort_by': 'newest'
  });

  // Fallback mock data (used if API returns empty)
  const mockMainQuestions = [
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

  // Use API data if available, otherwise use mock data
  const mainQuestions = apiMarkets.length > 0 ? apiMarkets : mockMainQuestions;
  const isUsingApiData = apiMarkets.length > 0;

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

  // Calculate potential income based on bet amount and odds (x4-20 multiplier)
  const calculatePotentialIncome = (questionId: string, betType: 'yes' | 'no') => {
    const betAmount = betAmounts[questionId] || 100;
    const allQuestions = apiMarkets.length > 0 ? apiMarkets : mockMainQuestions;
    const currentQuestion = allQuestions[currentSlide];
    
    // Generate multiplier between 4x and 20x based on odds
    let multiplier;
    if (betType === 'yes') {
      // Higher percentage = lower multiplier (4x-8x), lower percentage = higher multiplier (12x-20x)
      multiplier = currentQuestion.yesPercentage > 70 ? 
        Math.random() * 4 + 4 : // 4x-8x for high probability
        currentQuestion.yesPercentage > 50 ?
        Math.random() * 6 + 8 : // 8x-14x for medium probability  
        Math.random() * 8 + 12; // 12x-20x for low probability
    } else {
      multiplier = currentQuestion.noPercentage > 70 ? 
        Math.random() * 4 + 4 : // 4x-8x for high probability
        currentQuestion.noPercentage > 50 ?
        Math.random() * 6 + 8 : // 8x-14x for medium probability
        Math.random() * 8 + 12; // 12x-20x for low probability
    }
    
    return Math.round(betAmount * multiplier);
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
    const allQuestions = apiMarkets.length > 0 ? apiMarkets : mockMainQuestions;
    // Filter events by category
    const filtered = allQuestions.filter(question => {
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

  // Autoplay effect for carousel
  useEffect(() => {
    if (!isAutoPlaying || !showMainCard || activeCategory !== "all") return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, showMainCard, activeCategory, totalSlides]);

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
    window.location.href = 'https://auth.opinion-market.com/';
  };

  // Chart Y-axis labels
  const yAxisLabels = ["30", "25", "20", "15", "10", "5", "0"];

  // Chart X-axis labels
  const xAxisLabels = ["12", "15", "18", "21", "11", "03", "06", "08"];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false); // Pause autoplay when user interacts
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false); // Pause autoplay when user interacts
  };

  // Touch/swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setIsAutoPlaying(false); // Pause autoplay when user swipes
  };

  const handleCardClick = (questionId: string) => {
    navigate(`/event/${questionId}`);
  };

  const handleMainCardClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking on interactive elements
    e.stopPropagation();
  };
  // Show loading state
  if (apiLoading) {
    return (
      <section className="flex flex-col w-full items-center gap-6 sm:gap-8 lg:gap-10 py-8 sm:py-12">
        <div className="flex flex-col w-full max-w-[1440px] items-center justify-center gap-4 px-4 sm:px-8 lg:px-20 min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b2d33a]"></div>
          <p className="text-white text-lg">Loading markets...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full items-center gap-6 sm:gap-8 lg:gap-10 py-8 sm:py-12">
      <div className="flex flex-col w-full max-w-[1440px] items-start gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-8 lg:px-20">
      {/* Data source indicator */}
      {!isUsingApiData && (
        <div className="w-full bg-yellow-900/20 border border-yellow-600/30 rounded-lg px-4 py-3 flex items-center gap-3">
          <span className="text-yellow-400 text-sm">⚠️</span>
          <p className="text-yellow-200 text-sm">
            Demo Mode: Showing sample data. API returned no markets.
          </p>
        </div>
      )}
      {isUsingApiData && (
        <div className="w-full bg-green-900/20 border border-green-600/30 rounded-lg px-4 py-3 flex items-center gap-3">
          <span className="text-green-400 text-sm">✓</span>
          <p className="text-green-200 text-sm">
            Live Data: Showing {mainQuestions.length} markets from API
          </p>
        </div>
      )}
      {/* Main featured question card with carousel - only show on "all" category */}
      {showMainCard && activeCategory === "all" && (
      <div className="relative w-full">
        <Card 
          className="w-full bg-[#2c2c2c] rounded-lg overflow-hidden border border-solid border-[#545454] shadow-[0px_3px_6px_#0000000a,0px_6px_12px_#0000000a]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <CardContent className="p-4 sm:p-6 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
              {/* Left side - Question details */}
              <div className="flex flex-col w-full lg:flex-1 items-start gap-4 lg:gap-6">
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
                      {selectedBet ? `₹${potentialIncome}` : '₹x4-20'}
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
                  Earn Smart
                </Button>
              </div>

              {/* Right side - Chart */}
              <div className="flex flex-col w-full lg:flex-1 items-end gap-4 lg:gap-6 ml-0 lg:ml-8">
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

                <div className="flex flex-col h-80 sm:h-96 lg:h-[28rem] items-start w-full">
                  <div className="flex items-center w-full flex-1">
                    {/* Y-axis labels */}
                    <div className="inline-flex flex-col items-end justify-between px-1 py-0 h-full w-8 sm:w-10">
                      {yAxisLabels.map((label, index) => (
                        <span
                          key={`y-label-${index}`}
                          className="font-normal text-[#ffffffb2] text-xs font-['Inter',Helvetica]"
                        >
                          {label}
                        </span>
                      ))}
                    </div>

                    {/* Chart grid and line */}
                    <div className="relative flex-1 h-full bg-[#1a1a1a] rounded border border-[#333] ml-1">
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
                      <div className="absolute inset-0">
                        <svg className="w-full h-full" viewBox="0 0 800 300">
                          {(() => {
                            // Dynamic chart based on event data - same logic as EventDetailsPage
                            const getChartPattern = (eventId: string, yesPercentage: number) => {
                              const patterns = {
                                // Economy events
                                'economy-0': "0,240 80,200 160,170 240,140 320,150 400,145 480,135 560,130 640,125 720,120 800,115",
                                'economy-1': "0,170 80,168 160,172 240,169 320,171 400,170 480,168 560,172 640,170 720,169 800,171",
                                'economy-2': "0,190 80,180 160,195 240,185 320,200 400,190 480,205 560,195 640,210 720,200 800,215",
                                // Politics events
                                'politics-0': "0,170 80,175 160,180 240,185 320,190 400,195 480,200 560,205 640,210 720,215 800,220",
                                'politics-1': "0,190 80,180 160,185 240,175 320,180 400,170 480,175 560,165 640,170 720,160 800,165",
                                'politics-2': "0,200 80,205 160,210 240,215 320,220 400,225 480,230 560,225 640,220 720,225 800,230",
                                // Sustainability events
                                'sustainability-0': "0,210 80,200 160,190 240,180 320,170 400,160 480,150 560,140 640,135 720,130 800,125",
                                'sustainability-1': "0,200 80,195 160,190 240,185 320,180 400,175 480,170 560,165 640,160 720,155 800,150",
                                'sustainability-2': "0,190 80,185 160,180 240,175 320,170 400,165 480,160 560,155 640,150 720,145 800,140",
                                // Technology events
                                'technology-0': "0,240 80,220 160,210 240,200 320,190 400,180 480,170 560,160 640,150 720,140 800,130",
                                'technology-1': "0,200 80,195 160,190 240,185 320,180 400,175 480,170 560,165 640,160 720,155 800,150",
                                'technology-2': "0,190 80,195 160,200 240,205 320,200 400,195 480,200 560,205 640,210 720,205 800,210",
                                // Culture events
                                'culture-0': "0,190 80,195 160,200 240,205 320,200 400,195 480,200 560,205 640,210 720,205 800,210",
                                'culture-1': "0,210 80,200 160,190 240,180 320,170 400,160 480,150 560,140 640,135 720,130 800,125",
                                'culture-2': "0,170 80,165 160,160 240,155 320,150 400,145 480,140 560,135 640,130 720,125 800,120",
                                // Sports events
                                'sports-0': "0,190 80,180 160,170 240,160 320,150 400,140 480,135 560,130 640,125 720,120 800,115",
                                'sports-1': "0,180 80,170 160,160 240,150 320,140 400,135 480,130 560,125 640,120 720,115 800,110",
                                'sports-2': "0,200 80,195 160,190 240,185 320,180 400,175 480,170 560,165 640,160 720,155 800,150",
                                // Default pattern for other events
                                'default': yesPercentage > 60 ? 
                                  "0,240 80,210 160,190 240,170 320,160 400,150 480,140 560,135 640,130 720,125 800,120" :
                                  yesPercentage > 40 ?
                                  "0,200 80,195 160,190 240,185 320,180 400,175 480,170 560,165 640,160 720,155 800,150" :
                                  "0,150 80,160 160,175 240,190 320,205 400,215 480,225 560,230 640,235 720,240 800,245"
                              };
                              return patterns[eventId as keyof typeof patterns] || patterns.default;
                            };
                            
                            const pattern = getChartPattern(mainQuestion.id, mainQuestion.yesPercentage);
                            const color = mainQuestion.yesPercentage > 60 ? "#b2d33a" : 
                                         mainQuestion.yesPercentage > 40 ? "#ffa500" : "#ff6b6b";
                            
                            return (
                              <>
                                <polyline
                                  fill="none"
                                  stroke={color}
                                  strokeWidth="4"
                                  points={pattern}
                                />
                                {/* Dotted line extension */}
                                <polyline
                                  fill="none"
                                  stroke={color}
                                  strokeWidth="4"
                                  strokeDasharray="6,6"
                                  points="800,120 860,115"
                                />
                              </>
                            );
                          })()}
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* X-axis labels */}
                  <div className="pl-8 sm:pl-10 pr-0 pt-3 pb-0 w-full flex items-start justify-between">
                    {xAxisLabels.map((label, index) => (
                      <span
                        key={`x-label-${index}`}
                        className="font-normal text-[#ffffffb2] text-xs sm:text-sm font-['Inter',Helvetica]"
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
          <CardFooter className="px-4 sm:px-6 lg:px-10 pb-4 sm:pb-6 pt-0">
            <div className="flex items-center justify-between w-full">
              {/* Left arrow */}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  handleMainCardClick(e);
                  prevSlide();
                }}
                className="w-8 h-8 sm:w-10 sm:h-10 p-0 text-white hover:bg-white/10 rounded border border-[#545454] bg-[#3c3c3c]"
              >
                <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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
                        setIsAutoPlaying(false); // Pause autoplay when user clicks dot
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
                className="w-8 h-8 sm:w-10 sm:h-10 p-0 text-white hover:bg-white/10 rounded border border-[#545454] bg-[#3c3c3c]"
              >
                <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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
                          ₹{Math.round(100 * (card.yesPercentage > 70 ? Math.random() * 4 + 4 : card.yesPercentage > 50 ? Math.random() * 6 + 8 : Math.random() * 8 + 12))}
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
                          ₹{Math.round(100 * (card.noPercentage > 70 ? Math.random() * 4 + 4 : card.noPercentage > 50 ? Math.random() * 6 + 8 : Math.random() * 8 + 12))}
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