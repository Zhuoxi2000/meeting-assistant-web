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
  username: string | null;
  nickname: string | null;
  avatar_url: string | null;
  email: string | null;
  tier: 'free' | 'pro' | 'enterprise';
  created_at: string;
}

interface RegisterRequest {
  username: string;
  password: string;
  nickname?: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface EntitlementsResponse {
  has_active_subscription: boolean;
  package_id: string | null;
  package_name: string | null;
  basic_minutes_remaining: number;
  premium_minutes_remaining: number;
  expires_at: string | null;
  available_models: string[];
}

interface PackageResponse {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  basic_minutes: number;
  premium_minutes: number;
  validity_days: number;
  sort_order: number;
  is_active: boolean;
  is_trial: boolean;
}

interface PackageListResponse {
  packages: PackageResponse[];
}

interface SubscriptionResponse {
  id: string;
  package_id: string;
  package_name: string | null;
  basic_minutes_total: number;
  basic_minutes_used: number;
  basic_minutes_remaining: number;
  premium_minutes_total: number;
  premium_minutes_used: number;
  premium_minutes_remaining: number;
  started_at: string;
  expires_at: string | null;
  status: 'active' | 'expired' | 'cancelled';
}

interface QuotaResponse {
  has_active_subscription: boolean;
  package_id: string | null;
  package_name: string | null;
  basic_minutes_remaining: number;
  premium_minutes_remaining: number;
  basic_minutes_total: number;
  premium_minutes_total: number;
  basic_minutes_used: number;
  premium_minutes_used: number;
  earliest_expires_at: string | null;
  available_models: string[];
}

interface OrderResponse {
  id: string;
  order_no: string;
  package_id: string;
  package_name: string | null;
  amount_cents: number;
  currency: string;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded' | 'failed';
  payment_method: string | null;
  created_at: string;
  paid_at: string | null;
  cancelled_at: string | null;
  subscription_id: string | null;
}

interface PaymentResultResponse {
  success: boolean;
  order: OrderResponse;
  subscription: SubscriptionResponse | null;
  message: string;
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
  async register(data: RegisterRequest): Promise<TokenResponse> {
    return this.request<TokenResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<TokenResponse> {
    return this.request<TokenResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

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
    return this.request<UserResponse>('/auth/me');
  }

  async getEntitlements(): Promise<EntitlementsResponse> {
    return this.request<EntitlementsResponse>('/auth/entitlements');
  }

  // Package endpoints
  async getPackages(): Promise<PackageListResponse> {
    return this.request<PackageListResponse>('/packages');
  }

  async getPackage(packageId: string): Promise<PackageResponse> {
    return this.request<PackageResponse>(`/packages/${packageId}`);
  }

  // Subscription endpoints
  async getSubscriptions(): Promise<{ subscriptions: SubscriptionResponse[] }> {
    return this.request('/subscription');
  }

  async getActiveSubscriptions(): Promise<{ subscriptions: SubscriptionResponse[] }> {
    return this.request('/subscription/active');
  }

  async getQuota(): Promise<QuotaResponse> {
    return this.request<QuotaResponse>('/subscription/quota');
  }

  async createTrialSubscription(): Promise<SubscriptionResponse> {
    return this.request<SubscriptionResponse>('/subscription/trial', {
      method: 'POST',
    });
  }

  // Order endpoints
  async createOrder(packageId: string): Promise<OrderResponse> {
    return this.request<OrderResponse>('/orders', {
      method: 'POST',
      body: JSON.stringify({ package_id: packageId }),
    });
  }

  async getOrders(): Promise<{ orders: OrderResponse[]; total: number }> {
    return this.request('/orders');
  }

  async getOrder(orderId: string): Promise<OrderResponse> {
    return this.request<OrderResponse>(`/orders/${orderId}`);
  }

  async payOrder(orderId: string, paymentMethod: string = 'mock'): Promise<PaymentResultResponse> {
    return this.request<PaymentResultResponse>(`/orders/${orderId}/pay`, {
      method: 'POST',
      body: JSON.stringify({ payment_method: paymentMethod }),
    });
  }

  async cancelOrder(orderId: string): Promise<OrderResponse> {
    return this.request<OrderResponse>(`/orders/${orderId}/cancel`, {
      method: 'POST',
    });
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
  RegisterRequest,
  LoginRequest,
  PackageResponse,
  PackageListResponse,
  SubscriptionResponse,
  QuotaResponse,
  OrderResponse,
  PaymentResultResponse,
};

