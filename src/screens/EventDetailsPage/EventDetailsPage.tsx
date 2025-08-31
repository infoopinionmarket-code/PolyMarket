import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarChartIcon, ClockIcon, ArrowLeftIcon, StarIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { MainContentSection } from "../Desktop/sections/MainContentSection";
import { Footer } from "../../components/Footer";

export const EventDetailsPage = (): JSX.Element => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [selectedBet, setSelectedBet] = useState<'yes' | 'no' | null>(null);
  const [betAmount, setBetAmount] = useState(100);
  const [chartPeriod, setChartPeriod] = useState("all");

  // All events data - same as in QuestionCardSection
  const allEvents = [
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if India maintains GDP growth of approximately 6.5% or higher for the fiscal year 2025, as confirmed by official government statistics and major economic institutions like Morgan Stanley and RBI forecasts."
    },
    {
      id: 'economy-1',
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will RBI hold the policy rate at 5.50% throughout August 2025?",
      yesPercentage: 72,
      noPercentage: 28,
      chartData: "0,120 60,125 120,120 180,118 240,122 300,120 360,119 420,121 480,120 540,118 600,120",
      chartColor: "#b2d33a",
      poolAmount: "₹3,15,000",
      deadline: "Aug 31, 2025",
      category: "economy",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if RBI maintains the repo rate at 5.50% for all policy meetings throughout August 2025, as announced in official RBI monetary policy statements."
    },
    {
      id: 'economy-2',
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will the India–UK Free Trade Agreement be ratified and implemented by end of 2025?",
      yesPercentage: 42,
      noPercentage: 58,
      chartData: "0,140 60,130 120,145 180,135 240,150 300,140 360,155 420,145 480,160 540,150 600,165",
      chartColor: "#ffa500",
      poolAmount: "₹5,85,000",
      deadline: "Dec 31, 2025",
      category: "economy",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the India-UK Free Trade Agreement is officially ratified by both parliaments and implementation begins by December 31, 2025."
    },
    {
      id: 'economy-3',
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India secure comprehensive trade deal with US by October 2025?",
      yesPercentage: 38,
      noPercentage: 62,
      chartData: "0,130 60,140 120,135 180,145 240,140 300,150 360,145 420,155 480,150 540,160 600,170",
      chartColor: "#ff6b6b",
      poolAmount: "₹6,25,000",
      deadline: "Oct 31, 2025",
      category: "economy",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if India and the US sign a comprehensive bilateral trade agreement covering goods, services, and investment by October 31, 2025."
    },
    {
      id: 'economy-4',
      image: "https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will the India Circular Economy Forum lead to national sustainability mandates?",
      yesPercentage: 55,
      noPercentage: 45,
      chartData: "0,160 60,150 120,140 180,135 240,130 300,125 360,120 420,115 480,110 540,105 600,100",
      chartColor: "#ffa500",
      poolAmount: "₹2,85,000",
      deadline: "Jul 31, 2025",
      category: "economy",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the India Circular Economy Forum results in new national sustainability mandates or policies announced by the government."
    },
    {
      id: 'economy-5',
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
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
      ],
      rules: "This market will resolve based on the total investment commitments announced at the Invest Kerala Global Summit 2025, as reported by official government sources."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the delimitation process for parliamentary constituencies begins before the constitutional freeze expires in 2026."
    },
    {
      id: 'politics-1',
      image: "https://images.pexels.com/photos/8828597/pexels-photo-8828597.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Modi face a significant backlash over electoral map changes in southern states?",
      yesPercentage: 52,
      noPercentage: 48,
      chartData: "0,140 60,130 120,135 180,125 240,130 300,120 360,125 420,115 480,120 540,110 600,115",
      chartColor: "#ffa500",
      poolAmount: "₹4,15,000",
      deadline: "Dec 31, 2025",
      category: "politics",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if there are significant protests, political opposition, or electoral consequences for Modi's party due to constituency delimitation in southern states."
    },
    {
      id: 'politics-2',
      image: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Monsoon Session 2025 debate new military strategy related to Operation Sindoor?",
      yesPercentage: 38,
      noPercentage: 62,
      chartData: "0,150 60,155 120,160 180,165 240,170 300,175 360,180 420,175 480,170 540,175 600,180",
      chartColor: "#ff6b6b",
      poolAmount: "₹2,95,000",
      deadline: "Sep 30, 2025",
      category: "politics",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the Monsoon Session 2025 of Parliament includes formal debates or discussions about new military strategies related to Operation Sindoor."
    },
    {
      id: 'politics-3',
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India–UK FTA signal a shift from protectionism to liberal trade policy?",
      yesPercentage: 48,
      noPercentage: 52,
      chartData: "0,135 60,140 120,145 180,150 240,145 300,140 360,145 420,150 480,155 540,150 600,155",
      chartColor: "#ffa500",
      poolAmount: "₹3,65,000",
      deadline: "Dec 31, 2025",
      category: "politics",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the India-UK FTA is seen by major economic analysts as representing a significant shift towards liberal trade policies."
    },
    {
      id: 'politics-4',
      image: "https://images.pexels.com/photos/8828597/pexels-photo-8828597.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will policy statements during TRIMA-2025 influence Kerala's leadership trajectory?",
      yesPercentage: 42,
      noPercentage: 58,
      chartData: "0,145 60,150 120,155 180,160 240,155 300,150 360,155 420,160 480,165 540,160 600,165",
      chartColor: "#ffa500",
      poolAmount: "₹2,25,000",
      deadline: "Dec 31, 2025",
      category: "politics",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if policy statements made during TRIMA-2025 have a measurable impact on Kerala's political leadership or governance trajectory."
    },
    {
      id: 'politics-5',
      image: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=400",
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
      ],
      rules: "This market will resolve based on the level of India-Pakistan diplomatic engagement throughout 2025, despite sporting connections through Asia Cup."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if India announces major new climate legislation or policies as a direct response to extreme heat events in 2025."
    },
    {
      id: 'sustainability-1',
      image: "https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Circular Economy Forum in Gurugram trigger policy shifts across industries?",
      yesPercentage: 55,
      noPercentage: 45,
      chartData: "0,150 60,145 120,140 180,135 240,130 300,125 360,120 420,115 480,110 540,105 600,100",
      chartColor: "#ffa500",
      poolAmount: "₹2,85,000",
      deadline: "Jul 31, 2025",
      category: "sustainability",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the Circular Economy Forum in Gurugram leads to measurable policy changes across multiple industries."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the Social Impact Summit 2025 leads to the launch of a major national digital inclusion program."
    },
    {
      id: 'sustainability-3',
      image: "https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India launch a nationwide green hydrogen or solar scale‑up by end of 2025?",
      yesPercentage: 75,
      noPercentage: 25,
      chartData: "0,150 60,140 120,130 180,120 240,110 300,100 360,90 420,80 480,75 540,70 600,65",
      chartColor: "#b2d33a",
      poolAmount: "₹5,45,000",
      deadline: "Dec 31, 2025",
      category: "sustainability",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if India announces a major nationwide green hydrogen or solar energy scale-up program by December 31, 2025."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the Rising Northeast Investors Summit results in concrete infrastructure development plans for the northeastern region."
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
      ],
      rules: "This market will resolve based on official attendance figures for the 2025 Prayag Maha Kumbh Mela as reported by government authorities."
    },
    // Technology
    {
      id: 'technology-0',
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will the 'AI for Bharat' initiative be rolled out nationally before end‑2025?",
      yesPercentage: 65,
      noPercentage: 35,
      chartData: "0,180 60,170 120,160 180,150 240,140 300,130 360,120 420,110 480,100 540,90 600,80",
      chartColor: "#b2d33a",
      poolAmount: "₹4,75,000",
      deadline: "Dec 31, 2025",
      category: "technology",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the 'AI for Bharat' initiative is officially launched nationwide with concrete implementation plans by December 31, 2025."
    },
    {
      id: 'technology-1',
      image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will ET Soonicorns Summit lead to at least ₹500 crore in AI investments?",
      yesPercentage: 58,
      noPercentage: 42,
      chartData: "0,150 60,145 120,140 180,135 240,130 300,125 360,120 420,115 480,110 540,105 600,100",
      chartColor: "#ffa500",
      poolAmount: "₹3,85,000",
      deadline: "Dec 31, 2025",
      category: "technology",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if investment commitments of at least ₹500 crore in AI startups are announced at or as a result of the ET Soonicorns Summit."
    },
    {
      id: 'technology-2',
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will media‑tech deals worth over ₹1,300 crore stem from WAVES Summit 2025?",
      yesPercentage: 48,
      noPercentage: 52,
      chartData: "0,140 60,145 120,150 180,155 240,150 300,145 360,150 420,155 480,160 540,155 600,160",
      chartColor: "#ffa500",
      poolAmount: "₹4,25,000",
      deadline: "Dec 31, 2025",
      category: "technology",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if media-technology deals totaling over ₹1,300 crore are announced at or result from the WAVES Summit 2025."
    },
    {
      id: 'technology-3',
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India establish at least one major regional AI data centre by late 2025?",
      yesPercentage: 72,
      noPercentage: 28,
      chartData: "0,160 60,150 120,140 180,130 240,120 300,110 360,100 420,90 480,85 540,80 600,75",
      chartColor: "#b2d33a",
      poolAmount: "₹5,15,000",
      deadline: "Dec 31, 2025",
      category: "technology",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if India establishes at least one major regional AI data center with significant processing capabilities by December 31, 2025."
    },
    {
      id: 'technology-4',
      image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will Kerala summit 2025 catalyze startup seed‑funding in emerging sectors?",
      yesPercentage: 62,
      noPercentage: 38,
      chartData: "0,145 60,140 120,135 180,130 240,125 300,120 360,115 420,110 480,105 540,100 600,95",
      chartColor: "#b2d33a",
      poolAmount: "₹2,95,000",
      deadline: "Dec 31, 2025",
      category: "technology",
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the Kerala summit 2025 leads to significant seed funding announcements for startups in emerging technology sectors."
    },
    {
      id: 'technology-5',
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Will India launch a national tech‑infrastructure policy including Film‑gaming‑animation sectors?",
      yesPercentage: 55,
      noPercentage: 45,
      chartData: "0,150 60,145 120,140 180,135 240,130 300,125 360,120 420,115 480,110 540,105 600,100",
      chartColor: "#ffa500",
      poolAmount: "₹3,65,000",
      deadline: "Dec 31, 2025",
      category: "technology",
      type: "multiple" as const,
      options: [
        { label: "Full policy by Q4 2025", percentage: 35 },
        { label: "Partial framework only", percentage: 38 },
        { label: "Delayed to 2026", percentage: 27 }
      ],
      rules: "This market will resolve based on whether India launches a comprehensive national tech-infrastructure policy that includes film, gaming, and animation sectors."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if projects and deals totaling over ₹1,300 crore are announced at the WAVES Summit 2025."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if Divya Deshmukh's chess achievements lead to new government policies or programs promoting chess among Indian youth."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the 2025 Prayag Maha Kumbh Mela attracts more than 600 million pilgrims according to official counts."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the WAVES Summit 2025 leads to the launch of a national entertainment-innovation fund."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the Social Impact Summit leads to measurable changes in cultural CSR initiatives across India."
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
      ],
      rules: "This market will resolve based on the level of Bollywood-technology collaborations that emerge from deals made at the WAVES 2025 event."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the final match of the ICC Women's Cricket World Cup 2025 is held in India."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if India and Pakistan play their scheduled Asia Cup 2025 match on September 14, 2025."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if India wins the Women's ODI series against England played before the Cricket World Cup 2025."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if Divya Deshmukh achieves Grandmaster status in chess following her World Cup victory."
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
      type: "binary" as const,
      rules: "This market will resolve to 'Yes' if the Kho Kho World Cup 2025 is announced to become a recurring international event."
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
      ],
      rules: "This market will resolve based on whether India-UK sports economy collaboration leads to doubling of sports revenue by 2027."
    }
  ];

  // Find the specific event by ID
  const eventData = allEvents.find(event => event.id === eventId) || allEvents[0];

  const [activeCategory, setActiveCategory] = useState(eventData.category);

  // Calculate potential income
  const calculatePotentialIncome = () => {
    if (!selectedBet) return 0;
    
    if (selectedBet === 'yes') {
      const odds = 100 / eventData.yesPercentage;
      return Math.round(betAmount * odds * 100) / 100;
    } else {
      const odds = 100 / eventData.noPercentage;
      return Math.round(betAmount * odds * 100) / 100;
    }
  };

  const handleBetSelection = (betType: 'yes' | 'no') => {
    setSelectedBet(selectedBet === betType ? null : betType);
  };

  const handleAmountChange = (amount: number) => {
    setBetAmount(Math.max(1, amount));
  };

  const handleQuickAdd = (value: number) => {
    setBetAmount(prev => prev + value);
  };

  const handleMakeBet = () => {
    window.location.href = 'https://markets.inout.games/?authToken=7dbe639470ff4f12abd41983601b51db6da74cfcc4af23bf08c7f6c413f4a6b51ab948950eb27b99dccaa23e57ba3a56bfe370715beca72cb302dbd4b59a80d8&operatorId=72e338d0-5b66-4c3a-8976-c31ea5957bc9&currency=INR&lang=en';
  };

  const potentialIncome = calculatePotentialIncome();

  // Chart periods
  const chartPeriods = [
    { label: "All Time", value: "all" },
    { label: "24h", value: "24h" },
    { label: "7d", value: "7d" },
    { label: "30d", value: "30d" },
  ];

  // Chart Y-axis labels
  const yAxisLabels = ["30", "25", "20", "15", "10", "5", "0"];

  // Chart X-axis labels
  const xAxisLabels = ["12", "15", "18", "21", "11", "03", "06", "08"];

  return (
    <div className="bg-[#3d3d3d] flex flex-col w-full min-h-screen">
        <MainContentSection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        
        {/* Main content */}
        <main className="flex flex-col w-full items-center gap-6 sm:gap-8 py-8 sm:py-12 bg-[#3d3d3d]">
          <div className="flex flex-col w-full max-w-[1440px] items-start gap-6 sm:gap-8 px-4 sm:px-8 lg:px-20 mx-auto">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:bg-white/10 p-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Button>

          {/* Event header */}
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full">
            <img
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-cover rounded-lg flex-shrink-0"
              alt="Event image"
              src={eventData.image}
            />
            <div className="flex-1 w-full">
              <h1 className="font-bold text-white text-xl sm:text-2xl lg:text-4xl leading-tight mb-3 sm:mb-4">
                {eventData.title}
              </h1>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-[#2c2c2c] rounded-lg border border-[#545454]">
                  <span className="font-medium text-white text-sm">
                    Events
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChartIcon className="w-4 h-4 text-white" />
                  <span className="font-medium text-white text-sm">
                    {eventData.poolAmount}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4 text-white" />
                  <span className="font-medium text-white text-sm">
                    {eventData.deadline}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 text-white hover:bg-white/10"
                >
                  <StarIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
            {/* Left column - Chart */}
            <div className="lg:col-span-2">
              <Card className="bg-[#2c2c2c] rounded-lg border border-solid border-[#545454]">
                <CardContent className="p-4 sm:p-6">
                  {/* Chart periods */}
                  <div className="flex items-center gap-2 mb-6">
                    {chartPeriods.map((period) => (
                      <button
                        key={period.value}
                        onClick={() => setChartPeriod(period.value)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          chartPeriod === period.value
                            ? "bg-white text-[#2c2c2c]"
                            : "bg-transparent text-white hover:bg-white/10"
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>

                  {/* Chart */}
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

                        {/* Chart line */}
                        <div className="absolute inset-3">
                          <svg className="w-full h-full" viewBox="0 0 600 240">
                            {(() => {
                              // Dynamic chart based on event data
                              const getChartPattern = (eventId: string, yesPercentage: number) => {
                                const patterns = {
                                  // RBI rate decision - stable with slight uncertainty
                                  'economy-0': "0,180 60,150 120,120 180,100 240,110 300,105 360,95 420,90 480,85 540,80 600,75",
                                  'economy-1': "0,120 60,118 120,122 180,119 240,121 300,120 360,118 420,122 480,120 540,119 600,121",
                                  'politics-0': "0,120 60,125 120,130 180,135 240,140 300,145 360,150 420,155 480,160 540,165 600,170",
                                  'sustainability-0': "0,160 60,150 120,140 180,130 240,120 300,110 360,100 420,90 480,85 540,80 600,75",
                                  'tech-0': "0,180 60,170 120,160 180,150 240,140 300,130 360,120 420,110 480,100 540,90 600,80",
                                  'culture-0': "0,140 60,145 120,150 180,155 240,150 300,145 360,150 420,155 480,160 540,155 600,160",
                                  'sports-0': "0,140 60,130 120,120 180,110 240,100 300,90 360,85 420,80 480,75 540,70 600,65",
                                  // Default pattern for other events
                                  'default': yesPercentage > 60 ? 
                                    "0,180 60,160 120,140 180,120 240,110 300,100 360,90 420,85 480,80 540,75 600,70" :
                                    yesPercentage > 40 ?
                                    "0,150 60,145 120,140 180,135 240,130 300,125 360,120 420,115 480,110 540,105 600,100" :
                                    "0,100 60,110 120,125 180,140 240,155 300,165 360,175 420,180 480,185 540,190 600,195"
                                };
                                return patterns[eventId as keyof typeof patterns] || patterns.default;
                              };
                              
                              const pattern = getChartPattern(eventData.id, eventData.yesPercentage);
                              const color = eventData.yesPercentage > 60 ? "#b2d33a" : 
                                           eventData.yesPercentage > 40 ? "#ffa500" : "#ff6b6b";
                              
                              return (
                                <>
                                  <polyline
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="3"
                                    points={pattern}
                                  />
                                  {/* Dotted line extension */}
                                  <polyline
                                    points="600,75 660,70"
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="3"
                                    strokeDasharray="5,5"
                                  />
                                </>
                              );
                            })()}
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
                </CardContent>
              </Card>
            </div>

            {/* Right column - Betting interface */}
            <div className="lg:col-span-1">
              <Card className="bg-[#2c2c2c] rounded-lg border border-solid border-[#545454]">
                <CardContent className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
                  {/* Event outcome */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-medium text-white text-lg">
                      Event Outcome
                    </h3>
                    
                    <div className="flex flex-col gap-3">
                      {eventData.type === "binary" ? (
                        <>
                          <button 
                            onClick={() => handleBetSelection('yes')}
                            className={`h-12 justify-between flex items-center px-4 py-0 rounded-lg border-2 transition-all ${
                              selectedBet === 'yes' 
                                ? 'bg-[#c7e055] border-white text-[#1a1a1a] shadow-lg' 
                                : 'bg-[#b2d33a] border-[#8fb11e] text-[#2c2c2c] hover:bg-[#c0e040]'
                            }`}
                          >
                            <span className="font-bold text-lg">Yes</span>
                            <span className="font-bold text-lg">{eventData.yesPercentage}%</span>
                          </button>

                          <button 
                            onClick={() => handleBetSelection('no')}
                            className={`h-12 justify-between flex items-center px-4 py-0 rounded-lg border-2 transition-all ${
                              selectedBet === 'no' 
                                ? 'bg-[#e63946] border-white text-white shadow-lg' 
                                : 'bg-[#d82737] border-[#d82737] text-white hover:bg-[#e03040]'
                            }`}
                          >
                            <span className="font-bold text-lg">No</span>
                            <span className="font-bold text-lg">{eventData.noPercentage}%</span>
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col gap-3">
                          {eventData.options?.map((option, index) => (
                            <div
                              key={index}
                              className="relative flex h-12 items-center justify-between px-4 py-0 w-full bg-[#1a1a1a] rounded-lg border border-solid border-[#545454] overflow-hidden cursor-pointer hover:border-[#666] transition-colors"
                            >
                              <div
                                className="absolute left-0 top-0 h-full bg-[#b2d33a] rounded-l-lg transition-all duration-300"
                                style={{ width: `${option.percentage}%` }}
                              />
                              <span className="relative z-10 font-bold text-white text-lg">
                                {option.label}
                              </span>
                              <span className="relative z-10 font-bold text-white text-lg">
                                {option.percentage}%
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bet amount */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-medium text-white text-lg">
                      Bet Amount
                    </h3>
                    
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => handleAmountChange(Number(e.target.value))}
                        className="flex-1 h-12 px-4 bg-[#1a1a1a] border border-[#545454] rounded-l-lg text-white text-lg font-medium focus:outline-none focus:border-[#b2d33a]"
                        min="1"
                      />
                      <div className="h-12 px-3 bg-[#1a1a1a] border-t border-r border-b border-[#545454] rounded-r-lg flex items-center">
                        <span className="text-white text-lg font-medium">₹</span>
                      </div>
                    </div>

                    {/* Quick add buttons */}
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 5, 20, 100].map((value) => (
                        <button
                          key={value}
                          onClick={() => handleQuickAdd(value)}
                          className="h-10 px-3 bg-[#1a1a1a] border border-[#545454] rounded text-white text-sm font-medium hover:bg-[#2a2a2a] transition-colors"
                        >
                          +{value}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Potential income */}
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white text-lg">
                      Potential Return
                    </span>
                    <span className="font-bold text-[#b2d33a] text-2xl">
                      ₹{potentialIncome.toFixed(2)}
                    </span>
                  </div>

                  {/* Make bet button */}
                  <Button 
                    onClick={handleMakeBet}
                    className="h-14 w-full bg-[#e4e4e4] hover:bg-[#d4d4d4] text-[#2c2c2c] font-bold text-lg rounded-lg"
                  >
                    Place Bet
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Rules section */}
          <div className="w-full">
            <Card className="bg-[#2c2c2c] rounded-lg border border-solid border-[#545454]">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-bold text-white text-lg sm:text-xl mb-3 sm:mb-4">
                  Rules
                </h3>
                <p className="text-white text-sm sm:text-base leading-relaxed">
                  {eventData.rules}
                </p>
              </CardContent>
            </Card>
          </div>
          </div>
        </main>

        <Footer />
    </div>
  );
};