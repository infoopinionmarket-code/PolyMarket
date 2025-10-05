/**
 * React Hook for fetching and managing markets data
 */

import { useState, useEffect } from 'react';
import { fetchMarkets } from '../lib/marketsAPI';
import { transformMarkets } from '../lib/transformMarkets';
import type { Market, GetMarketsParams } from '../types/markets';

interface UseMarketsResult {
  markets: Market[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook to fetch and transform markets from API
 * Falls back to empty array if API fails
 */
export function useMarkets(params: GetMarketsParams = {}): UseMarketsResult {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchMarkets(params);
      const transformed = transformMarkets(response.markets);
      setMarkets(transformed);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch markets');
      setError(error);
      console.error('Failed to fetch markets:', error);
      // Keep empty array on error (will use mock data in component)
      setMarkets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(params)]);

  return {
    markets,
    loading,
    error,
    refetch: fetchData
  };
}
