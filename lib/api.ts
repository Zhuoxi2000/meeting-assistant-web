/**
 * API Client for Meeting Assistant Backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiError {
  detail: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

interface DeviceClaimCodeResponse {
  claim_code: string;
  expires_at: string;
  expires_in: number;
}

interface UserResponse {
  id: string;
  nickname: string | null;
  avatar_url: string | null;
  email: string | null;
  tier: 'free' | 'pro' | 'enterprise';
  created_at: string;
}

interface EntitlementsResponse {
  tier: 'free' | 'pro' | 'enterprise';
  daily_requests_limit: number;
  daily_requests_used: number;
  monthly_tokens_limit: number;
  monthly_tokens_used: number;
  available_models: string[];
}

class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        detail: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(error.detail);
    }

    return response.json();
  }

  // Auth endpoints
  async wechatCallback(code: string): Promise<TokenResponse> {
    return this.request<TokenResponse>('/auth/wechat/callback', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  async createDeviceClaimCode(): Promise<DeviceClaimCodeResponse> {
    return this.request<DeviceClaimCodeResponse>('/auth/device/code', {
      method: 'POST',
    });
  }

  async claimDevice(
    claimCode: string,
    deviceId: string,
    deviceName?: string,
    platform?: string
  ): Promise<TokenResponse> {
    return this.request<TokenResponse>('/auth/device/claim', {
      method: 'POST',
      body: JSON.stringify({
        claim_code: claimCode,
        device_id: deviceId,
        device_name: deviceName,
        platform: platform,
      }),
    });
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    return this.request<TokenResponse>('/auth/token/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  }

  async logout(): Promise<void> {
    await this.request('/auth/logout', { method: 'POST' });
  }

  async getCurrentUser(): Promise<UserResponse> {
    return this.request<UserResponse>('/me');
  }

  async getEntitlements(): Promise<EntitlementsResponse> {
    return this.request<EntitlementsResponse>('/entitlements');
  }

  // LLM endpoints
  async getModels(): Promise<{ models: Array<{
    id: string;
    name: string;
    provider: string;
    description: string | null;
    context_length: number;
    available: boolean;
  }> }> {
    return this.request('/models');
  }

  async getUsage(): Promise<{
    daily_requests: number;
    daily_tokens: number;
    monthly_requests: number;
    monthly_tokens: number;
  }> {
    return this.request('/usage');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types
export type {
  TokenResponse,
  DeviceClaimCodeResponse,
  UserResponse,
  EntitlementsResponse,
};

