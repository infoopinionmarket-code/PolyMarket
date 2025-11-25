/**
 * Markets API Client
 * Connects to InOut Games Markets API
 */

import type { APIResponse, GetMarketsParams } from '../types/markets';

const API_BASE_URL = 'https://connect.markets.inout.games/api/markets';
const OPERATOR_ID = 'db96e2d8-e8fb-4b12-97de-c3a473fe3251';

/**
 * Create HMAC SHA256 signature for request body
 * Browser-compatible version using Web Crypto API
 */
async function createSignature(body: string): Promise<string> {
  const secretKey = '40e6277e007345a43b1eb7218ec53d0da12583d513695b7d801c2427a8e69fce';
  
  try {
    // Convert hex secret key to ArrayBuffer
    const keyData = new Uint8Array(
      secretKey.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    );
    
    // Import key for HMAC
    const key = await window.crypto.subtle.importKey(
      'raw',
      keyData.buffer,
      { name: 'HMAC', hash: { name: 'SHA-256' } },
      false,
      ['sign']
    );
    
    // Create signature
    const encoder = new TextEncoder();
    const data = encoder.encode(body);
    const signatureBuffer = await window.crypto.subtle.sign('HMAC', key, data.buffer);
    
    // Convert ArrayBuffer to hex string
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    return signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    console.error('Error creating signature:', error);
    throw error;
  }
}

/**
 * Fetch markets from API
 */
export async function fetchMarkets(params: GetMarketsParams = {}): Promise<APIResponse> {
  const bodyString = JSON.stringify(params);
  
  try {
    console.log('🔵 Fetching markets with params:', params);
    console.log('🔵 Request body:', bodyString);
    
    const signature = await createSignature(bodyString);
    console.log('🔵 Generated signature:', signature);
    
    const headers = {
      'Content-Type': 'application/json',
      'x-client-id': OPERATOR_ID,
      'x-request-signature': signature,
      'accept-language': 'ru'
    };
    console.log('🔵 Request headers:', headers);
    
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers,
      body: bodyString,
    });
    
    console.log('🔵 Response status:', response.status);
    console.log('🔵 Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ API response data:', data);
    console.log('✅ Markets count:', data.markets?.length || 0);
    
    return data;
  } catch (error) {
    console.error('❌ Error fetching markets:', error);
    throw error;
  }
}

/**
 * Fetch a single market by ID
 */
export async function fetchMarketById(id: string): Promise<APIResponse> {
  // For now, fetch all and filter
  // TODO: Add API endpoint for single market
  const response = await fetchMarkets({ limit: 100 });
  
  const market = response.markets.find(m => m.id === id);
  
  if (!market) {
    throw new Error(`Market ${id} not found`);
  }
  
  return {
    pagination: { page: 1, limit: 1, total: 1 },
    markets: [market]
  };
}
