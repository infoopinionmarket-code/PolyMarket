/**
 * Transform Markets API data to PolyMarket UI format
 */

import type { APIMarket, Market, MarketOption } from '../types/markets';

/**
 * Determine category from market name using keywords
 */
function categorizeMarket(name: string): string {
  const lowerName = name.toLowerCase();
  
  // Keywords for each category
  const categories = {
    economy: ['gdp', 'economy', 'economic', 'trade', 'fiscal', 'rbi', 'monetary', 'investment', 'crore', 'rupee'],
    politics: ['election', 'parliament', 'government', 'policy', 'minister', 'political', 'vote', 'delimitation', 'modi'],
    tech: ['ai', 'tech', 'technology', 'digital', 'innovation', 'startup', 'data centre', 'software'],
    sports: ['cricket', 'football', 'sports', 'championship', 'match', 'tournament', 'chess', 'athlete'],
    culture: ['culture', 'cultural', 'festival', 'entertainment', 'cinema', 'music', 'art', 'kumbh'],
    sustainability: ['climate', 'sustainability', 'green', 'renewable', 'environment', 'circular economy', 'solar']
  };
  
  // Find matching category
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return category;
    }
  }
  
  // Default category
  return 'economy';
}

/**
 * Generate chart data points based on percentage
 * Higher percentage = downward trend, Lower = upward trend
 */
function generateChartData(percentage: number): string {
  const points: string[] = [];
  
  if (percentage > 70) {
    // Strong downward trend (high confidence)
    for (let i = 0; i <= 10; i++) {
      const x = i * 80;
      const y = 240 - (i * 15) + Math.random() * 10;
      points.push(`${x},${Math.round(y)}`);
    }
  } else if (percentage > 50) {
    // Moderate downward trend
    for (let i = 0; i <= 10; i++) {
      const x = i * 80;
      const y = 200 - (i * 8) + Math.random() * 15;
      points.push(`${x},${Math.round(y)}`);
    }
  } else if (percentage > 30) {
    // Slight trend
    for (let i = 0; i <= 10; i++) {
      const x = i * 80;
      const y = 180 + (i * 2) + Math.random() * 20;
      points.push(`${x},${Math.round(y)}`);
    }
  } else {
    // Upward trend (low confidence)
    for (let i = 0; i <= 10; i++) {
      const x = i * 80;
      const y = 150 + (i * 10) + Math.random() * 15;
      points.push(`${x},${Math.round(y)}`);
    }
  }
  
  return points.join(' ');
}

/**
 * Determine chart color based on percentage
 */
function getChartColor(percentage: number): string {
  if (percentage > 60) return '#b2d33a'; // Green
  if (percentage > 40) return '#ffa500'; // Orange
  return '#ff6b6b'; // Red
}

/**
 * Format deadline date
 */
function formatDeadline(timestamp?: number): string {
  if (!timestamp) return 'No deadline';
  
  const date = new Date(timestamp * 1000);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${month} ${day}, ${year}`;
}

/**
 * Generate random pool amount (since API doesn't provide it)
 */
function generatePoolAmount(): string {
  const amount = Math.floor(Math.random() * 5000000) + 1000000; // 1M - 6M
  return `₹${(amount / 100000).toFixed(2).replace('.', ',')}L`;
}

/**
 * Transform single API market to UI format
 */
export function transformMarket(apiMarket: APIMarket): Market {
  const { outcomes } = apiMarket;
  
  // Determine if binary or multiple choice
  const isBinary = outcomes.length === 2;
  
  if (isBinary) {
    // Binary market (Yes/No)
    const yesOutcome = outcomes[0];
    const noOutcome = outcomes[1];
    
    const yesPercentage = Math.round(yesOutcome.rate * 100);
    const noPercentage = Math.round(noOutcome.rate * 100);
    
    return {
      id: apiMarket.id,
      image: apiMarket.image || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: apiMarket.name,
      yesPercentage,
      noPercentage,
      chartData: generateChartData(yesPercentage),
      chartColor: getChartColor(yesPercentage),
      poolAmount: generatePoolAmount(),
      deadline: formatDeadline(apiMarket.expired_at),
      category: categorizeMarket(apiMarket.name),
      type: 'binary'
    };
  } else {
    // Multiple choice market
    const options: MarketOption[] = outcomes.map(outcome => ({
      label: outcome.name,
      percentage: Math.round(outcome.rate * 100)
    }));
    
    const topPercentage = Math.max(...options.map(o => o.percentage));
    
    return {
      id: apiMarket.id,
      image: apiMarket.image || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: apiMarket.name,
      yesPercentage: topPercentage,
      noPercentage: 100 - topPercentage,
      chartData: generateChartData(topPercentage),
      chartColor: getChartColor(topPercentage),
      poolAmount: generatePoolAmount(),
      deadline: formatDeadline(apiMarket.expired_at),
      category: categorizeMarket(apiMarket.name),
      type: 'multiple',
      options
    };
  }
}

/**
 * Transform array of API markets to UI format
 */
export function transformMarkets(apiMarkets: APIMarket[]): Market[] {
  return apiMarkets.map(transformMarket);
}
