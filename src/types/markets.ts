/**
 * Types for Markets API Integration
 */

// API Response Types
export interface APIOutcome {
  id: string;
  name: string;
  rate: number;
  resolved: boolean;
  created_at: number;
}

export interface APIMarket {
  id: string;
  name: string;
  slug: string;
  image: string;
  status: string;
  outcomes: APIOutcome[];
  created_at: number;
  expired_at?: number;
}

export interface APIResponse {
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  markets: APIMarket[];
}

// UI Types (PolyMarket format)
export interface MarketOption {
  label: string;
  percentage: number;
}

export interface Market {
  id: string;
  image: string;
  title: string;
  yesPercentage: number;
  noPercentage: number;
  chartData: string;
  chartColor: string;
  poolAmount: string;
  deadline: string;
  category: string;
  type: 'binary' | 'multiple';
  options?: MarketOption[];
}

export interface GetMarketsParams {
  page?: number;
  limit?: 10 | 25 | 50 | 100;
  'filter.status'?: 'active' | 'closed';
  'filter.sort_by'?: 'volume' | 'newest' | 'closing';
}
