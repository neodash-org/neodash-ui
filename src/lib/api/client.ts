import { API_CONFIG } from './config';
import { ApiResponse, ApiError } from './types';

// HTTP Client with retry logic and error handling
class ApiClient {
  private baseURL: string;
  private apiKey?: string;
  private timeout: number;
  private apiKeyHeaderName?: string;
  private apiKeyPrefix?: string;

  constructor(
    baseURL: string,
    apiKey?: string,
    timeout: number = API_CONFIG.TIMEOUTS.DEFAULT,
    apiKeyHeaderName: string = 'Authorization',
    apiKeyPrefix: string = 'Bearer ',
  ) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.timeout = timeout;
    this.apiKeyHeaderName = apiKeyHeaderName;
    this.apiKeyPrefix = apiKeyPrefix;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0,
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.apiKey && this.apiKeyHeaderName) {
      const value = this.apiKeyPrefix ? `${this.apiKeyPrefix}${this.apiKey}` : this.apiKey;
      (headers as Record<string, string>)[this.apiKeyHeaderName] = value;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP ${response.status}: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      clearTimeout(timeoutId);

      // Retry logic
      if (retryCount < API_CONFIG.RETRY.MAX_ATTEMPTS) {
        const delay =
          API_CONFIG.RETRY.DELAY * Math.pow(API_CONFIG.RETRY.BACKOFF_FACTOR, retryCount);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.makeRequest<T>(endpoint, options, retryCount + 1);
      }

      const apiError: ApiError = {
        code: error instanceof Error ? error.name : 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
      };

      return {
        success: false,
        error: apiError,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return this.makeRequest<T>(url.pathname + url.search);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Create API client instances
export const coinGeckoClient = new ApiClient(
  API_CONFIG.COINGECKO.BASE_URL,
  API_CONFIG.COINGECKO.API_KEY,
  API_CONFIG.TIMEOUTS.PRICE_FEED,
);

export const socketClient = new ApiClient(
  API_CONFIG.SOCKET.BASE_URL,
  API_CONFIG.SOCKET.API_KEY,
  API_CONFIG.TIMEOUTS.BRIDGE,
  'API-KEY',
  '',
);

export const alchemyClient = new ApiClient(
  API_CONFIG.ALCHEMY.BASE_URL,
  API_CONFIG.ALCHEMY.API_KEY,
  API_CONFIG.TIMEOUTS.DEFAULT,
);

export const heliusClient = new ApiClient(
  API_CONFIG.HELIUS.BASE_URL,
  API_CONFIG.HELIUS.API_KEY,
  API_CONFIG.TIMEOUTS.DEFAULT,
);
